'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Check, Copy, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { FEATURED_PRODUCT } from '@/lib/bio-data';

interface StoreBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StoreBlueprintModal({ isOpen, onClose }: StoreBlueprintModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const blueprintText = `Build Your Own Online Store for ₹0 (Blueprint by Nirmal)\n\n` +
      `THE ₹0 STACK:\n` +
      `1. Frontend: Next.js / Astro hosted on Vercel or Cloudflare Pages (Free Tier: 100GB bandwidth)\n` +
      `2. Catalog & CMS: Sanity / Supabase free tier or Google Sheets as headless database\n` +
      `3. Checkout: Razorpay Payment Links / Stripe Checkout (Pay only per-transaction, ₹0 fixed fee)\n` +
      `4. Domain: Custom domain (₹800/yr) or free .pages.dev / .vercel.app subdomain\n` +
      `5. Order Notifications: Telegram Bot / Discord Webhook (100% free instant push notifications)\n\n` +
      `SAVINGS: Save ₹3,000–₹15,000/month on Shopify/WooCommerce plugins and recurring hosting.`;

    navigator.clipboard.writeText(blueprintText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-modal-title"
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
            src="/assets/images/pixel_store_cover_1793867587659.jpg"
            alt="Pixel Art Retro Store Cover"
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
            aria-label="Close store blueprint modal"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2.5 left-4 z-10 flex items-center gap-2 font-mono text-xs font-bold text-white drop-shadow">
            <span className="inline-block h-2 w-2 bg-[#10B981]" />
            <span>₹0 E-COMMERCE BLUEPRINT</span>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">FEATURED BLUEPRINT</span>
              <span aria-hidden="true">·</span>
              <span>100% Free Stack</span>
            </div>
            <h2 id="store-modal-title" className="mt-1 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              {FEATURED_PRODUCT.title}
            </h2>
          </div>
        </div>

        {/* Lead */}
        <p className="mt-4 text-sm text-neutral-700 dark:text-neutral-300">
          {FEATURED_PRODUCT.tagline}
        </p>

        {/* Savings banner */}
        <div className="mt-4 border border-neutral-900 bg-neutral-100 p-3 font-mono text-xs text-neutral-900 dark:border-neutral-200 dark:bg-neutral-900 dark:text-neutral-100">
          <span className="font-bold">SAVINGS IMPACT: </span>
          {FEATURED_PRODUCT.savingsNote}
        </div>

        {/* Stack comparison breakdown */}
        <div className="mt-5 space-y-3">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            The 5-Pillar ₹0 Tech Stack
          </h3>

          <div className="space-y-2 text-xs">
            <div className="border border-neutral-200 p-2.5 dark:border-neutral-800">
              <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">1. Hosting & Frontend: </span>
              <span className="text-neutral-600 dark:text-neutral-400">Cloudflare Pages or Vercel (Fast edge CDN, zero monthly cost).</span>
            </div>
            <div className="border border-neutral-200 p-2.5 dark:border-neutral-800">
              <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">2. Database & Inventory: </span>
              <span className="text-neutral-600 dark:text-neutral-400">Supabase (500MB free PostgreSQL) or Google Sheets as real-time CMS.</span>
            </div>
            <div className="border border-neutral-200 p-2.5 dark:border-neutral-800">
              <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">3. Payments: </span>
              <span className="text-neutral-600 dark:text-neutral-400">Razorpay / Cashfree / Stripe Checkout (Standard 2% per txn, ₹0 maintenance).</span>
            </div>
            <div className="border border-neutral-200 p-2.5 dark:border-neutral-800">
              <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">4. Order Alerts: </span>
              <span className="text-neutral-600 dark:text-neutral-400">Free Telegram bot or Discord webhook directly pinging your phone.</span>
            </div>
            <div className="border border-neutral-200 p-2.5 dark:border-neutral-800">
              <span className="font-mono font-bold text-neutral-900 dark:text-neutral-100">5. Marketing & Analytics: </span>
              <span className="text-neutral-600 dark:text-neutral-400">Plausible self-hosted / Cloudflare Web Analytics (GDPR-ready & free).</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <button
            onClick={handleCopy}
            className="pixel-press flex items-center gap-1.5 border border-neutral-900 bg-neutral-900 px-3 py-1.5 text-xs font-mono text-white shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:shadow-[2px_2px_0px_0px_#fff] dark:hover:bg-neutral-200"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-600" />
                <span>COPIED BLUEPRINT</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>COPY ₹0 BLUEPRINT</span>
              </>
            )}
          </button>

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
