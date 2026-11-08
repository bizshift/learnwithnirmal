'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Download,
  Tag,
  Mail,
  User,
  ExternalLink,
} from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { STORE_PRODUCTS } from '@/lib/store-data';

export default function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    discountAmount,
    total,
    appliedCoupon,
    couponError,
    customerEmail,
    customerName,
    isCartOpen,
    lastOrderSuccess,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
    setCustomerEmail,
    setCustomerName,
    markCartAbandoned,
    completeOrder,
    resetOrderSuccess,
    addToCart,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout'>('cart');
  const [emailError, setEmailError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCartOpen) return null;

  const handleClose = () => {
    // If user entered email and has items, record abandonment
    if (items.length > 0 && customerEmail) {
      markCartAbandoned('cart_close');
    }
    setIsCartOpen(false);
    resetOrderSuccess();
    setCheckoutStep('cart');
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
    }
  };

  const handleProceedToCheckout = () => {
    if (!customerEmail || !customerEmail.includes('@')) {
      setEmailError('Please enter a valid email address to receive your files');
      return;
    }
    setEmailError('');
    setCheckoutStep('checkout');
  };

  const handlePay = () => {
    if (!customerEmail || !customerEmail.includes('@')) {
      setEmailError('Please enter a valid email address');
      setCheckoutStep('cart');
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      completeOrder();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart and Checkout"
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs"
      onClick={handleClose}
    >
      <div
        className="relative flex h-full w-full max-w-md flex-col border-l-2 border-neutral-900 bg-white shadow-[-6px_0px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#141414] dark:shadow-[-6px_0px_0px_0px_#fff]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-5 py-4 dark:border-neutral-800 dark:bg-[#1a1a1a]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Cart ({itemCount})
            </h2>
            {items.length > 0 && (
              <span className="border border-emerald-600 bg-emerald-100 px-1.5 py-0.2 font-mono text-[9px] font-bold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300">
                ACTIVE RESERVATION
              </span>
            )}
          </div>

          <button
            onClick={handleClose}
            className="pixel-press flex h-8 w-8 items-center justify-center border border-neutral-900 bg-white text-black hover:bg-neutral-100 dark:border-neutral-100 dark:bg-black dark:text-white"
            aria-label="Close cart drawer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Order Success Screen */}
          {lastOrderSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center border-2 border-emerald-600 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="font-mono text-xs font-bold text-emerald-600 uppercase tracking-widest">
                [ ORDER CONFIRMED &amp; RECOVERED ]
              </div>

              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Thank you, {customerName || 'Friend'}!
              </h3>

              <p className="text-xs text-neutral-600 dark:text-neutral-300 max-w-xs mx-auto leading-relaxed">
                Your download links and license confirmation have been dispatched to{' '}
                <strong className="text-neutral-900 dark:text-white">{customerEmail}</strong>.
              </p>

              <div className="mt-4 border border-dashed border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900 text-left space-y-2">
                <div className="font-mono text-[10px] uppercase font-bold text-neutral-400">
                  INSTANT DIGITAL DOWNLOADS:
                </div>
                {STORE_PRODUCTS.slice(0, 2).map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200 truncate pr-2">
                      {p.downloadFileName || `${p.id}.zip`}
                    </span>
                    <button
                      onClick={() => alert(`Simulating download for ${p.downloadFileName}`)}
                      className="pixel-press inline-flex items-center gap-1 border border-neutral-900 bg-[#10B981] px-2 py-0.5 font-mono text-[10px] font-bold text-black"
                    >
                      <Download className="h-3 w-3" />
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleClose}
                className="pixel-press mt-4 w-full border border-neutral-900 bg-neutral-900 py-2.5 font-mono text-xs font-bold text-white hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
              >
                RETURN TO BIO &amp; TOOLS
              </button>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart View */
            <div className="py-12 text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-dashed border-neutral-300 text-neutral-400 dark:border-neutral-700">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Your cart is currently empty
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Add a developer blueprint, ComfyUI vault, or video pack to get started.
              </p>

              {/* Quick Add Suggestions */}
              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-left space-y-3">
                <div className="font-mono text-[10px] uppercase font-bold text-neutral-400">
                  POPULAR CREATOR KITS:
                </div>
                {STORE_PRODUCTS.slice(0, 2).map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between border border-neutral-200 bg-neutral-50 p-2.5 dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="font-bold text-xs text-neutral-900 dark:text-neutral-100 truncate">
                        {prod.title}
                      </div>
                      <div className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                        ₹{prod.price} <span className="line-through text-neutral-400">₹{prod.originalPrice}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(prod)}
                      className="pixel-press shrink-0 border border-neutral-900 bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-neutral-900 shadow-[1px_1px_0px_0px_#000] hover:bg-neutral-100 dark:border-neutral-100 dark:bg-black dark:text-white dark:shadow-[1px_1px_0px_0px_#fff]"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Items & Checkout Flow */
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="font-mono text-[10px] uppercase font-semibold text-neutral-400 dark:text-neutral-500">
                  RESERVED ITEMS
                </div>
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 border border-neutral-900 bg-white p-3 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#1a1a1a] dark:shadow-[2px_2px_0px_0px_#fff]"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-neutral-900 bg-neutral-950 dark:border-neutral-800">
                      <Image
                        src={product.coverImage}
                        alt={product.title}
                        fill
                        sizes="56px"
                        className="object-cover"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                        {product.title}
                      </h4>
                      <p className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
                        {product.category}
                      </p>
                      <div className="mt-1 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        ₹{product.price * quantity}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="pixel-press flex h-6 w-6 items-center justify-center border border-neutral-300 bg-neutral-100 text-xs font-bold text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-mono text-xs font-bold w-4 text-center">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="pixel-press flex h-6 w-6 items-center justify-center border border-neutral-300 bg-neutral-100 text-xs font-bold text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="pixel-press ml-1 flex h-6 w-6 items-center justify-center text-neutral-400 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Contact & Abandonment Capture Input */}
              <div className="border border-neutral-900 bg-neutral-50 p-4 shadow-[2px_2px_0px_0px_#000] dark:border-neutral-100 dark:bg-[#1a1a1a] dark:shadow-[2px_2px_0px_0px_#fff] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase font-bold text-neutral-600 dark:text-neutral-300 flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-emerald-600" />
                    <span>DIGITAL DELIVERY DESTINATION</span>
                  </div>
                  <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">
                    [REQUIRED]
                  </span>
                </div>

                <div>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => {
                      setCustomerEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    onBlur={() => {
                      // Trigger abandonment snapshot whenever user finishes entering email
                      if (customerEmail && customerEmail.includes('@')) {
                        markCartAbandoned('cart_close');
                      }
                    }}
                    placeholder="name@example.com"
                    required
                    className="w-full border border-neutral-900 bg-white px-3 py-2 font-mono text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                  />
                  {emailError && (
                    <p className="mt-1 font-mono text-[10px] text-red-500">{emailError}</p>
                  )}
                  <p className="mt-1 font-mono text-[9.5px] text-neutral-500 dark:text-neutral-400">
                    Your download link &amp; receipt are delivered here immediately after checkout.
                  </p>
                </div>

                <div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Name (Optional)"
                    className="w-full border border-neutral-900 bg-white px-3 py-2 font-mono text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                  />
                </div>
              </div>

              {/* Coupon Code Section */}
              <div className="border border-neutral-300 p-3 dark:border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-neutral-600 dark:text-neutral-300">
                    <Tag className="h-3.5 w-3.5 text-emerald-600" />
                    <span>DISCOUNT COUPON</span>
                  </div>
                  {appliedCoupon && (
                    <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      APPLIED: {appliedCoupon}
                    </span>
                  )}
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between border border-emerald-500 bg-emerald-50 px-3 py-2 text-xs font-mono dark:border-emerald-500/40 dark:bg-emerald-950/40">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">
                      {appliedCoupon} (-₹{discountAmount})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:underline font-bold text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="e.g. COMEBACK15"
                      className="flex-1 border border-neutral-900 bg-white px-2.5 py-1.5 font-mono text-xs uppercase placeholder:text-neutral-400 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900"
                    />
                    <button
                      type="submit"
                      className="pixel-press border border-neutral-900 bg-neutral-900 px-3 py-1.5 font-mono text-xs font-bold text-white hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponError && (
                  <p className="font-mono text-[10px] text-red-500">{couponError}</p>
                )}

                {/* Quick Suggestion Pills */}
                {!appliedCoupon && (
                  <div className="flex items-center gap-1.5 pt-1">
                    <span className="font-mono text-[9px] text-neutral-400">Available:</span>
                    <button
                      type="button"
                      onClick={() => applyCoupon('COMEBACK15')}
                      className="font-mono text-[9px] border border-emerald-500/50 bg-emerald-50 px-1.5 py-0.5 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300"
                    >
                      COMEBACK15 (15% off)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyCoupon('NIRMAL10')}
                      className="font-mono text-[9px] border border-neutral-300 bg-neutral-100 px-1.5 py-0.5 text-neutral-700 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      NIRMAL10 (10% off)
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Bar */}
        {items.length > 0 && !lastOrderSuccess && (
          <div className="border-t border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#1a1a1a] space-y-3">
            {/* Price Calculations */}
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount ({appliedCoupon})</span>
                  <span>-₹{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-neutral-200 pt-1.5 text-sm font-bold text-neutral-900 dark:border-neutral-700 dark:text-neutral-100">
                <span>Total Due</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            {checkoutStep === 'cart' ? (
              <button
                onClick={handleProceedToCheckout}
                className="pixel-press flex w-full items-center justify-center gap-2 border border-emerald-600 bg-[#10B981] py-3 font-mono text-xs font-bold text-black shadow-[3px_3px_0px_0px_#000] hover:bg-emerald-400 dark:border-emerald-400 dark:shadow-[3px_3px_0px_0px_#fff]"
              >
                <span>PROCEED TO PAYMENT</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="pixel-press flex w-full items-center justify-center gap-2 border border-emerald-600 bg-[#10B981] py-3 font-mono text-xs font-bold text-black shadow-[3px_3px_0px_0px_#000] hover:bg-emerald-400 dark:border-emerald-400 dark:shadow-[3px_3px_0px_0px_#fff] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>PROCESSING INSTANT ACCESS...</span>
                  ) : (
                    <>
                      <span>PAY ₹{total.toLocaleString()} &amp; GET INSTANT DOWNLOAD</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <button
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full text-center font-mono text-[10px] text-neutral-400 hover:underline"
                >
                  ← Back to cart items
                </button>
              </div>
            )}

            {/* Security note */}
            <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] text-neutral-400">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              <span>Simulated Instant Checkout · No Card Charged</span>
            </div>

            {/* Drip Campaign Setup Link */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 text-center">
              <Link
                href="/drip-campaign"
                onClick={handleClose}
                className="font-mono text-[10px] text-emerald-600 hover:underline dark:text-emerald-400 inline-flex items-center gap-1"
              >
                <span>⚙️ View Drip Abandoned Cart Campaign Control Center</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
