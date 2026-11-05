'use client';

import React, { useState } from 'react';
import { X, Sparkles, Calculator, Layers, Copy, Check } from 'lucide-react';

interface PlaygroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlaygroundModal({ isOpen, onClose }: PlaygroundModalProps) {
  const [activeTool, setActiveTool] = useState<'calc' | 'prompt' | 'aspect'>('calc');

  // Calculator state
  const [productPrice, setProductPrice] = useState(999);
  const [monthlyOrders, setMonthlyOrders] = useState(50);

  // Prompt state
  const [subject, setSubject] = useState('minimalist coffee shop storefront');
  const [lighting, setLighting] = useState('diffused natural daylight');
  const [style, setStyle] = useState('architectural photography, monochrome editorial');
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  if (!isOpen) return null;

  // Calculation:
  // Shopify: $39/mo (~₹3,200) + 2% transaction fee + apps (~₹2,000/mo) = ~₹5,200/mo fixed
  // ₹0 Stack: ₹0 monthly hosting (Vercel/Cloudflare Pages) + 2% payment gateway fee = ₹0 fixed
  const monthlyRevenue = productPrice * monthlyOrders;
  const yearlySaaSSavings = (5200 * 12);

  const fullPrompt = `${subject}, ${lighting}, ${style}, sharp 35mm composition, Leica camera aesthetic, hyper-clean framing, 8k --ar 16:9`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(fullPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="playground-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="pixel-box max-h-[90vh] w-full max-w-xl overflow-y-auto border border-neutral-900 bg-white p-6 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <span>EXPERIMENTS</span>
              <span aria-hidden="true">·</span>
              <span>NIRMAL LAB</span>
            </div>
            <h2 id="playground-title" className="mt-1 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Interactive Playground
            </h2>
          </div>
          <button
            onClick={onClose}
            className="pixel-press flex h-8 w-8 items-center justify-center border border-neutral-300 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            aria-label="Close playground modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tool selector */}
        <div className="mt-4 flex border border-neutral-200 p-0.5 dark:border-neutral-800">
          <button
            onClick={() => setActiveTool('calc')}
            className={`flex-1 py-1.5 text-xs font-mono transition-colors ${
              activeTool === 'calc'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            ₹0 Stack Calc
          </button>
          <button
            onClick={() => setActiveTool('prompt')}
            className={`flex-1 py-1.5 text-xs font-mono transition-colors ${
              activeTool === 'prompt'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            Prompt Lab
          </button>
          <button
            onClick={() => setActiveTool('aspect')}
            className={`flex-1 py-1.5 text-xs font-mono transition-colors ${
              activeTool === 'aspect'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200'
            }`}
          >
            Aspect Dimensions
          </button>
        </div>

        {/* Content by active tool */}
        {activeTool === 'calc' && (
          <div className="mt-5 space-y-4">
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Calculate how much recurring capital you save by deploying the ₹0 stack instead of legacy commerce platforms:
            </p>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-mono">
                  <label htmlFor="prod-price" className="text-neutral-600 dark:text-neutral-400">Average Order Value (₹)</label>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">₹{productPrice}</span>
                </div>
                <input
                  id="prod-price"
                  type="range"
                  min="299"
                  max="4999"
                  step="100"
                  value={productPrice}
                  onChange={(e) => setProductPrice(Number(e.target.value))}
                  className="mt-1 w-full accent-neutral-900 dark:accent-neutral-100"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono">
                  <label htmlFor="order-count" className="text-neutral-600 dark:text-neutral-400">Monthly Orders</label>
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">{monthlyOrders} orders/mo</span>
                </div>
                <input
                  id="order-count"
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={monthlyOrders}
                  onChange={(e) => setMonthlyOrders(Number(e.target.value))}
                  className="mt-1 w-full accent-neutral-900 dark:accent-neutral-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border border-neutral-900 bg-neutral-50 p-4 dark:border-neutral-100 dark:bg-neutral-900">
              <div>
                <div className="font-mono text-[11px] text-neutral-500 uppercase">Monthly Volume</div>
                <div className="mt-1 text-base font-bold font-mono text-neutral-900 dark:text-neutral-100">
                  ₹{monthlyRevenue.toLocaleString('en-IN')}
                </div>
              </div>
              <div>
                <div className="font-mono text-[11px] text-neutral-500 uppercase">1-Year Savings</div>
                <div className="mt-1 text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  ₹{yearlySaaSSavings.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTool === 'prompt' && (
          <div className="mt-5 space-y-3">
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Structured generator to turn raw ideas into high-coherence prompts for Midjourney / Flux / Wan2.1:
            </p>

            <div>
              <label htmlFor="prompt-subject" className="block font-mono text-xs text-neutral-600 dark:text-neutral-400">Subject</label>
              <input
                id="prompt-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 w-full border border-neutral-300 p-2 text-xs font-mono text-neutral-900 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>

            <div>
              <label htmlFor="prompt-lighting" className="block font-mono text-xs text-neutral-600 dark:text-neutral-400">Lighting / Atmosphere</label>
              <input
                id="prompt-lighting"
                type="text"
                value={lighting}
                onChange={(e) => setLighting(e.target.value)}
                className="mt-1 w-full border border-neutral-300 p-2 text-xs font-mono text-neutral-900 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              />
            </div>

            <div className="border border-neutral-900 bg-neutral-50 p-3 font-mono text-xs text-neutral-800 dark:border-neutral-100 dark:bg-neutral-900 dark:text-neutral-200">
              <span className="font-bold">OUTPUT: </span>
              {fullPrompt}
            </div>

            <button
              onClick={handleCopyPrompt}
              className="pixel-press flex items-center gap-1.5 border border-neutral-900 bg-neutral-900 px-3 py-1.5 text-xs font-mono text-white shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:shadow-[2px_2px_0px_0px_#fff]"
            >
              {copiedPrompt ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-600" />
                  <span>COPIED PROMPT</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>COPY PROMPT</span>
                </>
              )}
            </button>
          </div>
        )}

        {activeTool === 'aspect' && (
          <div className="mt-5 space-y-3">
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              Clean reference dimensions for zero blur or cropping across social channels:
            </p>

            <div className="divide-y divide-neutral-200 border border-neutral-200 text-xs dark:divide-neutral-800 dark:border-neutral-800">
              <div className="flex justify-between p-2.5">
                <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">Instagram Reel / Story</span>
                <span className="font-mono text-neutral-600 dark:text-neutral-400">1080 × 1920 (9:16)</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">Instagram Portrait Post</span>
                <span className="font-mono text-neutral-600 dark:text-neutral-400">1080 × 1350 (4:5)</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">Instagram Square Feed</span>
                <span className="font-mono text-neutral-600 dark:text-neutral-400">1080 × 1080 (1:1)</span>
              </div>
              <div className="flex justify-between p-2.5">
                <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">YouTube Thumbnail</span>
                <span className="font-mono text-neutral-600 dark:text-neutral-400">1280 × 720 (16:9)</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end border-t border-neutral-200 pt-4 dark:border-neutral-800">
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
