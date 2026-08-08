import Image from "next/image";
import { notFound } from "next/navigation";
import { COLLECTIONS, PRODUCTS, getCollection } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { ImageWipe, StaggerGrid, StaggerItem } from "@/components/reveal";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = PRODUCTS.filter((p) => p.collection === collection.slug);

  return (
    <main>
      {/* Simple title-card hero -- image-wipe only, no hero-zoom (distinct from Home) */}
      <section className="relative flex h-[60vh] min-h-[420px] items-center justify-center overflow-hidden">
        <ImageWipe className="absolute inset-0">
          <Image src={collection.image} alt={collection.name} fill sizes="100vw" className="object-cover" />
        </ImageWipe>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(54,42,36,0.35) 0%, rgba(54,42,36,0.8) 100%)" }}
        />
        <div className="relative px-6 text-center">
          <p className="font-accent mb-4 text-sm uppercase tracking-[0.18em] text-header-ink/90">Collection</p>
          <h1 className="font-display mb-4 text-[clamp(2.5rem,5vw,4.5rem)] text-white">{collection.name}</h1>
          <p className="mx-auto max-w-[480px] text-header-ink/85">{collection.description}</p>
        </div>
        <div id="hero-sentinel" className="absolute bottom-0 h-px w-full" />
      </section>

      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
        <StaggerGrid className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {items.map((p) => (
            <StaggerItem key={p.id}>
              <ProductCard product={p} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </main>
  );
}
