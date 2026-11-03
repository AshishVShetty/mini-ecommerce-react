import { Link } from "react-router-dom";
import { ShoppingCart, Eye, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import StarRating from "./StarRating";

export default function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  // Check how many of this item are currently in cart
  const itemInCart = cart.find((item) => item.id === product.id);
  const cartQuantity = itemInCart ? itemInCart.quantity : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-link">
        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&auto=format&fit=crop&q=80";
            }}
          />
          <span className="category-tag">{product.category}</span>
          {discountPercent && (
            <span className="discount-tag">-{discountPercent}%</span>
          )}

          <div className="card-overlay">
            <span className="overlay-btn">
              <Eye size={15} /> Quick View
            </span>
          </div>
        </div>

        <div className="product-info">
          <h3 className="product-title" title={product.name}>
            {product.name}
          </h3>

          <div className="card-rating-row">
            <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={14} />
          </div>

          <div className="product-bottom">
            <div className="price-block">
              <span className="price">₹{product.price.toLocaleString("en-IN")}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="original-price">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <button
              type="button"
              className={`add-btn ${justAdded ? "added" : ""}`}
              onClick={handleAdd}
              aria-label={`Add ${product.name} to cart`}
              title="Add to cart"
            >
              {justAdded ? (
                <>
                  <Check size={16} />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={15} />
                  <span>{cartQuantity > 0 ? `Add (${cartQuantity})` : "Add"}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
    </article>
  );
}
