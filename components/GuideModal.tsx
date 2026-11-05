'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Check, Copy, ExternalLink, ArrowRight, BookOpen } from 'lucide-react';
import { GuideItem } from '@/lib/bio-data';

interface GuideModalProps {
  guide: GuideItem | null;
  onClose: () => void;
}

export default function GuideModal({ guide, onClose }: GuideModalProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!guide) return null;

  const handleCopyGuide = () => {
    const textToCopy = `${guide.title}\n${guide.summary}\n\n` +
      guide.keySteps
        .map(
          (step) =>
            `${step.heading}\n` + step.points.map((p) => `• ${p}`).join('\n')
        )
        .join('\n\n');

    navigator.clipboard.writeText(textToCopy);
    setCopiedSection('all');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="pixel-box max-h-[90vh] w-full max-w-xl overflow-y-auto border border-neutral-900 bg-white p-6 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pixel Art Cover Banner */}
        <div className="relative -mx-6 -mt-6 mb-5 h-36 overflow-hidden border-b border-neutral-900 bg-neutral-950 dark:border-neutral-100">
          <Image
            src="/assets/images/pixel_ai_guides_cover_1793867589193.jpg"
            alt="Pixel Art AI Lab Cover"
            fill
            sizes="(max-width: 640px) 100vw, 600px"
            referrerPolicy="no-referrer"
            className="object-cover"
            style={{ imageRendering: 'pixelated' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="pixel-press absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center border border-white bg-black/80 text-white hover:bg-black"
            aria-label="Close guide modal"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2.5 left-4 z-10 flex items-center gap-2 font-mono text-xs font-bold text-white drop-shadow">
            <span className="inline-block h-2 w-2 bg-[#06B6D4]" />
            <span>FREE CREATOR GUIDE</span>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <span>{guide.category}</span>
              <span aria-hidden="true">·</span>
              <span>{guide.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{guide.updatedDate}</span>
            </div>
            <h2 id="guide-title" className="mt-1 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              {guide.title}
            </h2>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-4 border-l-2 border-neutral-900 pl-3 italic text-neutral-700 dark:border-neutral-100 dark:text-neutral-300">
          <p className="text-sm leading-relaxed">{guide.summary}</p>
        </div>

        {/* Steps */}
        <div className="mt-6 space-y-5">
          {guide.keySteps.map((step, idx) => (
            <div
              key={idx}
              className="border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/60"
            >
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
                {step.heading}
              </h3>
              <ul className="mt-2.5 space-y-2">
                {step.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                    <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">[{pIdx + 1}]</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Action bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyGuide}
              className="pixel-press flex items-center gap-1.5 border border-neutral-900 bg-white px-3 py-1.5 text-xs font-mono text-neutral-900 shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-100 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[2px_2px_0px_0px_#fff] dark:hover:bg-neutral-800"
            >
              {copiedSection === 'all' ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>COPY THIS GUIDE</span>
                </>
              )}
            </button>

            <Link
              href={`/guide/${guide.id}`}
              className="pixel-press inline-flex items-center gap-1 border border-neutral-300 bg-white px-3 py-1.5 text-xs font-mono text-neutral-800 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
              title="Open full standalone page to copy link"
            >
              <span>OPEN PAGE</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>

          <button
            onClick={onClose}
            className="pixel-press border border-neutral-300 bg-neutral-100 px-3 py-1.5 text-xs font-mono text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
