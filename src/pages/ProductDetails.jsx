import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  Share2,
} from "lucide-react";
import productsData from "../data/products.json";
import { useCart } from "../context/CartContext";
import StarRating from "../components/StarRating";
import ProductCard from "../components/ProductCard";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, showToast } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Find product by id from URL parameter
  const product = useMemo(() => {
    return productsData.find((item) => item.id === Number(id));
  }, [id]);

  // Find related products in same category (excluding current)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return productsData
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4);
  }, [product]);

  // Handle case where product doesn't exist
  if (!product) {
    return (
      <div className="product-not-found-container">
        <div className="not-found-card">
          <h2>Product Not Found</h2>
          <p>
            The product you are looking for doesn't exist or may have been removed.
          </p>
          <Link to="/" className="hero-btn primary">
            <ArrowLeft size={16} /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!", "info");
    }
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="product-details-page">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} className="breadcrumb-sep" />
        <Link to={`/?category=${encodeURIComponent(product.category)}#products`}>
          {product.category}
        </Link>
        <ChevronRight size={14} className="breadcrumb-sep" />
        <span className="current-breadcrumb" aria-current="page">
          {product.name}
        </span>
      </nav>

      {/* Main Details Grid */}
      <div className="details-container">
        {/* Product Media Column */}
        <div className="details-image-col">
          <div className="main-image-wrap">
            <img
              src={product.image}
              alt={product.name}
              className="main-product-img"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=800&auto=format&fit=crop&q=80";
              }}
            />
            {discountPercent && (
              <span className="details-discount-pill">
                SAVE {discountPercent}%
              </span>
            )}
          </div>
        </div>

        {/* Product Information Column */}
        <div className="details-info-col">
          <div className="details-header-row">
            <span className="details-category-pill">{product.category}</span>
            <button
              onClick={handleShare}
              className="share-btn"
              title="Share product"
              aria-label="Share product"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>

          <h1 className="details-title">{product.name}</h1>

          {/* Rating Summary */}
          <div className="details-rating-row">
            <StarRating
              rating={product.rating}
              reviewsCount={product.reviewsCount}
              size={18}
            />
            <span className="rating-divider">|</span>
            <span className="stock-badge in-stock">
              <span className="stock-dot" /> In Stock & Ready to Ship
            </span>
          </div>

          {/* Price Box */}
          <div className="details-price-box">
            <div className="price-main">
              <span className="currency-symbol">₹</span>
              <span className="current-price-num">
                {product.price.toLocaleString("en-IN")}
              </span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="original-price-wrap">
                <span className="old-price">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="savings-badge">
                  Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                </span>
              </div>
            )}
            <p className="tax-inclusive-text">Inclusive of all local taxes</p>
          </div>

          {/* Description */}
          <div className="details-description">
            <h3>Overview</h3>
            <p>{product.description}</p>
          </div>

          {/* Key Specifications / Features */}
          {product.features && product.features.length > 0 && (
            <div className="details-features">
              <h3>Key Highlights</h3>
              <ul>
                {product.features.map((feature, idx) => (
                  <li key={idx}>
                    <Check size={16} className="feature-check-icon" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Purchase Actions (Quantity & Cart Buttons) */}
          <div className="purchase-controls">
            <div className="quantity-selector-block">
              <label htmlFor="qty-control" className="quantity-label">
                Quantity:
              </label>
              <div className="qty-counter" id="qty-control">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-number">{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="action-buttons-group">
              <button
                type="button"
                className={`add-to-cart-large ${added ? "added-active" : ""}`}
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <Check size={20} />
                    <span>Added {quantity} to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    <span>Add to Cart • ₹{(product.price * quantity).toLocaleString("en-IN")}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="view-cart-button"
                onClick={() => navigate("/cart")}
              >
                View Cart
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="trust-grid">
            <div className="trust-item">
              <Truck size={18} className="trust-icon" />
              <div>
                <strong>Express Delivery</strong>
                <span>Dispatches in 24 hours</span>
              </div>
            </div>
            <div className="trust-item">
              <RotateCcw size={18} className="trust-icon" />
              <div>
                <strong>7-Day Returns</strong>
                <span>Doorstep pickup guaranteed</span>
              </div>
            </div>
            <div className="trust-item">
              <ShieldCheck size={18} className="trust-icon" />
              <div>
                <strong>1 Year Warranty</strong>
                <span>Manufacturer authentic guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="related-header">
            <div>
              <span className="eyebrow">SIMILAR FINDS</span>
              <h2>You May Also Like</h2>
            </div>
            <Link to="/#products" className="view-more-link">
              View All Products <ChevronRight size={16} />
            </Link>
          </div>

          <div className="product-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
