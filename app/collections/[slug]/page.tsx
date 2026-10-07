import Image from "next/image";
import { notFound } from "next/navigation";
import { COLLECTIONS, PRODUCTS, getCollection } from "@/lib/data";
import { PRODUCT_GRID } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { CollectionSwitcher } from "@/components/collection-switcher";
import { Reveal, StaggerGrid, StaggerItem } from "@/components/reveal";

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
      {/* Light header: switcher first, then the collection intro beside its image */}
      <section className="border-b border-hairline bg-bg-low">
        <div className="mx-auto max-w-[1440px] px-6 pt-8 md:px-10 md:pt-10">
          <CollectionSwitcher active={collection.slug} />
        </div>
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-8 px-6 py-10 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-10 md:py-14">
          <Reveal>
            <p className="eyebrow mb-4">Collection · {items.length} pieces</p>
            <h1 className="font-display mb-4 text-[clamp(2.5rem,5vw,4rem)] leading-none">
              {collection.name}
            </h1>
            <p className="max-w-md leading-relaxed text-ivory-muted">{collection.description}</p>
          </Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-bg-elevated">
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-20">
        <StaggerGrid className={PRODUCT_GRID}>
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
