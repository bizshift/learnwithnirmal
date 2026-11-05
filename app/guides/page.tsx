import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { FREE_GUIDES, BIO_PROFILE } from '@/lib/bio-data';

export const metadata: Metadata = {
  title: 'Free Guides & Playbooks — Nirmal',
  description: 'Curated technical playbooks, ComfyUI optimization guides, free AI video tools, and open-source stacks by Nirmal.',
};

export default function GuidesDirectoryPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#111111] dark:text-neutral-100">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#111111]/95">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white"
          >
            <span>←</span>
            <span>BACK TO BIO</span>
          </Link>

          <span className="font-mono text-xs text-neutral-500 uppercase">
            NIRMAL · GUIDES
          </span>
        </div>
      </header>

      {/* Directory Content */}
      <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="border border-neutral-900 bg-[#0B4D34] p-5 text-white shadow-[3px_3px_0px_0px_#000] dark:border-[#10B981]/50">
          <div className="font-mono text-[10px] tracking-wider text-emerald-300 uppercase">
            KNOWLEDGE BASE · FREE ACCESS
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Free Guides &amp; Playbooks
          </h1>
          <p className="mt-2 text-xs text-emerald-100 sm:text-sm">
            Battle-tested configurations, AI workflows, and zero-subscription tooling guides. Share any individual guide directly via its link.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="mt-6 space-y-4">
          {FREE_GUIDES.map((guide, idx) => (
            <div
              key={guide.id}
              className="group overflow-hidden border border-neutral-900 bg-white p-4 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative aspect-square w-full sm:w-28 shrink-0 overflow-hidden border border-neutral-900 bg-neutral-950 dark:border-neutral-700">
                  <Image
                    src={guide.coverImage || '/assets/images/pixel_comfyui.jpg'}
                    alt={guide.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 112px"
                    className="object-cover"
                    style={{ imageRendering: 'pixelated' }}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1 right-1 border border-black bg-black/80 px-1 py-0.2 font-mono text-[8px] font-bold text-white uppercase">
                    {guide.readTime}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400 dark:text-neutral-500 uppercase">
                      <span>0{idx + 1}.</span>
                      <span>{guide.category}</span>
                      <span>·</span>
                      <span>{guide.updatedDate}</span>
                    </div>

                    <Link
                      href={`/guide/${guide.id}`}
                      className="mt-1 block text-lg font-bold text-neutral-900 hover:underline dark:text-neutral-100"
                    >
                      {guide.title}
                    </Link>

                    <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {guide.summary}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <Link
                      href={`/guide/${guide.id}`}
                      className="pixel-press inline-flex items-center gap-1 border border-neutral-900 bg-neutral-900 px-3 py-1 text-xs font-mono font-semibold text-white shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:shadow-[1px_1px_0px_0px_#fff]"
                    >
                      <span>READ GUIDE</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-neutral-200 pt-6 text-center font-mono text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <div>Shared by {BIO_PROFILE.name} · {BIO_PROFILE.studio}</div>
          <div className="mt-2">
            <Link href="/" className="underline hover:text-neutral-900 dark:hover:text-white">
              Back to Main Instagram Bio
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
