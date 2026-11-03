import { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag, Store, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProductsClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname === "/") {
      const section = document.getElementById("products");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("products");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <header className="navbar-header">
      <nav className="navbar">
        {/* Brand Logo */}
        <Link to="/" className="brand" onClick={() => setMobileMenuOpen(false)}>
          <div className="brand-icon-wrap">
            <Store size={22} />
          </div>
          <span className="brand-text">
            Shop<span className="brand-accent">Sphere</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive && !location.hash ? "active" : ""}`
            }
          >
            Home
          </NavLink>
          <a
            href="#products"
            onClick={handleProductsClick}
            className="nav-link"
          >
            Products
          </a>
        </div>

        {/* Action Controls */}
        <div className="nav-actions">
          <Link
            to="/cart"
            className="cart-link"
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <div className="cart-icon-wrapper">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="cart-count animate-pulse">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </div>
            <span className="cart-label">Cart</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-links">
            <Link
              to="/"
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a
              href="#products"
              className="mobile-nav-link"
              onClick={handleProductsClick}
            >
              Explore Products
            </a>
            <Link
              to="/cart"
              className="mobile-nav-link mobile-cart-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>View Cart</span>
              <span className="mobile-cart-badge">{totalItems} items</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
