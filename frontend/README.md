# Mzizi — E-Commerce Frontend

A Next.js (Pages Router) storefront and admin dashboard, built frontend-first with mock data ahead of backend integration (MongoDB, Supabase, M-Pesa Daraja API).

## Tech Stack

- **Next.js 16** (Pages Router)
- **React 19**
- **Tailwind CSS v4** (installed via PostCSS — no CDN)
- **Supabase Auth** (email/password + Google OAuth)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables (for authentication)

Copy the example env file and fill in your Supabase project credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

> **Without these variables**, the app still runs fully — login/signup pages render with a warning banner, and forms won't authenticate until Supabase is configured.

#### Enabling Google sign-in

1. In the [Supabase Dashboard](https://supabase.com/dashboard) → **Authentication → Providers → Google**, enable the Google provider.
2. Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com/) → **APIs & Services → Credentials**.
3. Add this redirect URI to your Google OAuth client:
   ```
   https://your-project.supabase.co/auth/v1/callback
   ```
4. Paste the Google Client ID and Secret into the Supabase provider settings.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── components/         # Shared UI components (Navbar, ProductCard, etc.)
│   └── admin/           # Admin-only components (AdminLayout, ProductForm)
├── context/             # React Context providers (Cart, Auth)
├── data/                # Mock JSON data (products, orders, reviews)
├── lib/                 # Helpers (formatting, Supabase client)
└── pages/
    ├── index.js          # Homepage / product grid
    ├── products/[id].js  # Product detail page
    ├── search.js         # Search & category filter
    ├── cart.js           # Shopping cart
    ├── checkout.js        # Checkout + M-Pesa payment UI
    ├── orders.js          # Buyer order tracking
    ├── auth/
    │   ├── login.js       # Email/password + Google login
    │   └── signup.js      # Email/password + Google sign-up
    └── admin/
        ├── dashboard.js    # Seller overview
        ├── products.js     # Product table (edit/delete)
        ├── products/new.js # Add product form
        ├── products/[id]/edit.js
        ├── orders.js       # Order management
        └── reviews.js      # Customer feedback
```

## Features Implemented (Frontend-First Build)

- Responsive layout with collapsible mobile navigation
- Product catalogue, detail pages, and search/category filtering
- Cart with persistent state (localStorage) via React Context
- Checkout flow with mock M-Pesa STK push simulation
- Buyer order tracking with status progress indicator
- Product reviews (view + submit, stored in local state)
- Admin dashboard: stats, product CRUD UI, order status management, feedback view
- Authentication UI wired to Supabase: email/password sign up & login, Google OAuth

## Notes

- All data (`src/data/*.json`) is mock data for frontend development. It will be replaced by MongoDB-backed API routes in the backend integration phase.
- Authentication is fully wired to Supabase's client SDK — once `.env.local` is set up with a real project and Google provider, sign up, login, and Google sign-in work end-to-end.
- See the PRD documents shared separately for the full product requirements and phased build plan.
