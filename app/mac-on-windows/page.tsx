import React from 'react';
import type { Metadata } from 'next';
import InteractiveOpenCoreMacGuide from '@/components/InteractiveOpenCoreMacGuide';

export const metadata: Metadata = {
  title: 'How to Install Mac on Windows Laptop with OpenCore — Guide by Nirmal',
  description:
    'Complete step-by-step OpenCore Hackintosh playbook: OpCore Simplify, USBToolBox, ProperTree, Rufus, and BIOS checklist for installing macOS on Windows laptops.',
};

export default function MacOnWindowsPage() {
  return <InteractiveOpenCoreMacGuide />;
}
