import type { JournalEntry } from "@/lib/data";

/** Minutes to read at ~200 wpm, never less than one. */
export function readingTime(entry: JournalEntry) {
  const words = entry.body.join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
