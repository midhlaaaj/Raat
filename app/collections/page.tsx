import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS, PRODUCTS } from "@/lib/data";
import { PageHeader } from "@/components/section-heading";
import { StaggerGrid, StaggerItem } from "@/components/reveal";

export const metadata = { title: "Collections — RAAT" };

/** Collection picker: choose a collection first, then browse its pieces. */
export default function CollectionsPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Collections"
        title="Choose a collection"
        subtitle="Four edits, each built around a single craft or colour story. Pick one to see every piece in it."
      />

      <div className="mx-auto max-w-[1440px] px-6 pb-28 pt-12 md:px-10">
        <StaggerGrid className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTIONS.map((c) => {
            const items = PRODUCTS.filter((p) => p.collection === c.slug);
            const from = Math.min(...items.map((p) => p.price));
            return (
              <StaggerItem key={c.slug}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-bg transition-colors hover:border-ink"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-bg-elevated">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  {/* Thumbnail strip of the first few pieces */}
                  <div className="grid grid-cols-4 gap-1 border-b border-hairline p-1">
                    {items.slice(0, 4).map((p) => (
                      <div key={p.id} className="relative aspect-square overflow-hidden rounded-sm bg-bg-elevated">
                        <Image src={p.images[0]} alt="" fill sizes="80px" className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display mb-1 text-2xl">{c.name}</h2>
                    <p className="mb-5 text-sm leading-relaxed text-ivory-muted">{c.blurb}</p>
                    <div className="mt-auto flex items-center justify-between text-sm">
                      <span className="text-ivory-muted">
                        {items.length} pieces · from ₹{from.toLocaleString("en-IN")}
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        Explore
                        <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </main>
  );
}
