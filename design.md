# RAAT — Design & Site Documentation

RAAT ("night," Hindi — रात) is a contemporary Indian/ethnic-fusion fashion label positioned as dark, moody, and editorial — the opposite of the soft cream-and-pastel look most brands in this category default to. Every surface should feel like it's lit for a magazine spread at dusk: low-key lighting, rich jewel-toned accents against near-black grounds, generous negative space, and typography with real contrast and confidence. Nothing here should read as a template — the reference mechanics documented below (adaptive header, whitespace-driven cards, restrained scroll motion) exist specifically to avoid the boxed, over-decorated feel of the first attempt.

This is the single source of truth for design tokens, motion behavior, and site structure. Every section below reflects a confirmed decision — build against it directly rather than improvising.

## Table of Contents

1. [Color Tokens](#1-color-tokens)
2. [Typography](#2-typography)
3. [Spacing, Radius, Elevation](#3-spacing-radius-elevation)
4. [Motion System](#4-motion-system)
5. [Card Structure](#5-card-structure)
6. [Imagery Direction](#6-imagery-direction)
7. [shadcn/ui Components](#7-shadcnui-components)
8. [Sitemap & Page-by-Page Spec](#8-sitemap--page-by-page-spec)
9. [Brand Naming Reference](#9-brand-naming-reference)

---

## 1. Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0C0B0A` | Page background — near-black, warm (not cool/blue-black) |
| `--bg-elevated` | `#151312` | Section bands, footer, elevated panels |
| `--surface` | `#1C1917` | Cards, inputs, drawers — one step lighter than bg-elevated |
| `--border` | `#2C2825` | Hairline dividers — used sparingly, whitespace does most separation |
| `--text` | `#F4EEE2` | Primary text — warm ivory, never pure white except rare emphasis |
| `--text-muted` | `#B8A99E` | Secondary text — captions, meta, muted labels |
| `--accent-gold` | `#E3B7A0` | Primary accent — CTAs, price emphasis, active states (soft pastel blush, softened from the original antique-brass gold) |
| `--accent-maroon` | `#C98CA0` | Secondary accent — badges, hover underlines (soft dusty-rose, softened from the original deep maroon) |
| `--white` | `#FFFFFF` | Rare, high-emphasis only (hero overlay text on very dark image) |

**Contrast check**: `--text` on `--bg` ≈ 15.8:1, `--text-muted` on `--bg` ≈ 6.1:1 — both clear AA/AAA for body text.

Do not introduce additional accent hues. Two accents (pastel blush + dusty rose), used deliberately and rarely, keep this feeling curated rather than decorative. The dark, near-black base (§ above) is retained deliberately — only the accent/text tone was softened toward pastel, per a 2026-08-09 decision to keep RAAT's moody "night" identity while making the accents feel warmer and less jewel-toned/formal.

---

## 2. Typography

| Role | Font | Weight(s) | Notes |
|---|---|---|---|
| Display / H1–H2 | **Bodoni Moda** | 400, 500 | High-contrast serif — thin hairlines, dramatic thick strokes. "Vogue masthead" register. Line-height 1.05–1.15 |
| Accent / eyebrows / wordmark | **Italiana** | 400 only | Very thin, all-caps, wide letter-spacing (0.12–0.2em). Logo wordmark, eyebrows, small editorial labels |
| Body / UI | **Inter** | 400, 500, 600 | Product data, nav, buttons, form fields — legible at 13–15px |

| Token | Size | Line-height | Font |
|---|---|---|---|
| `display-xl` | `clamp(3.5rem, 7vw, 7.5rem)` | 0.95 | Bodoni Moda 400 |
| `display-lg` | `clamp(2.5rem, 5vw, 4.5rem)` | 1.0 | Bodoni Moda 400 |
| `h2` | 2–2.75rem | 1.1 | Bodoni Moda 500 |
| `h3` | 1.5rem | 1.2 | Bodoni Moda 500 |
| `eyebrow` | 0.75rem, uppercase, tracking 0.18em | 1.4 | Italiana |
| `body` | 1rem | 1.6 | Inter 400 |
| `body-sm` | 0.875rem | 1.5 | Inter 400 |
| `label` | 0.8rem, uppercase, tracking 0.05em | 1.3 | Inter 500 |

Google Fonts import (verified live):
```
family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500;6..96,600&family=Italiana&family=Inter:wght@400;500;600
```

---

## 3. Spacing, Radius, Elevation

- Spacing: Tailwind default (4px base) — generous section padding (`py-24`–`py-36` desktop) over tight stacking; whitespace is a primary design tool
- Radius: near-zero (`0–2px`) on cards/buttons/inputs — sharp editorial edges. Exception: circular elements (close buttons, dot indicators) use full radius
- Elevation: no drop shadows by default. Separation via 1px `--border` hairline or a background-color step (`--bg` → `--bg-elevated` → `--surface`)

---

## 4. Motion System

**Libraries**: Framer Motion (`motion/react`) for reveals/stagger/transitions; **Lenis** for smooth momentum scrolling site-wide.

**Easing**: UI/interactive motion (drawers, hovers, page transitions) uses `cubic-bezier(0.16, 1, 0.3, 1)` ("expo-out"). Scroll-triggered content reveals use the softer `cubic-bezier(0, 0, 0.3, 1)` ("ease-out-slow"). Durations: 600–900ms for section-scale moments, 200–300ms for hover/micro-interactions. Everything degrades to instant under `prefers-reduced-motion`.

**Named patterns:**

| Pattern | Behavior |
|---|---|
| `reveal` | Slow pure fade on scroll entry (no rise) — `opacity 0.01→1`, 600ms, ease-out-slow, `whileInView` fires once |
| `stagger-grid` | Grid children animate in individually using `reveal`, 60–80ms delay per item; also used when a grid's contents *change* (see Shop filtering below) |
| `image-wipe` | Large editorial images unveil via a clip-path mask wipe as they enter viewport |
| `text-split` | Large H1/H2 moments split into words, fade-rise in sequence |
| `hero-zoom` | Hero image runs a slow, continuous Ken Burns zoom (scale 1 → ~1.08 over ~20s, looping or scroll-linked) behind centered headline/CTA — confirmed hero treatment (see §8) |
| `adaptive-header` | Header tracks section behind it, swaps color scheme, hides/reveals on scroll direction — full spec below |
| `hero-extend` | The section immediately following the hero does **not** get its own scroll-reveal — it continues the hero visually (same gradient treatment, drives `adaptive-header`) so hero + first section read as one unit |
| `card-crossfade` | Product card hover: primary image crossfades to a secondary angle over 300ms — no scale, no lift, no quick-add overlay |
| `drawer-slide` | Cart/filter `Sheet` slide-in, UI expo-out curve, tuned slower/weightier (450ms) than Radix's default |
| `route-dissolve` | Cross-dissolve between routes via `AnimatePresence`, 300ms |
| `grid-refilter` | When Shop filters/sort change: current items fade-out in a quick stagger (40ms/item), then new results run `stagger-grid` in — never an instant swap |
| `logo-glitch` | RAAT ↔ रात wordmark glitch — full spec below |
| `row-collapse` | Cart line-item removal: item fades out while its row height animates to 0, list reflows underneath — used wherever a list item is deleted (cart only for now) |

### Adaptive header

Transparent, overlaid on the hero at rest — no background, ivory logo/nav sitting directly on the hero image.

- Each section is tagged `data-header-scheme`; an `IntersectionObserver` on the section nearest the header line updates the header's color scheme (light-on-dark ↔ dark-on-light), transitioning ~400ms
- Header **hides on scroll-down, reappears on scroll-up** once past ~1 viewport height, gaining `backdrop-blur` + `--bg-elevated` fill only in this "sticky/reappeared" state — never while pinned over the hero

### Logo glitch (RAAT ↔ रात)

The header wordmark periodically glitches between the Latin "RAAT" and the Devanagari "रात":

- **Trigger**: loops automatically every 6–10s while the header is on screen (randomized within that window so it doesn't feel metronomic) — no user interaction required
- **Style**: RGB-split flicker — brief chromatic-aberration jitter (red/blue channel offset + a frame or two of static-like displacement) as the wordmark snaps from one script to the other, ~200–300ms per transition, then holds the resolved word for the loop interval before glitching again
- Respect `prefers-reduced-motion`: falls back to a plain cross-fade, or a static "RAAT" if motion is fully disabled
- Implementation note: two stacked text nodes ("RAAT" / "रात"), opacity + `clip-path`/translate jitter driven by a short keyframe sequence, not a canvas/WebGL effect — keep it cheap

### Scroll motion summary, hero to bottom

1. **Hero** — `hero-zoom` (continuous slow scale, centered headline/CTA), header transparent, `logo-glitch` running independently in the header
2. **Section immediately after hero** — `hero-extend`, no independent reveal
3. **Every section from the third section onward** — `reveal` (grids use `stagger-grid`), firing once at ~20% into viewport
4. **Header throughout** — `adaptive-header` + `logo-glitch`, both independent of section reveals
5. **Interactive layers** — `drawer-slide`, `route-dissolve`, `grid-refilter`, `row-collapse` as applicable per page

---

## 5. Card Structure

No border, no shadow, no background fill on the card itself — separation comes from grid gutters and whitespace only.

- **Media**: ratio-locked (`aspect-ratio: 4/5`), `object-fit: cover`, near-zero radius
- **Content block** below, left-aligned: (1) category/collection `label` eyebrow, (2) `h3`-scale product name in Bodoni Moda, (3) price in Inter 500 (`--accent-gold` only on sale/emphasis)
- **Grid**: 4-col desktop / 2-col tablet / 1-col mobile, `gap-6`–`gap-8`, no card padding
- **Hover**: `card-crossfade` only — primary image crossfades to a secondary angle, plus an understated underline draw on the product name. No quick-add button, no lift/scale/shadow — confirmed as the most restrained of the options considered, to stay consistent with the whitespace-driven philosophy

---

## 6. Imagery Direction

Real curated photography (Unsplash/Pexels), specifically searched for:

- **Low-key lighting** — subjects/garments lit against dark or shadowed backgrounds
- **Jewel-toned garments against dark backdrops** — deep maroon, emerald, indigo, gold-embellished fabric catching light in an otherwise dark frame
- **Texture macro shots** — handloom weave, hand-block print, embroidery/zari work, for section dividers and collection tile backgrounds
- **Moody portraiture** — dramatic single-source lighting, minimal/dark backgrounds
- Avoid: bright daylight lifestyle shots, white/neutral studio backgrounds, generic-stock-photo posing

Every image verified live (HTTP 200) before being wired into code.

---

## 7. shadcn/ui Components

`Sheet` (cart + filter drawers), `Button`, `Badge`, `Card` (base only — product cards are custom per §5), `Select`, `Accordion`, `Dialog`, `Input`, `Separator`, `Tabs`, `Skeleton`. Pulled via the connected shadcn MCP server, restyled with the tokens above (dark surface, near-zero radius, no default shadow).

---

## 8. Sitemap & Page-by-Page Spec

Next.js App Router paths. Every page shares the global header/footer/drawers unless noted.

```
/                       Home
/shop                   All Products (filter drawer + sort)
/collections/[slug]     Collection landing (Amavas, Neel, Zari, Sanjh)
/product/[slug]         Product Detail
/cart                   Cart
/checkout               Mock checkout
/about                  Our Story
/contact                Contact
/journal                Editorial index
/journal/[slug]         Editorial entry
```

**Global (every page):**
- Header — `adaptive-header` + `logo-glitch`, nav, search, cart icon with live count badge
- Mobile nav — full-screen overlay drawer
- Cart drawer (`Sheet`) — `drawer-slide`
- Footer — brand statement, link columns, newsletter, static outlined "RAAT" wordmark (no motion — deliberately quiet close, distinct from the header's glitch moment)

### `/` — Home

| Section | Content | Confirmed treatment |
|---|---|---|
| Hero | Full-bleed image, centered eyebrow + `display-xl` headline + CTA | `hero-zoom` (continuous slow Ken Burns), header transparent |
| Editorial band | One more full-bleed image + short brand line beneath | `hero-extend` — no independent reveal, continues the hero |
| Signature/Iconic picks | 4-up product grid | `reveal` + `stagger-grid`, `card-crossfade` on hover |
| New Arrivals | 4-up product grid | Same as above |
| Shop by Collection | 4-up grid of collection tiles (image + name + blurb overlay) | `reveal` + `stagger-grid`, `image-wipe` on tile images |
| Shop by Category | Horizontal-scroll strip of **rectangular** image tiles, category name overlaid | `reveal`; tiles link to `/shop?category=` |
| Trending Now | 4-up product grid | Same as Iconic/New Arrivals |
| Testimonials | **Rotating single quote** — one large centered quote at a time, cross-fading to the next | Auto-advance cross-fade, ~5–6s per quote, pauses on hover/focus |
| Story teaser | Split image/copy (image one side, headline+copy+stats other), links to `/about` | `reveal`, `image-wipe` on image, `text-split` on headline |
| Newsletter band | Email capture, own elevated (`--bg-elevated`) band above the footer | `reveal` |
| Footer | Brand statement, columns, newsletter fold-in N/A (separate band, not folded in), static wordmark | `reveal` |

### `/shop` — All Products

| Section | Content | Confirmed treatment |
|---|---|---|
| Page head | Title + description (dynamic per category/collection query param) | `reveal` |
| Toolbar | Result count, Filter button (opens `Sheet`), Sort select, active-filter chips | functional, no scroll animation |
| Filter drawer | Category/collection checkboxes, price radio group, Apply/Clear | `drawer-slide` |
| Product grid | 4-col responsive grid per §5 | Initial: `stagger-grid`. On filter/sort change: `grid-refilter` (stagger-out old → stagger-in new) |
| Empty state | Shown when filters return nothing | `reveal` |

### `/collections/[slug]` — Collection Landing

| Section | Content | Confirmed treatment |
|---|---|---|
| Collection hero | Full-bleed collection image + name + blurb | **Simple title-card** — `image-wipe` reveal only, no `hero-zoom`. Deliberately distinct from the homepage hero so Home stays the most "special" entrance |
| Product grid | Filtered to this collection | `stagger-grid` |

### `/product/[slug]` — Product Detail

| Section | Content | Confirmed treatment |
|---|---|---|
| Breadcrumb | Home / Category / Product name | none |
| Gallery | **Vertical stack scroll** — all images stacked in the gallery column | `reveal` per image as it scrolls into view |
| Info panel (sticky) | Name, price, **text pill** color/size swatches, qty stepper, Add to Cart, trust list | functional; swatches are outlined text-pill buttons for both size and color (no color-dot swatches) |
| Sticky add-to-cart bar | Appears once main CTA scrolls out of view | slides up, `drawer-slide` timing |
| Complete the Look | Related products grid | `reveal` + `stagger-grid` |

### `/cart`

| Section | Content | Confirmed treatment |
|---|---|---|
| Line items | Thumb, name, variant, qty stepper, remove | `reveal` on mount; **`row-collapse`** on remove (fade + height-collapse, list reflows) |
| Order summary | Subtotal/shipping/total, checkout CTA | none |

### `/checkout`

Mock shipping + payment form, order summary sidebar, "Place Order" confirmation state. No scroll animation — task-focused page, motion stays minimal/functional.

### `/about` — Our Story

| Section | Content | Confirmed treatment |
|---|---|---|
| Page hero | Eyebrow + headline + intro line | `text-split` |
| Story split blocks (×2+) | Alternating image/copy — **matches the homepage story-teaser treatment exactly** (not a more immersive variant) | `reveal`, `image-wipe` |
| Values grid | 3-up value cards | `stagger-grid` |
| Timeline | Founding-to-now milestones, **vertical line, left-aligned** | `reveal` per item as it scrolls in |

### `/contact`

| Section | Content | Confirmed treatment |
|---|---|---|
| Page hero | Eyebrow + headline | `text-split` |
| Form + info split | Contact form, studio info/hours/socials | `reveal` |

### `/journal` — Editorial Index

| Section | Content | Confirmed treatment |
|---|---|---|
| Page hero | Eyebrow + headline framing RAAT's editorial voice (styling notes, artisan features, behind-the-scenes) | `text-split` |
| Entry grid | Card-per-entry: image, category label, title, date — reuses §5 card structure | `reveal` + `stagger-grid` |

### `/journal/[slug]` — Editorial Entry

| Section | Content | Confirmed treatment |
|---|---|---|
| Entry hero | Full-bleed feature image + title + byline/date | `image-wipe`, `text-split` |
| Body | Long-form text with inline images | `reveal` per image; body text has no scroll animation (readability over motion) |
| Related entries | 3-up grid | `stagger-grid` |

---

## 9. Brand Naming Reference

- **Brand**: RAAT / रात ("night") — wordmark glitches between both per §4
- **Collections**: **Amavas** (new moon — darkest night), **Neel** (indigo/midnight blue), **Zari** (gold-thread embroidery), **Sanjh** (dusk/twilight) — confirmed, ready to wire into `/collections/[slug]` and product data
