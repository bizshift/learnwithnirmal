'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Calculator,
  Layers,
  Copy,
  Check,
  TrendingDown,
  Sliders,
  Maximize2,
} from 'lucide-react';
import { BIO_PROFILE } from '@/lib/bio-data';

export default function PlaygroundPage() {
  const [activeTool, setActiveTool] = useState<'calc' | 'prompt' | 'aspect'>('calc');

  // Calculator state
  const [productPrice, setProductPrice] = useState(999);
  const [monthlyOrders, setMonthlyOrders] = useState(50);

  // Prompt state
  const [subject, setSubject] = useState('minimalist coffee shop storefront');
  const [lighting, setLighting] = useState('diffused natural daylight');
  const [style, setStyle] = useState('architectural photography, monochrome editorial');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const monthlyRevenue = productPrice * monthlyOrders;
  const yearlySaaSSavings = 5200 * 12;

  const fullPrompt = `${subject}, ${lighting}, ${style}, sharp 35mm composition, Leica camera aesthetic, hyper-clean framing, 8k --ar 16:9`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
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

          <span className="font-mono text-xs text-neutral-500 uppercase">
            NIRMAL · EXPERIMENTS LAB
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8 space-y-8">
        {/* Title Header Card */}
        <div className="border border-neutral-900 bg-white p-5 sm:p-6 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[3px_3px_0px_0px_#fff]">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            <span className="border border-neutral-900 bg-[#10B981] px-2 py-0.5 uppercase font-bold text-black">
              CREATOR PLAYGROUND
            </span>
            <span aria-hidden="true">·</span>
            <span>INTERACTIVE TOOLS</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">FREE TOOLS</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-100">
            Creator Tools &amp; Playground
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
            Mini-apps, calculators, and prompt generators built to streamline creator workflows.
          </p>

          {/* Tool Switcher Tabs */}
          <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-200 pt-4 dark:border-neutral-800">
            <button
              onClick={() => setActiveTool('calc')}
              className={`pixel-press flex items-center gap-1.5 border px-3 py-1.5 font-mono text-xs font-bold ${
                activeTool === 'calc'
                  ? 'border-neutral-900 bg-[#10B981] text-black shadow-[1.5px_1.5px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[1.5px_1.5px_0px_0px_#fff]'
                  : 'border-neutral-300 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
              }`}
            >
              <Calculator className="h-3.5 w-3.5" />
              <span>SaaS vs ₹0 Calculator</span>
            </button>

            <button
              onClick={() => setActiveTool('prompt')}
              className={`pixel-press flex items-center gap-1.5 border px-3 py-1.5 font-mono text-xs font-bold ${
                activeTool === 'prompt'
                  ? 'border-neutral-900 bg-[#10B981] text-black shadow-[1.5px_1.5px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[1.5px_1.5px_0px_0px_#fff]'
                  : 'border-neutral-300 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>AI Prompt Studio</span>
            </button>

            <button
              onClick={() => setActiveTool('aspect')}
              className={`pixel-press flex items-center gap-1.5 border px-3 py-1.5 font-mono text-xs font-bold ${
                activeTool === 'aspect'
                  ? 'border-neutral-900 bg-[#10B981] text-black shadow-[1.5px_1.5px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[1.5px_1.5px_0px_0px_#fff]'
                  : 'border-neutral-300 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Aspect Ratios Cheatsheet</span>
            </button>
          </div>
        </div>

        {/* TOOL 1: SaaS Calculator */}
        {activeTool === 'calc' && (
          <div className="border border-neutral-900 bg-white p-5 sm:p-6 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff] space-y-6">
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                SaaS Overhead vs ₹0 Stack Calculator
              </h2>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                Compare recurring subscription overhead against zero-fixed-cost edge hosting.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-xs text-neutral-500 uppercase block mb-1">
                  Product Price (₹)
                </label>
                <input
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(Number(e.target.value) || 0)}
                  className="w-full border border-neutral-400 bg-white p-2 font-mono text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-neutral-500 uppercase block mb-1">
                  Estimated Monthly Orders
                </label>
                <input
                  type="number"
                  value={monthlyOrders}
                  onChange={(e) => setMonthlyOrders(Number(e.target.value) || 0)}
                  className="w-full border border-neutral-400 bg-white p-2 font-mono text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="border border-neutral-900 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="font-mono text-[10px] text-neutral-400 uppercase">Estimated Monthly Gross</div>
                <div className="mt-1 text-2xl font-bold font-mono text-neutral-900 dark:text-neutral-100">
                  ₹{monthlyRevenue.toLocaleString('en-IN')}
                </div>
                <div className="mt-1 text-[11px] text-neutral-500">
                  Based on {monthlyOrders} orders @ ₹{productPrice} each
                </div>
              </div>

              <div className="border border-emerald-500 bg-emerald-50 p-4 dark:border-emerald-500/40 dark:bg-emerald-950/30">
                <div className="font-mono text-[10px] text-emerald-700 dark:text-emerald-300 uppercase font-bold">
                  Yearly Fixed SaaS Savings
                </div>
                <div className="mt-1 text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  ₹{yearlySaaSSavings.toLocaleString('en-IN')} / yr
                </div>
                <div className="mt-1 text-[11px] text-neutral-600 dark:text-neutral-300">
                  Saved on Shopify ($39/mo) + recurring plugin fees
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/store-blueprint"
                className="pixel-press inline-flex items-center gap-2 border border-neutral-900 bg-[#10B981] px-4 py-2 font-mono text-xs font-bold text-black shadow-[1.5px_1.5px_0px_0px_#000] hover:bg-emerald-400"
              >
                <span>READ THE FULL ₹0 BLUEPRINT GUIDE</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}

        {/* TOOL 2: Prompt Studio */}
        {activeTool === 'prompt' && (
          <div className="border border-neutral-900 bg-white p-5 sm:p-6 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff] space-y-4">
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Cinematic AI Prompt Generator
              </h2>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                Combine subject, lighting, and camera aesthetics for Midjourney, FLUX, or Stable Diffusion.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="font-mono text-xs text-neutral-500 uppercase block mb-1">
                  Subject / Scene
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-neutral-400 bg-white p-2 font-mono text-xs text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-neutral-500 uppercase block mb-1">
                  Lighting &amp; Atmosphere
                </label>
                <input
                  type="text"
                  value={lighting}
                  onChange={(e) => setLighting(e.target.value)}
                  className="w-full border border-neutral-400 bg-white p-2 font-mono text-xs text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div>
                <label className="font-mono text-xs text-neutral-500 uppercase block mb-1">
                  Style &amp; Camera Lens
                </label>
                <input
                  type="text"
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full border border-neutral-400 bg-white p-2 font-mono text-xs text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                />
              </div>
            </div>

            {/* Generated Output */}
            <div className="border border-neutral-900 bg-neutral-950 p-4 text-emerald-300 font-mono text-xs whitespace-pre-wrap select-all">
              {fullPrompt}
            </div>

            <button
              onClick={handleCopyPrompt}
              className="pixel-press flex items-center gap-1.5 border border-neutral-900 bg-[#10B981] px-4 py-2 font-mono text-xs font-bold text-black shadow-[1.5px_1.5px_0px_0px_#000] hover:bg-emerald-400"
            >
              {copiedPrompt ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>COPIED TO CLIPBOARD!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>COPY GENERATED PROMPT</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* TOOL 3: Aspect Ratios */}
        {activeTool === 'aspect' && (
          <div className="border border-neutral-900 bg-white p-5 sm:p-6 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff] space-y-4">
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Social Media Aspect Ratio Cheatsheet
              </h2>
              <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                Official export dimensions for crisp, uncompressed social uploads.
              </p>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {[
                { name: 'Instagram Portrait (Reels / Bio)', ratio: '4:5', res: '1080 × 1350 px', use: 'Feed Posts' },
                { name: 'Instagram Reels / Stories / TikTok', ratio: '9:16', res: '1080 × 1920 px', use: 'Vertical Video' },
                { name: 'YouTube / Desktop Landscape', ratio: '16:9', res: '1920 × 1080 px (or 4K)', use: 'Cinema B-Roll' },
                { name: 'Square Feed / Profile Avatar', ratio: '1:1', res: '1080 × 1080 px', use: 'Avatars & Covers' },
              ].map((ar) => (
                <div
                  key={ar.name}
                  className="flex items-center justify-between border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div>
                    <div className="font-bold text-neutral-900 dark:text-neutral-100">{ar.name}</div>
                    <div className="text-[11px] text-neutral-400">{ar.use}</div>
                  </div>
                  <div className="text-right">
                    <span className="border border-neutral-900 bg-[#10B981] px-1.5 py-0.2 text-black font-bold mr-2">
                      {ar.ratio}
                    </span>
                    <span className="text-neutral-700 dark:text-neutral-300 font-semibold">{ar.res}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-neutral-200 pt-6 text-center font-mono text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <div>Built by {BIO_PROFILE.name} · {BIO_PROFILE.studio}</div>
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

