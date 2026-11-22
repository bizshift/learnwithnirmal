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
  ExternalLink,
  Terminal,
  Share2,
  Cpu,
  HardDrive,
  Clock,
  Layers,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  FolderOpen,
  Film,
} from 'lucide-react';

interface ToolLink {
  name: string;
  role: string;
  cost: 'FREE' | 'PAID PLAN';
  colorClass: string;
  darkText?: boolean;
  url: string;
  docsLabel: string;
  folderHint: string;
}

const TOOLS_STACK: ToolLink[] = [
  {
    name: 'Claude Code',
    role: 'The AI director: plans shots, writes prompts, fixes broken frames, and runs the scripts.',
    cost: 'PAID PLAN',
    colorClass: 'bg-[#FF7262]',
    darkText: true,
    url: 'https://docs.anthropic.com/en/docs/claude-code/overview',
    docsLabel: 'Claude Code Docs',
    folderHint: 'CLI in your project folder',
  },
  {
    name: 'ComfyUI',
    role: 'The local node-based engine that runs every image, video, and audio model on your GPU.',
    cost: 'FREE',
    colorClass: 'bg-[#62C6F8]',
    darkText: true,
    url: 'https://www.comfy.org/download',
    docsLabel: 'Download ComfyUI',
    folderHint: 'Local server on :8188 / :8000',
  },
  {
    name: 'LTX-2.5 (22B Distilled)',
    role: 'Picture-to-video + synchronized sound generation. Runs cleanly on 8 GB VRAM with dynamic offloading.',
    cost: 'FREE',
    colorClass: 'bg-[#4EC6A5]',
    darkText: true,
    url: 'https://huggingface.co/Lightricks',
    docsLabel: 'Lightricks HuggingFace',
    folderHint: 'models/diffusion_models/ & models/vae/',
  },
  {
    name: 'Krea-2 / FLUX.1 Krea',
    role: 'Text-to-image keyframe painter. Generates consistent, cinematic frames in ~1 minute each.',
    cost: 'FREE',
    colorClass: 'bg-[#9CD4E0]',
    darkText: true,
    url: 'https://huggingface.co/black-forest-labs/FLUX.1-Krea-dev',
    docsLabel: 'FLUX.1 Krea Weights',
    folderHint: 'models/diffusion_models/',
  },
  {
    name: 'Qwen-Image',
    role: 'Surgical image editing model for fixing extra limbs, melted hands, or unwanted background text.',
    cost: 'FREE',
    colorClass: 'bg-[#4285F4]',
    darkText: false,
    url: 'https://huggingface.co/Qwen',
    docsLabel: 'Qwen HuggingFace',
    folderHint: 'models/diffusion_models/ & text_encoders/',
  },
  {
    name: 'ACE-Step 1.5',
    role: 'Local open-weights music generator for custom film scores and background tracks.',
    cost: 'FREE',
    colorClass: 'bg-[#62C6F8]',
    darkText: true,
    url: 'https://github.com/ace-step/ACE-Step',
    docsLabel: 'ACE-Step GitHub',
    folderHint: 'ComfyUI audio workflow',
  },
  {
    name: 'FFmpeg',
    role: 'Scripted timeline assembly, speed-ramping, trimming, color grading, and -14 LUFS loudness mastering.',
    cost: 'FREE',
    colorClass: 'bg-[#4EC6A5]',
    darkText: true,
    url: 'https://www.gyan.dev/ffmpeg/builds/',
    docsLabel: 'FFmpeg Windows Builds',
    folderHint: 'Add ffmpeg/bin to System PATH',
  },
];

interface SampleFilm {
  id: string;
  title: string;
  tag: string;
  aspect: '16:9' | '9:16';
  durationLabel: string;
  note: string;
  video: string;
  poster: string;
  badgeColor: string;
}

const SAMPLE_FILMS: SampleFilm[] = [
  {
    id: 'chennai-side',
    title: 'CHENNAI SIDE',
    tag: '16:9 · 21-Shot GTA-Style Trailer',
    aspect: '16:9',
    durationLabel: '0:44',
    note: 'Full 21-shot Chennai game trailer directed by Claude Code, painted with Krea-2, animated in LTX-2.5, scored with ACE-Step 1.5.',
    video: '/assets/local-ai-video/samples/chennai-side.mp4',
    poster: '/assets/local-ai-video/samples/chennai-side.jpg',
    badgeColor: 'bg-[#FF7262]',
  },
  {
    id: 'blue-saree',
    title: 'BLUE SAREE',
    tag: '16:9 · Emotional Short Film Excerpt',
    aspect: '16:9',
    durationLabel: '0:35',
    note: 'Warm cinematic short film rendered locally on 8 GB VRAM with consistent characters and natural lighting.',
    video: '/assets/local-ai-video/samples/blue-saree.mp4',
    poster: '/assets/local-ai-video/samples/blue-saree.jpg',
    badgeColor: 'bg-[#62C6F8]',
  },
  {
    id: 'today-is-my-day',
    title: 'TODAY IS MY DAY',
    tag: '9:16 · High-Energy Action Beat Cut',
    aspect: '9:16',
    durationLabel: '0:29',
    note: 'Fast-cut vertical action sequence with comic beat timing, kinetic camera motion, and synced audio.',
    video: '/assets/local-ai-video/samples/today-is-my-day.mp4',
    poster: '/assets/local-ai-video/samples/today-is-my-day.jpg',
    badgeColor: 'bg-[#4EC6A5]',
  },
  {
    id: 'just-luck',
    title: 'JUST LUCK',
    tag: '9:16 · Stylized Vertical Story',
    aspect: '9:16',
    durationLabel: '0:30',
    note: 'Vertical narrative film made completely locally with Krea-2 keyframes and LTX-2.5 motion.',
    video: '/assets/local-ai-video/samples/just-luck.mp4',
    poster: '/assets/local-ai-video/samples/just-luck.jpg',
    badgeColor: 'bg-[#4285F4]',
  },
  {
    id: 'kite-chase',
    title: 'KITE CHASE',
    tag: '9:16 · Rooftop Animated Shot',
    aspect: '9:16',
    durationLabel: '0:04',
    note: 'Golden-hour stylized rooftop chase generated in a single LTX-2.5 pass on an RTX 4060.',
    video: '/assets/local-ai-video/samples/kite-chase.mp4',
    poster: '/assets/local-ai-video/samples/kite-chase.jpg',
    badgeColor: 'bg-[#9CD4E0]',
  },
];

interface PlaybookStep {
  num: number;
  tag: string;
  title: string;
  summary: string;
  checklist: string[];
  codeTitle: string;
  code: string;
}

const PLAYBOOK_STEPS: PlaybookStep[] = [
  {
    num: 1,
    tag: 'STEP 01 · SETUP & STORY',
    title: 'Install ComfyUI locally & brief Claude Code on your story',
    summary:
      'Start ComfyUI on your NVIDIA GPU with VRAM headroom flags, then give Claude Code a single plain-English message describing the film you want. It breaks your idea into a numbered shot list with fixed character descriptions.',
    checklist: [
      'Install ComfyUI Desktop (or portable) and verify the local API responds at http://127.0.0.1:8188/system_stats.',
      'Close Chrome tabs and heavy apps before rendering — LTX-2.5 stages its 22B int8 weights in system RAM (32 GB recommended).',
      'Create one project folder with subfolders: frames/, workflows/, music/, and out/.',
      'Lock every recurring character into a verbatim text description so every keyframe stays consistent.',
    ],
    codeTitle: 'ComfyUI launch command (8 GB VRAM safe)',
    code: `python main.py --port 8188 --vram-headroom 1.5 --reserve-vram 1.0

# Verify ComfyUI API is live:
curl http://127.0.0.1:8188/system_stats`,
  },
  {
    num: 2,
    tag: 'STEP 02 · IMAGE PROMPTS',
    title: 'Write camera-first image prompts in kf.py',
    summary:
      'Image models weight the very first words of a prompt most heavily. Always lead with the camera framing and lens, followed by the action, the fixed character description, lighting, and style.',
    checklist: [
      'Lead with shot type: "Low-angle hero medium shot" or "Comic wide shot" before anything else.',
      'Explicitly add "Character appears only once" whenever a named character is in frame — prevents accidental twins.',
      'Store all shot prompts in a Python dictionary (kf.py) so Claude Code can render and re-roll individual shots by ID.',
    ],
    codeTitle: 'kf.py — camera-first shot prompt pattern',
    code: `SHOTS = {
  10: (
    "Comic wide shot: a traffic policeman in a khaki uniform on a scooter "
    "skidding and crashing into a stall of jasmine flower baskets, white "
    "flowers and marigolds flying everywhere, his cap in the air, vendors shocked. "
    "The policeman appears only once. Warm golden-hour Chennai street light."
  ),
}`,
  },
  {
    num: 3,
    tag: 'STEP 03 · KEYFRAMES & VISUAL QA',
    title: 'Paint every frame with Krea-2 & inspect before animating',
    summary:
      'A broken keyframe always produces a broken video. Render all keyframes at ~1 minute per image, tile them into a single STORYBOARD.png contact sheet, and fix extra limbs or melted hands with a new seed or Qwen-Image before touching LTX-2.5.',
    checklist: [
      'Generate all frames first and build a contact sheet with FFmpeg tile filter to inspect consistency in one glance.',
      'Inspect hands, feet, props, and background signs — redraw any broken frame immediately.',
      'Keep keyframe resolution aligned to multiples of 32 (e.g., 1536×864 for 16:9 or 768×1024 / 544×960 for vertical).',
    ],
    codeTitle: 'Build a contact sheet of all keyframes',
    code: `ffmpeg -y -pattern_type glob -i "frames/f*.png" \\
  -vf "scale=320:-2,tile=7x3" -frames:v 1 frames/STORYBOARD.png`,
  },
  {
    num: 4,
    tag: 'STEP 04 · MOTION & LTX-2.5 VIDEO',
    title: 'Write gentle motion prompts & animate with LTX-2.5',
    summary:
      'Feed each approved keyframe into LTX-2.5 22B Distilled Image-to-Video with euler sampling and img_compression=4. Keep camera moves slow and simple — fast action smears. Get the film’s energy from fast cuts in the edit.',
    checklist: [
      'Use sampler="euler" and img_compression=4 for crispest detail and least motion smear.',
      'Never write "camera trucks", "crane shot", or "drone shot" — LTX literally draws trucks, cranes, or drones in the scene!',
      'Use ff_strength=0.90 to lock character identity, or 0.68–0.75 when you need bigger camera glides.',
      'If hands or faces distort on fast 8-step distilled runs, switch to 20 steps via LTXVScheduler.',
    ],
    codeTitle: 'motion.json — clean LTX-2.5 motion brief',
    code: `{
  "id": 10,
  "title": "flower stall crash",
  "duration": 3,
  "seed": 82970,
  "video_prompt": "Nearly still camera. The camera drifts very slowly and gently the whole time, giving soft natural parallax. The policeman wobbles on his scooter and tips over into the flower baskets, white jasmine flowers puff up and fall softly around him, the vendors laugh. Natural subtle motion."
}`,
  },
  {
    num: 5,
    tag: 'STEP 05 · EDIT, MUSIC & MASTERING',
    title: 'Trim the last 0.5s, score with ACE-Step 1.5 & master in FFmpeg',
    summary:
      'LTX clips often glitch in the final 10–12 frames. Trim the last 0.5 seconds off every shot, assemble your rhythmic cut in FFmpeg, layer in a local ACE-Step 1.5 soundtrack, and loudness-normalize to -14 LUFS for Instagram & YouTube.',
    checklist: [
      'Trim 0.2s off the start and 0.5s off the end of every generated LTX clip for seamless, glitch-free cuts.',
      'Generate custom copyright-free background music locally using ACE-Step 1.5.',
      'Normalize final stereo audio to -14 LUFS / -1.5 dB True Peak and export H.264 yuv420p with +faststart.',
    ],
    codeTitle: 'FFmpeg concat + -14 LUFS broadcast audio master',
    code: `ffmpeg -y -f concat -safe 0 -i clips_trimmed.txt -i music/score.wav \\
  -filter_complex "[1:a]loudnorm=I=-14:TP=-1.5:LRA=11[a]" \\
  -map 0:v -map "[a]" -shortest \\
  -c:v libx264 -crf 17 -preset slow -pix_fmt yuv420p -movflags +faststart \\
  -c:a aac -b:a 192k FINAL_FILM.mp4`,
  },
];

const TROUBLESHOOTING = [
  {
    issue: 'Renders suddenly drop from ~3 min to 20+ min per shot',
    cause: 'Windows is paging the 22B transformer weights to disk because free RAM dropped below ~4 GB.',
    fix: 'Close browser tabs, Electron apps, and IDEs before running batch renders. Aim for 32 GB system RAM.',
  },
  {
    issue: 'Two copies of the same character appear in one keyframe',
    cause: 'Image models duplicate prominent subjects when framing is wide.',
    fix: 'Explicitly append "<Character> appears only once." right after the subject description in kf.py.',
  },
  {
    issue: 'A literal truck, crane, or drone appears in your LTX video',
    cause: 'Writing "camera trucks alongside" or "crane shot" is interpreted literally by the video transformer.',
    fix: 'Replace with plain motion words: "the camera drifts slowly sideways" or "camera rises gently".',
  },
  {
    issue: 'VAELoader error: ltx-2.5-video-vae-bf16.safetensors not in list',
    cause: 'Newer ComfyUI downloads ship ltx-2.5-video-vae-conv-bf16.safetensors instead.',
    fix: 'Query /object_info/VAELoader at runtime and auto-select whichever ltx-2.5-video-vae*.safetensors file is installed.',
  },
  {
    issue: 'Glitch or smear in the last half second of a clip',
    cause: 'Latent temporal boundary artifact at the tail of LTX-2.5 clips.',
    fix: 'Render 0.5–1.0 seconds longer than needed and always trim the final 0.5s during FFmpeg assembly.',
  },
];

export default function InteractiveLocalAiVideoGuide() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeFilm, setActiveFilm] = useState<SampleFilm>(SAMPLE_FILMS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(44);
  const [playbackRate, setPlaybackRate] = useState(1);

  const [activeStep, setActiveStep] = useState(1);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Interactive Master Prompt Generator state
  const [filmConcept, setFilmConcept] = useState('A fun GTA-style mini trailer set in Chennai streets with colorful locals and a surprise twist');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');
  const [gpuTier, setGpuTier] = useState<'8gb' | '12gb'>('8gb');
  const [shotCount, setShotCount] = useState<number>(12);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const cycleSpeed = () => {
    if (!videoRef.current) return;
    const speeds = [1, 1.25, 1.5, 2];
    const next = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
    videoRef.current.playbackRate = next;
    setPlaybackRate(next);
  };

  const selectFilm = (film: SampleFilm, autoPlay = true) => {
    setActiveFilm(film);
    setCurrentTime(0);
    setTimeout(() => {
      if (!videoRef.current) return;
      videoRef.current.load();
      videoRef.current.playbackRate = playbackRate;
      videoRef.current.muted = isMuted;
      if (autoPlay) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
    }, 30);
  };

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const masterPrompt = useMemo(() => {
    const res = aspectRatio === '9:16' ? '544x960 (or 768x1024) vertical 9:16' : '1536x864 widescreen 16:9';
    const vramNote =
      gpuTier === '8gb'
        ? '8 GB VRAM NVIDIA GPU (RTX 4060 class) + 32 GB RAM — use LTX-2.5 22B distilled int8 with euler sampler, img_compression=4, ff_strength=0.90, and ComfyUI dynamic VRAM offloading.'
        : '12+ GB VRAM NVIDIA GPU — use LTX-2.5 22B distilled int8 (or dev GGUF at 20 steps) with euler sampler and img_compression=4.';

    return `You are my AI Film Director running locally with ComfyUI, Krea-2 (images), LTX-2.5 (video + sound), Qwen-Image (fixes), ACE-Step 1.5 (music), and FFmpeg (edit).

PROJECT IDEA:
"${filmConcept}"

TARGET FORMAT:
- Aspect Ratio & Size: ${res}, 24 fps
- Shot Count: ${shotCount} shots (3–4 seconds each)
- Hardware Profile: ${vramNote}

WORKFLOW RULES (FOLLOW STRICTLY):
1. Story Plan: Write STORY.md with a 1-sentence logline, fixed verbatim character descriptions, and a numbered ${shotCount}-shot beat table.
2. Keyframes (kf.py): Write camera-first prompts (start with shot framing & lens). Always include "<character> appears only once" to prevent duplicate people. Render all frames with Krea-2 and tile them into STORYBOARD.png.
3. Visual QA: Inspect every frame before animating. Redraw any frame with extra limbs, melted hands, or random text (or fix with Qwen-Image).
4. Motion (motion.json): Write gentle, simple camera and subject motion. NEVER use the words "truck", "crane", or "drone" (LTX draws them literally). Render via ComfyUI API and auto-detect whichever ltx-2.5-video-vae*.safetensors file is installed.
5. Assembly (edit.py): Trim the last 0.5 seconds of every LTX clip to remove tail glitches, add an ACE-Step 1.5 music track, normalize audio to -14 LUFS / -1.5 dB TP, and export H.264 yuv420p MP4 with +faststart.

Start now with Step 1 (STORY.md) and ask for my approval before rendering keyframes.`;
  }, [filmConcept, aspectRatio, gpuTier, shotCount]);

  return (
    <div
      className="min-h-screen text-[#14161C] font-sans selection:bg-[#E0EAFF] selection:text-[#1D4ED8]"
      style={{
        backgroundColor: '#FAFAFD',
        backgroundImage: 'radial-gradient(#BCC4D0 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px',
      }}
    >
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b-2 border-[#14161C] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-tight text-neutral-800 hover:text-[#1D4ED8]"
            >
              <span>←</span>
              <span>NIRMAL.BIO</span>
            </Link>
            <span className="text-neutral-300">/</span>
            <Link href="/guides" className="text-xs font-mono text-neutral-600 hover:text-[#1D4ED8]">
              GUIDES
            </Link>
            <span className="text-neutral-300">/</span>
            <span className="hidden sm:inline text-xs font-mono font-bold text-[#1D4ED8]">
              LOCAL-AI-VIDEO
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyShareLink}
              className="flex items-center gap-1.5 rounded-full border-2 border-[#1D4ED8] bg-[#E0EAFF] px-3 py-1 text-xs font-mono font-bold text-[#1D4ED8] hover:bg-[#1D4ED8] hover:text-white transition-colors"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'COPIED' : 'SHARE'}</span>
            </button>
            <a
              href="#prompt-generator"
              className="flex items-center gap-1.5 rounded-full bg-[#1D4ED8] px-3.5 py-1.5 text-xs font-mono font-bold text-white shadow-[0_4px_14px_rgba(29,78,216,0.35)] hover:bg-[#1E40AF] transition-colors"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>GET PROMPT</span>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* HERO SECTION — White Dotted Figma-Canvas + Electric Blue Selection Box + Real Generated Sample Films */}
        <section id="hero-player" className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Copy & Film Switcher */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#1D4ED8] bg-[#E0EAFF] px-3.5 py-1 text-xs font-mono font-bold text-[#1D4ED8] uppercase tracking-wide">
              <span>FREE GUIDE · ZERO SUBSCRIPTIONS</span>
            </div>

            <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight text-[#14161C] leading-[1.15]">
              Make AI Films on{' '}
              <span className="relative inline-block border-[3px] border-[#1D4ED8] bg-[#E0EAFF] px-2.5 py-0.5 text-[#1D4ED8]">
                Your Own GPU
                <span className="absolute -top-2 -right-2 h-3.5 w-3.5 rounded-full border-[3px] border-[#1D4ED8] bg-white" />
                <span className="absolute -bottom-2 -left-2 h-3.5 w-3.5 rounded-full border-[3px] border-[#1D4ED8] bg-white" />
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#4E5666] leading-relaxed">
              Every film in the player was generated locally on one <strong>8 GB RTX 4060</strong> — zero Seedance credits, zero Higgsfield subscriptions. Just <strong>ComfyUI + LTX-2.5 + Krea-2 + Qwen-Image + ACE-Step 1.5 + FFmpeg</strong> directed by Claude Code.
            </p>

            {/* Quick Stat Pills (Bento Colors) */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="rounded-2xl bg-[#62C6F8] p-3 text-[#14161C]">
                <div className="text-[10px] font-mono font-bold uppercase opacity-80">GPU Tested</div>
                <div className="text-lg font-extrabold">8 GB VRAM</div>
              </div>
              <div className="rounded-2xl bg-[#FF7262] p-3 text-[#14161C]">
                <div className="text-[10px] font-mono font-bold uppercase opacity-80">System RAM</div>
                <div className="text-lg font-extrabold">32 GB</div>
              </div>
              <div className="rounded-2xl bg-[#4EC6A5] p-3 text-[#14161C]">
                <div className="text-[10px] font-mono font-bold uppercase opacity-80">Model Cost</div>
                <div className="text-lg font-extrabold">₹0 / Free</div>
              </div>
              <div className="rounded-2xl bg-[#4285F4] p-3 text-white">
                <div className="text-[10px] font-mono font-bold uppercase opacity-85">Speed</div>
                <div className="text-lg font-extrabold">~3 min/shot</div>
              </div>
            </div>

            {/* Interactive Real Sample Films Switcher */}
            <div className="mt-6 rounded-2xl border-2 border-[#14161C] bg-white p-4 shadow-[4px_4px_0px_0px_#14161C]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold uppercase text-[#1D4ED8]">
                  ▶ WATCH REAL FILMS MADE ON THIS 8 GB GPU
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  {activeFilm.aspect} · {activeFilm.durationLabel}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_FILMS.map((film) => {
                  const active = film.id === activeFilm.id;
                  return (
                    <button
                      key={film.id}
                      onClick={() => selectFilm(film, true)}
                      className={`rounded-full px-3 py-1.5 text-xs font-mono font-bold transition-all ${
                        active
                          ? 'bg-[#1D4ED8] text-white shadow-[0_2px_10px_rgba(29,78,216,0.35)]'
                          : 'border border-neutral-300 bg-neutral-50 text-neutral-700 hover:border-[#1D4ED8] hover:text-[#1D4ED8]'
                      }`}
                    >
                      {film.title}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-[#4E5666] leading-relaxed">
                <strong className="text-[#14161C]">{activeFilm.title}</strong> — {activeFilm.note}
              </p>
            </div>
          </div>

          {/* Right Sample Film Player inside Electric Blue Selection Frame */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full border-[4px] border-[#1D4ED8] bg-[#14161C] p-1 shadow-[0_12px_36px_rgba(29,78,216,0.18)]">
              {/* 4 Corner Handles */}
              <span className="pointer-events-none absolute -top-2.5 -left-2.5 h-4 w-4 rounded-full border-[3px] border-[#1D4ED8] bg-white z-20" />
              <span className="pointer-events-none absolute -top-2.5 -right-2.5 h-4 w-4 rounded-full border-[3px] border-[#1D4ED8] bg-white z-20" />
              <span className="pointer-events-none absolute -bottom-2.5 -left-2.5 h-4 w-4 rounded-full border-[3px] border-[#1D4ED8] bg-white z-20" />
              <span className="pointer-events-none absolute -bottom-2.5 -right-2.5 h-4 w-4 rounded-full border-[3px] border-[#1D4ED8] bg-white z-20" />
              {/* Top & Bottom Edge Pill Handles */}
              <span className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 h-3 w-14 rounded-full border-[3px] border-[#1D4ED8] bg-white z-20" />
              <span className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 h-3 w-14 rounded-full border-[3px] border-[#1D4ED8] bg-white z-20" />

              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                <video
                  key={activeFilm.id}
                  ref={videoRef}
                  src={activeFilm.video}
                  poster={activeFilm.poster}
                  playsInline
                  loop
                  muted={isMuted}
                  onClick={togglePlay}
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 30)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="h-full w-full object-contain cursor-pointer bg-black"
                />

                {/* Top-left film badge */}
                <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/75 px-3 py-1 text-[11px] font-mono font-bold text-white backdrop-blur-sm">
                  <Film className="h-3.5 w-3.5 text-[#62C6F8]" />
                  <span>{activeFilm.title}</span>
                  <span className="text-neutral-400">·</span>
                  <span className="text-[#62C6F8]">{activeFilm.aspect}</span>
                </div>

                {!isPlaying && (
                  <button
                    onClick={togglePlay}
                    aria-label={`Play ${activeFilm.title}`}
                    className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/15 transition-colors"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-[#1D4ED8]/95 text-white shadow-xl">
                      <Play className="h-7 w-7 fill-current ml-1" />
                    </div>
                  </button>
                )}

                {/* Bottom Controls Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-3 pt-8">
                  <div
                    className="mb-2 h-1.5 w-full overflow-hidden rounded-full bg-white/30 cursor-pointer"
                    onClick={(e) => {
                      if (!videoRef.current) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                      videoRef.current.currentTime = pct * duration;
                    }}
                  >
                    <div
                      className="h-full bg-[#62C6F8] transition-all"
                      style={{ width: `${(currentTime / Math.max(1, duration)) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-white text-xs font-mono">
                    <div className="flex items-center gap-2.5">
                      <button onClick={togglePlay} className="hover:text-[#62C6F8]" aria-label="Play or pause">
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                      <button onClick={toggleMute} className="hover:text-[#62C6F8]" aria-label="Mute or unmute">
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </button>
                      <button
                        onClick={() => {
                          if (!videoRef.current) return;
                          videoRef.current.currentTime = 0;
                        }}
                        className="hover:text-[#62C6F8]"
                        title="Restart film"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                      </button>
                      <span>
                        {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')} /{' '}
                        {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}
                      </span>
                    </div>
                    <button
                      onClick={cycleSpeed}
                      className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold hover:bg-white/30"
                    >
                      {playbackRate}x
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-3 text-center text-xs font-mono text-[#4E5666]">
              100% locally generated on RTX 4060 8 GB · Click any film pill to switch
            </p>
          </div>
        </section>

        {/* SECTION 1: ALL TOOLS & OFFICIAL LINKS (Pastel Bento Stack) */}
        <section id="tools" className="mt-16">
          <div className="mb-6">
            <span className="inline-block rounded-full border-2 border-[#1D4ED8] bg-[#E0EAFF] px-3 py-0.5 text-xs font-mono font-bold text-[#1D4ED8]">
              01 · ALL TOOLS &amp; DOWNLOAD LINKS
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#14161C]">
              The Complete Free Local AI Video Stack
            </h2>
            <p className="mt-1 text-sm text-[#4E5666]">
              Every model is free and open-weights. Only Claude Code uses a paid plan to orchestrate the scripts automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {TOOLS_STACK.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex flex-col justify-between rounded-2xl ${tool.colorClass} p-5 transition-transform hover:-translate-y-0.5 shadow-[3px_3px_0px_0px_#14161C] border-2 border-[#14161C]`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className={`text-xl font-extrabold ${tool.darkText ? 'text-[#14161C]' : 'text-white'}`}>
                      {tool.name}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-mono font-bold ${
                        tool.cost === 'FREE'
                          ? 'bg-white text-[#1D4ED8]'
                          : 'bg-[#14161C] text-white'
                      }`}
                    >
                      {tool.cost}
                    </span>
                  </div>
                  <p className={`mt-2 text-sm leading-relaxed ${tool.darkText ? 'text-[#1E2630]' : 'text-blue-50'}`}>
                    {tool.role}
                  </p>
                </div>

                <div className={`mt-4 flex items-center justify-between pt-3 border-t ${tool.darkText ? 'border-black/15' : 'border-white/20'}`}>
                  <span className={`text-[11px] font-mono ${tool.darkText ? 'text-black/75' : 'text-blue-100'}`}>
                    <FolderOpen className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
                    {tool.folderHint}
                  </span>
                  <span className={`inline-flex items-center gap-1 text-xs font-mono font-bold underline ${tool.darkText ? 'text-[#14161C]' : 'text-white'}`}>
                    {tool.docsLabel}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* SECTION 2: HARDWARE REQUIREMENTS (2x2 Bento Grid) */}
        <section id="specs" className="mt-16">
          <div className="mb-6">
            <span className="inline-block rounded-full border-2 border-[#1D4ED8] bg-[#E0EAFF] px-3 py-0.5 text-xs font-mono font-bold text-[#1D4ED8]">
              02 · TESTED HARDWARE
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#14161C]">
              What Your PC Actually Needs
            </h2>
            <p className="mt-1 text-sm text-[#4E5666]">
              Not vendor marketing minimums — the exact laptop specs all 5 films were rendered on.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl border-2 border-[#14161C] bg-[#62C6F8] p-5 shadow-[3px_3px_0px_0px_#14161C]">
              <Cpu className="h-6 w-6 text-[#14161C] mb-2" />
              <div className="text-xs font-mono font-bold uppercase">GPU</div>
              <div className="text-3xl font-extrabold mt-0.5">8 GB VRAM</div>
              <p className="mt-2 text-xs text-[#1E2630] leading-relaxed">
                NVIDIA RTX 4060 laptop GPU. CUDA / NVIDIA card required for int8 LTX-2.5.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-[#14161C] bg-[#FF7262] p-5 shadow-[3px_3px_0px_0px_#14161C]">
              <Layers className="h-6 w-6 text-[#14161C] mb-2" />
              <div className="text-xs font-mono font-bold uppercase">RAM</div>
              <div className="text-3xl font-extrabold mt-0.5">32 GB</div>
              <p className="mt-2 text-xs text-[#1E2630] leading-relaxed">
                The 22B model stages in system RAM. Close browser tabs while rendering — less RAM works but is ~10x slower.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-[#14161C] bg-[#4EC6A5] p-5 shadow-[3px_3px_0px_0px_#14161C]">
              <HardDrive className="h-6 w-6 text-[#14161C] mb-2" />
              <div className="text-xs font-mono font-bold uppercase">DISK</div>
              <div className="text-3xl font-extrabold mt-0.5">~80 GB</div>
              <p className="mt-2 text-xs text-[#1E2630] leading-relaxed">
                Free NVMe SSD space for LTX-2.5 transformer (~21 GB), Gemma text encoder (~15 GB), Krea-2, Qwen-Image, and VAEs.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-[#14161C] bg-[#4285F4] p-5 text-white shadow-[3px_3px_0px_0px_#14161C]">
              <Clock className="h-6 w-6 text-white mb-2" />
              <div className="text-xs font-mono font-bold uppercase opacity-90">RENDER TIME</div>
              <div className="text-3xl font-extrabold mt-0.5">~3 min</div>
              <p className="mt-2 text-xs text-blue-50 leading-relaxed">
                Per 3-second shot at 24 fps. A full 21-shot trailer renders cleanly in about 1 hour.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE 5-STEP PLAYBOOK */}
        <section id="steps" className="mt-16">
          <div className="mb-6">
            <span className="inline-block rounded-full border-2 border-[#1D4ED8] bg-[#E0EAFF] px-3 py-0.5 text-xs font-mono font-bold text-[#1D4ED8]">
              03 · STEP-BY-STEP PLAYBOOK
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#14161C]">
              From One Idea to a Finished Film in 5 Steps
            </h2>
          </div>

          {/* Step Tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {PLAYBOOK_STEPS.map((st) => (
              <button
                key={st.num}
                onClick={() => setActiveStep(st.num)}
                className={`rounded-full border-2 px-4 py-2 text-xs font-mono font-bold transition-all ${
                  activeStep === st.num
                    ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white shadow-[0_4px_12px_rgba(29,78,216,0.3)]'
                    : 'border-[#14161C] bg-white text-[#14161C] hover:bg-[#E0EAFF] hover:text-[#1D4ED8]'
                }`}
              >
                STEP {st.num}
              </button>
            ))}
          </div>

          {PLAYBOOK_STEPS.filter((st) => st.num === activeStep).map((st) => (
            <div
              key={st.num}
              className="rounded-2xl border-2 border-[#14161C] bg-white p-6 shadow-[4px_4px_0px_0px_#14161C]"
            >
              <div className="text-xs font-mono font-bold text-[#1D4ED8] uppercase">{st.tag}</div>
              <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-[#14161C]">{st.title}</h3>
              <p className="mt-2 text-sm sm:text-base text-[#4E5666] leading-relaxed">{st.summary}</p>

              <ul className="mt-5 space-y-2.5">
                {st.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#14161C]">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#1D4ED8] mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Dark Code Block inside Blue Frame */}
              <div className="mt-6 overflow-hidden rounded-xl border-2 border-[#1D4ED8] bg-[#16181D] text-neutral-100">
                <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                    <span className="ml-2 text-xs font-mono text-neutral-400">{st.codeTitle}</span>
                  </div>
                  <button
                    onClick={() => copyText(`step-${st.num}`, st.code)}
                    className="flex items-center gap-1 rounded-md border border-neutral-700 bg-neutral-800 px-2.5 py-1 text-[11px] font-mono text-neutral-200 hover:bg-neutral-700"
                  >
                    {copiedKey === `step-${st.num}` ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto p-4 text-xs sm:text-sm font-mono text-emerald-300 leading-relaxed">
                  {st.code}
                </pre>
              </div>
            </div>
          ))}
        </section>

        {/* SECTION 4: INTERACTIVE MASTER PROMPT GENERATOR */}
        <section id="prompt-generator" className="mt-16">
          <div className="mb-6">
            <span className="inline-block rounded-full border-2 border-[#1D4ED8] bg-[#E0EAFF] px-3 py-0.5 text-xs font-mono font-bold text-[#1D4ED8]">
              04 · COPY-PASTE DIRECTOR PROMPT
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#14161C]">
              Generate Your Claude Code Film Prompt
            </h2>
            <p className="mt-1 text-sm text-[#4E5666]">
              Customize your idea, format, and GPU below — then paste directly into Claude Code inside your ComfyUI project folder.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-[#14161C] bg-white p-6 shadow-[4px_4px_0px_0px_#14161C]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-5">
              <div className="sm:col-span-3">
                <label className="block text-xs font-mono font-bold uppercase text-neutral-600 mb-1.5">
                  Your Film / Reel Concept
                </label>
                <input
                  type="text"
                  value={filmConcept}
                  onChange={(e) => setFilmConcept(e.target.value)}
                  className="w-full rounded-xl border-2 border-[#14161C] bg-[#FAFAFD] px-3.5 py-2.5 text-sm font-medium text-[#14161C] focus:border-[#1D4ED8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-600 mb-1.5">
                  Aspect Ratio
                </label>
                <div className="flex gap-2">
                  {(['9:16', '16:9'] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => setAspectRatio(r)}
                      className={`flex-1 rounded-xl border-2 py-2 text-xs font-mono font-bold ${
                        aspectRatio === r
                          ? 'border-[#1D4ED8] bg-[#E0EAFF] text-[#1D4ED8]'
                          : 'border-neutral-300 bg-white text-neutral-700'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-600 mb-1.5">
                  GPU VRAM
                </label>
                <div className="flex gap-2">
                  {[
                    { id: '8gb', label: '8 GB (4060)' },
                    { id: '12gb', label: '12+ GB' },
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setGpuTier(g.id as '8gb' | '12gb')}
                      className={`flex-1 rounded-xl border-2 py-2 text-xs font-mono font-bold ${
                        gpuTier === g.id
                          ? 'border-[#1D4ED8] bg-[#E0EAFF] text-[#1D4ED8]'
                          : 'border-neutral-300 bg-white text-neutral-700'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase text-neutral-600 mb-1.5">
                  Shot Count: {shotCount}
                </label>
                <input
                  type="range"
                  min={6}
                  max={24}
                  step={3}
                  value={shotCount}
                  onChange={(e) => setShotCount(Number(e.target.value))}
                  className="w-full accent-[#1D4ED8] mt-2"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border-2 border-[#1D4ED8] bg-[#16181D]">
              <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-2.5">
                <span className="text-xs font-mono text-neutral-400">master_director_prompt.txt</span>
                <button
                  onClick={() => copyText('master-prompt', masterPrompt)}
                  className="flex items-center gap-1.5 rounded-full bg-[#1D4ED8] px-3.5 py-1 text-xs font-mono font-bold text-white hover:bg-[#1E40AF]"
                >
                  {copiedKey === 'master-prompt' ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>COPIED PROMPT!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>COPY MASTER PROMPT</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="max-h-80 overflow-y-auto whitespace-pre-wrap p-4 text-xs sm:text-sm font-mono text-neutral-200 leading-relaxed">
                {masterPrompt}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 5: GENERATED SAMPLE FILMS SHOWCASE */}
        <section id="samples" className="mt-16">
          <div className="mb-6">
            <span className="inline-block rounded-full border-2 border-[#1D4ED8] bg-[#E0EAFF] px-3 py-0.5 text-xs font-mono font-bold text-[#1D4ED8]">
              05 · GENERATED SAMPLE FILMS
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#14161C]">
              5 Real Films Made on One 8 GB Gaming GPU
            </h2>
            <p className="mt-1 text-sm text-[#4E5666]">
              Click any film below to load and play it directly in the player above with audio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_FILMS.map((film) => {
              const isCurrent = film.id === activeFilm.id;
              return (
                <button
                  key={film.id}
                  onClick={() => {
                    selectFilm(film, true);
                    document.getElementById('hero-player')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group overflow-hidden rounded-2xl border-2 text-left transition-transform hover:-translate-y-0.5 ${
                    isCurrent
                      ? 'border-[#1D4ED8] bg-[#E0EAFF] shadow-[4px_4px_0px_0px_#1D4ED8]'
                      : 'border-[#14161C] bg-white shadow-[3px_3px_0px_0px_#14161C]'
                  }`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-neutral-950">
                    <Image
                      src={film.poster}
                      alt={film.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 320px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/15 transition-colors">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#1D4ED8]/90 text-white shadow-lg">
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded-full bg-black/80 px-2.5 py-0.5 text-[10px] font-mono font-bold text-white">
                      {film.durationLabel} · {film.aspect}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-extrabold text-[#14161C]">{film.title}</h3>
                      {isCurrent && (
                        <span className="rounded-full bg-[#1D4ED8] px-2 py-0.5 text-[10px] font-mono font-bold text-white">
                          PLAYING
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-[11px] font-mono font-bold text-[#1D4ED8]">{film.tag}</div>
                    <p className="mt-1.5 text-xs text-[#4E5666] leading-relaxed">{film.note}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION 6: TROUBLESHOOTING MATRIX */}
        <section id="fixes" className="mt-16">
          <div className="mb-6">
            <span className="inline-block rounded-full border-2 border-[#1D4ED8] bg-[#E0EAFF] px-3 py-0.5 text-xs font-mono font-bold text-[#1D4ED8]">
              06 · REAL FIXES FROM PRODUCTION
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#14161C]">
              Common Pitfalls &amp; Exact Fixes
            </h2>
          </div>

          <div className="space-y-3">
            {TROUBLESHOOTING.map((row, i) => (
              <div
                key={i}
                className="rounded-2xl border-2 border-[#14161C] bg-white p-4 sm:p-5 shadow-[3px_3px_0px_0px_#14161C]"
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-[#FF7262] mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-[#14161C]">{row.issue}</h3>
                    <p className="mt-1 text-xs sm:text-sm text-[#4E5666]">
                      <strong className="text-[#14161C]">Why:</strong> {row.cause}
                    </p>
                    <p className="mt-1.5 rounded-lg bg-[#E0EAFF] px-3 py-2 text-xs sm:text-sm font-medium text-[#1D4ED8]">
                      <strong>Fix:</strong> {row.fix}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-16 border-t-2 border-[#14161C] pt-8 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-sm font-bold text-[#14161C]">Built by Nirmal · Zenthra Studios</div>
            <div className="mt-1 flex items-center justify-center sm:justify-start gap-3 text-xs font-mono text-[#4E5666]">
              <Link href="/" className="underline hover:text-[#1D4ED8]">
                Back to Bio
              </Link>
              <span>·</span>
              <Link href="/guides" className="underline hover:text-[#1D4ED8]">
                All Free Guides
              </Link>
            </div>
          </div>

          <a
            href="https://instagram.com/learnwithnirmal"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#1D4ED8] px-6 py-2.5 text-sm font-mono font-bold text-white shadow-[0_6px_20px_rgba(29,78,216,0.4)] hover:bg-[#1E40AF] transition-colors"
          >
            @learnwithnirmal
          </a>
        </footer>
      </main>
    </div>
  );
}
