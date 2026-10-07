"use client";

import { PRODUCTS } from "@/lib/data";
import { PRODUCT_GRID } from "@/lib/utils";
import { CARD_VARIANTS } from "@/components/lab/card-variants";

// A mixed sample: one or two from each collection, with and without tags.
const SAMPLE = [PRODUCTS[0], PRODUCTS[8], PRODUCTS[14], PRODUCTS[21], PRODUCTS[3]];

export default function ProductCardsLab() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 pb-28 pt-12 md:px-10">
      <p className="mb-14 max-w-2xl text-ivory-muted">
        Six product card options, each shown in the 5-up grid used across the site. Hover them, tap
        the hearts (they save to Favourites), and try quick-add on option B. Tell me the letter you
        want and I&apos;ll roll it out everywhere.
      </p>

      <div className="flex flex-col gap-20">
        {CARD_VARIANTS.map(({ id, name, note, Card }) => (
          <section key={id}>
            <div className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-hairline pb-4">
              <span className="font-display flex h-9 w-9 items-center justify-center rounded-full bg-ink text-lg text-bg">{id}</span>
              <h2 className="font-display text-2xl">{name}</h2>
              <p className="text-sm text-ivory-muted">{note}</p>
            </div>
            <div className={PRODUCT_GRID}>
              {SAMPLE.map((p) => (
                <Card key={p.id} product={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
