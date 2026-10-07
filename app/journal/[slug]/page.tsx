import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { JOURNAL_ENTRIES, PRODUCTS, getJournalEntry } from "@/lib/data";
import { PRODUCT_GRID } from "@/lib/utils";
import { readingTime } from "@/lib/journal";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return JOURNAL_ENTRIES.map((e) => ({ slug: e.slug }));
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) notFound();

  const index = JOURNAL_ENTRIES.indexOf(entry);
  const related = JOURNAL_ENTRIES.filter((e) => e.slug !== entry.slug).slice(0, 3);
  // Rotate through the catalogue so each story shows a different edit.
  const shopTheStory = [...PRODUCTS.slice(index * 4), ...PRODUCTS].slice(0, 5);

  return (
    <main>
      {/* Light title block, image below it -- no overlay */}
      <header className="mx-auto max-w-[820px] px-6 pb-10 pt-12 text-center md:pt-16">
        <Link
          href="/journal"
          className="mb-10 inline-flex items-center gap-2 text-sm text-ivory-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={15} /> All stories
        </Link>
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">
          {entry.category}
        </p>
        <h1 className="font-display mb-5 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.08] tracking-tight">
          {entry.title}
        </h1>
        <p className="mx-auto mb-6 max-w-xl text-lg leading-relaxed text-ivory-muted">{entry.excerpt}</p>
        <div className="text-sm text-ivory-muted">
          By the RAAT Studio · {entry.date} · {readingTime(entry)} min read
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="relative aspect-[16/8] overflow-hidden rounded-xl bg-bg-elevated">
          <Image src={entry.image} alt={entry.title} fill priority sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover" />
        </div>
      </div>

      <article className="mx-auto max-w-[680px] px-6 py-16 text-[1.075rem] leading-[1.85] md:py-20">
        <p className="first-letter:font-display first-letter:float-left first-letter:mr-3 first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-gold-deep">
          {entry.body[0]}
        </p>
        {entry.body.slice(1).map((p, i) => (
          <p key={i} className="mt-6">
            {p}
          </p>
        ))}
      </article>

      <section className="mx-auto max-w-[1440px] px-6 pb-20 md:px-10">
        <SectionHeading title="Shop the Story" href="/shop" linkLabel="Shop All" />
        <div className={PRODUCT_GRID}>
          {shopTheStory.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="border-t border-hairline bg-bg-low">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
          <SectionHeading title="Keep Reading" href="/journal" linkLabel="All Stories" />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {related.map((e) => (
              <Reveal key={e.slug}>
                <Link href={`/journal/${e.slug}`} className="group block">
                  <div className="relative mb-4 aspect-[3/2] overflow-hidden rounded-lg bg-bg-elevated">
                    <Image src={e.image} alt={e.title} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </div>
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">{e.category}</p>
                  <h3 className="font-display text-xl leading-snug transition-colors group-hover:text-gold-deep">{e.title}</h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
