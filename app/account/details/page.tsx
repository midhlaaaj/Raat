"use client";

import { useState } from "react";
import { MOCK_ACCOUNT } from "@/lib/data";

function Field({ label, id, ...props }: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <input id={id} className="raat-input" {...props} />
    </div>
  );
}

function Toggle({ label, hint, defaultOn = false }: { label: string; hint: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-6 border-b border-hairline py-4 last:border-b-0">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-sm text-ivory-muted">{hint}</div>
      </div>
      <button
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 flex-none rounded-full transition-colors ${on ? "bg-gold" : "bg-hairline-strong"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? "translate-x-[22px]" : "translate-x-0.5"}`}
        />
      </button>
    </div>
  );
}

export default function DetailsPage() {
  const [saved, setSaved] = useState(false);
  const [first, ...rest] = MOCK_ACCOUNT.name.split(" ");

  return (
    <div>
      <h1 className="font-display mb-1 text-[clamp(2rem,4vw,2.75rem)] leading-tight">Profile</h1>
      <p className="mb-10 text-ivory-muted">Your personal details and communication preferences.</p>

      <form
        className="mb-8 rounded-xl border border-hairline p-6 md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }}
      >
        <h2 className="mb-6 text-lg font-medium">Personal details</h2>
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="First name" id="first" defaultValue={first} />
          <Field label="Last name" id="last" defaultValue={rest.join(" ")} />
          <Field label="Email" id="email" type="email" defaultValue={MOCK_ACCOUNT.email} />
          <Field label="Phone" id="phone" type="tel" defaultValue={MOCK_ACCOUNT.phone} />
          <Field label="Date of birth" id="dob" type="date" />
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" className="btn-primary">
            Save changes
          </button>
          <span role="status" className="text-sm text-gold-deep">
            {saved ? "Saved." : ""}
          </span>
        </div>
      </form>

      <section className="rounded-xl border border-hairline p-6 md:p-8">
        <h2 className="mb-2 text-lg font-medium">Preferences</h2>
        <Toggle label="Order updates on WhatsApp" hint="Shipping and delivery notifications." defaultOn />
        <Toggle label="New arrivals by email" hint="One email when a new collection lands." defaultOn />
        <Toggle label="Offers & early access" hint="Sale previews before they go public." />
      </section>
    </div>
  );
}
