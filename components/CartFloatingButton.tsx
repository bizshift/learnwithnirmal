'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function CartFloatingButton() {
  const { itemCount, total, setIsCartOpen } = useCart();

  if (itemCount === 0) return null;

  return (
    <aside
      aria-label="Floating cart summary"
      className="fixed bottom-5 left-5 z-40 sm:bottom-6 sm:left-6"
    >
      <button
        onClick={() => setIsCartOpen(true)}
        className="pixel-press flex items-center gap-2 border-2 border-neutral-900 bg-[#10B981] px-3.5 py-2 font-mono text-xs font-bold text-black shadow-[3px_3px_0px_0px_#000] hover:bg-emerald-400 dark:border-neutral-100 dark:shadow-[3px_3px_0px_0px_#fff]"
        aria-label={`Open Cart (${itemCount} items, Total: ₹${total})`}
      >
        <ShoppingBag className="h-4 w-4" />
        <span>CART: {itemCount}</span>
        <span className="hidden sm:inline">· ₹{total.toLocaleString()}</span>
      </button>
    </aside>
  );
}
