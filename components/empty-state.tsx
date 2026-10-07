import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { CATEGORIES, CATEGORY_IMAGES, PRODUCTS } from "@/lib/data";
import { PRODUCT_GRID } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";

/**
 * Friendly empty page: icon medallion, headline, two actions, category shortcuts,
 * then a row of suggested products so the page is never a dead end.
 */
export function EmptyState({
  icon: Icon,
  title,
  body,
  suggestionsTitle = "You might like",
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  suggestionsTitle?: string;
}) {
  const suggestions = PRODUCTS.filter((p) => p.tag).slice(0, 5);

  return (
    <>
      <div className="mx-auto flex max-w-xl flex-col items-center px-6 pb-16 pt-16 text-center md:pt-20">
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-bg-elevated">
          <div className="absolute inset-3 rounded-full border border-dashed border-hairline-strong" />
          <Icon size={36} strokeWidth={1.25} className="text-gold-deep" />
        </div>
        <h2 className="font-display mb-3 text-[clamp(1.8rem,3vw,2.4rem)] leading-tight">{title}</h2>
        <p className="mb-8 max-w-md leading-relaxed text-ivory-muted">{body}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn-primary">
            Start Shopping
          </Link>
          <Link href="/collections" className="btn-outline">
            Browse Collections
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pb-16 md:px-10">
        <div className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6 md:mx-0 md:justify-center md:px-0">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/shop?category=${encodeURIComponent(cat)}`}
              className="flex flex-none items-center gap-2.5 rounded-full border border-hairline-strong py-1.5 pl-1.5 pr-4 text-sm transition-colors hover:border-ink"
            >
              <span className="relative h-8 w-8 overflow-hidden rounded-full bg-bg-elevated">
                <Image src={CATEGORY_IMAGES[cat]} alt="" fill sizes="32px" className="object-cover" />
              </span>
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-[1440px] px-6 pb-24 md:px-10">
        <SectionHeading title={suggestionsTitle} href="/shop" linkLabel="View All" />
        <div className={PRODUCT_GRID}>
          {suggestions.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
