"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, Ruler, Star, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { COLOR_HEX, formatPrice, getCollection, getRelatedProducts, type Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { WishlistButton } from "@/components/wishlist-button";

/* Design-lab product detail layouts. Each is a self-contained page body for one product. */

function useSelection(product: Product) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  function add() {
    if (!size) return;
    addItem(product.id, size, color, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }
  return { color, setColor, size, setSize, qty, setQty, added, add };
}
type Selection = ReturnType<typeof useSelection>;

function SwatchPicker({ product, sel }: { product: Product; sel: Selection }) {
  return (
    <div>
      <div className="mb-2.5 text-sm">
        Colour: <span className="font-medium">{sel.color}</span>
      </div>
      <div className="flex gap-2.5">
        {product.colors.map((c) => (
          <button
            key={c}
            aria-label={c}
            aria-pressed={sel.color === c}
            onClick={() => sel.setColor(c)}
            className={`h-9 w-9 rounded-full p-0.5 ring-1 transition ${sel.color === c ? "ring-2 ring-ink" : "ring-hairline-strong hover:ring-ink"}`}
          >
            <span className="block h-full w-full rounded-full" style={{ background: COLOR_HEX[c] ?? "#ccc" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

function ChipColorPicker({ product, sel }: { product: Product; sel: Selection }) {
  return (
    <div>
      <div className="mb-2.5 text-sm">Colour</div>
      <div className="flex flex-wrap gap-2">
        {product.colors.map((c) => (
          <button
            key={c}
            aria-pressed={sel.color === c}
            onClick={() => sel.setColor(c)}
            className={`flex items-center gap-2 rounded-full border py-1.5 pl-1.5 pr-4 text-sm transition-colors ${
              sel.color === c ? "border-ink" : "border-hairline-strong hover:border-ink"
            }`}
          >
            <span className="h-5 w-5 rounded-full ring-1 ring-black/10" style={{ background: COLOR_HEX[c] ?? "#ccc" }} />
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function SizePicker({ product, sel, square = false }: { product: Product; sel: Selection; square?: boolean }) {
  return (
    <div>
      <div className="mb-2.5 flex items-center justify-between text-sm">
        <span>
          Size{sel.size ? <>: <span className="font-medium">{sel.size}</span></> : <span className="text-ivory-muted"> — select one</span>}
        </span>
        <button className="flex items-center gap-1.5 text-ivory-muted underline-offset-4 hover:text-ink hover:underline">
          <Ruler size={14} /> Size guide
        </button>
      </div>
      <div className={`grid grid-cols-5 gap-2 ${square ? "" : "max-w-sm"}`}>
        {product.sizes.map((s, i) => {
          const low = i === 4; // demo: last size is nearly sold out
          return (
            <button
              key={s}
              aria-pressed={sel.size === s}
              onClick={() => sel.setSize(s)}
              className={`relative py-3 text-sm transition-colors ${square ? "aspect-square" : ""} rounded-md border ${
                sel.size === s ? "border-ink bg-ink text-bg" : "border-hairline-strong hover:border-ink"
              }`}
            >
              {s}
              {low && <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-maroon px-1.5 text-[9px] text-white">1 left</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Qty({ sel }: { sel: Selection }) {
  return (
    <div className="flex h-[58px] items-center rounded border border-hairline-strong">
      <button aria-label="Decrease quantity" className="flex h-full w-10 items-center justify-center" onClick={() => sel.setQty((q) => Math.max(1, q - 1))}>
        <Minus size={14} />
      </button>
      <span className="w-6 text-center text-sm">{sel.qty}</span>
      <button aria-label="Increase quantity" className="flex h-full w-10 items-center justify-center" onClick={() => sel.setQty((q) => q + 1)}>
        <Plus size={14} />
      </button>
    </div>
  );
}

function AddRow({ product, sel, withQty = true }: { product: Product; sel: Selection; withQty?: boolean }) {
  return (
    <div className="flex gap-3">
      {withQty && <Qty sel={sel} />}
      <button onClick={sel.add} disabled={!sel.size} className="btn-primary flex-1 !py-[18px]">
        {sel.added ? "Added ✓" : sel.size ? `Add to Cart — ${formatPrice(product.price * sel.qty)}` : "Select a size"}
      </button>
      <WishlistButton productId={product.id} productName={product.name} variant="inline" />
    </div>
  );
}

function Accordions({ product }: { product: Product }) {
  const rows = [
    { title: "Description", body: product.description },
    { title: "Fabric & care", body: "100% handloom cotton-silk. Dry clean recommended for the first wash, then gentle hand wash in cold water. Dry in shade." },
    { title: "Delivery & returns", body: "Free delivery across India in 3–5 days. Easy 7-day returns and exchanges, with free pickup from your door." },
  ];
  return (
    <div className="border-t border-hairline">
      {rows.map((r, i) => (
        <details key={r.title} open={i === 0} className="group border-b border-hairline">
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium">
            {r.title}
            <Plus size={16} className="transition-transform group-open:rotate-45" />
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-ivory-muted">{r.body}</p>
        </details>
      ))}
    </div>
  );
}

function Rating({ product }: { product: Product }) {
  const count = 12 + ((product.name.length * 7) % 90);
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="flex text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className={i < 4 ? "fill-gold" : "fill-gold/40"} strokeWidth={0} />
        ))}
      </div>
      <span className="text-ivory-muted underline-offset-4 hover:underline">{count} reviews</span>
    </div>
  );
}

function PincodeCheck() {
  const [pin, setPin] = useState("");
  const [result, setResult] = useState<string | null>(null);
  return (
    <div className="rounded-lg bg-bg-elevated p-4">
      <div className="mb-2 flex items-center gap-2 text-sm font-medium">
        <Truck size={16} /> Check delivery
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setResult(/^\d{6}$/.test(pin) ? "Delivery by Fri, 3 days · Free · COD available" : "Enter a 6-digit pincode");
        }}
      >
        <input
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          inputMode="numeric"
          maxLength={6}
          placeholder="Pincode"
          aria-label="Pincode"
          className="min-w-0 flex-1 rounded border border-hairline-strong bg-bg px-3 py-2 text-sm"
        />
        <button className="rounded bg-ink px-4 text-sm text-bg">Check</button>
      </form>
      {result && <p className="mt-2 text-sm text-ivory-muted">{result}</p>}
    </div>
  );
}

function Promises() {
  return (
    <ul className="grid grid-cols-3 gap-2 text-center text-xs text-ivory-muted">
      {[
        { icon: Truck, label: "Free delivery" },
        { icon: RotateCcw, label: "7-day returns" },
        { icon: ShieldCheck, label: "Handloom certified" },
      ].map(({ icon: Icon, label }) => (
        <li key={label} className="flex flex-col items-center gap-1.5 rounded-lg border border-hairline px-2 py-3">
          <Icon size={18} strokeWidth={1.5} className="text-gold-deep" />
          {label}
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Layouts ---------------- */

/** 1 — Thumbnail rail: vertical thumbs + main image, info with accordions. */
export function PdpThumbRail({ product }: { product: Product }) {
  const sel = useSelection(product);
  const [active, setActive] = useState(0);
  const collection = getCollection(product.collection);
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[80px_1fr_0.85fr] md:gap-8">
      <div className="order-2 flex gap-3 md:order-1 md:flex-col">
        {product.images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative aspect-[3/4] w-16 overflow-hidden rounded-md bg-bg-elevated ring-offset-2 md:w-full ${active === i ? "ring-2 ring-ink" : "opacity-70 hover:opacity-100"}`}
          >
            <Image src={src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
      <div className="relative order-1 aspect-[4/5] overflow-hidden rounded-lg bg-bg-elevated md:order-2">
        <Image src={product.images[active]} alt={product.name} fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover" />
      </div>
      <div className="order-3 flex flex-col gap-6 md:sticky md:top-28 md:self-start">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.16em] text-ivory-muted">{collection?.name} · {product.category}</p>
          <h1 className="font-display mb-3 text-[2.25rem] leading-tight">{product.name}</h1>
          <Rating product={product} />
          <div className="mt-4 text-2xl">{formatPrice(product.price)}</div>
          <div className="text-xs text-ivory-muted">Inclusive of all taxes</div>
        </div>
        <SwatchPicker product={product} sel={sel} />
        <SizePicker product={product} sel={sel} />
        <AddRow product={product} sel={sel} />
        <Accordions product={product} />
      </div>
    </div>
  );
}

/** 2 — Gallery grid: 2×2 photo grid, compact sticky info with delivery check. */
export function PdpGalleryGrid({ product }: { product: Product }) {
  const sel = useSelection(product);
  const collection = getCollection(product.collection);
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
      <div className="grid grid-cols-2 gap-2">
        {product.images.map((src, i) => (
          <div key={i} className="relative aspect-[3/4] overflow-hidden rounded bg-bg-elevated">
            <Image src={src} alt={`${product.name} view ${i + 1}`} fill sizes="(max-width: 768px) 50vw, 30vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-6 md:sticky md:top-28 md:self-start">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/collections/${product.collection}`} className="text-sm text-gold-deep hover:underline">{collection?.name}</Link>
            <h1 className="mt-1 text-[1.75rem] font-medium leading-tight">{product.name}</h1>
          </div>
          <div className="text-xl">{formatPrice(product.price)}</div>
        </div>
        <p className="leading-relaxed text-ivory-muted">{product.description}</p>
        <ChipColorPicker product={product} sel={sel} />
        <SizePicker product={product} sel={sel} />
        <AddRow product={product} sel={sel} withQty={false} />
        <PincodeCheck />
        <Promises />
      </div>
    </div>
  );
}

/** 3 — Carousel: one image at a time with arrows and dots; mobile-first, centred info. */
export function PdpCarousel({ product }: { product: Product }) {
  const sel = useSelection(product);
  const [i, setI] = useState(0);
  const n = product.images.length;
  return (
    <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-14">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bg-elevated">
          {product.images.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={idx === i ? product.name : ""}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-opacity duration-500 ${idx === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <button aria-label="Previous image" onClick={() => setI((i - 1 + n) % n)} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-sm">
            <ChevronLeft size={18} />
          </button>
          <button aria-label="Next image" onClick={() => setI((i + 1) % n)} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-sm">
            <ChevronRight size={18} />
          </button>
          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs">{i + 1} / {n}</span>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          {product.images.map((_, idx) => (
            <button key={idx} aria-label={`Image ${idx + 1}`} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-6 bg-ink" : "w-1.5 bg-hairline-strong"}`} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-6 text-center md:pt-6 md:text-left">
        <div>
          {product.tag && <span className="mb-3 inline-block rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold-deep">{product.tag}</span>}
          <h1 className="font-display mb-2 text-[clamp(2rem,4vw,2.75rem)] leading-tight">{product.name}</h1>
          <div className="flex justify-center md:justify-start"><Rating product={product} /></div>
        </div>
        <div className="text-3xl font-light">{formatPrice(product.price)}</div>
        <div className="flex justify-center md:justify-start"><SwatchPicker product={product} sel={sel} /></div>
        <SizePicker product={product} sel={sel} square />
        <AddRow product={product} sel={sel} />
        <p className="text-sm leading-relaxed text-ivory-muted">{product.description}</p>
      </div>
    </div>
  );
}

/** 4 — Editorial split: half-bleed photo, tinted info column, mini "complete the look". */
export function PdpEditorial({ product }: { product: Product }) {
  const sel = useSelection(product);
  const collection = getCollection(product.collection);
  const look = getRelatedProducts(product, 3);
  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl md:grid-cols-2">
      <div className="flex flex-col gap-1 bg-bg-elevated">
        {product.images.slice(0, 2).map((src, i) => (
          <div key={i} className="relative aspect-[4/5]">
            <Image src={src} alt={`${product.name} view ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
        ))}
      </div>
      <div className="bg-bg-low px-6 py-10 md:px-14 md:py-16">
        <div className="flex flex-col gap-7 md:sticky md:top-28">
          <div>
            <p className="eyebrow mb-4">{collection?.name} Collection</p>
            <h1 className="font-display mb-4 text-[clamp(2.4rem,4.5vw,3.5rem)] leading-[1.02] tracking-tight">{product.name}</h1>
            <p className="max-w-md text-lg leading-relaxed text-ivory-muted">{product.description}</p>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl">{formatPrice(product.price)}</span>
            <span className="text-sm text-ivory-muted">or 3 × {formatPrice(Math.round(product.price / 3))} interest-free</span>
          </div>
          <SwatchPicker product={product} sel={sel} />
          <SizePicker product={product} sel={sel} />
          <AddRow product={product} sel={sel} withQty={false} />
          <div>
            <div className="mb-3 text-sm font-medium">Complete the look</div>
            <div className="grid grid-cols-3 gap-3">
              {look.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="relative mb-2 aspect-[3/4] overflow-hidden rounded-md bg-bg-elevated">
                    <Image src={p.images[0]} alt={p.name} fill sizes="120px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="line-clamp-1 text-xs">{p.name}</div>
                  <div className="text-xs text-ivory-muted">{formatPrice(p.price)}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const PDP_VARIANTS = [
  { id: "1", name: "Thumbnail rail", note: "Classic retail layout. Fast to scan, accordions keep details tidy.", Layout: PdpThumbRail },
  { id: "2", name: "Gallery grid", note: "Every photo visible at once; delivery check and promises up front.", Layout: PdpGalleryGrid },
  { id: "3", name: "Carousel", note: "One image at a time, centred info. Best on mobile.", Layout: PdpCarousel },
  { id: "4", name: "Editorial split", note: "Magazine feel with a built-in mini complete-the-look.", Layout: PdpEditorial },
] as const;
