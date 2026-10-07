import Image from "next/image";
import Link from "next/link";
import { COLLECTIONS, PRODUCTS } from "@/lib/data";

/** Pill row for jumping between collections; the active one is filled. */
export function CollectionSwitcher({ active }: { active?: string }) {
  return (
    <nav aria-label="Collections" className="no-scrollbar -mx-6 flex gap-3 overflow-x-auto px-6 md:mx-0 md:flex-wrap md:px-0">
      <Link
        href="/collections"
        className="flex flex-none items-center rounded-full border border-hairline-strong px-5 py-2 text-sm transition-colors hover:border-ink"
      >
        All
      </Link>
      {COLLECTIONS.map((c) => {
        const isActive = c.slug === active;
        const count = PRODUCTS.filter((p) => p.collection === c.slug).length;
        return (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-none items-center gap-2.5 rounded-full border py-1.5 pl-1.5 pr-5 text-sm transition-colors ${
              isActive ? "border-ink bg-ink text-bg" : "border-hairline-strong hover:border-ink"
            }`}
          >
            <span className="relative h-7 w-7 overflow-hidden rounded-full bg-bg-elevated">
              <Image src={c.image} alt="" fill sizes="28px" className="object-cover" />
            </span>
            {c.name}
            <span className={isActive ? "text-bg/60" : "text-ivory-muted"}>{count}</span>
          </Link>
        );
      })}
    </nav>
  );
}
