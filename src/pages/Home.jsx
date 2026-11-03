import { useState, useMemo, useEffect } from "react";
import { Search, ShoppingBag, SlidersHorizontal, RotateCcw, Sparkles } from "lucide-react";
import productsData from "../data/products.json";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [isLoading, setIsLoading] = useState(true);

  // Categories list extracted dynamically with "All" prepended
  const categories = useMemo(() => {
    const unique = Array.from(new Set(productsData.map((p) => p.category)));
    return ["All", ...unique];
  }, []);

  // Simulate smooth data loading experience on initial mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = productsData.filter((product) => {
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query));

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Sorting logic
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("featured");
  };

  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">
            <Sparkles size={14} className="sparkle-icon" /> PREMIUM EVERYDAY ESSENTIALS
          </span>
          <h1>
            Upgrade Your Lifestyle <br />
            With ShopSphere.
          </h1>
          <p>
            Explore handcrafted essentials, cutting-edge electronics, and
            trendsetting fashion. Curated for performance, comfort, and style.
          </p>
          <div className="hero-actions">
            <a href="#products" className="hero-btn primary">
              <span>Explore Collection</span>
              <ShoppingBag size={18} />
            </a>
            <div className="hero-meta">
              <span className="meta-highlight">100% Genuine</span>
              <span className="meta-sep">•</span>
              <span className="meta-highlight">Free Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase Section */}
      <section className="products-section" id="products">
        {/* Section Heading & Search */}
        <div className="section-heading">
          <div className="section-title-wrap">
            <span className="eyebrow">CURATED COLLECTION</span>
            <h2>Our Featured Products</h2>
            <p>Find the best quality products for your lifestyle needs.</p>
          </div>

          <div className="search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search products, brands, or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search products"
            />
            {search && (
              <button
                className="clear-search-btn"
                onClick={() => setSearch("")}
                aria-label="Clear search input"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs and Sort Controls */}
        <div className="controls-bar">
          <div className="category-list" role="tablist">
            {categories.map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={selectedCategory === item}
                className={`category-btn ${
                  selectedCategory === item ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="sort-controls">
            <label htmlFor="sort-select" className="sort-label">
              <SlidersHorizontal size={15} />
              <span>Sort By:</span>
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Results Bar */}
        <div className="results-count">
          <span>
            Showing <strong>{filteredProducts.length}</strong> of{" "}
            {productsData.length} items
          </span>
          {(search || selectedCategory !== "All" || sortBy !== "featured") && (
            <button className="reset-inline-btn" onClick={handleResetFilters}>
              <RotateCcw size={13} /> Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid / Loading / Empty State */}
        {isLoading ? (
          <div className="product-grid skeleton-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-card">
                <div className="skeleton-img" />
                <div className="skeleton-content">
                  <div className="skeleton-line full" />
                  <div className="skeleton-line half" />
                  <div className="skeleton-line footer" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Search size={42} />
            </div>
            <h3>No matching products found</h3>
            <p>
              We couldn't find anything matching{" "}
              {search ? <strong>"{search}"</strong> : "your current filters"}. Try
              checking for typos or clearing your filters.
            </p>
            <button className="empty-state-btn" onClick={handleResetFilters}>
              <RotateCcw size={15} /> Clear All Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
