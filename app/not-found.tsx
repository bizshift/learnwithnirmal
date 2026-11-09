import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex items-center justify-center p-4 dark:bg-[#111111] dark:text-neutral-100">
      <div className="max-w-md w-full border border-neutral-900 bg-white p-6 sm:p-8 shadow-[4px_4px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#161616] dark:shadow-[4px_4px_0px_0px_#fff] text-center">
        <div className="font-mono text-xs font-bold text-red-500 uppercase tracking-widest">
          [ 404 · ERROR ]
        </div>

        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          Page Not Found
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
          The requested page, app, or guide could not be located. It may have been moved or updated.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 font-mono text-xs">
          <Link
            href="/"
            className="pixel-press w-full sm:w-auto border border-neutral-900 bg-neutral-900 px-4 py-2 font-bold text-white shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 dark:shadow-[2px_2px_0px_0px_#fff]"
          >
            ← BACK TO BIO
          </Link>
          <Link
            href="/apps"
            className="pixel-press w-full sm:w-auto border border-neutral-300 bg-white px-4 py-2 font-semibold text-neutral-800 shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[2px_2px_0px_0px_#fff]"
          >
            FREE APPS
          </Link>
          <Link
            href="/guides"
            className="pixel-press w-full sm:w-auto border border-neutral-300 bg-white px-4 py-2 font-semibold text-neutral-800 shadow-[2px_2px_0px_0px_#000] hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:shadow-[2px_2px_0px_0px_#fff]"
          >
            GUIDES
          </Link>
        </div>
      </div>
    </div>
  );
}

