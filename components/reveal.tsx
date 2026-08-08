"use client";

import { motion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

const EASE_REVEAL = [0, 0, 0.3, 1] as const;

const fadeVariants: Variants = {
  hidden: { opacity: 0.01 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_REVEAL } },
};

/** `reveal` motion token: slow pure fade on scroll entry, fires once. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0.01 },
        visible: {
          opacity: 1,
          transition: { duration: 0.6, ease: EASE_REVEAL, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/** `stagger-grid` motion token: children fade in individually, 60-80ms apart. */
export function StaggerGrid({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div className={className} style={style} variants={fadeVariants}>
      {children}
    </motion.div>
  );
}

/** `image-wipe` motion token: clip-path mask wipe reveal for large editorial images. */
export function ImageWipe({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: EASE_REVEAL }}
    >
      {children}
    </motion.div>
  );
}

/** `text-split` motion token: split into words, fade-rise in sequence. */
export function TextSplit({
  text,
  className,
  wordClassName,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block ${wordClassName ?? ""}`}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, ease: EASE_REVEAL },
            },
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
}
