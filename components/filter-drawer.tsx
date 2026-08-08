"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { COLLECTIONS, CATEGORIES } from "@/lib/data";

export type PriceRange = "all" | "0-5000" | "5000-10000" | "10000-999999";

export function FilterDrawer({
  open,
  onOpenChange,
  categories,
  toggleCategory,
  collections,
  toggleCollection,
  price,
  setPrice,
  onApply,
  onClear,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: string[];
  toggleCategory: (c: string) => void;
  collections: string[];
  toggleCollection: (c: string) => void;
  price: PriceRange;
  setPrice: (p: PriceRange) => void;
  onApply: () => void;
  onClear: () => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full border-hairline bg-bg p-0 sm:max-w-sm"
        style={{ transitionDuration: "450ms" }}
      >
        <SheetHeader className="border-b border-hairline px-6 py-5">
          <SheetTitle className="font-display text-lg text-ivory">Filter &amp; Sort</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-2">
          <div className="mb-8">
            <h4 className="mb-3 text-xs uppercase tracking-[0.05em] text-ivory-muted">Category</h4>
            {CATEGORIES.map((c) => (
              <label key={c} className="mb-2.5 flex items-center gap-2.5 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-gold"
                  checked={categories.includes(c)}
                  onChange={() => toggleCategory(c)}
                />
                {c}
              </label>
            ))}
          </div>
          <div className="mb-8">
            <h4 className="mb-3 text-xs uppercase tracking-[0.05em] text-ivory-muted">Collection</h4>
            {COLLECTIONS.map((c) => (
              <label key={c.slug} className="mb-2.5 flex items-center gap-2.5 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-gold"
                  checked={collections.includes(c.slug)}
                  onChange={() => toggleCollection(c.slug)}
                />
                {c.name}
              </label>
            ))}
          </div>
          <div className="mb-6">
            <h4 className="mb-3 text-xs uppercase tracking-[0.05em] text-ivory-muted">Price</h4>
            {(
              [
                ["all", "Any price"],
                ["0-5000", "Under ₹5,000"],
                ["5000-10000", "₹5,000 – ₹10,000"],
                ["10000-999999", "Above ₹10,000"],
              ] as [PriceRange, string][]
            ).map(([value, label]) => (
              <label key={value} className="mb-2.5 flex items-center gap-2.5 text-sm cursor-pointer">
                <input
                  type="radio"
                  name="price"
                  className="accent-gold"
                  checked={price === value}
                  onChange={() => setPrice(value)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        <SheetFooter className="border-t border-hairline px-6 py-5">
          <button
            className="mb-2 w-full bg-gold py-3 text-xs font-semibold uppercase tracking-[0.05em] text-ink"
            onClick={onApply}
          >
            Apply Filters
          </button>
          <button
            className="w-full border border-hairline py-3 text-xs uppercase tracking-[0.05em] text-ivory"
            onClick={onClear}
          >
            Clear All
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
