import Image from "next/image";
import { FOUNDER_IMAGE, ARTISAN_IMAGE } from "@/lib/data";
import { Reveal, StaggerGrid, StaggerItem, ImageWipe, TextSplit } from "@/components/reveal";

const VALUES = [
  { title: "Slow Craft", body: "Every piece is made to order in small batches, never rushed for speed." },
  { title: "Fair Partnership", body: "Artisan partners are paid above fair-trade rates, season after season." },
  { title: "Made to Last", body: "Natural fibers and considered construction, built for years of wear." },
];

const MILESTONES = [
  { year: "2019", title: "RAAT is founded", body: "Three weavers, one silhouette, Jaipur." },
  { year: "2021", title: "Amavas launches", body: "Our first full collection, built around the new moon." },
  { year: "2023", title: "Zari partnership", body: "Long-term partnership with Varanasi zari artisans begins." },
  { year: "2025", title: "Four collections", body: "Amavas, Neel, Zari and Sanjh, all in rotation." },
  { year: "2026", title: "RAAT online", body: "The full collection arrives on raat.com." },
];

export default function AboutPage() {
  return (
    <main>
      <div id="hero-sentinel" className="absolute top-[70vh]" />
      <div className="mx-auto max-w-[900px] px-6 pb-16 pt-20 text-center md:pt-28">
        <p className="font-accent mb-5 text-sm uppercase tracking-[0.18em] text-ivory/90">Our Story</p>
        <h1 className="font-display mb-6 text-[clamp(2.5rem,5vw,4rem)] leading-[1.05]">
          <TextSplit text="Craft that lives after the sun sets." />
        </h1>
        <p className="mx-auto max-w-[560px] text-ivory-muted">
          RAAT began with a single question: what does Indian craft look like after sundown?
        </p>
      </div>

      {/* Matches the homepage story-teaser treatment */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 px-6 pb-10 md:grid-cols-2 md:gap-20 md:px-10">
        <ImageWipe className="relative aspect-[4/5] bg-bg-elevated">
          <Image src={FOUNDER_IMAGE} alt="RAAT founder in the atelier" fill sizes="50vw" className="object-cover" />
        </ImageWipe>
        <div>
          <h2 className="font-display mb-5 text-[1.75rem]">2019, Jaipur</h2>
          <p className="leading-relaxed text-ivory-muted">
            RAAT was founded on the belief that Indian fashion could hold both its craft
            heritage and a modern, editorial confidence. We started with three handloom
            weavers and a single silhouette; today the studio works across four regions,
            translating heritage textile techniques into pieces meant for evenings, not
            just occasions.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-16 px-6 py-10 md:grid-cols-2 md:gap-20 md:px-10">
        <div className="md:order-1">
          <h2 className="font-display mb-5 text-[1.75rem]">The Artisans</h2>
          <p className="leading-relaxed text-ivory-muted">
            Every RAAT piece is made in partnership with weavers, block printers, and zari
            embroiderers across India. We pay above fair-trade rates and commit to
            multi-season orders, so craft knowledge has a reason to stay in the family.
          </p>
        </div>
        <ImageWipe className="relative aspect-[4/5] bg-bg-elevated md:order-2">
          <Image src={ARTISAN_IMAGE} alt="Artisan handloom weaving" fill sizes="50vw" className="object-cover" />
        </ImageWipe>
      </div>

      <section className="bg-bg-elevated px-6 py-24 md:px-10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-12 text-center">
            <h2 className="font-display text-[clamp(1.75rem,3vw,2.25rem)]">What We Value</h2>
          </Reveal>
          <StaggerGrid className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
            {VALUES.map((v) => (
              <StaggerItem key={v.title} className="text-center">
                <h3 className="font-display mb-3 text-xl">{v.title}</h3>
                <p className="text-sm leading-relaxed text-ivory-muted">{v.body}</p>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Timeline -- vertical line, left-aligned */}
      <section className="mx-auto max-w-[800px] px-6 py-28">
        <h2 className="font-display mb-14 text-center text-[clamp(1.75rem,3vw,2.25rem)]">Milestones</h2>
        <div className="border-l border-hairline pl-8">
          {MILESTONES.map((m) => (
            <Reveal key={m.year} className="relative pb-12 last:pb-0">
              <div className="absolute -left-[37px] top-1 h-[9px] w-[9px] rounded-full bg-gold" />
              <div className="font-accent mb-2 text-sm tracking-[0.1em] text-gold">{m.year}</div>
              <div className="font-display mb-1.5 text-[1.1rem]">{m.title}</div>
              <p className="text-sm text-ivory-muted">{m.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
