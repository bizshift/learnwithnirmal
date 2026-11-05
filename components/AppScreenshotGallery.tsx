'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import type { AppScreenshot } from '@/lib/bio-data';

interface AppScreenshotGalleryProps {
  screenshots: AppScreenshot[];
  appTitle: string;
}

export default function AppScreenshotGallery({
  screenshots,
  appTitle,
}: AppScreenshotGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activeScreenshot = screenshots[selectedIndex] || screenshots[0];

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  }, [screenshots.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  }, [screenshots.length]);

  // Handle escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen, handlePrev, handleNext]);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
          [ INTERACTIVE PRODUCT SCREENSHOTS ({screenshots.length}) ]
        </div>
        <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
          {String(selectedIndex + 1).padStart(2, '0')} / {String(screenshots.length).padStart(2, '0')}
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="group relative overflow-hidden border border-neutral-900 bg-neutral-950 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[3px_3px_0px_0px_#fff]">
        {/* Main Image Aspect Box */}
        <div className="relative aspect-[16/10] w-full cursor-pointer bg-neutral-900" onClick={() => setIsLightboxOpen(true)}>
          <Image
            src={activeScreenshot.url}
            alt={`${appTitle} - ${activeScreenshot.title}`}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-contain"
            priority={selectedIndex === 0}
            referrerPolicy="no-referrer"
          />

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            <span className="flex items-center gap-1.5 border border-white bg-black/80 px-3 py-1.5 font-mono text-xs font-semibold text-white shadow-[2px_2px_0px_0px_#10B981]">
              <Maximize2 className="h-3.5 w-3.5 text-[#10B981]" />
              <span>CLICK TO ZOOM FULL RESOLUTION</span>
            </span>
          </div>

          {/* Quick Zoom Trigger Button in corner */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            aria-label="Expand image to fullscreen"
            className="absolute top-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center border border-neutral-700 bg-black/80 text-white shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-800 hover:text-[#10B981]"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Prev / Next Floating Navigation Controls */}
        {screenshots.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous screenshot"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center border border-neutral-900 bg-white/90 text-black shadow-[2px_2px_0px_0px_#000] hover:bg-white hover:text-emerald-700 dark:border-neutral-100 dark:bg-black/90 dark:text-white dark:hover:bg-black"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next screenshot"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center border border-neutral-900 bg-white/90 text-black shadow-[2px_2px_0px_0px_#000] hover:bg-white hover:text-emerald-700 dark:border-neutral-100 dark:bg-black/90 dark:text-white dark:hover:bg-black"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Active Screenshot Caption & Metadata */}
        <div className="border-t border-neutral-800 bg-[#141414] p-3 sm:p-4 text-white">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-mono text-xs sm:text-sm font-bold text-emerald-400">
              {activeScreenshot.title}
            </h3>
            <span className="shrink-0 border border-emerald-500/40 bg-emerald-950/40 px-1.5 py-0.5 font-mono text-[10px] text-emerald-300">
              FIG. {String(selectedIndex + 1).padStart(2, '0')}
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
            {activeScreenshot.caption}
          </p>
        </div>
      </div>

      {/* Thumbnails Strip */}
      {screenshots.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {screenshots.map((s, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={s.url}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`group relative aspect-video overflow-hidden border text-left transition-all ${
                  isSelected
                    ? 'border-emerald-500 shadow-[2px_2px_0px_0px_#10B981] ring-1 ring-emerald-500'
                    : 'border-neutral-300 dark:border-neutral-800 opacity-70 hover:opacity-100 hover:border-neutral-900 dark:hover:border-neutral-100 shadow-[1px_1px_0px_0px_#000] dark:shadow-[1px_1px_0px_0px_#fff]'
                }`}
              >
                <Image
                  src={s.url}
                  alt={s.title}
                  fill
                  sizes="(max-width: 640px) 25vw, 150px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent" />
                <div className="absolute bottom-0.5 left-0.5 bg-black/85 px-1 py-0.2 font-mono text-[8px] text-white">
                  {idx + 1}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header Bar */}
          <div
            className="flex items-center justify-between border-b border-neutral-800 pb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="border border-emerald-500 bg-emerald-500/20 px-1.5 py-0.5 font-mono text-xs font-bold text-emerald-400">
                {appTitle}
              </span>
              <span className="font-mono text-xs text-neutral-300">
                {activeScreenshot.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-neutral-400">
                {selectedIndex + 1} / {screenshots.length}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="flex h-8 w-8 items-center justify-center border border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 hover:text-red-400"
                aria-label="Close fullscreen modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Fullscreen Image Container */}
          <div
            className="relative flex-1 my-3 flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full">
              <Image
                src={activeScreenshot.url}
                alt={`${appTitle} - ${activeScreenshot.title}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Next / Prev */}
            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous screenshot"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white bg-black/80 text-white hover:bg-white hover:text-black shadow-[2px_2px_0px_0px_#10B981]"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next screenshot"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white bg-black/80 text-white hover:bg-white hover:text-black shadow-[2px_2px_0px_0px_#10B981]"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Footer Caption */}
          <div
            className="border-t border-neutral-800 pt-2 text-center font-mono text-xs text-neutral-300"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="max-w-2xl mx-auto">{activeScreenshot.caption}</p>
            <p className="mt-1 text-[10px] text-neutral-500">
              Press [Esc] to exit · Arrow keys [← / →] to navigate
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

