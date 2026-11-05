'use client';

import React, { useState } from 'react';
import { X, Check, Copy, Send, Mail, MessageSquare } from 'lucide-react';
import { BIO_PROFILE } from '@/lib/bio-data';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(BIO_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus('submitted');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setStatus('idle');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="pixel-box max-h-[90vh] w-full max-w-lg overflow-y-auto border border-neutral-900 bg-white p-6 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <span>GET IN TOUCH</span>
              <span aria-hidden="true">·</span>
              <span>DIRECT CHANNELS</span>
            </div>
            <h2 id="contact-modal-title" className="mt-1 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              Let&apos;s make something useful.
            </h2>
          </div>
          <button
            onClick={onClose}
            className="pixel-press flex h-8 w-8 items-center justify-center border border-neutral-300 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            aria-label="Close contact modal"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
          Have an idea, a brand, or a problem worth solving? Drop a line below or reach out directly.
        </p>

        {/* Quick Email Copy Row */}
        <div className="mt-4 flex items-center justify-between border border-neutral-900 bg-neutral-50 p-3 dark:border-neutral-200 dark:bg-neutral-900">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
            <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100">
              {BIO_PROFILE.email}
            </span>
          </div>
          <button
            onClick={handleCopyEmail}
            className="pixel-press flex items-center gap-1 border border-neutral-900 bg-white px-2 py-1 text-xs font-mono text-neutral-900 shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-100 dark:border-neutral-100 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-[1px_1px_0px_0px_#fff]"
            aria-label="Copy Nirmal's email address"
          >
            {copiedEmail ? (
              <>
                <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>COPY EMAIL</span>
              </>
            )}
          </button>
        </div>

        {/* Form */}
        {status === 'submitted' ? (
          <div className="mt-6 border border-neutral-900 bg-neutral-50 p-6 text-center dark:border-neutral-100 dark:bg-neutral-900">
            <div className="mx-auto flex h-10 w-10 items-center justify-center border border-neutral-900 bg-white dark:border-neutral-100 dark:bg-neutral-800">
              <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="mt-3 text-sm font-bold font-mono text-neutral-900 dark:text-neutral-100">
              MESSAGE DISPATCHED
            </h3>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
              Thanks for reaching out! Nirmal normally replies within 24–48 hours.
            </p>
            <div className="mt-4 flex justify-center gap-3">
              <button
                onClick={handleReset}
                className="pixel-press border border-neutral-900 bg-white px-3 py-1 text-xs font-mono text-neutral-900 shadow-[1px_1px_0px_0px_#000] dark:border-neutral-100 dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-[1px_1px_0px_0px_#fff]"
              >
                SEND ANOTHER
              </button>
              <button
                onClick={onClose}
                className="pixel-press border border-neutral-300 bg-neutral-100 px-3 py-1 text-xs font-mono text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              >
                DONE
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-3">
            <div>
              <label htmlFor="contact-name" className="block font-mono text-xs text-neutral-600 dark:text-neutral-400">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jackie Chen"
                className="mt-1 w-full border border-neutral-300 bg-white p-2 text-xs font-mono text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block font-mono text-xs text-neutral-600 dark:text-neutral-400">
                Your Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="mt-1 w-full border border-neutral-300 bg-white p-2 text-xs font-mono text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block font-mono text-xs text-neutral-600 dark:text-neutral-400">
                Project / Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me briefly about what you want to build, automate, or redesign..."
                className="mt-1 w-full border border-neutral-300 bg-white p-2 text-xs font-mono text-neutral-900 outline-none focus:border-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:border-neutral-100"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`mailto:${BIO_PROFILE.email}?subject=Project inquiry via Nirmal Bio`}
                className="font-mono text-xs underline text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                Or open in mail client ↗
              </a>

              <button
                type="submit"
                className="pixel-press flex items-center gap-1.5 border border-neutral-900 bg-neutral-900 px-4 py-2 text-xs font-mono text-white shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:shadow-[2px_2px_0px_0px_#fff] dark:hover:bg-neutral-200"
              >
                <Send className="h-3 w-3" />
                <span>SEND NOTE</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
