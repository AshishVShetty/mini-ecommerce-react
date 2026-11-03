# 🛍️ ShopSphere - Mini E-Commerce Application

A responsive, feature-rich Mini E-Commerce web application built with **React**, **Vite**, and **React Router**. This project was developed as part of the **React Developer Intern - Take-Home Assessment**.

---

## 🚀 Live Demo & Repository
- **Live Demo URL:** `https://shopsphere-ecommerce.vercel.app` *(or your deployed Vercel/Netlify link)*
- **GitHub Repository:** https://github.com/AshishVShetty/mini-ecommerce-react

---

## ✨ Features Overview

### 1. 📦 Product Data Management
- Structured local JSON data (`src/data/products.json`) without any external API or backend dependencies.
- Products include attributes: `id`, `name`, `category`, `price`, `originalPrice`, `rating`, `reviewsCount`, `description`, `features`, `image`, and `inStock`.
- Diverse catalog spanning **Electronics**, **Fashion**, **Accessories**, and **Home & Living**.

### 2. 🔍 Product Listing, Search & Filtering
- **Responsive Product Grid:** Adapts seamlessly from 4 columns on large screens to 2 columns on tablets and 1-2 columns on mobile devices.
- **Real-Time Search:** Instant filtering across product names, categories, and descriptions.
- **Category Filter Tabs:** Filter items by *All*, *Electronics*, *Fashion*, *Accessories*, and *Home*.
- **Sorting Options:** Sort products by:
  - *Featured*
  - *Price: Low to High*
  - *Price: High to Low*
  - *Highest Customer Rating*
- **Empty State:** User-friendly fallback when no products match search criteria, featuring a one-click "Clear All Filters" button.
- **Loading State:** Skeleton shimmer loaders during initial catalog mount.

### 3. 📄 Product Details Page (`/product/:id`)
- **Dynamic Routing:** Route parameter matching with `react-router-dom` (`/product/:id`).
- **Interactive Breadcrumb Navigation:** Effortlessly navigate back to home or the active category.
- **Rich Product Information:** High-definition image view, category badge, discount percentage, star rating, detailed description, and key feature checklist.
- **Quantity Selector:** Increment and decrement desired quantities with bounds before adding to cart.
- **Add to Cart & Direct Cart Navigation:** Immediate visual feedback with animated "Added!" state.
- **Related Products Section:** Dynamically recommends similar items from the same category.
- **404 Handling:** Friendly "Product Not Found" fallback if an invalid ID is entered.

### 4. 🛒 Shopping Cart & LocalStorage Persistence
- **Global State Management:** Implemented via React Context API (`CartContext`) with custom `useCart()` hook.
- **Add to Cart:** Add single or multiple quantities from either the product listing or detail view.
- **Quantity Controls:** Adjust quantities (+ / -) directly from the cart with automatic subtotal recalculation.
- **Item Removal:** Remove individual products with confirmation feedback or clear the entire cart.
- **Cart Badge:** Live item count displayed in the sticky navigation bar across all pages.
- **Pricing Breakdown:** Computes Subtotal, Product Savings, Estimated Delivery, and Grand Total.
- **Free Shipping Tracker:** Interactive progress bar calculating amount left to unlock Free Express Shipping.
- **Promotional Coupon System:** Supports coupon `SAVE10` or `WELCOME10` for an extra 10% discount.
- **Simulated Checkout Flow:** Modal popup collecting shipping information, generating a random Order Reference ID and clearing the cart upon placement.
- **LocalStorage Persistence:** Cart state is automatically saved to and synchronized from `localStorage`.
- **Empty Cart State:** Clean empty state illustration with a quick button back to shopping.

### 5. 🎨 UI & Code Quality
- **Responsive Design:** Mobile-first, fluid layout tested on desktop, tablet, and mobile viewports.
- **Reusable Component Architecture:**
  - `Navbar` - Sticky header with brand logo, links, mobile drawer, and cart badge.
  - `Footer` - Value guarantees (Free Shipping, Returns, Genuine Guarantee), links, and newsletter subscription.
  - `ProductCard` - Product card with hover zoom, discount tags, rating, and quick-add button.
  - `StarRating` - Star rating display component with fractional stars and review counters.
  - `Toast` - Subtle popup notification when items are added or removed.
  - `ScrollToTop` - Automatically resets scroll position to `(0, 0)` on page navigation.
- **Error & Loading States:** Graceful handling of empty results, loading skeletons, and route 404s.
- **Clean Code & Hooks:** Adheres to React best practices using `useState`, `useEffect`, `useMemo`, `useCallback`, and custom hooks without prop drilling.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Core frontend UI library |
| **Vite** | Blazing-fast development server & bundler |
| **React Router v7** | Client-side declarative routing |
| **Lucide React** | Clean, lightweight icon suite |
| **Context API** | Scalable global cart state management |
| **CSS3** | Modern vanilla CSS with CSS variables, Flexbox, and CSS Grid |
| **ESLint** | Code quality and React Hooks rules |

---

## 📁 Project Directory Structure

```text
ECommerceWebsite/
├── public/
│   ├── _redirects              # Netlify client-side routing fallback
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                 # Static brand assets
│   ├── components/             # Reusable UI components
│   │   ├── Footer.jsx          # Site footer with value perks & newsletter
│   │   ├── Navbar.jsx          # Sticky navbar with mobile drawer & cart counter
│   │   ├── ProductCard.jsx     # Reusable product card with quick-add
│   │   ├── ScrollToTop.jsx     # Auto scroll-to-top on route change
│   │   ├── StarRating.jsx      # Dynamic star rating component
│   │   └── Toast.jsx           # Toast notification alert
│   ├── context/
│   │   └── CartContext.jsx     # Global cart state & localStorage provider
│   ├── data/
│   │   └── products.json       # Local dummy JSON product catalog
│   ├── pages/
│   │   ├── Cart.jsx            # Shopping cart with summary & checkout modal
│   │   ├── Home.jsx            # Product catalog with search, filter & sort
│   │   ├── NotFound.jsx        # 404 Not Found route handler
│   │   └── ProductDetails.jsx  # Detailed single product view & recommendations
│   ├── App.css                 # Comprehensive responsive styling
│   ├── App.jsx                 # App layout & React Router routing definitions
│   ├── index.css               # Typography and global CSS reset
│   └── main.jsx                # React root initialization
├── vercel.json                 # Vercel client-side routing rewrites
├── eslint.config.js            # ESLint configuration
├── package.json                # Project dependencies and npm scripts
├── vite.config.js              # Vite configuration
└── README.md                   # Documentation & setup guide
```

---

## ⚡ Getting Started (Local Setup)

Follow these steps to run the application locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

### 5. Preview production build
```bash
npm run preview
```

### 6. Lint code
```bash
npm run lint
```

---

## 🌐 Deployment Instructions

### Deploy to Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Select your GitHub repository.
4. Framework Preset: **Vite** (auto-detected).
5. Click **"Deploy"**.
*(Note: `vercel.json` is already included to ensure SPA routing works seamlessly).*

### Deploy to Netlify
1. Sign in to [Netlify](https://www.netlify.com/) and click **"Add new site" -> "Import an existing project"**.
2. Connect your GitHub repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **"Deploy site"**.
*(Note: `public/_redirects` is already included for Netlify rewrite rules).*

---

## 👨‍💻 Candidate Notes & Architectural Decisions
- **Context API vs Redux:** For an application of this scope, React's Context API with `useReducer`/`useState` and `useMemo` provides clean, lightweight state management without redundant boilerplate or third-party overhead.
- **LocalStorage Sync:** Cart actions directly invoke state setters which trigger a synchronized `useEffect` ensuring cart persistence across page reloads and tab closures.
- **Responsive Layout:** Engineered using mobile-first CSS Grid and Flexbox with breakpoints at `1100px`, `860px`, `768px`, and `480px`.
- **Accessibility:** Semantic HTML elements (`<main>`, `<header>`, `<article>`, `<nav>`, `<button>`) with appropriate ARIA attributes.
