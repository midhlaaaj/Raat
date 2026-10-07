import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, CATEGORY_IMAGES } from "@/lib/data";

/** Shop by Category: a row of circular portraits that scrolls on small screens. */
export function CategoryScrollSection() {
  return (
    <section
      aria-label="Shop by category"
      className="mx-auto max-w-[1440px] px-6 pb-16 pt-12 md:px-10 md:pb-24 md:pt-16"
    >
      <div className="no-scrollbar -mx-6 flex gap-8 overflow-x-auto px-6 pb-4 md:mx-0 md:justify-center md:gap-10 md:px-0">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={`/shop?category=${encodeURIComponent(cat)}`}
            className="flex flex-none flex-col items-center gap-4"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-full bg-bg-elevated md:h-32 md:w-32">
              <Image
                src={CATEGORY_IMAGES[cat]}
                alt=""
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>
            <span className="label-ui text-[11px] tracking-widest">{cat}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
