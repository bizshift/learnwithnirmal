'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
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
  ShieldAlert,
  Zap,
  Lightbulb,
  Fan,
  Sparkles,
  Cpu,
  Layers,
  Wrench,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Maximize2,
  X,
  RotateCcw,
  Sliders,
  Terminal,
  Radio,
  Share2,
  Info,
  HelpCircle,
  Smartphone,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

interface ChannelState {
  id: string;
  name: string;
  gpio: number;
  relayInput: string;
  loadType: 'light' | 'fan' | 'accent';
  powerWatts: number;
  description: string;
  strappingPinWarning?: boolean;
}

const CHANNELS: ChannelState[] = [
  {
    id: 'tube',
    name: 'Tube Light',
    gpio: 0,
    relayInput: 'IN1',
    loadType: 'light',
    powerWatts: 20,
    description: 'Main room illumination. Switched live wire connects to Relay 1 NO.',
  },
  {
    id: 'curtain',
    name: 'Curtain Light',
    gpio: 1,
    relayInput: 'IN2',
    loadType: 'accent',
    powerWatts: 12,
    description: 'Warm mood accent lighting along window curtains.',
  },
  {
    id: 'fan',
    name: 'Ceiling Fan',
    gpio: 2,
    relayInput: 'IN3',
    loadType: 'fan',
    powerWatts: 65,
    description: 'Inductive motor load. NOTE: GPIO 2 is an ESP32-C3 boot strapping pin!',
    strappingPinWarning: true,
  },
  {
    id: 'bathroom',
    name: 'Bathroom Light',
    gpio: 3,
    relayInput: 'IN4',
    loadType: 'light',
    powerWatts: 15,
    description: 'En-suite bath lighting channel. Switched live wire connects to Relay 4 NO.',
  },
];

interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: 'Hardware' | 'Wiring' | 'Enclosure' | 'Software';
  caption: string;
  highlight: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'hero',
    src: '/assets/smart-room/smart-room-hero.webp',
    title: 'Smart Room Walkthrough',
    category: 'Software',
    caption: 'Controlling tube light, curtain light, ceiling fan, and bathroom light directly from iPhone.',
    highlight: '₹700 Total Cost',
  },
  {
    id: 'esp32',
    src: '/assets/smart-room/esp32-c3-installed.webp',
    title: 'ESP32-C3 SuperMini Controller',
    category: 'Hardware',
    caption: 'Ultra-compact RISC-V 160MHz controller with USB-C, Wi-Fi 4, and BLE 5.',
    highlight: 'Logic: 3.3V',
  },
  {
    id: 'relay',
    src: '/assets/smart-room/four-channel-relay-installed.webp',
    title: '4-Channel 5V Relay Module',
    category: 'Hardware',
    caption: 'Optocoupler isolated relay board with Songle 10A 250VAC contacts.',
    highlight: 'Coil: 5V DC',
  },
  {
    id: 'gpio-map',
    src: '/assets/smart-room/gpio-channel-map.webp',
    title: 'GPIO & Bench Test Wiring Schema',
    category: 'Wiring',
    caption: 'Wiring layout connecting ESP32-C3 GPIO 0, 1, 2, 3 to Relay inputs IN1..IN4.',
    highlight: 'USB 5V Test',
  },
  {
    id: 'mains-concept',
    src: '/assets/smart-room/live-neutral-diagram.webp',
    title: 'Live vs Neutral Switching Diagram',
    category: 'Wiring',
    caption: 'Crucial electrical concept: Relay COM & NO only break the LIVE phase line. Neutral returns directly.',
    highlight: 'Mains Safety',
  },
  {
    id: 'wiring-build',
    src: '/assets/smart-room/wiring-overview.webp',
    title: 'Switchboard Assembly Wiring',
    category: 'Wiring',
    caption: 'Tucking AC wiring and DC control cables behind the wall switchboard.',
    highlight: 'Safe Separation',
  },
  {
    id: 'relay-case',
    src: '/assets/smart-room/relay-and-enclosure.webp',
    title: 'Enclosure Fit Check',
    category: 'Enclosure',
    caption: 'Custom compact housing for the 4-channel relay to prevent accidental touch.',
    highlight: 'Touch Protection',
  },
  {
    id: 'enclosure-closed',
    src: '/assets/smart-room/closed-enclosure.webp',
    title: 'Finished Closed Enclosure',
    category: 'Enclosure',
    caption: 'Neatly mounted beside the room switchboard with insulated cable pass-throughs.',
    highlight: 'Clean Aesthetic',
  },
  {
    id: 'switchboard-done',
    src: '/assets/smart-room/installed-switchboard.webp',
    title: 'Final Installed Switchboard',
    category: 'Enclosure',
    caption: 'Operating in parallel with existing manual switch plates without altering wall masonry.',
    highlight: 'Dual Control',
  },
  {
    id: 'apple-home',
    src: '/assets/smart-room/apple-home-controls.webp',
    title: 'Apple Home & Siri Integration',
    category: 'Software',
    caption: 'Four dedicated accessory tiles in iOS Home app with Siri voice command support.',
    highlight: 'Siri Compatible',
  },
];

interface VideoChapter {
  seconds: number;
  label: string;
  description: string;
}

const VIDEO_CHAPTERS: VideoChapter[] = [
  { seconds: 0, label: '0:00 · ₹700 Hook', description: 'Room overview & proof of 4 smart switches under ₹700' },
  { seconds: 8, label: '0:08 · Hardware Stack', description: 'ESP32-C3 SuperMini + 4-channel optocoupled relay' },
  { seconds: 17, label: '0:17 · USB Bench Test', description: 'Flashing firmware and validating GPIO 0, 1, 2, 3 pinouts' },
  { seconds: 26, label: '0:26 · Live & Neutral', description: 'Breaking Live line via COM & NO while Neutral stays intact' },
  { seconds: 34, label: '0:34 · Enclosure Build', description: 'Mounting relay into compact insulated enclosure' },
  { seconds: 42, label: '0:42 · Siri Voice Demo', description: 'Controlling fan and lights via Apple Home and Siri' },
];

export default function InteractiveSmartRoomGuide() {
  // Simulated Relay State
  const [channelStates, setChannelStates] = useState<Record<string, boolean>>({
    tube: false,
    curtain: false,
    fan: false,
    bathroom: false,
  });

  const [polarity, setPolarity] = useState<'active-low' | 'active-high'>('active-low');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);
  const [frameworkChoice, setFrameworkChoice] = useState<'esphome' | 'arduino' | 'matter'>('esphome');

  // Video State
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(49.7);
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  // Synthesize relay click sound with Web Audio API (delightful realistic feedback!)
  const playRelayClick = (turningOn: boolean) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = turningOn ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(turningOn ? 880 : 640, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // AudioContext unavailable or blocked by autoplay policy
    }
  };

  const toggleChannel = (id: string) => {
    setChannelStates((prev) => {
      const nextVal = !prev[id];
      playRelayClick(nextVal);
      return { ...prev, [id]: nextVal };
    });
  };

  const setAllChannels = (val: boolean) => {
    playRelayClick(val);
    setChannelStates({
      tube: val,
      curtain: val,
      fan: val,
      bathroom: val,
    });
  };

  // Video helpers
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
    const nextSpeed = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
    videoRef.current.playbackRate = nextSpeed;
    setPlaybackRate(nextSpeed);
  };

  const jumpToChapter = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    setCurrentTime(seconds);
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Total current power drawn simulated
  const currentTotalWatts = useMemo(() => {
    return CHANNELS.reduce((acc, ch) => {
      return acc + (channelStates[ch.id] ? ch.powerWatts : 0);
    }, 0);
  }, [channelStates]);

  const activeChannelCount = useMemo(() => {
    return Object.values(channelStates).filter(Boolean).length;
  }, [channelStates]);

  // Master Antigravity prompt generator
  const generatedPrompt = useMemo(() => {
    const polarityStr =
      polarity === 'active-low'
        ? 'Active-LOW (GPIO LOW 0V energizes relay coil, GPIO HIGH 3.3V de-energizes relay coil)'
        : 'Active-HIGH (GPIO HIGH 3.3V energizes relay coil, GPIO LOW 0V de-energizes relay coil)';

    let frameworkNote = '';
    if (frameworkChoice === 'esphome') {
      frameworkNote = `Framework: ESPHome for ESP32-C3 with Home Assistant & Apple HomeKit integration. Provide clean YAML configuration with safe boot defaults (restore_mode: ALWAYS_OFF).`;
    } else if (frameworkChoice === 'matter') {
      frameworkNote = `Framework: Matter / Apple HomeKit Native bridge for ESP32-C3. Provide 4 OnOff accessory endpoints exposed to Apple Home with mDNS commissioning.`;
    } else {
      frameworkNote = `Framework: Arduino C++ / ESP-IDF serial test firmware. Provide non-blocking serial CLI to toggle channels, query states, and power-cycle test.`;
    }

    return `Build a USB bench-test project for my ESP32-C3 SuperMini and a four-channel relay module. All tests run with household AC disconnected and the relay contacts connected only to suitable low-voltage test equipment or loads.

${frameworkNote}
Relay Polarity: ${polarityStr}

First ask me to confirm my exact board revision, development framework, relay module model, coil supply, input polarity, and input compatibility with 3.3 V GPIO. Leave unconfirmed choices explicit. Flag GPIO2 as a strapping pin and explain what to verify about the module’s input circuit before using it.

Use the following mapping once I confirm it:
- GPIO 0 to IN1 for Tube Light
- GPIO 1 to IN2 for Curtain Light
- GPIO 2 to IN3 for Ceiling Fan (Note: Boot strapping pin)
- GPIO 3 to IN4 for Bathroom Light

Make relay polarity configurable. Keep each output off at startup, after a reset, and after a failed command. Explain which startup guarantees depend on the hardware before firmware initializes. Build a serial test that lets me toggle one channel, read each channel state, and turn everything off. Include the build and flash commands and a bench verification checklist for each output, power cycling, and reboot. Keep Wi-Fi setup and app integration in a later stage. Once the bench tests pass, ask which compatible app or bridge I’m using before adding that integration.`;
  }, [polarity, frameworkChoice]);

  const copyPromptToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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
            <span className="hidden sm:inline text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              SMART-ROOM-₹700
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyShareLink}
              className="flex items-center gap-1.5 border border-neutral-900 bg-white px-2.5 py-1 text-xs font-mono text-neutral-800 shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-neutral-200 dark:bg-[#181818] dark:text-neutral-200 dark:shadow-[2px_2px_0px_0px_#fff]"
              title="Share this build guide"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'LINK COPIED' : 'SHARE'}</span>
            </button>

            <a
              href="#prompt-generator"
              className="flex items-center gap-1.5 border border-neutral-900 bg-[#ffcf32] px-3 py-1 text-xs font-mono font-bold text-neutral-950 shadow-[2px_2px_0px_0px_#000] hover:bg-[#ffe066] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none dark:border-neutral-100 dark:shadow-[2px_2px_0px_0px_#fff]"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>GET PROMPT</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Hero Section */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="border border-neutral-900 bg-emerald-500/10 px-2 py-0.5 text-xs font-mono font-bold text-emerald-700 dark:border-emerald-400 dark:bg-emerald-950/40 dark:text-emerald-300">
              [ HARDWARE BUILD & FIRMWARE BLUEPRINT ]
            </span>
            <span className="border border-neutral-900 bg-amber-500/10 px-2 py-0.5 text-xs font-mono font-bold text-amber-700 dark:border-amber-400 dark:bg-amber-950/40 dark:text-amber-300">
              ₹700 TOTAL BUDGET
            </span>
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              50-SEC REEL · ANTIGRAVITY FIRMWARE · APPLE HOME & SIRI
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-4 leading-tight">
            I Made My Room Smart for About ₹700 with an ESP32-C3
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 max-w-3xl leading-relaxed mb-6">
            I wanted to control my <strong className="text-neutral-950 dark:text-white">tube light</strong>,{' '}
            <strong className="text-neutral-950 dark:text-white">curtain light</strong>,{' '}
            <strong className="text-neutral-950 dark:text-white">ceiling fan</strong>, and{' '}
            <strong className="text-neutral-950 dark:text-white">bathroom light</strong> from my phone or with Siri.
            Using an ESP32-C3 SuperMini and an optocoupled 4-channel relay, the entire core build cost me ~₹700. Here is
            the complete wiring plan, bench firmware prompt, live/neutral safety diagram, and installation walkthrough.
          </p>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <div className="border border-neutral-900 bg-neutral-50 p-3 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#181818] dark:shadow-[2px_2px_0px_0px_#fff]">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">TOTAL COST</div>
              <div className="text-2xl font-extrabold text-neutral-950 dark:text-white">~₹700</div>
              <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">vs ₹3,200 commercial</div>
            </div>

            <div className="border border-neutral-900 bg-neutral-50 p-3 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#181818] dark:shadow-[2px_2px_0px_0px_#fff]">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">MICROCONTROLLER</div>
              <div className="text-xl font-extrabold text-neutral-950 dark:text-white">ESP32-C3</div>
              <div className="text-[11px] font-mono text-neutral-500">SuperMini (RISC-V)</div>
            </div>

            <div className="border border-neutral-900 bg-neutral-50 p-3 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#181818] dark:shadow-[2px_2px_0px_0px_#fff]">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">LOAD CHANNELS</div>
              <div className="text-xl font-extrabold text-neutral-950 dark:text-white">4 Devices</div>
              <div className="text-[11px] font-mono text-neutral-500">3 Lights + 1 Fan</div>
            </div>

            <div className="border border-neutral-900 bg-neutral-50 p-3 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#181818] dark:shadow-[2px_2px_0px_0px_#fff]">
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">CONTROL ECOSYSTEM</div>
              <div className="text-xl font-extrabold text-neutral-950 dark:text-white">Apple Home</div>
              <div className="text-[11px] font-mono text-neutral-500">Siri + Local Wi-Fi</div>
            </div>
          </div>
        </div>

        {/* Electrical Safety Banner (Mandatory Precaution) */}
        <div className="mb-10 border-2 border-amber-600 bg-amber-50 p-5 shadow-[4px_4px_0px_0px_#d97706] dark:border-amber-400 dark:bg-amber-950/30 dark:shadow-[4px_4px_0px_0px_#f59e0b]">
          <div className="flex items-start gap-3">
            <ShieldAlert className="h-6 w-6 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-base font-bold font-mono text-amber-950 dark:text-amber-200 uppercase tracking-wide">
                Mains Voltage Safety Precaution
              </h3>
              <p className="mt-1 text-sm text-amber-900 dark:text-amber-300 leading-relaxed">
                <strong>Keep household AC disconnected during the bench build.</strong> Mains 230V electricity is
                lethal and can cause fatal electric shock or fire hazards. Do all initial programming, GPIO testing, and
                verification exclusively with low-voltage 5V USB power. A qualified licensed electrician should inspect,
                isolate the distribution board, select overcurrent protection, and complete final mains installation. An
                app showing “Off” is only a software control state, not an electrical isolation guarantee.
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs font-mono font-semibold">
                <a
                  href="https://www.hse.gov.uk/pubns/priced/hsg85.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-amber-800 underline hover:text-black dark:text-amber-300 dark:hover:text-white"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>HSE Electrical Safe Working Practices (HSG85)</span>
                </a>
                <a
                  href="https://cea.nic.in/wp-content/uploads/notification/2023/06/pdf_100_183_English.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-amber-800 underline hover:text-black dark:text-amber-300 dark:hover:text-white"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Central Electricity Authority (CEA) Regulations</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: Interactive Relay Twin & Switch Simulator */}
        <section className="mb-12 border-2 border-neutral-900 bg-white p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block h-2.5 w-2.5 bg-emerald-500 animate-pulse" />
                <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-neutral-950 dark:text-white">
                  INTERACTIVE RELAY SIMULATOR
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Click each switch to test the 4 channels, observe relay optocoupler logic, and test simulated load draw.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAllChannels(true)}
                className="border border-neutral-900 bg-neutral-100 px-2.5 py-1 text-xs font-mono font-bold hover:bg-neutral-200 dark:border-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                ALL ON
              </button>
              <button
                onClick={() => setAllChannels(false)}
                className="border border-neutral-900 bg-neutral-100 px-2.5 py-1 text-xs font-mono font-bold hover:bg-neutral-200 dark:border-neutral-400 dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                ALL OFF
              </button>
              <button
                onClick={() =>
                  setPolarity((p) => (p === 'active-low' ? 'active-high' : 'active-low'))
                }
                className="border border-neutral-900 bg-[#ffcf32] px-2.5 py-1 text-xs font-mono font-bold text-black hover:bg-[#ffe066]"
                title="Toggle Active-LOW vs Active-HIGH relay trigger polarity"
              >
                {polarity === 'active-low' ? 'ACTIVE-LOW (0V)' : 'ACTIVE-HIGH (3.3V)'}
              </button>
            </div>
          </div>

          {/* 4 Interactive Channel Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {CHANNELS.map((ch) => {
              const isOn = channelStates[ch.id];
              const pinVoltage =
                polarity === 'active-low' ? (isOn ? '0.0 V (LOW)' : '3.3 V (HIGH)') : isOn ? '3.3 V (HIGH)' : '0.0 V (LOW)';

              return (
                <div
                  key={ch.id}
                  onClick={() => toggleChannel(ch.id)}
                  className={`group relative cursor-pointer border-2 transition-all p-4 select-none ${
                    isOn
                      ? 'border-neutral-900 bg-amber-500/10 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-100 dark:bg-amber-400/10 dark:shadow-[4px_4px_0px_0px_#fff]'
                      : 'border-neutral-300 bg-neutral-50 shadow-[2px_2px_0px_0px_#ccc] opacity-80 hover:opacity-100 dark:border-neutral-800 dark:bg-[#1a1a1a] dark:shadow-none'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400">
                      CH{ch.relayInput.replace('IN', '')} · GPIO {ch.gpio}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 border px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                        isOn
                          ? 'border-emerald-600 bg-emerald-500 text-white'
                          : 'border-neutral-400 bg-neutral-200 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400'
                      }`}
                    >
                      {isOn ? 'CLOSED (ON)' : 'OPEN (OFF)'}
                    </span>
                  </div>

                  {/* Channel Icon & Title */}
                  <div className="flex items-center gap-3 my-2">
                    <div
                      className={`flex h-12 w-12 items-center justify-center border-2 border-neutral-900 transition-transform ${
                        isOn
                          ? 'bg-[#ffcf32] text-black shadow-[2px_2px_0px_0px_#000]'
                          : 'bg-white text-neutral-400 dark:bg-neutral-800 dark:border-neutral-700'
                      }`}
                    >
                      {ch.loadType === 'fan' ? (
                        <Fan
                          className={`h-6 w-6 transition-all ${
                            isOn ? 'animate-spin text-black' : ''
                          }`}
                          style={{ animationDuration: '0.8s' }}
                        />
                      ) : ch.loadType === 'accent' ? (
                        <Sparkles className="h-6 w-6" />
                      ) : (
                        <Lightbulb className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-base text-neutral-950 dark:text-white leading-tight">
                        {ch.name}
                      </div>
                      <div className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
                        {ch.powerWatts}W · {ch.relayInput}
                      </div>
                    </div>
                  </div>

                  {/* Relay Pinout Status Details */}
                  <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[11px] font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Pin State:</span>
                      <span className={`font-bold ${isOn ? 'text-emerald-600 dark:text-emerald-400' : 'text-neutral-600'}`}>
                        {pinVoltage}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Terminal:</span>
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {isOn ? 'COM ↔ NO (Closed)' : 'COM / NO (Isolated)'}
                      </span>
                    </div>
                  </div>

                  {/* Strapping Pin Notice */}
                  {ch.strappingPinWarning && (
                    <div className="mt-2.5 border border-amber-600 bg-amber-500/10 px-2 py-1 text-[10px] font-mono font-bold text-amber-800 dark:text-amber-300">
                      ⚠️ STRAPPING PIN (Must stay HIGH at boot)
                    </div>
                  )}

                  {/* Big Click Me Cue on hover */}
                  <div className="mt-3 text-center text-[10px] font-mono font-semibold text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white">
                    [ CLICK TO TOGGLE ]
                  </div>
                </div>
              );
            })}
          </div>

          {/* Telemetry Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 border border-neutral-900 bg-neutral-900 p-3 text-white dark:border-neutral-100">
            <div className="flex items-center gap-4 text-xs font-mono">
              <div>
                <span className="text-neutral-400">ACTIVE CHANNELS: </span>
                <span className="font-bold text-[#ffcf32]">{activeChannelCount} / 4</span>
              </div>
              <div>
                <span className="text-neutral-400">SIMULATED LOAD: </span>
                <span className="font-bold text-emerald-400">{currentTotalWatts} Watts</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-neutral-400">COIL SUPPLY: </span>
                <span className="font-bold text-white">5V DC @ {activeChannelCount * 70} mA</span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-neutral-400">
              Trigger mode:{' '}
              <span className="text-white font-bold uppercase">{polarity}</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: Embedded 50-Second Vertical Reel */}
        <section className="mb-12 border-2 border-neutral-900 bg-neutral-50 p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Video Player */}
            <div className="w-full md:w-[320px] shrink-0 mx-auto">
              <div className="relative aspect-[9/16] w-full max-w-[320px] mx-auto overflow-hidden border-2 border-neutral-900 bg-black shadow-[4px_4px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[4px_4px_0px_0px_#fff]">
                <video
                  ref={videoRef}
                  src="/assets/smart-room/smart-room-reel.mp4"
                  poster="/assets/smart-room/reel-cover.webp"
                  playsInline
                  muted={isMuted}
                  loop
                  onTimeUpdate={() => {
                    if (videoRef.current) {
                      setCurrentTime(videoRef.current.currentTime);
                      setDuration(videoRef.current.duration || 49.7);
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
                  aria-label={isPlaying ? 'Pause Reel' : 'Play Reel'}
                >
                  {!isPlaying && (
                    <div className="flex h-16 w-16 items-center justify-center border-2 border-black bg-[#ffcf32] text-black shadow-[3px_3px_0px_0px_#000]">
                      <Play className="h-8 w-8 ml-1 fill-black" />
                    </div>
                  )}
                </button>

                {/* Mini Transport HUD */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-6 flex items-center justify-between text-white font-mono text-xs">
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
                    {playbackRate}x
                  </button>
                </div>
              </div>
            </div>

            {/* Video Chapters & Context */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mb-2">
                <span className="border border-neutral-900 bg-neutral-200 px-2 py-0.5 text-xs font-mono font-bold dark:border-neutral-700 dark:bg-neutral-800">
                  ORIGINAL REEL BREAKDOWN
                </span>
                <span className="text-xs font-mono text-neutral-500">49.7 SECONDS · RESIZED FOR WEB</span>
              </div>

              <h3 className="text-2xl font-bold font-mono text-neutral-950 dark:text-white mb-3">
                Watch the 50-Second Build Reel
              </h3>

              <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-5">
                Jump directly to any phase of the build. In 50 seconds, this reel explains the ₹700 budget, how the
                ESP32-C3 sends 3.3V logic to the relay, how the live line is safely broken through the normally-open (NO)
                terminal, and how Apple Home controls it via Siri.
              </p>

              {/* Chapter Buttons */}
              <div className="space-y-2">
                {VIDEO_CHAPTERS.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => jumpToChapter(ch.seconds)}
                    className="w-full flex items-center justify-between text-left p-2.5 border border-neutral-900 bg-white hover:bg-[#ffcf32]/20 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#1a1a1a] dark:hover:bg-neutral-800 dark:shadow-[2px_2px_0px_0px_#444] transition-colors"
                  >
                    <div>
                      <div className="font-mono font-bold text-xs text-neutral-900 dark:text-neutral-100">
                        {ch.label}
                      </div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                        {ch.description}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-neutral-400 shrink-0" />
                  </button>
                ))}
              </div>

              {/* Direct Link */}
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="/assets/smart-room/smart-room-reel.mp4"
                  download="nirmal-smart-room-reel.mp4"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-800 underline hover:text-black dark:text-neutral-200 dark:hover:text-white"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download MP4 Reel (6.4 MB)</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Bill of Materials & Budget Breakdown (~₹700) */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="border border-neutral-900 bg-neutral-200 px-2 py-0.5 text-xs font-mono font-bold dark:border-neutral-700 dark:bg-neutral-800">
              BILL OF MATERIALS
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              HARDWARE COST: ~₹700 TOTAL
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-neutral-950 dark:text-white mb-4">
            Component Cost & Hardware Spec Sheet
          </h2>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
            The parts in my build cost me about <strong>₹700</strong>. Treat that as what I spent on my specific setup.
            Budget separately for your custom enclosure, protective fuses, and certified electrician labor.
          </p>

          <div className="overflow-x-auto border-2 border-neutral-900 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:shadow-[4px_4px_0px_0px_#fff] mb-6">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b-2 border-neutral-900 bg-neutral-100 dark:border-neutral-200 dark:bg-neutral-800 text-neutral-950 dark:text-white uppercase">
                <tr>
                  <th className="p-3">Component</th>
                  <th className="p-3">Verified Spec</th>
                  <th className="p-3">What to Check Before Buying</th>
                  <th className="p-3 text-right">Approx Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-[#161616]">
                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="p-3 font-bold text-neutral-900 dark:text-neutral-100">
                    ESP32-C3 SuperMini
                  </td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">
                    Single-core RISC-V 160MHz, 4MB Flash, USB-C, Wi-Fi 4 + BLE 5
                  </td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">
                    Confirm GPIO numbering matches board silkscreen; verify 3.3V logic level.
                  </td>
                  <td className="p-3 text-right font-bold text-neutral-950 dark:text-white">
                    ₹250
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="p-3 font-bold text-neutral-900 dark:text-neutral-100">
                    4-Channel 5V Relay Board
                  </td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">
                    Optocoupler isolated, 10A 250VAC Songle relays, Active-LOW trigger
                  </td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">
                    Confirm coil requires 5V supply and input can trigger with 3.3V GPIO high/low.
                  </td>
                  <td className="p-3 text-right font-bold text-neutral-950 dark:text-white">
                    ₹220
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="p-3 font-bold text-neutral-900 dark:text-neutral-100">
                    5V 1A DC Power Supply
                  </td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">
                    Isolated AC-DC converter (Hi-Link HLK-PM01 or standard 5V USB charger)
                  </td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">
                    Must deliver stable 5V at minimum 500mA to energize all 4 relay coils concurrently.
                  </td>
                  <td className="p-3 text-right font-bold text-neutral-950 dark:text-white">
                    ₹120
                  </td>
                </tr>

                <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                  <td className="p-3 font-bold text-neutral-900 dark:text-neutral-100">
                    Wires, Connectors & Enclosure
                  </td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">
                    Dupont female-to-female jumpers, 1.5 sq mm copper wire, 3D printed / ABS box
                  </td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-400">
                    Ensure flame-retardant box with proper ventilation and strain relief.
                  </td>
                  <td className="p-3 text-right font-bold text-neutral-950 dark:text-white">
                    ₹110
                  </td>
                </tr>

                <tr className="bg-[#ffcf32]/10 font-bold border-t-2 border-neutral-900 dark:border-neutral-200">
                  <td className="p-3 text-neutral-950 dark:text-white" colSpan={3}>
                    TOTAL DIY HARDWARE COST
                  </td>
                  <td className="p-3 text-right text-base text-neutral-950 dark:text-white">
                    ~₹700
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-neutral-900 bg-white p-4 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#181818] dark:shadow-none">
              <h4 className="font-mono font-bold text-sm text-neutral-950 dark:text-white flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-emerald-600" />
                <span>3.3V Logic vs 5V Coil Supply Rule</span>
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                The <strong>5V</strong> figure refers strictly to the relay board coil supply (which powers the
                electromagnets). The <strong>3.3V</strong> figure refers to the ESP32-C3 logic levels. Most optocoupled
                relay boards have an onboard PNP transistor/optocoupler that reliably triggers with 3.3V logic signals.
                Always share a common ground (GND) between the controller and the relay power source.
              </p>
            </div>

            <div className="border border-neutral-900 bg-white p-4 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#181818] dark:shadow-none">
              <h4 className="font-mono font-bold text-sm text-neutral-950 dark:text-white flex items-center gap-2 mb-2">
                <ShieldAlert className="h-4 w-4 text-amber-600" />
                <span>Inductive Loads (Ceiling Fan Snubber)</span>
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Fans and fluorescent tube chokes create large voltage spikes (back-EMF) when turned OFF. For long-term
                reliability and to prevent the ESP32 from restarting due to electromagnetic interference (EMI), wire an
                RC snubber (0.1µF 400V capacitor in series with a 100Ω 2W resistor) across the fan relay contacts.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Master Antigravity Prompt Generator */}
        <section
          id="prompt-generator"
          className="mb-12 border-2 border-neutral-900 bg-neutral-900 p-5 sm:p-7 text-white shadow-[4px_4px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[4px_4px_0px_0px_#fff]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-[#ffcf32]" />
                <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white">
                  GOOGLE ANTIGRAVITY MASTER PROMPT
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Feed this tested prompt into your AI coding agent (Antigravity, Claude Code, Cursor) to generate the USB
                bench test firmware.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={copyPromptToClipboard}
                className="flex items-center gap-1.5 border border-white bg-[#ffcf32] px-3 py-1.5 text-xs font-mono font-bold text-black shadow-[2px_2px_0px_0px_#fff] hover:bg-[#ffe066] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                {copiedPrompt ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copiedPrompt ? 'PROMPT COPIED!' : 'COPY PROMPT'}</span>
              </button>

              <a
                href="/assets/smart-room/antigravity-prompt.txt"
                download="antigravity-prompt.txt"
                className="flex items-center gap-1.5 border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-mono font-bold text-white hover:bg-neutral-700"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">.TXT</span>
              </a>
            </div>
          </div>

          {/* Prompt Configuration Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs font-mono">
            <div>
              <label className="block text-neutral-400 mb-1.5 font-bold uppercase">Target Framework:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setFrameworkChoice('esphome')}
                  className={`border p-2 text-center transition-colors ${
                    frameworkChoice === 'esphome'
                      ? 'border-[#ffcf32] bg-[#ffcf32]/20 text-[#ffcf32] font-bold'
                      : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  ESPHome (HomeKit)
                </button>
                <button
                  onClick={() => setFrameworkChoice('arduino')}
                  className={`border p-2 text-center transition-colors ${
                    frameworkChoice === 'arduino'
                      ? 'border-[#ffcf32] bg-[#ffcf32]/20 text-[#ffcf32] font-bold'
                      : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  Arduino C++
                </button>
                <button
                  onClick={() => setFrameworkChoice('matter')}
                  className={`border p-2 text-center transition-colors ${
                    frameworkChoice === 'matter'
                      ? 'border-[#ffcf32] bg-[#ffcf32]/20 text-[#ffcf32] font-bold'
                      : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  Matter Native
                </button>
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 mb-1.5 font-bold uppercase">Relay Module Trigger Logic:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPolarity('active-low')}
                  className={`border p-2 text-center transition-colors ${
                    polarity === 'active-low'
                      ? 'border-[#ffcf32] bg-[#ffcf32]/20 text-[#ffcf32] font-bold'
                      : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  Active-LOW (0V = ON)
                </button>
                <button
                  onClick={() => setPolarity('active-high')}
                  className={`border p-2 text-center transition-colors ${
                    polarity === 'active-high'
                      ? 'border-[#ffcf32] bg-[#ffcf32]/20 text-[#ffcf32] font-bold'
                      : 'border-neutral-700 bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  Active-HIGH (3.3V = ON)
                </button>
              </div>
            </div>
          </div>

          {/* Prompt Code Display */}
          <div className="relative border border-neutral-700 bg-neutral-950 p-4 font-mono text-xs leading-relaxed text-neutral-300 max-h-80 overflow-y-auto">
            <pre className="whitespace-pre-wrap">{generatedPrompt}</pre>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Includes strapping pin safety guard on GPIO 2</span>
            </div>
            <a
              href="https://antigravity.google/docs/ide/agent-side-panel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#ffcf32] underline hover:text-white"
            >
              <ExternalLink className="h-3 w-3" />
              <span>Google Antigravity Agent Documentation</span>
            </a>
          </div>
        </section>

        {/* SECTION 5: Step-by-Step Build Playbook */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="border border-neutral-900 bg-neutral-200 px-2 py-0.5 text-xs font-mono font-bold dark:border-neutral-700 dark:bg-neutral-800">
              BUILD PLAYBOOK
            </span>
            <span className="text-xs font-mono text-neutral-500">FROM BENCH TEST TO APPLE HOME</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-neutral-950 dark:text-white mb-6">
            Step-by-Step Implementation Guide
          </h2>

          {/* Step Navigation Tabs */}
          <div className="flex overflow-x-auto border-b-2 border-neutral-900 dark:border-neutral-200 mb-6 gap-1 pb-1">
            {[
              { id: 1, label: '1. Boards & Hardware' },
              { id: 2, label: '2. Firmware & USB Test' },
              { id: 3, label: '3. Live/Neutral Circuit' },
              { id: 4, label: '4. Enclosure & Fitting' },
              { id: 5, label: '5. Siri & Apple Home' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveStepTab(tab.id)}
                className={`px-4 py-2 text-xs font-mono font-bold whitespace-nowrap transition-colors border ${
                  activeStepTab === tab.id
                    ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_#ffcf32]'
                    : 'border-transparent text-neutral-600 hover:text-black hover:bg-neutral-100 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Step 1 Content */}
          {activeStepTab === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border border-neutral-900 bg-white p-5 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-none">
                <h3 className="text-lg font-bold font-mono text-neutral-950 dark:text-white mb-2">
                  1. Inspect Your Boards & Understand the Logic
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                  The <strong>ESP32-C3 SuperMini</strong> acts as the Wi-Fi brain. Its GPIO pins output 3.3V logic
                  signals. The <strong>4-channel relay module</strong> provides electrical isolation via optocouplers and
                  switches high-voltage contacts using mechanical armatures.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="relative aspect-video border border-neutral-900 dark:border-neutral-700 overflow-hidden">
                    <Image
                      src="/assets/smart-room/esp32-c3-installed.webp"
                      alt="ESP32-C3 SuperMini board"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 p-2 text-[11px] font-mono text-white">
                      ESP32-C3 SuperMini with Dupont jumpers
                    </div>
                  </div>

                  <div className="relative aspect-video border border-neutral-900 dark:border-neutral-700 overflow-hidden">
                    <Image
                      src="/assets/smart-room/four-channel-relay-installed.webp"
                      alt="4-channel relay board"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 p-2 text-[11px] font-mono text-white">
                      4-Channel 5V Relay with Songle 10A contacts
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-amber-500 bg-amber-500/10 p-4 font-mono text-xs text-amber-900 dark:text-amber-200">
                  <strong className="block text-sm mb-1 uppercase">Crucial Check: Logic vs Coil Supply</strong>
                  Connect the relay VCC to 5V (from your 5V USB source or AC-DC module). Connect ESP32-C3 GND and Relay
                  GND together. The signal lines (IN1..IN4) connect directly to GPIO 0, 1, 2, 3.
                </div>
              </div>
            </div>
          )}

          {/* Step 2 Content */}
          {activeStepTab === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border border-neutral-900 bg-white p-5 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-none">
                <h3 className="text-lg font-bold font-mono text-neutral-950 dark:text-white mb-2">
                  2. Compile, Flash and Verify on the Bench via USB
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                  Never wire AC mains until your bench test passes 100% of the following verification checks on USB:
                </p>

                <div className="relative aspect-video max-w-xl mx-auto border border-neutral-900 dark:border-neutral-700 overflow-hidden my-4">
                  <Image
                    src="/assets/smart-room/gpio-channel-map.webp"
                    alt="GPIO Bench Test Wiring Diagram"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 p-2 text-[11px] font-mono text-white">
                    Bench Wiring: GPIO 0 (IN1), GPIO 1 (IN2), GPIO 2 (IN3), GPIO 3 (IN4)
                  </div>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-start gap-2.5 p-2.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1a1a1a]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-950 dark:text-white">All Channels Off at Boot:</strong>
                      <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                        Plug in the USB cable. None of the 4 relay LEDs should light up or click during boot.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1a1a1a]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-950 dark:text-white">GPIO 2 Strapping Pin Check:</strong>
                      <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                        GPIO 2 controls Ceiling Fan (IN3). If the ESP32 hangs or enters bootloader ROM mode upon reset,
                        the relay board is pulling GPIO 2 low. Add a 10kΩ pull-up resistor to 3.3V or use a different pin.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-2.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1a1a1a]">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-950 dark:text-white">Sequential Serial Toggle:</strong>
                      <p className="text-neutral-600 dark:text-neutral-400 mt-0.5">
                        Open Serial Monitor at 115200 baud. Send command `1`, verify CH1 clicks ON. Send `all_off`,
                        verify all 4 LEDs extinguish immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 Content */}
          {activeStepTab === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border border-neutral-900 bg-white p-5 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-none">
                <h3 className="text-lg font-bold font-mono text-neutral-950 dark:text-white mb-2">
                  3. Understand Live vs Neutral Paths (Mains Wiring)
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                  The most critical electrical rule in home automation: <strong>Relays ONLY switch the LIVE (Phase) conductor.</strong>{' '}
                  NEUTRAL never connects to the relay terminals!
                </p>

                <div className="relative aspect-video max-w-xl mx-auto border border-neutral-900 dark:border-neutral-700 overflow-hidden my-4">
                  <Image
                    src="/assets/smart-room/live-neutral-diagram.webp"
                    alt="Live and neutral relay concept"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 p-2 text-[11px] font-mono text-white">
                    Live Wire ➔ COM ➔ Normally Open (NO) ➔ Load ➔ Neutral returns directly
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs mt-4">
                  <div className="border border-neutral-900 p-3 bg-neutral-50 dark:border-neutral-700 dark:bg-[#181818]">
                    <strong className="text-neutral-950 dark:text-white block mb-1">COM (Common)</strong>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      The moving contact. Incoming 230V Live phase connects here.
                    </span>
                  </div>
                  <div className="border border-neutral-900 p-3 bg-neutral-50 dark:border-neutral-700 dark:bg-[#181818]">
                    <strong className="text-neutral-950 dark:text-white block mb-1">NO (Normally Open)</strong>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Closes when relay coil energizes. Connects to your light / fan live feed.
                    </span>
                  </div>
                  <div className="border border-neutral-900 p-3 bg-neutral-50 dark:border-neutral-700 dark:bg-[#181818]">
                    <strong className="text-neutral-950 dark:text-white block mb-1">NC (Normally Closed)</strong>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      Unused for standard lighting. Only closed when relay is powered OFF.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4 Content */}
          {activeStepTab === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border border-neutral-900 bg-white p-5 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-none">
                <h3 className="text-lg font-bold font-mono text-neutral-950 dark:text-white mb-2">
                  4. Enclosure Assembly & Wall Switchboard Installation
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                  Never leave high-voltage terminals exposed inside the wall cavity. Enclose the relay in an insulated
                  housing with proper strain relief and keep a minimum 6mm creepage clearance between low-voltage and mains.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                  <div className="relative aspect-square border border-neutral-900 dark:border-neutral-700 overflow-hidden">
                    <Image
                      src="/assets/smart-room/wiring-overview.webp"
                      alt="Wiring overview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1.5 text-[10px] font-mono text-white">
                      Wall switchboard cavity wiring
                    </div>
                  </div>

                  <div className="relative aspect-square border border-neutral-900 dark:border-neutral-700 overflow-hidden">
                    <Image
                      src="/assets/smart-room/relay-and-enclosure.webp"
                      alt="Relay in enclosure"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1.5 text-[10px] font-mono text-white">
                      Compact insulated acrylic box
                    </div>
                  </div>

                  <div className="relative aspect-square border border-neutral-900 dark:border-neutral-700 overflow-hidden">
                    <Image
                      src="/assets/smart-room/closed-enclosure.webp"
                      alt="Finished closed enclosure"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1.5 text-[10px] font-mono text-white">
                      Closed enclosure mounted on wall
                    </div>
                  </div>
                </div>

                <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400">
                  Tip: Keep the manual switches wired in parallel or connected to spare ESP32 GPIO inputs (configured
                  with internal pull-ups) so family members can still physically flip switches even if Wi-Fi drops!
                </p>
              </div>
            </div>
          )}

          {/* Step 5 Content */}
          {activeStepTab === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border border-neutral-900 bg-white p-5 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-none">
                <h3 className="text-lg font-bold font-mono text-neutral-950 dark:text-white mb-2">
                  5. Apple Home Integration & Siri Voice Commands
                </h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                  Once paired through Apple Home (via Homebridge, ESPHome HomeKit component, or native Matter), assign
                  each of the 4 channels to their specific room and type.
                </p>

                <div className="relative aspect-video max-w-md mx-auto border border-neutral-900 dark:border-neutral-700 overflow-hidden my-4">
                  <Image
                    src="/assets/smart-room/apple-home-controls.webp"
                    alt="Apple Home UI Controls"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 p-2 text-[11px] font-mono text-white">
                    Bathroom Light, Ceiling Fan, Curtain Light, and Tube Light tiles
                  </div>
                </div>

                <div className="border border-neutral-900 bg-neutral-100 p-4 font-mono text-xs dark:border-neutral-700 dark:bg-[#1a1a1a]">
                  <strong className="block text-sm mb-2 text-neutral-950 dark:text-white">
                    🗣️ Tested Siri Voice Commands:
                  </strong>
                  <ul className="space-y-1.5 text-neutral-700 dark:text-neutral-300">
                    <li>• &quot;Hey Siri, turn on the tube light.&quot;</li>
                    <li>• &quot;Hey Siri, turn off all lights in my room.&quot;</li>
                    <li>• &quot;Hey Siri, turn on ceiling fan.&quot;</li>
                    <li>• &quot;Hey Siri, set movie mode.&quot; (Turns off Tube Light, turns on Curtain Light)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 6: High-Resolution Photo Gallery & Lightbox */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="border border-neutral-900 bg-neutral-200 px-2 py-0.5 text-xs font-mono font-bold dark:border-neutral-700 dark:bg-neutral-800">
              BUILD GALLERY
            </span>
            <span className="text-xs font-mono text-neutral-500">10 REAL DOCUMENTATION PHOTOS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-neutral-950 dark:text-white mb-6">
            Hardware, Assembly & Installation Gallery
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {GALLERY_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative cursor-pointer border border-neutral-900 bg-neutral-100 overflow-hidden shadow-[2px_2px_0px_0px_#000] hover:shadow-[3px_3px_0px_0px_#ffcf32] transition-all dark:border-neutral-700 dark:bg-[#1a1a1a] dark:shadow-none"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1.5 left-1.5 border border-black/40 bg-black/80 px-1.5 py-0.5 text-[9px] font-mono font-bold text-white uppercase">
                    {photo.highlight}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <Maximize2 className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="p-2 border-t border-neutral-200 dark:border-neutral-800">
                  <div className="font-mono font-bold text-[11px] truncate text-neutral-900 dark:text-neutral-100">
                    {photo.title}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                    {photo.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: Troubleshooting Diagnostic Matrix */}
        <section className="mb-12 border-2 border-neutral-900 bg-white p-5 sm:p-7 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex items-center gap-2 mb-2">
            <span className="border border-neutral-900 bg-neutral-200 px-2 py-0.5 text-xs font-mono font-bold dark:border-neutral-700 dark:bg-neutral-800">
              DEBUG MATRIX
            </span>
            <span className="text-xs font-mono text-neutral-500">COMMON ISSUES & ONE-SHOT FIXES</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-neutral-950 dark:text-white mb-6">
            Hardware & Firmware Troubleshooting
          </h2>

          <div className="space-y-3 font-mono text-xs">
            <details className="group border border-neutral-900 bg-neutral-50 p-3.5 dark:border-neutral-700 dark:bg-[#181818]">
              <summary className="cursor-pointer font-bold text-neutral-950 dark:text-white flex items-center justify-between select-none">
                <span>⚠️ The ESP32-C3 refuses to boot when the relay is connected (Strapping Pin Issue)</span>
                <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
              </summary>
              <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans text-xs">
                <strong>Cause:</strong> On the ESP32-C3, <strong>GPIO 2</strong> is a strapping pin that determines the
                boot mode (SPI Boot vs Download Boot). If the relay module optocoupler pulls GPIO 2 low during power-on
                reset, the chip enters flashing ROM mode and never boots your firmware.
                <br />
                <br />
                <strong>Fix:</strong> Add an external 10kΩ pull-up resistor between GPIO 2 and 3.3V, or remap Channel 3
                from GPIO 2 to GPIO 4 or GPIO 5, which are not strapping pins.
              </div>
            </details>

            <details className="group border border-neutral-900 bg-neutral-50 p-3.5 dark:border-neutral-700 dark:bg-[#181818]">
              <summary className="cursor-pointer font-bold text-neutral-950 dark:text-white flex items-center justify-between select-none">
                <span>⚡ Relays briefly click ON when power is restored (Cold Power-On Glitch)</span>
                <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
              </summary>
              <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans text-xs">
                <strong>Cause:</strong> Active-LOW relays turn ON whenever the input pin is grounded or floating low.
                Before firmware initializes, the ESP32 GPIOs may float.
                <br />
                <br />
                <strong>Fix:</strong> In your firmware startup code, set the GPIO pin output to HIGH{' '}
                <em>before</em> configuring it as an output:
                <code className="block mt-1 p-2 bg-neutral-900 text-[#ffcf32] font-mono text-[11px]">
                  digitalWrite(pin, HIGH); pinMode(pin, OUTPUT);
                </code>
              </div>
            </details>

            <details className="group border border-neutral-900 bg-neutral-50 p-3.5 dark:border-neutral-700 dark:bg-[#181818]">
              <summary className="cursor-pointer font-bold text-neutral-950 dark:text-white flex items-center justify-between select-none">
                <span>🌀 ESP32 reboots or freezes whenever the Ceiling Fan is switched OFF</span>
                <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
              </summary>
              <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans text-xs">
                <strong>Cause:</strong> Ceiling fans are heavy inductive loads. When the relay contacts open, the
                magnetic field collapses, generating a high-voltage back-EMF spark across the relay contacts that radiates
                RF noise and glitches the microcontroller 3.3V rail.
                <br />
                <br />
                <strong>Fix:</strong> Install an RC snubber network (0.1µF 400V capacitor + 100Ω 2W resistor in series)
                directly across the relay COM and NO terminals. Keep DC wiring shielded or separated from AC fan leads.
              </div>
            </details>

            <details className="group border border-neutral-900 bg-neutral-50 p-3.5 dark:border-neutral-700 dark:bg-[#181818]">
              <summary className="cursor-pointer font-bold text-neutral-950 dark:text-white flex items-center justify-between select-none">
                <span>📱 Apple Home shows &quot;No Response&quot; after router reboot</span>
                <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
              </summary>
              <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans text-xs">
                <strong>Cause:</strong> The ESP32-C3 only supports 2.4 GHz Wi-Fi (802.11 b/g/n). If your router has
                combined 2.4GHz and 5GHz SSIDs, Apple Home mDNS discovery packets may get filtered across bands.
                <br />
                <br />
                <strong>Fix:</strong> Ensure mDNS / IGMP Snooping is enabled on your home router and assign a static DHCP
                lease to the ESP32-C3 MAC address.
              </div>
            </details>
          </div>
        </section>

        {/* Bottom Navigation & Share Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-neutral-900 bg-white p-5 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-200 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div>
            <div className="font-mono font-bold text-sm text-neutral-950 dark:text-white">
              Built with curiosity by Nirmal
            </div>
            <div className="text-xs font-mono text-neutral-500">
              Explore more free blueprints, Windows utilities, and AI video guides
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/guide/ai-reel-editor"
              className="border border-neutral-900 bg-neutral-100 px-3 py-1.5 text-xs font-mono font-bold hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              ← AI REEL GUIDE
            </Link>
            <Link
              href="/guide/windows-app-beginner-guide"
              className="border border-neutral-900 bg-[#ffcf32] px-3 py-1.5 text-xs font-mono font-bold text-black hover:bg-[#ffe066]"
            >
              WINDOWS APP GUIDE →
            </Link>
          </div>
        </div>
      </main>

      {/* Lightbox Modal for Photo Zoom */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full border-2 border-white bg-neutral-900 shadow-[8px_8px_0px_0px_#ffcf32] overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-950 px-4 py-2.5 text-white">
              <span className="font-mono text-xs font-bold uppercase">{selectedPhoto.title}</span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 hover:text-[#ffcf32] transition-colors"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
                sizes="(max-width: 1200px) 100vw, 900px"
              />
            </div>

            <div className="p-4 bg-neutral-950 border-t border-neutral-800 text-neutral-300 font-mono text-xs">
              <p className="leading-relaxed">{selectedPhoto.caption}</p>
              <div className="mt-2 text-[10px] text-neutral-500 uppercase">
                CATEGORY: {selectedPhoto.category} · TAG: {selectedPhoto.highlight}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
