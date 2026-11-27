'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Download,
  AlertTriangle,
  Cpu,
  Monitor,
  HardDrive,
  Film,
  Sparkles,
  Layers,
  Wrench,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Maximize2,
  X,
  Share2,
  Zap,
  Info,
  HelpCircle,
} from 'lucide-react';

const TESTER_DRIVE_URL =
  'https://drive.google.com/drive/folders/1lzZ1Ca5u0BIieRPd22yEPHTMdse11OE0?usp=drive_link';
const OFFICIAL_GITHUB_URL = 'https://github.com/Lightricks/LTX-Desktop/releases/latest';

interface PromptItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  text: string;
}

const TESTED_PROMPTS: PromptItem[] = [
  {
    id: 'kite',
    title: 'Animation & Wind Physics',
    category: 'Image to Video',
    badge: 'Kite Runner',
    text: 'A young boy runs gently across a grassy hillside while flying a red kite. His scarf moves naturally in the breeze. Warm evening light, consistent facial features, smooth body movement, and a slow tracking camera. Keep the character\'s clothing and appearance consistent.',
  },
  {
    id: 'portrait',
    title: 'Realistic Natural Motion',
    category: 'Image to Video',
    badge: 'Window Daylight',
    text: 'A close-up of a person standing beside a window in soft daylight. They turn slightly toward the light and give a small, natural smile. Subtle breathing, realistic skin texture, gentle hair movement, and a slow camera push-in. Preserve the person\'s identity and the room\'s lighting.',
  },
];

export default function InteractiveLtxDesktopGuide() {
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string; caption: string } | null>(null);

  // Video State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(70);

  const copyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2200);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMuteToggle = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const jumpToTime = (sec: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = sec;
    setCurrentTime(sec);
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#111111] dark:text-neutral-100 font-sans selection:bg-[#ffcf32] selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#111111]/95">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-tight text-neutral-800 hover:text-black dark:text-neutral-200 dark:hover:text-white"
            >
              <span>←</span>
              <span>NIRMAL.BIO</span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <Link
              href="/guides"
              className="text-xs font-mono text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              GUIDES
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700">/</span>
            <span className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400">
              LTX-DESKTOP
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyShareLink}
              className="flex items-center gap-1.5 border border-neutral-900 bg-white px-2.5 py-1 text-xs font-mono text-neutral-800 shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-neutral-200 dark:bg-[#181818] dark:text-neutral-200 dark:shadow-[2px_2px_0px_0px_#fff]"
              title="Share this guide"
            >
              {copiedShare ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{copiedShare ? 'COPIED' : 'SHARE'}</span>
            </button>

            <a
              href={TESTER_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 border border-neutral-900 bg-[#ffcf32] px-3 py-1 text-xs font-mono font-bold text-neutral-950 shadow-[2px_2px_0px_0px_#000] hover:bg-[#ffe066] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-neutral-100 dark:shadow-[2px_2px_0px_0px_#fff]"
            >
              <Download className="h-3.5 w-3.5" />
              <span>TESTER BUILD (8 GB)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero Title */}
        <div className="mb-8 border-b-2 border-neutral-900 dark:border-neutral-200 pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="border border-neutral-900 bg-[#ffcf32] px-2 py-0.5 text-xs font-mono font-bold text-black shadow-[1px_1px_0px_0px_#000]">
              STEP-BY-STEP PLAYBOOK
            </span>
            <span className="text-xs font-mono text-neutral-500">
              COMMENT &quot;LTX&quot; REEL COMPANION GUIDE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 dark:text-white mb-4 leading-tight">
            Create AI Videos on Your PC with LTX Desktop
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
            If you came here from my <strong>Comment LTX</strong> Reel, start here. <strong>LTX Desktop</strong> is the
            free desktop app and <strong>LTX 2.5 Fast</strong> is the local generation model. Follow this simple 5-step
            guide to install the app, bypass the 8 GB barrier, and create your first video clip.
          </p>

          {/* Direct Download Callouts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={TESTER_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border-2 border-neutral-900 bg-[#ffcf32] hover:bg-[#ffe066] text-black shadow-[3px_3px_0px_0px_#000] transition-colors"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="bg-black text-[#ffcf32] px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase">
                    NIRMAL TESTED
                  </span>
                  <strong className="text-sm font-bold font-mono">8 GB Tester Build</strong>
                </div>
                <div className="text-xs text-neutral-800">
                  Google Drive folder for RTX 4060 &amp; 8 GB GPUs (bypasses &quot;Coming soon&quot;)
                </div>
              </div>
              <Download className="h-5 w-5 text-black shrink-0 ml-2" />
            </a>

            <a
              href={OFFICIAL_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border-2 border-neutral-900 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white shadow-[3px_3px_0px_0px_#000] dark:shadow-none transition-colors"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="bg-neutral-300 dark:bg-neutral-700 px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase">
                    OFFICIAL
                  </span>
                  <strong className="text-sm font-bold font-mono">Official GitHub Release</strong>
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  Standard release for 12 GB – 24 GB+ NVIDIA GPUs &amp; Apple Silicon
                </div>
              </div>
              <ExternalLink className="h-5 w-5 text-neutral-500 shrink-0 ml-2" />
            </a>
          </div>
        </div>

        {/* Video Player (Quick Demonstration) */}
        <div className="mb-12 border-2 border-neutral-900 bg-neutral-50 p-4 sm:p-6 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex flex-col sm:flex-row gap-5 items-center">
            {/* Reel Video */}
            <div className="relative aspect-[9/16] w-full max-w-[200px] shrink-0 overflow-hidden border-2 border-black bg-black shadow-[3px_3px_0px_0px_#000]">
              <video
                ref={videoRef}
                src="/assets/ltx-desktop/ltx-desktop-reel.mp4"
                poster="/assets/ltx-desktop/cover.jpg"
                playsInline
                muted={isMuted}
                loop
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    setCurrentTime(videoRef.current.currentTime);
                    setDuration(videoRef.current.duration || 70);
                  }
                }}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="h-full w-full object-cover"
              />

              <button
                onClick={handlePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {!isPlaying && (
                  <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-[#ffcf32] text-black">
                    <Play className="h-6 w-6 ml-0.5 fill-black" />
                  </div>
                )}
              </button>

              <div className="absolute bottom-0 inset-x-0 bg-black/80 p-2 flex items-center justify-between text-white font-mono text-[10px]">
                <button onClick={handlePlayPause} className="hover:text-[#ffcf32]">
                  {isPlaying ? 'PAUSE' : 'PLAY'}
                </button>
                <button onClick={handleMuteToggle} className="hover:text-[#ffcf32]">
                  {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                </button>
                <span>{Math.floor(currentTime)}s</span>
              </div>
            </div>

            {/* Reel Context & Quick Jump */}
            <div className="flex-1 w-full text-left">
              <div className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                70-SECOND WALKTHROUGH REEL
              </div>
              <h3 className="text-xl font-bold font-mono text-neutral-950 dark:text-white mb-2">
                Watch the Live Demonstration
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                See how LTX Desktop looks, how the 8 GB barrier is bypassed, and how a real photo of a boy flying a
                red kite turns into smooth motion on a laptop RTX 4060.
              </p>

              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <button
                  onClick={() => jumpToTime(0)}
                  className="px-2.5 py-1 border border-neutral-900 bg-white hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
                >
                  0:00 App Reveal
                </button>
                <button
                  onClick={() => jumpToTime(13)}
                  className="px-2.5 py-1 border border-neutral-900 bg-white hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
                >
                  0:13 VRAM Barrier
                </button>
                <button
                  onClick={() => jumpToTime(38)}
                  className="px-2.5 py-1 border border-neutral-900 bg-white hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
                >
                  0:38 8GB Patch
                </button>
                <button
                  onClick={() => jumpToTime(52)}
                  className="px-2.5 py-1 border border-neutral-900 bg-white hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800"
                >
                  0:52 Generation Test
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 1: Check Your PC */}
        <section className="mb-10 border-2 border-neutral-900 bg-white p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-neutral-900 text-white dark:bg-white dark:text-black font-mono font-bold text-xs px-2 py-0.5">
              STEP 01
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-mono text-neutral-950 dark:text-white">
              Check Your PC Hardware
            </h2>
          </div>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            Before downloading ~70 GB of models, check which bucket your machine falls into:
          </p>

          <div className="overflow-x-auto border border-neutral-900 dark:border-neutral-700 mb-4">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-900 dark:border-neutral-700">
                <tr>
                  <th className="p-3">Your Hardware</th>
                  <th className="p-3">What You Need</th>
                  <th className="p-3">Expected Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-[#161616]">
                <tr>
                  <td className="p-3 font-bold text-amber-600 dark:text-amber-400">
                    NVIDIA 8 GB Card
                    <div className="text-[10px] text-neutral-500 font-normal">e.g. RTX 4060, 3070, 3060 Laptop</div>
                  </td>
                  <td className="p-3">
                    <a href={TESTER_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                      8 GB Tester Build (Google Drive)
                    </a>
                  </td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">
                    Generates 540p @ 24 fps clips (~5 mins for 5s clip). Bypasses official 9 GiB floor.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">
                    NVIDIA 12 GB - 24 GB+ Card
                    <div className="text-[10px] text-neutral-500 font-normal">e.g. RTX 3060 12GB, 4080, 4090</div>
                  </td>
                  <td className="p-3">
                    <a href={OFFICIAL_GITHUB_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                      Official GitHub Release
                    </a>
                  </td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">
                    Generates 720p or 1080p clips out of the box in 1 to 3 minutes.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-neutral-500">
                    No NVIDIA Card / Intel / AMD
                    <div className="text-[10px] text-neutral-500 font-normal">Laptops with integrated graphics</div>
                  </td>
                  <td className="p-3">LTX Cloud API Key</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">
                    App installs, but generates via cloud servers instead of your local PC.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-xs font-mono text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
            <Info className="h-4 w-4 text-amber-600 shrink-0" />
            <span>General PC requirements: 64-bit Windows 10/11, 32 GB RAM recommended, and 80–100 GB free SSD space.</span>
          </div>
        </section>

        {/* STEP 2: Install LTX Desktop */}
        <section className="mb-10 border-2 border-neutral-900 bg-white p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-neutral-900 text-white dark:bg-white dark:text-black font-mono font-bold text-xs px-2 py-0.5">
              STEP 02
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-mono text-neutral-950 dark:text-white">
              Install the Application
            </h2>
          </div>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            Follow these 3 exact steps to get the software installed without errors:
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-start gap-3 p-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1a1a1a]">
              <span className="flex h-5 w-5 items-center justify-center bg-black text-[#ffcf32] font-bold text-[10px] shrink-0 mt-0.5">
                1
              </span>
              <div>
                <strong className="text-neutral-950 dark:text-white block mb-0.5">
                  Download the Setup Executable:
                </strong>
                <p className="text-neutral-600 dark:text-neutral-400">
                  If you have an 8 GB card, download <code>LTX Desktop-Setup-1.3.3-tester.exe</code> from the{' '}
                  <a href={TESTER_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-600">
                    Google Drive folder
                  </a>
                  . Otherwise, download from{' '}
                  <a href={OFFICIAL_GITHUB_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold">
                    official GitHub
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1a1a1a]">
              <span className="flex h-5 w-5 items-center justify-center bg-black text-[#ffcf32] font-bold text-[10px] shrink-0 mt-0.5">
                2
              </span>
              <div>
                <strong className="text-neutral-950 dark:text-white block mb-0.5">
                  Bypass Windows SmartScreen Warning:
                </strong>
                <p className="text-neutral-600 dark:text-neutral-400">
                  When Windows says <em>&quot;Windows protected your PC&quot;</em>, click <strong>&quot;More info&quot;</strong> and
                  then <strong>&quot;Run anyway&quot;</strong>. (This happens because open-source releases do not buy expensive Microsoft certificates).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1a1a1a]">
              <span className="flex h-5 w-5 items-center justify-center bg-black text-[#ffcf32] font-bold text-[10px] shrink-0 mt-0.5">
                3
              </span>
              <div>
                <strong className="text-neutral-950 dark:text-white block mb-0.5">
                  Choose &quot;Only for me&quot; &amp; Complete First Launch:
                </strong>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Keep default folder, click Install. On first launch, the app downloads its Python runtime (~3.3 GB).
                  Leave it open until it finishes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* STEP 3: Complete Model Setup & VRAM Tweak */}
        <section className="mb-10 border-2 border-neutral-900 bg-white p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-neutral-900 text-white dark:bg-white dark:text-black font-mono font-bold text-xs px-2 py-0.5">
              STEP 03
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-mono text-neutral-950 dark:text-white">
              Hugging Face Login &amp; Free VRAM Tweak
            </h2>
          </div>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            LTX 2.5 open weights require a free Hugging Face account to download:
          </p>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1a1a1a]">
              <div className="flex items-center gap-2 font-bold text-neutral-950 dark:text-white mb-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Sign in &amp; Accept Model License</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">
                Click <strong>&quot;Sign in with Hugging Face&quot;</strong> in LTX Desktop. Accept the license on the page that
                opens. The app will download the core model files (~68 GB).
              </p>
            </div>

            <div className="p-3 border-2 border-emerald-600 bg-emerald-500/10">
              <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                <Zap className="h-4 w-4 text-emerald-600" />
                <span>THE VRAM-SAVER TWEAK (CRITICAL FOR 8 GB &amp; 12 GB CARDS)</span>
              </div>
              <p className="text-neutral-800 dark:text-neutral-200 text-[11px] leading-relaxed">
                Go to <strong>Settings → General → Text encoding</strong> and select <strong>&quot;LTX API text encoding&quot;</strong>.
                <br />
                This uses Lightricks&apos; free cloud service just to parse text prompts into embeddings, while running
                100% of the heavy video generation on your PC. <strong>This frees 2 to 4 GB of local VRAM!</strong>
              </p>
            </div>
          </div>
        </section>

        {/* STEP 4: Make Your First Video Clip */}
        <section className="mb-10 border-2 border-neutral-900 bg-white p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-neutral-900 text-white dark:bg-white dark:text-black font-mono font-bold text-xs px-2 py-0.5">
              STEP 04
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-mono text-neutral-950 dark:text-white">
              Make Your First Clip (The 540p Formula)
            </h2>
          </div>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            Never start with a 1080p 20-second render. Test your hardware with this reliable starter formula:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 font-mono text-xs">
            <div className="border border-neutral-300 dark:border-neutral-700 p-2.5 bg-neutral-50 dark:bg-[#1a1a1a]">
              <span className="text-neutral-500 block text-[10px]">TOOL:</span>
              <strong className="text-neutral-950 dark:text-white">Image to Video</strong>
            </div>
            <div className="border border-neutral-300 dark:border-neutral-700 p-2.5 bg-neutral-50 dark:bg-[#1a1a1a]">
              <span className="text-neutral-500 block text-[10px]">RESOLUTION:</span>
              <strong className="text-neutral-950 dark:text-white">540p</strong>
            </div>
            <div className="border border-neutral-300 dark:border-neutral-700 p-2.5 bg-neutral-50 dark:bg-[#1a1a1a]">
              <span className="text-neutral-500 block text-[10px]">DURATION:</span>
              <strong className="text-neutral-950 dark:text-white">5 seconds</strong>
            </div>
            <div className="border border-neutral-300 dark:border-neutral-700 p-2.5 bg-neutral-50 dark:bg-[#1a1a1a]">
              <span className="text-neutral-500 block text-[10px]">FRAME RATE:</span>
              <strong className="text-neutral-950 dark:text-white">24 fps</strong>
            </div>
          </div>

          <h3 className="font-mono font-bold text-sm text-neutral-950 dark:text-white mb-2">
            Copy Tested Starter Prompts:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TESTED_PROMPTS.map((p) => (
              <div
                key={p.id}
                className="border border-neutral-900 bg-neutral-50 p-4 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#181818] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                      {p.category}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">{p.badge}</span>
                  </div>
                  <h4 className="font-mono font-bold text-sm text-neutral-950 dark:text-white mb-2">{p.title}</h4>
                  <div className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black/40 p-3 font-mono text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 mb-3">
                    {p.text}
                  </div>
                </div>

                <button
                  onClick={() => copyPrompt(p.id, p.text)}
                  className="flex items-center justify-center gap-1.5 border border-neutral-900 bg-[#ffcf32] py-1.5 text-xs font-mono font-bold text-black shadow-[1px_1px_0px_0px_#000] hover:bg-[#ffe066] active:translate-x-0.5 active:translate-y-0.5"
                >
                  {copiedPromptId === p.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedPromptId === p.id ? 'COPIED!' : 'COPY PROMPT'}</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* STEP 5: Pick the Right Tool */}
        <section className="mb-10 border-2 border-neutral-900 bg-white p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-neutral-900 text-white dark:bg-white dark:text-black font-mono font-bold text-xs px-2 py-0.5">
              STEP 05
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-mono text-neutral-950 dark:text-white">
              Choose the Right Tool for Your Scene
            </h2>
          </div>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
            Use this cheat sheet to choose which tool to click in LTX Desktop:
          </p>

          <div className="overflow-x-auto border border-neutral-900 dark:border-neutral-700 mb-4">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-900 dark:border-neutral-700">
                <tr>
                  <th className="p-3">What You Want to Do</th>
                  <th className="p-3">Tool to Click in App</th>
                  <th className="p-3">How It Works</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-[#161616]">
                <tr>
                  <td className="p-3 font-semibold">Turn written text into video</td>
                  <td className="p-3 font-bold text-amber-600 dark:text-amber-400">Text to Video</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">Generates video entirely from text prompt.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Animate a still photo</td>
                  <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">Image to Video</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">Keeps face and clothing locked, adds motion.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Add more footage before or after a clip</td>
                  <td className="p-3 font-bold text-blue-600 dark:text-blue-400">Extend</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">Continues the scene seamlessly without cuts.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Regenerate a flawed hand, face, or spot</td>
                  <td className="p-3 font-bold text-purple-600 dark:text-purple-400">Retake</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">Re-renders only the selected seconds of a clip.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Add subtle motion to water, steam, or hair</td>
                  <td className="p-3 font-bold text-teal-600 dark:text-teal-400">Cinemagraph</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">Animates only masked regions; rest stays still.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Cinematic camera push-in or crane</td>
                  <td className="p-3 font-bold text-rose-600 dark:text-rose-400">Dolly In / Jib Up</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">Physical camera move presets with zero drift.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* STEP 6: Troubleshooting & Quick Fixes */}
        <section className="mb-12 border-2 border-neutral-900 bg-white p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-neutral-900 text-white dark:bg-white dark:text-black font-mono font-bold text-xs px-2 py-0.5">
              STEP 06
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-mono text-neutral-950 dark:text-white">
              Quick Troubleshooting &amp; Fixes
            </h2>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 border border-neutral-900 bg-neutral-50 dark:border-neutral-700 dark:bg-[#1a1a1a]">
              <strong className="text-amber-600 dark:text-amber-400 block mb-1">
                Q: Why does the app say &quot;Coming soon to your device&quot;?
              </strong>
              <p className="text-neutral-700 dark:text-neutral-300 font-sans text-xs leading-relaxed">
                Your graphics card has less than 9 GiB VRAM (e.g. an 8 GB RTX 4060). The official build refuses to start.
                <br />
                <strong>Fix:</strong> Install the{' '}
                <a href={TESTER_DRIVE_URL} target="_blank" rel="noopener noreferrer" className="underline font-bold text-amber-600">
                  8 GB Tester Build from Google Drive
                </a>
                . It removes the block and lets 8 GB cards generate.
              </p>
            </div>

            <div className="p-3.5 border border-neutral-900 bg-neutral-50 dark:border-neutral-700 dark:bg-[#1a1a1a]">
              <strong className="text-amber-600 dark:text-amber-400 block mb-1">
                Q: Why did my clip fail with CAPABILITY_FAILED or Out of Memory?
              </strong>
              <p className="text-neutral-700 dark:text-neutral-300 font-sans text-xs leading-relaxed">
                The video exceeded the VRAM limit during VAE decode.
                <br />
                <strong>Fix:</strong> (1) Lower resolution to 540p. (2) Keep duration to 5 seconds. (3) Close Google Chrome,
                games, and video editors before hitting Generate.
              </p>
            </div>

            <div className="p-3.5 border border-neutral-900 bg-neutral-50 dark:border-neutral-700 dark:bg-[#1a1a1a]">
              <strong className="text-amber-600 dark:text-amber-400 block mb-1">
                Q: Should I update the app when it prompts me?
              </strong>
              <p className="text-neutral-700 dark:text-neutral-300 font-sans text-xs leading-relaxed">
                <strong>No.</strong> If you are on an 8 GB card and installed the tester build, accepting an update will
                replace it with the official build and restore the &quot;Coming soon&quot; block!
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA / Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-neutral-900 bg-white p-5 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div>
            <div className="font-mono font-bold text-sm text-neutral-950 dark:text-white">
              Learn with Nirmal · Creator &amp; Builder
            </div>
            <div className="text-xs font-mono text-neutral-500">
              Tested on Windows 11 with NVIDIA RTX 4060 (8 GB VRAM).
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={TESTER_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-neutral-900 bg-[#ffcf32] px-3 py-1.5 text-xs font-mono font-bold text-black hover:bg-[#ffe066]"
            >
              DOWNLOAD TESTER (8 GB) →
            </a>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full border-2 border-white bg-neutral-900 shadow-[6px_6px_0px_0px_#ffcf32] overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 py-2 text-white">
              <span className="font-mono text-xs font-bold uppercase">{selectedImage.title}</span>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-1 hover:text-[#ffcf32] transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <Image src={selectedImage.src} alt={selectedImage.title} fill className="object-contain" />
            </div>

            <div className="p-3 bg-neutral-950 text-neutral-300 font-mono text-xs">
              {selectedImage.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
