/**
 * FOSS49 Linux Distro Selector - SPA Application Engine
 * Handles state management, localStorage persistence, scoring engine,
 * impact analysis, and real-time reactive DOM rendering.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'foss49_distro_quiz_state_v1';

  // Global Application State
  const state = {
    stage: 'welcome', // 'welcome' | 'quiz' | 'result'
    currentQuestionIndex: 0,
    answers: {}, // { [questionId]: optionId }
    history: []  // Array of question IDs in order visited
  };

  // Safe localStorage helper
  const Storage = {
    get: function () {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      } catch (e) {
        console.warn('FOSS49 Distro Picker: localStorage read failed or not supported:', e);
      }
      return null;
    },
    set: function (data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn('FOSS49 Distro Picker: localStorage write failed:', e);
      }
    },
    clear: function () {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.warn('FOSS49 Distro Picker: localStorage clear failed:', e);
      }
    }
  };

  // Initialize and hydrate state from storage
  let historyNavCount = 0;

  function getHashForState(stage, index) {
    if (stage === 'quiz') {
      return '#q-' + (index + 1);
    }
    if (stage === 'result') {
      return '#results';
    }
    return '#welcome';
  }

  function getStateFromHash(hash) {
    if (!hash || hash === '#' || hash === '#welcome') {
      return { stage: 'welcome', currentQuestionIndex: 0 };
    }
    if (hash === '#results' || hash === '#result') {
      return { stage: 'result', currentQuestionIndex: QUESTIONS.length - 1 };
    }
    const match = hash.match(/^#q-(\d+)$/i);
    if (match) {
      const qNum = parseInt(match[1], 10);
      const index = isNaN(qNum) ? 0 : Math.max(0, Math.min(QUESTIONS.length - 1, qNum - 1));
      return { stage: 'quiz', currentQuestionIndex: index };
    }
    return { stage: 'welcome', currentQuestionIndex: 0 };
  }

  function navigateTo(stage, index, pushHistory) {
    if (typeof index !== 'number') index = 0;
    if (pushHistory === undefined) pushHistory = true;

    state.stage = stage;
    state.currentQuestionIndex = index;
    persistState();

    const hash = getHashForState(stage, index);
    const stateObj = { stage, currentQuestionIndex: index };

    if (pushHistory) {
      historyNavCount++;
      try {
        history.pushState(stateObj, '', hash);
      } catch (e) {
        window.location.hash = hash;
      }
    } else {
      try {
        history.replaceState(stateObj, '', hash);
      } catch (e) {
        window.location.hash = hash;
      }
    }

    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePopState(event) {
    if (historyNavCount > 0) {
      historyNavCount--;
    }

    if (event.state && event.state.stage) {
      state.stage = event.state.stage;
      state.currentQuestionIndex = typeof event.state.currentQuestionIndex === 'number'
        ? event.state.currentQuestionIndex
        : 0;
    } else {
      const fromHash = getStateFromHash(window.location.hash);
      state.stage = fromHash.stage;
      state.currentQuestionIndex = fromHash.currentQuestionIndex;
    }

    // Boundary check
    if (state.currentQuestionIndex >= QUESTIONS.length) {
      state.currentQuestionIndex = QUESTIONS.length - 1;
    } else if (state.currentQuestionIndex < 0) {
      state.currentQuestionIndex = 0;
    }

    persistState();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initState() {
    const saved = Storage.get();
    if (saved && saved.stage) {
      state.stage = saved.stage || 'welcome';
      state.currentQuestionIndex = typeof saved.currentQuestionIndex === 'number' ? saved.currentQuestionIndex : 0;
      state.answers = saved.answers || {};
      state.history = Array.isArray(saved.history) ? saved.history : [];
    }

    // If URL contains a hash, respect it for deep linking or browser refresh
    if (window.location.hash) {
      const fromHash = getStateFromHash(window.location.hash);
      state.stage = fromHash.stage;
      state.currentQuestionIndex = fromHash.currentQuestionIndex;
    }

    // Boundary check
    if (state.currentQuestionIndex >= QUESTIONS.length) {
      state.stage = 'result';
    }

    // Tag current entry in history stack
    const initialHash = getHashForState(state.stage, state.currentQuestionIndex);
    try {
      history.replaceState({ stage: state.stage, currentQuestionIndex: state.currentQuestionIndex }, '', initialHash);
    } catch (e) {
      // Ignore if restricted
    }
  }

  function persistState() {
    Storage.set({
      stage: state.stage,
      currentQuestionIndex: state.currentQuestionIndex,
      answers: state.answers,
      history: state.history
    });
  }

  // Scoring Engine
  function calculateDistroScores() {
    // Initialize scores
    const distroScores = {};
    DISTROS.forEach(d => {
      distroScores[d.id] = {
        distro: d,
        score: 0,
        positiveContributions: {}, // questionId -> points
        totalPossibleMax: 0
      };
    });

    let answeredCount = 0;

    // Loop through answers
    Object.keys(state.answers).forEach(qId => {
      const optionId = state.answers[qId];
      if (!optionId || optionId === '__skip__') return;

      const question = getQuestionById(qId);
      if (!question) return;

      const option = question.options.find(opt => opt.id === optionId);
      if (!option || !option.weights) return;

      answeredCount++;

      // Distribute weights
      DISTROS.forEach(d => {
        const weight = option.weights[d.id] || 0;
        distroScores[d.id].score += weight;
        if (weight > 0) {
          distroScores[d.id].positiveContributions[qId] = weight;
        }
      });
    });

    // If no questions answered, give sensible baseline defaults
    if (answeredCount === 0) {
      distroScores['mint'].score = 25;
      distroScores['ubuntu'].score = 20;
      distroScores['fedora'].score = 15;
    }

    // Rank distros descending by score
    const ranked = Object.values(distroScores).sort((a, b) => b.score - a.score);

    // Calculate match percentage relative to highest score and baseline
    const highestScore = ranked[0].score;
    ranked.forEach((item, index) => {
      let percent;
      if (highestScore <= 0) {
        percent = Math.max(50, 75 - index * 5);
      } else {
        // Normalize between ~60% and 98%
        const ratio = Math.max(0, item.score / Math.max(highestScore, 30));
        percent = Math.round(62 + ratio * 36);
        if (index === 0) percent = Math.min(99, Math.max(92, percent));
      }
      item.matchPercent = Math.min(99, Math.max(45, percent));
    });

    return {
      ranked,
      answeredCount
    };
  }

  // Determine top impactful decisions for the winning distro
  function determineKeyImpactDecisions(winningDistro, limit = 5) {
    const answeredKeys = Object.keys(state.answers).filter(qId => {
      const optId = state.answers[qId];
      return optId && optId !== '__skip__';
    });

    const impactList = [];

    answeredKeys.forEach(qId => {
      const question = getQuestionById(qId);
      if (!question) return;

      const optId = state.answers[qId];
      const option = question.options.find(o => o.id === optId);
      if (!option) return;

      const weightForWinner = (option.weights && option.weights[winningDistro.id]) || 0;
      
      // Compute score advantage over average
      let totalOthers = 0;
      let otherCount = 0;
      DISTROS.forEach(d => {
        if (d.id !== winningDistro.id) {
          totalOthers += (option.weights && option.weights[d.id]) || 0;
          otherCount++;
        }
      });
      const avgOthers = otherCount > 0 ? (totalOthers / otherCount) : 0;
      const relativeAdvantage = weightForWinner - avgOthers;

      impactList.push({
        question,
        selectedOption: option,
        weight: weightForWinner,
        relativeAdvantage,
        impactReason: option.impactReason || `You chose "${option.label}", which heavily factored into this recommendation.`
      });
    });

    // Sort by relative advantage and weight descending
    impactList.sort((a, b) => b.relativeAdvantage - a.relativeAdvantage || b.weight - a.weight);

    return impactList.slice(0, limit);
  }

  // Navigation & Action Handlers
  function startQuiz() {
    navigateTo('quiz', 0, true);
  }

  function resumeQuiz() {
    navigateTo('quiz', state.currentQuestionIndex || 0, true);
  }

  function resetQuiz() {
    if (Object.keys(state.answers).length > 0) {
      const confirmReset = window.confirm('Are you sure you want to start over? This will clear your current answers.');
      if (!confirmReset) return;
    }
    Storage.clear();
    state.answers = {};
    state.history = [];
    historyNavCount = 0;
    navigateTo('welcome', 0, true);
  }

  function handleSelectOption(questionId, optionId) {
    state.answers[questionId] = optionId;
    if (!state.history.includes(questionId)) {
      state.history.push(questionId);
    }
    persistState();

    // Re-render immediately to show visual selection
    render();

    // Advance to next question after pleasant brief pause
    setTimeout(() => {
      advanceToNextQuestion();
    }, 240);
  }

  function handleSkipQuestion(questionId) {
    state.answers[questionId] = '__skip__';
    persistState();
    advanceToNextQuestion();
  }

  function advanceToNextQuestion() {
    if (state.currentQuestionIndex < QUESTIONS.length - 1) {
      navigateTo('quiz', state.currentQuestionIndex + 1, true);
    } else {
      finishQuiz();
    }
  }

  function handlePreviousQuestion() {
    if (historyNavCount > 0) {
      historyNavCount--;
      history.back();
    } else {
      // Fallback if accessed directly without previous browser history depth
      if (state.currentQuestionIndex > 0) {
        navigateTo('quiz', state.currentQuestionIndex - 1, false);
      } else {
        navigateTo('welcome', 0, false);
      }
    }
  }

  function finishQuiz() {
    navigateTo('result', state.currentQuestionIndex, true);
  }

  // Live decision change handler directly from Results view
  function handleInPlaceDecisionChange(questionId, newOptionId) {
    state.answers[questionId] = newOptionId;
    persistState();
    try {
      history.replaceState({ stage: 'result', currentQuestionIndex: state.currentQuestionIndex }, '', '#results');
    } catch (e) {}
    render();

    // Trigger visual highlight feedback
    const badge = document.getElementById('update-flash-badge');
    if (badge) {
      badge.classList.remove('fade-out');
      badge.classList.add('fade-in');
      setTimeout(() => {
        badge.classList.remove('fade-in');
        badge.classList.add('fade-out');
      }, 2000);
    }
  }

  // Main UI Render Dispatcher
  function render() {
    const app = document.getElementById('app');
    if (!app) return;

    // Render Sticky Header / Subbar
    renderHeaderBar();

    if (state.stage === 'welcome') {
      app.innerHTML = renderWelcomeView();
      attachWelcomeEvents();
    } else if (state.stage === 'quiz') {
      app.innerHTML = renderQuizView();
      attachQuizEvents();
    } else if (state.stage === 'result') {
      app.innerHTML = renderResultView();
      attachResultEvents();
    }
  }

  function renderHeaderBar() {
    const topBar = document.getElementById('header-action-bar');
    if (!topBar) return;

    if (state.stage === 'welcome') {
      topBar.innerHTML = '';
      topBar.style.display = 'none';
      return;
    }

    topBar.style.display = 'block';

    if (state.stage === 'quiz') {
      const qNum = state.currentQuestionIndex + 1;
      const total = QUESTIONS.length;
      const percent = Math.round((qNum / total) * 100);

      topBar.innerHTML = `
        <div class="container">
          <div class="row header-nav-row">
            <div class="six columns">
              <span class="status-indicator">● Question ${qNum} of ${total} (${percent}%)</span>
            </div>
            <div class="six columns text-right">
              <button id="btn-header-reset" class="button button-header-reset">Start Over</button>
            </div>
          </div>
        </div>
      `;
    } else if (state.stage === 'result') {
      topBar.innerHTML = `
        <div class="container">
          <div class="row header-nav-row">
            <div class="six columns">
              <span class="status-indicator status-green">✓ Distro Recommendation Ready</span>
            </div>
            <div class="six columns text-right">
              <button id="btn-header-reset" class="button button-header-reset">Start Over</button>
            </div>
          </div>
        </div>
      `;
    }

    const resetBtn = document.getElementById('btn-header-reset');
    if (resetBtn) {
      resetBtn.onclick = resetQuiz;
    }
  }

  // VIEW 1: Welcome / Introduction
  function renderWelcomeView() {
    const hasSavedAnswers = Object.keys(state.answers).length > 0;

    return `
      <div class="section hero-quiz">
        <div class="container">
          <div class="row">
            <div class="twelve columns">
              <div class="welcome-badge">FOSS49 HOMELAB & OPEN SOURCE INTERACTIVE ADVISOR</div>
              <h1 class="welcome-title">Find Your Ideal Linux Distro</h1>
              <p class="welcome-lead">
                Choosing the right Linux distribution can feel overwhelming with hundreds of options. 
                Whether you're switching from Windows or macOS, optimizing for AAA Steam gaming, 
                building an unbreakable 24/7 homelab server, or compiling everything from source, 
                this quiz cuts through the noise.
              </p>
              <p class="welcome-sub">
                We'll ask you <strong>18 targeted, in-depth questions</strong> covering your hardware specs, 
                desktop workflow, stability requirements, kernel philosophy, and gaming needs. 
                At the end, you'll receive your #1 personalized match, runner-ups, and the exact decisions that shaped the result.
              </p>
            </div>
          </div>

          <div class="row feature-grid-row">
            <div class="four columns">
              <div class="card feature-card">
                <div class="feature-icon">⚙️</div>
                <h3>Deep & Technical</h3>
                <p>We get into the weeds: GPU drivers, immutable filesystems, systemd vs non-systemd, init systems, and package managers.</p>
              </div>
            </div>
            <div class="four columns">
              <div class="card feature-card">
                <div class="feature-icon">🎯</div>
                <h3>22 Distros Ranked</h3>
                <p>From mainstream giants like Linux Mint, Fedora, and Ubuntu to niche legends like NixOS, Bazzite, Void, and Qubes.</p>
              </div>
            </div>
            <div class="four columns">
              <div class="card feature-card">
                <div class="feature-icon">🔄</div>
                <h3>Live Decision Tuning</h3>
                <p>Change key decisions directly on your final results screen to watch how your recommendation instantly updates.</p>
              </div>
            </div>
          </div>

          <div class="row start-actions-row">
            <div class="twelve columns text-center">
              <button id="btn-start-quiz" class="button button-primary button-start">Start Distro Quiz →</button>
              ${
                hasSavedAnswers
                  ? `<button id="btn-resume-quiz" class="button button-secondary button-resume">Resume Saved Quiz (${Object.keys(state.answers).length} answered)</button>`
                  : ''
              }
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function attachWelcomeEvents() {
    const startBtn = document.getElementById('btn-start-quiz');
    if (startBtn) {
      startBtn.onclick = startQuiz;
    }
    const resumeBtn = document.getElementById('btn-resume-quiz');
    if (resumeBtn) {
      resumeBtn.onclick = resumeQuiz;
    }
  }

  // VIEW 2: Question Step-by-Step Wizard
  function renderQuizView() {
    const question = QUESTIONS[state.currentQuestionIndex];
    const qNum = state.currentQuestionIndex + 1;
    const total = QUESTIONS.length;
    const progressPercent = Math.round(((qNum - 1) / total) * 100);
    const currentSelectedOptionId = state.answers[question.id];

    return `
      <div class="section quiz-section">
        <div class="container">
          <!-- Wizard Progress Bar -->
          <div class="row">
            <div class="twelve columns">
              <div class="progress-container">
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
                </div>
                <div class="progress-labels">
                  <span class="progress-step-text">Question ${qNum} of ${total}</span>
                  <span class="progress-category-badge">${question.category}</span>
                  <span class="progress-pct-text">${progressPercent}% Completed</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Question Card -->
          <div class="row">
            <div class="twelve columns">
              <div class="card question-card">
                <div class="question-header">
                  <div class="question-pill">${question.title}</div>
                  <h2 class="question-prompt">${question.prompt}</h2>
                  ${question.hint ? `<p class="question-hint"><span class="hint-icon">💡</span> ${question.hint}</p>` : ''}
                </div>

                <div class="options-container" id="options-group">
                  ${question.options.map((opt, idx) => {
                    const isSelected = currentSelectedOptionId === opt.id;
                    return `
                      <div class="option-item ${isSelected ? 'selected' : ''}" data-option-id="${opt.id}" tabindex="0" role="button" aria-pressed="${isSelected}">
                        <div class="option-indicator">${isSelected ? '✓' : idx + 1}</div>
                        <div class="option-content">
                          <div class="option-label-row">
                            <strong class="option-label">${opt.label}</strong>
                            ${opt.badge ? `<span class="option-badge">${opt.badge}</span>` : ''}
                          </div>
                          <p class="option-desc">${opt.desc}</p>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>

                <!-- Navigation Controls -->
                <div class="wizard-actions">
                  <button id="btn-quiz-prev" class="button button-nav-prev" ${qNum === 1 ? 'disabled' : ''}>← Previous</button>
                  <button id="btn-quiz-skip" class="button button-nav-skip">Skip / No Preference</button>
                  <button id="btn-quiz-next" class="button button-primary button-nav-next">
                    ${qNum === total ? 'View Recommendation →' : 'Next Question →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function attachQuizEvents() {
    const question = QUESTIONS[state.currentQuestionIndex];

    // Option cards selection
    const optionCards = document.querySelectorAll('.option-item');
    optionCards.forEach(card => {
      const optId = card.getAttribute('data-option-id');

      card.onclick = function () {
        handleSelectOption(question.id, optId);
      };

      card.onkeydown = function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSelectOption(question.id, optId);
        }
      };
    });

    // Previous Button
    const prevBtn = document.getElementById('btn-quiz-prev');
    if (prevBtn) {
      prevBtn.onclick = handlePreviousQuestion;
    }

    // Skip Button
    const skipBtn = document.getElementById('btn-quiz-skip');
    if (skipBtn) {
      skipBtn.onclick = function () {
        handleSkipQuestion(question.id);
      };
    }

    // Next Button
    const nextBtn = document.getElementById('btn-quiz-next');
    if (nextBtn) {
      nextBtn.onclick = function () {
        advanceToNextQuestion();
      };
    }
  }

  // VIEW 3: Final Distro Recommendation & Impact Analysis
  function renderResultView() {
    const { ranked } = calculateDistroScores();
    const winner = ranked[0].distro;
    const winnerMatch = ranked[0].matchPercent;

    const runnerUp1 = ranked[1];
    const runnerUp2 = ranked[2];

    const keyImpacts = determineKeyImpactDecisions(winner, 5);

    return `
      <div class="section result-section">
        <div class="container">
          <!-- Notification Flash Badge for dynamic updates -->
          <div id="update-flash-badge" class="result-updated-badge fade-out">
            ⚡ Recommendation recalculating live from your answer adjustments!
          </div>

          <!-- Hero Recommendation Banner -->
          <div class="row">
            <div class="twelve columns">
              <div class="card result-hero-card" style="border-top: 5px solid ${winner.accentColor || '#33C3F0'};">
                <div class="result-hero-header">
                  <div class="result-crown-badge">★ YOUR #1 BEST MATCH</div>
                  <div class="match-score-badge">
                    <span class="match-percent">${winnerMatch}%</span>
                    <span class="match-label">Match Score</span>
                  </div>
                </div>

                <div class="result-title-row">
                  <div class="result-distro-logo">
                    ${renderDistroLogo(winner, 'large')}
                  </div>
                  <div class="result-distro-titles">
                    <h1 class="distro-name">${winner.name}</h1>
                    <p class="distro-tagline">${winner.tagline}</p>
                    <div class="distro-traits-row">
                      ${winner.traits.map(t => `<span class="trait-pill">${t}</span>`).join('')}
                    </div>
                  </div>
                </div>

                <div class="distro-summary-box">
                  <p class="distro-summary-text">${winner.summary}</p>
                </div>

                <!-- Strengths Grid -->
                <div class="row distro-details-row">
                  <div class="six columns">
                    <div class="detail-box strengths-box">
                      <h4>Why It's Ideal For You</h4>
                      <ul>
                        ${winner.strengths.map(s => `<li><span class="check-bullet">✓</span> ${s}</li>`).join('')}
                      </ul>
                    </div>
                  </div>
                  <div class="six columns">
                    <div class="detail-box specs-box">
                      <h4>System Specifications</h4>
                      <table class="u-full-width specs-table">
                        <tbody>
                          <tr><td><strong>Base System:</strong></td><td>${winner.base}</td></tr>
                          <tr><td><strong>Package Manager:</strong></td><td><code>${winner.packageManager}</code></td></tr>
                          <tr><td><strong>Desktop / GUI:</strong></td><td>${winner.defaultDE}</td></tr>
                          <tr><td><strong>Release Cadence:</strong></td><td>${winner.releaseModel}</td></tr>
                          <tr><td><strong>Init System:</strong></td><td><code>${winner.initSystem}</code></td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <!-- Considerations -->
                ${winner.considerations && winner.considerations.length > 0 ? `
                  <div class="distro-considerations-box">
                    <span class="considerations-label">⚠️ Things to Keep in Mind:</span>
                    <ul>
                      ${winner.considerations.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                <div class="result-cta-row">
                  <a href="${winner.website}" target="_blank" rel="noopener noreferrer" class="button button-primary button-website">
                    Visit Official ${winner.name} Website ↗
                  </a>
                  <button id="btn-result-restart" class="button button-secondary">Start Over / New Quiz</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Interactive Factor Change List (Requirement: Decisions that most impacted result, editable in place) -->
          <div class="row">
            <div class="twelve columns">
              <div class="card impact-card">
                <div class="impact-card-header">
                  <div class="impact-icon">⚖️</div>
                  <div>
                    <h3 class="impact-title">Key Decisions That Shaped This Recommendation</h3>
                    <p class="impact-subtitle">
                      The choices below contributed the most weight toward picking <strong>${winner.name}</strong>. 
                      Not 100% happy or want to test alternative opinions? <strong>Change any decision below</strong> to update your result in real time!
                    </p>
                  </div>
                </div>

                <div class="impact-factors-list">
                  ${keyImpacts.length === 0 ? `
                    <p class="text-muted">No specific heavy factors recorded. Try answering more questions for detailed decision insights!</p>
                  ` : keyImpacts.map((item, idx) => {
                    const q = item.question;
                    return `
                      <div class="impact-item-row">
                        <div class="impact-rank">#${idx + 1}</div>
                        <div class="impact-factor-details">
                          <div class="impact-factor-title">
                            <span class="impact-category">${q.category}</span>
                            <strong>${q.title}</strong>
                          </div>
                          <p class="impact-reason-text">${item.impactReason}</p>
                        </div>
                        <div class="impact-factor-control">
                          <label for="select-decision-${q.id}" class="control-label">Your Decision:</label>
                          <select id="select-decision-${q.id}" class="u-full-width select-decision" data-question-id="${q.id}">
                            ${q.options.map(opt => `
                              <option value="${opt.id}" ${state.answers[q.id] === opt.id ? 'selected' : ''}>
                                ${opt.label}
                              </option>
                            `).join('')}
                          </select>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Runner-Up Recommendations -->
          <div class="row">
            <div class="twelve columns">
              <h3 class="runner-up-heading">Close Runner-Up Distros</h3>
              <p class="runner-up-sub">If you want to compare alternatives that also scored highly with your setup:</p>
            </div>
          </div>

          <div class="row runner-ups-row">
            ${[runnerUp1, runnerUp2].filter(Boolean).map(item => {
              const d = item.distro;
              return `
                <div class="six columns">
                  <div class="card runner-up-card" style="border-left: 4px solid ${d.accentColor || '#33C3F0'};">
                    <div class="runner-up-header">
                      <div class="runner-logo">
                        ${renderDistroLogo(d, 'small')}
                      </div>
                      <div class="runner-meta">
                        <h4 class="runner-name">${d.name}</h4>
                        <span class="runner-percent">${item.matchPercent}% Match</span>
                      </div>
                    </div>
                    <p class="runner-tagline">${d.tagline}</p>
                    <div class="runner-specs">
                      <span><strong>Base:</strong> ${d.base}</span> • 
                      <span><strong>Desktop:</strong> ${d.defaultDE}</span>
                    </div>
                    <div class="runner-actions">
                      <a href="${d.website}" target="_blank" rel="noopener noreferrer" class="button u-full-width">
                        Explore ${d.name} ↗
                      </a>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Full Distro Leaderboard Drawer -->
          <div class="row">
            <div class="twelve columns">
              <div class="card leaderboard-card">
                <button id="btn-toggle-leaderboard" class="button u-full-width button-leaderboard-toggle">
                  ▼ Show Full Ranking of All 22 Distros
                </button>
                <div id="leaderboard-drawer" class="leaderboard-drawer-hidden">
                  <table class="u-full-width leaderboard-table">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Distribution</th>
                        <th>Base</th>
                        <th>Default Desktop</th>
                        <th>Match %</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${ranked.map((item, index) => `
                        <tr class="${index === 0 ? 'top-match-row' : ''}">
                          <td><strong>#${index + 1}</strong></td>
                          <td>
                            <strong>${item.distro.name}</strong>
                            ${index === 0 ? '<span class="mini-crown">👑 Match</span>' : ''}
                          </td>
                          <td>${item.distro.base}</td>
                          <td>${item.distro.defaultDE}</td>
                          <td><span class="badge-percent">${item.matchPercent}%</span></td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  function attachResultEvents() {
    // In-place decision selects
    const selects = document.querySelectorAll('.select-decision');
    selects.forEach(sel => {
      sel.onchange = function () {
        const qId = sel.getAttribute('data-question-id');
        const newOptionId = sel.value;
        handleInPlaceDecisionChange(qId, newOptionId);
      };
    });

    // Start over button
    const restartBtn = document.getElementById('btn-result-restart');
    if (restartBtn) {
      restartBtn.onclick = resetQuiz;
    }

    // Toggle leaderboard drawer
    const toggleBtn = document.getElementById('btn-toggle-leaderboard');
    const drawer = document.getElementById('leaderboard-drawer');
    if (toggleBtn && drawer) {
      toggleBtn.onclick = function () {
        if (drawer.classList.contains('leaderboard-drawer-hidden')) {
          drawer.classList.remove('leaderboard-drawer-hidden');
          drawer.classList.add('leaderboard-drawer-visible');
          toggleBtn.textContent = '▲ Hide Full Ranking of All 22 Distros';
        } else {
          drawer.classList.remove('leaderboard-drawer-visible');
          drawer.classList.add('leaderboard-drawer-hidden');
          toggleBtn.textContent = '▼ Show Full Ranking of All 22 Distros';
        }
      };
    }
  }

  // Keyboard shortcut listener for quiz
  window.addEventListener('keydown', function (e) {
    if (state.stage !== 'quiz') return;

    // Numbers 1-9 to select options
    const keyNum = parseInt(e.key, 10);
    const question = QUESTIONS[state.currentQuestionIndex];
    if (question && !isNaN(keyNum) && keyNum >= 1 && keyNum <= question.options.length) {
      const opt = question.options[keyNum - 1];
      if (opt) {
        handleSelectOption(question.id, opt.id);
      }
    }
  });

  // Listen for browser Back and Forward navigation buttons
  window.addEventListener('popstate', handlePopState);

  // DOM Bootstrapping
  document.addEventListener('DOMContentLoaded', function () {
    initState();
    render();
  });

})();

