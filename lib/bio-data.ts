export interface GuideItem {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  updatedDate: string;
  summary: string;
  coverImage?: string;
  keySteps: {
    heading: string;
    points: string[];
  }[];
  externalUrl?: string;
}

export interface ChannelItem {
  id: string;
  name: string;
  handle: string;
  platform: 'Instagram' | 'YouTube' | 'LinkedIn' | 'GitHub' | 'Studio' | 'Email';
  url: string;
  metric?: string;
  description: string;
}

export interface WorkItem {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface AppScreenshot {
  url: string;
  title: string;
  caption: string;
}

export interface AppTechSpecs {
  platform: string;
  runtime: string;
  architecture: string;
  storage: string;
  license: string;
}

export interface FreeAppItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  githubUrl: string;
  downloadUrl?: string;
  downloadFileName?: string;
  downloadLabel?: string;
  coverImage: string;
  bannerImage?: string;
  badge: string;
  tags: string[];
  features: string[];
  screenshots?: AppScreenshot[];
  techSpecs?: AppTechSpecs;
  demoUrl?: string;
}

export const R2_APPS_BASE_URL = "https://pub-95b34bd26a304d5c8afd01e3756e6d72.r2.dev";

export const FREE_APPS: FreeAppItem[] = [
  {
    id: "pc-console",
    title: "PC Console",
    tagline: "Windows hardware telemetry & alien colony monitor",
    description: "A compact Windows hardware monitor, process explorer, and animated alien colony reflecting system activity. Track CPU, RAM, GPU, disk, network throughput, and run quick optimizations.",
    githubUrl: "https://github.com/rizo8107/pc-console",
    downloadUrl: `${R2_APPS_BASE_URL}/PC-Console.exe`,
    downloadFileName: "PC-Console.exe",
    downloadLabel: "Download .exe",
    coverImage: "/assets/images/app_pc_console.png",
    bannerImage: "/assets/images/banner_pc_console.png",
    badge: "Open Source",
    tags: ["Hardware Monitor", "Process Explorer", "Optimizer"],
    features: [
      "Live telemetry: CPU reactor, RAM tanks, GPU machinery, and network throughput",
      "Process explorer: inspect app memory, CPU, GPU engines, and executable paths",
      "Compact desktop monitor with sparklines, pinning, and 3 widget sizes",
      "One-click optimization and safe Windows performance tweaks"
    ],
    screenshots: [
      {
        url: "/assets/screenshots/pc-console-overview.png",
        title: "Alien Colony System Overview",
        caption: "An animated, miniature industrial colony where CPU activity drives the reactor, RAM loads fill cylinder tanks, GPU workloads power fabrication machinery, and network throughput sends transport shuttles."
      },
      {
        url: "/assets/screenshots/pc-console-compact.png",
        title: "Compact Monitor & Sparklines",
        caption: "Small desktop HUD with live telemetry, available memory sparklines, pin-to-top controls, and three resizable widget modes."
      },
      {
        url: "/assets/screenshots/pc-console-colony.png",
        title: "Colony Telemetry Architecture",
        caption: "Interactive visual zones mapping Windows operating system resources: CPU reactor, RAM tanks, GPU machinery, disk crane, and audio lounge."
      },
      {
        url: "/assets/screenshots/pc-console-processes.png",
        title: "Deep Process Explorer",
        caption: "Search, filter, and inspect running processes with real-time RAM, CPU, GPU engine allocations, and full executable paths."
      },
      {
        url: "/assets/screenshots/pc-console-optimize.png",
        title: "Safe System Optimizer",
        caption: "Review and apply verified Windows performance optimizations with instant one-click rollback."
      }
    ],
    techSpecs: {
      platform: "Windows 10 / 11",
      runtime: "Native .NET Framework 4.8",
      architecture: "x64 Portable Executable",
      storage: "100% On-device, zero accounts required",
      license: "MIT Open Source"
    }
  },
  {
    id: "little-notes",
    title: "Little Notes",
    tagline: "Tactile sticky notes & playful desktop companions",
    description: "Tactile paper sticky notes for your Windows desktop with curled corners, tape, pushpins, and animated desktop cat companions that walk, play, and nap.",
    githubUrl: "https://github.com/rizo8107/little-notes",
    downloadUrl: `${R2_APPS_BASE_URL}/Little-Notes-Setup-1.0.10.exe`,
    downloadFileName: "Little-Notes-Setup-1.0.10.exe",
    downloadLabel: "Download Setup .exe",
    coverImage: "/assets/images/app_little_notes.png",
    bannerImage: "/assets/images/banner_little_notes.png",
    badge: "Open Source",
    tags: ["Sticky Notes", "Desktop Companion", "Productivity"],
    features: [
      "Tactile paper styles: curled corners, translucent washi tape, and pushpins",
      "Interactive Petdex companions: animated cats that wander and play on your screen",
      "Checklists, square tasks, calendar reminders, and focus timers",
      "100% on-device local storage: zero accounts, total privacy"
    ],
    screenshots: [
      {
        url: "/assets/screenshots/little-notes-workspace.png",
        title: "Tactile Paper Workspace",
        caption: "Six distinct paper styles with curled corners, washi tape, and realistic drop shadows that lift and tilt as you drag them."
      },
      {
        url: "/assets/screenshots/little-notes-customization.png",
        title: "Custom Materials & Typography",
        caption: "Fine-tune handwriting or sans-serif fonts, paper textures (butter, sage, lilac, editorial, glass), and custom pushpins."
      },
      {
        url: "/assets/screenshots/little-notes-desktop.png",
        title: "Desktop-Only Floating Notes",
        caption: "Transparent borderless notes pinned to your Windows desktop with instant minimize-to-icon shortcuts."
      },
      {
        url: "/assets/screenshots/little-notes-companions.png",
        title: "Playful Petdex Companions",
        caption: "Interactive desktop cats that walk across your windows, chase your mouse cursor, perch on notes, and take naps."
      }
    ],
    techSpecs: {
      platform: "Windows 10 / 11",
      runtime: "Electron + TypeScript + Vite",
      architecture: "x64 Setup & Portable",
      storage: "Local-first on-device (%LocalAppData%)",
      license: "MIT Open Source"
    }
  },
  {
    id: "third-space",
    title: "Third Space",
    tagline: "Quiet Windows workspace for tasks & deep focus",
    description: "A quiet Windows desktop workspace for tasks, notes, reminders, and focus. Pins to any monitor edge to reserve a resizable strip of desktop alongside active windows.",
    githubUrl: "https://github.com/rizo8107/third-space",
    downloadUrl: `${R2_APPS_BASE_URL}/ThirdSpace.exe`,
    downloadFileName: "ThirdSpace.exe",
    downloadLabel: "Download .exe",
    coverImage: "/assets/images/app_third_space.png",
    bannerImage: "/assets/images/banner_third_space.png",
    badge: "Open Source",
    tags: ["Workspace", "Focus Timer", "Multi-Monitor"],
    features: [
      "Dockable desktop strip: pins to any monitor edge with reserved desktop area",
      "Integrated dot-matrix focus timer with custom presets (1–180 minutes)",
      "Today view, categorized priorities, calendar view, and quick scratchpad",
      "Full-screen reminders across all connected displays with snooze and complete"
    ],
    screenshots: [
      {
        url: "/assets/screenshots/third-space-features.png",
        title: "Tasks, Focus Timer & Reminders",
        caption: "Three coordinated productivity modules: categorized tasks, a large dot-matrix 25:00 focus timer, and full-screen reminders with snooze controls."
      },
      {
        url: "/assets/screenshots/third-space-banner.png",
        title: "Docked Desktop Workspace",
        caption: "Reserves a dedicated strip on any monitor edge so ordinary maximized windows automatically resize alongside your workspace."
      }
    ],
    techSpecs: {
      platform: "Windows 10 / 11",
      runtime: ".NET 10 (Self-contained)",
      architecture: "x64 Portable Application",
      storage: "Local JSON with .bak atomic backup",
      license: "Open Source"
    }
  },
  {
    id: "orbit",
    title: "Orbit",
    tagline: "Windows action wheel & gesture file converter",
    description: "A native Windows mouse gesture action wheel, curved format conversion studio, video downloader, and custom workflow workspace triggered instantly with a gesture.",
    githubUrl: "https://github.com/rizo8107/orbit",
    downloadUrl: `${R2_APPS_BASE_URL}/Orbit.exe`,
    downloadFileName: "Orbit.exe",
    downloadLabel: "Download .exe",
    coverImage: "/assets/images/app_orbit.png",
    bannerImage: "/assets/images/banner_orbit.png",
    badge: "Open Source",
    tags: ["Action Wheel", "File Converter", "Video Downloader"],
    features: [
      "Gesture-triggered radial wheel: Hold left mouse + Space or Ctrl + Alt + Space",
      "Curved rings converter for RAW photos, images, videos, audio, PDFs & documents",
      "Built-in video downloader & clean link tracker remover",
      "Automated multi-step tasks & smart organization by type, month, or date"
    ],
    screenshots: [
      {
        url: "/assets/screenshots/orbit-dashboard.png",
        title: "Dashboard & Appearance Studio",
        caption: "Customize wheel size (240–400px), themes (Midnight, Graphite, Light), custom accent colors, and global shortcut triggers."
      },
      {
        url: "/assets/screenshots/orbit-wheel.png",
        title: "Floating Action Wheel",
        caption: "Triggered instantly anywhere via Left Mouse + Space or Ctrl + Alt + Space. 8 curved petals for Convert, Compress, Resize, and Organize."
      },
      {
        url: "/assets/screenshots/orbit-quality.png",
        title: "Curved Rings Batch Converter",
        caption: "Format-to-quality curved submenu rings supporting camera RAW photos, video, audio, PDFs, and documents with local processing."
      },
      {
        url: "/assets/screenshots/orbit-updates.png",
        title: "Auto-Updates & Task Automation",
        caption: "Integrated public GitHub release updates and multi-step task builder for automated file workflows."
      }
    ],
    techSpecs: {
      platform: "Windows 10 (2004+) / Windows 11",
      runtime: ".NET 10 + Bundled FFmpeg & Deno",
      architecture: "x64 Setup & Portable",
      storage: "%LocalAppData%\\Orbit\\settings.json",
      license: "MIT Open Source"
    }
  }
];

export const BIO_PROFILE = {
  name: "Nirmal",
  title: "Creator, Designer & Builder",
  greeting: "Hey, I'm Nirmal. ✳",
  tagline: "I make ideas real.",
  bioSubtext: "I make things with content, code, and AI. Sharing useful tools, free guides, and things I build.",
  homeLead: "From a video people remember to a website people use — I work across content, design, technology, and marketing to turn ideas into something useful.",
  studio: "Zenthra Studios",
  email: "nirmal@lifedemy.in",
  avatarUrl: "/assets/images/nirmal_portrait.jpg",
  location: "India · Worldwide",
  availability: "Available for select advisory & build sprints",
};

export const WHAT_I_DO = [
  {
    pillar: "Brand.",
    description: "I help businesses build a clear identity and tell better stories.",
    details: "Visual systems, brand positioning, storytelling content, and editorial direction."
  },
  {
    pillar: "Build.",
    description: "I create websites, e-commerce stores, apps, and digital products.",
    details: "High-performance web applications, headless commerce, rapid prototyping, and polished UX."
  },
  {
    pillar: "Automate.",
    description: "I use AI and automation to make everyday work easier.",
    details: "Custom AI workflows, ComfyUI pipelines, agentic assistants, and seamless API integrations."
  },
  {
    pillar: "Grow.",
    description: "I connect content, marketing, and technology to help businesses reach more people.",
    details: "Organic distribution, video production, high-conversion landing systems, and community."
  }
];

export const WHY_WORK_WITH_ME = [
  {
    title: "Good looks + Great execution",
    text: "I don't just want things to look good. I want them to work well, too."
  },
  {
    title: "Tri-discipline perspective",
    text: "I understand the creative side, the technical side, and the business side. That helps me see the full picture and turn ideas into real projects."
  }
];

export const ABOUT_ME_PARAGRAPHS = [
  "I'm Nirmal. A creator, designer, builder, and someone who's always curious about how things work.",
  "I run Zenthra Studios, build digital products, experiment with AI, and share useful things I learn along the way."
];

export const FEATURED_PRODUCT = {
  id: "store-zero-rupees",
  badge: "Featured Blueprint",
  title: "Build your own online store for ₹0",
  tagline: "A proven, zero-monthly-subscription tech stack to launch and scale your first digital or physical product.",
  price: "Free Access",
  coverImage: "/assets/images/pixel_store.jpg",
  savingsNote: "Save ₹3,000–₹15,000/mo on boilerplate SaaS subscriptions",
  highlights: [
    "Next.js / Medusa / static frontends hosted on free tier clouds (Vercel / Cloudflare Pages)",
    "Payment gateway integration (Razorpay / Stripe) without recurring hosting costs",
    "Headless CMS setup for zero-cost inventory & orders",
    "Production-ready starter repository and quick launch checklist"
  ],
  actionText: "Read Blueprint Guide",
};

export const FREE_GUIDES: GuideItem[] = [
  {
    id: "windows-app-beginner-guide",
    title: "Build your first Windows utility with AI",
    category: "Windows & AI Dev",
    readTime: "5 min read · Interactive",
    updatedDate: "New Interactive Guide",
    coverImage: "/assets/images/pixel_creator_studio_1793867589555.jpg",
    description: "Pick one task you repeat on Windows and build a small utility that saves you a step. Complete with live prompt generator, starter commands, and verification checklist.",
    summary: "A practical, step-by-step playbook to build, verify, and publish standalone Windows tools using AI assistants (Claude, ChatGPT, Cursor, Antigravity) and .NET 10.",
    keySteps: [
      {
        heading: "1. Pick one job for your app",
        points: [
          "Write the problem and the action in one sentence. For example: 'I want to start a 25-minute work session, pause it when interrupted, and resume with the same time left.'",
          "Keep the first version small enough to test in a minute (start, pause, resume, reset, and saved preferences).",
          "Match your idea to an archetype: PC Console (system telemetry), Little Notes (local text), Third Space (focus timer), or Orbit (file automation)."
        ]
      },
      {
        heading: "2. Open and run your starter project",
        points: [
          "Verify .NET 10 SDK with 'dotnet --list-sdks'.",
          "Generate a minimal WPF desktop template: 'dotnet new wpf --name FocusTimer --output .\\src\\FocusTimer --framework net10.0'.",
          "Build and run immediately to ensure the starter window compiles before adding any AI code."
        ]
      },
      {
        heading: "3. Paste the master prompt into your coding assistant",
        points: [
          "Provide a clear problem, first-version constraints (whole-number 1-180m, single timer guard, controllable clock).",
          "Specify local-first storage under %LOCALAPPDATA%\\FocusTimer\\settings.json with fallback defaults.",
          "Instruct the assistant to inspect the baseline project, report files changed, and provide manual check steps."
        ]
      },
      {
        heading: "4. Build in small steps & reproduce bugs",
        points: [
          "Step 1: Core countdown logic with controllable clock mock.",
          "Step 2: Single setting persistence to disk.",
          "Step 3: Connect UI buttons to timer actions.",
          "Step 4: Use the structured bug report template (reproduction steps, expected vs actual result) for clean 1-shot fixes."
        ]
      },
      {
        heading: "5. Verify before sharing",
        points: [
          "Run the 6-point pre-flight checklist: double-start guard, pause/resume time freezing, reset fidelity, zero-stop completion, and restart persistence.",
          "Test offline under an unprivileged standard Windows user account."
        ]
      },
      {
        heading: "6. Publish a self-contained Windows executable",
        points: [
          "Publish standalone x64 binary: 'dotnet publish -c Release -r win-x64 --self-contained true -o .\\artifacts\\win-x64'.",
          "Test the compiled .exe directly, zip the artifacts folder, and test on a secondary Windows PC."
        ]
      }
    ]
  },
  {
    id: "comfyui-fixes",
    title: "ComfyUI fixes",
    category: "AI & Workflows",
    readTime: "3 min read",
    updatedDate: "Updated recently",
    coverImage: "/assets/images/pixel_comfyui.jpg",
    description: "Essential fixes for common VRAM crashes, missing node dependencies, CUDA out of memory errors, and batch optimization.",
    summary: "Stop fighting broken workflows. These 5 quick configuration tweaks resolve 90% of ComfyUI startup and generation bottlenecks.",
    keySteps: [
      {
        heading: "1. VRAM & Model Loading Flags",
        points: [
          "Launch with '--lowvram' or '--medvram-sdxl' depending on your GPU limit.",
          "Enable fp8 weight quantization for SDXL and FLUX models to cut memory footprint in half without noticeable fidelity degradation."
        ]
      },
      {
        heading: "2. Resolving Custom Node Dependency Hell",
        points: [
          "Use ComfyUI-Manager's 'Try Fix' feature to reinstall missing pip dependencies directly into python embedded environment.",
          "When git conflicts arise, delete the node directory inside /custom_nodes/ and git clone the clean upstream repo."
        ]
      },
      {
        heading: "3. Fast Preview & Latent Caching",
        points: [
          "Set preview method to 'taesd' (Tiny AutoEncoder) for near-instant 0-overhead step previews during generation."
        ]
      }
    ]
  },
  {
    id: "free-ai-video-tools",
    title: "Free AI video tools",
    category: "Generative Media",
    readTime: "4 min read",
    updatedDate: "Updated recently",
    coverImage: "/assets/images/pixel_video.jpg",
    description: "Curated open-source and free-tier tools to generate cinema-grade video, character motion, and clean camera pans.",
    summary: "You don't need hundreds of dollars in monthly subscriptions to create stunning AI video. Here is the exact stack I use.",
    keySteps: [
      {
        heading: "1. Top Open-Weights Video Models",
        points: [
          "Wan2.1 & LTX-Video: Open-source video generation models capable of crisp cinematic motion running locally or on inexpensive compute.",
          "CogVideoX-5B: Excellent camera motion consistency and text prompt adherence."
        ]
      },
      {
        heading: "2. Best Free Web Playgrounds",
        points: [
          "Hugging Face Spaces: Zero-credit community hosted demos for instant testing.",
          "Kling & Hailuo free daily allowance tips for commercial-grade B-roll snippets."
        ]
      },
      {
        heading: "3. Camera Prompting Formula",
        points: [
          "Always specify camera trajectory: 'slow dolly zoom in', 'smooth 35mm handheld track', or 'static tripod locked-off shot'."
        ]
      }
    ]
  },
  {
    id: "open-source-alternatives",
    title: "Open-source alternatives",
    category: "Software & Stack",
    readTime: "3 min read",
    updatedDate: "Updated recently",
    coverImage: "/assets/images/pixel_opensource.jpg",
    description: "High-quality, privacy-first, zero-subscription alternatives to bloated and expensive creator software.",
    summary: "Swap expensive monthly licenses for freedom and ownership without sacrificing polish or speed.",
    keySteps: [
      {
        heading: "1. Design & Vector Tools",
        points: [
          "Penpot instead of Figma: browser-based, vector collaborative design with full SVG export and CSS code gen.",
          "Photopea instead of Photoshop: instant browser PSD editing with zero installation."
        ]
      },
      {
        heading: "2. Productivity & Knowledge Management",
        points: [
          "Obsidian / AppFlowy instead of Notion: local-first markdown, unlimited offline speed, complete data ownership."
        ]
      },
      {
        heading: "3. Automation & Webhooks",
        points: [
          "n8n instead of Zapier / Make: self-hostable workflow automation supporting 400+ nodes and unlimited multi-step executions."
        ]
      }
    ]
  },
  {
    id: "iphone-shortcuts",
    title: "iPhone shortcuts",
    category: "Productivity",
    readTime: "2 min read",
    updatedDate: "Updated recently",
    coverImage: "/assets/images/pixel_shortcuts.jpg",
    description: "High-leverage iOS automations for creators: instant voice transcription, Instagram media formatting, and clipboard cleaning.",
    summary: "Turn your phone into a quiet productivity powerhouse with one-tap native iOS shortcuts.",
    keySteps: [
      {
        heading: "1. Instant Voice-to-Text Idea Capture",
        points: [
          "Trigger a shortcut via Action Button or Back Tap: records audio, transcribes with Whisper API/local dictation, and appends into an ideas note."
        ]
      },
      {
        heading: "2. Instagram Bio Aspect-Ratio Crop & Resize",
        points: [
          "Single tap to resize batch images to crisp 1080x1350 (4:5) portrait or 1080x1920 (9:16) with optimized file compression."
        ]
      },
      {
        heading: "3. Clean Tracking URL Stripper",
        points: [
          "Removes ?utm_source, ?fbclid, ?igshid parameters from clipboard links automatically before sharing."
        ]
      }
    ]
  }
];

export const CHANNELS: ChannelItem[] = [
  {
    id: "instagram",
    name: "Instagram",
    handle: "@nirmal",
    platform: "Instagram",
    url: "https://instagram.com",
    metric: "Shorts & Behind-the-scenes",
    description: "Visual experiments, daily AI tips, and design breakdowns."
  },
  {
    id: "youtube",
    name: "YouTube",
    handle: "Nirmal / Zenthra Studios",
    platform: "YouTube",
    url: "https://youtube.com",
    metric: "In-depth tutorials & builds",
    description: "Step-by-step guides on building digital products and using modern AI tools."
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    handle: "Nirmal",
    platform: "LinkedIn",
    url: "https://linkedin.com",
    metric: "Articles & Industry thoughts",
    description: "Case studies, business learnings, and product building strategy."
  },
  {
    id: "github",
    name: "GitHub",
    handle: "@nirmal",
    platform: "GitHub",
    url: "https://github.com",
    metric: "Open-source tools & templates",
    description: "Starter kits, scripts, ComfyUI workflows, and web experiment repositories."
  }
];

export const EXPLORE_ITEMS = [
  {
    id: "work",
    label: "My work",
    subtitle: "Zenthra Studios, digital client work, apps, and video direction.",
    icon: "briefcase",
  },
  {
    id: "about",
    label: "About me",
    subtitle: "Creator, designer, builder from India. My background & philosophy.",
    icon: "user",
  },
  {
    id: "playground",
    label: "Playground",
    subtitle: "Interactive experiments, generative tests, and quick tools.",
    icon: "terminal",
  }
];

export const PLAYGROUND_TOOLS = [
  {
    id: "prompt-cleaner",
    name: "Pixel Prompt Enhancer",
    description: "Transforms rough one-liners into structured prompts with camera angle, lighting, and style parameters.",
    tags: ["Utility", "AI Prompting"]
  },
  {
    id: "store-calc",
    name: "₹0 Stack Cost Calculator",
    description: "Calculate how much you save moving from standard SaaS to modern headless free-tier stacks.",
    tags: ["Calculator", "Commerce"]
  },
  {
    id: "aspect-ratio",
    name: "Social Aspect Ratio Cheat Sheet",
    description: "Pixel-perfect dimensions for Instagram Reels, Stories, Bio covers, and YouTube Thumbnails.",
    tags: ["Reference", "Design"]
  }
];
