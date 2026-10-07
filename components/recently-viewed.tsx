"use client";

import { getProduct } from "@/lib/data";
import { PRODUCT_GRID } from "@/lib/utils";
import { useRecentlyViewedIds } from "@/lib/recently-viewed";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";

/** The shopper's five most recent products; renders nothing until they've viewed one. */
export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const ids = useRecentlyViewedIds();
  const products = ids
    .filter((id) => id !== excludeId)
    .map((id) => getProduct(id))
    .filter((p) => p !== undefined)
    .slice(0, 5);

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-10 md:pb-24">
      <SectionHeading title="Recently Viewed" />
      <div className={PRODUCT_GRID}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
