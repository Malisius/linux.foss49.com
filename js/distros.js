/**
 * Linux Distro Database for FOSS49 Distro Picker
 * Contains 22 distinct distributions spanning beginner-friendly desktops,
 * gaming platforms, rolling releases, immutable systems, security/privacy suites,
 * homelab/enterprise powerhouses, and lightweight legacy resuscitators.
 */

const DISTROS = [
  {
    id: 'mint',
    name: 'Linux Mint',
    tagline: 'The most welcoming, dependable, and familiar transition from Windows.',
    badge: 'Beginner & Windows Transition Champion',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#87cf3e"/><path d="M12 36V16a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-4v-8h-4v8h-8v-8h-4v10z" fill="#ffffff"/></svg>`,
    accentColor: '#87cf3e',
    website: 'https://linuxmint.com',
    base: 'Ubuntu LTS / Debian',
    packageManager: 'APT / Flatpak',
    defaultDE: 'Cinnamon (also XFCE, MATE)',
    releaseModel: 'Point Release (LTS, 2-year cycles)',
    initSystem: 'systemd',
    summary: 'Linux Mint provides a polished, out-of-the-box desktop experience designed to feel natural and intuitive, especially for those moving from Windows. With the elegant Cinnamon desktop, built-in multimedia codecs, automatic backup tools (Timeshift), and a hassle-free Driver Manager, it lets you get straight to work without ever needing to touch the terminal.',
    strengths: [
      'Zero learning curve for Windows switchers with familiar taskbar, system tray, and start menu',
      'Rock-solid stability derived from Ubuntu LTS with long-term security updates',
      'One-click Driver Manager automatically handles NVIDIA graphics and proprietary Wi-Fi',
      'Pre-installed Timeshift makes system snapshots and restore points completely painless'
    ],
    considerations: [
      'Packages are curated for stability rather than having the bleeding-edge latest software',
      'Does not officially support Wayland out-of-the-box (experimental preview in Cinnamon 6+)'
    ],
    traits: ['Beginner-Friendly', 'Windows-Like', 'Rock Solid', 'Flatpak Enabled', 'GUI Everything']
  },
  {
    id: 'popos',
    name: 'Pop!_OS',
    tagline: 'Engineered for gaming, STEM workflows, and effortless NVIDIA hybrid graphics.',
    badge: 'Gaming & Workstation Powerhouse',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#48b9c7"/><path d="M14 16h8a4 4 0 0 1 4 4v2a4 4 0 0 1-4 4h-4v6h-4V16zm4 6h4v-2h-4v2zm12-6h4v16h-4V16z" fill="#ffffff"/></svg>`,
    accentColor: '#48b9c7',
    website: 'https://system76.com/pop',
    base: 'Ubuntu LTS base',
    packageManager: 'APT / Flatpak',
    defaultDE: 'COSMIC Desktop',
    releaseModel: 'Point Release / Rapid Kernel Updates',
    initSystem: 'systemd',
    summary: 'Created by hardware builder System76, Pop!_OS is tailored for developers, gamers, and creative professionals. It provides dedicated ISO installers with pre-packaged NVIDIA drivers, an integrated auto-tiling window manager, full-disk encryption out-of-the-box, and the cutting-edge Rust-based COSMIC desktop environment.',
    strengths: [
      'Dedicated NVIDIA installer ISO means proprietary drivers and CUDA are ready upon first boot',
      'Seamless graphics profile switching (Integrated, Hybrid, Dedicated NVIDIA, Compute) right from the tray',
      'Built-in window auto-tiling toggle gives tiling WM power without complex config files',
      'Fresh Linux kernels and Mesa drivers frequently backported for maximum gaming performance'
    ],
    considerations: [
      'Undergoing a transition to the new Rust-based COSMIC desktop',
      'Not designed for very low-spec or legacy 32-bit hardware'
    ],
    traits: ['NVIDIA Ready', 'Gaming Optimized', 'Auto-Tiling', 'STEM / Dev', 'Modern UX']
  },
  {
    id: 'fedora',
    name: 'Fedora Workstation',
    tagline: 'Leading-edge innovation, pure GNOME experience, and upstream open-source perfection.',
    badge: 'Developer & Upstream Innovator',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#294172"/><path d="M24 10a14 14 0 1 0 14 14A14 14 0 0 0 24 10zm-2 20h-4v-8h4v-2a4 4 0 0 1 4-4h4v4h-4v2h4v4h-4v4z" fill="#ffffff"/></svg>`,
    accentColor: '#3c6eb4',
    website: 'https://fedoraproject.org',
    base: 'Independent (Red Hat sponsored)',
    packageManager: 'DNF / RPM / Flatpak',
    defaultDE: 'Vanilla GNOME (latest)',
    releaseModel: 'Rapid Point Release (every 6 months)',
    initSystem: 'systemd',
    summary: 'Fedora Workstation is the showcase distro for modern Linux desktop technologies. Sponsored by Red Hat, it brings pristine vanilla GNOME, PipeWire audio, Wayland defaults, Btrfs with transparent zstd compression, and modern kernels. It balances cutting-edge software with impressive stability, making it the favorite daily driver for Linux developers and software engineers worldwide.',
    strengths: [
      'Pioneer of modern Linux standards: early adopter of Wayland, PipeWire, Btrfs, and systemd-oomd',
      'Unmodified, vanilla GNOME desktop provides the sleekest gesture-driven Mac-like workflow',
      'Strong open-source ethos combined with easy one-click RPM Fusion repository activation',
      'Close alignment with Red Hat Enterprise Linux (RHEL) makes skills directly transferable to industry'
    ],
    considerations: [
      'Requires enabling RPM Fusion for proprietary codecs and Steam/NVIDIA drivers',
      'Rapid 6-month release cadence means upgrading every 6–13 months is standard'
    ],
    traits: ['Upstream Leader', 'Pure GNOME', 'Red Hat Roots', 'Developer First', 'Wayland Native']
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu Desktop',
    tagline: 'The world’s most widely supported and universally documented Linux operating system.',
    badge: 'Universal Standard & Enterprise Backed',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#e95420"/><circle cx="24" cy="24" r="14" fill="none" stroke="#ffffff" stroke-width="4"/><circle cx="12" cy="24" r="3" fill="#ffffff"/><circle cx="30" cy="14" r="3" fill="#ffffff"/><circle cx="30" cy="34" r="3" fill="#ffffff"/></svg>`,
    accentColor: '#e95420',
    website: 'https://ubuntu.com',
    base: 'Debian base',
    packageManager: 'APT / Snap / Flatpak',
    defaultDE: 'Customized GNOME (Ubuntu Dock)',
    releaseModel: 'Fixed Point Release (LTS every 2 years, interim every 6 months)',
    initSystem: 'systemd',
    summary: 'Maintained by Canonical, Ubuntu is the de facto benchmark of consumer and cloud Linux. Every third-party software provider, game launcher, and hardware vendor targets Ubuntu compatibility first. With five to ten years of long-term support (LTS) available, automated ZFS/LVM installation, and massive community documentation, it is the safest bet for reliable compatibility.',
    strengths: [
      'Vastest software compatibility in the Linux world; nearly every guide and tutorial is written for Ubuntu',
      'Massive global community and AskUbuntu knowledge base solves virtually any problem immediately',
      'Predictable 5-year LTS releases (expandable to 10 years with Ubuntu Pro)',
      'First-class enterprise certification with cloud providers, OEM laptops (Dell, Lenovo), and server vendors'
    ],
    considerations: [
      'Heavy reliance on Canonical Snap packages for applications like Firefox and Chromium',
      'Telemetry prompt during setup (though easily disabled with a single click)'
    ],
    traits: ['Universal Compatibility', 'Massive Community', 'Canonical LTS', 'Snap Ecosystem', 'Beginner Friendly']
  },
  {
    id: 'debian',
    name: 'Debian GNU/Linux',
    tagline: '“The Universal Operating System” — unmatched rock-solid stability and community sovereignty.',
    badge: 'Rock-Solid Stability & Homelab Titan',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#a80030"/><path d="M24 10c-6.6 0-12 5.4-12 12s5.4 12 12 12c3.3 0 6.3-1.3 8.5-3.5l-2.8-2.8c-1.5 1.5-3.5 2.3-5.7 2.3-4.4 0-8-3.6-8-8s3.6-8 8-8c3.3 0 6.1 2 7.3 4.9l3.8-1.4C33.3 13.5 29 10 24 10z" fill="#ffffff"/></svg>`,
    accentColor: '#d70a53',
    website: 'https://www.debian.org',
    base: 'Independent (Grandfather of Ubuntu, Mint, Pop!_OS)',
    packageManager: 'APT / dpkg',
    defaultDE: 'Choice of GNOME, KDE, XFCE, Cinnamon, MATE, LXQt',
    releaseModel: 'Stable Point Release (~2-3 years) with Backports',
    initSystem: 'systemd (SysVinit also available)',
    summary: 'Debian is one of the oldest, most respected independent operating systems on Earth. Governed strictly by its democratic Social Contract and free software guidelines, Debian Stable is renowned for never crashing. It serves as the foundation for homelab self-hosters, mission-critical infrastructure, and dozens of derivative distributions.',
    strengths: [
      'Legendary reliability: packages are exhaustively tested for bugs before entering Debian Stable',
      '100% community-run, democratic organization with zero corporate vendor lock-in or monetization',
      'Incredible multi-architecture support (x86_64, ARM64, RISC-V, MIPS, 32-bit)',
      'Debian 12+ includes non-free firmware in official installers, making modern Wi-Fi and GPUs work easily'
    ],
    considerations: [
      'Debian Stable packages freeze in time; not ideal if you need day-one GPU drivers or the latest desktop apps',
      'Installer is comprehensive and modular, but less hand-holding than Mint or Ubuntu'
    ],
    traits: ['Rock Solid', 'Homelab King', '100% Community', 'Non-Commercial', 'Universal Base']
  },
  {
    id: 'arch',
    name: 'Arch Linux',
    tagline: 'The quintessential minimalist rolling release: complete DIY control and bleeding-edge software.',
    badge: 'Power User & DIY Minimalist Legend',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#1793d1"/><path d="M24 8L12 36l6-2 6-12 6 12 6 2L24 8z" fill="#ffffff"/></svg>`,
    accentColor: '#1793d1',
    website: 'https://archlinux.org',
    base: 'Independent',
    packageManager: 'pacman + AUR (Arch User Repository)',
    defaultDE: 'None (Build your own: Hyprland, i3, KDE, etc.)',
    releaseModel: 'Continuous Rolling Release',
    initSystem: 'systemd',
    summary: 'Arch Linux adheres to the KISS principle (“Keep It Simple, Stupid”). You assemble the OS yourself from a minimalist terminal environment, choosing only the exact kernel, window manager, audio server, and display manager you desire. Armed with the lightning-fast `pacman` package manager and the comprehensive Arch User Repository (AUR), you get the newest software within hours of upstream release.',
    strengths: [
      'The Arch User Repository (AUR) has virtually every piece of software ever written for Linux',
      'The ArchWiki is universally celebrated as the single best Linux documentation resource in existence',
      'Continuous rolling release: install once and update forever, never needing a major OS reinstall',
      'Absolute control with zero bloatware: only the software you consciously chose to install is present'
    ],
    considerations: [
      'Requires comfort with the command line and willingness to read update notes when maintaining packages',
      'Official installation is CLI-based (though `archinstall` provides a guided text installer)'
    ],
    traits: ['Rolling Release', 'AUR Access', 'Bleeding Edge', 'DIY Minimal', 'ArchWiki Backed']
  },
  {
    id: 'endeavour',
    name: 'EndeavourOS',
    tagline: 'Arch Linux made approachable with a friendly Calamares installer and a warm community.',
    badge: 'Arch Experience without the Tears',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#7f3f98"/><path d="M12 34l12-22 12 22H12zm12-16l-6 11h12l-6-11z" fill="#ff7f50"/></svg>`,
    accentColor: '#7f3f98',
    website: 'https://endeavouros.com',
    base: 'Arch Linux',
    packageManager: 'pacman + yay (AUR helper)',
    defaultDE: 'XFCE (offline) / Choice of KDE, GNOME, Hyprland, i3, etc. (online)',
    releaseModel: 'Continuous Rolling Release',
    initSystem: 'systemd',
    summary: 'EndeavourOS is the successor to Antergos, designed to give users the raw power of Arch Linux without the manual installation gauntlet. It features the intuitive graphical Calamares installer, a curated welcome app with maintenance shortcuts, pre-installed `yay` for AUR packages, and one of the friendliest, most helpful community forums on the web.',
    strengths: [
      'Graphical installer lets you install pure Arch with any desktop environment (or tiling WM) in 10 minutes',
      'Directly uses official Arch repositories with minimal custom packages or middlemen delays',
      'Helpful EndeavourOS Welcome app simplifies package cleanup, mirror ranking, and driver updates',
      'Phenomenal, beginner-patient community that embraces newcomers learning the Arch ecosystem'
    ],
    considerations: [
      'Still an Arch rolling release at its core; requires understanding basic system maintenance',
      'Not a locked-down sandbox; you retain full root responsibility'
    ],
    traits: ['Easy Arch', 'Calamares GUI', 'AUR Ready', 'Friendly Community', 'Rolling Release']
  },
  {
    id: 'bazzite',
    name: 'Bazzite',
    tagline: 'The ultimate gaming-first immutable Linux OS for desktop PCs, laptops, and handhelds.',
    badge: 'Next-Gen Immutable Gaming King',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#dc322f"/><path d="M14 20h20v8H14zm4-6h12v4H18zm2 14h8v4h-8z" fill="#ffffff"/></svg>`,
    accentColor: '#e74c3c',
    website: 'https://bazzite.gg',
    base: 'Fedora Atomic Desktop (Universal Blue / rpm-ostree)',
    packageManager: 'Flatpak / rpm-ostree / Distrobox',
    defaultDE: 'KDE Plasma 6 or GNOME',
    releaseModel: 'Atomic Containerized Rolling Updates',
    initSystem: 'systemd',
    summary: 'Built on top of Fedora’s atomic infrastructure by the Universal Blue team, Bazzite is custom-tailored for PC gaming, living room HTPCs, and handhelds like the Steam Deck, ROG Ally, and Legion Go. It bundles Steam, Lutris, Proton, GameMode, MangoHud, latency reductions, and proprietary NVIDIA drivers into an unshakeable, read-only root filesystem with instant rollbacks.',
    strengths: [
      'Unbreakable immutable architecture: OS updates are atomic images with instant boot-menu rollback',
      'Pre-configured out of the box for AAA gaming with HDR, VRR, gamescope, and controller support',
      'Dedicated NVIDIA images include pre-installed proprietary drivers and hardware video acceleration',
      'Steam Big Picture Gamepad-UI mode replicates the exact Steam Deck console experience for living rooms'
    ],
    considerations: [
      'Root filesystem is read-only; installing traditional system packages requires layering or containers (Distrobox)',
      'A departure from classical Linux filesystem paradigms for people used to standard `apt` or `dnf`'
    ],
    traits: ['Steam Ready', 'Immutable Root', 'NVIDIA & AMD', 'Console UI', 'Zero Breakage']
  },
  {
    id: 'silverblue',
    name: 'Fedora Silverblue',
    tagline: 'An immutable, atomic desktop operating system designed for containerized workflows.',
    badge: 'Next-Gen Declarative Workstation',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#0b57a4"/><path d="M24 10l12 20H12l12-20z" fill="#ffffff"/></svg>`,
    accentColor: '#0b57a4',
    website: 'https://fedoraproject.org/atomic-desktops/silverblue/',
    base: 'Fedora',
    packageManager: 'rpm-ostree / Flatpak / Toolbx',
    defaultDE: 'Pure GNOME',
    releaseModel: 'Atomic Point Release (every 6 months)',
    initSystem: 'systemd',
    summary: 'Fedora Silverblue is the future of the Linux desktop. By employing `rpm-ostree`, the host operating system is mounted read-only and updated as a single atomic image. Applications run cleanly separated inside Flatpak containers, and developer environments run in ephemeral Toolbx containers. If an update ever causes an issue, you can simply reboot into the previous tree.',
    strengths: [
      'Bulletproof stability: corrupting system libraries is virtually impossible due to the read-only root',
      'Effortless rollback: pin working deployments and boot into prior OS states with zero risk',
      'Container-first development using Toolbx or Distrobox matches cloud-native developer best practices',
      'Pure, untouched GNOME desktop experience with modern Wayland and PipeWire defaults'
    ],
    considerations: [
      'Layering packages via `rpm-ostree` requires a system reboot to take effect',
      'Steeper learning curve for developers expecting traditional `/usr/local` modifications'
    ],
    traits: ['Atomic OS', 'Read-Only Root', 'Toolbx Containers', 'Flatpak First', 'Cloud Native']
  },
  {
    id: 'nixos',
    name: 'NixOS',
    tagline: 'Declarative, reproducible, purely functional Linux with infinite rollbacks and flakes.',
    badge: 'Declarative & DevOps Holy Grail',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#5277c3"/><path d="M16 12l8 14 8-14-4-2-4 7-4-7z" fill="#7ebae4"/><path d="M32 36l-8-14-8 14 4 2 4-7 4 7z" fill="#ffffff"/></svg>`,
    accentColor: '#5277c3',
    website: 'https://nixos.org',
    base: 'Independent',
    packageManager: 'Nix package manager / Flakes',
    defaultDE: 'Configurable (GNOME, Plasma, Hyprland, etc.)',
    releaseModel: 'Channels (Rolling Unstable or 6-month Stable)',
    initSystem: 'systemd (configured declaratively)',
    summary: 'NixOS re-imagines operating systems from the ground up. Instead of mutating packages in place, your entire operating system—packages, services, users, dotfiles, and kernel modules—is declared in a single configuration file (`configuration.nix` or Flakes). Rebuilding produces a completely reproducible system generation with instantaneous bootloader rollbacks.',
    strengths: [
      '100% reproducible: duplicate your entire machine, packages, and dotfiles onto a second PC with one file',
      'Atomic generation upgrades: every system state is kept in the boot menu; you can roll back instantly if anything goes wrong',
      'Nixpkgs is currently the largest, most up-to-date software repository in the entire open-source world',
      'Dev shells (`nix develop`) let you load language runtimes and toolchains on-demand without polluting global PATH'
    ],
    considerations: [
      'Nix language syntax and functional programming concepts have a steep initial learning curve',
      'Non-standard Filesystem Hierarchy Standard (FHS): pre-compiled binary blobs require `nix-ld` or containers'
    ],
    traits: ['Declarative Config', 'Reproducible', 'Infinite Rollback', 'DevOps / Homelab', 'Nix Flakes']
  },
  {
    id: 'tumbleweed',
    name: 'openSUSE Tumbleweed',
    tagline: 'Enterprise-grade rolling release vetted by automated openQA testing and YaST control.',
    badge: 'Automated QA & Snapper Snapshots',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#73ba25"/><path d="M24 12c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12-5.4-12-12-12zm4 18h-8v-4h8v4zm2-6H18v-4h12v4z" fill="#ffffff"/></svg>`,
    accentColor: '#73ba25',
    website: 'https://get.opensuse.org/tumbleweed/',
    base: 'Independent (SUSE)',
    packageManager: 'zypper / YaST / RPM',
    defaultDE: 'KDE Plasma (first-class), GNOME, XFCE',
    releaseModel: 'Rolling Release (vetted by openQA)',
    initSystem: 'systemd',
    summary: 'openSUSE Tumbleweed offers the benefits of a rolling release without the fear of sudden breakage. Every package snapshot is tested automatically against hundreds of real-world scenarios in openQA before being published. Paired with default Btrfs filesystem snapshots via Snapper, you can boot into a previous snapshot directly from GRUB if anything goes awry.',
    strengths: [
      'Automated openQA testing rigorously validates entire snapshot releases before they reach users',
      'Out-of-the-box Btrfs + Snapper integration creates bootable snapshots before every package update',
      'YaST Control Center provides the most comprehensive graphical sysadmin configuration tool in Linux',
      'Premier first-class KDE Plasma integration and top-tier enterprise engineering backing from SUSE'
    ],
    considerations: [
      'Proprietary codecs require adding the Packman community repository',
      'Frequent multi-gigabyte snapshot updates can consume significant bandwidth'
    ],
    traits: ['Tested Rolling', 'Snapper Snapshots', 'YaST Admin', 'KDE Flagship', 'Enterprise Pedigree']
  },
  {
    id: 'zorin',
    name: 'Zorin OS',
    tagline: 'Sleek, refined desktop with built-in layout switcher and optional paid Pro tier.',
    badge: 'Most Polished Windows/Mac Alternative',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#15a6f0"/><path d="M12 14h24l-16 20h16v4H12l16-20H12z" fill="#ffffff"/></svg>`,
    accentColor: '#15a6f0',
    website: 'https://zorin.com/os/',
    base: 'Ubuntu LTS base',
    packageManager: 'APT / Flatpak / Snap',
    defaultDE: 'Zorin Desktop (GNOME customized)',
    releaseModel: 'Point Release (LTS)',
    initSystem: 'systemd',
    summary: 'Zorin OS is designed to be the friendliest alternative to Windows and macOS. Its hallmark Zorin Appearance tool lets you transform the desktop layout between Windows 11, Windows Classic, macOS, and GNOME with a single click. For users happy to support development, Zorin OS Pro offers curated creative software suites and advanced Mac/Ubuntu layouts.',
    strengths: [
      'Zorin Appearance lets you switch between Windows, macOS, and classic desktop layouts in one second',
      'Integrated Windows App Support automatically suggests Linux equivalents or launches `.exe` via Wine',
      'Zorin OS Pro tier available for users who want to pay for commercial-grade polish, support, and extra layouts',
      'Flawless touchpad gestures, mobile phone integration (Zorin Connect), and eye-strain reducing auto-theme'
    ],
    considerations: [
      'The "Pro" edition is a paid download ($39), though the "Core" and "Lite" editions are completely free',
      'Relies on Ubuntu LTS base, so software versions are slower to update than rolling distros'
    ],
    traits: ['Paid Pro Option', 'Layout Switcher', 'Windows .exe Helper', 'Stunning Polish', 'Noob Friendly']
  },
  {
    id: 'void',
    name: 'Void Linux',
    tagline: 'Independent, blazingly fast minimalist Linux powered by runit and xbps.',
    badge: 'Non-systemd & Lightweight Indie Rebel',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#29593f"/><circle cx="24" cy="24" r="14" fill="#478061"/><circle cx="24" cy="24" r="8" fill="#ffffff"/><circle cx="24" cy="24" r="4" fill="#29593f"/></svg>`,
    accentColor: '#478061',
    website: 'https://voidlinux.org',
    base: 'Independent (built from scratch)',
    packageManager: 'xbps / xbps-src',
    defaultDE: 'None (XFCE ISO available, or choose your own)',
    releaseModel: 'Continuous Rolling Release',
    initSystem: 'runit (Alternative to systemd)',
    summary: 'Void Linux is a rare independent operating system created from scratch. It uses `runit` as its init system and service supervisor instead of systemd, booting in mere seconds. Its home-grown `xbps` package manager and `xbps-src` source packages are among the fastest and cleanest in the entire Unix ecosystem.',
    strengths: [
      '100% free of systemd: uses the clean, lightning-fast `runit` process supervisor and init system',
      'XBPS package manager is written in native C and performs updates with staggering speed',
      'Offers both glibc and musl libc ISOs for security and low-resource embedded enthusiasts',
      'Zero corporate influence or bloated legacy dependencies: pure, uncluttered Unix simplicity'
    ],
    considerations: [
      'Smaller repository size compared to Ubuntu or Arch AUR (though `xbps-src` and Flatpak fill gaps)',
      'Requires comfort configuring services with runit symlinks and reading documentation'
    ],
    traits: ['runit Init', 'No systemd', 'XBPS Speed', 'musl Option', 'Rolling & Indie']
  },
  {
    id: 'alpine',
    name: 'Alpine Linux',
    tagline: 'Ultra-lightweight, musl-based, security-oriented distribution ideal for containers and routers.',
    badge: 'Ultra-Minimalist & Container Champion',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#0d597f"/><path d="M12 36l8-16 6 10 4-6 6 12H12z" fill="#ffffff"/></svg>`,
    accentColor: '#0d597f',
    website: 'https://alpinelinux.org',
    base: 'Independent',
    packageManager: 'apk',
    defaultDE: 'None (CLI default, can install XFCE/Sway)',
    releaseModel: 'Point Release (every 6 months) or Edge',
    initSystem: 'OpenRC',
    summary: 'Alpine Linux is built around `musl libc` and `busybox`. A standard Alpine base installation requires under 130 MB of disk space and boots with virtually no memory footprint. It powers the majority of microservice Docker containers worldwide and makes an invincible, hardened operating system for embedded devices and minimalist servers.',
    strengths: [
      'Astonishingly tiny memory and disk footprint: boots in seconds with less than 50MB RAM utilized',
      'Replaces systemd with OpenRC and utilizes security-hardened compile flags with stack-smashing protection',
      'Blazing fast `apk` package manager downloads and configures dependencies in fractions of a second',
      'Can run completely in RAM (diskless mode), preventing drive wear on SD cards and USB sticks'
    ],
    considerations: [
      'Uses `musl` instead of `glibc`, meaning proprietary software like Steam or glibc-only binaries require workarounds',
      'Not intended to be an out-of-the-box consumer desktop OS for non-technical users'
    ],
    traits: ['Musl libc', 'OpenRC Init', 'Under 100MB', 'Docker Standard', 'Hardened Security']
  },
  {
    id: 'antix',
    name: 'antiX / Puppy Linux',
    tagline: 'Breathe new life into ancient computers, netbooks, and systems with under 1GB RAM.',
    badge: 'Potato PC & Legacy Hardware Savior',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#cc6600"/><path d="M16 16a8 8 0 0 1 16 0c0 6-8 16-8 16s-8-10-8-16z" fill="#ffffff"/><circle cx="24" cy="16" r="3" fill="#cc6600"/></svg>`,
    accentColor: '#e67e22',
    website: 'https://antixlinux.com',
    base: 'Debian base (systemd-free)',
    packageManager: 'APT',
    defaultDE: 'IceWM, Fluxbox, JWM',
    releaseModel: 'Point Release (following Debian)',
    initSystem: 'SysVinit / runit',
    summary: 'antiX is a fast, lightweight, and easy-to-install systemd-free desktop distro based on Debian. Designed to operate on 32-bit and 64-bit systems with as little as 256MB of RAM, it turns discarded laptops and retro computers into snappy web browsing and document editing workstations.',
    strengths: [
      'Breathes lightning-fast life into 10–20 year old hardware with minimal RAM and older spinning HDDs',
      'Completely free of systemd, relying on SysVinit or runit for a featherweight footprint',
      'Full access to the massive Debian software archive via APT',
      'Legendary live persistence features allow saving personal settings directly onto a portable USB stick'
    ],
    considerations: [
      'Aesthetic uses lightweight window managers (IceWM/JWM) which feel retro compared to modern GNOME/KDE',
      'Lacks modern animations and heavy visual compositing by default'
    ],
    traits: ['Ultra Lightweight', 'Runs on 512MB RAM', '32-Bit & 64-Bit', 'SysVinit / runit', 'Debian Base']
  },
  {
    id: 'kali',
    name: 'Kali Linux',
    tagline: 'The premier industry standard for penetration testing, ethical hacking, and digital forensics.',
    badge: 'Offensive Security & Pen-Testing Benchmark',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#2d72d9"/><path d="M24 10l-10 14h20L24 10zm-8 16l8 12 8-12H16z" fill="#ffffff"/></svg>`,
    accentColor: '#2d72d9',
    website: 'https://www.kali.org',
    base: 'Debian Testing',
    packageManager: 'APT',
    defaultDE: 'XFCE (default), GNOME, KDE',
    releaseModel: 'Rolling Release (Quarterly snapshots)',
    initSystem: 'systemd',
    summary: 'Maintained by Offensive Security (OffSec), Kali Linux is the standard operating system used by cybersecurity professionals, red teams, and ethical hackers globally. It comes pre-installed with over 600 penetration testing, wireless auditing, reverse engineering, and digital forensics tools, complete with custom kernel patches for wireless packet injection.',
    strengths: [
      '600+ pre-configured penetration testing tools: Wireshark, Metasploit, Nmap, Burp Suite, Aircrack-ng, and Hashcat',
      'Custom kernel patched for 802.11 wireless packet injection and monitor mode',
      '“Kali Undercover” mode transforms the desktop theme into an authentic Windows 10 look to prevent public suspicion',
      'Industry standard training platform for OSCP and professional cybersecurity certifications'
    ],
    considerations: [
      'Not designed as a general-purpose daily driver for homework, office work, or gaming',
      'Default security assumptions favor network auditing tools over multi-user desktop isolation'
    ],
    traits: ['Penetration Testing', 'Cybersecurity', '600+ Security Tools', 'Wi-Fi Injection', 'OffSec Standard']
  },
  {
    id: 'tails',
    name: 'Tails',
    tagline: 'The Amnesic Incognito Live System — privacy, anonymity, and zero forensic traces.',
    badge: 'Maximum Anonymity & Anti-Surveillance',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#593196"/><circle cx="24" cy="24" r="14" fill="none" stroke="#ffffff" stroke-width="4"/><path d="M24 16v8l6 4" stroke="#ffffff" stroke-width="4" stroke-linecap="round"/></svg>`,
    accentColor: '#593196',
    website: 'https://tails.net',
    base: 'Debian base',
    packageManager: 'APT (custom Tor-isolated)',
    defaultDE: 'Customized GNOME',
    releaseModel: 'Live USB Releases (synchronized with Tor Browser)',
    initSystem: 'systemd',
    summary: 'Tails is a portable operating system that protects against surveillance, censorship, and data collection. Booted from a USB stick, it forces all outgoing Internet connections to route exclusively through the Tor anonymity network. When powered off, it leaves zero forensic trace on the computer’s hard drive and erases RAM on shutdown.',
    strengths: [
      'Forces 100% of network traffic through the Tor onion routing network, blocking non-anonymous connections',
      'Amnesic: leaves zero footprints on the computer’s internal hard drive or SSD',
      'Wipes RAM on shutdown to safeguard against cold-boot memory recovery attacks',
      'Bundled with state-of-the-art cryptographic utilities: Tor Browser, OnionShare, KeePassXC, and Kleopatra PGP'
    ],
    considerations: [
      'Meant strictly as a live USB system; not suitable for permanent dual-boot or general gaming',
      'Internet browsing speed is bounded by the Tor network routing relays'
    ],
    traits: ['Tor Routed', 'Amnesic Live USB', 'Anti-Censorship', 'Zero Local Traces', 'Whistleblower Ready']
  },
  {
    id: 'qubes',
    name: 'Qubes OS',
    tagline: '“A reasonably secure operating system” based on Xen hypervisor virtualization isolation.',
    badge: 'Compartmentalized Security Hypervisor',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#3874d8"/><rect x="14" y="14" width="8" height="8" fill="#ffffff"/><rect x="26" y="14" width="8" height="8" fill="#ffffff"/><rect x="14" y="26" width="8" height="8" fill="#ffffff"/><rect x="26" y="26" width="8" height="8" fill="#ffffff"/></svg>`,
    accentColor: '#3874d8',
    website: 'https://www.qubes-os.org',
    base: 'Fedora / Debian VM templates on Xen',
    packageManager: 'DNF / APT (inside qubes)',
    defaultDE: 'XFCE (Dom0)',
    releaseModel: 'Point Release',
    initSystem: 'systemd (per-qube)',
    summary: 'Qubes OS takes security through compartmentalization to the extreme. Utilizing the Xen hypervisor, it isolates your digital life into distinct virtual machines (“qubes”) with color-coded window borders—such as `work`, `personal`, `vault`, and `untrusted`. An infected PDF or compromised browser in one qube cannot access your banking credentials or files in another.',
    strengths: [
      'Security by compartmentalization: distinct isolated VMs for browsing, banking, coding, and networking',
      'Disposable VMs self-destruct immediately after closing a downloaded file or suspicious website link',
      'Color-coded desktop windows seamlessly blend across VMs onto a unified desktop workspace',
      'Endorsed by high-threat security specialists, investigative journalists, and privacy researchers'
    ],
    considerations: [
      'Demanding hardware requirements: needs 16GB+ RAM, fast NVMe, and robust VT-x/VT-d hardware virtualization',
      'Unsuitable for 3D gaming or GPU-intensive tasks due to hypervisor overhead'
    ],
    traits: ['Xen Hypervisor', 'Compartmentalization', 'Disposable VMs', 'Zero Trust', 'Extreme Security']
  },
  {
    id: 'almalinux',
    name: 'AlmaLinux / Rocky Linux',
    tagline: 'Enterprise-grade, bug-for-bug binary compatible RHEL replacement built for servers and homelabs.',
    badge: 'Enterprise Stability & Homelab Workhorse',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#ff5722"/><circle cx="18" cy="18" r="6" fill="#ffffff"/><circle cx="30" cy="18" r="6" fill="#ffffff"/><circle cx="24" cy="30" r="6" fill="#ffffff"/></svg>`,
    accentColor: '#ff5722',
    website: 'https://almalinux.org',
    base: 'RHEL (Red Hat Enterprise Linux) ecosystem',
    packageManager: 'DNF / RPM',
    defaultDE: 'GNOME or Headless Server',
    releaseModel: 'Enterprise 10-Year Lifecycle',
    initSystem: 'systemd',
    summary: 'AlmaLinux and Rocky Linux were created as community-governed, drop-in binary replacements for CentOS. Designed for 10-year enterprise deployment lifecycles, they provide the rock-solid foundation, SELinux policies, and Cockpit web admin consoles relied on in production data centers and student homelabs alike.',
    strengths: [
      '10-year lifecycle guarantee with free security patches and zero subscription licensing fees',
      'Bug-for-bug ABI compatibility with Red Hat Enterprise Linux; runs all enterprise software',
      'Built-in Cockpit web interface allows monitoring and managing server containers and storage via browser',
      'Perfect educational platform for learning real-world Linux sysadmin and enterprise DevOps skills'
    ],
    considerations: [
      'Designed primarily for servers, headless homelabs, and stability; desktop software versions are conservative',
      'Enforces SELinux strictly out of the box, requiring basic understanding of file contexts'
    ],
    traits: ['RHEL Compatible', '10-Year Lifecycle', 'Homelab Server', 'Cockpit Admin', 'Zero License Fee']
  },
  {
    id: 'rhel',
    name: 'Red Hat Enterprise Linux (RHEL)',
    tagline: 'The gold standard enterprise Linux with commercial support subscriptions and FIPS compliance.',
    badge: 'Corporate Standard & Paid Enterprise Tier',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#ee0000"/><path d="M12 28c0-8 6-12 12-12s12 4 12 12c0 2-2 4-4 4H16c-2 0-4-2-4-4z" fill="#ffffff"/><circle cx="24" cy="20" r="4" fill="#ee0000"/></svg>`,
    accentColor: '#ee0000',
    website: 'https://www.redhat.com/en/technologies/linux-platforms/enterprise-linux',
    base: 'Independent (Red Hat)',
    packageManager: 'DNF / RPM',
    defaultDE: 'GNOME Desktop or Headless',
    releaseModel: '10-Year Enterprise Lifecycle',
    initSystem: 'systemd',
    summary: 'Red Hat Enterprise Linux is the commercial operating system driving global Fortune 500 banks, airlines, and cloud infrastructure. For users and enterprises willing to pay for enterprise vendor SLAs, certified hardware compliance, kernel live-patching, and dedicated support hotlines, RHEL is the undisputed market leader.',
    strengths: [
      'World-class 24/7 phone support and guaranteed SLAs for mission-critical infrastructure',
      'Comprehensive certifications: FIPS 140-2, Common Criteria, and hardware certification across all major OEMs',
      'Kernel live patching allows applying critical kernel vulnerability fixes without restarting servers',
      'Free individual developer subscriptions available for up to 16 systems'
    ],
    considerations: [
      'Requires paid commercial subscriptions for production business support',
      'Strict change-management means desktop gaming and consumer apps are secondary'
    ],
    traits: ['Commercial Support', 'Fortune 500 Standard', 'Live Patching', 'FIPS Certified', 'Paid License Tier']
  },
  {
    id: 'gentoo',
    name: 'Gentoo Linux',
    tagline: 'Source-based distribution compiled for your exact CPU with limitless custom USE flags.',
    badge: 'Source Compilation & Ultimate Control',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#4e4376"/><path d="M24 10c-7.7 0-14 5.4-14 12 0 4.2 2.6 7.9 6.6 10l2-3.5C15.5 27 14 24.6 14 22c0-4.4 4.5-8 10-8s10 3.6 10 8c0 3.4-2.7 6.4-6.8 7.5v4.2c6.3-1.3 10.8-5.9 10.8-11.7 0-6.6-6.3-12-14-12z" fill="#ffffff"/></svg>`,
    accentColor: '#54487a',
    website: 'https://www.gentoo.org',
    base: 'Independent',
    packageManager: 'Portage (`emerge`)',
    defaultDE: 'Anything you compile',
    releaseModel: 'Continuous Rolling Release',
    initSystem: 'OpenRC or systemd',
    summary: 'Gentoo is a source-based Linux distribution built around the Portage package system. Instead of downloading pre-compiled binaries, you compile packages directly on your machine with custom compiler flags (`CFLAGS`) and feature switches (`USE` flags). If you want an operating system compiled exclusively for your processor with zero unwanted bloat, Gentoo is the pinnacle.',
    strengths: [
      'Extreme optimization: software is compiled with architecture flags (`-march=native`) tuned to your exact CPU',
      'Total customization via USE flags: disable Bluetooth, systemd, or Wayland globally from every package',
      'Unmatched educational value: teaches you how C compilers, linking, kernel configuration, and modules operate',
      'Rock-solid stability through curated Portage package profiles and independent OpenRC / systemd options'
    ],
    considerations: [
      'Compiling large packages like Chromium, LLVM, or LibreOffice takes hours (or days on older CPUs)',
      'Requires extensive reading and patience during installation and maintenance'
    ],
    traits: ['Compile from Source', 'Portage & USE flags', 'Native CPU Speed', 'OpenRC / systemd', 'Hardcore DIY']
  },
  {
    id: 'manjaro',
    name: 'Manjaro Linux',
    tagline: 'Accessible Arch-based distro with curated update branches and the Pamac GUI app store.',
    badge: 'Approachable Arch with GUI App Store',
    logo: `<svg viewBox="0 0 48 48" class="distro-svg-logo"><rect width="48" height="48" rx="10" fill="#35bf5c"/><rect x="12" y="12" width="6" height="24" fill="#ffffff"/><rect x="21" y="20" width="6" height="16" fill="#ffffff"/><rect x="30" y="12" width="6" height="24" fill="#ffffff"/><rect x="21" y="12" width="6" height="6" fill="#ffffff"/></svg>`,
    accentColor: '#35bf5c',
    website: 'https://manjaro.org',
    base: 'Arch Linux base',
    packageManager: 'Pamac / pacman',
    defaultDE: 'KDE Plasma, XFCE, or GNOME',
    releaseModel: 'Curated Rolling Release',
    initSystem: 'systemd',
    summary: 'Manjaro brings the benefits of Arch Linux into a turnkey experience. Its package updates are held back for an extra 1 to 2 weeks of community testing before release to prevent unexpected regressions. With the sleek Pamac application manager, you can install native repo packages, Flatpaks, Snaps, and AUR software with simple graphical checkboxes.',
    strengths: [
      'Pamac graphical software center seamlessly searches and installs Arch repo, AUR, Flatpak, and Snap apps',
      'Curated update branch holds back raw Arch packages for additional testing to reduce rolling breakages',
      'Manjaro Hardware Detection (MHWD) automatically identifies and installs proprietary NVIDIA and Wi-Fi drivers',
      'Provides polished flagship editions for KDE Plasma, GNOME, and lightweight XFCE'
    ],
    considerations: [
      'Holding back packages by 1–2 weeks can occasionally cause minor timing desyncs with immediate AUR builds',
      'Slightly heavier out of the box than pure Arch'
    ],
    traits: ['Pamac App Store', 'Arch Derivative', 'Hardware Auto-Detect', 'Curated Rolling', 'KDE & GNOME']
  }
];

// Helper to look up distro by ID
function getDistroById(id) {
  return DISTROS.find(d => d.id === id) || DISTROS[0];
}

// Helper to render distro logo image with an automatic appropriately sized placeholder container fallback
function renderDistroLogo(distro, size = 'large') {
  const initials = distro.name
    .split(/[\s/!_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  const logoFile = `images/distros/${distro.id}.svg`;

  return `
    <div class="distro-logo-box distro-logo-${size}" style="--distro-accent: ${distro.accentColor || '#33c3f0'};">
      <img src="${logoFile}" 
           alt="${distro.name} logo" 
           class="distro-img-asset" 
           onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='flex';" />
      <div class="distro-logo-placeholder" style="display: none; background-color: ${distro.accentColor || '#33c3f0'}22; border-color: ${distro.accentColor || '#33c3f0'}; color: ${distro.accentColor || '#33c3f0'};">
        <span class="placeholder-text">${initials}</span>
      </div>
    </div>
  `;
}

