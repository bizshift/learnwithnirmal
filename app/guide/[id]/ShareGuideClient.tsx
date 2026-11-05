'use client';

import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { GuideItem } from '@/lib/bio-data';

export default function ShareGuideClient({ guide }: { guide: GuideItem }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedContent, setCopiedContent] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleCopyContent = () => {
    const text = `${guide.title}\n${guide.summary}\n\n` +
      guide.keySteps.map(s => `${s.heading}\n` + s.points.map((p, i) => `[${i+1}] ${p}`).join('\n')).join('\n\n') +
      `\n\nRead online: ${typeof window !== 'undefined' ? window.location.href : ''}`;
    navigator.clipboard.writeText(text);
    setCopiedContent(true);
    setTimeout(() => setCopiedContent(false), 2000);
  };

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2.5 pt-4 border-t border-neutral-200 dark:border-neutral-800">
      <button
        onClick={handleCopyLink}
        className="pixel-press flex items-center gap-1.5 border border-neutral-900 bg-neutral-900 px-3 py-1.5 text-xs font-mono font-semibold text-white shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:shadow-[2px_2px_0px_0px_#fff]"
      >
        {copiedLink ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400 dark:text-emerald-600" />
            <span>LINK COPIED!</span>
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5" />
            <span>COPY SHAREABLE LINK</span>
          </>
        )}
      </button>

      <button
        onClick={handleCopyContent}
        className="pixel-press flex items-center gap-1.5 border border-neutral-300 bg-white px-3 py-1.5 text-xs font-mono font-semibold text-neutral-800 shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[1px_1px_0px_0px_#fff]"
      >
        {copiedContent ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>STEPS COPIED!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>COPY FULL TEXT</span>
          </>
        )}
      </button>
    </div>
  );
}
