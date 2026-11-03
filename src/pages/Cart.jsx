import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  Tag,
  ShieldCheck,
  Truck,
  ArrowRight,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    totalItems,
    subtotal,
    totalDiscount,
    shippingFee,
    grandTotal,
    freeShippingThreshold,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Promo code logic: "SAVE10" gives extra 10% discount
  const extraDiscount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = Math.max(0, grandTotal - extraDiscount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    const cleaned = promoInput.trim().toUpperCase();

    if (cleaned === "SAVE10" || cleaned === "WELCOME10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid coupon code. Try 'SAVE10'");
    }
  };

  const handleRemovePromo = () => {
    setPromoApplied(false);
    setPromoInput("");
    setPromoError("");
  };

  const handleProceedToCheckout = () => {
    setIsCheckingOut(true);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    const fakeOrderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(fakeOrderId);
    setOrderCompleted(true);
    setIsCheckingOut(false);
    clearCart();
  };

  // Progress for free shipping bar
  const freeShippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // If cart is empty and no completed order modal is open
  if (cart.length === 0 && !orderCompleted) {
    return (
      <div className="cart-empty-page">
        <div className="empty-cart-card">
          <div className="empty-cart-icon-wrap">
            <ShoppingBag size={50} />
          </div>
          <h2>Your Cart is Currently Empty</h2>
          <p>
            Looks like you haven't added anything to your cart yet. Explore our
            handpicked collections and discover great essentials.
          </p>
          <Link to="/" className="hero-btn primary start-shopping-btn">
            <ArrowLeft size={16} />
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      {/* Page Header */}
      <div className="cart-page-header">
        <div>
          <span className="eyebrow">YOUR SHOPPING BAG</span>
          <h1>Shopping Cart ({totalItems} {totalItems === 1 ? "item" : "items"})</h1>
        </div>
        {cart.length > 0 && (
          <button
            type="button"
            className="clear-cart-btn"
            onClick={clearCart}
            title="Remove all items from cart"
          >
            <Trash2 size={15} />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="shipping-progress-banner">
        <div className="shipping-progress-text">
          <Truck size={18} className="truck-icon" />
          {shippingFee === 0 ? (
            <span>
              🎉 Congratulations! You have unlocked <strong>FREE Express Shipping</strong>!
            </span>
          ) : (
            <span>
              Add <strong>₹{amountNeededForFreeShipping.toLocaleString("en-IN")}</strong> more
              to qualify for <strong>FREE Shipping</strong>!
            </span>
          )}
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Cart Grid: Left Items List, Right Summary */}
      <div className="cart-layout-grid">
        {/* Left Column: Cart Items */}
        <div className="cart-items-column">
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <Link to={`/product/${item.id}`} className="cart-item-img-link">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400";
                    }}
                  />
                </Link>

                <div className="cart-item-info">
                  <div className="cart-item-top">
                    <div>
                      <span className="cart-item-category">{item.category}</span>
                      <h3 className="cart-item-name">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </h3>
                    </div>
                    <button
                      type="button"
                      className="item-remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                      title="Remove product"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="cart-item-price-row">
                    <span className="unit-price">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="unit-original-price">
                        ₹{item.originalPrice.toLocaleString("en-IN")}
                      </span>
                    )}
                  </div>

                  <div className="cart-item-bottom">
                    {/* Quantity controls */}
                    <div className="cart-qty-control">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="cart-qty-val">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Total for this line item */}
                    <div className="line-item-total">
                      <span className="line-total-label">Subtotal:</span>
                      <span className="line-total-amount">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-actions-footer">
            <Link to="/" className="continue-shopping-link">
              <ArrowLeft size={16} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="cart-summary-column">
          <div className="order-summary-card">
            <h3 className="summary-title">Order Summary</h3>

            {/* Promo Code Input */}
            <div className="promo-box">
              {promoApplied ? (
                <div className="promo-applied-badge">
                  <div className="promo-applied-text">
                    <Tag size={16} />
                    <span>Coupon <strong>SAVE10</strong> (-10%) Applied</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="remove-promo-btn"
                    aria-label="Remove coupon"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="promo-form">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. SAVE10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <button type="submit">Apply</button>
                </form>
              )}
              {promoError && <p className="promo-error">{promoError}</p>}
            </div>

            {/* Calculation Lines */}
            <div className="summary-line">
              <span>Items Subtotal ({totalItems})</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>

            {totalDiscount > 0 && (
              <div className="summary-line discount-line">
                <span>Product Savings</span>
                <span>- ₹{totalDiscount.toLocaleString("en-IN")}</span>
              </div>
            )}

            {promoApplied && (
              <div className="summary-line discount-line">
                <span>Coupon Discount (10%)</span>
                <span>- ₹{extraDiscount.toLocaleString("en-IN")}</span>
              </div>
            )}

            <div className="summary-line">
              <span>Estimated Delivery</span>
              <span>
                {shippingFee === 0 ? (
                  <strong className="free-shipping-tag">FREE</strong>
                ) : (
                  `₹${shippingFee}`
                )}
              </span>
            </div>

            <div className="summary-divider" />

            <div className="summary-line total-line">
              <span>Total Amount</span>
              <span className="total-price-val">
                ₹{finalTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="summary-tax-note">Inclusive of all taxes & duties</p>

            {/* Checkout Button */}
            <button
              type="button"
              className="checkout-btn"
              onClick={handleProceedToCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>

            {/* Security Guarantee */}
            <div className="summary-trust-notice">
              <ShieldCheck size={16} />
              <span>Safe & Secure 256-bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {isCheckingOut && (
        <div className="modal-backdrop" onClick={() => setIsCheckingOut(false)}>
          <div
            className="checkout-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-header">
              <h2>Quick Checkout</h2>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsCheckingOut(false)}
                aria-label="Close checkout"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleConfirmOrder} className="checkout-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Johnson"
                  defaultValue="Jane Doe"
                />
              </div>

              <div className="form-group">
                <label>Shipping Address</label>
                <input
                  type="text"
                  required
                  placeholder="Street address, apartment, suite"
                  defaultValue="42 Silicon Boulevard, Tech City"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" required defaultValue="Bengaluru" />
                </div>
                <div className="form-group">
                  <label>PIN Code</label>
                  <input type="text" required defaultValue="560100" />
                </div>
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-options">
                  <label className="payment-radio">
                    <input type="radio" name="payment" defaultChecked />
                    <span>Cash on Delivery (COD) / UPI on Delivery</span>
                  </label>
                </div>
              </div>

              <div className="checkout-total-banner">
                <span>Order Total to Pay:</span>
                <strong>₹{finalTotal.toLocaleString("en-IN")}</strong>
              </div>

              <button type="submit" className="confirm-order-btn">
                Confirm & Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Completed Confirmation Modal */}
      {orderCompleted && (
        <div className="modal-backdrop">
          <div className="success-modal" role="dialog" aria-modal="true">
            <div className="success-icon-wrap">
              <CheckCircle2 size={54} />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p className="order-id-label">
              Order Reference ID: <strong>{orderId}</strong>
            </p>
            <p className="order-desc">
              Thank you for shopping with ShopSphere! Your order is being
              prepared and will be delivered within 2-4 business days. A
              confirmation has been sent to your registered contact.
            </p>
            <div className="order-modal-actions">
              <Link
                to="/"
                className="hero-btn primary"
                onClick={() => setOrderCompleted(false)}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
