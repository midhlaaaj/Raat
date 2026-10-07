"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { PRODUCTS, getCollection } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { PRODUCT_GRID } from "@/lib/utils";
import { PageHeader } from "@/components/section-heading";
import { FilterDrawer, type PriceRange } from "@/components/filter-drawer";

type Sort = "featured" | "price-asc" | "price-desc" | "name-asc";
const SORT_LABELS: Record<Sort, string> = {
  featured: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A–Z",
};

export function ShopClient() {
  const params = useSearchParams();
  const initialCategory = params.get("category");
  const initialCollection = params.get("collection");

  const [categories, setCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [collections, setCollections] = useState<string[]>(initialCollection ? [initialCollection] : []);
  const [price, setPrice] = useState<PriceRange>("all");
  const [sort, setSort] = useState<Sort>("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const toggleCategory = (c: string) =>
    setCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  const toggleCollection = (c: string) =>
    setCollections((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const items = useMemo(() => {
    let list = PRODUCTS.slice();
    if (categories.length) list = list.filter((p) => categories.includes(p.category));
    if (collections.length) list = list.filter((p) => collections.includes(p.collection));
    if (price !== "all") {
      const [min, max] = price.split("-").map(Number);
      list = list.filter((p) => p.price >= min && p.price <= max);
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [categories, collections, price, sort]);

  const heading = (() => {
    if (collections.length === 1 && !categories.length) {
      const c = getCollection(collections[0]);
      if (c) return { title: c.name, subtitle: c.blurb };
    }
    if (categories.length === 1 && !collections.length) {
      return { title: categories[0], subtitle: `Shop the full ${categories[0]} edit.` };
    }
    return { title: "Shop the Full Edit", subtitle: "Handloom, hand-block, and zari craft for every day." };
  })();

  const activeChips = [
    ...categories.map((c) => ({ type: "category" as const, value: c, label: c })),
    ...collections.map((c) => ({
      type: "collection" as const,
      value: c,
      label: getCollection(c)?.name ?? c,
    })),
    ...(price !== "all" ? [{ type: "price" as const, value: price, label: "Price" }] : []),
  ];

  function removeChip(type: string, value: string) {
    if (type === "category") toggleCategory(value);
    if (type === "collection") toggleCollection(value);
    if (type === "price") setPrice("all");
  }

  return (
    <main>
      <PageHeader eyebrow="All Products" title={heading.title} subtitle={heading.subtitle} />

      <div className="mx-auto max-w-[1440px] px-6 pb-28 pt-10 md:px-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-5">
        <span className="text-sm text-ivory-muted">{items.length} results</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFilterOpen(true)}
            className={`label-ui flex items-center gap-2 rounded border px-5 py-2.5 transition-colors hover:border-ink ${
              filterOpen ? "border-ink" : "border-hairline-strong"
            }`}
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
          <div className="relative">
            <button
              onClick={() => setSortOpen((s) => !s)}
              aria-expanded={sortOpen}
              className={`label-ui flex items-center gap-2 rounded border px-5 py-2.5 transition-colors hover:border-ink ${
                sortOpen ? "border-ink" : "border-hairline-strong"
              }`}
            >
              Sort: {SORT_LABELS[sort]}
              <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-40 w-56 overflow-hidden rounded-lg border border-hairline bg-bg shadow-[0px_12px_24px_rgba(166,124,82,0.12)]">
                {(Object.keys(SORT_LABELS) as Sort[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSort(key);
                      setSortOpen(false);
                    }}
                    className={`block w-full border-b border-hairline px-4 py-3.5 text-left text-sm last:border-b-0 hover:bg-bg-elevated ${
                      sort === key ? "font-semibold text-ivory" : "text-ivory-muted"
                    }`}
                  >
                    {SORT_LABELS[key]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {activeChips.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {activeChips.map((chip) => (
            <span
              key={`${chip.type}-${chip.value}`}
              className="flex items-center gap-2 rounded-lg bg-bg-elevated px-3.5 py-1.5 text-xs text-ivory-muted"
            >
              {chip.label}
              <button aria-label={`Remove ${chip.label}`} onClick={() => removeChip(chip.type, chip.value)} className="text-ivory">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={`${categories.join(",")}|${collections.join(",")}|${price}|${sort}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0, 0, 0.3, 1] }}
          className={PRODUCT_GRID}
        >
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>
      </AnimatePresence>

      {items.length === 0 && (
        <p className="py-20 text-center text-ivory-muted">No products match these filters just yet.</p>
      )}

      <FilterDrawer
        open={filterOpen}
        onOpenChange={setFilterOpen}
        categories={categories}
        toggleCategory={toggleCategory}
        collections={collections}
        toggleCollection={toggleCollection}
        price={price}
        setPrice={setPrice}
        onApply={() => setFilterOpen(false)}
        onClear={() => {
          setCategories([]);
          setCollections([]);
          setPrice("all");
        }}
      />
      </div>
    </main>
  );
}
