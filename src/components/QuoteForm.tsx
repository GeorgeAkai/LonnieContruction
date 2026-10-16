"use client";

import { useState } from "react";
import { Mail, MessageSquareText } from "lucide-react";
import { services, site } from "@/lib/site";

/**
 * No backend needed: the request opens the visitor's email or SMS app
 * pre-filled with their details, addressed to Lonnie.
 */
export function QuoteForm() {
  const [error, setError] = useState("");

  function compose(form: HTMLFormElement) {
    const data = new FormData(form);
    const v = (k: string) => String(data.get(k) ?? "").trim();
    if (!v("name") || !v("phone")) {
      setError("Please add your name and phone number.");
      return null;
    }
    setError("");
    return [
      `Name: ${v("name")}`,
      `Phone: ${v("phone")}`,
      `City: ${v("city")}`,
      `Service: ${v("service")}`,
      "",
      v("message"),
    ].join("\n");
  }

  const field =
    "h-13 w-full rounded-2xl border border-black/10 bg-white px-4 text-base outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15";

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const body = compose(e.currentTarget);
        if (!body) return;
        const via = (e.nativeEvent as SubmitEvent).submitter?.getAttribute("value");
        if (via === "sms") {
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- sms: link, not a page
          window.location.href = `${site.smsHref}?&body=${encodeURIComponent(body)}`;
        } else {
          window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
            "Free estimate request",
          )}&body=${encodeURIComponent(body)}`;
        }
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold">Name</span>
          <input name="name" autoComplete="name" className={field} required />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold">Phone</span>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            className={field}
            required
          />
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold">City</span>
          <select name="city" className={field} defaultValue="Chico">
            {site.serviceAreas.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option>Other</option>
          </select>
        </label>
        <label className="grid gap-1.5">
          <span className="text-sm font-semibold">What do you need?</span>
          <select name="service" className={field}>
            {services.map((s) => (
              <option key={s.title}>{s.title}</option>
            ))}
            <option>Not sure — come take a look</option>
          </select>
        </label>
      </div>
      <label className="grid gap-1.5">
        <span className="text-sm font-semibold">Project details</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about cracks, damage, square footage, timing…"
          className={`${field} h-auto py-3`}
        />
      </label>
      {error && (
        <p role="alert" className="text-sm font-semibold text-brand">
          {error}
        </p>
      )}
      <div className="mt-1 grid gap-3 sm:grid-cols-2">
        <button
          type="submit"
          value="email"
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-600 active:scale-[0.98]"
        >
          <Mail className="h-5 w-5" /> Email My Request
        </button>
        <button
          type="submit"
          value="sms"
          className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-ink font-bold text-white transition hover:bg-ink-700 active:scale-[0.98]"
        >
          <MessageSquareText className="h-5 w-5" /> Text My Request
        </button>
      </div>
    </form>
  );
}
