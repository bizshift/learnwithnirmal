import React from 'react';
import type { Metadata } from 'next';
import InteractiveReelEditorGuide from '@/components/InteractiveReelEditorGuide';

export const metadata: Metadata = {
  title: 'Edit an Instagram Reel with an AI Coding Agent — Guide by Nirmal',
  description:
    'The complete workflow behind the "Comment EDITOR" Reel. From raw talking-head footage to vertical 1080×1920 MP4 with dynamic split-screens, moving examples, bilingual captions, and synced Foley sound effects.',
  openGraph: {
    title: 'Edit an Instagram Reel with an AI Coding Agent — Complete Guide',
    description:
      'Step-by-step production playbook to edit vertical video with AI coding agents (Claude Code, Codex, Python, Remotion). Includes interactive video player, master prompt generator, and troubleshooting matrix.',
    type: 'article',
    images: [
      {
        url: '/assets/editor-guide/preview-0.jpg',
        width: 1080,
        height: 1920,
        alt: 'Edit an Instagram Reel with an AI coding agent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edit an Instagram Reel with an AI Coding Agent — Complete Guide',
    description:
      'Step-by-step production playbook to edit vertical video with AI coding agents. Includes interactive video player and prompt generator.',
    images: ['/assets/editor-guide/preview-0.jpg'],
  },
};

export default function AiReelEditorPage() {
  return <InteractiveReelEditorGuide />;
}
