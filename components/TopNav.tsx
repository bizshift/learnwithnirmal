'use client';

import React from 'react';
import Image from 'next/image';
import { Sun, Moon, Share2, Check, ArrowUpRight } from 'lucide-react';
import { BIO_PROFILE } from '@/lib/bio-data';

interface TopNavProps {
  activeTab: 'bio' | 'story';
  setActiveTab: (tab: 'bio' | 'story') => void;
  isDark: boolean;
  toggleTheme: () => void;
  onOpenContact: () => void;
  copiedBioLink: boolean;
  onCopyBioLink: () => void;
}

export default function TopNav({
  activeTab,
  setActiveTab,
  isDark,
  toggleTheme,
  onOpenContact,
  copiedBioLink,
  onCopyBioLink,
}: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#111111]/95">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-3 sm:px-6">
        {/* Brand with Nirmal's Avatar */}
        <button
          onClick={() => setActiveTab('bio')}
          className="group flex h-8 items-center gap-1.5 shrink-0 text-sm font-semibold tracking-tight text-neutral-900 transition-colors hover:opacity-80 dark:text-neutral-100"
          aria-label="Nirmal Bio Home"
        >
          <div className="relative h-6 w-6 overflow-hidden border border-neutral-900 bg-neutral-900 dark:border-neutral-100 shrink-0">
            <Image
              src={BIO_PROFILE.avatarUrl}
              alt="Nirmal"
              fill
              sizes="24px"
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-bold">Nirmal</span>
          <span className="pixel-spin inline-block">
            <span className="inline-block text-[#10B981] text-xs">✳</span>
          </span>
        </button>

        {/* View Switcher: Bio vs Story - Unified height, strictly single-line */}
        <nav
          className="flex h-8 items-center border border-neutral-900 bg-neutral-100 p-0.5 dark:border-neutral-700 dark:bg-neutral-900"
          aria-label="Views"
        >
          <button
            onClick={() => setActiveTab('bio')}
            className={`flex h-full items-center justify-center px-2.5 sm:px-3 text-xs font-mono font-medium whitespace-nowrap transition-all ${
              activeTab === 'bio'
                ? 'bg-white text-neutral-900 shadow-[1px_1px_0px_0px_#000] dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-[1px_1px_0px_0px_#fff]'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
            aria-pressed={activeTab === 'bio'}
          >
            <span>Bio</span>
            <span className="hidden sm:inline">&nbsp;Links</span>
          </button>
          <button
            onClick={() => setActiveTab('story')}
            className={`flex h-full items-center justify-center px-2.5 sm:px-3 text-xs font-mono font-medium whitespace-nowrap transition-all ${
              activeTab === 'story'
                ? 'bg-white text-neutral-900 shadow-[1px_1px_0px_0px_#000] dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-[1px_1px_0px_0px_#fff]'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
            aria-pressed={activeTab === 'story'}
          >
            <span>Story</span>
            <span className="hidden sm:inline">&nbsp;&amp; Work</span>
          </button>
        </nav>

        {/* Actions: Theme Toggle & Share - Unified h-8 height */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            className="pixel-press flex h-8 w-8 items-center justify-center border border-neutral-900 bg-white text-neutral-800 shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-100 dark:border-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[1px_1px_0px_0px_#fff] dark:hover:bg-neutral-800"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={onCopyBioLink}
            className="pixel-press flex h-8 w-8 sm:w-auto items-center justify-center gap-1.5 border border-neutral-900 bg-neutral-900 px-0 sm:px-2.5 text-xs font-mono text-white shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:shadow-[1px_1px_0px_0px_#fff] dark:hover:bg-neutral-200"
            title="Copy Bio Page URL"
            aria-label="Copy Bio Page URL"
          >
            {copiedBioLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-600" />
                <span className="hidden sm:inline">COPIED</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">SHARE</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
