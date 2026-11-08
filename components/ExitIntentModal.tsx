'use client';

import React from 'react';
import Image from 'next/image';
import { X, Tag, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function ExitIntentModal() {
  const { isExitIntentOpen, setIsExitIntentOpen, items, applyCoupon, setIsCartOpen } = useCart();

  if (!isExitIntentOpen || items.length === 0) return null;

  const handleApplyDiscountAndOpen = () => {
    applyCoupon('COMEBACK15');
    setIsExitIntentOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
      onClick={() => setIsExitIntentOpen(false)}
    >
      <div
        className="relative w-full max-w-lg border-2 border-neutral-900 bg-white p-6 shadow-[6px_6px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[6px_6px_0px_0px_#fff]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setIsExitIntentOpen(false)}
          className="pixel-press absolute right-3 top-3 flex h-8 w-8 items-center justify-center border border-neutral-900 bg-white text-black hover:bg-neutral-100 dark:border-neutral-100 dark:bg-black dark:text-white"
          aria-label="Close discount modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Top Tagline */}
        <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
          <Zap className="h-3.5 w-3.5" />
          <span>EXCLUSIVE RECOVERY INCENTIVE</span>
        </div>

        {/* Headline */}
        <h2
          id="exit-modal-title"
          className="mt-2 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-100"
        >
          Wait! Don&apos;t leave your cart behind.
        </h2>

        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          You have <strong className="font-semibold text-neutral-900 dark:text-white">{items.length} item(s)</strong> reserved in your cart. Take an instant <strong className="text-emerald-600 dark:text-emerald-400">15% OFF</strong> your entire order if you complete checkout now.
        </p>

        {/* Coupon Code Callout Box */}
        <div className="mt-4 border-2 border-dashed border-emerald-500 bg-emerald-50 p-4 dark:border-emerald-500/40 dark:bg-emerald-950/40">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">
                DISCOUNT VOUCHER CODE
              </div>
              <div className="font-mono text-2xl font-black tracking-wider text-emerald-700 dark:text-emerald-400 mt-0.5">
                COMEBACK15
              </div>
            </div>
            <div className="border border-emerald-600 bg-emerald-600 px-2.5 py-1 font-mono text-xs font-bold text-white uppercase shadow-[1px_1px_0px_0px_#000]">
              15% OFF
            </div>
          </div>
          <div className="mt-2 text-[11px] text-emerald-800 dark:text-emerald-300 font-mono">
            Automatically applies at checkout · Valid for this session
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button
            onClick={handleApplyDiscountAndOpen}
            className="pixel-press flex flex-1 items-center justify-center gap-2 border border-emerald-600 bg-[#10B981] px-5 py-3 font-mono text-xs font-bold text-black shadow-[3px_3px_0px_0px_#000] hover:bg-emerald-400 dark:border-emerald-400 dark:shadow-[3px_3px_0px_0px_#fff]"
          >
            <span>APPLY 15% &amp; COMPLETE ORDER</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsExitIntentOpen(false)}
            className="pixel-press border border-neutral-300 bg-neutral-100 px-4 py-3 font-mono text-xs font-semibold text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
          >
            No thanks, I&apos;ll pay full price
          </button>
        </div>

        {/* Guarantee note */}
        <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>100% Secure Checkout · Instant Digital Access Delivered</span>
        </div>
      </div>
    </div>
  );
}
