This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.

# Product Requirements Document (PRD)
## E-Commerce Web Application

**Document Version:** 1.0  
**Date:** June 13, 2026  
**Status:** Draft  
**Author:** Peter Kioko  

---

## 1. Overview

This document outlines the product requirements for a full-stack e-commerce web application built with Next.js. The platform supports two primary user roles — **Buyers** and **Admin/Sellers** — and is designed to enable seamless product discovery, cart management, checkout, order tracking, and seller-side order fulfillment.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend / Framework | Next.js (App Router) |
| Authentication | Supabase Auth |
| Database | MongoDB |
| Payments | M-Pesa Daraja API |
| Deployment | Vercel |

---

## 3. User Roles

### 3.1 Buyer (User)
A registered customer who browses the platform, adds products to their cart, makes payments, and tracks orders.

### 3.2 Admin / Seller
A registered business operator who manages product listings, fulfills orders, tracks dispatches, and reviews customer feedback.

---

## 4. Functional Requirements

### 4.1 Buyer Features

#### 4.1.1 Authentication
- **Sign Up** — Buyers can create a new account using email/password via Supabase Auth.
- **Log In** — Buyers can log into their existing account.
- **Log Out** — Buyers can securely end their session.

#### 4.1.2 Product Browsing
- **View Products** — Buyers can browse all available products on the storefront.
- **Search Products** — Buyers can search products by name or keyword.

#### 4.1.3 Cart Management
- **Add to Cart** — Buyers can add one or more products to their shopping cart.
- **Remove from Cart** — Buyers can remove individual items from their cart.
- **View Cart** — Buyers can review all cart items, quantities, and totals before checkout.

#### 4.1.4 Checkout & Payment
- **Make Payment / Checkout** — Buyers can initiate checkout and complete payment via the **M-Pesa Daraja API** (STK Push).
- **Order Confirmation** — Buyers receive confirmation once payment is successful.

#### 4.1.5 Order Tracking
- **Track Order** — Buyers can view the real-time status of their orders (e.g., pending, dispatched, delivered).

#### 4.1.6 Reviews
- **Submit Review** — Buyers can leave a review/rating for a product after purchase.

---

### 4.2 Admin / Seller Features

#### 4.2.1 Authentication
- **Sign Up / Log In** — Admins/Sellers authenticate via Supabase Auth with a separate role designation.

#### 4.2.2 Product Management
- **Add Product** — Sellers can create new product listings (name, description, price, images, stock).
- **View Products** — Sellers can view all their listed products in a dashboard.
- **Update Product** — Sellers can edit product details and pricing.
- **Delete Product** — Sellers can remove a product listing.

#### 4.2.3 Order Management
- **View Orders** — Sellers can see all incoming orders with buyer details and order contents.
- **Dispatch Orders** — Sellers can mark orders as dispatched after fulfillment.
- **Track Orders** — Sellers can monitor the delivery status of dispatched orders.

#### 4.2.4 Feedback & Reviews
- **View Feedback / Reviews** — Sellers can read buyer reviews and ratings submitted for their products.

---

## 5. Non-Functional Requirements

| Requirement | Description |
|---|---|
| Responsiveness | The application must be fully responsive across mobile, tablet, and desktop viewports. |
| Performance | Pages should load quickly; use Next.js SSR/SSG where appropriate. |
| Security | Authentication is handled by Supabase; sensitive keys (M-Pesa, MongoDB URI) must be stored in environment variables. |
| Scalability | MongoDB schema should be designed to support future product categories, multiple sellers, and increased order volume. |
| Accessibility | Core UI components should follow basic WCAG accessibility guidelines. |

---

## 6. Pages / Routes (Suggested)

| Route | Description | Role |
|---|---|---|
| `/` | Homepage / Product listing | Public |
| `/products/[id]` | Single product detail page | Public |
| `/search` | Search results page | Public |
| `/auth/signup` | Sign up page | Public |
| `/auth/login` | Log in page | Public |
| `/cart` | Shopping cart | Buyer |
| `/checkout` | Checkout & M-Pesa payment | Buyer |
| `/orders` | Buyer order history & tracking | Buyer |
| `/reviews/[productId]` | Submit a review | Buyer |
| `/admin/dashboard` | Seller overview dashboard | Admin/Seller |
| `/admin/products` | Manage product listings | Admin/Seller |
| `/admin/products/new` | Add new product | Admin/Seller |
| `/admin/products/[id]/edit` | Edit existing product | Admin/Seller |
| `/admin/orders` | View & manage all orders | Admin/Seller |
| `/admin/reviews` | View customer feedback | Admin/Seller |

---

## 7. Data Models (High-Level)

### User
```json
{
  "id": "uuid (Supabase)",
  "email": "string",
  "role": "buyer | seller | admin",
  "name": "string",
  "createdAt": "timestamp"
}
```

### Product
```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "price": "number",
  "images": ["string (URL)"],
  "stock": "number",
  "sellerId": "string",
  "createdAt": "timestamp"
}
```

### Order
```json
{
  "_id": "ObjectId",
  "buyerId": "string",
  "items": [{ "productId": "ObjectId", "quantity": "number", "price": "number" }],
  "totalAmount": "number",
  "status": "pending | paid | dispatched | delivered",
  "mpesaTransactionId": "string",
  "createdAt": "timestamp"
}
```

### Review
```json
{
  "_id": "ObjectId",
  "productId": "ObjectId",
  "buyerId": "string",
  "rating": "number (1–5)",
  "comment": "string",
  "createdAt": "timestamp"
}
```

---

## 8. Payment Flow (M-Pesa Daraja)

1. Buyer clicks **"Pay with M-Pesa"** on the checkout page.
2. Frontend sends a request to a Next.js API Route (`/api/payments/mpesa`).
3. The API Route calls the **Daraja STK Push endpoint** with the buyer's phone number and order total.
4. M-Pesa sends an STK Push prompt to the buyer's phone.
5. Buyer approves the payment on their phone.
6. Daraja sends a callback to the app's webhook (`/api/payments/callback`).
7. The app verifies the payment and updates the order status to **"paid"** in MongoDB.

---

## 9. Authentication Flow (Supabase)

1. User signs up/logs in via Supabase Auth (email + password).
2. Supabase issues a JWT session token.
3. The Next.js middleware reads the session token to protect role-based routes.
4. Admin/Seller routes (`/admin/*`) are only accessible to users with the `seller` or `admin` role.

---

## 10. Milestones (Suggested Build Order)

| Phase | Deliverable |
|---|---|
| Phase 1 | Project setup: Next.js, Tailwind CSS, Supabase, MongoDB connection |
| Phase 2 | Authentication — Sign up, Log in, Role-based middleware |
| Phase 3 | Product listing, search, and detail pages (Buyer-facing storefront) |
| Phase 4 | Cart and Checkout flow |
| Phase 5 | M-Pesa Daraja API integration |
| Phase 6 | Order tracking (Buyer & Seller) |
| Phase 7 | Admin/Seller dashboard — Product CRUD, order management |
| Phase 8 | Reviews & Feedback system |
| Phase 9 | Testing, polish, responsive QA |
| Phase 10 | Deployment to Vercel |

---

## 11. Out of Scope (v1.0)

- Multi-vendor marketplace features (separate seller storefronts)
- Card payments (Stripe, PayPal) — only M-Pesa in v1
- Live chat / customer support
- Email/SMS order notifications (can be added in v2)
- Advanced analytics dashboard

---

*This PRD will be updated as the project evolves. Each phase may have its own detailed technical spec.*