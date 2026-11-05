import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  ArrowUpRight,
  Github,
  Download,
  Terminal,
  ShieldCheck,
  Cpu,
  HardDrive,
  FileCode,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { FREE_APPS, BIO_PROFILE } from '@/lib/bio-data';
import ShareAppClient from './ShareAppClient';
import AppScreenshotGallery from '@/components/AppScreenshotGallery';

interface AppPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return FREE_APPS.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: AppPageProps): Promise<Metadata> {
  const { id } = await params;
  const app = FREE_APPS.find((a) => a.id === id);
  if (!app) return { title: 'App Not Found' };

  return {
    title: `${app.title} — Free Open-Source App by Nirmal`,
    description: `${app.tagline}. ${app.description}`,
    openGraph: {
      title: `${app.title} — Free App by Nirmal`,
      description: app.tagline,
      type: 'website',
      images: [
        {
          url: app.coverImage,
          width: 800,
          height: 800,
          alt: app.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${app.title} — Free App by Nirmal`,
      description: app.tagline,
      images: [app.coverImage],
    },
  };
}

export default async function AppPage({ params }: AppPageProps) {
  const { id } = await params;
  const app = FREE_APPS.find((a) => a.id === id);

  if (!app) {
    notFound();
  }

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

          <div className="flex items-center gap-3">
            <Link
              href="/apps"
              className="border border-neutral-300 bg-white px-2.5 py-1 text-xs font-mono text-neutral-700 shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:shadow-[1px_1px_0px_0px_#fff]"
            >
              ALL APPS ({FREE_APPS.length})
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8 space-y-8">
        {/* Cover Hero Banner */}
        <div className="relative aspect-video w-full overflow-hidden border border-neutral-900 bg-neutral-950 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[3px_3px_0px_0px_#fff]">
          <Image
            src={app.bannerImage || app.coverImage}
            alt={app.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 font-mono text-xs font-bold text-white uppercase drop-shadow">
            <span className="inline-block h-2 w-2 bg-[#10B981]" />
            <span>OPEN-SOURCE SOFTWARE · NIRMAL CREATIVE LAB</span>
          </div>
        </div>

        {/* Header Metadata & Primary Actions */}
        <div className="border border-neutral-900 bg-white p-5 sm:p-6 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[3px_3px_0px_0px_#fff]">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            <span className="border border-neutral-900 bg-[#10B981] px-2 py-0.5 uppercase font-bold text-black">
              {app.badge}
            </span>
            <span aria-hidden="true">·</span>
            <span>PUBLIC REPO</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% FREE</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-100">
            {app.title}
          </h1>

          <p className="mt-1 text-sm font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            {app.tagline}
          </p>

          <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
            {app.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {app.tags.map((tag) => (
              <span
                key={tag}
                className="border border-neutral-300 bg-neutral-100 px-2.5 py-0.5 font-mono text-xs text-neutral-800 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Strip: Direct Download, View Source, Share */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            {app.downloadUrl && (
              <a
                href={app.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download={app.downloadFileName}
                className="pixel-press inline-flex items-center gap-2 border border-emerald-600 bg-[#10B981] px-4 py-2 font-mono text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000] hover:bg-emerald-400 dark:border-emerald-400 dark:shadow-[2px_2px_0px_0px_#fff]"
              >
                <Download className="h-4 w-4" />
                <span>DIRECT DOWNLOAD ({app.downloadFileName})</span>
              </a>
            )}

            <a
              href={app.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-press inline-flex items-center gap-2 border border-neutral-900 bg-neutral-900 px-4 py-2 font-mono text-xs font-semibold text-white shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:shadow-[2px_2px_0px_0px_#fff]"
            >
              <Github className="h-4 w-4" />
              <span>VIEW SOURCE ON GITHUB</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <ShareAppClient appTitle={app.title} githubUrl={app.githubUrl} />
          </div>
        </div>

        {/* Product Screenshot Gallery */}
        {app.screenshots && app.screenshots.length > 0 && (
          <section>
            <AppScreenshotGallery
              screenshots={app.screenshots}
              appTitle={app.title}
            />
          </section>
        )}

        {/* Technical Specifications Grid */}
        {app.techSpecs && (
          <section className="space-y-3">
            <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
              [ TECHNICAL SPECIFICATIONS ]
            </div>

            <div className="overflow-hidden border border-neutral-900 bg-white shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
              <div className="grid grid-cols-1 divide-y divide-neutral-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 dark:divide-neutral-800">
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <Cpu className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono text-[11px] text-neutral-400 uppercase">Operating System</div>
                      <div className="font-mono text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                        {app.techSpecs.platform}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <FileCode className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono text-[11px] text-neutral-400 uppercase">Runtime / Engine</div>
                      <div className="font-mono text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                        {app.techSpecs.runtime}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono text-[11px] text-neutral-400 uppercase">Architecture</div>
                      <div className="font-mono text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                        {app.techSpecs.architecture}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <HardDrive className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono text-[11px] text-neutral-400 uppercase">Storage &amp; Privacy</div>
                      <div className="font-mono text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                        {app.techSpecs.storage}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-mono text-[11px] text-neutral-400 uppercase">License</div>
                      <div className="font-mono text-xs font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">
                        {app.techSpecs.license}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Key Features & Architecture */}
        <section className="space-y-3">
          <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
            [ ARCHITECTURE &amp; KEY CAPABILITIES ]
          </div>

          <div className="border border-neutral-900 bg-white p-5 sm:p-6 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              Core Feature Breakdown
            </h2>
            <ul className="mt-4 space-y-3">
              {app.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <span className="shrink-0 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    [0{idx + 1}]
                  </span>
                  <span className="leading-relaxed">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quick Start / How to Run Section */}
        <section className="space-y-3">
          <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
            [ HOW TO RUN &amp; BUILD FROM SOURCE ]
          </div>

          <div className="border border-neutral-900 bg-neutral-950 p-5 text-white shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[2px_2px_0px_0px_#fff]">
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400">
              <Terminal className="h-4 w-4" />
              <span>TERMINAL / QUICK START</span>
            </div>

            <div className="mt-3 space-y-4 font-mono text-xs">
              <div>
                <p className="text-neutral-400 uppercase text-[10px]">Method 1: Direct Executable (Recommended)</p>
                <p className="mt-1 text-neutral-200 font-sans text-xs">
                  Download the compiled standalone executable, extract or double-click to run. No sign-up or accounts required.
                </p>
                {app.downloadUrl && (
                  <div className="mt-2">
                    <a
                      href={app.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download={app.downloadFileName}
                      className="inline-flex items-center gap-1.5 border border-emerald-500 bg-[#10B981] px-3 py-1.5 text-xs font-bold text-black hover:bg-emerald-400"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download {app.downloadFileName}</span>
                    </a>
                  </div>
                )}
              </div>

              <div className="border-t border-neutral-800 pt-3">
                <p className="text-neutral-400 uppercase text-[10px]">Method 2: Clone &amp; Build from Source</p>
                <div className="mt-1.5 overflow-x-auto rounded-none border border-neutral-800 bg-[#0d0d0d] p-3 text-emerald-300">
                  <code>
                    git clone {app.githubUrl}.git<br />
                    cd {app.id}<br />
                    {app.techSpecs?.runtime.includes('.NET')
                      ? 'dotnet build -c Release'
                      : 'npm install && npm run build'}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Apps Navigation */}
        <section className="space-y-3 pt-2">
          <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
            [ EXPLORE MORE TOOLS BY NIRMAL ]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {FREE_APPS.filter((a) => a.id !== app.id).map((otherApp) => (
              <Link
                key={otherApp.id}
                href={`/app/${otherApp.id}`}
                className="group border border-neutral-900 bg-white p-3 shadow-[1.5px_1.5px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#161616] dark:shadow-[1.5px_1.5px_0px_0px_#fff]"
              >
                <div className="relative aspect-video w-full overflow-hidden border border-neutral-900 bg-neutral-950 mb-2">
                  <Image
                    src={otherApp.coverImage}
                    alt={otherApp.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 220px"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 truncate">
                  {otherApp.title}
                </div>
                <p className="font-mono text-[10px] text-neutral-500 truncate mt-0.5">
                  {otherApp.tagline}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Author Footer */}
        <footer className="border-t border-neutral-200 pt-6 text-center font-mono text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <div>Built with passion by {BIO_PROFILE.name} · {BIO_PROFILE.studio}</div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <Link href="/" className="underline hover:text-neutral-900 dark:hover:text-white">
              Back to Bio Links
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
