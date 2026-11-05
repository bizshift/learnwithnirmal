import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowUpRight, Github, Download, Eye, Cpu, ShieldCheck } from 'lucide-react';
import { FREE_APPS, BIO_PROFILE } from '@/lib/bio-data';

export const metadata: Metadata = {
  title: 'Free Open-Source Apps — Nirmal',
  description: 'Open-source Windows tools, PC Console, Little Notes, Third Space, and Orbit built by Nirmal.',
};

export default function AppsDirectoryPage() {
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
            NIRMAL · {FREE_APPS.length} FREE APPS
          </span>
        </div>
      </header>

      {/* Directory Content */}
      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="border border-neutral-900 bg-neutral-900 p-5 sm:p-6 text-white shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[3px_3px_0px_0px_#fff]">
          <div className="font-mono text-[10px] tracking-wider text-emerald-400 uppercase">
            SOFTWARE LAB · OPEN-SOURCE REPOSITORIES
          </div>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Free Open-Source Apps
          </h1>
          <p className="mt-2 text-xs text-neutral-300 sm:text-sm">
            High-utility desktop software, hardware telemetry, and productivity systems crafted by Nirmal. 100% free, MIT/open-source, with zero subscription lock-in.
          </p>
        </div>

        {/* Apps List */}
        <div className="mt-6 space-y-6">
          {FREE_APPS.map((app, idx) => (
            <div
              key={app.id}
              className="overflow-hidden border border-neutral-900 bg-white p-4 sm:p-5 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                {/* 1:1 Cover Artwork */}
                <div className="relative aspect-square w-full sm:w-36 shrink-0 overflow-hidden border border-neutral-900 bg-neutral-950 dark:border-neutral-700">
                  <Image
                    src={app.coverImage}
                    alt={app.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 144px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1 right-1 border border-black bg-[#10B981] px-1 py-0.2 font-mono text-[8px] font-bold text-black uppercase">
                    {app.badge}
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-neutral-400 dark:text-neutral-500 uppercase">
                      <span>0{idx + 1}.</span>
                      <span>PUBLIC REPO</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {app.techSpecs?.platform || 'Windows 10/11'}
                      </span>
                    </div>

                    <Link
                      href={`/app/${app.id}`}
                      className="mt-1 block text-lg sm:text-xl font-bold text-neutral-900 hover:underline dark:text-neutral-100"
                    >
                      {app.title}
                    </Link>

                    <p className="mt-0.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                      {app.tagline}
                    </p>

                    <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                      {app.description}
                    </p>

                    {/* Tech specs quick pill tags */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5 font-mono text-[9px]">
                      {app.techSpecs && (
                        <>
                          <span className="border border-emerald-600/40 bg-emerald-50 px-1.5 py-0.5 text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/30 dark:text-emerald-300">
                            {app.techSpecs.runtime}
                          </span>
                          <span className="border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 text-neutral-700 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-300">
                            {app.techSpecs.architecture}
                          </span>
                        </>
                      )}
                      {app.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
                    <Link
                      href={`/app/${app.id}`}
                      className="pixel-press inline-flex items-center gap-1.5 border border-neutral-900 bg-neutral-900 px-3 py-1.5 text-xs font-mono font-semibold text-white shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:shadow-[1px_1px_0px_0px_#fff]"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>VIEW SCREENSHOTS &amp; SPECS</span>
                      <span>→</span>
                    </Link>

                    {app.downloadUrl && (
                      <a
                        href={app.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={app.downloadFileName}
                        className="pixel-press inline-flex items-center gap-1.5 border border-emerald-600 bg-[#10B981] px-3 py-1.5 text-xs font-mono font-bold text-black shadow-[1px_1px_0px_0px_#000] hover:bg-emerald-400 dark:border-emerald-400 dark:shadow-[1px_1px_0px_0px_#fff]"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>DOWNLOAD ({app.downloadFileName?.endsWith('.exe') ? '.exe' : '.zip'})</span>
                      </a>
                    )}

                    <a
                      href={app.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-press inline-flex items-center gap-1 border border-neutral-300 bg-white px-3 py-1.5 text-xs font-mono font-semibold text-neutral-800 shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[1px_1px_0px_0px_#fff]"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>SOURCE</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Screenshots Preview Strip */}
              {app.screenshots && app.screenshots.length > 0 && (
                <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                      [ REAL UI SCREENSHOTS — {app.screenshots.length} VIEWS ]
                    </span>
                    <Link
                      href={`/app/${app.id}`}
                      className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 hover:underline"
                    >
                      Expand all in high-res →
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {app.screenshots.slice(0, 4).map((shot) => (
                      <Link
                        key={shot.url}
                        href={`/app/${app.id}`}
                        className="group/shot relative aspect-[16/10] overflow-hidden border border-neutral-200 bg-neutral-900 shadow-[1px_1px_0px_0px_#000] dark:border-neutral-800 hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors"
                      >
                        <Image
                          src={shot.url}
                          alt={shot.title}
                          fill
                          sizes="(max-width: 640px) 50vw, 180px"
                          className="object-cover transition-transform group-hover/shot:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                        <div className="absolute bottom-1 left-1.5 right-1.5 font-mono text-[9px] text-white truncate drop-shadow">
                          {shot.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-8 border-t border-neutral-200 pt-6 text-center font-mono text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <div>Built with care by {BIO_PROFILE.name} · {BIO_PROFILE.studio}</div>
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
