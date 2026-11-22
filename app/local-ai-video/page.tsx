import React from 'react';
import type { Metadata } from 'next';
import InteractiveLocalAiVideoGuide from '@/components/InteractiveLocalAiVideoGuide';

export const metadata: Metadata = {
  title: 'Make AI Films on Your Own 8 GB GPU for Free — Guide by Nirmal',
  description:
    'The complete local AI filmmaking workflow behind the "Comment FREE" carousel. ComfyUI, LTX-2.5, Krea-2, Qwen-Image, ACE-Step 1.5, and FFmpeg directed by Claude Code on an 8 GB RTX 4060.',
  openGraph: {
    title: 'Make AI Films on Your Own 8 GB GPU for Free — Complete Guide',
    description:
      'Every tool link, model download, tested 8 GB VRAM setup, copyable director prompt, and 5-step playbook to make AI films locally with zero subscriptions.',
    type: 'article',
    images: [
      {
        url: '/assets/local-ai-video/slide01.jpg',
        width: 1080,
        height: 1440,
        alt: 'Make AI Films on Your Own 8 GB GPU for Free',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Make AI Films on Your Own 8 GB GPU for Free — Complete Guide',
    description:
      'Every tool link, model download, 8 GB VRAM setup, and step-by-step playbook to make AI films locally for free.',
    images: ['/assets/local-ai-video/slide01.jpg'],
  },
};

export default function LocalAiVideoPage() {
  return <InteractiveLocalAiVideoGuide />;
}
