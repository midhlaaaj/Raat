import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/** Editorial section header: serif title over a hairline, optional ochre link on the right. */
export function SectionHeading({
  title,
  eyebrow,
  href,
  linkLabel,
  className = "",
}: {
  title: ReactNode;
  eyebrow?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
}) {
  return (
    <Reveal
      className={`mb-10 flex items-end justify-between gap-6 border-b border-hairline pb-4 md:mb-12 ${className}`}
    >
      <div>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h2 className="font-display text-[clamp(1.75rem,3vw,2rem)] leading-tight">{title}</h2>
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="label-ui whitespace-nowrap tracking-widest text-gold-deep transition-colors hover:text-ivory"
        >
          {linkLabel}
        </Link>
      )}
    </Reveal>
  );
}

/** Inner-page title block. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  const center = align === "center";
  return (
    <div className={`border-b border-hairline bg-bg-low ${center ? "text-center" : ""}`}>
      <div
        className={`mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-20 ${center ? "flex flex-col items-center" : ""}`}
      >
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08] tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-[540px] leading-relaxed text-ivory-muted">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
