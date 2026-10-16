import {
  ArrowRight,
  BadgeCheck,
  Brush,
  CalendarCheck,
  Flame,
  Grid3x3,
  Hammer,
  Home,
  Mail,
  MapPin,
  PaintRoller,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import { Header } from "@/components/Header";
import { MobileCallBar } from "@/components/MobileCallBar";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Gallery } from "@/components/Gallery";
import { QuoteForm } from "@/components/QuoteForm";
import { Logo } from "@/components/Logo";
import { getProjects } from "@/lib/projects";
import { services, site } from "@/lib/site";

const serviceIcons = {
  home: Home,
  hammer: Hammer,
  paintRoller: PaintRoller,
  grid: Grid3x3,
  brush: Brush,
  flame: Flame,
} as const;

const thisYear = new Date().getFullYear();
const years = thisYear - site.established;

export default async function Page() {
  const projects = await getProjects();
  const hero = projects[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.name,
    founder: site.owner,
    telephone: site.phone,
    email: site.email,
    foundingDate: String(site.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    areaServed: site.serviceAreas.map((c) => `${c}, CA`),
    url: site.url,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        {/* HERO */}
        <section className="stucco-texture relative overflow-hidden bg-ink text-white">
          <div className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-brand/30 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-14 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-20 md:pb-24">
            <div className="animate-fade-up">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold tracking-wide text-white/80">
                <span className="h-2 w-2 rounded-full bg-brand" />
                Chico · Oroville · Paradise &amp; the Mid Valley
              </p>
              <h1 className="font-display text-[2.75rem] leading-[0.95] font-bold uppercase sm:text-6xl lg:text-7xl">
                Stucco done
                <br />
                <span className="text-brand">right.</span> Built
                <br />
                to last.
              </h1>
              <p className="mt-5 max-w-lg text-lg text-white/75">
                {site.owner} and the {site.name} crew have been
                lathing, plastering and repairing homes across Butte County
                since {site.established}. Licensed, local, and proud of every
                wall.
              </p>
              <div className="mt-8 grid gap-3 sm:flex">
                <a
                  href={site.phoneHref}
                  className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-brand px-7 text-lg font-bold shadow-xl shadow-brand/30 transition hover:bg-brand-600 active:scale-[0.98]"
                >
                  <Phone className="h-5 w-5" /> Call {site.phone}
                </a>
                <a
                  href="#contact"
                  className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-7 font-bold backdrop-blur transition hover:bg-white/10 active:scale-[0.98]"
                >
                  Get a Free Estimate <ArrowRight className="h-5 w-5" />
                </a>
              </div>
              <dl className="mt-10 grid grid-cols-3 gap-3 text-center sm:max-w-md">
                {[
                  { k: `${years}+`, v: "Years" },
                  { k: "CA", v: `Lic. #${site.license}` },
                  { k: "100%", v: "Local" },
                ].map((s) => (
                  <div
                    key={s.v}
                    className="rounded-2xl border border-white/10 bg-white/5 px-2 py-3"
                  >
                    <dt className="font-display text-2xl font-bold text-white">
                      {s.k}
                    </dt>
                    <dd className="text-[11px] font-semibold tracking-wide text-white/60 uppercase">
                      {s.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {hero && (
              <div className="animate-fade-up [animation-delay:150ms]">
                <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
                  <BeforeAfterSlider
                    before={hero.beforeUrl}
                    after={hero.afterUrl}
                    alt={hero.title}
                    priority
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-sm text-white/60">
                  <MapPin className="h-4 w-4 text-brand" />
                  {hero.title} — {hero.city}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-b border-black/5 bg-white">
          <div className="no-scrollbar mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-5 text-sm font-semibold whitespace-nowrap text-ink-700 sm:justify-between sm:px-6">
            {[
              { icon: ShieldCheck, t: `CA License #${site.license}` },
              { icon: CalendarCheck, t: `Established ${site.established}` },
              { icon: BadgeCheck, t: "Free on-site estimates" },
              { icon: Star, t: "Owner on every job" },
            ].map(({ icon: Icon, t }) => (
              <span key={t} className="inline-flex items-center gap-2">
                <Icon className="h-5 w-5 text-brand" /> {t}
              </span>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="bg-mist py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="Before & After"
              title="See the difference"
              body="Real jobs from around the valley. Drag the red handle on any photo to compare before and after."
            />
            <Gallery projects={projects} />
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="What we do"
              title="Lath, plaster & stucco"
              body="From the first sheet of paper and wire to the final color coat, every layer is done by people who've been doing it for decades."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => {
                const Icon = serviceIcons[s.icon];
                return (
                  <div
                    key={s.title}
                    className="group rounded-3xl border border-black/5 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white transition group-hover:bg-ink">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-display text-xl font-semibold uppercase">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-ink-700/80">{s.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="stucco-texture bg-ink py-16 text-white sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading
              eyebrow="How it works"
              title="Simple from start to finish"
              dark
            />
            <ol className="grid gap-4 md:grid-cols-4">
              {[
                ["Call or text", "Tell us what's going on. We answer our own phone."],
                ["Free estimate", "Lonnie comes out, looks at the wall and gives you a straight price."],
                ["We get to work", "Clean job site, proper lath and the right mix for our valley heat."],
                ["Walk-through", "We don't leave until you're happy with the finish."],
              ].map(([t, b], i) => (
                <li
                  key={t}
                  className="relative rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <span className="font-display text-5xl font-bold text-brand">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold uppercase">
                    {t}
                  </h3>
                  <p className="mt-1 text-white/65">{b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SERVICE AREAS */}
        <section id="areas" className="py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Service areas"
                title="Proudly serving the Mid Valley"
                body={`Based at ${site.address.street} in Chico, we work throughout Butte, Glenn and Tehama counties.`}
                align="left"
              />
              <a
                href={site.phoneHref}
                className="inline-flex h-13 items-center gap-2 rounded-2xl bg-ink px-6 font-bold text-white transition hover:bg-ink-700 active:scale-[0.98]"
              >
                <Phone className="h-5 w-5" /> Not on the list? Call us
              </a>
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {site.serviceAreas.map((c, i) => (
                <li
                  key={c}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 font-semibold ${
                    i < 3
                      ? "bg-brand text-white"
                      : "bg-mist text-ink-700"
                  }`}
                >
                  <MapPin className="h-4 w-4" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA BAND */}
        <section className="bg-brand text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold uppercase sm:text-4xl">
                Cracks don&apos;t fix themselves.
              </h2>
              <p className="mt-2 text-white/85">
                Small stucco cracks let water in. Get them looked at before
                they turn into a big repair.
              </p>
            </div>
            <a
              href={site.phoneHref}
              className="flex h-14 w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-lg font-bold text-brand shadow-xl transition hover:bg-white/90 active:scale-[0.98] md:w-auto"
            >
              <Phone className="h-5 w-5" /> {site.phone}
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-mist py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <SectionHeading
                eyebrow="Free estimate"
                title="Let's talk about your project"
                body="Fill out the form and it'll open your email or text app ready to send — or just give Lonnie a call."
                align="left"
              />
              <div className="grid gap-3">
                <ContactRow
                  href={site.phoneHref}
                  icon={<Phone className="h-5 w-5" />}
                  label="Call or text"
                  value={site.phone}
                />
                <ContactRow
                  href={`mailto:${site.email}`}
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value={site.email}
                />
                <ContactRow
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`,
                  )}`}
                  icon={<MapPin className="h-5 w-5" />}
                  label="Shop"
                  value={`${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}`}
                />
              </div>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] sm:p-8">
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-white/70">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div>
            <Logo inverted />
            <p className="mt-4 text-sm">
              Lath, plaster &amp; stucco contractor serving Chico, Oroville,
              Paradise and the Mid Valley since {site.established}.
            </p>
          </div>
          <div className="text-sm">
            <p className="font-semibold text-white">{site.owner}</p>
            <a href={site.phoneHref} className="block hover:text-white">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="block break-all hover:text-white">
              {site.email}
            </a>
            <p>
              {site.address.street}, {site.address.city}, {site.address.state}{" "}
              {site.address.zip}
            </p>
          </div>
          <div className="text-sm md:text-right">
            <p>CA Contractor License #{site.license}</p>
            <p className="mt-1">
              © {thisYear} {site.name}
            </p>
            <a href="/admin" className="mt-3 inline-block text-white/40 hover:text-white">
              Owner login
            </a>
          </div>
        </div>
        {/* Keeps the footer clear of the fixed mobile call bar */}
        <div className="h-[calc(76px+env(safe-area-inset-bottom))] md:hidden" />
      </footer>
      <MobileCallBar />
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
  dark,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  return (
    <div
      className={`mb-10 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p className="mb-3 text-xs font-bold tracking-[0.25em] text-brand uppercase">
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl leading-none font-bold uppercase sm:text-5xl">
        {title}
      </h2>
      {body && (
        <p className={`mt-4 text-lg ${dark ? "text-white/70" : "text-ink-700/80"}`}>
          {body}
        </p>
      )}
    </div>
  );
}

function ContactRow({
  href,
  icon,
  label,
  value,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-black/5 transition hover:ring-brand/40 active:scale-[0.99]"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand text-white">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold tracking-wide text-ink-700/60 uppercase">
          {label}
        </span>
        <span className="block truncate font-semibold">{value}</span>
      </span>
    </a>
  );
}
