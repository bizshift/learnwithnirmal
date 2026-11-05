'use client';

import React, { useState, useEffect } from 'react';
import TopNav from '@/components/TopNav';
import BioLinkView from '@/components/BioLinkView';
import StoryView from '@/components/StoryView';
import GuideModal from '@/components/GuideModal';
import StoreBlueprintModal from '@/components/StoreBlueprintModal';
import PlaygroundModal from '@/components/PlaygroundModal';
import ContactModal from '@/components/ContactModal';
import { GuideItem } from '@/lib/bio-data';

// Theme external store for React 19
let themeListeners: Array<() => void> = [];

function subscribeTheme(callback: () => void) {
  themeListeners.push(callback);
  return () => {
    themeListeners = themeListeners.filter((l) => l !== callback);
  };
}

function getThemeSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('nirmal_theme');
  // White (light mode) is the default unless explicitly chosen
  return saved === 'dark';
}

function getServerThemeSnapshot(): boolean {
  return false;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<'bio' | 'story'>('bio');
  const isDark = React.useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copiedBioLink, setCopiedBioLink] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#story') {
        setActiveTab('story');
      } else if (window.location.hash === '#bio') {
        setActiveTab('bio');
      }
    };
    window.addEventListener('hashchange', handleHash);
    if (window.location.hash) {
      window.setTimeout(handleHash, 0);
    }
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    localStorage.setItem('nirmal_theme', nextDark ? 'dark' : 'light');
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    themeListeners.forEach((listener) => listener());
    showToast(nextDark ? 'DARK MODE ENABLED [☾]' : 'LIGHT MODE ENABLED [☼]');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleCopyBioLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedBioLink(true);
      showToast('BIO PAGE LINK COPIED [✓]');
      setTimeout(() => setCopiedBioLink(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-neutral-900 transition-colors duration-150 dark:bg-[#111111] dark:text-neutral-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 border border-neutral-900 bg-white px-3.5 py-2 font-mono text-xs font-semibold text-neutral-900 shadow-[3px_3px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#1c1c1c] dark:text-neutral-100 dark:shadow-[3px_3px_0px_0px_#fff]"
        >
          <span className="pixel-spin">✳</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenContact={() => setIsContactOpen(true)}
        copiedBioLink={copiedBioLink}
        onCopyBioLink={handleCopyBioLink}
      />

      {/* Main Content Area */}
      <main className="w-full">
        {activeTab === 'bio' ? (
          <BioLinkView
            onSelectGuide={(guide) => setSelectedGuide(guide)}
            onOpenStoreModal={() => setIsStoreModalOpen(true)}
            onOpenPlayground={() => setIsPlaygroundOpen(true)}
            onOpenContact={() => setIsContactOpen(true)}
            onSwitchToStory={() => setActiveTab('story')}
          />
        ) : (
          <StoryView
            onSwitchToBio={() => setActiveTab('bio')}
            onOpenGuides={() => {
              setActiveTab('bio');
            }}
            onOpenContact={() => setIsContactOpen(true)}
          />
        )}
      </main>

      {/* Modals & Dialogs */}
      <GuideModal
        guide={selectedGuide}
        onClose={() => setSelectedGuide(null)}
      />

      <StoreBlueprintModal
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
      />

      <PlaygroundModal
        isOpen={isPlaygroundOpen}
        onClose={() => setIsPlaygroundOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
