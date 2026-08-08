# RAAT — Backend & Admin Architecture

## Context

The site currently runs entirely on hardcoded data in [`lib/data.ts`](lib/data.ts) (products, collections, journal entries, testimonials, mock orders/addresses/account) plus inline copy in individual page components (hero headline, About page values/milestones, footer statement, contact info). There is no backend, no persistence, and no way to change anything without editing code and redeploying.

This document defines the backend that replaces all of that: a standalone Node.js API backed by **Neon** (serverless Postgres), with **Prisma** as the ORM, supporting a **full commerce** scope (real orders, inventory, customer accounts), **real authentication** for both admins and customers, a **CMS admin panel** covering the full catalog/order/content surface, and a **first-party analytics engine** modeled on Shopify-style admin analytics. The system is built **multi-tenant from day one** — every content/commerce/analytics table carries a `storeId` — because RAAT is the first of at least two stores (a perfume store is already planned) and the analytics engine specifically is meant to be reusable/extractable later. The admin dashboard's *UI* is out of scope for this phase — this document specifies the API/data layer it will be built against, plus the full list of screens it needs to support.

**Confirmed decisions:**
- Separate standalone Node.js backend, not folded into Next.js Route Handlers
- Full commerce scope: real orders, inventory, real customer accounts
- Prisma as ORM
- Real auth for both admin users and customers
- **Multi-tenant schema** (`Store` + `storeId` everywhere) — RAAT is store #1, reused by future stores
- **Analytics**: single event-tracking table as source of truth, nightly (or more frequent) aggregation jobs, no heavy computation on the write path
- **CMS**: hierarchical categories, variant-level bulk actions, low-stock alerts, order/return workflow, structured homepage content blocks, role-based admin access

**A note on scope vs. RAAT's design**: the CMS/analytics requirements below are store-agnostic — they apply to RAAT as-is. The design direction described alongside them (lighter palette, product-photography-led hero) contradicts RAAT's confirmed dark/moody system in `design.md` and is being treated here as **not applicable to RAAT** — either a different, not-yet-built store, or a generic template. Nothing in `design.md` changes as a result of this document. Flagged in §11 if that assumption is wrong.

**Open items** — flagged inline in §11, not blocking this document but blocking implementation of those specific pieces.

---

## 1. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Runtime | Node.js (LTS) | Explicit requirement |
| Framework | **Fastify** | Faster/lighter than Express, first-class TypeScript + schema validation, plugin model suits a REST API + a separate analytics-ingest path cleanly |
| Database | **Neon** (serverless Postgres) | Given |
| ORM | **Prisma** | Confirmed |
| Neon connection | `@prisma/adapter-neon` + Neon's pooled connection string | Serverless/edge-friendly connection handling |
| Validation | `zod` | Shared schemas validate request bodies and double as Fastify route schemas |
| Auth | Custom JWT (access token) + httpOnly refresh cookie, `bcrypt` for password hashing | Framework-agnostic, works with a standalone Fastify app |
| Media storage | **Cloudflare R2** (S3-compatible) — see §11 | Neon is Postgres-only; R2 is cheap, S3-compatible, no egress fees |
| Scheduled jobs | **`node-cron`** in-process to start, or a hosted cron (Railway/Render cron, or a serverless scheduled function) once traffic justifies a dedicated worker | Runs the nightly analytics aggregation and alert-comparison jobs (§8) — no separate job-queue infra needed at this scale |
| Alert delivery | Email via **Resend** (simplest DX) to start; Slack/WhatsApp webhook adapters added later per §8.5 | Keeps the alerting feature's first version cheap to ship |
| Frontend | Existing Next.js app, unchanged in framework — its data fetching switches from importing `lib/data.ts` to calling this API | No frontend rewrite needed |

---

## 2. Repo Structure

```
/app, /components, /lib      <- existing Next.js frontend (unchanged structure)
/server                       <- standalone Fastify + Prisma backend
  /prisma
    schema.prisma
    seed.ts                  <- seeds DB from current lib/data.ts content
  /src
    /routes                  <- products.ts, collections.ts, orders.ts, auth.ts, events.ts, analytics.ts, ...
    /plugins                 <- auth guard, prisma client, error handler, tenant (store) resolver
    /jobs                    <- NEW: nightly aggregation job, alert-comparison job
    /lib                     <- password hashing, jwt helpers, R2 client, KPI query functions
    server.ts                <- Fastify app entry
  package.json
/admin                        <- FUTURE: admin dashboard UI (not built yet)
```

`/server` gets its own `package.json`/`node_modules` — a genuinely separate Node service.

---

## 3. Database Schema

Prisma models, grouped by domain. `createdAt`/`updatedAt` omitted below but present on every model.

### Multi-tenancy

```prisma
model Store {
  id        String   @id @default(cuid())
  slug      String   @unique   // "raat", "perfume-store-slug"
  name      String
  products      Product[]
  categories    Category[]
  collections   Collection[]
  journalEntries JournalEntry[]
  testimonials  Testimonial[]
  contentBlocks ContentBlock[]
  customers     Customer[]
  orders        Order[]
  events        AnalyticsEvent[]
  adminUsers    AdminUser[]
}
```

Every model below that's store-scoped carries `storeId String` + a relation to `Store`, and every unique constraint that was global (e.g. `Product.slug`) becomes **unique per store** (`@@unique([storeId, slug])`) instead — two stores can both have a product slugged `wrap-kurta`.

### Catalog

```prisma
model Product {
  id           String   @id @default(cuid())
  store        Store    @relation(fields: [storeId], references: [id])
  storeId      String
  slug         String
  name         String
  description  String
  price        Int
  category     Category @relation(fields: [categoryId], references: [id])
  categoryId   String
  collection   Collection @relation(fields: [collectionId], references: [id])
  collectionId String
  status       ProductStatus @default(DRAFT)  // replaces the old plain `published` boolean
  images       ProductImage[]
  variants     ProductVariant[]

  @@unique([storeId, slug])
}

enum ProductStatus {
  DRAFT
  LIVE
  ARCHIVED
}

model ProductImage {
  id        String  @id @default(cuid())
  product   Product @relation(fields: [productId], references: [id])
  productId String
  url       String
  sortOrder Int     @default(0)
}

model ProductVariant {
  id                String  @id @default(cuid())
  product           Product @relation(fields: [productId], references: [id])
  productId         String
  sku               String  @unique
  size              String
  color             String
  stock             Int     @default(0)
  lowStockThreshold Int     @default(5)   // admin gets an alert/badge when stock <= this
  priceOverride     Int?

  @@unique([productId, size, color])
}

model Collection {
  id        String   @id @default(cuid())
  store     Store    @relation(fields: [storeId], references: [id])
  storeId   String
  slug      String
  name      String
  blurb     String
  heroImage String
  products  Product[]

  @@unique([storeId, slug])
}

model Category {
  id       String     @id @default(cuid())
  store    Store      @relation(fields: [storeId], references: [id])
  storeId  String
  name     String
  image    String
  // Hierarchical: Men/Women -> Tops/Bottoms -> sub-type. Null parent = top level.
  parent   Category?  @relation("CategoryTree", fields: [parentId], references: [id])
  parentId String?
  children Category[] @relation("CategoryTree")
  sortOrder Int       @default(0)
  featuredProductIds String[]  @default([])  // pinned products on the category landing page
  products Product[]

  @@unique([storeId, name])
}
```

RAAT's current flat `CATEGORIES` list (Kurtas, Sarees, Lehengas, Jackets, Blouses, Accessories) just becomes six top-level `Category` rows with no children — the hierarchy is opt-in per store, not a forced migration.

### Editorial

```prisma
model JournalEntry {
  id        String   @id @default(cuid())
  store     Store    @relation(fields: [storeId], references: [id])
  storeId   String
  slug      String
  category  String
  title     String
  date      DateTime
  heroImage String
  excerpt   String
  body      Json
  published Boolean  @default(true)

  @@unique([storeId, slug])
}

model Testimonial {
  id      String @id @default(cuid())
  store   Store  @relation(fields: [storeId], references: [id])
  storeId String
  quote   String
  author  String
  sortOrder Int  @default(0)
}
```

### Site content

```prisma
model ContentBlock {
  id      String @id            // "home.hero.headline", "about.milestones", "footer.statement"
  store   Store  @relation(fields: [storeId], references: [id])
  storeId String
  page    String
  type    String                // "text" | "richtext" | "image" | "json"
  value   Json

  @@unique([storeId, id])
}
```

Still one flexible key/value model — now also the home for **structured homepage sections** (hero content, featured-collection picks, promo banners) referenced in the CMS requirements, stored as `type: "json"` blocks the admin's page-builder-style editor renders.

### Commerce

```prisma
model Customer {
  id           String    @id @default(cuid())
  store        Store     @relation(fields: [storeId], references: [id])
  storeId      String
  email        String
  passwordHash String
  name         String
  addresses    Address[]
  orders       Order[]
  cart         Cart?

  @@unique([storeId, email])
}

model Address {
  id         String   @id @default(cuid())
  customer   Customer @relation(fields: [customerId], references: [id])
  customerId String
  label      String
  name       String
  lines      String[]
  isDefault  Boolean  @default(false)
}

model Cart {
  id         String     @id @default(cuid())
  customer   Customer?  @relation(fields: [customerId], references: [id])
  customerId String?    @unique
  sessionId  String?    @unique
  items      CartItem[]
}

model CartItem {
  id        String  @id @default(cuid())
  cart      Cart    @relation(fields: [cartId], references: [id])
  cartId    String
  variant   ProductVariant @relation(fields: [variantId], references: [id])
  variantId String
  qty       Int
}

model Order {
  id                String            @id @default(cuid())
  store             Store             @relation(fields: [storeId], references: [id])
  storeId           String
  orderNumber       String            @unique // "RA-20486"
  customer          Customer          @relation(fields: [customerId], references: [id])
  customerId        String
  fulfillmentStatus FulfillmentStatus @default(PROCESSING)
  paymentStatus     PaymentStatus     @default(PENDING)
  subtotal          Int
  shippingCost      Int               @default(0)
  total             Int
  shippingAddress   Json
  items             OrderItem[]
  returns           Return[]
}

enum FulfillmentStatus {
  PROCESSING
  SHIPPED
  DELIVERED
  RETURNED
}

enum PaymentStatus {
  PENDING
  PAID
  REFUNDED
  FAILED
}

model OrderItem {
  id              String  @id @default(cuid())
  order           Order   @relation(fields: [orderId], references: [id])
  orderId         String
  variant         ProductVariant @relation(fields: [variantId], references: [id])
  variantId       String
  qty             Int
  priceAtPurchase Int
}

model Return {
  id        String       @id @default(cuid())
  order     Order        @relation(fields: [orderId], references: [id])
  orderId   String
  reason    String
  status    ReturnStatus @default(REQUESTED)
  refundAmount Int?
}

enum ReturnStatus {
  REQUESTED
  APPROVED
  REJECTED
  REFUNDED
}
```

Splitting `status` into `fulfillmentStatus` + `paymentStatus` (rather than one combined enum) is what makes "filter orders by payment status" (§2.3 of your spec) a plain column filter instead of string-parsing a combined state.

### Auth & admin

```prisma
model AdminUser {
  id           String    @id @default(cuid())
  store        Store     @relation(fields: [storeId], references: [id])
  storeId      String
  email        String    @unique
  passwordHash String
  role         AdminRole @default(STAFF)
}

enum AdminRole {
  OWNER   // full access incl. managing other admin users, all stores they own
  EDITOR  // content + catalog + orders, no admin-user management
  STAFF   // limited access -- exact limits TBD, see §11
}

model Media {
  id         String   @id @default(cuid())
  store      Store    @relation(fields: [storeId], references: [id])
  storeId    String
  url        String
  altText    String?
  uploadedAt DateTime @default(now())
}
```

`AdminUser.storeId` assumes one admin belongs to one store for v1. Once the perfume store is real, an `OWNER` who runs both becomes a many-to-many (`AdminUserStore` join table) rather than a single FK — noted, not built until that's an actual requirement (YAGNI today).

---

## 4. Auth Design

- **Password hashing**: `bcrypt`, cost factor 12, for both `Customer.passwordHash` and `AdminUser.passwordHash`
- **Session strategy**: short-lived JWT access token + long-lived refresh token in an **httpOnly, secure cookie**. Access token carries `{ sub, storeId, role: "customer" | "admin", adminRole? }`. `POST /api/auth/refresh` issues a new access token from the cookie.
- **Route guards**: Fastify `preHandler` plugins — `requireAuth("customer")`, `requireAuth("admin")`, `requireAdminRole("OWNER" | "EDITOR")` — plus a **tenant-resolver plugin** that reads `storeId` off the authenticated admin/customer (or off a `?store=` / subdomain for public reads) and scopes every query to it automatically, so no route handler can accidentally leak cross-store data.
- **Customer auth replaces**: `CUSTOMER_NAME`/`MOCK_ACCOUNT` and the static "Ananya" account — real signup/login, `/account` fetches real `Customer`/`Order`/`Address` records.
- **Admin auth is net-new**: nothing today.

---

## 5. API Surface

REST, JSON. All routes implicitly scoped to a store (via the tenant-resolver plugin). Public endpoints are unauthenticated reads; `/api/admin/*` requires `requireAuth("admin")`.

| Resource | Public | Admin |
|---|---|---|
| Products | `GET /api/products`, `GET /api/products/:slug` (`?category=&collection=&price=&sort=`) | `POST/PUT/DELETE /api/admin/products`, variant + image sub-resources, `POST /api/admin/products/bulk` (price/stock/category bulk update) |
| Collections | `GET /api/collections`, `GET /api/collections/:slug` | `POST/PUT/DELETE /api/admin/collections` |
| Categories | `GET /api/categories` (tree) | `POST/PUT/DELETE /api/admin/categories`, `PATCH /api/admin/categories/reorder` |
| Journal | `GET /api/journal`, `GET /api/journal/:slug` | `POST/PUT/DELETE /api/admin/journal` |
| Testimonials | `GET /api/testimonials` | `POST/PUT/DELETE /api/admin/testimonials` |
| Content blocks | `GET /api/content/:page` | `PUT /api/admin/content/:id` |
| Cart | `GET/POST/PATCH/DELETE /api/cart` | — |
| Orders | `GET /api/orders`, `POST /api/orders` (checkout) | `GET /api/admin/orders` (filters: status, payment status, date range), `PATCH /api/admin/orders/:id`, `POST /api/admin/orders/:id/returns` |
| Addresses | `GET/POST/PUT/DELETE /api/account/addresses` | — |
| Auth | `POST /api/auth/customer/{register,login,logout,refresh}` | `POST /api/auth/admin/{login,logout,refresh}` |
| Media | — | `POST /api/admin/media/upload`, `GET /api/admin/media` |
| Admin users | — | `GET/POST/PUT/DELETE /api/admin/users` (OWNER only) |
| **Events** (new) | `POST /api/events` — fire-and-forget, no auth required (works for guests) | — |
| **Analytics** (new) | — | `GET /api/admin/analytics/{best-sellers, trending, cart-interest, funnel, cart-behavior, retention, traffic-funnel}` — all accept `?window=7d\|30d` |

---

## 6. Content Migration Map

Unchanged from the prior version of this doc — see the table format below, now implicitly store-scoped to RAAT (`storeId` for RAAT's row in `Store`).

| Current source | Becomes |
|---|---|
| `lib/data.ts` → `PRODUCTS` | `Product` + `ProductVariant` + `ProductImage` rows |
| `lib/data.ts` → `COLLECTIONS` | `Collection` rows |
| `lib/data.ts` → `CATEGORIES` / `CATEGORY_IMAGES` | `Category` rows (top-level, no children) |
| `lib/data.ts` → `JOURNAL_ENTRIES` | `JournalEntry` rows |
| `lib/data.ts` → `TESTIMONIALS` | `Testimonial` rows |
| `lib/data.ts` → `MOCK_ORDERS`, `MOCK_ADDRESSES`, `MOCK_ACCOUNT`, `CUSTOMER_NAME` | Deleted — replaced by real records via auth |
| Hero/About/footer/contact inline copy | `ContentBlock` rows |
| Hardcoded Unsplash `img()` calls | `Media` rows |
| `lib/cart-context.tsx` | Stays as optimistic UI layer, synced to server `Cart`/`CartItem` |

---

## 7. Admin Dashboard — Screens Needed (UI built later)

1. **Dashboard** — order/revenue snapshot + top-line analytics (best-sellers, trending, today's alerts)
2. **Products** — list, create/edit, variant + image management, bulk price/stock/category actions, low-stock badges
3. **Collections** & **Categories** — list, create/edit, drag-and-drop tree ordering, featured-product pinning per category
4. **Journal** — list, create/edit (rich text body)
5. **Testimonials** — list, reorder, create/edit
6. **Site Content** — page-builder-style editor per `ContentBlock`, grouped by page (hero, featured collections, promo banners)
7. **Orders** — list with status/payment/date filters, detail view, manual status updates, return/refund workflow
8. **Customers** — list (order history, total spend, last order date — all derived from `Order`, not stored), detail drill-in
9. **Media Library** — upload, browse, delete
10. **Admin Users** — OWNER-only, role assignment (OWNER/EDITOR/STAFF)
11. **Analytics** (new) — its own section, one view per §8 KPI group: Product Performance, Cart & Checkout Behavior, Retention & CLV, Traffic → Revenue Funnel, Alerts log

---

## 8. Analytics Engine

### 8.1 Foundational design

A single append-only table is the source of truth for every behavioral signal:

```prisma
model AnalyticsEvent {
  id         String    @id @default(cuid())
  store      Store     @relation(fields: [storeId], references: [id])
  storeId    String
  userId     String?   // Customer.id, null for guests
  sessionId  String
  eventType  EventType
  productId  String?
  variantId  String?   // relevant for size/color-level breakdowns
  metadata   Json      @default("{}")  // e.g. { checkoutStep: "shipping" }, { trafficSource: "instagram" }
  occurredAt DateTime  @default(now())

  @@index([storeId, eventType, occurredAt])
  @@index([storeId, productId, occurredAt])
}

enum EventType {
  PRODUCT_VIEW
  ADD_TO_CART
  REMOVE_FROM_CART
  CHECKOUT_STEP_REACHED
  PURCHASE
}
```

- Writes go through a single lightweight endpoint (`POST /api/events`) that does nothing but validate + insert — **no aggregation, no joins, on the write path**, so it can't slow down checkout.
- Composite indexes on `(storeId, eventType, occurredAt)` and `(storeId, productId, occurredAt)` are what keep the raw table queryable at volume even before rollups exist.

### 8.2 Aggregation jobs (nightly, cadence TBD — see §11)

A scheduled job (`/server/src/jobs`) reads yesterday's `AnalyticsEvent` rows and writes pre-computed rollups, so every dashboard read is a fast lookup against a small summary table instead of a full scan:

```prisma
model DailyProductStats {
  id           String   @id @default(cuid())
  store        Store    @relation(fields: [storeId], references: [id])
  storeId      String
  productId    String
  date         DateTime // truncated to day
  views        Int      @default(0)
  addsToCart   Int      @default(0)
  purchases    Int      @default(0)
  unitsSold    Int      @default(0)
  revenue      Int      @default(0)

  @@unique([storeId, productId, date])
}
```

`best-sellers`, `trending` (week-over-week growth computed from this table, not raw events), and the product-level funnel all read from `DailyProductStats` rather than `AnalyticsEvent` directly once it's populated. Raw events stay around for ad-hoc queries and re-aggregation if the rollup logic changes.

### 8.3 KPI catalog → implementation

| Requirement | How it's computed |
|---|---|
| Best-sellers by revenue / by units | `SUM(revenue)` / `SUM(unitsSold)` from `DailyProductStats`, tracked as two separate sorts since they diverge |
| Trending (7d/30d growth) | Compare current window's `views`+`purchases` sum to the prior equal-length window, rank by % growth, not raw total |
| Most-carted-but-not-purchased | `SUM(addsToCart)` high, `SUM(purchases)` low/zero, same window — a ratio query, not a new table |
| Product conversion funnel | `views → addsToCart → purchases` counts from `DailyProductStats`, expressed as step-over-step % |
| Variant-level breakdowns | Same shape as above but grouped by `AnalyticsEvent.variantId` instead of rolling up to product — kept as a raw-event query (lower volume than product-level) rather than its own rollup table initially |
| Cart abandonment by step | `COUNT(*)` grouped by `metadata.checkoutStep` on `CHECKOUT_STEP_REACHED` events, minus those with a later `PURCHASE` event in the same session |
| Avg cart value (abandoned vs. completed) | From `Cart`/`CartItem` at time of last `CHECKOUT_STEP_REACHED` vs. `Order.total` |
| Repeat purchase rate / time-to-second-purchase | `Order` rows grouped by `customerId`, ordered by `createdAt` |
| Cohort CLV | Customers grouped by month of first `Order`, cumulative `SUM(total)` tracked per cohort per subsequent month |
| Churn signal | Customers with no `Order` containing a given category in the last N days |
| Traffic → revenue funnel | `metadata.trafficSource` on `PRODUCT_VIEW` events, joined through to eventual `PURCHASE` in the same session |

### 8.4 Abandoned-cart recovery (scope TBD — see §11)

Once in scope: a scheduled job flags carts with `CHECKOUT_STEP_REACHED` but no `PURCHASE` within N hours, triggers a recovery email, and logs `sent → opened → returned → purchased` as additional `AnalyticsEvent` rows (`eventType` extended, or a separate lightweight `RecoveryEmailLog` table — decide once this phase is actually scheduled).

### 8.5 Alerts

A second scheduled job compares each KPI's latest value against its trailing rolling average; anything outside a configurable threshold writes an `AlertLog` row and fires a notification (Resend email first; Slack/WhatsApp webhook adapters are additive later, not a rearchitecture).

```prisma
model AlertRule {
  id        String @id @default(cuid())
  store     Store  @relation(fields: [storeId], references: [id])
  storeId   String
  metric    String   // "cart_abandonment_rate", "trending_growth", ...
  threshold Float    // e.g. 0.20 = alert if metric moves >20% vs rolling average
  channel   String   // "email" | "slack" | "whatsapp"
  target    String   // email address / webhook URL
}

model AlertLog {
  id        String   @id @default(cuid())
  rule      AlertRule @relation(fields: [ruleId], references: [id])
  ruleId    String
  message   String
  firedAt   DateTime @default(now())
}
```

This is called out in your spec as the most likely differentiator versus a passive dashboard, and it's cheap given the aggregation jobs already exist — it's one more comparison step on data that's already being computed nightly.

### 8.6 Relationship to GA4

Not a replacement — GA4 stays for general traffic/session analytics. This engine is the retail-specific layer GA4 doesn't do well: product-level trend detection, step-granular cart drop-off, cohort CLV, proactive alerts, and permanent first-party data ownership not subject to GA4 retention limits or ad-blocker loss.

### 8.7 Reusability / multi-tenancy

Every table in this section already carries `storeId` (§3), and the analytics routes/jobs live in their own `/server/src/routes/analytics.ts` + `/server/src/jobs` without reaching into store-specific catalog logic — so "extract this into a standalone product" later is a matter of moving those files into their own service and pointing them at multiple stores' data, not a rewrite. Cross-store benchmarking ("your abandonment rate vs. category average") becomes a straightforward `GROUP BY storeId` comparison once a second store's data exists.

---

## 9. Phased Rollout

1. **Schema + seed** — `schema.prisma` incl. `Store`, migrate, seed RAAT's data as `storeId` "raat" from current `lib/data.ts`
2. **Public read API** — products/collections/categories/journal/testimonials/content; swap Next.js pages to `fetch()` calls
3. **Event tracking (write path only)** — `POST /api/events` + frontend instrumentation (view/add-to-cart/checkout-step/purchase events fired from existing pages) — ships *before* any dashboard, so data starts accumulating immediately
4. **Admin auth + admin CRUD API** — products/categories/collections/journal/testimonials/content, verified via Prisma Studio/curl
5. **Customer auth + real cart/orders** — replace mock `/account`, wire checkout to create a real `Order`
6. **Aggregation + alert jobs** — nightly rollup job, alert-comparison job, analytics read endpoints
7. **Media pipeline** — R2 upload + `Media` library
8. **Admin dashboard UI** — separate effort, built against steps 2–7

---

## 10. Design Note (carried over, not acted on)

RAAT's palette/typography/motion system in `design.md` is unchanged by this document. If the lighter, product-photography-led direction in your spec's §4 was actually meant for RAAT (not a future/different store), say so explicitly — it would mean revisiting `design.md`, which affects the already-built frontend, not just this backend document.

---

## 11. Open Items

- **Object storage provider** — defaulted to Cloudflare R2; confirm or swap for Vercel Blob/UploadThing
- **Payment processing** — mock "Place Order" persisting a real `Order`, or a real gateway (Stripe test mode)?
- **Hosting for `/server`** — not decided (Railway/Render/Fly.io are common fits)
- **Staff role scope** — `AdminRole.STAFF` exists in the schema but its exact permission boundary (which screens/actions it can touch vs. EDITOR) isn't defined yet
- **Aggregation job cadence** — nightly by default; confirm if traffic is expected to justify hourly/more frequent
- **Abandoned-cart recovery email** — scope and timing not yet scheduled (§8.4)
- **Design direction conflict** — see §10
