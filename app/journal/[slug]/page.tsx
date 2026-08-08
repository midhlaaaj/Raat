import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JOURNAL_ENTRIES, getJournalEntry } from "@/lib/data";
import { ImageWipe, Reveal, TextSplit } from "@/components/reveal";

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

  const related = JOURNAL_ENTRIES.filter((e) => e.slug !== entry.slug).slice(0, 3);

  return (
    <main>
      <section className="relative flex h-[70vh] min-h-[460px] items-end justify-center overflow-hidden">
        <ImageWipe className="absolute inset-0">
          <Image src={entry.image} alt={entry.title} fill sizes="100vw" className="object-cover" />
        </ImageWipe>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, rgba(54,42,36,0.9) 0%, rgba(54,42,36,0.1) 60%)" }}
        />
        <div className="relative max-w-[760px] px-6 pb-12 text-center">
          <div className="mb-4 text-xs uppercase tracking-[0.1em] text-gold">{entry.category}</div>
          <h1 className="font-display mb-4 text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] text-white">
            <TextSplit text={entry.title} />
          </h1>
          <div className="text-sm text-header-ink/75">By the RAAT Studio · {entry.date}</div>
        </div>
        <div id="hero-sentinel" className="absolute bottom-0 h-px w-full" />
      </section>

      <article className="mx-auto max-w-[720px] px-6 py-20 text-[1.05rem] leading-[1.8]">
        <p>{entry.body[0]}</p>
        {entry.body.length > 1 && (
          <Reveal className="relative my-10 aspect-video bg-bg-elevated">
            <Image src={entry.image} alt="" fill sizes="720px" className="object-cover opacity-80" />
          </Reveal>
        )}
        {entry.body.slice(1).map((p, i) => (
          <p key={i} className="mt-6">
            {p}
          </p>
        ))}
      </article>

      <div className="mx-auto max-w-[1440px] px-6 pb-28 md:px-10">
        <h2 className="font-display mb-8 text-[clamp(1.5rem,3vw,2rem)]">Related Reading</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {related.map((e) => (
            <Link key={e.slug} href={`/journal/${e.slug}`} className="block">
              <div className="relative aspect-[4/5] overflow-hidden bg-bg-elevated">
                <Image src={e.image} alt={e.title} fill sizes="33vw" className="object-cover" />
              </div>
              <div className="pt-3.5">
                <div className="mb-1.5 text-xs uppercase text-gold">{e.category}</div>
                <h3 className="font-display text-base">{e.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
