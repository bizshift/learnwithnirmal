'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { StoreProduct, STORE_PRODUCTS, DISCOUNT_COUPONS } from './store-data';
import { CartItem, AbandonedCartRecord } from './drip-campaign';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  appliedCoupon: string | null;
  couponError: string | null;
  customerEmail: string;
  customerName: string;
  isCartOpen: boolean;
  isExitIntentOpen: boolean;
  abandonedCartId: string;
  lastOrderSuccess: boolean;
  addToCart: (product: StoreProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  setCustomerEmail: (email: string) => void;
  setCustomerName: (name: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsExitIntentOpen: (open: boolean) => void;
  markCartAbandoned: (trigger?: AbandonedCartRecord['abandonmentTrigger']) => void;
  completeOrder: () => void;
  resetOrderSuccess: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'nirmal_cart_state_v1';
const ABANDONED_KEY = 'nirmal_abandoned_cart_id';
const EXIT_SHOWN_KEY = 'nirmal_exit_intent_shown_session';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isExitIntentOpen, setIsExitIntentOpen] = useState(false);
  const [lastOrderSuccess, setLastOrderSuccess] = useState(false);
  const [abandonedCartId, setAbandonedCartId] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from localStorage and check recovery URL
  useEffect(() => {
    try {
      // Setup or retrieve abandoned cart ID
      let cartId = localStorage.getItem(ABANDONED_KEY);
      if (!cartId) {
        cartId = 'cart_' + Math.random().toString(36).substring(2, 9);
        localStorage.setItem(ABANDONED_KEY, cartId);
      }
      setAbandonedCartId(cartId);

      // Load saved cart items
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.items) && parsed.items.length > 0) {
          setItems(parsed.items);
          if (parsed.appliedCoupon) setAppliedCoupon(parsed.appliedCoupon);
          if (parsed.customerEmail) setCustomerEmail(parsed.customerEmail);
          if (parsed.customerName) setCustomerName(parsed.customerName);
        }
      }

      // Check URL parameters for cart recovery (?recover_cart=...&coupon=...)
      if (typeof window !== 'undefined') {
        const searchParams = new URLSearchParams(window.location.search);
        const recoverToken = searchParams.get('recover_cart');
        const couponFromUrl = searchParams.get('coupon');

        if (recoverToken) {
          // If recovering, ensure at least product 0 is in cart if empty
          setItems((prev) => {
            if (prev.length === 0) {
              return [{ product: STORE_PRODUCTS[0], quantity: 1 }];
            }
            return prev;
          });
          setIsCartOpen(true);
        }

        if (couponFromUrl && DISCOUNT_COUPONS[couponFromUrl.toUpperCase()]) {
          setAppliedCoupon(couponFromUrl.toUpperCase());
        }
      }
    } catch (e) {
      console.warn('Failed to parse cart storage:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          items,
          appliedCoupon,
          customerEmail,
          customerName,
        })
      );
    } catch (e) {
      console.warn('Failed to save cart storage:', e);
    }
  }, [items, appliedCoupon, customerEmail, customerName, isInitialized]);

  // Calculations
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items]
  );

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const coupon = DISCOUNT_COUPONS[appliedCoupon];
    if (!coupon) return 0;

    if (coupon.minCartValue && subtotal < coupon.minCartValue) {
      return 0;
    }

    if (coupon.discountPercent) {
      return Math.round((subtotal * coupon.discountPercent) / 100);
    }

    if (coupon.discountFlat) {
      return Math.min(coupon.discountFlat, subtotal);
    }

    return 0;
  }, [appliedCoupon, subtotal]);

  const total = Math.max(0, subtotal - discountAmount);

  // Mark abandoned cart helper
  const markCartAbandoned = useCallback(
    (trigger: AbandonedCartRecord['abandonmentTrigger'] = 'cart_close') => {
      if (items.length === 0 || !customerEmail) return;

      const record: AbandonedCartRecord = {
        id: abandonedCartId,
        customerName: customerName || undefined,
        customerEmail,
        items,
        subtotal,
        discount: discountAmount,
        total,
        appliedCoupon: appliedCoupon || undefined,
        abandonedAt: new Date().toISOString(),
        recoveryToken: abandonedCartId,
        status: 'abandoned',
        abandonmentTrigger: trigger,
      };

      try {
        // Save to local abandoned records
        const existing = JSON.parse(localStorage.getItem('nirmal_abandoned_records') || '[]');
        const updated = [record, ...existing.filter((r: AbandonedCartRecord) => r.id !== record.id)].slice(0, 20);
        localStorage.setItem('nirmal_abandoned_records', JSON.stringify(updated));

        // Call backend API (fire and forget)
        fetch('/api/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'abandon', cart: record }),
        }).catch(() => {
          // graceful fallback
        });
      } catch (e) {
        console.warn('Failed to record abandoned cart:', e);
      }
    },
    [abandonedCartId, customerEmail, customerName, items, subtotal, discountAmount, total, appliedCoupon]
  );

  // Exit-Intent Listener (triggers when mouse leaves viewport near top)
  useEffect(() => {
    if (items.length === 0) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when moving cursor up towards address bar or tab bar
      if (e.clientY <= 15 && !isExitIntentOpen && !lastOrderSuccess) {
        const alreadyShown = sessionStorage.getItem(EXIT_SHOWN_KEY);
        if (!alreadyShown) {
          setIsExitIntentOpen(true);
          sessionStorage.setItem(EXIT_SHOWN_KEY, 'true');
          markCartAbandoned('exit_intent');
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [items.length, isExitIntentOpen, lastOrderSuccess, markCartAbandoned]);

  const addToCart = (product: StoreProduct, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    setCouponError(null);

    const coupon = DISCOUNT_COUPONS[cleanCode];
    if (!coupon) {
      setCouponError(`Invalid coupon code "${code}". Try COMEBACK15 or NIRMAL10.`);
      return false;
    }

    if (coupon.minCartValue && subtotal < coupon.minCartValue) {
      setCouponError(`Coupon requires minimum cart value of ₹${coupon.minCartValue}.`);
      return false;
    }

    setAppliedCoupon(cleanCode);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const completeOrder = () => {
    // Notify API of successful recovery
    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'recover', cartId: abandonedCartId }),
    }).catch(() => {});

    setLastOrderSuccess(true);
    clearCart();
  };

  const resetOrderSuccess = () => {
    setLastOrderSuccess(false);
  };

  return (
    <CartContext.Provider
      value={{
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
        isExitIntentOpen,
        abandonedCartId,
        lastOrderSuccess,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        setCustomerEmail,
        setCustomerName,
        setIsCartOpen,
        setIsExitIntentOpen,
        markCartAbandoned,
        completeOrder,
        resetOrderSuccess,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
