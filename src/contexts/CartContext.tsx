import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/data/mockData";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchase?: number;
  maxUses?: number;
  usedCount: number;
  isActive: boolean;
  expiresAt?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("lipoimports_cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const stored = localStorage.getItem("lipoimports_applied_coupon");
    return stored ? JSON.parse(stored) : null;
  });

  // Get coupons from localStorage
  const getCoupons = (): Coupon[] => {
    const stored = localStorage.getItem("lipoimports_coupons");
    return stored ? JSON.parse(stored) : [];
  };

  useEffect(() => {
    localStorage.setItem("lipoimports_cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("lipoimports_applied_coupon", JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
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
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const applyCoupon = (code: string): boolean => {
    const coupons = getCoupons();
    const coupon = coupons.find(
      (c) => c.code.toLowerCase() === code.toLowerCase() && c.isActive
    );

    if (!coupon) {
      return false;
    }

    // Check expiry
    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return false;
    }

    // Check min purchase
    if (coupon.minPurchase && subtotal < coupon.minPurchase) {
      return false;
    }

    // Check max uses
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return false;
    }

    setAppliedCoupon(coupon);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const discount = appliedCoupon
    ? appliedCoupon.discountType === "percentage"
      ? (subtotal * appliedCoupon.discountValue) / 100
      : appliedCoupon.discountValue
    : 0;

  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
