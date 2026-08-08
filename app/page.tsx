import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  PRODUCTS,
  COLLECTIONS,
  HERO_IMAGE,
  type Collection,
} from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/reveal";
import { CategoryScrollSection } from "@/components/category-scroll-section";

function CollectionTile({
  collection,
  className,
}: {
  collection: Collection;
  className?: string;
}) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={`group relative block w-full overflow-hidden bg-bg ${className ?? ""}`}
    >
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        sizes="33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(0deg, rgba(54,42,36,0.85) 0%, rgba(54,42,36,0) 55%)" }}
      />
      <span className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-header-ink/10 text-header-ink backdrop-blur-sm transition-colors group-hover:bg-header-ink group-hover:text-ink">
        <ArrowUpRight size={16} />
      </span>
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <h3 className="font-display mb-1.5 text-2xl text-white">{collection.name}</h3>
        <p className="max-w-[200px] text-sm text-header-ink/70">{collection.blurb}</p>
      </div>
    </Link>
  );
}

const iconic = PRODUCTS.slice(0, 4);
const newArrivals = PRODUCTS.filter((p) => p.tag === "new").slice(0, 4);
const trending = PRODUCTS.filter((p) => p.tag === "trending").slice(0, 4);

export default function HomePage() {
  return (
    <main>
      {/* Hero -- pinned via position:sticky so the next section slides up and covers it */}
      <section className="sticky top-[76px] z-0 flex h-[calc(100vh-76px)] min-h-[560px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE}
            alt="RAAT — the new season"
            fill
            priority
            sizes="100vw"
            className="animate-[kenburns_22s_ease-in-out_infinite_alternate] object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(54,42,36,0.15) 0%, rgba(54,42,36,0.55) 75%, #362A24 100%)",
          }}
        />
        <div className="relative max-w-[900px] px-6 text-center">
          <p className="font-accent mb-5 text-sm uppercase tracking-[0.18em] text-header-ink">
            New Season
          </p>
          <h1 className="font-display mb-7 text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.95] text-white">
            Where Night
            <br />
            Becomes Wearable
          </h1>
          <Link
            href="/shop"
            className="inline-block border border-header-ink px-10 py-4 text-[13px] uppercase tracking-[0.08em] text-header-ink transition-colors hover:bg-header-ink hover:text-ink"
          >
            Shop the Collection
          </Link>
        </div>
        <div id="hero-sentinel" className="absolute bottom-0 h-px w-full" />
      </section>

      {/* hero-extend: continues the hero visually, no independent reveal */}
      <div className="relative z-[2] bg-bg" style={{ boxShadow: "0 -40px 60px 20px rgba(54,42,36,0.14)" }}>
        {/* Iconic */}
        <section className="mx-auto max-w-[1440px] px-6 pb-28 pt-24 md:px-10 md:pt-32">
          <Reveal className="mb-12">
            <p className="font-accent mb-3 text-sm uppercase tracking-[0.16em] text-ivory/90">Iconic</p>
            <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)]">Signature Pieces</h2>
          </Reveal>
          <StaggerGrid className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {iconic.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

        {/* New Arrivals */}
        <section className="mx-auto max-w-[1440px] px-6 pb-28 md:px-10">
          <Reveal className="mb-12">
            <p className="font-accent mb-3 text-sm uppercase tracking-[0.16em] text-ivory/90">Just In</p>
            <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)]">New Arrivals</h2>
          </Reveal>
          <StaggerGrid className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {newArrivals.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

        {/* Shop by Collection -- asymmetric bento grid */}
        <section className="bg-bg-elevated px-6 py-24 md:px-10">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-accent mb-3 text-sm uppercase tracking-[0.16em] text-ivory/90">
                  Curated
                </p>
                <h2 className="font-display mb-5 text-[clamp(2rem,4vw,2.75rem)]">Shop by Collection</h2>
                <div className="flex gap-3">
                  <Link
                    href="/shop"
                    className="rounded-full border border-ivory px-5 py-2 text-xs uppercase tracking-[0.05em] text-ivory transition-colors hover:bg-ivory hover:text-bg"
                  >
                    All Collections
                  </Link>
                  <Link
                    href="/journal"
                    className="rounded-full border border-hairline px-5 py-2 text-xs uppercase tracking-[0.05em] text-ivory-muted transition-colors hover:border-ivory hover:text-ivory"
                  >
                    The Lookbook
                  </Link>
                </div>
              </div>
              <p className="max-w-[320px] text-sm leading-relaxed text-ivory-muted">
                Four ways into the RAAT wardrobe — each collection built around a single hour of
                the night, from new moon to first light.
              </p>
            </Reveal>

            <StaggerGrid
              className="grid gap-5"
              style={{ gridTemplateColumns: "1.1fr 1fr 1fr" }}
            >
              {/* Amavas -- large tile, spans both rows */}
              <StaggerItem style={{ gridColumn: "1", gridRow: "1 / 3" }}>
                <CollectionTile collection={COLLECTIONS[0]} className="h-full min-h-[320px] md:min-h-[660px]" />
              </StaggerItem>

              {/* Neel -- top middle */}
              <StaggerItem style={{ gridColumn: "2", gridRow: "1" }}>
                <CollectionTile collection={COLLECTIONS[1]} className="h-full min-h-[240px] md:min-h-[318px]" />
              </StaggerItem>

              {/* Sanjh -- promo/text card, bottom middle */}
              <StaggerItem style={{ gridColumn: "2", gridRow: "2" }}>
                <Link
                  href={`/collections/${COLLECTIONS[3].slug}`}
                  className="flex h-full min-h-[240px] flex-col justify-between border border-gold/25 bg-gold/[0.07] p-6 md:min-h-[318px]"
                >
                  <span className="w-fit rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.05em] text-ink">
                    New Edit
                  </span>
                  <div>
                    <h3 className="font-display mb-2 text-xl text-ivory">{COLLECTIONS[3].name}</h3>
                    <p className="mb-4 text-sm text-ivory-muted">{COLLECTIONS[3].blurb}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.05em] text-gold">
                      Explore <ArrowUpRight size={14} />
                    </span>
                  </div>
                </Link>
              </StaggerItem>

              {/* Zari -- tall tile, spans both rows */}
              <StaggerItem style={{ gridColumn: "3", gridRow: "1 / 3" }}>
                <CollectionTile collection={COLLECTIONS[2]} className="h-full min-h-[320px] md:min-h-[660px]" />
              </StaggerItem>
            </StaggerGrid>
          </div>
        </section>

        <CategoryScrollSection />

        {/* Trending */}
        <section className="mx-auto max-w-[1440px] px-6 pb-28 md:px-10">
          <Reveal className="mb-12">
            <p className="font-accent mb-3 text-sm uppercase tracking-[0.16em] text-ivory/90">Trending</p>
            <h2 className="font-display text-[clamp(2rem,4vw,2.75rem)]">Trending Now</h2>
          </Reveal>
          <StaggerGrid className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {trending.map((p) => (
              <StaggerItem key={p.id}>
                <ProductCard product={p} />
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

      </div>
    </main>
  );
}
