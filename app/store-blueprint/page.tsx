import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  ShieldCheck,
  Zap,
  TrendingDown,
  Layers,
  ArrowRight,
  ShoppingCart,
  DollarSign,
} from 'lucide-react';
import { FEATURED_PRODUCT, BIO_PROFILE, FREE_APPS } from '@/lib/bio-data';

export const metadata: Metadata = {
  title: 'Build your own online store for ₹0 — Blueprint by Nirmal',
  description:
    'A proven, zero-monthly-subscription tech stack to launch and scale your first digital or physical product. Save ₹3,000–₹15,000/mo on boilerplate SaaS subscriptions.',
  openGraph: {
    title: 'Build your own online store for ₹0 — Blueprint by Nirmal',
    description: FEATURED_PRODUCT.tagline,
    type: 'article',
    images: [
      {
        url: '/assets/images/pixel_store_cover_1793867587659.jpg',
        width: 1200,
        height: 630,
        alt: FEATURED_PRODUCT.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: FEATURED_PRODUCT.title,
    description: FEATURED_PRODUCT.tagline,
    images: ['/assets/images/pixel_store_cover_1793867587659.jpg'],
  },
};

export default function StoreBlueprintPage() {
  const pillars = [
    {
      step: '01',
      title: 'High-Performance Frontend',
      tech: 'Next.js 15 / Astro / Tailwind CSS',
      cost: '₹0 / month',
      host: 'Vercel / Cloudflare Pages',
      desc: 'Blazing fast static frontend hosted on global edge networks. 100GB monthly bandwidth included on free tier, zero server maintenance.',
    },
    {
      step: '02',
      title: 'Headless Catalog & Database',
      tech: 'Supabase / Sanity / Google Sheets',
      cost: '₹0 / month',
      host: 'Free Tier Cloud (500MB DB)',
      desc: 'Manage your products, descriptions, prices, and inventory without expensive Shopify apps. Use Google Sheets or Supabase for instant edits.',
    },
    {
      step: '03',
      title: 'Checkout & Payment Gateway',
      tech: 'Razorpay / Cashfree / Stripe',
      cost: '₹0 setup · ~2% per txn',
      host: 'Payment Links / Hosted Checkout',
      desc: 'Pay strictly when you make a sale. Zero monthly fixed gateway fees. Supports UPI, cards, net banking, and automatic tax invoicing.',
    },
    {
      step: '04',
      title: 'Custom Domain & SSL',
      tech: 'Cloudflare DNS + .com / .in domain',
      cost: '₹0 SSL · ~₹800/yr domain',
      host: 'Cloudflare',
      desc: 'Free enterprise-grade SSL, DDoS protection, and CDN caching through Cloudflare. Or test completely free with a .vercel.app subdomain.',
    },
    {
      step: '05',
      title: 'Instant Order Notifications',
      tech: 'Telegram Bot / Discord Webhook',
      cost: '₹0 / month',
      host: 'Direct Webhook API',
      desc: 'Get instant ping notifications with customer details, order item, and address directly on your phone the moment a payment succeeds.',
    },
  ];

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

      {/* Main Container */}
      <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8 space-y-8">
        {/* Cover Art Banner */}
        <div className="relative aspect-video w-full overflow-hidden border border-neutral-900 bg-neutral-950 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[3px_3px_0px_0px_#fff]">
          <Image
            src="/assets/images/pixel_store_cover_1793867587659.jpg"
            alt="Build your own online store for ₹0"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            style={{ imageRendering: 'pixelated' }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 font-mono text-xs font-bold text-white uppercase drop-shadow">
            <span className="inline-block h-2.5 w-2.5 bg-[#10B981]" />
            <span>COMMERCE BLUEPRINT · ZERO MONTHLY OVERHEAD</span>
          </div>
        </div>

        {/* Header Metadata */}
        <div className="border border-neutral-900 bg-white p-5 sm:p-6 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[3px_3px_0px_0px_#fff]">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            <span className="border border-neutral-900 bg-[#10B981] px-2 py-0.5 uppercase font-bold text-black">
              FREE BLUEPRINT
            </span>
            <span aria-hidden="true">·</span>
            <span>E-COMMERCE STACK</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% FREE TIER</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-neutral-100">
            {FEATURED_PRODUCT.title}
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base">
            {FEATURED_PRODUCT.tagline}
          </p>

          {/* Savings Highlight Box */}
          <div className="mt-5 border border-neutral-900 bg-[#0B4D34] p-4 text-white shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[2px_2px_0px_0px_#fff]">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-emerald-300 uppercase">
              <TrendingDown className="h-4 w-4" />
              <span>SAVINGS IMPACT</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-white">
              {FEATURED_PRODUCT.savingsNote}
            </p>
            <p className="mt-1 font-mono text-xs text-emerald-200/90">
              Traditional Shopify + apps cost ₹36,000–₹1,80,000 every year before you make a single rupee in sales. This stack eliminates fixed monthly costs.
            </p>
          </div>
        </div>

        {/* 5-Pillar Stack Breakdown */}
        <section className="space-y-4">
          <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
            [ THE 5-PILLAR ZERO-RUPEES TECH STACK ]
          </div>

          <div className="space-y-3">
            {pillars.map((p) => (
              <div
                key={p.step}
                className="border border-neutral-900 bg-white p-5 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 pb-2.5 dark:border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="border border-neutral-900 bg-[#10B981] px-1.5 py-0.2 font-mono text-xs font-bold text-black">
                      PILLAR {p.step}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100">
                      {p.title}
                    </h3>
                  </div>
                  <div className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    {p.cost}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-2">
                  <div>
                    <span className="text-neutral-400">Stack: </span>
                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{p.tech}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400">Host: </span>
                    <span className="text-neutral-800 dark:text-neutral-200 font-semibold">{p.host}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Comparison Table */}
        <section className="space-y-3">
          <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
            [ COST COMPARISON: SHOPIFY VS ZERO-RUPEES STACK ]
          </div>

          <div className="overflow-x-auto border border-neutral-900 bg-white shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-neutral-900 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
                <tr>
                  <th className="p-3">Component</th>
                  <th className="p-3">Shopify / Traditional</th>
                  <th className="p-3 text-emerald-600 dark:text-emerald-400">₹0 Modern Stack</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                <tr>
                  <td className="p-3 font-semibold">Storefront Hosting</td>
                  <td className="p-3 text-red-500">₹2,500 – ₹8,000 / mo</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">₹0 (Vercel / Cloudflare)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Plugins &amp; Apps</td>
                  <td className="p-3 text-red-500">₹1,500 – ₹5,000 / mo</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">₹0 (Built-in custom code)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Payment Gateway Setup</td>
                  <td className="p-3">2% + 0.5% – 2% third-party penalty</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">~2% standard txn only</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">SSL Certificate</td>
                  <td className="p-3">₹1,200 / yr</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400 font-bold">₹0 (Cloudflare Auto SSL)</td>
                </tr>
                <tr className="bg-neutral-50 dark:bg-neutral-900 font-bold">
                  <td className="p-3">Yearly Fixed Overhead</td>
                  <td className="p-3 text-red-600">₹45,000 – ₹1,50,000+</td>
                  <td className="p-3 text-emerald-600 dark:text-emerald-400">₹0 FIXED FEES</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Launch Checklist */}
        <section className="space-y-3">
          <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
            [ 4-STEP LAUNCH CHECKLIST ]
          </div>

          <div className="border border-neutral-900 bg-white p-5 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff] space-y-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0">[1]</span>
              <span><strong>Register Payment Gateway:</strong> Complete Razorpay or Stripe KYC to get API keys and active payment links.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0">[2]</span>
              <span><strong>Setup Product Catalog:</strong> Create a Google Sheet or free Supabase table with Title, Price, Images, and SKU.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0">[3]</span>
              <span><strong>Deploy Frontend:</strong> Push your Next.js/Astro project to GitHub and connect to Vercel/Cloudflare Pages with automatic CI/CD.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold shrink-0">[4]</span>
              <span><strong>Connect Webhook:</strong> Point the payment gateway webhook to a serverless function that alerts your Telegram bot.</span>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <footer className="border-t border-neutral-200 pt-6 text-center font-mono text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <div>Shared by {BIO_PROFILE.name} · {BIO_PROFILE.studio}</div>
          <div className="mt-2 flex items-center justify-center gap-3">
            <Link href="/" className="underline hover:text-neutral-900 dark:hover:text-white">
              Back to Bio Links
            </Link>
            <span>·</span>
            <Link href="/guides" className="underline hover:text-neutral-900 dark:hover:text-white">
              All Free Guides
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

