'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Github, Download } from 'lucide-react';
import { BIO_PROFILE, FREE_GUIDES, FREE_APPS, CHANNELS, GuideItem } from '@/lib/bio-data';
import {
  PixelInstagram,
  PixelYouTube,
  PixelLinkedIn,
  PixelGitHub,
} from './PixelIcons';

interface BioLinkViewProps {
  onSelectGuide: (guide: GuideItem) => void;
  onOpenStoreModal: () => void;
  onOpenPlayground: () => void;
  onOpenContact: () => void;
  onSwitchToStory: () => void;
}

export default function BioLinkView({
  onSelectGuide,
  onOpenStoreModal,
  onOpenPlayground,
  onOpenContact,
  onSwitchToStory,
}: BioLinkViewProps) {

  const getChannelPixelIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <PixelInstagram size={18} />;
      case 'YouTube':
        return <PixelYouTube size={18} />;
      case 'LinkedIn':
        return <PixelLinkedIn size={18} />;
      case 'GitHub':
        return <PixelGitHub size={18} />;
      default:
        return <ArrowUpRight className="h-4 w-4" />;
    }
  };

  const carouselRef = React.useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -150 : 150;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-3 pb-8 sm:px-6 sm:py-5 sm:pb-6">
      <div className="space-y-3 sm:space-y-4">
        {/* Bio Header - Green Studio Cutting Mat with Nirmal's Portrait */}
        <section className="relative overflow-hidden border border-[#063322] bg-[#0B4D34] p-3.5 sm:p-4 text-white shadow-[2px_2px_0px_0px_#000] dark:border-[#10B981]/40">
          {/* Cutting Mat Grid Background */}
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

          {/* Cutting Mat Ruler Coordinates (Desktop Only) */}
          <div className="pointer-events-none absolute right-3 top-2.5 hidden sm:block font-mono text-[9px] font-semibold tracking-wider text-emerald-200/50 select-none">
            GRID // 24×36 MAT
          </div>

          <div className="relative z-10 flex items-center gap-3.5 sm:gap-4">
            {/* Nirmal's Portrait Photo */}
            <div className="relative shrink-0">
              <div className="relative h-16 w-16 overflow-hidden border-2 border-white bg-neutral-900 shadow-[2px_2px_0px_0px_#000] sm:h-20 sm:w-20">
                <Image
                  src={BIO_PROFILE.avatarUrl}
                  alt="Nirmal - Creator, Designer & Builder"
                  fill
                  priority
                  sizes="(max-width: 640px) 64px, 80px"
                  className="object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 border border-black bg-[#10B981] px-1 py-0.2 font-mono text-[8px] font-bold text-black shadow-[1px_1px_0px_0px_#000]">
                ACTIVE
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-emerald-300 uppercase">
                <span>PORTFOLIO &amp; BIO</span>
                <span aria-hidden="true" className="text-emerald-400/60">·</span>
                <span>BUILDER</span>
              </div>

              <h1 className="mt-0.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
                Hey, I&apos;m Nirmal.{' '}
                <span className="pixel-spin inline-block align-middle" title="Pixel Gem">
                  <span className="text-[#6EE7B7]">✳</span>
                </span>
              </h1>

              <p className="mt-0.5 text-xs font-medium text-emerald-50 sm:text-sm">
                I make things with content, code, and AI.
              </p>

              <p className="mt-0.5 text-[11px] text-emerald-200/90">
                Sharing useful tools, free guides, and things I build.
              </p>
            </div>
          </div>

          {/* Perforated Filmstrip / Cutting Mat Bottom Ruler */}
          <div className="relative -mx-4 -mb-4 mt-3 flex items-center justify-between border-t border-emerald-900/90 bg-[#073624] px-3 py-1">
            <div className="flex items-center gap-1.5 overflow-hidden opacity-70">
              {[...Array(14)].map((_, i) => (
                <span key={i} className="inline-block h-1.5 w-2.5 bg-white/70" />
              ))}
            </div>
            <span className="font-mono text-[9px] text-emerald-300/90 tracking-widest uppercase shrink-0 pl-2">
              CREATIVE LAB
            </span>
          </div>
        </section>

        {/* Free Apps Section - Below Banner */}
        <section>
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            <span className="font-semibold text-neutral-900 uppercase dark:text-neutral-100">[ FREE APPS ]</span>
            <Link
              href="/apps"
              className="text-emerald-700 hover:underline dark:text-emerald-400 font-mono text-[10px]"
            >
              View all apps →
            </Link>
          </div>

          <div className="mt-2 grid grid-cols-4 gap-1.5 sm:gap-2">
            {FREE_APPS.map((app) => (
              <div
                key={app.id}
                className="group flex flex-col overflow-hidden border border-neutral-900 bg-white shadow-[1.5px_1.5px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[1.5px_1.5px_0px_0px_#fff]"
              >
                {/* 1:1 Cover */}
                <Link
                  href={`/app/${app.id}`}
                  className="relative aspect-square w-full overflow-hidden border-b border-neutral-900 bg-neutral-950 dark:border-neutral-800"
                  aria-label={`Open ${app.title} details`}
                >
                  <Image
                    src={app.coverImage}
                    alt={app.title}
                    fill
                    sizes="(max-width: 640px) 25vw, 120px"
                    referrerPolicy="no-referrer"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0.5 right-0.5 border border-black bg-[#10B981] px-0.5 py-0.2 font-mono text-[6.5px] sm:text-[7.5px] font-bold text-black uppercase">
                    FREE
                  </div>
                </Link>

                {/* Info & Quick Actions */}
                <div className="flex flex-1 flex-col justify-between p-1 sm:p-1.5">
                  <Link
                    href={`/app/${app.id}`}
                    className="text-[9.5px] sm:text-xs font-bold leading-tight text-neutral-900 hover:underline dark:text-neutral-100 truncate block"
                  >
                    {app.title}
                  </Link>

                  <div className="mt-0.5 flex items-center justify-between border-t border-neutral-100 pt-0.5 dark:border-neutral-800 font-mono text-[7.5px] sm:text-[8.5px]">
                    <Link
                      href={`/app/${app.id}`}
                      className="text-neutral-700 hover:underline dark:text-neutral-300 font-semibold truncate mr-0.5"
                    >
                      View →
                    </Link>
                    <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                      {app.downloadUrl && (
                        <a
                          href={app.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={app.downloadFileName}
                          title={`Direct download ${app.downloadFileName}`}
                          className="pixel-press flex items-center gap-0.5 border border-emerald-600 bg-[#10B981] px-1 py-0.5 text-[7px] sm:text-[8px] font-bold text-black shadow-[1px_1px_0px_0px_#000] hover:bg-emerald-400 dark:border-emerald-400 dark:shadow-[1px_1px_0px_0px_#fff]"
                        >
                          <Download className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
                          <span>Get</span>
                        </a>
                      )}
                      <a
                        href={app.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`View ${app.title} on GitHub`}
                        className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                      >
                        <Github className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Free Guides & Blueprints - Horizontal Carousel with View More link */}
        <section>
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            <span className="font-semibold text-neutral-900 uppercase dark:text-neutral-100">[ FREE GUIDES ]</span>
            <div className="flex items-center gap-2">
              <Link
                href="/guides"
                className="text-emerald-700 hover:underline dark:text-emerald-400 font-mono text-[10px]"
              >
                View more →
              </Link>
              <button
                onClick={() => scrollCarousel('left')}
                aria-label="Previous guide"
                className="pixel-press flex h-5 w-5 items-center justify-center border border-neutral-900 bg-white text-xs font-bold text-neutral-900 shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-100 dark:border-neutral-100 dark:bg-[#161616] dark:text-neutral-100 dark:shadow-[1px_1px_0px_0px_#fff]"
              >
                ‹
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                aria-label="Next guide"
                className="pixel-press flex h-5 w-5 items-center justify-center border border-neutral-900 bg-white text-xs font-bold text-neutral-900 shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-100 dark:border-neutral-100 dark:bg-[#161616] dark:text-neutral-100 dark:shadow-[1px_1px_0px_0px_#fff]"
              >
                ›
              </button>
            </div>
          </div>

          {/* Carousel Track */}
          <div
            ref={carouselRef}
            className="mt-2 flex overflow-x-auto gap-2.5 pb-2 pt-0.5 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FREE_GUIDES.map((guide) => (
              <div
                key={guide.id}
                className="group flex w-[128px] sm:w-[136px] shrink-0 snap-start flex-col overflow-hidden border border-neutral-900 bg-white text-left shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff] dark:hover:bg-neutral-900"
              >
                {/* 1:1 Square Pixel Art Cover */}
                <button
                  onClick={() => onSelectGuide(guide)}
                  className="relative aspect-square w-full overflow-hidden border-b border-neutral-900 bg-neutral-950 dark:border-neutral-800 text-left cursor-pointer"
                  aria-label={`Open guide modal: ${guide.title}`}
                >
                  <Image
                    src={guide.coverImage || '/assets/images/pixel_comfyui.jpg'}
                    alt={guide.title}
                    fill
                    sizes="140px"
                    referrerPolicy="no-referrer"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    style={{ imageRendering: 'pixelated' }}
                  />
                  <div className="absolute bottom-1 right-1 border border-black bg-black/85 px-1 py-0.2 font-mono text-[8px] font-bold text-white uppercase backdrop-blur-xs">
                    {guide.readTime.replace(' read', '')}
                  </div>
                </button>

                {/* Card Title & Meta Info */}
                <div className="flex flex-1 flex-col justify-between p-2">
                  <button
                    onClick={() => onSelectGuide(guide)}
                    className="text-[11px] font-bold leading-snug text-neutral-900 hover:underline dark:text-neutral-100 truncate text-left"
                  >
                    {guide.title}
                  </button>
                  <div className="mt-1.5 flex items-center justify-between font-mono text-[8.5px] text-neutral-400 dark:text-neutral-500 uppercase">
                    <span className="truncate pr-1">{guide.category}</span>
                    <Link
                      href={`/guide/${guide.id}`}
                      className="font-bold text-neutral-900 hover:underline dark:text-neutral-100"
                      title="Open individual shareable page"
                    >
                      ↗
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* 5th Card: ₹0 Online Store Blueprint */}
            <button
              onClick={onOpenStoreModal}
              className="pixel-press group flex w-[128px] sm:w-[136px] shrink-0 snap-start flex-col overflow-hidden border border-neutral-900 bg-white text-left shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff] dark:hover:bg-neutral-900 cursor-pointer"
              aria-label="Read Blueprint: Build online store for ₹0"
            >
              <div className="relative aspect-square w-full overflow-hidden border-b border-neutral-900 bg-neutral-950 dark:border-neutral-800">
                <Image
                  src="/assets/images/pixel_store.jpg"
                  alt="Online store for ₹0"
                  fill
                  sizes="140px"
                  referrerPolicy="no-referrer"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="absolute bottom-1 right-1 border border-black bg-[#10B981] px-1 py-0.2 font-mono text-[8px] font-bold text-black uppercase">
                  FREE
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between p-2">
                <div className="text-[11px] font-bold leading-snug text-neutral-900 group-hover:underline dark:text-neutral-100 truncate">
                  ₹0 Online Store
                </div>
                <div className="mt-1.5 flex items-center justify-between font-mono text-[8.5px] text-neutral-400 dark:text-neutral-500 uppercase">
                  <span className="truncate pr-1">Commerce</span>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100 group-hover:translate-x-0.5 transition-transform">
                    ↗
                  </span>
                </div>
              </div>
            </button>

            {/* 6th Card: View More Guides Link Card */}
            <Link
              href="/guides"
              className="pixel-press group flex w-[100px] shrink-0 snap-start flex-col items-center justify-center border border-dashed border-neutral-900 bg-neutral-50 p-3 text-center shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-100 dark:border-neutral-100 dark:bg-neutral-900 dark:shadow-[1px_1px_0px_0px_#fff] dark:hover:bg-neutral-800"
            >
              <span className="font-mono text-lg font-bold text-neutral-900 dark:text-neutral-100">→</span>
              <span className="mt-1 font-mono text-[9px] font-semibold text-neutral-700 dark:text-neutral-300 uppercase leading-tight">
                VIEW ALL GUIDES
              </span>
            </Link>
          </div>
        </section>

        {/* Explore Section */}
        <section>
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            <span className="font-semibold text-neutral-900 uppercase dark:text-neutral-100">[ EXPLORE ]</span>
            <span>Projects &amp; Tools</span>
          </div>

          <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <button
              onClick={onSwitchToStory}
              className="pixel-press flex items-center justify-between border border-neutral-900 bg-white px-2.5 py-2 text-left shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[1px_1px_0px_0px_#fff] dark:hover:bg-neutral-900"
            >
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 bg-[#F97316]" />
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">My work</span>
              </div>
              <span className="font-mono text-[10px] text-neutral-400">→</span>
            </button>

            <button
              onClick={onSwitchToStory}
              className="pixel-press flex items-center justify-between border border-neutral-900 bg-white px-2.5 py-2 text-left shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[1px_1px_0px_0px_#fff] dark:hover:bg-neutral-900"
            >
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 bg-[#8B5CF6]" />
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">About me</span>
              </div>
              <span className="font-mono text-[10px] text-neutral-400">→</span>
            </button>

            <button
              onClick={onOpenPlayground}
              className="pixel-press flex items-center justify-between border border-neutral-900 bg-white px-2.5 py-2 text-left shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[1px_1px_0px_0px_#fff] dark:hover:bg-neutral-900"
            >
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 bg-[#10B981]" />
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">Playground</span>
              </div>
              <span className="font-mono text-[10px] text-neutral-400">✳</span>
            </button>

            <button
              onClick={onOpenStoreModal}
              className="pixel-press flex items-center justify-between border border-neutral-900 bg-white px-2.5 py-2 text-left shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[1px_1px_0px_0px_#fff] dark:hover:bg-neutral-900"
              title="Build online store for ₹0 blueprint"
            >
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-2 bg-[#06B6D4]" />
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100">₹0 Store</span>
              </div>
              <span className="font-mono text-[10px] text-neutral-400">↗</span>
            </button>
          </div>
        </section>

        {/* Lowered Channels & Direct Contact - With Colorful Pixel Icons */}
        <section className="border-t border-neutral-200 pt-3 dark:border-neutral-800">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            <span className="font-semibold text-neutral-900 uppercase dark:text-neutral-100">[ CONNECT ]</span>
            <button
              onClick={onOpenContact}
              className="text-[#059669] hover:underline dark:text-[#34D399]"
            >
              Have an idea? Let&apos;s talk →
            </button>
          </div>

          {/* 4 Clean Channels with Colorful Pixel Icons */}
          <div className="mt-2 grid grid-cols-4 gap-2">
            {CHANNELS.map((channel) => (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-press group flex items-center justify-center gap-1.5 border border-neutral-300 bg-white py-2 text-xs font-mono text-neutral-800 shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#161616] dark:text-neutral-200 dark:shadow-[1px_1px_0px_0px_#fff] dark:hover:bg-neutral-900"
                title={`${channel.name}: ${channel.handle}`}
              >
                <span className="shrink-0">{getChannelPixelIcon(channel.platform)}</span>
                <span className="hidden sm:inline font-semibold text-neutral-800 dark:text-neutral-200">
                  {channel.name}
                </span>
              </a>
            ))}
          </div>

          {/* Minimal Footer Line */}
          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
            <span>NIRMAL · ZENTHRA STUDIOS</span>
            <a
              href={`mailto:${BIO_PROFILE.email}?subject=Hello from Instagram Bio`}
              className="hover:underline text-neutral-600 dark:text-neutral-300"
            >
              {BIO_PROFILE.email}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
