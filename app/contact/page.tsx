"use client";

import { useState } from "react";
import { AtSign } from "lucide-react";
import { Reveal, TextSplit } from "@/components/reveal";
import { PageHeader } from "@/components/section-heading";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main>
      <PageHeader eyebrow="Get in Touch" title={<TextSplit text="Let's Talk Craft." />} />

      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-16 px-6 pb-32 pt-16 md:grid-cols-[1.3fr_1fr] md:px-10">
        <Reveal>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              (e.target as HTMLFormElement).reset();
              setTimeout(() => setSent(false), 4000);
            }}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="Name" className="raat-input" />
              <input required type="email" placeholder="Email" className="raat-input" />
            </div>
            <input placeholder="Subject" className="raat-input" />
            <textarea required rows={6} placeholder="Your message" className="raat-input" />
            <button
              type="submit"
              className="btn-primary self-start"
            >
              {sent ? "Sent ✓" : "Send Message"}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1} className="flex flex-col gap-8">
          <div>
            <div className="label-ui mb-2 text-ivory-muted">Studio</div>
            <p className="leading-relaxed">
              B-42 Bapu Bazaar Road
              <br />
              Jaipur, Rajasthan 302001
            </p>
          </div>
          <div>
            <div className="label-ui mb-2 text-ivory-muted">Hours</div>
            <p className="leading-relaxed">Mon–Sat, 11am–7pm IST</p>
          </div>
          <div>
            <div className="label-ui mb-2 text-ivory-muted">Connect</div>
            <div className="flex flex-col gap-2">
              <a href="#" className="inline-flex items-center gap-2 hover:text-gold-deep">
                <AtSign size={14} strokeWidth={1.5} /> Instagram
              </a>
              <a href="#" className="hover:text-gold-deep">Pinterest</a>
              <a href="mailto:hello@raat.com" className="hover:text-gold-deep">hello@raat.com</a>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
