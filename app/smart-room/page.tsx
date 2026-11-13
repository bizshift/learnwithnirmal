import React from 'react';
import type { Metadata } from 'next';
import InteractiveSmartRoomGuide from '@/components/InteractiveSmartRoomGuide';

export const metadata: Metadata = {
  title: 'I made my room smart for about ₹700 with an ESP32-C3 — Guide by Nirmal',
  description:
    'See how I built four smart room controls with an ESP32-C3 and a 4-channel relay. Get the Antigravity prompt, GPIO map, enclosure photos, live/neutral wiring guide, and Siri demo.',
  openGraph: {
    title: 'I made my room smart for about ₹700 with an ESP32-C3',
    description:
      'Control tube lights, curtain light, ceiling fan, and bathroom light with an ESP32-C3 and relay module for ~₹700. Includes Antigravity USB bench test prompt and Apple Home integration.',
    type: 'article',
    images: [
      {
        url: '/assets/smart-room/smart-room-hero.webp',
        width: 1200,
        height: 675,
        alt: 'I made my room smart for about ₹700 with an ESP32-C3',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'I made my room smart for about ₹700 with an ESP32-C3',
    description:
      'Control tube light, curtain light, ceiling fan, and bathroom light with an ESP32-C3 for ~₹700. Includes Antigravity prompt and Apple Home setup.',
    images: ['/assets/smart-room/smart-room-hero.webp'],
  },
};

export default function SmartRoomPage() {
  return <InteractiveSmartRoomGuide />;
}
