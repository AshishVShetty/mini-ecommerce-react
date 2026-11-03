import { Store, ShieldCheck, Truck, RefreshCw, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="site-footer">
      {/* Value Badges Banner */}
      <div className="footer-perks">
        <div className="perk-card">
          <Truck size={24} className="perk-icon" />
          <div>
            <h4>Free Express Shipping</h4>
            <p>On all orders above ₹999 across India</p>
          </div>
        </div>
        <div className="perk-card">
          <ShieldCheck size={24} className="perk-icon" />
          <div>
            <h4>100% Genuine Products</h4>
            <p>Directly sourced from trusted brands</p>
          </div>
        </div>
        <div className="perk-card">
          <RefreshCw size={24} className="perk-icon" />
          <div>
            <h4>7-Day Easy Returns</h4>
            <p>Hassle-free replacement policy</p>
          </div>
        </div>
        <div className="perk-card">
          <Headphones size={24} className="perk-icon" />
          <div>
            <h4>24/7 Dedicated Support</h4>
            <p>We are always here to assist you</p>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="footer-col brand-col">
          <div className="brand footer-brand">
            <Store size={24} />
            <span>
              Shop<span className="brand-accent">Sphere</span>
            </span>
          </div>
          <p className="footer-tagline">
            Your destination for high-quality everyday essentials, lifestyle
            gear, and electronics designed with style, utility, and care.
          </p>
          <div className="footer-social-note">
            <span>Crafted with modern React & Vite</span>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <Link to="/">Home Marketplace</Link>
            </li>
            <li>
              <a href="/#products">All Products</a>
            </li>
            <li>
              <Link to="/cart">Shopping Cart</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Categories</h4>
          <ul className="footer-links">
            <li>
              <a href="/#products">Electronics</a>
            </li>
            <li>
              <a href="/#products">Fashion</a>
            </li>
            <li>
              <a href="/#products">Accessories</a>
            </li>
            <li>
              <a href="/#products">Home & Living</a>
            </li>
          </ul>
        </div>

        <div className="footer-col newsletter-col">
          <h4 className="footer-heading">Stay Connected</h4>
          <p>Subscribe for early access to discounts and exclusive drops.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
          {subscribed && (
            <p className="newsletter-success">
              🎉 Thanks for subscribing to ShopSphere updates!
            </p>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} ShopSphere Inc. Built for React Developer
          Assessment.
        </p>
        <div className="footer-sub-links">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security</span>
        </div>
      </div>
    </footer>
  );
}
