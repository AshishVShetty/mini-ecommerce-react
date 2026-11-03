import { Link } from "react-router-dom";
import { Store, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <div className="not-found-badge">
          <Store size={18} />
          <span>Page Not Found</span>
        </div>
        <h1>Oops! We couldn't find that page</h1>
        <p>
          The page you are looking for may have been moved, renamed, or doesn't
          exist. Let's get you back to browsing our products.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="hero-btn primary">
            <ArrowLeft size={16} /> Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
