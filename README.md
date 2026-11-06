# linux.foss49.com — FOSS49 Linux Distro Selector

An interactive, client-side single-page application (SPA) developed for [FOSS49](https://foss49.com) (Free and Open-Source Software 49 at UNC Charlotte) to help users choose their ideal Linux distribution.

---

## Overview

Choosing a Linux distribution can be daunting with hundreds of options available. Whether you are transitioning from Windows or macOS, optimizing a high-end rig for AAA Steam gaming, building an unbreakable 24/7 homelab server, or reviving a 15-year-old laptop with 1GB RAM, this tool cuts through the noise.

The quiz asks **18 technical, weed-level questions** and matches your profile against **22 curated distributions**. At the end, you receive your #1 recommendation, runner-up options, a full specification breakdown, and an interactive list of the decisions that most impacted your result.

---

## Key Features

- **18 In-Depth Technical Questions**:
  - Primary Workload (Gaming, Homelab, DevOps, Pen-Testing, Privacy, Everyday)
  - Prior Operating System background (Windows, macOS, ChromeOS, Experienced Linux)
  - Desktop Environment & Interface (KDE Plasma, GNOME, Tiling WMs like Hyprland/i3, Lightweight XFCE, Headless CLI)
  - Graphics Hardware (Dedicated NVIDIA with proprietary drivers, AMD Radeon in-kernel open source, Intel, Apple Silicon ARM)
  - Hardware Age & Resource Constraints (High-end modern PC vs potato PC <4GB RAM)
  - Release Cadence (Bleeding-edge rolling vs 6-month rapid point vs rock-solid LTS)
  - Stability vs Bleeding Edge Philosophy
  - Package Management Ecosystem (`.deb`/APT, `.rpm`/DNF, `pacman`+AUR, declarative Nix flakes, Flatpak sandboxes, independent minimal)
  - Filesystem Architecture (Immutable/atomic read-only root with rollbacks vs declarative state vs traditional mutable `/usr`)
  - Proprietary Blob & Driver Stance (Pragmatic vs clean with 1-click toggle vs strict 100% libre FSF ethos)
  - Willingness to Pay for Distros / Commercial Support (Community free vs commercial tier like Zorin Pro or RHEL)
  - Installation Experience (10-minute graphical wizard vs guided TUI vs manual CLI bootstrap from scratch)
  - Init System & Service Supervisor (Standard `systemd` vs non-systemd like `runit`, `OpenRC`, `SysVinit`)
  - Terminal & CLI Comfort Level (100% GUI-driven vs basic copy-paste vs CLI power user)
  - Privacy, Telemetry & Compartmentalization (Tor routing, Xen hypervisor domains, clean zero-telemetry community OS)
  - Laptop Power & Battery Management (Power profiles, suspend, hybrid GPU switching)
  - Gaming & Steam / Proton Focus
  - Community Support Culture (Massive mainstream vs hacker/tinkerer forums vs enterprise backing)

- **22 Curated Distributions Ranked**:
  - *Mainstream & Switchers*: Linux Mint, Ubuntu Desktop, Zorin OS, Pop!_OS
  - *Upstream & Workstations*: Fedora Workstation, openSUSE Tumbleweed, Manjaro
  - *Homelab, Server & Enterprise*: Debian GNU/Linux, AlmaLinux / Rocky Linux, Red Hat Enterprise Linux (RHEL)
  - *Immutable & Next-Gen*: Bazzite (Gaming-first immutable), Fedora Silverblue, NixOS
  - *DIY & Rolling Releases*: Arch Linux, EndeavourOS, Gentoo Linux, Void Linux
  - *Security & Privacy*: Kali Linux, Tails (Tor amnesic live system), Qubes OS
  - *Lightweight & Legacy*: antiX / Puppy Linux, Alpine Linux

- **Live In-Place Decision Tuning**:
  - The results view lists the key decisions that contributed the most weight to the final recommendation.
  - Users can tweak any of these decisions directly in-place via dropdowns, instantly recalculating and updating the recommendation live in the DOM.

- **State Persistence & History Navigation**:
  - State is saved to `localStorage` (`foss49_distro_quiz_state_v1`), allowing users to refresh or resume sessions anytime.
  - Integrated with HTML5 History API (`history.pushState` and `popstate`) so the browser's Back and Forward buttons navigate backward and forward through the quiz questions without kicking users off the page.

- **FOSS49 Dark Theme & Skeleton CSS**:
  - Styled with Skeleton CSS, custom dark theme, JetBrains Mono font, and UNC Charlotte colors (`#005035` Charlotte Green and `#a49665` Charlotte Gold).
  - Responsive layout optimized for mobile and desktop screens.
  - Vector SVG logos included for all distros with automatic fallback to stylized initial badges.

---

## Project Structure

```text
linux.foss49.com/
├── index.html                 # Main SPA entry point
├── README.md                  # Project documentation
├── css/
│   ├── normalize.css          # CSS reset
│   ├── skeleton.css           # Skeleton CSS grid & base styles
│   ├── darktheme.css          # FOSS49 dark theme base
│   ├── fonts.css              # Font face declarations
│   └── quiz.css               # Distro picker SPA styling & responsiveness
├── fonts/
│   └── JetBrainsMono-Regular.woff2
├── images/
│   ├── favicon.svg            # FOSS49 favicon / logo
│   └── distros/               # SVG vector logos for all 22 distros
└── js/
    ├── distros.js             # Distribution database, traits, and metadata
    ├── questions.js           # 18 in-depth questions, weights, and impact logic
    └── app.js                 # State machine, storage, scoring, and UI rendering
```

---

## Running Locally

Because this application is 100% static, it requires no backend or build tooling. You can serve it using any local static file server:

### Python 3
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

### Node.js (npx)
```bash
npx serve .
```

### Caddy
```bash
caddy file-server --listen :8000
```

---

## About FOSS49

FOSS49 is a student organization at the University of North Carolina at Charlotte (UNC Charlotte) dedicated to open-source software, homelabbing, self-hosting, and Linux infrastructure.

- **Website**: [foss49.com](https://foss49.com)
- **Discord**: [Join the Community](https://discord.gg/nZYvAAQFJa)
- **Niner Engage**: [UNC Charlotte Org Page](https://ninerengage.charlotte.edu/organization/foss49)

---

## Contributing

Pull requests and issues are welcome! Feel free to suggest additional distros, refine quiz weightings, or contribute styling improvements.
