'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Sparkles, Terminal, Mail, Check, Layers } from 'lucide-react';
import { BIO_PROFILE, WHAT_I_DO, WHY_WORK_WITH_ME, ABOUT_ME_PARAGRAPHS } from '@/lib/bio-data';

interface StoryViewProps {
  onSwitchToBio: () => void;
  onOpenGuides: () => void;
  onOpenContact: () => void;
}

export default function StoryView({
  onSwitchToBio,
  onOpenGuides,
  onOpenContact,
}: StoryViewProps) {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
      {/* Pixel Art Creator Studio Cover */}
      <div className="relative mb-6 h-36 w-full overflow-hidden border border-neutral-900 bg-neutral-950 sm:h-48 dark:border-neutral-100 shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff]">
        <Image
          src="/assets/images/pixel_creator_studio_1793867589555.jpg"
          alt="Pixel Art Creator Studio"
          fill
          sizes="(max-width: 640px) 100vw, 700px"
          referrerPolicy="no-referrer"
          className="object-cover"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2 font-mono text-xs font-bold text-white drop-shadow">
          <span className="inline-block h-2 w-2 bg-[#F97316]" />
          <span>ZENTHRA STUDIOS · RETRO CREATIVE LAB</span>
        </div>
      </div>

      {/* Title & Headline - Green Cutting Mat */}
      <section className="relative overflow-hidden border border-[#063322] bg-[#0B4D34] p-5 text-white shadow-[3px_3px_0px_0px_#000] dark:border-[#10B981]/40">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.16) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.16) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
          }}
        />

        <div className="pointer-events-none absolute right-3 top-3 hidden sm:block font-mono text-[9px] font-semibold tracking-wider text-emerald-200/50 select-none">
          STUDIO MAT // 01
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="relative shrink-0">
            <div className="relative h-18 w-18 sm:h-22 sm:w-22 overflow-hidden border-2 border-white bg-neutral-900 shadow-[2px_2px_0px_0px_#000]">
              <Image
                src={BIO_PROFILE.avatarUrl}
                alt="Nirmal"
                fill
                priority
                sizes="(max-width: 640px) 72px, 88px"
                className="object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 border border-black bg-[#10B981] px-1 py-0.2 font-mono text-[8px] font-bold text-black shadow-[1px_1px_0px_0px_#000]">
              MAKER
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-emerald-300 uppercase">
              <span>PORTFOLIO</span>
              <span aria-hidden="true" className="text-emerald-400/60">·</span>
              <span>NIRMAL</span>
              <span aria-hidden="true" className="text-emerald-400/60">·</span>
              <span>CREATOR / BUILDER</span>
            </div>

            <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
              I make ideas real.{' '}
              <span className="pixel-spin inline-block align-middle">
                <span className="text-[#6EE7B7]">✳</span>
              </span>
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-emerald-100">
              From a video people remember to a website people use — I work across content, design, technology, and marketing to turn ideas into something useful.
            </p>

            {/* Action strip */}
            <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs">
              <button
                onClick={() => {
                  const el = document.getElementById('what-i-do');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="pixel-press border border-white bg-white px-3.5 py-1.5 font-bold text-[#0B4D34] shadow-[2px_2px_0px_0px_#000] hover:bg-emerald-50"
              >
                EXPLORE MY WORK ↓
              </button>

              <span className="text-emerald-300/60">·</span>

              <button
                onClick={onSwitchToBio}
                className="pixel-press border border-emerald-300/40 bg-emerald-950/60 px-3.5 py-1.5 text-emerald-100 shadow-[2px_2px_0px_0px_#000] hover:bg-emerald-900"
              >
                GET MY FREE GUIDES ↗
              </button>
            </div>
          </div>
        </div>

        {/* Perforated Filmstrip / Cutting Mat Bottom Ruler */}
        <div className="relative -mx-5 -mb-5 mt-4 flex items-center justify-between border-t border-emerald-900/90 bg-[#073624] px-4 py-1.5">
          <div className="flex items-center gap-1.5 overflow-hidden opacity-70">
            {[...Array(16)].map((_, i) => (
              <span key={i} className="inline-block h-1.5 w-3 bg-white/70" />
            ))}
          </div>
          <span className="font-mono text-[9px] text-emerald-300/90 tracking-widest uppercase shrink-0 pl-2">
            DESIGN &amp; CODE SYSTEM
          </span>
        </div>
      </section>

      {/* What I do */}
      <section id="what-i-do" className="mt-10 border-b border-neutral-200 pb-10 dark:border-neutral-800">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            [ WHAT I DO ]
          </span>
          <span className="text-[11px]">Core Capabilities</span>
        </div>

        <div className="mt-4 grid grid-cols-1 divide-y divide-neutral-200 border border-neutral-300 sm:grid-cols-2 sm:divide-x sm:divide-y-0 dark:divide-neutral-800 dark:border-neutral-800">
          {WHAT_I_DO.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/40 ${
                idx >= 2 ? 'sm:border-t sm:border-neutral-200 sm:dark:border-neutral-800' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500">
                  0{idx + 1}.
                </span>
                <span className="font-mono text-[11px] text-neutral-400 uppercase">
                  {item.pillar.replace('.', '')}
                </span>
              </div>
              <h2 className="mt-2 text-base font-bold text-neutral-900 dark:text-neutral-100">
                {item.pillar}
              </h2>
              <p className="mt-1.5 text-xs font-medium leading-relaxed text-neutral-700 dark:text-neutral-300">
                {item.description}
              </p>
              <p className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why work with me? */}
      <section className="mt-10 border-b border-neutral-200 pb-10 dark:border-neutral-800">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            [ WHY WORK WITH ME? ]
          </span>
          <span className="text-[11px]">Philosophy</span>
        </div>

        <div className="mt-4 space-y-3">
          {WHY_WORK_WITH_ME.map((item, idx) => (
            <div
              key={idx}
              className="border border-neutral-300 bg-white p-5 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-800 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]"
            >
              <div className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {item.title}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About me */}
      <section className="mt-10 border-b border-neutral-200 pb-10 dark:border-neutral-800">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            [ ABOUT ME ]
          </span>
          <span className="text-[11px]">Background</span>
        </div>

        <div className="mt-4 border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/60">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden border-2 border-neutral-900 bg-neutral-900 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[3px_3px_0px_0px_#fff]">
              <Image
                src={BIO_PROFILE.avatarUrl}
                alt="Nirmal portrait"
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-1 left-1 border border-black bg-[#10B981] px-1 py-0.2 font-mono text-[8px] font-bold text-black">
                NIRMAL
              </div>
            </div>

            <div className="flex-1 space-y-3 text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
              {ABOUT_ME_PARAGRAPHS.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-neutral-200 pt-4 text-xs font-mono dark:border-neutral-800">
            <div>
              <span className="text-neutral-400 uppercase">STUDIO:</span>{' '}
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">Zenthra Studios</span>
            </div>
            <div>
              <span className="text-neutral-400 uppercase">STATUS:</span>{' '}
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">Active Building</span>
            </div>
          </div>
        </div>
      </section>

      {/* Let's make something useful. */}
      <section className="mt-10">
        <div className="border border-neutral-900 bg-white p-6 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[3px_3px_0px_0px_#fff]">
          <div className="font-mono text-xs font-semibold text-neutral-500 uppercase dark:text-neutral-400">
            NEXT STEP
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Let&apos;s make something useful.
          </h2>
          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
            Have an idea, a brand, or a problem worth solving?
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 font-mono text-xs">
            <button
              onClick={onOpenContact}
              className="pixel-press border border-neutral-900 bg-neutral-900 px-4 py-2 font-semibold text-white shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:shadow-[2px_2px_0px_0px_#fff]"
            >
              LET&apos;S TALK →
            </button>
            <button
              onClick={onSwitchToBio}
              className="pixel-press border border-neutral-300 bg-neutral-100 px-4 py-2 text-neutral-800 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
            >
              BACK TO BIO LINKS ↗
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 pb-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-600">
        <div>NIRMAL · CREATOR, DESIGNER &amp; BUILDER · 2026</div>
      </footer>
    </div>
  );
}
