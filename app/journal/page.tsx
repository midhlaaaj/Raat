import Image from "next/image";
import Link from "next/link";
import { JOURNAL_ENTRIES } from "@/lib/data";
import { StaggerGrid, StaggerItem, TextSplit } from "@/components/reveal";

export default function JournalPage() {
  return (
    <main>
      <div className="mx-auto max-w-[900px] px-6 pb-16 pt-20 text-center md:pt-28">
        <p className="font-accent mb-5 text-sm uppercase tracking-[0.18em] text-ivory/90">Journal</p>
        <h1 className="font-display mb-5 text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.05]">
          <TextSplit text="Notes from the quiet hours." />
        </h1>
        <p className="mx-auto max-w-[520px] text-ivory-muted">
          Styling notes, artisan features, and behind-the-scenes from the studio.
        </p>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 pb-28 md:px-10">
        <StaggerGrid className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
          {JOURNAL_ENTRIES.map((e) => (
            <StaggerItem key={e.slug}>
              <Link href={`/journal/${e.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-bg-elevated">
                  <Image
                    src={e.image}
                    alt={e.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="pt-4">
                  <div className="mb-2 text-xs uppercase tracking-[0.05em] text-gold">{e.category}</div>
                  <h3 className="font-display mb-2 text-[1.15rem]">{e.title}</h3>
                  <div className="text-sm text-ivory-muted">{e.date}</div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </main>
  );
}
