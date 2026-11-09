import React from 'react';
import type { Metadata } from 'next';
import InteractiveWindowsGuide from '@/components/InteractiveWindowsGuide';

export const metadata: Metadata = {
  title: 'Build your first Windows utility with AI — Interactive Guide by Nirmal',
  description:
    'A practical, step-by-step playbook to create and publish standalone Windows tools using AI assistants (Claude, ChatGPT, Cursor, Antigravity) and .NET 10. Complete with interactive prompt studio, live timer simulator, and pre-flight verification.',
  openGraph: {
    title: 'Build your first Windows utility with AI — Interactive Playbook',
    description:
      'Step-by-step guide to building native Windows tools with AI. Includes live prompt generator, .NET 10 WPF starter commands, and self-contained .exe publishing instructions.',
    type: 'article',
    images: [
      {
        url: '/assets/images/pixel_creator_studio_1793867589555.jpg',
        width: 1200,
        height: 630,
        alt: 'Build your first Windows utility with AI',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build your first Windows utility with AI — Interactive Playbook',
    description:
      'Step-by-step guide to building native Windows tools with AI. Live prompt generator and standalone publishing guide.',
    images: ['/assets/images/pixel_creator_studio_1793867589555.jpg'],
  },
};

export default function BuildWindowsAppPage() {
  return <InteractiveWindowsGuide />;
}
