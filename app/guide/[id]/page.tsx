import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FREE_GUIDES, BIO_PROFILE } from '@/lib/bio-data';
import ShareGuideClient from './ShareGuideClient';
import InteractiveWindowsGuide from '@/components/InteractiveWindowsGuide';

interface GuidePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return FREE_GUIDES.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { id } = await params;
  const guide = FREE_GUIDES.find((g) => g.id === id);
  if (!guide) return { title: 'Guide Not Found' };

  return {
    title: `${guide.title} — Free Guide by Nirmal`,
    description: guide.summary,
    openGraph: {
      title: `${guide.title} — Free Guide by Nirmal`,
      description: guide.summary,
      type: 'article',
      images: [
        {
          url: guide.coverImage || '/assets/images/pixel_ai_guides_cover_1793867589193.jpg',
          width: 800,
          height: 800,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${guide.title} — Free Guide by Nirmal`,
      description: guide.summary,
      images: [guide.coverImage || '/assets/images/pixel_ai_guides_cover_1793867589193.jpg'],
    },
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { id } = await params;
  const guide = FREE_GUIDES.find((g) => g.id === id);

  if (!guide) {
    notFound();
  }

  if (guide.id === 'windows-app-beginner-guide') {
    return <InteractiveWindowsGuide />;
  }

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

      {/* Guide Content */}
      <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Cover Art Banner */}
        <div className="relative mb-6 aspect-video w-full overflow-hidden border border-neutral-900 bg-neutral-950 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[3px_3px_0px_0px_#fff]">
          <Image
            src={guide.coverImage || '/assets/images/pixel_ai_guides_cover_1793867589193.jpg'}
            alt={guide.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover"
            style={{ imageRendering: 'pixelated' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 font-mono text-xs font-bold text-white uppercase drop-shadow">
            <span className="inline-block h-2 w-2 bg-[#10B981]" />
            <span>FREE GUIDE · NIRMAL</span>
          </div>
        </div>

        {/* Header Metadata */}
        <div className="border border-neutral-900 bg-white p-5 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[3px_3px_0px_0px_#fff]">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            <span className="border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 uppercase text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
              {guide.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{guide.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{guide.updatedDate}</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-100">
            {guide.title}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
            {guide.summary}
          </p>

          {/* Client Share / Copy buttons */}
          <ShareGuideClient guide={guide} />
        </div>

        {/* Step-by-Step Sections */}
        <div className="mt-6 space-y-4">
          <div className="text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
            [ STEP-BY-STEP PLAYBOOK ]
          </div>

          {guide.keySteps.map((step, idx) => (
            <div
              key={idx}
              className="border border-neutral-300 bg-white p-5 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-800 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]"
            >
              <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                {step.heading}
              </h2>
              <ul className="mt-3 space-y-2.5">
                {step.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="shrink-0 font-mono text-neutral-400 dark:text-neutral-500">
                      [{pIdx + 1}]
                    </span>
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Author Footer */}
        <div className="mt-8 border-t border-neutral-200 pt-6 text-center font-mono text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <div>Shared by {BIO_PROFILE.name} · {BIO_PROFILE.title}</div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <Link href="/" className="underline hover:text-neutral-900 dark:hover:text-white">
              Back to Bio Links
            </Link>
            <span>·</span>
            <Link href="/guides" className="underline hover:text-neutral-900 dark:hover:text-white">
              More Free Guides
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
