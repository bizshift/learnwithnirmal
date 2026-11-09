# Nirmal — Creator, Designer & Builder

> Personal portfolio, interactive bio link hub, and open-source software showcase. Built with Next.js, React, Tailwind CSS, and a retro-brutalist aesthetic.

---

## 🌟 Featured Open-Source Apps

This repository includes dedicated showcases, documentation, and live preview galleries for 4 open-source Windows tools:

1. **[PC Console](https://github.com/rizo8107/pc-console)** — Windows hardware telemetry, process explorer, and animated alien colony monitor.
2. **[Little Notes](https://github.com/rizo8107/little-notes)** — Tactile paper sticky notes with curled corners, tape, pushpins, and animated desktop cat companions.
3. **[Third Space](https://github.com/rizo8107/third-space)** — Quiet Windows desktop workspace for tasks, notes, reminders, and dot-matrix focus timer.
4. **[Orbit](https://github.com/rizo8107/orbit)** — Gesture-triggered radial action wheel, curved rings media converter, and task automation studio.

---

## 📖 Interactive Playbooks & Guides

- **[Build Your First Windows Utility with AI](/build-windows-app)** — Complete step-by-step interactive playbook with live AI prompt studio for Claude/ChatGPT, .NET 10 WPF starter commands, live FocusTimer desktop widget simulator, and pre-flight verification checklist.
- **[ComfyUI Optimization Fixes](/guide/comfyui-fixes)** — Memory, VRAM, and custom node troubleshooting.
- **[Free AI Video Tools](/guide/free-ai-video-tools)** — Open-weights video generation and prompting recipes.
- **[Open-Source Stacks](/guide/open-source-alternatives)** — High-leverage zero-subscription software alternatives.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router, SSG & dynamic routing)
- **UI & Styling:** React 19, Tailwind CSS, Lucide React
- **Design System:** Retro-brutalist aesthetic with hard shadows, monospace accents, and emerald/black palette
- **TypeScript:** Strict type checking
- **Assets:** Optimized local product screenshots and vector artwork

---

## 🚀 Quick Start / Local Development

### Prerequisites
- Node.js 18+ (tested on Node.js 20 & 24)
- npm or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/bizshift/learnwithnirmal.git
cd learnwithnirmal
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm start
```

---

## 🐳 Deploying with Dokploy

This repository is pre-configured with a production-ready, multi-stage Next.js standalone `Dockerfile` and `docker-compose.yml`.

### In Dokploy Dashboard:
1. **Create New Application:** Choose **GitHub** or **Git**.
2. **Repository:** `bizshift/learnwithnirmal`
3. **Branch:** `main`
4. **Build Type:** Select **Dockerfile** (or **Docker Compose**).
5. **Port:** `3000`
6. **Environment Variables:**
   * `NODE_ENV=production`
   * `PORT=3000`
   * `HOSTNAME=0.0.0.0`
7. **Domains:** Add your custom domain (Dokploy's Traefik reverse proxy handles automatic SSL via Let's Encrypt).
8. Click **Deploy**.

---

## 📄 License

MIT Open Source License. Built by [Nirmal](https://github.com/rizo8107).
