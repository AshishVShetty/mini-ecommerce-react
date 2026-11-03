import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "shopsphere_cart_items";

export function CartProvider({ children }) {
  // Initialize cart from localStorage with error safety
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      console.error("Failed to parse cart from localStorage:", err);
    }
    return [];
  });

  // Toast state for user feedback
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to save cart to localStorage:", err);
    }
  }, [cart]);

  // Show toast notification
  const showToast = useCallback((message, type = "success") => {
    setToast({ visible: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(() => {
      hideToast();
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast.visible, hideToast]);

  // Add product to cart with custom quantity (default 1)
  const addToCart = useCallback((product, quantity = 1) => {
    const qtyToAdd = Math.max(1, parseInt(quantity, 10) || 1);

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingIndex > -1) {
        return prevCart.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + qtyToAdd }
            : item
        );
      }

      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          image: product.image,
          rating: product.rating,
          quantity: qtyToAdd,
        },
      ];
    });

    showToast(`Added "${product.name}" (${qtyToAdd}x) to cart!`);
  }, [showToast]);

  // Remove product from cart
  const removeFromCart = useCallback((productId) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((item) => item.id === productId);
      if (itemToRemove) {
        showToast(`Removed "${itemToRemove.name}" from cart`, "info");
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  }, [showToast]);

  // Update specific item quantity
  const updateQuantity = useCallback((productId, newQuantity) => {
    const qty = parseInt(newQuantity, 10);
    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  }, [removeFromCart]);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCart([]);
    showToast("Shopping cart cleared", "info");
  }, [showToast]);

  // Computed totals
  const totalItems = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const originalSubtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + (item.originalPrice || item.price) * item.quantity,
        0
      ),
    [cart]
  );

  const totalDiscount = useMemo(
    () => Math.max(0, originalSubtotal - subtotal),
    [originalSubtotal, subtotal]
  );

  // Free shipping threshold: ₹999
  const FREE_SHIPPING_THRESHOLD = 999;
  const shippingFee = cart.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
  const grandTotal = subtotal + shippingFee;

  const value = {
    cart,
    totalItems,
    subtotal,
    originalSubtotal,
    totalDiscount,
    shippingFee,
    grandTotal,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toast,
    hideToast,
    showToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
