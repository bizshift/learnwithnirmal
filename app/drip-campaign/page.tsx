'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Mail,
  Clock,
  Sparkles,
  CheckCircle2,
  Copy,
  ExternalLink,
  Send,
  RefreshCw,
  Eye,
  Smartphone,
  Monitor,
  Code,
  Zap,
  Tag,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import {
  DRIP_CAMPAIGN_STAGES,
  DripStageConfig,
  AbandonedCartRecord,
  INITIAL_ABANDONED_CARTS,
  generateDripEmailHtml,
} from '@/lib/drip-campaign';
import { STORE_PRODUCTS } from '@/lib/store-data';

export default function DripCampaignPage() {
  const [selectedStage, setSelectedStage] = useState<1 | 2 | 3>(1);
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [testEmailInput, setTestEmailInput] = useState('creator@example.com');
  const [testSendStatus, setTestSendStatus] = useState<string | null>(null);
  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCartRecord[]>(INITIAL_ABANDONED_CARTS);
  const [copiedRecoveryUrl, setCopiedRecoveryUrl] = useState<string | null>(null);

  // Load any local abandoned records
  useEffect(() => {
    try {
      const localRecords = localStorage.getItem('nirmal_abandoned_records');
      if (localRecords) {
        const parsed = JSON.parse(localRecords);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAbandonedCarts((prev) => {
            const ids = new Set(parsed.map((p: AbandonedCartRecord) => p.id));
            return [...parsed, ...prev.filter((p) => !ids.has(p.id))];
          });
        }
      }
    } catch (e) {
      console.warn('Could not read local abandoned records:', e);
    }
  }, []);

  const activeStageConfig =
    DRIP_CAMPAIGN_STAGES.find((s) => s.stage === selectedStage) || DRIP_CAMPAIGN_STAGES[0];

  // Example cart for live preview
  const sampleCart: AbandonedCartRecord = {
    id: 'cart_preview_sample',
    customerName: 'Alex Builder',
    customerEmail: testEmailInput || 'alex@example.com',
    items: [
      { product: STORE_PRODUCTS[0], quantity: 1 },
      { product: STORE_PRODUCTS[1], quantity: 1 },
    ],
    subtotal: 1298,
    discount: selectedStage === 3 ? 195 : 0,
    total: selectedStage === 3 ? 1103 : 1298,
    appliedCoupon: selectedStage === 3 ? 'COMEBACK15' : undefined,
    abandonedAt: new Date(Date.now() - 3600 * 1000).toISOString(),
    recoveryToken: 'rec_preview123',
    status: selectedStage === 1 ? 'drip_1_sent' : selectedStage === 2 ? 'drip_2_sent' : 'drip_3_sent',
  };

  const previewHtml = generateDripEmailHtml(
    sampleCart,
    selectedStage,
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  );

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(previewHtml);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const handleCopySubject = () => {
    const text = `Subject: ${activeStageConfig.subject}\nPreheader: ${activeStageConfig.preheader}`;
    navigator.clipboard.writeText(text);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const handleSimulateSend = async () => {
    setTestSendStatus('Simulating transmission...');
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_drip',
          cartId: sampleCart.id,
          stageNumber: selectedStage,
          recipientEmail: testEmailInput,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTestSendStatus(`✓ Stage 0${selectedStage} email dispatched to ${testEmailInput}`);
      } else {
        setTestSendStatus('✓ Simulated locally (email ready in viewer)');
      }
    } catch {
      setTestSendStatus('✓ Simulated locally (email ready in viewer)');
    }
    setTimeout(() => setTestSendStatus(null), 3500);
  };

  // Performance calculations
  const totalCarts = abandonedCarts.length;
  const recoveredCarts = abandonedCarts.filter((c) => c.status === 'recovered').length;
  const recoveryRate = totalCarts > 0 ? ((recoveredCarts / totalCarts) * 100).toFixed(1) : '0';
  const totalRecoveredRevenue = abandonedCarts
    .filter((c) => c.status === 'recovered')
    .reduce((sum, c) => sum + c.total, 0);

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#111111] dark:text-neutral-100">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#111111]/95">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-800 hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>BACK TO BIO</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-neutral-600 dark:text-neutral-300 uppercase">
              DRIP CAMPAIGN ACTIVE · 3 STAGES
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 space-y-8">
        {/* Hero Banner */}
        <div className="border border-neutral-900 bg-neutral-950 p-6 text-white shadow-[4px_4px_0px_0px_#000] dark:border-neutral-100 dark:shadow-[4px_4px_0px_0px_#fff]">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-emerald-400 uppercase">
            <Zap className="h-3.5 w-3.5" />
            <span>AUTOMATION STUDIO · REVENUE RECOVERY ENGINE</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Abandoned Cart Drip Campaign Setup
          </h1>
          <p className="mt-2 text-xs text-neutral-300 sm:text-sm max-w-3xl leading-relaxed">
            When visitors add your ₹0 Store Blueprint or AI Creator Packs to their cart but leave before checking out, this 3-stage automated sequence re-engages them over 72 hours with helpful reminders, social proof, and a 15% recovery voucher.
          </p>
        </div>

        {/* Real-time Recovery Metrics Grid */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="border border-neutral-900 bg-white p-4 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <div className="font-mono text-[10px] uppercase text-neutral-500 dark:text-neutral-400">
              Total Carts Tracked
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              {totalCarts}
            </div>
            <div className="mt-1 font-mono text-[10px] text-neutral-400">Exit-intent &amp; timeouts</div>
          </div>

          <div className="border border-neutral-900 bg-white p-4 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <div className="font-mono text-[10px] uppercase text-neutral-500 dark:text-neutral-400">
              Carts Recovered
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {recoveredCarts}
            </div>
            <div className="mt-1 font-mono text-[10px] text-emerald-600">Converted via drip</div>
          </div>

          <div className="border border-neutral-900 bg-white p-4 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <div className="font-mono text-[10px] uppercase text-neutral-500 dark:text-neutral-400">
              Recovery Rate
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {recoveryRate}%
            </div>
            <div className="mt-1 font-mono text-[10px] text-neutral-400">Industry avg: 10%–15%</div>
          </div>

          <div className="border border-neutral-900 bg-white p-4 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <div className="font-mono text-[10px] uppercase text-neutral-500 dark:text-neutral-400">
              Recovered Revenue
            </div>
            <div className="mt-1 font-mono text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              ₹{totalRecoveredRevenue.toLocaleString()}
            </div>
            <div className="mt-1 font-mono text-[10px] text-neutral-400">Saved from churn</div>
          </div>
        </section>

        {/* 3-Stage Visual Pipeline Flowchart */}
        <section className="space-y-3">
          <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
            [ THE 3-STAGE RECOVERY SEQUENCE PIPELINE ]
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {DRIP_CAMPAIGN_STAGES.map((s) => {
              const isActive = s.stage === selectedStage;
              return (
                <button
                  key={s.stage}
                  onClick={() => setSelectedStage(s.stage)}
                  className={`pixel-press flex flex-col justify-between border p-5 text-left transition-all ${
                    isActive
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-[3px_3px_0px_0px_#10B981] dark:border-emerald-400 dark:bg-emerald-950/20 dark:shadow-[3px_3px_0px_0px_#fff]'
                      : 'border-neutral-900 bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase">
                        STAGE 0{s.stage}
                      </span>
                      <span className="border border-neutral-300 bg-white px-1.5 py-0.2 text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                        {s.delayLabel}
                      </span>
                    </div>

                    <h3 className="mt-2 text-sm font-bold text-neutral-900 dark:text-neutral-100">
                      {s.name.split(':')[1]}
                    </h3>

                    <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      &quot;{s.subject}&quot;
                    </p>

                    <div className="mt-3 font-mono text-[10px] text-neutral-500 dark:text-neutral-400 space-y-1">
                      <div>
                        <strong className="text-neutral-700 dark:text-neutral-300">Goal:</strong> {s.intent}
                      </div>
                      <div>
                        <strong className="text-neutral-700 dark:text-neutral-300">Target Conv:</strong>{' '}
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                          {s.expectedRecoveryRate}
                        </span>
                      </div>
                      {s.includeCoupon && (
                        <div className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <Tag className="h-3 w-3" />
                          <span>Auto-applies {s.couponCode}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-between">
                    <span>{isActive ? '● VIEWING TEMPLATE' : '○ CLICK TO PREVIEW'}</span>
                    <span>→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Live Email Template Studio & Previewer */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
              [ LIVE EMAIL TEMPLATE STUDIO — STAGE 0{selectedStage} ]
            </div>

            {/* Device & Action Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex border border-neutral-900 bg-white dark:border-neutral-100 dark:bg-[#161616]">
                <button
                  onClick={() => setDevicePreview('desktop')}
                  className={`flex items-center gap-1 px-2.5 py-1 font-mono text-xs ${
                    devicePreview === 'desktop'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-bold'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setDevicePreview('mobile')}
                  className={`flex items-center gap-1 px-2.5 py-1 font-mono text-xs ${
                    devicePreview === 'mobile'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-black font-bold'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span>Mobile</span>
                </button>
              </div>

              <button
                onClick={handleCopySubject}
                className="pixel-press inline-flex items-center gap-1.5 border border-neutral-900 bg-white px-2.5 py-1 font-mono text-xs text-neutral-800 shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-100 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[1px_1px_0px_0px_#fff]"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>{copiedSubject ? 'COPIED!' : 'Copy Subject Line'}</span>
              </button>

              <button
                onClick={handleCopyHtml}
                className="pixel-press inline-flex items-center gap-1.5 border border-emerald-600 bg-[#10B981] px-3 py-1 font-mono text-xs font-bold text-black shadow-[1px_1px_0px_0px_#000] hover:bg-emerald-400 dark:border-emerald-400 dark:shadow-[1px_1px_0px_0px_#fff]"
              >
                <Code className="h-3.5 w-3.5" />
                <span>{copiedHtml ? 'HTML COPIED!' : 'Export HTML Code'}</span>
              </button>
            </div>
          </div>

          {/* Email Metadata Card */}
          <div className="border border-neutral-900 bg-neutral-50 p-4 dark:border-neutral-100 dark:bg-[#161616] font-mono text-xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-neutral-400 uppercase font-semibold text-[10px] w-28 shrink-0">
                SUBJECT LINE:
              </span>
              <span className="font-bold text-neutral-900 dark:text-white">
                {activeStageConfig.subject}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-neutral-400 uppercase font-semibold text-[10px] w-28 shrink-0">
                PREHEADER:
              </span>
              <span className="text-neutral-600 dark:text-neutral-300">
                {activeStageConfig.preheader}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-neutral-400 uppercase font-semibold text-[10px] w-28 shrink-0">
                SEND DELAY:
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                {activeStageConfig.delayLabel} ({activeStageConfig.delayMinutes} mins post-abandonment)
              </span>
            </div>
          </div>

          {/* Test Send Simulator Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-2 border border-dashed border-neutral-300 bg-white p-3 dark:border-neutral-700 dark:bg-[#1a1a1a]">
            <span className="font-mono text-xs text-neutral-500 whitespace-nowrap">
              Test Send Simulation:
            </span>
            <input
              type="email"
              value={testEmailInput}
              onChange={(e) => setTestEmailInput(e.target.value)}
              placeholder="your-email@example.com"
              className="flex-1 border border-neutral-900 bg-white px-3 py-1.5 font-mono text-xs text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
            />
            <button
              onClick={handleSimulateSend}
              className="pixel-press inline-flex items-center gap-1.5 border border-neutral-900 bg-neutral-900 px-3.5 py-1.5 font-mono text-xs font-bold text-white hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Simulate Trigger</span>
            </button>
            {testSendStatus && (
              <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                {testSendStatus}
              </span>
            )}
          </div>

          {/* Live Rendered Email Container */}
          <div className="flex justify-center border border-neutral-900 bg-neutral-200 p-4 sm:p-8 dark:border-neutral-800 dark:bg-neutral-950">
            <div
              className={`transition-all duration-300 bg-white shadow-[4px_4px_0px_0px_#000] overflow-hidden ${
                devicePreview === 'mobile' ? 'w-[360px]' : 'w-full max-w-[620px]'
              }`}
            >
              <div
                dangerouslySetInnerHTML={{ __html: previewHtml }}
                className="overflow-x-auto text-black"
              />
            </div>
          </div>
        </section>

        {/* Live Tracked Abandoned Carts Log */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
              [ REAL-TIME ABANDONED CARTS &amp; RECOVERY STATUS ({abandonedCarts.length}) ]
            </div>
            <button
              onClick={() => {
                const refreshed = JSON.parse(
                  localStorage.getItem('nirmal_abandoned_records') || '[]'
                );
                setAbandonedCarts([...refreshed, ...INITIAL_ABANDONED_CARTS]);
              }}
              className="font-mono text-[10px] text-emerald-600 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Refresh Log</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-neutral-900 bg-white shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[2px_2px_0px_0px_#fff]">
            <table className="w-full text-left font-mono text-xs">
              <thead className="border-b border-neutral-900 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400">
                <tr>
                  <th className="p-3">CUSTOMER / EMAIL</th>
                  <th className="p-3">CART ITEMS</th>
                  <th className="p-3">TOTAL</th>
                  <th className="p-3">TRIGGER</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {abandonedCarts.map((cart) => {
                  const isRecovered = cart.status === 'recovered';
                  const recoverUrl = `/?recover_cart=${cart.recoveryToken}${
                    cart.appliedCoupon ? `&coupon=${cart.appliedCoupon}` : ''
                  }`;

                  return (
                    <tr key={cart.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                      <td className="p-3 font-semibold">
                        <div className="text-neutral-900 dark:text-neutral-100">
                          {cart.customerName || 'Anonymous Builder'}
                        </div>
                        <div className="text-[10px] text-neutral-500">{cart.customerEmail}</div>
                      </td>

                      <td className="p-3">
                        <div className="text-neutral-800 dark:text-neutral-200 truncate max-w-xs">
                          {cart.items.map((i) => `${i.product.title} (x${i.quantity})`).join(', ')}
                        </div>
                      </td>

                      <td className="p-3 font-bold text-neutral-900 dark:text-neutral-100">
                        ₹{cart.total.toLocaleString()}
                      </td>

                      <td className="p-3 uppercase text-[10px] text-neutral-500">
                        {cart.abandonmentTrigger?.replace('_', ' ') || 'cart close'}
                      </td>

                      <td className="p-3">
                        <span
                          className={`inline-block border px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                            isRecovered
                              ? 'border-emerald-600 bg-emerald-100 text-emerald-800 dark:border-emerald-500 dark:bg-emerald-950 dark:text-emerald-300'
                              : cart.status === 'drip_3_sent'
                              ? 'border-orange-500 bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300'
                              : cart.status === 'drip_2_sent'
                              ? 'border-blue-500 bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                              : cart.status === 'drip_1_sent'
                              ? 'border-purple-500 bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                              : 'border-neutral-400 bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                          }`}
                        >
                          {cart.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={recoverUrl}
                            className="pixel-press border border-neutral-900 bg-[#10B981] px-2 py-0.5 text-[10px] font-bold text-black hover:bg-emerald-400 dark:border-neutral-100"
                            title="Restore this cart in app"
                          >
                            Restore
                          </Link>
                          <button
                            onClick={() => {
                              const fullUrl = `${window.location.origin}${recoverUrl}`;
                              navigator.clipboard.writeText(fullUrl);
                              setCopiedRecoveryUrl(cart.id);
                              setTimeout(() => setCopiedRecoveryUrl(null), 2000);
                            }}
                            className="pixel-press border border-neutral-300 bg-white px-2 py-0.5 text-[10px] text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                            title="Copy 1-click recovery link"
                          >
                            {copiedRecoveryUrl === cart.id ? 'Copied!' : 'Link'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Integration Instructions for Production */}
        <section className="space-y-3">
          <div className="font-mono text-xs font-semibold text-neutral-400 uppercase tracking-wider dark:text-neutral-500">
            [ HOW TO CONNECT TO YOUR EMAIL SERVICE (RESEND / BREVO / KLAVIYO) ]
          </div>

          <div className="border border-neutral-900 bg-neutral-50 p-5 dark:border-neutral-100 dark:bg-[#161616] space-y-4 font-mono text-xs">
            <div>
              <h4 className="font-bold text-neutral-900 dark:text-white uppercase text-[11px]">
                Option A: Direct Resend API Integration (Recommended for Next.js)
              </h4>
              <p className="mt-1 text-neutral-600 dark:text-neutral-300 font-sans text-xs">
                In Dokploy or your `.env.local`, set <code className="text-emerald-600">RESEND_API_KEY</code> and your verified sender domain. The <code className="text-emerald-600">/api/cart</code> route automatically dispatches the HTML templates via Resend.
              </p>
            </div>

            <div className="border-t border-neutral-200 pt-3 dark:border-neutral-800">
              <h4 className="font-bold text-neutral-900 dark:text-white uppercase text-[11px]">
                Option B: Webhook to Zapier, Make, or Brevo
              </h4>
              <p className="mt-1 text-neutral-600 dark:text-neutral-300 font-sans text-xs">
                When a cart is abandoned, the site dispatches a JSON payload with customer email, items, subtotal, and 1-click recovery link. You can connect this webhook directly into your existing marketing platform.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-neutral-200 pt-6 text-center font-mono text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          <div>Built by Nirmal · Zenthra Studios Automated Systems</div>
          <div className="mt-2">
            <Link href="/" className="underline hover:text-neutral-900 dark:hover:text-white">
              Back to Main Instagram Bio
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
