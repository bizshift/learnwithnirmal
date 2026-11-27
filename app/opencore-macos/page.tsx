import React from 'react';
import type { Metadata } from 'next';
import InteractiveOpenCoreMacGuide from '@/components/InteractiveOpenCoreMacGuide';

export const metadata: Metadata = {
  title: 'Install macOS on Windows Laptop with OpenCore — Guide by Nirmal',
  description:
    'Complete step-by-step OpenCore Hackintosh playbook: OpCore Simplify, USBToolBox, ProperTree, Rufus, and BIOS checklist for installing macOS Sonoma & Sequoia on Windows laptops and PCs.',
  openGraph: {
    title: 'Install macOS on Windows Laptop with OpenCore — Free Guide',
    description:
      'Turn your Windows PC or laptop into a macOS workstation with OpenCore. Features embedded Techy Druid video walkthrough, 6 essential tool downloads, USB mapping guide, and BIOS settings checklist.',
    type: 'article',
    images: [
      {
        url: '/assets/opencore-macos/cover.jpg',
        width: 1280,
        height: 720,
        alt: 'Install macOS on Windows Laptop with OpenCore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Install macOS on Windows Laptop with OpenCore',
    description:
      'Step-by-step OpenCore playbook: OpCore Simplify, USBToolBox, ProperTree, and BIOS checklist.',
    images: ['/assets/opencore-macos/cover.jpg'],
  },
};

export default function OpenCoreMacPage() {
  return <InteractiveOpenCoreMacGuide />;
}
