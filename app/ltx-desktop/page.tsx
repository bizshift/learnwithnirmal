import React from 'react';
import type { Metadata } from 'next';
import InteractiveLtxDesktopGuide from '@/components/InteractiveLtxDesktopGuide';

export const metadata: Metadata = {
  title: 'Create AI videos on your PC with LTX Desktop — Guide by Nirmal',
  description:
    'Complete setup and hardware guide for LTX Desktop (Lightricks LTX 2.5 Fast). Run local AI video generation on Windows & Mac, bypass the 8 GB VRAM barrier, check your PC specs, and copy tested motion prompts.',
  openGraph: {
    title: 'Create AI videos on your PC with LTX Desktop — Free Open-Source Video Suite',
    description:
      'Step-by-step playbook: Hardware compatibility advisor, 8 GB VRAM tester patch explanation, multi-track timeline NLE features, and tested Image-to-Video prompts.',
    type: 'article',
    images: [
      {
        url: '/assets/ltx-desktop/cover.jpg',
        width: 1080,
        height: 1920,
        alt: 'Create AI videos on your PC with LTX Desktop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create AI videos on your PC with LTX Desktop',
    description:
      'Run open-weights LTX 2.5 AI video generation locally on PC. Includes interactive hardware calculator and prompts.',
    images: ['/assets/ltx-desktop/cover.jpg'],
  },
};

export default function LtxDesktopPage() {
  return <InteractiveLtxDesktopGuide />;
}
