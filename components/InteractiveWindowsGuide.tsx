'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Terminal,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  ExternalLink,
  Bug,
  Package,
  Clock,
  HardDrive,
  FileText,
  Sliders,
  ChevronRight,
} from 'lucide-react';
import { FREE_APPS, BIO_PROFILE } from '@/lib/bio-data';

interface Archetype {
  id: string;
  name: string;
  appName: string;
  archetypeTag: string;
  oneLiner: string;
  firstVersionMustDo: string[];
  inspiredByAppId?: string;
  defaultDuration?: number;
}

const ARCHETYPES: Archetype[] = [
  {
    id: 'timer',
    name: 'Focus Timer',
    appName: 'FocusTimer',
    archetypeTag: 'Third Space Style',
    oneLiner:
      'I want to start a 25-minute work session, pause it when interrupted, and resume with the same time left.',
    firstVersionMustDo: [
      'Default to 25 minutes and accept a whole-number duration from 1 to 180 minutes.',
      'Start one countdown. Repeated Start actions must never create multiple timers.',
      'Pause with remaining time intact, resume from there, and reset to the chosen duration.',
      'Stop at zero and complete once, even if a timer tick arrives late.',
      'Save preferred duration locally under %LOCALAPPDATA%\\FocusTimer\\settings.json and reload on launch.',
      'Active countdown starts fresh the next time the app opens.',
      'Work offline under a standard Windows user account.',
    ],
    inspiredByAppId: 'third-space',
    defaultDuration: 25,
  },
  {
    id: 'monitor',
    name: 'PC Telemetry Monitor',
    appName: 'SysMonitor',
    archetypeTag: 'PC Console Style',
    oneLiner:
      'I want a compact desktop widget that reads and displays live available memory and CPU load from Windows.',
    firstVersionMustDo: [
      'Read and display one live system metric (e.g. available RAM % or CPU usage).',
      'Sample sensor metrics every 1-2 seconds without causing CPU spikes.',
      'Small compact floating HUD with pin-to-top toggle.',
      'Save window position and pin preference under %LOCALAPPDATA%\\SysMonitor\\settings.json.',
      'Gracefully handle missing permissions or unsupported hardware.',
    ],
    inspiredByAppId: 'pc-console',
  },
  {
    id: 'notes',
    name: 'Tactile Sticky Note',
    appName: 'DeskNote',
    archetypeTag: 'Little Notes Style',
    oneLiner:
      'I want a clean, borderless note on my desktop that saves plain-text thoughts locally without cloud sign-ups.',
    firstVersionMustDo: [
      'Save one plain-text note locally and reload it immediately when the app opens.',
      'Autosave changes to disk with atomic write to prevent corruption.',
      'Transparent or clean borderless window with draggable header.',
      'Single-button minimize-to-icon shortcut on desktop.',
      'Store data in %LOCALAPPDATA%\\DeskNote\\data.json with zero cloud lock-in.',
    ],
    inspiredByAppId: 'little-notes',
  },
  {
    id: 'automator',
    name: 'File & Format Action',
    appName: 'OrbitAction',
    archetypeTag: 'Orbit Style',
    oneLiner:
      'I want to select files in Explorer and copy, convert, or organize them into folders with safety checks.',
    firstVersionMustDo: [
      'Accept selected file paths and copy or process them to a chosen destination.',
      'Always preserve original files; never overwrite without confirmation.',
      'Automatically append unique numeric suffixes (e.g. file_1.png) on name collisions.',
      'Show progress bar and cancellation option for batch tasks.',
      'Store recent destinations in %LOCALAPPDATA%\\OrbitAction\\settings.json.',
    ],
    inspiredByAppId: 'orbit',
  },
];

export default function InteractiveWindowsGuide() {
  const [selectedArchetypeId, setSelectedArchetypeId] = useState<string>('timer');
  const [customAppName, setCustomAppName] = useState<string>('');
  const [customProblem, setCustomProblem] = useState<string>('');
  const [activePromptTab, setActivePromptTab] = useState<'build' | 'bug' | 'publish'>('build');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeStepTab, setActiveStepTab] = useState<number>(1);

  // Verification Checklist State
  const [checks, setChecks] = useState<Record<string, boolean>>({
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
    check6: false,
  });

  // Mini FocusTimer Playground State
  const [timerDuration, setTimerDuration] = useState<number>(25);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerStatus, setTimerStatus] = useState<'idle' | 'running' | 'paused' | 'completed'>('idle');
  const [hasLoadedSimulatedSettings, setHasLoadedSimulatedSettings] = useState<boolean>(false);

  const activeArchetype =
    ARCHETYPES.find((a) => a.id === selectedArchetypeId) || ARCHETYPES[0];

  const appName = customAppName.trim() || activeArchetype.appName;
  const problemStatement = customProblem.trim() || activeArchetype.oneLiner;

  // Simulator Effect
  useEffect(() => {
    // Load simulated settings from localStorage on client
    if (typeof window !== 'undefined' && !hasLoadedSimulatedSettings) {
      try {
        const saved = localStorage.getItem('simulated_focus_timer_duration');
        if (saved) {
          const parsed = parseInt(saved, 10);
          if (parsed >= 1 && parsed <= 180) {
            setTimerDuration(parsed);
            setTimerSecondsLeft(parsed * 60);
          }
        }
      } catch {
        // ignore
      }
      setHasLoadedSimulatedSettings(true);
    }
  }, [hasLoadedSimulatedSettings]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSecondsLeft > 0) {
      interval = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setTimerStatus('completed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSecondsLeft]);

  const handleStartTimer = () => {
    if (timerStatus === 'completed' || timerSecondsLeft === 0) {
      setTimerSecondsLeft(timerDuration * 60);
    }
    setIsTimerRunning(true);
    setTimerStatus('running');
  };

  const handlePauseTimer = () => {
    setIsTimerRunning(false);
    setTimerStatus('paused');
  };

  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setTimerSecondsLeft(timerDuration * 60);
    setTimerStatus('idle');
  };

  const handleDurationChange = (minutes: number) => {
    const valid = Math.max(1, Math.min(180, minutes));
    setTimerDuration(valid);
    if (!isTimerRunning) {
      setTimerSecondsLeft(valid * 60);
    }
    try {
      localStorage.setItem('simulated_focus_timer_duration', valid.toString());
    } catch {
      // ignore
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const toggleCheck = (id: string) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedChecksCount = Object.values(checks).filter(Boolean).length;

  // Dynamic AI Prompts
  const buildPrompt = `Help me build a small Windows utility called ${appName}.

Problem
${problemStatement}

What the first version must do
${activeArchetype.firstVersionMustDo.map((item) => `- ${item}`).join('\n')}

Before you edit
Inspect the project. Tell me which framework, app project, and build commands it uses. Run the existing build and report any baseline errors. Propose a short sequence of changes I can verify one at a time.

Implementation
Use my existing template and its patterns. Keep the appearance and layout intact. Implement the core logic separately from the window so it can be tested with a controllable clock/input mock. Connect the existing actions to the logic when those actions are available. Show me how to exercise the logic from a test if my template has no matching controls yet.

Use the project's existing storage pattern. If there is none, save settings under %LOCALAPPDATA%\\${appName}\\settings.json. Handle missing or invalid settings with safe defaults. Report a save failure without discarding the in-memory setting.

Verification
Build the app and test start, pause, resume, reset, completion, and settings reload. Report the files you changed, the commands you ran, the results, and anything that still needs manual verification.`;

  const bugFixPrompt = `I found a bug in ${appName}.

Steps to reproduce
1. Launch the application from PowerShell
2. [Describe the first action, e.g. click Start, pause, or change setting]
3. [Describe what triggers the unexpected behavior]

Expected result
[What should happen based on the first-version requirements]

Actual result
[What happened. Paste the exact error text, exception, or UI freeze here]

Reproduce it if possible, identify the root cause, and make the smallest clean fix.
Run the relevant test and build again. Give me one short manual check to confirm it is resolved.`;

  const publishPrompt = `Prepare a local release for my Windows utility called ${appName}. Use the project's documented packaging workflow and target Windows x64.

Build and test the release as a self-contained executable with the .NET runtime included. Then give me:
1. The exact output folder path
2. The executable filename
3. The launch command
4. What I need to include in a standalone .zip file when sharing it

Keep the release local so I can test it on my machine first.`;

  const starterCommands = `# 1. Check your .NET 10 SDK
dotnet --list-sdks

# 2. Create minimal WPF desktop project
dotnet new wpf --name ${appName} --output .\\src\\${appName} --framework net10.0

# 3. Build the baseline starter
dotnet build .\\src\\${appName}\\${appName}.csproj

# 4. Run the starter window
dotnet run --project .\\src\\${appName}\\${appName}.csproj`;

  const publishCommands = `# 1. Publish self-contained 64-bit Windows executable
dotnet publish .\\src\\${appName}\\${appName}.csproj -c Release -r win-x64 --self-contained true -o .\\artifacts\\win-x64

# 2. Run the compiled standalone executable
& .\\artifacts\\win-x64\\${appName}.exe`;

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#111111] dark:text-neutral-100">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#111111]/95">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white"
          >
            <span>←</span>
            <span>BACK TO BIO</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/guides"
              className="border border-neutral-300 bg-white px-2.5 py-1 text-xs font-mono text-neutral-700 shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:shadow-[1px_1px_0px_0px_#fff]"
            >
              ALL GUIDES
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8 space-y-8">
        {/* Cover Art Banner */}
        <div className="relative aspect-video w-full overflow-hidden border border-neutral-900 bg-neutral-950 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[3px_3px_0px_0px_#fff]">
          <Image
            src="/assets/images/pixel_creator_studio_1793867589555.jpg"
            alt="Build your first Windows utility with AI"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            style={{ imageRendering: 'pixelated' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 font-mono text-xs font-bold text-white uppercase drop-shadow">
            <span className="inline-block h-2.5 w-2.5 bg-[#10B981]" />
            <span>INTERACTIVE PLAYBOOK · .NET 10 &amp; AI ASSISTANTS</span>
          </div>
        </div>

        {/* Title Header Card */}
        <div className="border border-neutral-900 bg-white p-5 sm:p-6 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[3px_3px_0px_0px_#fff]">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            <span className="border border-neutral-900 bg-[#10B981] px-2 py-0.5 uppercase font-bold text-black">
              INTERACTIVE GUIDE
            </span>
            <span aria-hidden="true">·</span>
            <span>WINDOWS 10 / 11</span>
            <span aria-hidden="true">·</span>
            <span>C# &amp; .NET 10</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">5 MIN READ</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-100">
            Build your first Windows utility with AI
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
            Pick one task you repeat on Windows and build a small utility that saves you a step. This interactive guide uses a focus timer as the baseline example, but you can use the exact same flow to build a hardware monitor, a sticky note app, or a file automator.
          </p>

          {/* Quick Flow Ribbon */}
          <div className="mt-5 border-t border-neutral-200 pt-4 dark:border-neutral-800">
            <div className="font-mono text-[11px] font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500 mb-2">
              [ 6-STAGE BUILD FLOW ]
            </div>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-neutral-800 dark:text-neutral-200">
              <span className="border border-neutral-300 bg-neutral-100 px-2 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                1. Pick Problem
              </span>
              <span className="text-neutral-400">→</span>
              <span className="border border-neutral-300 bg-neutral-100 px-2 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                2. Run Starter
              </span>
              <span className="text-neutral-400">→</span>
              <span className="border border-neutral-300 bg-neutral-100 px-2 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                3. Prompt AI
              </span>
              <span className="text-neutral-400">→</span>
              <span className="border border-neutral-300 bg-neutral-100 px-2 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                4. Build in Steps
              </span>
              <span className="text-neutral-400">→</span>
              <span className="border border-neutral-300 bg-neutral-100 px-2 py-0.5 dark:border-neutral-700 dark:bg-neutral-800">
                5. Verify
              </span>
              <span className="text-neutral-400">→</span>
              <span className="border border-emerald-500 bg-emerald-50 text-emerald-800 px-2 py-0.5 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold">
                6. Publish .EXE
              </span>
            </div>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex overflow-x-auto gap-1 border-b border-neutral-900 pb-1 font-mono text-xs uppercase dark:border-neutral-100">
          {[
            { num: 1, title: 'Pick Job' },
            { num: 2, title: 'Starter Project' },
            { num: 3, title: 'AI Prompt' },
            { num: 4, title: 'Step-by-Step' },
            { num: 5, title: 'Verification' },
            { num: 6, title: 'Publish Build' },
          ].map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStepTab(s.num)}
              className={`pixel-press whitespace-nowrap px-3 py-1.5 font-bold transition-colors ${
                activeStepTab === s.num
                  ? 'border border-neutral-900 bg-[#10B981] text-black shadow-[1.5px_1.5px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[1.5px_1.5px_0px_0px_#fff]'
                  : 'border border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              0{s.num}. {s.title}
            </button>
          ))}
        </div>

        {/* ================= STEP 1: PICK ONE JOB ================= */}
        <section
          id="step-1"
          className={`space-y-4 ${activeStepTab === 1 || activeStepTab === 0 ? 'block' : 'hidden sm:block'}`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
              [ 01. PICK ONE JOB FOR YOUR APP ]
            </h2>
            <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
              SELECT AN ARCHETYPE BELOW
            </span>
          </div>

          <div className="border border-neutral-900 bg-white p-5 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Write the problem and the action in <strong>one sentence</strong>. Keep the first version small enough to test in 60 seconds. Choose an archetype to see how Nirmal structured his real tools:
            </p>

            {/* Archetype Selector Cards */}
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {ARCHETYPES.map((arch) => {
                const isSelected = selectedArchetypeId === arch.id;
                return (
                  <button
                    key={arch.id}
                    onClick={() => {
                      setSelectedArchetypeId(arch.id);
                      setCustomAppName('');
                      setCustomProblem('');
                    }}
                    className={`pixel-press text-left p-3.5 border transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-[2px_2px_0px_0px_#10B981] dark:border-emerald-400 dark:bg-emerald-950/20'
                        : 'border-neutral-300 bg-white hover:border-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600 shadow-[1px_1px_0px_0px_#000] dark:shadow-[1px_1px_0px_0px_#fff]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-neutral-900 dark:text-neutral-100">
                        {arch.name}
                      </span>
                      <span className="font-mono text-[10px] border border-neutral-300 bg-white px-1.5 py-0.5 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                        {arch.archetypeTag}
                      </span>
                    </div>

                    <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                      &ldquo;{arch.oneLiner}&rdquo;
                    </p>

                    <div className="mt-2.5 flex items-center justify-between font-mono text-[10px]">
                      <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                        App: {arch.appName}
                      </span>
                      {arch.inspiredByAppId && (
                        <Link
                          href={`/app/${arch.inspiredByAppId}`}
                          target="_blank"
                          className="flex items-center gap-0.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-white underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Inspect real app</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </Link>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Input Accordion */}
            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <span className="font-mono text-[11px] text-neutral-500 uppercase">
                Or Customize Your Idea:
              </span>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="App Name (e.g. QuickNote)"
                  value={customAppName}
                  onChange={(e) => setCustomAppName(e.target.value)}
                  className="border border-neutral-400 bg-white px-2.5 py-1.5 font-mono text-xs text-neutral-900 placeholder:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                />
                <input
                  type="text"
                  placeholder="One-sentence problem statement"
                  value={customProblem}
                  onChange={(e) => setCustomProblem(e.target.value)}
                  className="sm:col-span-2 border border-neutral-400 bg-white px-2.5 py-1.5 font-mono text-xs text-neutral-900 placeholder:text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>

            {/* First Version Definition Box */}
            <div className="mt-4 border border-neutral-200 bg-neutral-50 p-3.5 dark:border-neutral-800 dark:bg-neutral-900/60">
              <div className="font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100 uppercase">
                [ WHAT &ldquo;DONE&rdquo; LOOKS LIKE FOR VERSION 1.0 ]
              </div>
              <ul className="mt-2 space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
                {activeArchetype.firstVersionMustDo.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 shrink-0">
                      [✓]
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================= STEP 2: STARTER PROJECT ================= */}
        <section
          id="step-2"
          className={`space-y-4 ${activeStepTab === 2 || activeStepTab === 0 ? 'block' : 'hidden sm:block'}`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
              [ 02. OPEN &amp; RUN YOUR STARTER PROJECT ]
            </h2>
            <span className="font-mono text-[10px] text-neutral-500">C# / WPF / .NET 10</span>
          </div>

          <div className="border border-neutral-900 bg-white p-5 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Open your project folder in your editor (VS Code, Cursor, Visual Studio). Ensure you have the .NET SDK installed. If you are starting in an empty folder, create a clean .NET 10 WPF template:
            </p>

            {/* Terminal Box */}
            <div className="mt-3 overflow-hidden border border-neutral-900 bg-neutral-950 text-white dark:border-neutral-700">
              <div className="flex items-center justify-between border-b border-neutral-800 bg-[#161616] px-3 py-1.5 font-mono text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                  <span>POWERSHELL / WINDOWS TERMINAL</span>
                </div>
                <button
                  onClick={() => handleCopy(starterCommands, 'starter')}
                  className="pixel-press flex items-center gap-1 border border-neutral-700 bg-black/80 px-2 py-0.5 text-[10px] text-neutral-200 hover:text-white"
                >
                  {copiedKey === 'starter' ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>COPY COMMANDS</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="overflow-x-auto p-4 font-mono text-xs text-emerald-300 leading-relaxed">
                <code>{starterCommands}</code>
              </pre>
            </div>

            <div className="mt-3 flex items-start gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">[!]</span>
              <span>
                Tip: Run the commands from the project root. Ensure the generated window opens on your screen before asking your AI assistant to make changes.
              </span>
            </div>
          </div>
        </section>

        {/* ================= STEP 3: INTERACTIVE AI PROMPT STUDIO ================= */}
        <section
          id="step-3"
          className={`space-y-4 ${activeStepTab === 3 || activeStepTab === 0 ? 'block' : 'hidden sm:block'}`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
              [ 03. PASTE THIS PROMPT INTO YOUR AI ASSISTANT ]
            </h2>
            <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
              LIVE PROMPT STUDIO
            </span>
          </div>

          <div className="border border-neutral-900 bg-white p-5 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Feed this structured prompt to <strong>Claude 3.7</strong>, <strong>ChatGPT</strong>, <strong>Cursor</strong>, or <strong>Antigravity</strong>. It enforces architecture boundaries, controllable clock mocks, and offline local-first storage:
            </p>

            {/* Prompt Type Tabs */}
            <div className="mt-4 flex flex-wrap gap-2 border-b border-neutral-200 pb-2 dark:border-neutral-800">
              <button
                onClick={() => setActivePromptTab('build')}
                className={`pixel-press flex items-center gap-1.5 border px-3 py-1 font-mono text-xs font-bold ${
                  activePromptTab === 'build'
                    ? 'border-neutral-900 bg-[#10B981] text-black shadow-[1.5px_1.5px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[1.5px_1.5px_0px_0px_#fff]'
                    : 'border-neutral-300 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                }`}
              >
                <Sparkles className="h-3 w-3" />
                <span>1. Initial Build Prompt</span>
              </button>

              <button
                onClick={() => setActivePromptTab('bug')}
                className={`pixel-press flex items-center gap-1.5 border px-3 py-1 font-mono text-xs font-bold ${
                  activePromptTab === 'bug'
                    ? 'border-neutral-900 bg-[#10B981] text-black shadow-[1.5px_1.5px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[1.5px_1.5px_0px_0px_#fff]'
                    : 'border-neutral-300 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                }`}
              >
                <Bug className="h-3 w-3" />
                <span>2. Bug Report Prompt</span>
              </button>

              <button
                onClick={() => setActivePromptTab('publish')}
                className={`pixel-press flex items-center gap-1.5 border px-3 py-1 font-mono text-xs font-bold ${
                  activePromptTab === 'publish'
                    ? 'border-neutral-900 bg-[#10B981] text-black shadow-[1.5px_1.5px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[1.5px_1.5px_0px_0px_#fff]'
                    : 'border-neutral-300 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                }`}
              >
                <Package className="h-3 w-3" />
                <span>3. Release &amp; Packaging Prompt</span>
              </button>
            </div>

            {/* Prompt View Box */}
            <div className="mt-3 relative border border-neutral-900 bg-neutral-950 dark:border-neutral-700">
              <div className="flex items-center justify-between border-b border-neutral-800 bg-[#1a1a1a] px-3 py-1.5 font-mono text-xs text-neutral-400">
                <span>
                  PROMPT TARGET: {appName} ({activeArchetype.name})
                </span>
                <span className="text-[10px] text-emerald-400">READY TO PASTE</span>
              </div>

              <div className="p-4 max-h-80 overflow-y-auto font-mono text-xs text-neutral-200 whitespace-pre-wrap leading-relaxed select-all">
                {activePromptTab === 'build' && buildPrompt}
                {activePromptTab === 'bug' && bugFixPrompt}
                {activePromptTab === 'publish' && publishPrompt}
              </div>

              {/* Action Bar */}
              <div className="border-t border-neutral-800 bg-[#141414] p-3 flex flex-wrap items-center justify-between gap-3">
                <div className="font-mono text-[11px] text-neutral-400">
                  Includes problem, constraints, storage schema &amp; verification steps.
                </div>

                <button
                  onClick={() =>
                    handleCopy(
                      activePromptTab === 'build'
                        ? buildPrompt
                        : activePromptTab === 'bug'
                        ? bugFixPrompt
                        : publishPrompt,
                      'prompt'
                    )
                  }
                  className="pixel-press inline-flex items-center gap-2 border border-emerald-500 bg-[#10B981] px-4 py-2 font-mono text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000] hover:bg-emerald-400 dark:shadow-[2px_2px_0px_0px_#fff]"
                >
                  {copiedKey === 'prompt' ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>COPIED TO CLIPBOARD!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>COPY PROMPT TO CLIPBOARD</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= INTERACTIVE SIMULATOR (PLAYGROUND) ================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
              [ INTERACTIVE SIMULATOR: TRY THE FIRST VERSION HERE ]
            </h2>
            <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
              SIMULATING WIN32 / WPF APP
            </span>
          </div>

          <div className="border border-neutral-900 bg-white p-5 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[3px_3px_0px_0px_#fff]">
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              This interactive widget simulates the exact behavior your Windows app must deliver in Step 1. Try starting, pausing, resetting, and changing the duration:
            </p>

            {/* Retro Desktop App Frame */}
            <div className="mt-4 mx-auto max-w-sm border border-neutral-900 bg-neutral-950 p-4 text-white shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[3px_3px_0px_0px_#fff]">
              {/* Window Titlebar */}
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-4 font-mono text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 bg-[#10B981]" />
                  <span className="font-bold tracking-wider">FOCUSTIMER.EXE</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-neutral-400">
                  <span className="border border-neutral-700 px-1">_</span>
                  <span className="border border-neutral-700 px-1">□</span>
                  <span className="border border-neutral-700 px-1 text-red-400">✕</span>
                </div>
              </div>

              {/* Big LED / Dot-Matrix Display */}
              <div className="text-center py-4 border border-neutral-800 bg-[#0c0c0c] mb-4">
                <div className="font-mono text-4xl sm:text-5xl font-extrabold tracking-widest text-[#10B981] drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">
                  {formatSeconds(timerSecondsLeft)}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase text-neutral-400 flex items-center justify-center gap-2">
                  <span>STATE:</span>
                  <span
                    className={`font-bold ${
                      timerStatus === 'running'
                        ? 'text-emerald-400'
                        : timerStatus === 'paused'
                        ? 'text-amber-400'
                        : timerStatus === 'completed'
                        ? 'text-red-400 animate-pulse'
                        : 'text-neutral-400'
                    }`}
                  >
                    [{timerStatus.toUpperCase()}]
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2">
                {!isTimerRunning ? (
                  <button
                    onClick={handleStartTimer}
                    className="pixel-press flex items-center justify-center gap-1 border border-emerald-500 bg-[#10B981] py-2 font-mono text-xs font-bold text-black hover:bg-emerald-400"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>START</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePauseTimer}
                    className="pixel-press flex items-center justify-center gap-1 border border-amber-500 bg-amber-400 py-2 font-mono text-xs font-bold text-black hover:bg-amber-300"
                  >
                    <Pause className="h-3 w-3 fill-current" />
                    <span>PAUSE</span>
                  </button>
                )}

                <button
                  onClick={handleResetTimer}
                  className="pixel-press flex items-center justify-center gap-1 border border-neutral-700 bg-neutral-800 py-2 font-mono text-xs text-neutral-200 hover:bg-neutral-700"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>RESET</span>
                </button>

                {/* Duration Presets */}
                <select
                  value={timerDuration}
                  onChange={(e) => handleDurationChange(parseInt(e.target.value, 10))}
                  className="border border-neutral-700 bg-neutral-900 px-2 py-2 font-mono text-xs text-white"
                >
                  <option value={15}>15 MIN</option>
                  <option value={25}>25 MIN</option>
                  <option value={45}>45 MIN</option>
                  <option value={60}>60 MIN</option>
                  <option value={90}>90 MIN</option>
                </select>
              </div>

              {/* Simulated Storage Status */}
              <div className="mt-3 pt-2 border-t border-neutral-800/80 font-mono text-[9px] text-neutral-500 flex items-center justify-between">
                <span>%LOCALAPPDATA%\FocusTimer\settings.json</span>
                <span className="text-emerald-500">SAVED: {timerDuration}m</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STEP 4: BUILD IN SMALL STEPS ================= */}
        <section
          id="step-4"
          className={`space-y-4 ${activeStepTab === 4 || activeStepTab === 0 ? 'block' : 'hidden sm:block'}`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
              [ 04. BUILD IN 4 MICRO-STEPS ]
            </h2>
            <span className="font-mono text-[10px] text-neutral-500">ENGINEERING DISCIPLINE</span>
          </div>

          <div className="border border-neutral-900 bg-white p-5 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Do not ask the AI to build the entire app in one giant prompt. Execute in four bite-sized steps:
            </p>

            <div className="mt-4 space-y-3">
              <div className="border border-neutral-300 bg-neutral-50 p-3.5 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  <span className="border border-neutral-900 bg-[#10B981] px-1.5 py-0.2 text-black">
                    PHASE 1
                  </span>
                  <span>Get the core countdown working</span>
                </div>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                  Start with the countdown logic (pause, resume, reset). Ask the assistant to test it with a controllable clock so you can verify a full 25-minute session in seconds without waiting 25 minutes.
                </p>
              </div>

              <div className="border border-neutral-300 bg-neutral-50 p-3.5 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  <span className="border border-neutral-900 bg-[#10B981] px-1.5 py-0.2 text-black">
                    PHASE 2
                  </span>
                  <span>Save one setting to disk</span>
                </div>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                  Save the preferred duration to <code>%LOCALAPPDATA%\FocusTimer\settings.json</code>. Close the app, reopen it, and check that the duration returns. Verify handling of missing or corrupted JSON files.
                </p>
              </div>

              <div className="border border-neutral-300 bg-neutral-50 p-3.5 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  <span className="border border-neutral-900 bg-[#10B981] px-1.5 py-0.2 text-black">
                    PHASE 3
                  </span>
                  <span>Connect UI controls to logic</span>
                </div>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                  Bind the WPF window buttons and text labels to the timer logic. Rebuild with <code>dotnet run</code> and test the user flow manually.
                </p>
              </div>

              <div className="border border-neutral-300 bg-neutral-50 p-3.5 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-900 dark:text-neutral-100">
                  <span className="border border-neutral-900 bg-[#10B981] px-1.5 py-0.2 text-black">
                    PHASE 4
                  </span>
                  <span>Fix one bug at a time with clean repros</span>
                </div>
                <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                  When a bug occurs, give your assistant the exact steps, expected result, and observed error text using the <strong>Bug Report Prompt</strong> in Step 3.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STEP 5: PRE-FLIGHT VERIFICATION ================= */}
        <section
          id="step-5"
          className={`space-y-4 ${activeStepTab === 5 || activeStepTab === 0 ? 'block' : 'hidden sm:block'}`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
              [ 05. VERIFY THE APP BEFORE SHARING ]
            </h2>
            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {completedChecksCount} / 6 VERIFIED
            </span>
          </div>

          <div className="border border-neutral-900 bg-white p-5 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Before sharing your tool with friends or publishing to GitHub, test these 6 edge cases on your local Windows PC:
            </p>

            {/* Clickable Verification List */}
            <div className="mt-4 space-y-2.5">
              {[
                {
                  id: 'check1',
                  title: 'Starting twice leaves one countdown',
                  desc: 'Rapid clicking of the Start button must never create duplicate timers running in parallel.',
                },
                {
                  id: 'check2',
                  title: 'Pausing freezes time & resuming continues from there',
                  desc: 'Ensure no seconds are lost or skipped when toggling between Pause and Resume.',
                },
                {
                  id: 'check3',
                  title: 'Resetting returns to the chosen duration',
                  desc: 'Clicking Reset restores the configured duration (e.g. 25:00) and halts countdown.',
                },
                {
                  id: 'check4',
                  title: 'Completing stops at zero and finishes once',
                  desc: 'Must stop strictly at 00:00 without running into negative numbers or repeating sound effects.',
                },
                {
                  id: 'check5',
                  title: 'Reopening remembers duration and starts idle',
                  desc: 'Closing and reopening retains the user preference, but an active countdown starts fresh.',
                },
                {
                  id: 'check6',
                  title: 'Missing or corrupted settings falls back to default',
                  desc: 'Deleting the settings file under %LOCALAPPDATA% does not crash the app; it falls back safely to 25m.',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`pixel-press w-full text-left p-3 border transition-colors flex items-start gap-3 ${
                    checks[item.id]
                      ? 'border-emerald-600 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950/20'
                      : 'border-neutral-200 bg-neutral-50 hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-900/60'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center border ${
                      checks[item.id]
                        ? 'border-emerald-600 bg-[#10B981] text-black dark:border-emerald-400'
                        : 'border-neutral-400 bg-white dark:border-neutral-600 dark:bg-neutral-800'
                    }`}
                  >
                    {checks[item.id] && <Check className="h-3 w-3 stroke-[3]" />}
                  </div>

                  <div>
                    <div
                      className={`text-xs font-bold ${
                        checks[item.id]
                          ? 'text-emerald-900 dark:text-emerald-200 line-through decoration-emerald-500'
                          : 'text-neutral-900 dark:text-neutral-100'
                      }`}
                    >
                      {item.title}
                    </div>
                    <div className="mt-0.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                      {item.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {completedChecksCount === 6 && (
              <div className="mt-4 border border-emerald-500 bg-emerald-500/10 p-3 text-center font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                [ ALL 6 VERIFICATIONS PASSED! READY FOR PUBLISHING ]
              </div>
            )}
          </div>
        </section>

        {/* ================= STEP 6: PUBLISH STANDALONE BUILD ================= */}
        <section
          id="step-6"
          className={`space-y-4 ${activeStepTab === 6 || activeStepTab === 0 ? 'block' : 'hidden sm:block'}`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
              [ 06. PUBLISH A SELF-CONTAINED WINDOWS BUILD ]
            </h2>
            <span className="font-mono text-[10px] text-neutral-500">PORTABLE .EXE</span>
          </div>

          <div className="border border-neutral-900 bg-white p-5 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Package your utility into a self-contained executable that bundles the runtime so anyone on Windows 10/11 can double-click and run it without installing anything:
            </p>

            {/* Publish Commands Box */}
            <div className="mt-3 overflow-hidden border border-neutral-900 bg-neutral-950 text-white dark:border-neutral-700">
              <div className="flex items-center justify-between border-b border-neutral-800 bg-[#161616] px-3 py-1.5 font-mono text-xs text-neutral-400">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                  <span>PUBLISH COMMANDS (POWERSHELL)</span>
                </div>
                <button
                  onClick={() => handleCopy(publishCommands, 'publish')}
                  className="pixel-press flex items-center gap-1 border border-neutral-700 bg-black/80 px-2 py-0.5 text-[10px] text-neutral-200 hover:text-white"
                >
                  {copiedKey === 'publish' ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-400" />
                      <span className="text-emerald-400">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>COPY COMMANDS</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="overflow-x-auto p-4 font-mono text-xs text-emerald-300 leading-relaxed">
                <code>{publishCommands}</code>
              </pre>
            </div>

            <div className="mt-4 border-l-2 border-emerald-500 pl-3 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
              <strong>How to share:</strong> Zip the entire <code>.\artifacts\win-x64\</code> folder. Send the .zip to a friend or create a public Release on GitHub. When they extract and double-click <code>{appName}.exe</code>, it runs instantly with zero configuration.
            </div>
          </div>
        </section>

        {/* ================= SHOWCASE OF NIRMAL'S REAL APPS ================= */}
        <section className="space-y-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <h2 className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
              [ REAL APPS BUILT WITH THIS FLOW ]
            </h2>
            <Link
              href="/apps"
              className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              View all 4 apps →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FREE_APPS.map((app) => (
              <Link
                key={app.id}
                href={`/app/${app.id}`}
                className="pixel-press group border border-neutral-900 bg-white p-3 shadow-[1.5px_1.5px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#161616] dark:shadow-[1.5px_1.5px_0px_0px_#fff]"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden border border-neutral-900 bg-neutral-950">
                    <Image
                      src={app.coverImage}
                      alt={app.title}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 truncate">
                      {app.title}
                    </div>
                    <div className="font-mono text-[10px] text-neutral-500 truncate">
                      {app.tagline}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-emerald-500" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Author Footer */}
        <footer className="border-t border-neutral-200 pt-6 text-center font-mono text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <div>Written &amp; built with passion by {BIO_PROFILE.name} · {BIO_PROFILE.studio}</div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <Link href="/" className="underline hover:text-neutral-900 dark:hover:text-white">
              Back to Bio Links
            </Link>
            <span>·</span>
            <Link href="/guides" className="underline hover:text-neutral-900 dark:hover:text-white">
              All Free Guides
            </Link>
            <span>·</span>
            <Link href="/apps" className="underline hover:text-neutral-900 dark:hover:text-white">
              All Free Apps
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

