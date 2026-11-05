import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'http://localhost:3000'),
  title: 'Nirmal — Creator, Designer & Builder',
  description: 'I make ideas real. Minimal Instagram bio link and creator portfolio for Nirmal featuring free guides, blueprints, digital products, and channels.',
  openGraph: {
    title: 'Nirmal — Creator, Designer & Builder',
    description: 'I make ideas real. Content, code, AI guides, digital products, and channels.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nirmal — Creator, Designer & Builder',
    description: 'I make ideas real. Content, code, AI guides, digital products, and channels.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white dark:bg-[#111111] dark:text-neutral-100 dark:selection:bg-white dark:selection:text-black" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
