'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Copy,
  Check,
  ExternalLink,
  Download,
  Laptop,
  Cpu,
  HardDrive,
  Settings,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Usb,
  FolderGit2,
  ChevronRight,
  Info,
  HelpCircle,
  ShieldAlert,
  Share2,
  Monitor,
  FileCode,
  Sparkles,
} from 'lucide-react';

interface ToolItem {
  name: string;
  category: string;
  badge: string;
  url: string;
  description: string;
  commandSnippet?: string;
}

const TOOLS_LIST: ToolItem[] = [
  {
    name: 'USBToolBox',
    category: 'Hardware & Ports',
    badge: 'Windows Port Mapper',
    url: 'https://github.com/USBToolBox/tool/releases',
    description:
      'Map all physical USB 2.0, 3.0, and Type-C ports directly inside Windows. Generates UTBMap.kext to bypass the macOS 15-port limit and prevent installer freezes.',
  },
  {
    name: 'OpCore Simplify',
    category: 'EFI Generator',
    badge: 'Hardware Autodetect',
    url: 'https://github.com/lzhoang2801/OpCore-Simplify',
    description:
      'Automated script for Windows that scans your exact CPU, GPU, audio codec, and network controller to scaffold a clean OpenCore EFI with proper ACPI tables and Kexts.',
  },
  {
    name: 'Python (3.11+)',
    category: 'Runtime',
    badge: 'Required Dependency',
    url: 'https://www.python.org/downloads/',
    description:
      'The essential Windows runtime required to execute ProperTree, gibMacOS recovery tools, and OpenCore plist manipulation scripts.',
  },
  {
    name: 'ProperTree',
    category: 'Configuration',
    badge: 'Plist Editor',
    url: 'https://github.com/corpnewt/ProperTree',
    description:
      'Cross-platform GUI plist editor. Press Ctrl + Shift + R (Clean Snapshot) to automatically register all SSDTs, Drivers, and Kexts in config.plist in the correct sequence.',
  },
  {
    name: 'OpenCorePkg',
    category: 'Bootloader',
    badge: 'Official Release',
    url: 'https://github.com/acidanthera/OpenCorePkg/releases',
    description:
      'The gold-standard UEFI bootloader by Acidanthera. Supplies OpenCore.efi, BOOTx64.efi, OpenRuntime.efi, and sample configuration plists.',
  },
  {
    name: 'Rufus',
    category: 'USB Flasher',
    badge: 'Drive Prep',
    url: 'https://rufus.ie/',
    description:
      'High-speed Windows utility to format your 16 GB+ USB flash drive with a GPT partition scheme and FAT32 file system for UEFI booting.',
  },
];

interface BiosCheckItem {
  id: string;
  setting: string;
  recommended: 'DISABLE' | 'ENABLE';
  reason: string;
}

const BIOS_SETTINGS: BiosCheckItem[] = [
  {
    id: 'secure-boot',
    setting: 'Secure Boot',
    recommended: 'DISABLE',
    reason: 'OpenCore unsigned bootloader components cannot execute with Microsoft Secure Boot active.',
  },
  {
    id: 'fast-boot',
    setting: 'Fast Boot / Fast Startup',
    recommended: 'DISABLE',
    reason: 'Bypasses standard hardware initialization, causing cold boot kernel panics on macOS.',
  },
  {
    id: 'sata-mode',
    setting: 'SATA Controller Mode',
    recommended: 'ENABLE',
    reason: 'Must be set to AHCI. Intel RST / RAID modes hide internal NVMe/SATA SSDs from macOS.',
  },
  {
    id: 'uefi-mode',
    setting: 'UEFI Boot Mode',
    recommended: 'ENABLE',
    reason: 'Pure UEFI mode required. Disable CSM (Compatibility Support Module) or Legacy boot.',
  },
  {
    id: 'vt-x',
    setting: 'Intel Virtualization (VT-x / AMD-V)',
    recommended: 'ENABLE',
    reason: 'Provides hardware virtualization required for macOS system processes and security.',
  },
  {
    id: 'vt-d',
    setting: 'VT-d (Directed I/O)',
    recommended: 'DISABLE',
    reason: 'Can cause DMA transfer panics unless DisableIoMapper quirk is enabled in config.plist.',
  },
  {
    id: 'cfg-lock',
    setting: 'CFG Lock (MSR 0xE2)',
    recommended: 'DISABLE',
    reason: 'Prevents macOS from writing to power management MSRs. If unavailable, enable AppleCpuPmCfgLock in OC.',
  },
];

const TIMESTAMPS = [
  { label: '0:00 Intro & Overview', seconds: 0 },
  { label: '2:15 Hardware Checklist', seconds: 135 },
  { label: '5:30 USB Setup & Rufus', seconds: 330 },
  { label: '8:40 OpCore Simplify EFI', seconds: 520 },
  { label: '11:20 USBToolBox Mapping', seconds: 680 },
  { label: '14:10 ProperTree Config', seconds: 850 },
  { label: '17:06 OpenCore Boot (1026s)', seconds: 1026 },
  { label: '21:40 macOS Install & Post', seconds: 1300 },
];

export default function InteractiveOpenCoreMacGuide() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [checkedBios, setCheckedBios] = useState<Record<string, boolean>>({});
  const [selectedCpuGen, setSelectedCpuGen] = useState<'intel-laptop' | 'intel-desktop' | 'amd-ryzen'>('intel-laptop');
  const [activeVideoTime, setActiveVideoTime] = useState<number>(1026);

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const toggleBios = (id: string) => {
    setCheckedBios((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-[#ffcf32] selection:text-black dark:bg-[#111111] dark:text-neutral-100">
      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#111111]/95">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
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

            <button
              onClick={copyShareLink}
              className="inline-flex items-center gap-1.5 border border-neutral-900 bg-[#ffcf32] px-3 py-1 text-xs font-mono font-bold text-neutral-950 shadow-[2px_2px_0px_0px_#000] hover:bg-[#ffd84d]"
            >
              {copiedShare ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>COPIED!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>SHARE</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Guide Container */}
      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-10">
        {/* Cover Art Banner */}
        <div className="relative mb-6 aspect-video w-full overflow-hidden border border-neutral-900 bg-neutral-950 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-700 dark:shadow-[4px_4px_0px_0px_#fff]">
          <Image
            src="/assets/opencore-macos/cover.jpg"
            alt="macOS Sequoia on Windows Laptop with OpenCore"
            fill
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-white drop-shadow">
              <span className="inline-block h-2.5 w-2.5 bg-[#ffcf32]" />
              <span>OPENCORE HACKINTOSH PLAYBOOK · NIRMAL</span>
            </div>
            <span className="border border-white/20 bg-black/60 px-2 py-0.5 font-mono text-[11px] text-white backdrop-blur-sm">
              macOS Sonoma / Sequoia 15 on PC
            </span>
          </div>
        </div>

        {/* Hero Title & Description */}
        <div className="border border-neutral-900 bg-white p-6 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            <span className="border border-neutral-900 bg-[#ffcf32] px-2 py-0.5 font-bold uppercase text-neutral-950">
              OPEN-SOURCE HARDWARE
            </span>
            <span aria-hidden="true">·</span>
            <span>12 MIN READ</span>
            <span aria-hidden="true">·</span>
            <span>UPDATED FOR 2026</span>
          </div>

          <h1 className="mt-3 text-2xl font-black uppercase tracking-tight text-neutral-950 sm:text-4xl dark:text-white">
            Install macOS on Windows Laptop with OpenCore
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-neutral-700 sm:text-base dark:text-neutral-300">
            Turn your existing Windows laptop or PC into a high-performance Hackintosh running modern macOS (Sonoma &
            Sequoia 15). Follow the battle-tested, clean step-by-step workflow using <strong>OpCore Simplify</strong>,
            native Windows USB mapping with <strong>USBToolBox</strong>, <strong>ProperTree</strong>, and{' '}
            <strong>OpenCorePkg</strong>.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <div className="border border-neutral-200 bg-neutral-50 p-2.5 text-center font-mono dark:border-neutral-800 dark:bg-neutral-900/60">
              <div className="text-[10px] text-neutral-500">BOOTLOADER</div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">OpenCore 1.0+</div>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-2.5 text-center font-mono dark:border-neutral-800 dark:bg-neutral-900/60">
              <div className="text-[10px] text-neutral-500">USB SIZE</div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">16 GB+ USB 3.0</div>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-2.5 text-center font-mono dark:border-neutral-800 dark:bg-neutral-900/60">
              <div className="text-[10px] text-neutral-500">PORTS MAPPER</div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">USBToolBox Windows</div>
            </div>
            <div className="border border-neutral-200 bg-neutral-50 p-2.5 text-center font-mono dark:border-neutral-800 dark:bg-neutral-900/60">
              <div className="text-[10px] text-neutral-500">EFI BUILDER</div>
              <div className="text-xs font-bold text-neutral-900 dark:text-white">OpCore Simplify</div>
            </div>
          </div>
        </div>

        {/* 1. EMBEDDED YOUTUBE VIDEO SECTION (FIRST, AS REQUESTED) */}
        <section className="mt-8">
          <div className="border border-neutral-900 bg-neutral-950 p-4 text-white shadow-[4px_4px_0px_0px_#000] dark:border-neutral-700 dark:shadow-[4px_4px_0px_0px_#fff]">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center bg-red-600 font-mono text-xs font-bold text-white">
                  ▶
                </span>
                <div>
                  <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-neutral-200">
                    Featured Video Guide · Techy Druid
                  </h2>
                  <p className="text-[11px] text-neutral-400">
                    &ldquo;I Installed macOS Sequoia 15 on an Old Windows PC!&rdquo;
                  </p>
                </div>
              </div>
              <a
                href="https://www.youtube.com/watch?v=t9rg_W-Q9EY&t=1026s"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-[#ffcf32] hover:underline"
              >
                <span>Open in YouTube</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Responsive Iframe Container */}
            <div className="relative aspect-video w-full overflow-hidden border border-neutral-800 bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/t9rg_W-Q9EY?start=${activeVideoTime}&rel=0`}
                title="I Installed macOS Sequoia 15 on an Old Windows PC!"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>

            {/* Chapter Quick-Jump Chips */}
            <div className="mt-4">
              <div className="mb-2 text-[11px] font-mono font-semibold uppercase text-neutral-400">
                Jump to Chapter in Video:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TIMESTAMPS.map((stamp) => (
                  <button
                    key={stamp.seconds}
                    onClick={() => setActiveVideoTime(stamp.seconds)}
                    className={`border px-2.5 py-1 font-mono text-xs transition-colors ${
                      activeVideoTime === stamp.seconds
                        ? 'border-[#ffcf32] bg-[#ffcf32] font-bold text-neutral-950 shadow-[2px_2px_0px_0px_#fff]'
                        : 'border-neutral-700 bg-neutral-900 text-neutral-300 hover:border-neutral-500 hover:text-white'
                    }`}
                  >
                    {stamp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 2. REQUIRED TOOLS & DOWNLOAD LINKS GRID */}
        <section className="mt-10">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center bg-neutral-900 font-mono text-xs font-bold text-white dark:bg-white dark:text-neutral-950">
                00
              </span>
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-neutral-950 dark:text-white">
                Download Required Tools
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-500">6 Essential Packages</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS_LIST.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col justify-between border border-neutral-900 bg-white p-4 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-[3px_3px_0px_0px_#fff]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="border border-neutral-200 bg-neutral-100 px-1.5 py-0.5 font-mono text-[10px] uppercase text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
                      {tool.category}
                    </span>
                    <span className="font-mono text-[10px] font-semibold text-[#10B981]">{tool.badge}</span>
                  </div>

                  <h3 className="mt-2 text-base font-bold text-neutral-950 dark:text-white">{tool.name}</h3>

                  <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-1.5 border border-neutral-900 bg-neutral-100 py-1.5 font-mono text-xs font-bold text-neutral-900 shadow-[2px_2px_0px_0px_#000] hover:bg-[#ffcf32] hover:text-neutral-950 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:shadow-[2px_2px_0px_0px_#fff] dark:hover:bg-[#ffcf32] dark:hover:text-neutral-950"
                  >
                    <span>GET {tool.name.toUpperCase()}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. HARDWARE COMPATIBILITY CALCULATOR */}
        <section className="mt-10 border border-neutral-900 bg-white p-5 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-[#ffcf32]" />
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-neutral-950 dark:text-white">
                Hardware Compatibility Check
              </h2>
            </div>
            <span className="font-mono text-xs text-neutral-500">Pick your platform</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCpuGen('intel-laptop')}
              className={`border px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                selectedCpuGen === 'intel-laptop'
                  ? 'border-neutral-900 bg-[#ffcf32] text-neutral-950 shadow-[2px_2px_0px_0px_#000]'
                  : 'border-neutral-300 bg-white text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300'
              }`}
            >
              Intel Laptop (4th - 10th Gen)
            </button>
            <button
              onClick={() => setSelectedCpuGen('intel-desktop')}
              className={`border px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                selectedCpuGen === 'intel-desktop'
                  ? 'border-neutral-900 bg-[#ffcf32] text-neutral-950 shadow-[2px_2px_0px_0px_#000]'
                  : 'border-neutral-300 bg-white text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300'
              }`}
            >
              Intel Desktop (4th - 14th Gen)
            </button>
            <button
              onClick={() => setSelectedCpuGen('amd-ryzen')}
              className={`border px-3 py-1.5 font-mono text-xs font-bold transition-all ${
                selectedCpuGen === 'amd-ryzen'
                  ? 'border-neutral-900 bg-[#ffcf32] text-neutral-950 shadow-[2px_2px_0px_0px_#000]'
                  : 'border-neutral-300 bg-white text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300'
              }`}
            >
              AMD Ryzen (Desktop & APU)
            </button>
          </div>

          <div className="mt-4 rounded-none border border-neutral-200 bg-neutral-50 p-4 font-mono text-xs leading-relaxed dark:border-neutral-800 dark:bg-neutral-900/80">
            {selectedCpuGen === 'intel-laptop' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-neutral-950 dark:text-white">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                  <span>Sweet Spot: 8th, 9th & 10th Gen Intel Core Laptops</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  • <strong>iGPU:</strong> Intel UHD Graphics 620/630 are natively supported with full Metal acceleration.
                  <br />
                  • <strong>NVIDIA Laptop dGPU:</strong> Must be disabled via <code className="bg-neutral-200 px-1 dark:bg-neutral-800">-wegnoegpu</code> boot argument because macOS lacks Optimus switching.
                  <br />
                  • <strong>Trackpad / Keyboard:</strong> Uses <code className="bg-neutral-200 px-1 dark:bg-neutral-800">VoodooPS2Controller.kext</code> or <code className="bg-neutral-200 px-1 dark:bg-neutral-800">VoodooI2C.kext</code> for multi-touch gestures.
                </p>
              </div>
            )}

            {selectedCpuGen === 'intel-desktop' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-neutral-950 dark:text-white">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                  <span>Desktop: 4th Gen up to 14th Gen Intel Core</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  • <strong>10th Gen & older:</strong> Works natively with integrated graphics (HDMI/DisplayPort).
                  <br />
                  • <strong>11th, 12th, 13th, 14th Gen:</strong> Intel Iris Xe/UHD 770 iGPUs are NOT supported in macOS. You <strong>must</strong> have a supported dedicated AMD GPU (e.g. AMD Radeon RX 570/580/590, RX 5500/5600/5700 XT, or RX 6600/6800/6900 XT).
                </p>
              </div>
            )}

            {selectedCpuGen === 'amd-ryzen' && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-neutral-950 dark:text-white">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                  <span>AMD Ryzen: 1000 through 7000 Series</span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  • Requires <strong>AMD OS X kernel patches</strong> in <code className="bg-neutral-200 px-1 dark:bg-neutral-800">config.plist</code> (OpCore Simplify injects these automatically).
                  <br />
                  • Desktops require a supported AMD Radeon discrete GPU.
                  <br />
                  • Note: 32-bit virtualization (Docker) has specific quirks on AMD Hackintoshes.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 4. STEP-BY-STEP PLAYBOOK */}
        <div className="mt-10 space-y-6">
          <div className="border-b border-neutral-900 pb-2 dark:border-neutral-700">
            <h2 className="font-mono text-lg font-black uppercase tracking-tight text-neutral-950 dark:text-white">
              The Step-by-Step Installation Playbook
            </h2>
            <p className="text-xs font-mono text-neutral-500">Follow sequentially from Step 01 to Step 06</p>
          </div>

          {/* STEP 01 */}
          <div className="border border-neutral-900 bg-white p-5 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500">
              <span className="flex h-5 w-5 items-center justify-center bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                01
              </span>
              <span>PREPARATION & TOOLS SETUP</span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-neutral-950 dark:text-white">
              Prepare USB Drive and Download Python Runtime
            </h3>
            <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <p>
                1. <strong>Install Python:</strong> Download Python 3.11+ from <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer" className="font-mono text-[#ffcf32] underline">python.org</a>. During installation on Windows, <strong>make sure to check the box &ldquo;Add python.exe to PATH&rdquo;</strong>.
              </p>
              <p>
                2. <strong>Prepare your 16 GB+ USB drive:</strong> Plug in your flash drive. Format it using <strong>Rufus</strong> with:
              </p>
              <div className="border border-neutral-200 bg-neutral-50 p-3 font-mono text-xs dark:border-neutral-800 dark:bg-neutral-900">
                • Partition scheme: <strong>GPT</strong>
                <br />
                • Target system: <strong>UEFI (non CSM)</strong>
                <br />
                • File system: <strong>Large FAT32</strong> (or exFAT if prompted for recovery)
              </div>
            </div>
          </div>

          {/* STEP 02 */}
          <div className="border border-neutral-900 bg-white p-5 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500">
              <span className="flex h-5 w-5 items-center justify-center bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                02
              </span>
              <span>AUTOMATED EFI GENERATION</span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-neutral-950 dark:text-white">
              Generate Your EFI with OpCore Simplify
            </h3>
            <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <p>
                Rather than manually searching for dozens of individual SSDTs and Kexts, <strong>OpCore Simplify</strong> auto-detects your Windows system hardware and scaffolds the exact OpenCore structure you need:
              </p>
              <div className="border border-neutral-900 bg-neutral-950 p-3 font-mono text-xs text-neutral-200">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-1 mb-2 text-neutral-400">
                  <span>POWERSHELL / CMD</span>
                  <button
                    onClick={() => copyText('opcore-cmd', 'git clone https://github.com/lzhoang2801/OpCore-Simplify.git\ncd OpCore-Simplify\npython main.py')}
                    className="flex items-center gap-1 text-[11px] text-[#ffcf32] hover:underline"
                  >
                    {copiedKey === 'opcore-cmd' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedKey === 'opcore-cmd' ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <code>
                  git clone https://github.com/lzhoang2801/OpCore-Simplify.git<br />
                  cd OpCore-Simplify<br />
                  python main.py
                </code>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                The script outputs an <code className="bg-neutral-100 px-1 py-0.5 font-mono text-neutral-900 dark:bg-neutral-800 dark:text-neutral-200">EFI</code> folder containing <code className="bg-neutral-100 px-1 py-0.5 font-mono text-neutral-900 dark:bg-neutral-800 dark:text-neutral-200">BOOT</code> and <code className="bg-neutral-100 px-1 py-0.5 font-mono text-neutral-900 dark:bg-neutral-800 dark:text-neutral-200">OC</code> directories tailored to your CPU generation, audio codec, and network card.
              </p>
            </div>
          </div>

          {/* STEP 03 */}
          <div className="border border-neutral-900 bg-white p-5 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500">
              <span className="flex h-5 w-5 items-center justify-center bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                03
              </span>
              <span>CRITICAL USB MAPPING</span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-neutral-950 dark:text-white">
              Map USB Ports in Windows with USBToolBox
            </h3>
            <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <div className="flex items-start gap-2 border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-200">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                <span>
                  <strong>Why this step is mandatory:</strong> macOS enforces a strict 15-port limit per controller. If unmapped, your installer will hang or freeze on <code className="font-mono">Waiting on [IOUSBHostInterface]</code>.
                </span>
              </div>
              <ol className="list-decimal space-y-2 pl-4 text-xs leading-relaxed sm:text-sm">
                <li>
                  Download the latest <strong>Windows.exe</strong> from the{' '}
                  <a
                    href="https://github.com/USBToolBox/tool/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[#ffcf32] underline"
                  >
                    USBToolBox releases page
                  </a>.
                </li>
                <li>
                  Run <strong>Windows.exe</strong> as Administrator.
                </li>
                <li>
                  Press <kbd className="border bg-neutral-200 px-1 font-mono dark:bg-neutral-800">D</kbd> for <em>Discover Ports</em>.
                </li>
                <li>
                  Plug both a <strong>USB 2.0</strong> and a <strong>USB 3.0</strong> flash drive into <em>every physical port</em> on your laptop (including webcam, Bluetooth, and Type-C) to turn them green.
                </li>
                <li>
                  Press <kbd className="border bg-neutral-200 px-1 font-mono dark:bg-neutral-800">B</kbd> to go back, then <kbd className="border bg-neutral-200 px-1 font-mono dark:bg-neutral-800">S</kbd> to select ports, and press <kbd className="border bg-neutral-200 px-1 font-mono dark:bg-neutral-800">K</kbd> to build your <code className="font-mono font-bold text-neutral-900 dark:text-white">UTBMap.kext</code>.
                </li>
                <li>
                  Copy <code className="font-mono text-neutral-900 dark:text-white">UTBMap.kext</code> and the companion <code className="font-mono text-neutral-900 dark:text-white">USBToolBox.kext</code> into your <code className="font-mono">EFI/OC/Kexts/</code> folder.
                </li>
              </ol>
            </div>
          </div>

          {/* STEP 04 */}
          <div className="border border-neutral-900 bg-white p-5 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500">
              <span className="flex h-5 w-5 items-center justify-center bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                04
              </span>
              <span>CONFIG.PLIST EDITING</span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-neutral-950 dark:text-white">
              Perform Clean Snapshot with ProperTree & Set Boot-Args
            </h3>
            <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <p>
                1. Download <strong>ProperTree</strong> from GitHub and launch <code className="bg-neutral-200 px-1 font-mono text-xs dark:bg-neutral-800">ProperTree.bat</code>.
              </p>
              <p>
                2. Open your <code className="bg-neutral-200 px-1 font-mono text-xs dark:bg-neutral-800">EFI/OC/config.plist</code> file.
              </p>
              <p>
                3. Press <kbd className="border bg-neutral-200 px-1.5 py-0.5 font-mono text-xs font-bold dark:bg-neutral-800">Ctrl + Shift + R</kbd> (OC Clean Snapshot) and select your <code className="font-mono text-xs">EFI/OC</code> folder. ProperTree will automatically detect all your SSDTs, Drivers, and Kexts and register them in the exact right order.
              </p>
              <p>
                4. Navigate to <code className="font-mono text-xs">NVRAM → Add → 7C436110-AB2A-4BBB-A880-FE41995C9F82 → boot-args</code> and set:
              </p>

              {/* Copyable Boot Arguments Box */}
              <div className="border border-neutral-900 bg-neutral-950 p-3 font-mono text-xs text-neutral-100 shadow-[2px_2px_0px_0px_#000]">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-2">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400">Recommended Laptop Boot-Args</span>
                  <button
                    onClick={() => copyText('boot-args', '-v keepsyms=1 debug=0x100 alcid=1 -wegnoegpu')}
                    className="flex items-center gap-1.5 bg-[#ffcf32] px-2 py-0.5 font-bold text-neutral-950 hover:bg-[#ffd84d]"
                  >
                    {copiedKey === 'boot-args' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedKey === 'boot-args' ? 'COPIED!' : 'COPY BOOT-ARGS'}</span>
                  </button>
                </div>
                <div className="font-mono text-sm text-[#ffcf32] break-all">
                  -v keepsyms=1 debug=0x100 alcid=1 -wegnoegpu
                </div>
                <div className="mt-2 text-[11px] text-neutral-400">
                  • <code className="text-white">-v</code>: Verbose mode (shows exact loading text instead of Apple logo)
                  <br />
                  • <code className="text-white">keepsyms=1 debug=0x100</code>: Prevents instant reboots on kernel panics so you can read error logs
                  <br />
                  • <code className="text-white">alcid=1</code>: Audio layout injection (can be adjusted to 3, 11, or 13 if needed)
                  <br />
                  • <code className="text-white">-wegnoegpu</code>: Disables laptop NVIDIA/AMD dGPU to prevent freeze & battery drain
                </div>
              </div>
            </div>
          </div>

          {/* STEP 05 */}
          <div className="border border-neutral-900 bg-white p-5 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500">
              <span className="flex h-5 w-5 items-center justify-center bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                05
              </span>
              <span>UEFI / BIOS CONFIGURATION</span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-neutral-950 dark:text-white">
              Configure Laptop BIOS Settings (Checklist)
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Reboot your laptop and press <kbd className="border bg-neutral-100 px-1 font-mono text-xs dark:bg-neutral-800">F2</kbd>, <kbd className="border bg-neutral-100 px-1 font-mono text-xs dark:bg-neutral-800">Del</kbd>, or <kbd className="border bg-neutral-100 px-1 font-mono text-xs dark:bg-neutral-800">F12</kbd> to enter BIOS setup. Check each setting as you configure it:
            </p>

            <div className="mt-4 divide-y divide-neutral-200 border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
              {BIOS_SETTINGS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleBios(item.id)}
                  className="flex cursor-pointer items-start gap-3 p-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                >
                  <div className="mt-0.5">
                    <input
                      type="checkbox"
                      checked={!!checkedBios[item.id]}
                      onChange={() => {}}
                      className="h-4 w-4 rounded-none border-neutral-900 accent-[#ffcf32]"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-neutral-950 dark:text-white">
                        {item.setting}
                      </span>
                      <span
                        className={`font-mono text-[10px] font-bold px-1.5 py-0.2 ${
                          item.recommended === 'DISABLE'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                        }`}
                      >
                        {item.recommended}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 06 */}
          <div className="border border-neutral-900 bg-white p-5 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-500">
              <span className="flex h-5 w-5 items-center justify-center bg-neutral-900 text-white dark:bg-white dark:text-neutral-900">
                06
              </span>
              <span>BOOTING & INSTALLATION</span>
            </div>
            <h3 className="mt-2 text-lg font-bold text-neutral-950 dark:text-white">
              Boot OpenCore, Format with Disk Utility & Install macOS
            </h3>
            <div className="mt-3 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
              <p>
                1. Plug your USB drive into a native USB 2.0 or 3.0 port on your laptop.
              </p>
              <p>
                2. Power on and tap your boot menu hotkey (usually <kbd className="border bg-neutral-200 px-1 font-mono text-xs dark:bg-neutral-800">F12</kbd> or <kbd className="border bg-neutral-200 px-1 font-mono text-xs dark:bg-neutral-800">F11</kbd>). Select your USB drive&apos;s UEFI entry.
              </p>
              <p>
                3. In the OpenCore Boot Picker, choose <strong>macOS Base System (external)</strong>.
              </p>
              <p>
                4. Once the recovery screen appears:
              </p>
              <div className="border border-neutral-200 bg-neutral-50 p-3 font-mono text-xs dark:border-neutral-800 dark:bg-neutral-900">
                • Open <strong>Disk Utility</strong>.
                <br />
                • Click <em>View → Show All Devices</em> (top left).
                <br />
                • Select your target SSD drive or partition and click <strong>Erase</strong>.
                <br />
                • Name: <code className="font-bold text-neutral-900 dark:text-white">Macintosh HD</code>
                <br />
                • Format: <code className="font-bold text-neutral-900 dark:text-white">APFS</code>
                <br />
                • Scheme: <code className="font-bold text-neutral-900 dark:text-white">GUID Partition Map</code>
              </div>
              <p>
                5. Quit Disk Utility, click <strong>Reinstall macOS</strong>, and select <code className="font-mono">Macintosh HD</code>.
              </p>
              <p className="text-xs text-neutral-500">
                * Note: Your laptop will reboot 3 to 4 times during installation. Keep your USB plugged in. On every restart, OpenCore will automatically select the next installation stage.
              </p>
            </div>
          </div>
        </div>

        {/* 5. POST-INSTALL & TROUBLESHOOTING FAQ */}
        <section className="mt-10 border border-neutral-900 bg-white p-5 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-700 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex items-center gap-2 border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <HelpCircle className="h-4 w-4 text-[#ffcf32]" />
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-neutral-950 dark:text-white">
              Post-Install & Troubleshooting FAQ
            </h2>
          </div>

          <div className="mt-4 space-y-4">
            <div className="border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
                How do I boot without the USB drive plugged in?
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                Mount both your USB&apos;s EFI partition and your internal SSD&apos;s EFI partition (using OpenCorePkg tools or MountEFI). Then copy the entire <code className="bg-neutral-100 px-1 font-mono dark:bg-neutral-800">EFI</code> folder from your USB to your internal drive&apos;s EFI partition. You can now remove the USB drive and boot macOS directly.
              </p>
            </div>

            <div className="border-b border-neutral-100 pb-3 dark:border-neutral-800">
              <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
                How do I get battery percentage and trackpad gestures working on laptops?
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                • <strong>Battery percentage:</strong> Add <code className="bg-neutral-100 px-1 font-mono dark:bg-neutral-800">SMCBatteryManager.kext</code> (included in VirtualSMC bundle) and <code className="bg-neutral-100 px-1 font-mono dark:bg-neutral-800">ECEnabler.kext</code>.
                <br />
                • <strong>Trackpad gestures:</strong> Add <code className="bg-neutral-100 px-1 font-mono dark:bg-neutral-800">VoodooI2C.kext</code> + <code className="bg-neutral-100 px-1 font-mono dark:bg-neutral-800">VoodooI2CHID.kext</code> for multi-touch gestures.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-neutral-950 dark:text-white">
                What should I do if the screen goes black on boot?
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                On Intel laptops, add <code className="bg-neutral-100 px-1 font-mono dark:bg-neutral-800">-igfxblr</code> (backlight register fix) to your boot-args, or verify that <code className="bg-neutral-100 px-1 font-mono dark:bg-neutral-800">SSDT-PNLF.aml</code> is enabled in your ACPI folder.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA & Share Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border border-neutral-900 bg-[#ffcf32] p-4 font-mono text-neutral-950 shadow-[4px_4px_0px_0px_#000]">
          <div>
            <div className="text-xs font-black uppercase">Need help with your laptop specs?</div>
            <div className="text-[11px] text-neutral-800">
              Share your CPU generation, audio codec, and Wi-Fi model for custom EFI hints.
            </div>
          </div>
          <button
            onClick={copyShareLink}
            className="border border-neutral-950 bg-black px-4 py-2 text-xs font-bold text-white shadow-[2px_2px_0px_0px_#fff] hover:bg-neutral-800"
          >
            {copiedShare ? 'LINK COPIED!' : 'SHARE THIS GUIDE'}
          </button>
        </div>
      </main>
    </div>
  );
}
