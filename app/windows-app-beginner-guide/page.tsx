import React from 'react';
import type { Metadata } from 'next';
import InteractiveWindowsGuide from '@/components/InteractiveWindowsGuide';

export const metadata: Metadata = {
  title: 'Build your first Windows utility with AI — Guide by Nirmal',
  description:
    'A practical, step-by-step playbook to build, verify, and publish standalone Windows tools using AI assistants and .NET 10.',
  openGraph: {
    title: 'Build your first Windows utility with AI — Guide by Nirmal',
    description:
      'Step-by-step interactive playbook: archetype selection, prompt generator, test commands, and standalone publishing.',
    type: 'article',
    images: ['/assets/images/pixel_creator_studio_1793867589555.jpg'],
  },
};

export default function WindowsAppGuidePage() {
  return <InteractiveWindowsGuide />;
}
