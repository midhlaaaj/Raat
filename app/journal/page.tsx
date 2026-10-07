import { JOURNAL_ENTRIES } from "@/lib/data";
import { JournalClient } from "./journal-client";

export const metadata = { title: "Journal — RAAT" };

export default function JournalPage() {
  return <JournalClient entries={JOURNAL_ENTRIES} />;
}
