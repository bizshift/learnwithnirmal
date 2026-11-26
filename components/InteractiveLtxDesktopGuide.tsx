'use client';

import React, { useState, useRef, useMemo } from 'react';
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
  Sliders,
  HelpCircle,
  Video,
  Scissors,
  Camera,
  Music,
  RefreshCw,
  Terminal,
  Zap,
  Info,
} from 'lucide-react';

interface ToolItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  badge: string;
  inputs: string[];
  bestFor: string;
  recommendedSettings: string;
}

const LTX_TOOLS: ToolItem[] = [
  {
    id: 'text-to-video',
    name: 'Text to Video',
    tagline: 'Generate complete motion sequences directly from written text prompts',
    description:
      'Turns written scene descriptions into video clips. LTX 2.5 Fast interprets subject, atmosphere, and camera motion in a single pass.',
    badge: 'Core Gen',
    inputs: ['Prompt Text', 'Aspect Ratio (16:9, 9:16, 1:1)', 'Duration (3s - 20s)', 'Frame Rate (24 fps)'],
    bestFor: 'Concept visualization, b-roll generation, rapid scene exploration',
    recommendedSettings: '540p @ 24 fps, 5s duration for fast iteration on 8-16 GB cards',
  },
  {
    id: 'image-to-video',
    name: 'Image to Video',
    tagline: 'Animate a still image into cinematic, continuous movement',
    description:
      'Uses your starting photo as frame 0, preserving facial features, clothing, and background environment while generating fluid movement.',
    badge: 'Most Reliable',
    inputs: ['Start Frame Image', 'Optional End Frame', 'Motion Prompt', 'Motion Scale'],
    bestFor: 'Character animation, portrait lifelines, commercial product showcases',
    recommendedSettings: 'Clear image with distinct subject; keep prompt to 1 action + 1 camera move',
  },
  {
    id: 'audio-to-video',
    name: 'Audio to Video',
    tagline: 'Create visuals rhythmically guided by an audio track or speech',
    description:
      'Synchronizes visual pacing, cuts, and motion dynamics to speech cadence, music beats, or ambient sound effects.',
    badge: 'Audio-Driven',
    inputs: ['WAV / MP3 Audio File', 'Theme Prompt', 'Sync Intensity'],
    bestFor: 'Music visualizers, podcast video snippets, speech-driven character reactions',
    recommendedSettings: 'Short audio stems (5–10s) with clean transients',
  },
  {
    id: 'extend',
    name: 'Extend (Prepend / Append)',
    tagline: 'Add footage seamlessly before or after an existing clip',
    description:
      'Continues the motion path forward or backward in time, maintaining lighting, characters, and physics continuity without jarring cuts.',
    badge: 'Timeline NLE',
    inputs: ['Generated Clip', 'Direction (Before / After)', 'Extension Duration', 'Continuation Prompt'],
    bestFor: 'Building 15-30s continuous long takes without re-rendering from scratch',
    recommendedSettings: 'Extend in 3-5 second increments; keep character description identical',
  },
  {
    id: 'retake',
    name: 'Retake',
    tagline: 'Regenerate a specific part or region of an existing clip',
    description:
      'If a face, hand, or background artifact appears midway through an otherwise perfect generation, Retake re-renders only that section.',
    badge: 'Inpainting',
    inputs: ['Source Clip', 'Time Range (e.g. 2.1s - 3.8s)', 'Replacement Prompt'],
    bestFor: 'Fixing corrupted hands, awkward blinks, or replacing background objects',
    recommendedSettings: 'Mask only the flawed region to preserve the rest of the clip',
  },
  {
    id: 'cinemagraph',
    name: 'Cinemagraph',
    tagline: 'Add subtle, isolated looping motion to a still image',
    description:
      'Freezes 95% of the frame while creating gentle, hypnotic motion in water, steam, hair, tree leaves, or fabric.',
    badge: 'Micro-Motion',
    inputs: ['Still Image', 'Motion Brush / Region Mask', 'Loop Mode (Ping-Pong / Seamless)'],
    bestFor: 'Ambient website backgrounds, mood boards, high-end social banners',
    recommendedSettings: 'Low motion strength (0.3–0.5) for natural, jitter-free loops',
  },
  {
    id: 'styles-iclora',
    name: 'Styles & IC-LoRA',
    tagline: 'One-click visual treatments: Day-to-Night, Deblur & Colorization',
    description:
      'Video-to-video neural transformations powered by specialized IC-LoRA adapters that alter time of day, lighting style, or clarity.',
    badge: 'Neural FX',
    inputs: ['Source Video', 'LoRA Selection (Refine Details, Day-to-Night, Colorize)', 'Effect Weight'],
    bestFor: 'Cinematic grading, atmospheric shifts, enhancing raw footage resolution',
    recommendedSettings: 'Weight 0.65–0.80 to prevent over-stylization artifacts',
  },
  {
    id: 'camera-moves',
    name: 'Camera Moves',
    tagline: 'Preset cinematic camera trajectories: Dolly In, Dolly Out, Jib Up, Pan',
    description:
      'Constrains the latent diffusion process along physical camera crane and dolly paths, eliminating floaty, disorienting camera drift.',
    badge: 'Cinematography',
    inputs: ['Start Image or Video', 'Camera Move Preset', 'Speed / Distance Scale'],
    bestFor: 'Dramatic reveals, slow portrait push-ins, wide landscape sweeps',
    recommendedSettings: 'Dolly In with prompt: "slow camera push-in, shallow depth of field"',
  },
];

interface GpuPreset {
  id: string;
  name: string;
  vramGb: number;
  type: 'nvidia' | 'apple' | 'other';
  officialSupported: boolean;
  testerBuildSupported: boolean;
  recommendedResolution: string;
  expectedRenderTime5s: string;
  textEncodingAdvice: string;
  notes: string;
}

const GPU_PRESETS: GpuPreset[] = [
  {
    id: 'rtx4090',
    name: 'NVIDIA RTX 4090 / 3090 (24 GB VRAM)',
    vramGb: 24,
    type: 'nvidia',
    officialSupported: true,
    testerBuildSupported: true,
    recommendedResolution: '720p or 1080p @ 24 fps',
    expectedRenderTime5s: '~35 - 50 seconds',
    textEncodingAdvice: 'Local Text Encoding (Fastest, 100% offline)',
    notes: 'Meets the official gold-standard recommended tier. Can run native BF16 or FP8 with high batching.',
  },
  {
    id: 'rtx4080',
    name: 'NVIDIA RTX 4080 / 3080 Ti (16 GB VRAM)',
    vramGb: 16,
    type: 'nvidia',
    officialSupported: true,
    testerBuildSupported: true,
    recommendedResolution: '720p @ 24 fps',
    expectedRenderTime5s: '~1.5 - 2.5 minutes',
    textEncodingAdvice: 'Local Text Encoding or Cloud API to save 2 GB VRAM',
    notes: 'Full local generation supported out-of-the-box. Fast decode works seamlessly.',
  },
  {
    id: 'rtx3060',
    name: 'NVIDIA RTX 3060 / 4070 (12 GB VRAM)',
    vramGb: 12,
    type: 'nvidia',
    officialSupported: true,
    testerBuildSupported: true,
    recommendedResolution: '540p or 720p @ 24 fps',
    expectedRenderTime5s: '~3 - 4 minutes',
    textEncodingAdvice: 'LTX API Cloud Text Encoding (Recommended for headroom)',
    notes: 'Exceeds the 9 GiB FP8 floor. Runs smoothly with Fast Decode enabled.',
  },
  {
    id: 'rtx4060',
    name: 'NVIDIA RTX 4060 / 3070 (8 GB VRAM) — Nirmal Tested',
    vramGb: 8,
    type: 'nvidia',
    officialSupported: false,
    testerBuildSupported: true,
    recommendedResolution: '540p @ 24 fps (3s - 5s clips)',
    expectedRenderTime5s: '~5 minutes (5s clip) / ~11 mins (20s clip)',
    textEncodingAdvice: 'LTX API Cloud Text Encoding (Required to save VRAM)',
    notes: 'Blocked by official build ("Coming soon"). Works via Tester Build 1.3.3 with Fast Decode on by default!',
  },
  {
    id: 'apple_m',
    name: 'Apple Silicon (M1/M2/M3/M4 Max/Pro — 32GB+ Unified)',
    vramGb: 32,
    type: 'apple',
    officialSupported: true,
    testerBuildSupported: true,
    recommendedResolution: '540p or 720p @ 24 fps',
    expectedRenderTime5s: '~2 - 4 minutes (Metal backend)',
    textEncodingAdvice: 'Local or Cloud API depending on unified RAM allocation',
    notes: 'Supported natively via MLX/MPS with unified memory. Requires 15 GB+ free RAM at launch.',
  },
  {
    id: 'other',
    name: 'AMD Radeon / Intel Arc / Integrated Graphics',
    vramGb: 0,
    type: 'other',
    officialSupported: false,
    testerBuildSupported: false,
    recommendedResolution: 'Cloud API generation only',
    expectedRenderTime5s: 'Cloud server dependent (few seconds)',
    textEncodingAdvice: 'LTX API Key required',
    notes: 'App installs and opens, but cannot generate local video without an NVIDIA CUDA GPU or Apple Silicon.',
  },
];

interface GalleryScreenshot {
  id: string;
  src: string;
  title: string;
  tag: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryScreenshot[] = [
  {
    id: 'app-ui',
    src: '/assets/ltx-desktop/guide-example.jpg',
    title: 'LTX Desktop Interface',
    tag: 'App UI',
    caption: 'Official LTX Desktop Gen Space featuring the interactive prompt box, canvas preview, and tool palette.',
  },
  {
    id: 'tools-menu',
    src: '/assets/ltx-desktop/inputs-details.jpg',
    title: 'Comprehensive Tool Suite',
    tag: 'Tools',
    caption: 'Full selector showing Text to Video, Image to Video, Audio to Video, Extend, Retake, and Cinemagraph.',
  },
  {
    id: 'blocked',
    src: '/assets/ltx-desktop/blocked-details.jpg',
    title: 'Hardware Requirement Floor',
    tag: 'VRAM Check',
    caption: 'The official "Coming soon to your device" prompt when a GPU has less than 9 GiB VRAM.',
  },
  {
    id: 'boy-kite',
    src: '/assets/ltx-desktop/boy-contact.jpg',
    title: 'Boy Flying Kite (Generated Frame)',
    tag: 'Output Test',
    caption: 'Resulting frame from Image-to-Video test on 8 GB RTX 4060: preserved clothes, scarf wind physics.',
  },
  {
    id: 'scarf',
    src: '/assets/ltx-desktop/scarf-contact.jpg',
    title: 'Fluid Motion & Wind Detail',
    tag: 'Physics',
    caption: 'Subtle atmospheric wind displacement and natural fabric ripples generated by LTX 2.5 Fast.',
  },
  {
    id: 'cinemagraph-demo',
    src: '/assets/ltx-desktop/cinemagraph.jpg',
    title: 'Cinemagraph Masking',
    tag: 'Micro-Motion',
    caption: 'Isolating specific motion vectors on a still frame while keeping foreground subjects perfectly stationary.',
  },
  {
    id: 'fireworks',
    src: '/assets/ltx-desktop/fireworks-contact.jpg',
    title: 'Night & Lighting Transformation',
    tag: 'IC-LoRA',
    caption: 'Applying atmospheric illumination changes and particle effects without altering geometry.',
  },
  {
    id: 'warrior',
    src: '/assets/ltx-desktop/warrior-contact.jpg',
    title: 'Character Consistency Check',
    tag: 'Fidelity',
    caption: 'Testing complex armor, hair textures, and facial stability across consecutive generated frames.',
  },
];

export default function InteractiveLtxDesktopGuide() {
  const [selectedGpu, setSelectedGpu] = useState<string>('rtx4060');
  const [selectedTool, setSelectedTool] = useState<string>('image-to-video');
  const [activeTab, setActiveTab] = useState<number>(1);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [lightboxImg, setLightboxImg] = useState<GalleryScreenshot | null>(null);
  const [activeVideoSource, setActiveVideoSource] = useState<'reel' | 'tools' | 'coming-soon'>('reel');

  // Video playback
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(70);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const currentGpu = useMemo(() => {
    return GPU_PRESETS.find((g) => g.id === selectedGpu) || GPU_PRESETS[3];
  }, [selectedGpu]);

  const currentToolData = useMemo(() => {
    return LTX_TOOLS.find((t) => t.id === selectedTool) || LTX_TOOLS[1];
  }, [selectedTool]);

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

  const handleSpeedToggle = () => {
    if (!videoRef.current) return;
    const speeds = [1, 1.25, 1.5];
    const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    videoRef.current.playbackRate = nextSpeed;
    setPlaybackSpeed(nextSpeed);
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

  const videoSources = {
    reel: {
      src: '/assets/ltx-desktop/ltx-desktop-reel.mp4',
      poster: '/assets/ltx-desktop/cover.jpg',
      title: 'Comment LTX Reel (70s)',
      subtitle: 'The full breakdown: official app, 8GB experiment & local test',
    },
    tools: {
      src: '/assets/ltx-desktop/tools-demo.mp4',
      poster: '/assets/ltx-desktop/inputs-details.jpg',
      title: 'App Tools Walkthrough (14s)',
      subtitle: 'Text to Video, Image to Video, Extend, Retake in LTX Desktop UI',
    },
    'coming-soon': {
      src: '/assets/ltx-desktop/coming-soon-demo.mp4',
      poster: '/assets/ltx-desktop/blocked-details.jpg',
      title: 'VRAM Barrier & Patch (7s)',
      subtitle: 'Seeing "Coming soon to your device" & applying the tester fix',
    },
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#111111] dark:text-neutral-100 font-sans selection:bg-[#ffcf32] selection:text-black">
      {/* Top Retro-Brutalist Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#111111]/95">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-mono font-bold tracking-tight text-neutral-800 hover:text-black dark:text-neutral-200 dark:hover:text-white"
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
            <span className="hidden sm:inline text-xs font-mono font-semibold text-amber-600 dark:text-amber-400">
              LTX-DESKTOP-GUIDE
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
              href="https://drive.google.com/drive/folders/1lzZ1Ca5u0BIieRPd22yEPHTMdse11OE0?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 border border-neutral-900 bg-[#ffcf32] px-3 py-1 text-xs font-mono font-bold text-neutral-950 shadow-[2px_2px_0px_0px_#000] hover:bg-[#ffe066] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-neutral-100 dark:shadow-[2px_2px_0px_0px_#fff]"
              title="Download the 8 GB VRAM Tester Build from Google Drive"
            >
              <Download className="h-3.5 w-3.5" />
              <span>TESTER BUILD (8 GB)</span>
            </a>

            <a
              href="https://github.com/Lightricks/LTX-Desktop/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 border border-neutral-900 bg-neutral-100 px-2.5 py-1 text-xs font-mono font-bold text-neutral-800 shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-200 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
              title="Official GitHub releases"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>OFFICIAL APP</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero Section */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="border border-neutral-900 bg-[#ffcf32]/20 px-2 py-0.5 text-xs font-mono font-bold text-amber-800 dark:border-amber-400 dark:bg-amber-950/40 dark:text-amber-300">
              [ FREE & OPEN-SOURCE LOCAL AI VIDEO SUITE ]
            </span>
            <span className="border border-neutral-900 bg-neutral-100 px-2 py-0.5 text-xs font-mono font-bold dark:border-neutral-700 dark:bg-neutral-800">
              LIGHTRICKS LTX 2.5 FAST
            </span>
            <span className="text-xs font-mono text-neutral-500">
              COMMENT &quot;LTX&quot; PLAYBOOK · WINDOWS & MAC
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-4 leading-tight">
            Create AI Videos on Your PC with LTX Desktop
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl leading-relaxed mb-6">
            If you came here from my <strong className="text-neutral-950 dark:text-white">Comment LTX</strong> Reel,
            start here. <strong>LTX Desktop</strong> is the native desktop application and <strong>LTX 2.5 Fast</strong> is
            the open-weights generation model. No cloud subscription fees, no complicated ComfyUI spaghetti nodes — just
            a clean timeline editor, local diffusion weights, and one-click camera recipes on your own machine.
          </p>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="border border-neutral-900 bg-neutral-50 p-3 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#181818] dark:shadow-[2px_2px_0px_0px_#fff]">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">LICENSE & COST</div>
              <div className="text-2xl font-extrabold text-neutral-950 dark:text-white">100% Free</div>
              <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">Open-Source (GitHub)</div>
            </div>

            <div className="border border-neutral-900 bg-neutral-50 p-3 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#181818] dark:shadow-[2px_2px_0px_0px_#fff]">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">GENERATION MODEL</div>
              <div className="text-xl font-extrabold text-neutral-950 dark:text-white">LTX 2.5 Fast</div>
              <div className="text-[11px] font-mono text-neutral-500">Local Open-Weights</div>
            </div>

            <div className="border border-neutral-900 bg-neutral-50 p-3 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#181818] dark:shadow-[2px_2px_0px_0px_#fff]">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">HARDWARE FLOOR</div>
              <div className="text-xl font-extrabold text-neutral-950 dark:text-white">8 GB VRAM</div>
              <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400">Via Tester Build Patch</div>
            </div>

            <div className="border border-neutral-900 bg-neutral-50 p-3 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#181818] dark:shadow-[2px_2px_0px_0px_#fff]">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">INTEGRATED NLE</div>
              <div className="text-xl font-extrabold text-neutral-950 dark:text-white">Timeline Editor</div>
              <div className="text-[11px] font-mono text-neutral-500">Extend, Retake & Cut</div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Interactive Reel & Video Demonstration */}
        <section className="mb-12 border-2 border-neutral-900 bg-neutral-50 p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Vertical Video Frame */}
            <div className="w-full md:w-[320px] shrink-0 mx-auto">
              <div className="relative aspect-[9/16] w-full max-w-[320px] mx-auto overflow-hidden border-2 border-neutral-900 bg-black shadow-[4px_4px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[4px_4px_0px_0px_#fff]">
                <video
                  ref={videoRef}
                  src={videoSources[activeVideoSource].src}
                  poster={videoSources[activeVideoSource].poster}
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

                {/* Overlaid Play/Pause Button */}
                <button
                  onClick={handlePlayPause}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {!isPlaying && (
                    <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-[#ffcf32] text-black shadow-[3px_3px_0px_0px_#000]">
                      <Play className="h-8 w-8 ml-1 fill-black" />
                    </div>
                  )}
                </button>

                {/* Video Transport Controls */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 pt-6 flex items-center justify-between text-white font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePlayPause}
                      className="p-1 hover:text-[#ffcf32]"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                    </button>
                    <button
                      onClick={handleMuteToggle}
                      className="p-1 hover:text-[#ffcf32]"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                    <span>
                      {Math.floor(currentTime)}s / {Math.floor(duration)}s
                    </span>
                  </div>

                  <button
                    onClick={handleSpeedToggle}
                    className="border border-white/50 px-1.5 py-0.5 text-[10px] hover:border-white"
                  >
                    {playbackSpeed}x
                  </button>
                </div>
              </div>
            </div>

            {/* Video Selector & Chapter Breakdown */}
            <div className="flex-1 w-full">
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => {
                    setActiveVideoSource('reel');
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono font-bold border ${
                    activeVideoSource === 'reel'
                      ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#ffcf32]'
                      : 'border-neutral-900 bg-white text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-[#181818] dark:text-neutral-300'
                  }`}
                >
                  FULL REEL (70s)
                </button>
                <button
                  onClick={() => {
                    setActiveVideoSource('tools');
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono font-bold border ${
                    activeVideoSource === 'tools'
                      ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#ffcf32]'
                      : 'border-neutral-900 bg-white text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-[#181818] dark:text-neutral-300'
                  }`}
                >
                  TOOLS WALKTHROUGH
                </button>
                <button
                  onClick={() => {
                    setActiveVideoSource('coming-soon');
                    setIsPlaying(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono font-bold border ${
                    activeVideoSource === 'coming-soon'
                      ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#ffcf32]'
                      : 'border-neutral-900 bg-white text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-[#181818] dark:text-neutral-300'
                  }`}
                >
                  VRAM BARRIER & FIX
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-mono text-neutral-950 dark:text-white mb-2">
                {videoSources[activeVideoSource].title}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">
                {videoSources[activeVideoSource].subtitle}
              </p>

              {/* Chapter Jump Shortcuts */}
              {activeVideoSource === 'reel' && (
                <div className="space-y-2 mb-4">
                  <div className="text-xs font-mono font-bold text-neutral-500 uppercase">Interactive Chapters:</div>
                  {[
                    { sec: 0, label: '0:00 · The Local AI Video Revolution', desc: 'Why pay monthly cloud credits when you can generate on PC?' },
                    { sec: 13, label: '0:13 · The "Coming Soon" Hardware Floor', desc: 'Understanding why official builds check for 9 GB+ VRAM' },
                    { sec: 25, label: '0:25 · Gen Space & All Creative Tools', desc: 'Text-to-Video, Image-to-Video, Extend, Retake, and Cinemagraph' },
                    { sec: 38, label: '0:38 · The 8 GB Tester Build Patch', desc: 'How Fast Decode and patched threshold allow RTX 4060 runs' },
                    { sec: 52, label: '0:52 · Live Boy & Kite Generation', desc: 'Inspect prompt, wind physics, and real rendering performance' },
                  ].map((ch, idx) => (
                    <button
                      key={idx}
                      onClick={() => jumpToTime(ch.sec)}
                      className="w-full flex items-center justify-between text-left p-2 border border-neutral-900 bg-white hover:bg-[#ffcf32]/20 shadow-[1px_1px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#1a1a1a] dark:hover:bg-neutral-800 transition-colors"
                    >
                      <div>
                        <span className="font-mono font-bold text-xs text-neutral-900 dark:text-neutral-100">
                          {ch.label}
                        </span>
                        <div className="text-[11px] text-neutral-500">{ch.desc}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-neutral-400 shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://github.com/Lightricks/LTX-Desktop/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-900 underline hover:text-amber-600 dark:text-neutral-200"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Official GitHub Repository (Lightricks/LTX-Desktop)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Hardware Compatibility Checker */}
        <section className="mb-12 border-2 border-neutral-900 bg-white p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex items-center gap-2 mb-2">
            <span className="border border-neutral-900 bg-neutral-200 px-2 py-0.5 text-xs font-mono font-bold dark:border-neutral-700 dark:bg-neutral-800">
              HARDWARE ADVISOR
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              SELECT YOUR SYSTEM SPECS
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-neutral-950 dark:text-white mb-3">
            Will LTX Desktop Run on Your Machine?
          </h2>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
            The official project recommends a 24–32 GB NVIDIA GPU for full BF16 generation. However, using FP8
            quantization and Nirmal&apos;s custom tester build, even mainstream 8 GB cards (like the RTX 4060) can
            generate 540p clips locally. Choose your card below to see what to expect:
          </p>

          {/* GPU Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mb-6">
            {GPU_PRESETS.map((gpu) => (
              <button
                key={gpu.id}
                onClick={() => setSelectedGpu(gpu.id)}
                className={`p-3 text-left border-2 transition-all ${
                  selectedGpu === gpu.id
                    ? 'border-neutral-900 bg-[#ffcf32]/20 shadow-[3px_3px_0px_0px_#000] dark:border-white dark:bg-amber-400/20 dark:shadow-[3px_3px_0px_0px_#fff]'
                    : 'border-neutral-300 bg-neutral-50 hover:border-neutral-600 dark:border-neutral-800 dark:bg-[#1a1a1a]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-neutral-950 dark:text-white">
                    {gpu.vramGb > 0 ? `${gpu.vramGb} GB VRAM` : 'No CUDA'}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 font-bold ${
                      gpu.officialSupported
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : gpu.testerBuildSupported
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
                    }`}
                  >
                    {gpu.officialSupported ? 'OFFICIAL READY' : gpu.testerBuildSupported ? 'TESTER PATCH' : 'CLOUD ONLY'}
                  </span>
                </div>
                <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate">{gpu.name}</div>
              </button>
            ))}
          </div>

          {/* GPU Results Telemetry Card */}
          <div className="border border-neutral-900 bg-neutral-900 p-5 text-white dark:border-neutral-200 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400">Selected Hardware Profile</span>
                <div className="text-lg font-bold font-mono text-[#ffcf32]">{currentGpu.name}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-neutral-400">Est. Render Time (5s Clip)</span>
                <div className="text-base font-mono font-bold text-emerald-400">{currentGpu.expectedRenderTime5s}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono mb-4">
              <div className="border border-neutral-800 bg-black/40 p-3">
                <span className="text-neutral-400 block mb-1">Recommended Resolution:</span>
                <span className="font-bold text-white">{currentGpu.recommendedResolution}</span>
              </div>
              <div className="border border-neutral-800 bg-black/40 p-3">
                <span className="text-neutral-400 block mb-1">Text Encoding Recommendation:</span>
                <span className="font-bold text-[#ffcf32]">{currentGpu.textEncodingAdvice}</span>
              </div>
              <div className="border border-neutral-800 bg-black/40 p-3">
                <span className="text-neutral-400 block mb-1">Hardware Tier:</span>
                <span
                  className={`font-bold ${
                    currentGpu.officialSupported ? 'text-emerald-400' : currentGpu.testerBuildSupported ? 'text-amber-400' : 'text-neutral-400'
                  }`}
                >
                  {currentGpu.officialSupported
                    ? 'Native Official Tier'
                    : currentGpu.testerBuildSupported
                    ? 'Nirmal Tested Patch (8 GB)'
                    : 'API Fallback Only'}
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-sans border-t border-neutral-800 pt-3">
              <strong>Technical Assessment:</strong> {currentGpu.notes}
            </p>
          </div>

          {/* Official Specs vs Real World Table */}
          <div className="overflow-x-auto border border-neutral-900 dark:border-neutral-700">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-neutral-900 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 uppercase">
                <tr>
                  <th className="p-3">Component</th>
                  <th className="p-3">Official Project Recommendation</th>
                  <th className="p-3">Tester Build Floor (Nirmal Setup)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-[#161616]">
                <tr>
                  <td className="p-3 font-bold">Operating System</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">Windows 10 / 11 64-bit or macOS Apple Silicon</td>
                  <td className="p-3 font-semibold text-neutral-950 dark:text-white">Windows 10/11 64-bit</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Graphics Card (GPU)</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">NVIDIA CUDA 24 GB+ VRAM (32 GB recommended)</td>
                  <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400">NVIDIA 8 GB VRAM (e.g. RTX 4060)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">System Memory (RAM)</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">64 GB RAM recommended</td>
                  <td className="p-3 font-semibold text-neutral-950 dark:text-white">32 GB RAM (close heavy background apps)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold">Storage Drive</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">100 GB+ free (allow 160 GB+ for extra LoRAs)</td>
                  <td className="p-3 font-semibold text-neutral-950 dark:text-white">~80 GB free on an NVMe SSD</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Deep Dive into The 8 GB VRAM Experiment */}
        <section className="mb-12 border-2 border-amber-600 bg-amber-500/10 p-5 sm:p-7 shadow-[4px_4px_0px_0px_#d97706] dark:border-amber-400 dark:shadow-[4px_4px_0px_0px_#f59e0b]">
          <div className="flex items-start gap-3">
            <Zap className="h-6 w-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="border border-amber-800 bg-amber-100 px-2 py-0.2 text-[10px] font-mono font-bold text-amber-900 dark:border-amber-400 dark:bg-amber-950 dark:text-amber-300">
                  CRITICAL EXPLANATION
                </span>
                <span className="text-xs font-mono font-bold text-amber-900 dark:text-amber-300">
                  WHAT ABOUT THE 8 GB SETUP IN MY REEL?
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-mono text-neutral-950 dark:text-white mb-2">
                Why Official Builds Show &quot;Coming Soon to Your Device&quot;
              </h3>

              <p className="text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed mb-4">
                The current official Windows build checks for at least <strong>9 GiB VRAM on an FP8-capable GPU</strong>{' '}
                or <strong>15 GiB on standard CUDA configurations</strong>. If your graphics card has 8 GB (such as a laptop
                RTX 4060), the official app detects that you fall below this floor and disables local generation buttons
                with the message: <em>&quot;Coming soon to your device&quot;</em>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 font-mono text-xs">
                <div className="border border-amber-700 bg-white p-3.5 dark:bg-[#181818] dark:border-amber-500">
                  <div className="font-bold text-amber-950 dark:text-amber-300 mb-1">
                    1. The VRAM Barrier Bypass:
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 text-[11px] leading-relaxed">
                    Nirmal&apos;s custom test build modifies the client check so that instead of refusing to start, the
                    app attempts the generation. When paired with 540p resolution and a 5-second clip duration, an 8 GB
                    RTX 4060 completes the render in ~5 minutes!
                  </p>
                </div>

                <div className="border border-amber-700 bg-white p-3.5 dark:bg-[#181818] dark:border-amber-500">
                  <div className="font-bold text-amber-950 dark:text-amber-300 mb-1">
                    2. Fast Decode Enabled by Default:
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 text-[11px] leading-relaxed">
                    In the standard release, clips longer than 3 seconds fail with a <code>CAPABILITY_FAILED</code> out-of-memory
                    error during the VAE video decode phase. The tester build turns on <strong>Fast Decode</strong> by
                    default, letting clips up to 20 seconds finish cleanly.
                  </p>
                </div>
              </div>

              <div className="text-xs text-amber-900 dark:text-amber-300 font-mono mb-4">
                ⚠️ <strong>Important Note:</strong> A successful custom test on an RTX 4060 does not guarantee that every 8 GB
                GPU will work. Always close other heavy apps (games, Chrome with hardware acceleration, ComfyUI) before generating.
              </div>

              {/* Download Tester Build Banner */}
              <div className="mt-4 pt-4 border-t border-amber-600/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/60 dark:bg-black/40 p-4 border border-amber-500">
                <div>
                  <div className="font-bold text-sm text-neutral-950 dark:text-white font-mono flex items-center gap-1.5">
                    <Download className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span>Download LTX Desktop 1.3.3 Tester Build (8 GB Patch)</span>
                  </div>
                  <div className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400 mt-1">
                    Includes <code>LTX Desktop-Setup-1.3.3-tester.exe</code> + <code>READ ME FIRST - Tester Guide.md</code>.
                  </div>
                </div>
                <a
                  href="https://drive.google.com/drive/folders/1lzZ1Ca5u0BIieRPd22yEPHTMdse11OE0?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-neutral-900 bg-[#ffcf32] px-4 py-2.5 text-xs font-mono font-bold text-neutral-950 shadow-[3px_3px_0px_0px_#000] hover:bg-[#ffe066] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0"
                >
                  <Download className="h-4 w-4" />
                  <span>DOWNLOAD TESTER BUILD (GOOGLE DRIVE)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Interactive Tool & Feature Matrix (from ltx.io) */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="border border-neutral-900 bg-neutral-200 px-2 py-0.5 text-xs font-mono font-bold dark:border-neutral-700 dark:bg-neutral-800">
              FEATURE CATALOG
            </span>
            <span className="text-xs font-mono text-neutral-500">EVERY TOOL IN LTX DESKTOP</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-neutral-950 dark:text-white mb-3">
            Choose the Right Tool for Your Scene
          </h2>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
            LTX Desktop isn&apos;t just a prompt generator — it includes a complete multi-track timeline and dedicated
            generative tools. Select any tool to inspect its parameters:
          </p>

          {/* Tool Navigation Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {LTX_TOOLS.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTool(t.id)}
                className={`p-3 text-left border transition-all ${
                  selectedTool === t.id
                    ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#ffcf32]'
                    : 'border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-[#1a1a1a] dark:text-neutral-200'
                }`}
              >
                <div className="text-[10px] font-mono opacity-60 mb-0.5 uppercase">{t.badge}</div>
                <div className="font-mono font-bold text-xs truncate">{t.name}</div>
              </button>
            ))}
          </div>

          {/* Active Tool Deep Dive Card */}
          <div className="border-2 border-neutral-900 bg-white p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
                  TOOL PROFILE · {currentToolData.badge}
                </span>
                <h3 className="text-2xl font-bold font-mono text-neutral-950 dark:text-white">
                  {currentToolData.name}
                </h3>
              </div>
              <div className="text-xs font-mono px-2.5 py-1 bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700">
                RECOMMENDED SETTING: {currentToolData.recommendedSettings}
              </div>
            </div>

            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-5">
              {currentToolData.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-[#1a1a1a]">
                <strong className="block text-neutral-950 dark:text-white mb-2 uppercase">Required Inputs:</strong>
                <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
                  {currentToolData.inputs.map((inp, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-[#ffcf32] rounded-full" />
                      <span>{inp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-[#1a1a1a]">
                <strong className="block text-neutral-950 dark:text-white mb-2 uppercase">Best Use Cases:</strong>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">{currentToolData.bestFor}</p>
                <div className="mt-3 text-[11px] text-emerald-600 dark:text-emerald-400">
                  Tip: Change only one variable at a time (lighting, prompt, or camera) so you can evaluate the model&apos;s response.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Tested Prompts Library with 1-Click Copy */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="border border-neutral-900 bg-neutral-200 px-2 py-0.5 text-xs font-mono font-bold dark:border-neutral-700 dark:bg-neutral-800">
              PROMPT VAULT
            </span>
            <span className="text-xs font-mono text-neutral-500">TESTED IN NIRMAL&apos;S REEL</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-neutral-950 dark:text-white mb-3">
            Copy Tested Starter Prompts
          </h2>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
            LTX 2.5 performs best with descriptive, camera-aware prompts that specify lighting, fabric movement, and facial consistency:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Prompt 1: Animation (Boy with kite) */}
            <div className="border-2 border-neutral-900 bg-white p-5 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-none flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                    ANIMATION & WIND PHYSICS
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">IMAGE TO VIDEO</span>
                </div>
                <h4 className="text-base font-bold font-mono text-neutral-950 dark:text-white mb-2">
                  Young Boy Flying Red Kite
                </h4>
                <div className="border border-neutral-200 bg-neutral-50 p-3 font-mono text-xs leading-relaxed text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 mb-4">
                  A young boy runs gently across a grassy hillside while flying a red kite. His scarf moves naturally in
                  the breeze. Warm evening light, consistent facial features, smooth body movement, and a slow tracking
                  camera. Keep the character&apos;s clothing and appearance consistent.
                </div>
              </div>

              <button
                onClick={() =>
                  copyPrompt(
                    'kite',
                    'A young boy runs gently across a grassy hillside while flying a red kite. His scarf moves naturally in the breeze. Warm evening light, consistent facial features, smooth body movement, and a slow tracking camera. Keep the character\'s clothing and appearance consistent.'
                  )
                }
                className="w-full flex items-center justify-center gap-2 border border-neutral-900 bg-[#ffcf32] py-2 text-xs font-mono font-bold text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#ffe066] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                {copiedPromptId === 'kite' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedPromptId === 'kite' ? 'PROMPT COPIED!' : 'COPY ANIMATION PROMPT'}</span>
              </button>
            </div>

            {/* Prompt 2: Realistic Motion */}
            <div className="border-2 border-neutral-900 bg-white p-5 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-none flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    REALISTIC PORTRAIT MOTION
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">IMAGE TO VIDEO</span>
                </div>
                <h4 className="text-base font-bold font-mono text-neutral-950 dark:text-white mb-2">
                  Window Portrait & Natural Smile
                </h4>
                <div className="border border-neutral-200 bg-neutral-50 p-3 font-mono text-xs leading-relaxed text-neutral-800 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 mb-4">
                  A close-up of a person standing beside a window in soft daylight. They turn slightly toward the light
                  and give a small, natural smile. Subtle breathing, realistic skin texture, gentle hair movement, and a
                  slow camera push-in. Preserve the person&apos;s identity and the room&apos;s lighting.
                </div>
              </div>

              <button
                onClick={() =>
                  copyPrompt(
                    'portrait',
                    'A close-up of a person standing beside a window in soft daylight. They turn slightly toward the light and give a small, natural smile. Subtle breathing, realistic skin texture, gentle hair movement, and a slow camera push-in. Preserve the person\'s identity and the room\'s lighting.'
                  )
                }
                className="w-full flex items-center justify-center gap-2 border border-neutral-900 bg-[#ffcf32] py-2 text-xs font-mono font-bold text-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#ffe066] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                {copiedPromptId === 'portrait' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedPromptId === 'portrait' ? 'PROMPT COPIED!' : 'COPY PORTRAIT PROMPT'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 6: Step-by-Step Installation & Setup Playbook */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="border border-neutral-900 bg-neutral-200 px-2 py-0.5 text-xs font-mono font-bold dark:border-neutral-700 dark:bg-neutral-800">
              SETUP GUIDE
            </span>
            <span className="text-xs font-mono text-neutral-500">FROM INSTALL TO FIRST VIDEO</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-neutral-950 dark:text-white mb-6">
            Step-by-Step Installation & Model Setup
          </h2>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto border-b-2 border-neutral-900 dark:border-neutral-200 mb-6 gap-1 pb-1">
            {[
              { id: 1, label: '1. Install App' },
              { id: 2, label: '2. Hugging Face Setup' },
              { id: 3, label: '3. Text Encoding Mode' },
              { id: 4, label: '4. First 540p Test Shot' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs font-mono font-bold whitespace-nowrap transition-colors border ${
                  activeTab === tab.id
                    ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#ffcf32]'
                    : 'border-transparent text-neutral-600 hover:text-black hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Install App */}
          {activeTab === 1 && (
            <div className="border border-neutral-900 bg-white p-5 sm:p-6 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-none space-y-4">
              <h3 className="text-lg font-bold font-mono text-neutral-950 dark:text-white">
                1. Download and Run the Windows Installer
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Choose the version matching your graphics card:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://drive.google.com/drive/folders/1lzZ1Ca5u0BIieRPd22yEPHTMdse11OE0?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border-2 border-neutral-900 bg-[#ffcf32] hover:bg-[#ffe066] text-black shadow-[2px_2px_0px_0px_#000] font-mono text-xs"
                >
                  <div>
                    <strong className="block font-bold">8 GB Tester Build (Google Drive)</strong>
                    <span className="text-[10px] text-neutral-800">For RTX 4060 / 8 GB VRAM cards</span>
                  </div>
                  <Download className="h-4 w-4 shrink-0" />
                </a>

                <a
                  href="https://github.com/Lightricks/LTX-Desktop/releases/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border border-neutral-900 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 shadow-[2px_2px_0px_0px_#000] dark:shadow-none font-mono text-xs"
                >
                  <div>
                    <strong className="block font-bold">Official GitHub Release</strong>
                    <span className="text-[10px] text-neutral-500">For 12 GB - 24 GB+ cards</span>
                  </div>
                  <ExternalLink className="h-4 w-4 shrink-0 text-neutral-500" />
                </a>
              </div>

              <div className="space-y-2 font-mono text-xs pt-1">
                <div className="flex items-start gap-2 p-2.5 bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800">
                  <span className="font-bold text-amber-600">A.</span>
                  <div>
                    <strong>Windows SmartScreen Warning:</strong> If Windows shows <em>&quot;Windows protected your PC&quot;</em>,
                    click <strong>More info</strong> → <strong>Run anyway</strong> (standard for open-source releases without costly commercial code certificates).
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2.5 bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800">
                  <span className="font-bold text-amber-600">B.</span>
                  <div>
                    <strong>Install Scope:</strong> Choose <strong>Only for me</strong>, keep the default folder, and let it install Visual C++ runtimes if needed.
                  </div>
                </div>
                <div className="flex items-start gap-2 p-2.5 bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800">
                  <span className="font-bold text-amber-600">C.</span>
                  <div>
                    <strong>First-Run Runtime Download:</strong> The app will download its self-contained Python runtime (~3.3 GB). Leave the app open to finish.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Hugging Face Setup */}
          {activeTab === 2 && (
            <div className="border border-neutral-900 bg-white p-5 sm:p-6 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-none space-y-4">
              <h3 className="text-lg font-bold font-mono text-neutral-950 dark:text-white">
                2. Accept Hugging Face Model License Terms
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                The LTX 2.5 model weights are free and open, but gated behind Hugging Face authentication:
              </p>
              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800">
                  1. Click <strong>&quot;Sign in with Hugging Face&quot;</strong> inside the setup screen.
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800">
                  2. Accept the model license terms on the Hugging Face page that opens.
                </div>
                <div className="p-3 bg-neutral-50 dark:bg-[#1a1a1a] border border-neutral-200 dark:border-neutral-800">
                  3. The app downloads the core model weights (~68 GB). Ensure you have at least 80–100 GB free space on an SSD.
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Text Encoding Mode */}
          {activeTab === 3 && (
            <div className="border border-neutral-900 bg-white p-5 sm:p-6 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-none space-y-4">
              <h3 className="text-lg font-bold font-mono text-neutral-950 dark:text-white">
                3. Choose Your Text Encoding Strategy
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Text encoding translates your prompt into embeddings before the video diffusion begins. LTX Desktop offers two options in <strong>Settings → General → Text encoding</strong>:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="border-2 border-emerald-600 bg-emerald-500/10 p-3.5">
                  <div className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                    Option A: LTX API Text Encoding (Free Cloud)
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 text-[11px] leading-relaxed">
                    Uses Lightricks&apos; free cloud encoder service for just the text stage, then runs 100% of the heavy video diffusion on your local GPU.
                    <br />
                    <strong className="text-emerald-700 dark:text-emerald-400">Saves ~2 to 4 GB of local VRAM! Highly recommended for 8 GB &amp; 12 GB GPUs.</strong>
                  </p>
                </div>

                <div className="border border-neutral-300 bg-neutral-50 p-3.5 dark:border-neutral-700 dark:bg-[#1a1a1a]">
                  <div className="font-bold text-neutral-950 dark:text-white mb-1">
                    Option B: Local Text Encoding (100% Offline)
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-[11px] leading-relaxed">
                    Downloads an additional local T5/text encoder. Best for machines with 16 GB to 32 GB+ VRAM that need complete air-gapped offline privacy.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: First Test Shot */}
          {activeTab === 4 && (
            <div className="border border-neutral-900 bg-white p-5 sm:p-6 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-none space-y-4">
              <h3 className="text-lg font-bold font-mono text-neutral-950 dark:text-white">
                4. Generate Your First 540p Test Clip
              </h3>
              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Never jump straight to 1080p 20-second jobs. Start small to verify your pipeline:
              </p>
              <ol className="list-decimal list-inside space-y-2 font-mono text-xs text-neutral-700 dark:text-neutral-300">
                <li>Go to <strong>Image to Video</strong>.</li>
                <li>Drop in a single clear photograph with a distinct subject.</li>
                <li>Set resolution to <strong>540p</strong> and duration to <strong>3s or 5s</strong> at <strong>24 fps</strong>.</li>
                <li>Paste our tested animation or realistic motion prompt.</li>
                <li>Click <strong>Generate</strong> and watch the task queue progress bar.</li>
              </ol>
            </div>
          )}
        </section>

        {/* SECTION 7: Screenshot Gallery & Lightbox */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="border border-neutral-900 bg-neutral-200 px-2 py-0.5 text-xs font-mono font-bold dark:border-neutral-700 dark:bg-neutral-800">
              SCREENSHOT GALLERY
            </span>
            <span className="text-xs font-mono text-neutral-500">8 REAL DOCUMENTATION CAPTURES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-neutral-950 dark:text-white mb-6">
            Inside LTX Desktop: UI, Tools & Outputs
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImg(item)}
                className="group relative cursor-pointer border border-neutral-900 bg-neutral-100 overflow-hidden shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#ffcf32] transition-all dark:border-neutral-700 dark:bg-[#1a1a1a]"
              >
                <div className="relative aspect-video w-full bg-neutral-950">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 left-1.5 border border-black/40 bg-black/80 px-1.5 py-0.2 text-[9px] font-mono font-bold text-white uppercase">
                    {item.tag}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <Maximize2 className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="p-2 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="font-mono font-bold text-[11px] truncate text-neutral-900 dark:text-neutral-100">
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8: Official Links & Resource Hub */}
        <section className="mb-12 border-2 border-neutral-900 bg-white p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex items-center gap-2 mb-2">
            <span className="border border-neutral-900 bg-neutral-200 px-2 py-0.5 text-xs font-mono font-bold dark:border-neutral-700 dark:bg-neutral-800">
              OFFICIAL LINKS
            </span>
            <span className="text-xs font-mono text-neutral-500">LIGHTRICKS & GITHUB DOCS</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-neutral-950 dark:text-white mb-4">
            Official Project Documentation & Downloads
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <a
              href="https://drive.google.com/drive/folders/1lzZ1Ca5u0BIieRPd22yEPHTMdse11OE0?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="sm:col-span-2 flex items-center justify-between p-3.5 border-2 border-neutral-900 bg-[#ffcf32] hover:bg-[#ffe066] text-black shadow-[3px_3px_0px_0px_#000] transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="bg-black text-[#ffcf32] px-1.5 py-0.2 text-[9px] font-bold uppercase">
                    FEATURED DOWNLOAD
                  </span>
                  <strong className="text-sm font-bold">LTX Desktop 8 GB Tester Build (Google Drive)</strong>
                </div>
                <span className="text-[11px] text-neutral-800">
                  Direct folder download: includes patched setup executable for 8 GB GPUs (RTX 4060) + Fast Decode guide.
                </span>
              </div>
              <Download className="h-5 w-5 text-black shrink-0 ml-3" />
            </a>

            <a
              href="https://github.com/Lightricks/LTX-Desktop/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-neutral-900 bg-neutral-50 hover:bg-[#ffcf32]/20 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#181818] transition-colors"
            >
              <div>
                <strong className="text-neutral-950 dark:text-white block">Download LTX Desktop (Releases)</strong>
                <span className="text-neutral-500">Official Windows setup .exe and release notes</span>
              </div>
              <ExternalLink className="h-4 w-4 text-neutral-400 shrink-0" />
            </a>

            <a
              href="https://github.com/Lightricks/LTX-Desktop/blob/main/docs/hardware-compatibility.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-neutral-900 bg-neutral-50 hover:bg-[#ffcf32]/20 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#181818] transition-colors"
            >
              <div>
                <strong className="text-neutral-950 dark:text-white block">Hardware Compatibility Guide</strong>
                <span className="text-neutral-500">Official GPU, VRAM &amp; quantization matrix</span>
              </div>
              <ExternalLink className="h-4 w-4 text-neutral-400 shrink-0" />
            </a>

            <a
              href="https://github.com/Lightricks/LTX-Desktop/blob/main/docs/setup-and-settings.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-neutral-900 bg-neutral-50 hover:bg-[#ffcf32]/20 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#181818] transition-colors"
            >
              <div>
                <strong className="text-neutral-950 dark:text-white block">Setup &amp; Settings Manual</strong>
                <span className="text-neutral-500">Model locations, Hugging Face auth &amp; text encoder</span>
              </div>
              <ExternalLink className="h-4 w-4 text-neutral-400 shrink-0" />
            </a>

            <a
              href="https://ltx.io/ltx-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-neutral-900 bg-neutral-50 hover:bg-[#ffcf32]/20 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#181818] transition-colors"
            >
              <div>
                <strong className="text-neutral-950 dark:text-white block">Official LTX.io Product Page</strong>
                <span className="text-neutral-500">Feature overviews, sample showcases &amp; vision</span>
              </div>
              <ExternalLink className="h-4 w-4 text-neutral-400 shrink-0" />
            </a>
          </div>
        </section>

        {/* Bottom Navigation & Cross-Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-neutral-900 bg-white p-5 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div>
            <div className="font-mono font-bold text-sm text-neutral-950 dark:text-white">
              Learn with Nirmal · Creator &amp; Builder
            </div>
            <div className="text-xs font-mono text-neutral-500">
              Information checked against official LTX Desktop releases on 26 November 2026.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/guide/local-ai-video"
              className="border border-neutral-900 bg-neutral-100 px-3 py-1.5 text-xs font-mono font-bold hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              ← COMFYUI 8GB GUIDE
            </Link>
            <Link
              href="/guide/ai-reel-editor"
              className="border border-neutral-900 bg-[#ffcf32] px-3 py-1.5 text-xs font-mono font-bold text-black hover:bg-[#ffe066]"
            >
              AI REEL EDITOR →
            </Link>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full border-2 border-white bg-neutral-900 shadow-[8px_8px_0px_0px_#ffcf32] overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 py-2.5 text-white">
              <span className="font-mono text-xs font-bold uppercase">{lightboxImg.title}</span>
              <button
                onClick={() => setLightboxImg(null)}
                className="p-1 hover:text-[#ffcf32] transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <Image
                src={lightboxImg.src}
                alt={lightboxImg.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 900px"
              />
            </div>

            <div className="p-4 bg-neutral-950 border-t border-neutral-800 text-neutral-300 font-mono text-xs">
              <p className="leading-relaxed">{lightboxImg.caption}</p>
              <div className="mt-2 text-[10px] text-neutral-500 uppercase">
                CATEGORY: {lightboxImg.tag}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
