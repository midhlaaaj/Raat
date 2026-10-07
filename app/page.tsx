import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  PRODUCTS,
  COLLECTIONS,
  type Collection,
  type Product,
} from "@/lib/data";
import { PRODUCT_GRID } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { StaggerGrid, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { CategoryScrollSection } from "@/components/category-scroll-section";
import { RecentlyViewed } from "@/components/recently-viewed";
import { TestimonialsRotator } from "@/components/testimonials-rotator";

function CollectionTile({
  collection,
  className = "",
  large = false,
}: {
  collection: Collection;
  className?: string;
  large?: boolean;
}) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={`group relative block w-full overflow-hidden rounded-xl bg-bg-elevated ${className}`}
    >
      <Image
        src={collection.image}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
      />
      <div
        className={`absolute inset-0 transition-colors ${
          large
            ? "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            : "bg-black/40 group-hover:bg-black/50"
        }`}
      />
      <div
        className={
          large
            ? "absolute bottom-0 left-0 w-full p-8 md:p-12"
            : "absolute inset-0 flex flex-col items-center justify-center p-5 text-center"
        }
      >
        <h3 className={`font-display mb-1.5 text-white ${large ? "text-4xl" : "text-2xl"}`}>
          {collection.name}
        </h3>
        <p className="text-sm text-white/80">{collection.blurb}</p>
      </div>
      <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-ink">
        <ArrowUpRight size={16} />
      </span>
    </Link>
  );
}

const signature = PRODUCTS.slice(0, 5);
const newArrivals = PRODUCTS.filter((p) => p.tag === "new").slice(0, 5);
const trending = PRODUCTS.filter((p) => p.tag === "trending").slice(0, 5);

function ProductRow({
  title,
  href,
  linkLabel,
  products,
}: {
  title: string;
  href: string;
  linkLabel: string;
  products: Product[];
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-10 md:pb-24">
      <SectionHeading title={title} href={href} linkLabel={linkLabel} />
      <StaggerGrid className={PRODUCT_GRID}>
        {products.map((p) => (
          <StaggerItem key={p.id}>
            <ProductCard product={p} />
          </StaggerItem>
        ))}
      </StaggerGrid>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      {/* Hero -- full-bleed looping video, one line and one CTA */}
      <section className="relative h-[calc(100svh-120px)] min-h-[480px] w-full overflow-hidden bg-bg-elevated">
        <video
          src="/video/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Bottom-only scrim so the white text stays readable without darkening the film */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-14 text-center md:pb-20">
          <h1 className="font-display mb-7 text-[clamp(2.25rem,5vw,4rem)] leading-none tracking-tight text-white">
            The New Season
          </h1>
          <Link
            href="/shop"
            className="rounded bg-white px-9 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-ink hover:text-white"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <CategoryScrollSection />

      <RecentlyViewed />

      <ProductRow title="Signature Picks" href="/shop" linkLabel="View All" products={signature} />
      <ProductRow title="New Arrivals" href="/shop" linkLabel="Shop New In" products={newArrivals} />

      {/* Collections -- asymmetric bento; on desktop the rows stretch to fill one viewport */}
      <section className="mx-auto max-w-[1440px] px-6 pb-20 md:flex md:h-[calc(100svh-80px)] md:max-h-[900px] md:min-h-[560px] md:flex-col md:px-10 md:pb-10">
        <SectionHeading title="Collections" eyebrow="Curated" href="/collections" linkLabel="All Collections" />
        <StaggerGrid className="grid grid-cols-1 gap-6 md:min-h-0 md:flex-1 md:grid-cols-2 md:grid-rows-2">
          <StaggerItem className="md:row-span-2 md:min-h-0">
            <CollectionTile
              collection={COLLECTIONS[0]}
              large
              className="aspect-square h-full md:aspect-auto"
            />
          </StaggerItem>
          <StaggerItem className="md:min-h-0">
            <CollectionTile collection={COLLECTIONS[2]} className="aspect-video md:aspect-auto md:h-full" />
          </StaggerItem>
          <StaggerItem className="md:min-h-0">
            <div className="grid grid-cols-2 gap-6 md:h-full">
              <CollectionTile collection={COLLECTIONS[1]} className="aspect-square md:aspect-auto md:h-full" />
              <CollectionTile collection={COLLECTIONS[3]} className="aspect-square md:aspect-auto md:h-full" />
            </div>
          </StaggerItem>
        </StaggerGrid>
      </section>

      <ProductRow title="Trending Now" href="/shop" linkLabel="View Trending" products={trending} />

      {/* Social proof */}
      <section className="w-full bg-bg-low px-6 py-20 md:py-24">
        <TestimonialsRotator />
      </section>
    </main>
  );
}
