/**
 * Linux Distro Quiz Questions for FOSS49
 * 18 in-depth, weed-level questions covering:
 * - Workload & use case
 * - Operating system familiarity
 * - Desktop environment / Tiling window managers
 * - Graphics hardware (NVIDIA vs AMD vs Intel vs Apple Silicon)
 * - Hardware age & resource limitations
 * - Release cadence (Rolling vs LTS vs Semi-rolling)
 * - Stability vs Bleeding Edge philosophy
 * - Package ecosystem (.deb vs .rpm vs pacman vs Nix vs Flatpak)
 * - Immutability & atomic updates
 * - Proprietary code & binary blob stance
 * - Commercial / Paid distro willingness
 * - Installation complexity (GUI vs Guided TUI vs Hardcore DIY)
 * - Init system (systemd vs runit vs OpenRC vs SysVinit)
 * - Terminal & CLI comfort level
 * - Privacy, telemetry & compartmentation
 * - Laptop power & battery optimization
 * - Gaming & Proton focus
 * - Community size & documentation preference
 */

const QUESTIONS = [
  {
    id: 'workload',
    title: 'Primary Workload',
    category: 'Use Case & Workflow',
    prompt: 'What will be the primary purpose or main workload of this Linux machine?',
    hint: 'Different distros are specifically tuned for gaming kernels, homelab servers, developer workflows, or security auditing.',
    options: [
      {
        id: 'gaming',
        label: 'AAA Gaming & Steam',
        desc: 'Playing modern PC games via Steam, Proton, Heroic, Lutris, and Wine with latest GPU drivers and controller support.',
        badge: 'High Performance',
        weights: { bazzite: 40, popos: 35, arch: 20, endeavour: 20, fedora: 15, manjaro: 15, debian: -15, alpine: -40, kali: -35, tails: -45, qubes: -45 },
        impactReason: 'You specified gaming as your primary workload. Distros like Bazzite and Pop!_OS are custom-tuned with gaming kernels, Proton, and graphics optimizations out of the box.'
      },
      {
        id: 'dev_containers',
        label: 'Software Engineering & Containers',
        desc: 'Writing code, compiling software, orchestrating Docker/Podman containers, and deploying microservices.',
        badge: 'Developer Focus',
        weights: { fedora: 35, silverblue: 35, nixos: 35, arch: 25, endeavour: 20, ubuntu: 20, debian: 15, tumbleweed: 20 },
        impactReason: 'Software development and container orchestration heavily favor Fedora, Silverblue, and NixOS due to Toolbx/Distrobox container workflows and cutting-edge toolchains.'
      },
      {
        id: 'homelab_server',
        label: 'Homelab, Self-Hosting & NAS',
        desc: 'Running a 24/7 home server, Jellyfin/Plex media server, Nextcloud, Samba file sharing, or network services.',
        badge: 'Homelab Essential',
        weights: { debian: 40, almalinux: 40, alpine: 25, ubuntu: 20, rhel: 25, nixos: 20, kali: -30, tails: -45, popos: -15 },
        impactReason: 'Homelab and self-hosting prioritize rock-solid reliability, low memory overhead, and long support cycles — areas where Debian and AlmaLinux are undisputed leaders.'
      },
      {
        id: 'pentest',
        label: 'Cybersecurity & Ethical Hacking',
        desc: 'Penetration testing, network security auditing, reverse engineering, vulnerability assessments, and digital forensics.',
        badge: 'Security Specialist',
        weights: { kali: 65, debian: 10, arch: 10, mint: -20, zorin: -20, bazzite: -30 },
        impactReason: 'Cybersecurity penetration testing specifically requires Kali Linux due to its 600+ pre-installed security tools and custom-patched wireless injection kernel.'
      },
      {
        id: 'privacy',
        label: 'Extreme Privacy & Anti-Surveillance',
        desc: 'Whistleblowing, anonymous browsing, defeating ISP censorship, zero trace on local storage, and secure communications.',
        badge: 'Maximum Anonymity',
        weights: { tails: 60, qubes: 45, debian: 15, ubuntu: -25, zorin: -15, mint: -10 },
        impactReason: 'Demanding extreme privacy and anti-surveillance directly points to Tails (Tor-routed amnesic USB) or Qubes OS (compartmentalized Xen hypervisor).'
      },
      {
        id: 'everyday',
        label: 'Everyday Desktop & Productivity',
        desc: 'Web browsing, video streaming, document editing, email, photo management, and casual computing.',
        badge: 'Most Common',
        weights: { mint: 35, zorin: 35, ubuntu: 25, fedora: 20, popos: 20, manjaro: 15, arch: -15, gentoo: -35, kali: -35, alpine: -30, tails: -40 },
        impactReason: 'General desktop productivity favors welcoming, user-friendly distributions like Linux Mint and Zorin OS that require zero maintenance or terminal knowledge.'
      }
    ]
  },
  {
    id: 'prior_os',
    title: 'Operating System Background',
    category: 'Desktop & Experience',
    prompt: 'Which operating system are you currently most accustomed to using?',
    hint: 'Linux desktop layouts can seamlessly mimic Windows taskbars, macOS docks, or provide entirely new keyboard-driven paradigms.',
    options: [
      {
        id: 'windows',
        label: 'Windows 10 / 11',
        desc: 'Comfortable with a bottom taskbar, start menu at the bottom-left, system tray, and standard drive letters.',
        badge: 'Familiar Layout',
        weights: { mint: 35, zorin: 35, popos: 15, manjaro: 15, tumbleweed: 15, arch: -20, gentoo: -35, void: -25, alpine: -30 },
        impactReason: 'Moving from Windows makes Linux Mint and Zorin OS instant home runs because their default layouts mirror the Windows Start Menu, taskbar, and system tray.'
      },
      {
        id: 'macos',
        label: 'macOS',
        desc: 'Accustomed to an app dock, clean top menu bar, smooth multi-touch gestures, and refined typographic polish.',
        badge: 'Apple Workflow',
        weights: { fedora: 30, silverblue: 25, popos: 25, zorin: 25, ubuntu: 20, antix: -20, gentoo: -20 },
        impactReason: 'macOS users feel right at home with GNOME-based distros like Fedora, Ubuntu, and Zorin OS (which has a dedicated 1-click macOS desktop layout).'
      },
      {
        id: 'chromeos',
        label: 'ChromeOS / Cloud-First',
        desc: 'Primarily live inside a web browser, prefer lightweight sandboxed apps, and want simple maintenance.',
        badge: 'Web & Cloud',
        weights: { silverblue: 25, bazzite: 25, mint: 20, antix: 15, alpine: 15 },
        impactReason: 'A cloud-first background aligns with immutable, container-based distros like Fedora Silverblue and Bazzite that treat the root system as a locked appliance.'
      },
      {
        id: 'linux_veteran',
        label: 'Experienced Linux User',
        desc: 'Already comfortable with bash/zsh, file hierarchies, and package managers; looking for high control or advanced architecture.',
        badge: 'Power User',
        weights: { arch: 35, nixos: 35, gentoo: 30, void: 25, endeavour: 20, tumbleweed: 20, debian: 15, mint: -15, zorin: -15 },
        impactReason: 'Prior Linux experience unlocks deep power-user distros like Arch, NixOS, and Void that reward hands-on customization and terminal proficiency.'
      }
    ]
  },
  {
    id: 'desktop_style',
    title: 'Desktop & Window Manager',
    category: 'Desktop & Experience',
    prompt: 'What type of desktop interface or window manager style do you prefer?',
    hint: 'From traditional taskbars to fluid GNOME workflows and keyboard-driven tiling window managers.',
    options: [
      {
        id: 'classic_taskbar',
        label: 'Classic Taskbar & Start Menu (KDE Plasma, Cinnamon, XFCE)',
        desc: 'Traditional bottom panel, window task list, notification tray, and application launcher.',
        badge: 'Traditional',
        weights: { mint: 35, zorin: 25, tumbleweed: 25, bazzite: 20, manjaro: 20, debian: 15 },
        impactReason: 'Preferring a traditional taskbar and start menu strongly favors Linux Mint (Cinnamon), openSUSE (KDE Plasma flagship), and Zorin OS.'
      },
      {
        id: 'modern_gnome',
        label: 'Modern Gestures & Dynamic Workspaces (GNOME, COSMIC)',
        desc: 'Minimalist screen with no distracting panels, dynamic virtual desktops, full-screen app launcher, and touchpad gestures.',
        badge: 'Fluid & Modern',
        weights: { fedora: 35, silverblue: 35, ubuntu: 30, popos: 25, tails: 15, antix: -25 },
        impactReason: 'A desire for modern gestures and dynamic workspaces aligns directly with Fedora, Ubuntu, and Pop!_OS, which lead GNOME and COSMIC development.'
      },
      {
        id: 'tiling_wm',
        label: 'Dynamic Tiling Window Manager (Hyprland, i3, Sway)',
        desc: 'Keyboard-driven window tiling where windows never overlap and screen space is automatically partitioned.',
        badge: 'Keyboard Only',
        weights: { arch: 35, endeavour: 30, nixos: 30, void: 25, gentoo: 20, mint: -25, zorin: -25, ubuntu: -15 },
        impactReason: 'Tiling window managers (like Hyprland and i3) thrive in DIY rolling distros like Arch, EndeavourOS, and NixOS with up-to-date Wayland compositors.'
      },
      {
        id: 'lightweight_retro',
        label: 'Lightweight & Snappy (IceWM, LXQt, MATE)',
        desc: 'Ultra-fast, zero bloat, low resource usage; prioritizes instant responsiveness over transparent blurs and animations.',
        badge: 'Resource Saver',
        weights: { antix: 40, alpine: 25, void: 20, debian: 20, mint: 15, fedora: -20, ubuntu: -20 },
        impactReason: 'Choosing lightweight, low-resource window managers favors antiX, Alpine, and Void, which boot with under 200MB of RAM usage.'
      },
      {
        id: 'headless_cli',
        label: 'No GUI / Headless Server (Console CLI Only)',
        desc: 'Zero graphical server; administration is conducted exclusively through SSH and tmux.',
        badge: 'Server Mode',
        weights: { almalinux: 35, alpine: 35, debian: 30, rhel: 30, nixos: 20, mint: -30, zorin: -30 },
        impactReason: 'Running headless without a GUI points straight to dedicated server operating systems like AlmaLinux, Alpine, Debian, and RHEL.'
      }
    ]
  },
  {
    id: 'gpu_hardware',
    title: 'Graphics Card / GPU',
    category: 'Hardware & Architecture',
    prompt: 'What graphics card / GPU hardware is in the target machine?',
    hint: 'NVIDIA requires proprietary kernel modules for full 3D and CUDA; AMD and Intel have open-source drivers built directly into the Linux kernel.',
    options: [
      {
        id: 'nvidia',
        label: 'Dedicated NVIDIA GeForce / RTX / Quadro',
        desc: 'Requires proprietary NVIDIA driver modules for Vulkan, CUDA computing, NVENC video encoding, and optimal 3D frame rates.',
        badge: 'Proprietary Driver',
        weights: { popos: 35, bazzite: 30, mint: 15, manjaro: 15, fedora: 10, debian: -10, alpine: -25, tails: -15 },
        impactReason: 'Dedicated NVIDIA hardware benefits dramatically from Pop!_OS and Bazzite, which provide official pre-packaged NVIDIA ISOs with drivers ready on boot.'
      },
      {
        id: 'amd_radeon',
        label: 'AMD Radeon Graphics (RDNA / RX Series)',
        desc: 'First-class open-source driver (`amdgpu` + Mesa) integrated into the upstream Linux kernel; plug-and-play gaming.',
        badge: 'Open Source Gold Standard',
        weights: { fedora: 25, arch: 25, bazzite: 25, endeavour: 20, tumbleweed: 20, debian: 15 },
        impactReason: 'AMD Radeon GPUs enjoy pristine upstream open-source driver support, making rolling and leading-edge distros like Fedora and Arch effortless.'
      },
      {
        id: 'intel',
        label: 'Intel Integrated Graphics / Intel Arc',
        desc: 'Built-in Intel UHD/Iris Xe graphics or Intel Arc discrete GPU; reliable open-source Linux kernel drivers.',
        badge: 'Plug & Play',
        weights: { fedora: 15, mint: 15, ubuntu: 15, debian: 15, arch: 10 },
        impactReason: 'Intel graphics provide universally reliable, standard open-source drivers supported smoothly across virtually all modern distributions.'
      },
      {
        id: 'apple_arm',
        label: 'Apple Silicon (M1/M2/M3) or ARM SBC (Raspberry Pi)',
        desc: 'ARM64 architecture requiring specialized kernels (such as Asahi Linux) or lightweight ARM image builds.',
        badge: 'ARM64 Architecture',
        weights: { fedora: 30, debian: 25, alpine: 20, ubuntu: 20, arch: 15, popos: -20, zorin: -20 },
        impactReason: 'Apple Silicon and ARM SBCs require dedicated ARM64 kernel support, which Fedora (official Asahi remix) and Debian support exceptionally well.'
      },
      {
        id: 'vm_basic',
        label: 'Virtual Machine / Basic Display',
        desc: 'Running inside Proxmox, VirtualBox, VMware, or QEMU/KVM with virtual display adapters.',
        badge: 'Virtual Environment',
        weights: { mint: 20, debian: 20, ubuntu: 20, fedora: 20, almalinux: 15 },
        impactReason: 'Virtual machine guests run smoothly on standard stable distros like Linux Mint, Debian, and Ubuntu with pre-packaged guest agent utilities.'
      }
    ]
  },
  {
    id: 'hardware_age',
    title: 'Hardware Resources & Age',
    category: 'Hardware & Architecture',
    prompt: 'How powerful is the computer you plan to install this on?',
    hint: 'Certain modern desktop environments require 4GB+ RAM and 3D acceleration, while minimalist distros can run smoothly on 512MB RAM.',
    options: [
      {
        id: 'high_end',
        label: 'Modern Powerhouse (16GB+ RAM, fast NVMe, multi-core CPU)',
        desc: 'Plenty of RAM and CPU horsepower to run virtual machines, compile code, or play intensive 3D games.',
        badge: 'High Spec',
        weights: { qubes: 35, bazzite: 25, fedora: 20, nixos: 20, arch: 15 },
        impactReason: 'Having 16GB+ RAM and a modern multi-core CPU lets you take full advantage of demanding systems like Qubes OS, NixOS, or Bazzite.'
      },
      {
        id: 'mid_tier',
        label: 'Standard Modern PC / Laptop (8GB – 16GB RAM, SSD)',
        desc: 'A typical laptop or desktop from the last 5–8 years; capable of running any major desktop environment.',
        badge: 'Standard Specs',
        weights: { mint: 25, fedora: 20, popos: 20, ubuntu: 20, tumbleweed: 15, zorin: 15 },
        impactReason: 'Standard modern hardware handles mainstream flagship distributions like Linux Mint, Fedora, and Pop!_OS with peak responsiveness.'
      },
      {
        id: 'potato_low',
        label: 'Older / Low-Spec PC (Under 4GB RAM, slow dual-core, older HDD)',
        desc: 'A legacy machine, netbook, or budget computer that chokes on heavy modern desktop operating systems.',
        badge: 'Potato Resuscitation',
        weights: { antix: 45, alpine: 35, void: 25, debian: 20, fedora: -30, ubuntu: -30, qubes: -50, bazzite: -35 },
        impactReason: 'Sub-4GB RAM and older hardware heavily penalizes heavy GNOME/KDE distros and strongly boosts antiX, Alpine, and Void Linux.'
      }
    ]
  },
  {
    id: 'release_model',
    title: 'Release Cadence',
    category: 'System Philosophy',
    prompt: 'What kind of release and update cycle do you prefer?',
    hint: 'Rolling releases receive updates continuously; point releases stay frozen on proven package versions for months or years.',
    options: [
      {
        id: 'bleeding_rolling',
        label: 'Bleeding-Edge Rolling Release',
        desc: 'Continual updates as soon as upstream software is published. You install once and update forever with no major OS reinstall.',
        badge: 'Always Fresh',
        weights: { arch: 35, endeavour: 30, tumbleweed: 25, void: 25, gentoo: 25, debian: -30, almalinux: -35, mint: -25 },
        impactReason: 'Demanding a continuous rolling release rules out fixed-point distros and favors Arch, EndeavourOS, openSUSE Tumbleweed, and Void.'
      },
      {
        id: 'semi_rolling',
        label: 'Rapid Point Release (every ~6 months)',
        desc: 'Semi-annual major updates bringing fresh software, new desktop versions, and updated kernels with a stable release baseline.',
        badge: 'Upstream Pace',
        weights: { fedora: 35, silverblue: 35, ubuntu: 15, popos: 15 },
        impactReason: 'A rapid 6-month release cadence is the hallmark of Fedora Workstation and Silverblue, balancing new software with stability.'
      },
      {
        id: 'rock_solid_lts',
        label: 'Long Term Support (LTS) / Fixed Point (~2–5 years)',
        desc: 'Packages remain frozen on thoroughly tested versions; you receive only security patches. Extreme predictability.',
        badge: 'Rock Solid',
        weights: { debian: 35, almalinux: 35, mint: 30, rhel: 30, ubuntu: 25, zorin: 20, arch: -35, gentoo: -35 },
        impactReason: 'Valuing frozen, predictable Long Term Support points straight to Debian Stable, AlmaLinux, Linux Mint, and RHEL.'
      }
    ]
  },
  {
    id: 'stability_philosophy',
    title: 'Stability vs Latest Features',
    category: 'System Philosophy',
    prompt: 'When an update is released, what is your stance on stability versus having the newest features?',
    hint: 'In Linux terminology, "stability" means "does not change unexpectedly" rather than just "doesn’t crash".',
    options: [
      {
        id: 'never_break',
        label: '“Never Break My Setup” — Absolute stability is king',
        desc: 'I do not care if my web browser or LibreOffice is a few versions behind. I want a system that will boot without surprises every single day.',
        badge: 'Maximum Reliability',
        weights: { debian: 35, almalinux: 35, mint: 25, rhel: 25, ubuntu: 15, arch: -25 },
        impactReason: 'Prioritizing unwavering reliability where packages never shift unexpectedly favors Debian and AlmaLinux over fast-moving rolling distros.'
      },
      {
        id: 'tested_cutting_edge',
        label: '“Best of Both Worlds” — Leading edge, but vetted with automated QA or snapshots',
        desc: 'I want modern software, but I want automated testing (like openQA) or atomic snapshots (Btrfs / Snapper / rpm-ostree) as a safety net.',
        badge: 'Smart Modernity',
        weights: { tumbleweed: 35, silverblue: 35, bazzite: 30, fedora: 25 },
        impactReason: 'Wanting leading-edge software protected by automated testing or snapshots gives openSUSE Tumbleweed and Silverblue an enormous advantage.'
      },
      {
        id: 'give_me_latest',
        label: '“Give Me the Latest Kernel & Drivers Immediately”',
        desc: 'I want the newest graphics drivers and kernel features immediately. I am comfortable reading release notes or adjusting configurations if needed.',
        badge: 'Bleeding Edge',
        weights: { arch: 35, endeavour: 30, gentoo: 25, void: 20, debian: -25, almalinux: -30 },
        impactReason: 'An appetite for immediate kernel and driver releases favors Arch Linux and EndeavourOS, where packages land hours after upstream.'
      }
    ]
  },
  {
    id: 'package_ecosystem',
    title: 'Package Management',
    category: 'System Philosophy',
    prompt: 'Which package management ecosystem and software distribution format do you prefer?',
    hint: 'Package managers handle installing, updating, and removing software from central repositories.',
    options: [
      {
        id: 'deb_apt',
        label: 'Debian / Ubuntu Family (.deb, apt)',
        desc: 'The most ubiquitous package format; massive library of pre-built .deb files, PPAs, and standard `apt install`.',
        badge: 'Most Supported',
        weights: { debian: 30, ubuntu: 30, mint: 30, popos: 25, zorin: 25, kali: 20 },
        impactReason: 'Choosing the Debian/Ubuntu `.deb` ecosystem favors Debian, Linux Mint, Pop!_OS, and Ubuntu due to their deep APT integration.'
      },
      {
        id: 'rpm_dnf',
        label: 'Red Hat / Fedora Family (.rpm, dnf, zypper)',
        desc: 'Clean, enterprise-grade package management with rich dependency solving and delta-RPM updates.',
        badge: 'Enterprise Standard',
        weights: { fedora: 35, almalinux: 35, rhel: 35, tumbleweed: 25, silverblue: 20 },
        impactReason: 'An affinity for the RPM ecosystem places Fedora, AlmaLinux, RHEL, and openSUSE at the very front of the recommendation.'
      },
      {
        id: 'arch_pacman_aur',
        label: 'Arch Family (pacman + Arch User Repository / AUR)',
        desc: 'Fastest binary package manager (`pacman`) paired with the AUR, which can build almost any GitHub project with a single command.',
        badge: 'Massive Selection',
        weights: { arch: 35, endeavour: 35, manjaro: 30 },
        impactReason: 'Choosing `pacman` and the AUR points directly to Arch Linux and EndeavourOS, unlocking access to the largest community software repository.'
      },
      {
        id: 'nix_pkg',
        label: 'Declarative Functional Packages (Nix / Flakes)',
        desc: 'Isolated package installation into `/nix/store` with atomic generation rollbacks and dev shells (`nix develop`).',
        badge: 'Declarative Superpower',
        weights: { nixos: 55, arch: -10, ubuntu: -10 },
        impactReason: 'A preference for declarative, functional Nix packages uniquely identifies NixOS as the exact operating system tailored to your tastes.'
      },
      {
        id: 'flatpak_immutable',
        label: 'Sandboxed Universal Containers (Flatpak / OCI)',
        desc: 'Applications run isolated inside Flatpak sandboxes, keeping the underlying system clean and unpolluted.',
        badge: 'Container Sandboxed',
        weights: { silverblue: 35, bazzite: 35, fedora: 20, popos: 15 },
        impactReason: 'Universal Flatpak container packaging is the foundational philosophy behind Fedora Silverblue and Bazzite.'
      },
      {
        id: 'independent_minimal',
        label: 'Minimalist Independent Managers (xbps, apk, Portage)',
        desc: 'Specialized package managers built for speed and simplicity without heavy corporate dependency frameworks.',
        badge: 'Speed & Minimalism',
        weights: { void: 35, alpine: 35, gentoo: 30 },
        impactReason: 'Appreciating independent, fast package tools highlights Void Linux (`xbps`), Alpine (`apk`), and Gentoo (`emerge`).'
      }
    ]
  },
  {
    id: 'immutability',
    title: 'Root Filesystem Architecture',
    category: 'Hardware & Architecture',
    prompt: 'Do you want an immutable (read-only) root filesystem or a traditional read-write filesystem?',
    hint: 'Immutable OSes mount `/usr` as read-only, preventing accidental system file corruption and enabling 1-click bootloader rollbacks.',
    options: [
      {
        id: 'immutable_atomic',
        label: 'Immutable / Atomic (Read-only root with rollbacks)',
        desc: 'Operating system updates are applied as a single atomic image. If anything breaks, you reboot into the prior snapshot in 10 seconds.',
        badge: 'Unbreakable',
        weights: { bazzite: 40, silverblue: 40, nixos: 25, tumbleweed: 20, mint: -15, arch: -15 },
        impactReason: 'Selecting an immutable root filesystem directs you toward Bazzite and Fedora Silverblue, which make corrupting system libraries virtually impossible.'
      },
      {
        id: 'declarative_state',
        label: 'Purely Declarative State (Defined by a config file)',
        desc: 'The entire system state (packages, services, users, dotfiles) is synthesized from a single declarative configuration file.',
        badge: 'Reproducible Infra',
        weights: { nixos: 55, arch: -10, debian: -10 },
        impactReason: 'Purely declarative configuration is the single defining signature of NixOS, allowing you to replicate your entire computer from one config file.'
      },
      {
        id: 'traditional_mutable',
        label: 'Traditional Read-Write Hierarchy',
        desc: 'Classic Linux directory structure where package managers install directly into `/usr`, `/bin`, and `/etc`. Familiar and flexible.',
        badge: 'Classic Unix',
        weights: { mint: 20, arch: 20, debian: 20, fedora: 15, ubuntu: 15, bazzite: -20, silverblue: -20 },
        impactReason: 'Preferring a traditional mutable Unix filesystem favors classical distributions like Linux Mint, Debian, Arch, and standard Fedora.'
      }
    ]
  },
  {
    id: 'proprietary_stance',
    title: 'Proprietary Codecs & Drivers',
    category: 'System Philosophy',
    prompt: 'What is your stance on proprietary binary blobs, hardware drivers, and multimedia codecs?',
    hint: 'Some distros bundle proprietary Wi-Fi/NVIDIA drivers by default; others adhere strictly to Free Software Foundation (FSF) purity.',
    options: [
      {
        id: 'pragmatic_all',
        label: 'Pragmatic — Include proprietary drivers and codecs out of the box',
        desc: 'I want my Wi-Fi, NVIDIA GPU, MP3/AAC audio, and Netflix streaming to work immediately without having to search online forums.',
        badge: 'Zero Friction',
        weights: { mint: 30, popos: 30, bazzite: 25, zorin: 25, manjaro: 20, debian: -15 },
        impactReason: 'A pragmatic approach to proprietary blobs boosts Linux Mint, Pop!_OS, and Bazzite, which pre-package media codecs and drivers.'
      },
      {
        id: 'clean_with_toggle',
        label: 'Clean Open-Source Default, but with an easy 1-click toggle',
        desc: 'Ship with 100% open-source software by default, but provide an easy checkbox or repository toggle (e.g. RPM Fusion) to add non-free blobs.',
        badge: 'Balanced Ethos',
        weights: { fedora: 30, tumbleweed: 25, endeavour: 20, debian: 20 },
        impactReason: 'Valuing open-source defaults with easy non-free repository toggles is the core philosophy of Fedora Workstation and openSUSE.'
      },
      {
        id: 'strict_fsf',
        label: 'Strict Free Software (FSF Ethos) — 100% Libre Only',
        desc: 'Firm commitment to software freedom; prefer distributions that actively reject closed-source proprietary spyware and binary blobs.',
        badge: 'Libre Pure',
        weights: { debian: 35, alpine: 15, gentoo: 15, popos: -25, zorin: -25, mint: -20 },
        impactReason: 'A strict dedication to Free Software Foundation guidelines heavily favors Debian, which separates software into free and non-free archives.'
      }
    ]
  },
  {
    id: 'willingness_to_pay',
    title: 'Commercial / Paid Distros',
    category: 'System Philosophy',
    prompt: 'Are you open to paying for a commercial distro tier, professional support, or bundled creative suites?',
    hint: 'Most Linux distros are 100% free community projects, but a few offer paid editions with commercial support or curated layouts.',
    options: [
      {
        id: 'free_only',
        label: '100% Free & Community Driven',
        desc: 'I will never pay for an operating system license or subscription. Everything must be gratis and community-governed.',
        badge: '100% Free',
        weights: { debian: 25, arch: 20, fedora: 20, almalinux: 20, mint: 20, void: 15, alpine: 15, rhel: -35 },
        impactReason: 'Demanding a 100% community-free operating system with zero commercial tiers highlights community legends like Debian, Arch, and Linux Mint.'
      },
      {
        id: 'paid_ok',
        label: 'Willing to Pay for Commercial Support or Pro Features',
        desc: 'I am happy to purchase a paid distro tier (e.g. Zorin OS Pro) or an enterprise support contract (Red Hat Enterprise Linux) for convenience and support.',
        badge: 'Commercial Tier',
        weights: { zorin: 40, rhel: 45, ubuntu: 15 },
        impactReason: 'Openness to paid options strongly favors Zorin OS (which offers Zorin OS Pro with extra layouts and support) and RHEL for enterprise.'
      }
    ]
  },
  {
    id: 'install_experience',
    title: 'Installation & Setup Experience',
    category: 'Desktop & Experience',
    prompt: 'How involved do you want the installation and setup process to be?',
    hint: 'Installation ranges from automated 15-minute point-and-click wizards to manual command-line bootstrapping.',
    options: [
      {
        id: 'gui_wizard',
        label: 'Graphical Wizard (Calamares, Ubiquity, Anaconda)',
        desc: 'Intuitive point-and-click installer with automated partitioning, user account creation, and hardware auto-detection in 10–15 minutes.',
        badge: 'Quick & Easy',
        weights: { mint: 30, popos: 30, zorin: 30, ubuntu: 25, endeavour: 20, manjaro: 20, arch: -25, gentoo: -40 },
        impactReason: 'Wanting an intuitive graphical installer strongly favors Linux Mint, Pop!_OS, Zorin OS, and EndeavourOS.'
      },
      {
        id: 'guided_tui',
        label: 'Guided Text / TUI Menu (`archinstall`, Debian text installer)',
        desc: 'Menu-driven terminal interface where you select disk partitions, desktop environments, and network options from clean menus.',
        badge: 'Guided CLI',
        weights: { debian: 25, alpine: 25, endeavour: 20, arch: 20, void: 20, almalinux: 15 },
        impactReason: 'A preference for guided text-mode or TUI installers aligns well with Debian, Alpine Linux, and `archinstall`.'
      },
      {
        id: 'diy_bootstrap',
        label: 'Hardcore DIY from Scratch (`pacstrap`, `emerge`, chroot)',
        desc: 'Booting into a minimal shell prompt and manually partitioning with `fdisk`, formatting filesystems, creating `fstab`, and compiling a kernel.',
        badge: 'Hacker Rite of Passage',
        weights: { arch: 35, gentoo: 45, void: 25, nixos: 25, mint: -30, zorin: -30 },
        impactReason: 'Embracing manual CLI bootstrapping from scratch is the domain of Arch Linux, Gentoo, and Void Linux.'
      }
    ]
  },
  {
    id: 'init_system',
    title: 'Init System & Service Supervisor',
    category: 'Hardware & Architecture',
    prompt: 'What is your preference for the system init system and service manager?',
    hint: 'systemd is the modern industry standard, while alternative init systems (runit, OpenRC, SysVinit) offer modular Unix minimalism.',
    options: [
      {
        id: 'systemd',
        label: 'Standard systemd (Industry standard, widest compatibility)',
        desc: 'Standardized service management with `systemctl`, `journalctl`, systemd-boot, and near-universal documentation.',
        badge: 'Standard Init',
        weights: { ubuntu: 20, fedora: 20, debian: 20, arch: 20, tumbleweed: 20, mint: 15 },
        impactReason: 'Sticking with industry-standard systemd ensures complete compatibility with standard tutorials and commercial software.'
      },
      {
        id: 'non_systemd',
        label: 'Non-systemd / Unix Minimalism (runit, OpenRC, SysVinit)',
        desc: 'Reject systemd complexity in favor of fast, simple, and transparent process supervision that boots in fractions of a second.',
        badge: 'Systemd Free',
        weights: { void: 45, alpine: 45, antix: 40, gentoo: 30, ubuntu: -35, fedora: -35, mint: -25, arch: -25 },
        impactReason: 'Specifically requesting a non-systemd init system catapults Void Linux (runit), Alpine (OpenRC), and antiX (SysVinit/runit) to the top.'
      },
      {
        id: 'dont_care_init',
        label: 'No Preference / What is an init system?',
        desc: 'I do not care what manages background services as long as my programs start reliably.',
        badge: 'Neutral',
        weights: {},
        impactReason: 'Having no strong opinion on init systems keeps all mainstream options open without penalties.'
      }
    ]
  },
  {
    id: 'terminal_comfort',
    title: 'Terminal & CLI Comfort',
    category: 'Desktop & Experience',
    prompt: 'How comfortable are you using the command-line terminal?',
    hint: 'Some distros can be operated for years without ever launching a terminal, while others require CLI for package updates.',
    options: [
      {
        id: 'gui_only',
        label: 'GUI Only — I prefer never touching the terminal',
        desc: 'I want a graphical software store, graphical update manager, graphical driver updater, and settings app for everything.',
        badge: 'Zero Terminal',
        weights: { mint: 35, zorin: 35, ubuntu: 20, arch: -40, gentoo: -50, void: -35, alpine: -35 },
        impactReason: 'A strict preference for graphical point-and-click tools makes Linux Mint and Zorin OS the best choices and disqualifies DIY distros.'
      },
      {
        id: 'basic_cli',
        label: 'Basic Comfort — Can copy-paste commands when needed',
        desc: 'Comfortable following online guides or running occasional maintenance commands (`sudo apt update`, `sudo dnf upgrade`).',
        badge: 'Comfortable',
        weights: { fedora: 20, popos: 25, tumbleweed: 20, debian: 20, endeavour: 15, mint: 10 },
        impactReason: 'Basic command-line comfort opens the door to high-productivity distros like Fedora, Pop!_OS, and openSUSE.'
      },
      {
        id: 'cli_power',
        label: 'CLI Power User — I live in the terminal',
        desc: 'I spend my day in tmux, Neovim/vim, zsh, fzf, and git. I prefer lightweight CLI tools over sluggish GUI apps.',
        badge: 'Terminal Native',
        weights: { arch: 35, gentoo: 35, nixos: 30, void: 30, alpine: 25, mint: -15, zorin: -15 },
        impactReason: 'Being a terminal-first power user favors distros like Arch, Gentoo, NixOS, and Void that stay completely out of your way.'
      }
    ]
  },
  {
    id: 'privacy_telemetry',
    title: 'Privacy & Telemetry',
    category: 'System Philosophy',
    prompt: 'What level of privacy, telemetry protection, and system isolation do you require?',
    hint: 'Distros vary from basic opt-in anonymous hardware telemetry to full RAM-erasing amnesic systems.',
    options: [
      {
        id: 'extreme_anonymity',
        label: 'Maximum Anonymity & Anti-Censorship (Tor routed, zero traces)',
        desc: 'Every network connection routed through Tor; amnesic memory wiped on shutdown; zero trace left on storage drives.',
        badge: 'Darknet / Whistleblower',
        weights: { tails: 60, qubes: 35, ubuntu: -25, zorin: -15 },
        impactReason: 'Needing maximum anonymity and anti-censorship is the explicit design purpose of Tails (The Amnesic Incognito Live System).'
      },
      {
        id: 'hardened_compartments',
        label: 'Hardened Compartmentalization (Isolated virtual domains)',
        desc: 'Isolate sensitive banking, browsing, and work tasks into distinct virtual compartments that cannot communicate with each other.',
        badge: 'Zero Trust',
        weights: { qubes: 55, tails: 25, alpine: 15 },
        impactReason: 'Compartmentalizing tasks across distinct virtual security domains is the unique architecture of Qubes OS.'
      },
      {
        id: 'respectful_zero',
        label: 'Clean Community OS with Zero Telemetry',
        desc: 'A standard operating system with zero corporate tracking, zero diagnostic telemetry, and zero user profiling by default.',
        badge: 'Clean Privacy',
        weights: { debian: 30, arch: 25, mint: 25, void: 20, fedora: 15 },
        impactReason: 'Preferring a clean, non-corporate OS with zero tracking favors community pillars like Debian, Arch Linux, and Linux Mint.'
      },
      {
        id: 'basic_telemetry_ok',
        label: 'Basic Anonymous Telemetry is Fine',
        desc: 'I do not mind anonymous opt-in hardware metrics if it helps developers understand what hardware to support.',
        badge: 'Pragmatic',
        weights: { ubuntu: 20, fedora: 20, popos: 15 },
        impactReason: 'Accepting basic anonymous telemetry metrics aligns smoothly with modern distributions like Ubuntu and Fedora.'
      }
    ]
  },
  {
    id: 'laptop_features',
    title: 'Laptop & Mobile Features',
    category: 'Hardware & Architecture',
    prompt: 'Will this distribution be installed on a laptop where battery life and mobile power are important?',
    hint: 'Laptops benefit from integrated power-profiles-daemon, hybrid GPU switching, and touchpad gesture handling.',
    options: [
      {
        id: 'laptop_critical',
        label: 'Yes — Laptop daily driver (Battery life, suspend, gestures matter)',
        desc: 'I need reliable sleep/suspend, optimized power profiles, dynamic GPU switching, and multi-touch trackpad gestures.',
        badge: 'Mobile Optimized',
        weights: { popos: 30, fedora: 30, mint: 20, ubuntu: 20, bazzite: 15, debian: -10, antix: -15 },
        impactReason: 'Laptop daily driving heavily benefits from Pop!_OS and Fedora due to their refined battery profiles and hybrid GPU switching.'
      },
      {
        id: 'desktop_or_server',
        label: 'No — Desktop workstation, homelab server, or VM',
        desc: 'Plugged directly into wall power with dedicated monitors, ethernet, and a standard keyboard and mouse.',
        badge: 'Plugged In',
        weights: { debian: 20, almalinux: 25, alpine: 20, arch: 15, rhel: 20 },
        impactReason: 'Desktop and server usage allows prioritizing raw performance, stability, and homelab services over battery throttling.'
      }
    ]
  },
  {
    id: 'gaming_focus',
    title: 'Gaming & Steam Integration',
    category: 'Use Case & Workflow',
    prompt: 'How critical is PC gaming (Steam, Proton, Heroic, Lutris) for this machine?',
    hint: 'Proton has revolutionized Linux gaming, allowing thousands of Windows games to run at native speed.',
    options: [
      {
        id: 'heavy_gaming',
        label: 'High Priority — Modern AAA & Steam Gaming',
        desc: 'Expect to play Cyberpunk, Elden Ring, Baldur’s Gate 3, or multiplayer titles with controller support, MangoHud, and GameMode.',
        badge: 'Gamer First',
        weights: { bazzite: 40, popos: 35, arch: 20, endeavour: 20, manjaro: 15, fedora: 15, alpine: -40, debian: -15, tails: -45 },
        impactReason: 'Modern AAA PC gaming gives Bazzite and Pop!_OS an insurmountable lead due to pre-tuned Steam, Proton, and latency optimizations.'
      },
      {
        id: 'casual_gaming',
        label: 'Casual Gaming & Emulation',
        desc: 'Occasional indie games, retro emulators (RetroArch), or lightweight 2D titles on Steam.',
        badge: 'Casual Player',
        weights: { mint: 20, ubuntu: 20, fedora: 20, tumbleweed: 15 },
        impactReason: 'Casual indie gaming is handled effortlessly by standard versatile distros like Linux Mint, Ubuntu, and Fedora.'
      },
      {
        id: 'no_gaming',
        label: 'Zero Gaming — Purely for work, study, or homelab',
        desc: 'No game launchers or 32-bit graphics libraries required; purely dedicated to productive tasks.',
        badge: 'Productivity Only',
        weights: { debian: 20, almalinux: 25, alpine: 20, rhel: 25 },
        impactReason: 'Having no need for gaming libraries frees the system to prioritize enterprise and homelab distros like Debian and AlmaLinux.'
      }
    ]
  },
  {
    id: 'community_type',
    title: 'Community & Support Culture',
    category: 'System Philosophy',
    prompt: 'What style of community and support ecosystem do you feel most comfortable with?',
    hint: 'From massive beginner-friendly forums to hacker IRC/Matrix channels and corporate enterprise SLAs.',
    options: [
      {
        id: 'massive_global',
        label: 'Massive Mainstream Community (Millions of users, endless tutorials)',
        desc: 'If I run into an error, I want to be able to Google it and find 15 answered forum threads on AskUbuntu or Reddit instantly.',
        badge: 'Giant Ecosystem',
        weights: { ubuntu: 35, mint: 30, debian: 25 },
        impactReason: 'Wanting massive, easily-searchable online documentation heavily favors Ubuntu and Linux Mint, where every error has an online answer.'
      },
      {
        id: 'hacker_tinkerer',
        label: 'Hacker & Tinkerer Culture (ArchWiki, IRC, Matrix, enthusiast forums)',
        desc: 'Deep technical documentation, concise wikis, active developer chatrooms, and an emphasis on reading the manual.',
        badge: 'Enthusiast Culture',
        weights: { arch: 35, gentoo: 35, void: 30, nixos: 30, endeavour: 25 },
        impactReason: 'An appreciation for hacker culture and concise documentation aligns with Arch Linux (celebrated ArchWiki), Gentoo, and NixOS.'
      },
      {
        id: 'enterprise_backed',
        label: 'Enterprise & Corporate Pedigree (Red Hat, SUSE, Canonical)',
        desc: 'Professional engineering standards, predictable roadmaps, compliance certifications, and commercial enterprise backing.',
        badge: 'Corporate Standard',
        weights: { rhel: 40, almalinux: 35, tumbleweed: 30, fedora: 30, ubuntu: 25 },
        impactReason: 'Valuing enterprise engineering and corporate certification favors Fedora, openSUSE, AlmaLinux, and Red Hat Enterprise Linux.'
      }
    ]
  }
];

// Helper to look up a question by ID
function getQuestionById(id) {
  return QUESTIONS.find(q => q.id === id);
}
