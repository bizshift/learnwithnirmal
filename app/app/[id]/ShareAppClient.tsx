'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

export default function ShareAppClient({
  appTitle,
  githubUrl,
}: {
  appTitle: string;
  githubUrl: string;
}) {
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopyLink}
      className="pixel-press inline-flex items-center gap-1.5 border border-neutral-300 bg-white px-3.5 py-2 font-mono text-xs font-semibold text-neutral-800 shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[1px_1px_0px_0px_#fff]"
      title={`Copy link for ${appTitle}`}
    >
      {copiedLink ? (
        <>
          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>LINK COPIED!</span>
        </>
      ) : (
        <>
          <Share2 className="h-3.5 w-3.5" />
          <span>SHARE THIS APP</span>
        </>
      )}
    </button>
  );
}
