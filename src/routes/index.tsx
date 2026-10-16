import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Plus,
  Instagram,
  Facebook,
  Palmtree,
  Handshake,
  Quote,
  Mail,
} from "lucide-react";
import {
  CountUp,
  LineReveal,
  Reveal,
  RevealImage,
  ScrollHighlight,
  ScrollMarquee,
} from "@/components/motion";
import { useMediaQuery, useReduceMotion, useSmoothScroll } from "@/hooks/use-smooth-scroll";
import hero from "@/assets/hero-coast.webp";
import coast from "@/assets/coast.jpg";
import culture from "@/assets/culture.jpg";
import countryside from "@/assets/countryside.jpg";
import sunset from "@/assets/sunset.jpg";
import tukFeature from "@/assets/tuk-feature.jpg";
import hotel from "@/assets/hotel.jpg";
import gLighthouse from "@/assets/g-lighthouse.jpg";
import gRider from "@/assets/g-rider.jpg";
import gBridge from "@/assets/g-bridge.jpg";
import gElephant from "@/assets/g-elephant.jpg";
import gTea from "@/assets/g-tea.jpg";
import bay from "@/assets/bay.jpg";
import traveller from "@/assets/traveller.jpg";
import cta from "@/assets/cta.jpg";
import logoCinnamon from "@/assets/partners/cinnamon-hotels.svg";
import logoAnantara from "@/assets/partners/anantara.png";
import logoHeritance from "@/assets/partners/heritance.svg";
import logoTeardrop from "@/assets/partners/teardrop.svg";
import logoAman from "@/assets/partners/aman.svg";
import logoShangriLa from "@/assets/partners/shangri-la.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TukTales Sri Lanka - Electric Tuk-Tuk Experiences" },
      {
        name: "description",
        content:
          "Discover Sri Lanka differently: coastal roads, local culture and hidden gems on curated electric tuk-tuk journeys.",
      },
      { property: "og:title", content: "TukTales Sri Lanka - Electric Tuk-Tuk Experiences" },
      {
        property: "og:description",
        content:
          "Curated electric tuk-tuk journeys across Sri Lanka's coasts, culture and countryside.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TRIP = "https://www.tripadvisor.com/";
const EMAIL = "hello@tuktales.lk";
const nav = [
  ["Home", "#home"],
  ["Our Story", "#story"],
  ["Experiences", "#experiences"],
  ["Our Tuk-Tuks", "#tuktuks"],
  ["For Hotels", "#hotels"],
  ["FAQs", "#faqs"],
] as const;

function OwlIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <circle cx="6.5" cy="9" r="4.5" />
      <circle cx="17.5" cy="9" r="4.5" />
      <circle cx="6.5" cy="9" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="9" r="1.4" fill="currentColor" />
      <path d="M2 4h20M12 6l-1.5 3h3z" />
    </svg>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#home"
      className={`flex items-center gap-2 ${className}`}
      aria-label="TukTales Sri Lanka - home"
    >
      <Palmtree className="h-6 w-6 text-primary lg:h-7 lg:w-7" strokeWidth={1.5} aria-hidden />
      <span className="leading-none">
        <span className="block font-script text-[1.45rem] font-semibold text-primary lg:text-[1.75rem]">
          TukTales
        </span>
        <span className="block pl-3 text-[8.5px] tracking-[0.3em] text-primary">SRI LANKA</span>
      </span>
    </a>
  );
}

/** Editorial section label: "(01) - Our story" */
function Label({
  n,
  children,
  light = false,
}: {
  n?: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.26em] ${
        light ? "text-primary-foreground/85" : "text-accent"
      }`}
    >
      {n && (
        <span
          className={`font-display text-[15px] normal-case tracking-normal ${
            light ? "text-primary-foreground" : "text-primary"
          }`}
        >
          ({n})
        </span>
      )}
      <span
        className={`h-px w-8 ${light ? "bg-primary-foreground/50" : "bg-accent/50"}`}
        aria-hidden
      />
      {children}
    </p>
  );
}

function external(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function PrimaryBtn({
  href,
  children,
  icon,
  className = "",
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...external(href)}
      className={`group/btn inline-flex min-h-[52px] items-center justify-between gap-4 rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-[15px] font-medium text-primary-foreground transition-colors hover:bg-forest ${focusRing} ${className}`}
    >
      <span className="flex items-center gap-2.5">
        {icon}
        {children}
      </span>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-foreground text-primary transition-transform duration-500 group-hover/btn:-rotate-45">
        <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </a>
  );
}

function GhostBtn({
  href,
  children,
  icon,
  className = "",
}: {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      {...external(href)}
      className={`inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border border-primary/25 bg-ivory/60 px-6 text-[15px] font-medium text-primary backdrop-blur-sm transition-colors hover:border-primary/60 hover:bg-seafoam ${focusRing} ${className}`}
    >
      {icon}
      {children}
    </a>
  );
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 sm:px-4 lg:pt-3">
      <div
        className={`relative mx-auto flex h-[50px] max-w-[calc(var(--page-max)-24px)] items-center justify-between gap-6 overflow-hidden rounded-full border pl-4 pr-1.5 lg:h-[60px] lg:pl-5 lg:pr-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${
          scrolled || open
            ? "border-border/70 bg-background/85 shadow-[0_12px_40px_-24px_rgba(18,61,49,0.45)]"
            : "border-white/40 bg-background/55"
        }`}
      >
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 text-sm lg:flex">
          {nav.map(([l, h]) => (
            <a
              key={l}
              href={h}
              className="rounded-full px-3.5 py-2 text-foreground transition-colors hover:bg-primary/[0.06] xl:px-4"
            >
              {l}
            </a>
          ))}
        </nav>
        <a
          href={TRIP}
          {...external(TRIP)}
          className="hidden h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm text-primary-foreground transition-colors hover:bg-forest lg:inline-flex"
        >
          <OwlIcon /> Book on Tripadvisor
        </a>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="h-[18px] w-[18px]" /> : <Menu className="h-[18px] w-[18px]" />}
        </button>
        <motion.div
          className="absolute inset-x-8 bottom-0 h-[2px] origin-left rounded-full bg-primary/60"
          style={{ scaleX: scrollYProgress }}
          aria-hidden
        />
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="mx-auto mt-2 max-w-[calc(var(--page-max)-24px)] rounded-[28px] border border-border/70 bg-background/95 p-3 shadow-photo backdrop-blur-xl lg:hidden"
        >
          {nav.map(([l, h]) => (
            <a
              key={l}
              href={h}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[16px] text-foreground hover:bg-seafoam"
            >
              {l}
              <ArrowUpRight className="h-4 w-4 text-accent" aria-hidden />
            </a>
          ))}
          <PrimaryBtn href={TRIP} icon={<OwlIcon />} className="mt-2 w-full">
            Book on Tripadvisor
          </PrimaryBtn>
        </nav>
      )}
    </header>
  );
}

const route = [
  { label: "Coastal roads", x: 12, y: 52, below: true, rot: -3 },
  { label: "Temple towns", x: 140, y: 30, below: false, rot: 2 },
  { label: "Tea country", x: 268, y: 58, below: true, rot: -2 },
  { label: "Your own way", x: 388, y: 30, below: false, rot: 3 },
];

/** Hand-drawn journal route that sketches itself across the hero. */
function RouteDoodle() {
  return (
    <div className="mt-5 max-w-[30rem] py-6 sm:mt-10 sm:py-8 lg:mt-14">
      <div className="relative">
        <svg
          viewBox="0 0 400 90"
          className="a-wipe block h-auto w-full overflow-visible text-primary"
          style={d(1250)}
          fill="none"
          aria-hidden
        >
          <path
            d="M12 52C50 20 100 22 140 30S220 70 268 58 350 18 388 30"
            stroke="currentColor"
            strokeOpacity="0.55"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="0.5 8"
          />
          <path
            d="M377 22l11 8-12 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {route.slice(0, 3).map((r) => (
            <g key={r.label}>
              <circle
                cx={r.x}
                cy={r.y}
                r="6.5"
                fill="var(--background)"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle cx={r.x} cy={r.y} r="2.2" fill="currentColor" />
            </g>
          ))}
        </svg>
        <ul className="absolute inset-0 font-script text-[1.3rem] leading-none text-primary sm:text-[1.5rem]">
          {route.map((r, i) => (
            <li
              key={r.label}
              className="a-fade absolute whitespace-nowrap"
              style={{
                ...d(1500 + i * 180),
                left: `${(r.x / 400) * 100}%`,
                top: `${(r.y / 90) * 100}%`,
              }}
            >
              <span
                className="block"
                style={{
                  transform: `translate(${i === 0 ? "-12%" : i === route.length - 1 ? "-88%" : "-50%"}, ${
                    r.below ? "40%" : "-150%"
                  }) rotate(${r.rot}deg)`,
                }}
              >
                {r.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduceMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden lg:min-h-[clamp(700px,100svh,920px)] lg:flex-row lg:items-center lg:justify-start"
    >
      <div className="hero-media">
        <motion.div
          className="absolute inset-x-0 top-[-8%] h-[116%]"
          style={reduce ? {} : { y: imgY }}
        >
          <img
            src={hero}
            alt="Travellers riding a blue electric tuk-tuk along Sri Lanka's palm-lined coast"
            width={1774}
            height={887}
            fetchPriority="high"
            decoding="async"
            className="a-hero-img absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>
      </div>

      <div
        className="hero-note a-wipe pointer-events-none absolute right-[4%] top-[calc(var(--header-h)+28px)] z-10 isolate hidden -rotate-6 text-right font-script text-[1.65rem] leading-[1.05] text-primary lg:block xl:right-[6%]"
        style={d(1300)}
        aria-hidden
      >
        Good
        <br />
        People
        <br />
        Great Places
        <br />
        Cleaner Journeys
        <svg
          viewBox="0 0 120 14"
          className="ml-auto mt-1 h-3 w-28"
          fill="none"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <defs>
            <linearGradient id="hero-underline-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
              <stop offset="35%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M2 11C30 3 70 1 118 5" stroke="url(#hero-underline-fade)" />
        </svg>
      </div>

      <motion.div
        className="hero-copy container-page relative z-10 pb-5 pt-[calc(var(--header-h)+16px)] sm:pb-14 lg:pb-20 lg:pt-[calc(var(--header-h)+48px)]"
        style={reduce ? {} : { y: textY }}
      >
        <div className="max-w-[34rem] max-sm:mx-auto max-sm:text-center lg:max-w-[27rem] xl:max-w-[36rem]">
          <p
            className="a-fade text-[11px] font-medium uppercase tracking-[0.3em] text-accent"
            style={d(100)}
          >
            Electric tuk-tuk experiences
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,5.2vw+1rem,5.75rem)] sm:mt-6 leading-[0.95] max-sm:leading-[1.08] tracking-[-0.02em] text-primary">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="a-rise block" style={d(200)}>
                Discover
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="a-rise block" style={d(330)}>
                Sri Lanka
              </span>
            </span>
            <span
              className="a-wipe -mt-1 block max-sm:mt-2 max-sm:-rotate-2 font-script text-[clamp(2.6rem,4.4vw+1rem,5rem)] font-medium leading-[1] tracking-normal sm:pl-[30%]"
              style={d(750)}
            >
              Differently.
            </span>
          </h1>
          <p
            className="a-fade mt-5 max-w-[28rem] text-[15px] leading-[1.65] max-sm:mx-auto max-sm:mt-6 max-sm:leading-[1.8] text-foreground/80 sm:mt-7 sm:text-base sm:leading-[1.7] lg:text-[17px]"
            style={d(900)}
          >
            Scenic roads, local culture, hidden gems and real experiences - explore the island at a
            more personal pace with our electric tuk-tuk journeys.
          </p>
          <div
            className="a-fade mt-6 max-sm:mt-8 flex flex-col gap-2.5 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4"
            style={d(1050)}
          >
            <PrimaryBtn
              href="#experiences"
              className="max-sm:relative max-sm:min-h-12 max-sm:justify-center max-sm:px-12 max-sm:[&>span:last-child]:absolute max-sm:[&>span:last-child]:right-1.5"
            >
              Explore Experiences
            </PrimaryBtn>
            <GhostBtn href={TRIP} icon={<OwlIcon />} className="max-sm:min-h-12">
              Book on Tripadvisor
            </GhostBtn>
          </div>
          <RouteDoodle />
        </div>
      </motion.div>
    </section>
  );
}

const stats = [
  { to: 100, suffix: "%", label: "Electric tuk-tuks - quiet, clean and comfortable" },
  { to: 3, suffix: "", label: "Guests per tuk-tuk, so every journey stays personal" },
  { to: 3, suffix: "", label: "Regions to explore - coast, culture and hill country" },
  { to: 1, suffix: "", label: "Local driver-guide with you on every ride" },
];

function Story() {
  return (
    <section id="story" className="section">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-[minmax(200px,0.3fr)_1fr] lg:gap-16">
          <Reveal className="lg:pt-4">
            <Label n="01">Our story</Label>
            <p className="mt-6 -rotate-3 font-script text-[2rem] leading-[1.05] text-accent">
              Slow roads,
              <br />
              real moments.
            </p>
          </Reveal>
          <ScrollHighlight
            className="font-display text-[clamp(1.9rem,2.6vw+1rem,3.75rem)] leading-[1.14] tracking-[-0.015em] text-primary"
            parts={[
              "Sri Lanka isn't meant to be rushed. It's meant to be felt - salt air on a coastal road ",
              { src: coast, alt: "Palm-fringed coastline" },
              ", the hum of a village market ",
              { src: culture, alt: "Temple town street with a tuk-tuk" },
              ", mist drifting over tea country ",
              { src: gTea, alt: "Misty tea hills" },
              ". We started TukTales so you could explore it quietly, closely and on your own terms.",
            ]}
          />
        </div>

        <ul className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-border pt-10 lg:mt-28 lg:grid-cols-4 lg:gap-x-10">
          {stats.map((s, i) => (
            <Reveal as="li" key={s.label} delay={i * 0.1}>
              <CountUp
                to={s.to}
                suffix={s.suffix}
                className="font-display text-[clamp(3rem,4vw+1rem,5rem)] leading-none tracking-[-0.03em] text-primary"
              />
              <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-muted-foreground">
                {s.label}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

const experiences = [
  [
    coast,
    "Coastal Discoveries",
    "Palm-lined roads, quiet bays and charming fishing villages.",
    "Coast",
  ],
  [culture, "Culture & Local Life", "Temples, markets and authentic local experiences.", "Culture"],
  [
    countryside,
    "Scenic Countryside",
    "Lush landscapes, viewpoints and unforgettable routes.",
    "Countryside",
  ],
  [
    sunset,
    "Your Own Journey",
    "Have something else in mind? Let's create a custom experience.",
    "Tailor-made",
  ],
] as const;

function Experiences() {
  const reduce = useReduceMotion();
  const pinned = !reduce;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!pinned || !trackRef.current) return;
    const el = trackRef.current;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, (v) => -v * distance);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="relative"
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div
        className={
          pinned
            ? "sticky top-[var(--header-h)] flex h-[calc(100svh-var(--header-h))] flex-col justify-center overflow-hidden"
            : "section pt-0"
        }
      >
        <div className="container-page grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12">
          <div>
            <Reveal>
              <Label n="02">Our experiences</Label>
            </Reveal>
            <LineReveal
              className="h-section mt-5"
              lines={[
                <>
                  Journeys for <em className="em-accent">every</em>
                </>,
                "kind of traveller.",
              ]}
            />
          </div>
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8" delay={0.15}>
            <p className="max-w-[17rem] text-sm leading-relaxed text-muted-foreground">
              Four ways to see the island - each one showing you a different side of Sri Lanka.
            </p>
            <GhostBtn href={TRIP} className="self-start sm:self-auto">
              View all experiences <ArrowRight className="h-4 w-4" aria-hidden />
            </GhostBtn>
          </Reveal>
        </div>

        <motion.ul
          ref={trackRef}
          style={pinned ? { x } : {}}
          className={
            pinned
              ? "mt-12 flex w-max gap-7 px-[var(--page-inset)]"
              : "no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-2"
          }
        >
          {experiences.map(([img, t, desc, tag], i) => (
            <li
              key={t}
              className="w-[80vw] max-w-[360px] shrink-0 snap-start sm:w-[44vw] sm:max-w-none lg:w-[clamp(360px,34vw,580px)]"
            >
              <a href={TRIP} {...external(TRIP)} className="group block">
                <div className="relative overflow-hidden rounded-[24px]">
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    width={1024}
                    height={656}
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06] lg:aspect-auto lg:h-[min(48svh,560px)]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[rgba(14,40,32,0.75)] via-[rgba(14,40,32,0.1)] via-45% to-transparent"
                    aria-hidden
                  />
                  <span className="absolute left-4 top-4 rounded-full border border-white/40 bg-ivory/80 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-primary backdrop-blur-md">
                    {String(i + 1).padStart(2, "0")} · {tag.toUpperCase()}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 lg:p-7">
                    <div>
                      <h3 className="font-display text-[1.65rem] leading-tight text-primary-foreground lg:text-[2rem]">
                        {t}
                      </h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-primary-foreground/80">
                        {desc}
                      </p>
                    </div>
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ivory text-primary transition-transform duration-500 group-hover:rotate-45"
                      aria-hidden
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </motion.ul>

        {pinned && (
          <div className="container-page mt-10 flex items-center gap-6">
            <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-primary/10">
              <motion.div
                className="h-full origin-left rounded-full bg-primary"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <span className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
              Scroll to explore
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

const LOUD = [14, 30, 20, 36, 24, 40, 18, 32, 40, 22, 34, 16, 38, 26, 30, 20, 38, 24, 28, 18];
const QUIET = [3, 5, 3, 4, 6, 3, 4];

function SoundRow({
  label,
  bars,
  loud = false,
}: {
  label: string;
  bars: number[];
  loud?: boolean;
}) {
  return (
    <div className="grid grid-cols-[5.75rem_1fr] items-center gap-3 sm:grid-cols-[6.5rem_1fr]">
      <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-primary-foreground/60 sm:text-[11px]">
        {label}
      </span>
      <span
        className={`flex h-9 items-center gap-[3px] ${loud ? "text-primary-foreground/40" : "text-sand"}`}
      >
        {bars.map((h, i) => (
          <span
            key={i}
            className="eq-bar"
            style={{
              height: h,
              animationDelay: `${(i * 137) % 700}ms`,
              animationDuration: loud ? "0.42s" : "1.8s",
            }}
          />
        ))}
        {!loud && (
          <span className="ml-3 whitespace-nowrap font-script text-lg leading-none text-sand sm:text-xl">
            waves · birdsong · you
          </span>
        )}
      </span>
    </div>
  );
}

function WhyElectric() {
  const f = [
    ["A different way to explore", "Authentic local travel, reimagined for today."],
    ["A more personal experience", "Private journeys at your own pace."],
    ["Closer to the places you visit", "Open sides, slow roads and stops wherever you like."],
  ] as const;
  return (
    <section id="tuktuks" className="section">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[36px] bg-primary px-5 py-9 text-primary-foreground sm:px-10 sm:py-11 lg:px-12 lg:py-12">
          <svg
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-primary-foreground"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden
          >
            <path
              d="M-60 690 C 220 600, 250 330, 520 360 S 880 640, 1260 150"
              stroke="currentColor"
              strokeOpacity="0.05"
              strokeWidth="70"
              strokeLinecap="round"
            />
            <path
              d="M-60 690 C 220 600, 250 330, 520 360 S 880 640, 1260 150"
              stroke="currentColor"
              strokeOpacity="0.16"
              strokeWidth="2"
              strokeDasharray="16 20"
            />
          </svg>

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6 xl:col-span-5">
              <Reveal>
                <Label n="03" light>
                  Why electric?
                </Label>
              </Reveal>
              <LineReveal
                className="mt-4 font-display text-[clamp(2.1rem,2.4vw+1.2rem,3.25rem)] leading-[1.06] tracking-[-0.01em] text-balance"
                lines={[
                  "The same island,",
                  <>
                    a <em className="italic text-sand">cleaner</em> journey.
                  </>,
                ]}
              />
              <Reveal delay={0.2}>
                <p className="mt-4 max-w-[30rem] text-base leading-[1.75] text-primary-foreground/80">
                  Our electric tuk-tuks give you a unique and comfortable way to explore Sri Lanka,
                  combining authentic local travel with a more sustainable approach.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-7 border-t border-primary-foreground/15 pt-5">
                  <p className="font-display text-lg">Turn the island’s volume back up.</p>
                  <p className="mt-1 text-sm text-primary-foreground/65">
                    What you hear from the back seat:
                  </p>
                  <div className="mt-3 space-y-1" aria-hidden>
                    <SoundRow label="Petrol tuk" bars={LOUD} loud />
                    <SoundRow label="TukTales" bars={QUIET} />
                  </div>
                  <p className="sr-only">
                    A petrol tuk-tuk rattles and roars; ours is near-silent, so you hear the waves
                    and birdsong instead.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15} className="relative lg:col-span-6 xl:col-span-7 xl:pl-8">
              <div className="relative mx-auto max-w-[540px] pl-5 pt-7 sm:pl-9">
                <figure className="rotate-[1.75deg] rounded-[6px] bg-ivory p-2.5 pb-10 shadow-[0_40px_70px_-25px_rgb(0_0_0/0.55)] transition-transform duration-700 hover:rotate-0 sm:p-3 sm:pb-12">
                  <img
                    src={tukFeature}
                    alt="Blue electric tuk-tuk parked beneath palm trees by the sea"
                    width={1024}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-[3px] object-cover"
                  />
                  <figcaption className="absolute inset-x-4 bottom-3 flex items-baseline justify-between font-script text-xl leading-none text-primary sm:inset-x-5 sm:bottom-4 sm:text-2xl">
                    <span>Southern coast, Sri Lanka</span>
                    <span className="text-base text-accent sm:text-lg">no. 03</span>
                  </figcaption>
                </figure>

                <div className="absolute left-0 top-0 -rotate-[9deg] drop-shadow-[0_12px_18px_rgb(0_0_0/0.35)]">
                  <div className="stamp bg-sand">
                    <div className="flex w-[104px] flex-col items-center border border-primary/30 px-2 py-3 text-center text-primary sm:w-[124px] sm:py-4">
                      <span className="font-display text-[3.25rem] leading-[0.9] sm:text-[3.9rem]">
                        0<span className="text-[0.45em]">g</span>
                      </span>
                      <span className="mt-1.5 text-[9px] font-medium uppercase leading-tight tracking-[0.18em]">
                        Tailpipe CO₂
                        <br />
                        every ride
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-3 flex items-start justify-end gap-2 pr-2 font-script text-[1.3rem] leading-[1.05] text-sand sm:text-[1.45rem]">
                <svg
                  viewBox="0 0 60 40"
                  className="mt-[-14px] h-9 w-14 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M56 32 C 40 34, 18 30, 8 6" />
                  <path d="M3 13 L8 5 L14 12" />
                </svg>
                <span className="-rotate-2">
                  plugged in overnight,
                  <br />
                  silent all day
                </span>
              </p>
            </Reveal>
          </div>

          <ol className="mt-10 grid border-t border-primary-foreground/15 sm:grid-cols-3 lg:mt-12">
            {f.map(([t, s], i) => (
              <Reveal
                as="li"
                key={t}
                delay={0.1 + i * 0.1}
                className="border-b border-primary-foreground/15 py-5 last:border-b-0 sm:border-b-0 sm:border-l sm:px-6 sm:py-6 sm:first:border-l-0 sm:first:pl-0 lg:px-10"
              >
                <span className="font-display text-xl italic text-sand">
                  {["i.", "ii.", "iii."][i]}
                </span>
                <span className="mt-1 block font-display text-lg leading-snug sm:text-xl">{t}</span>
                <span className="mt-2 block text-sm leading-relaxed text-primary-foreground/70">
                  {s}
                </span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
const partners = [
  { name: "Cinnamon Hotels & Resorts", src: logoCinnamon, w: 164, h: 48, cls: "h-10 lg:h-11" },
  { name: "Anantara Hotels & Resorts", src: logoAnantara, w: 175, h: 100, cls: "h-14 lg:h-16" },
  { name: "Heritance Hotels & Resorts", src: logoHeritance, w: 92, h: 46, cls: "h-11 lg:h-12" },
  { name: "Shangri-La", src: logoShangriLa, w: 242, h: 120, cls: "h-20 lg:h-24" },
  { name: "Teardrop Hotels", src: logoTeardrop, w: 250, h: 70, cls: "h-7 lg:h-8" },
  { name: "Aman", src: logoAman, w: 776, h: 207, cls: "h-6 lg:h-7" },
];

const hotelPerks = [
  "Unique experiences for your guests",
  "Customisable tours & itineraries",
  "Reliable, professional service",
  "A standout addition to your offering",
];

function Hotels() {
  return (
    <section id="hotels" className="section pt-0">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <Label n="04">For hotels & resorts</Label>
            </Reveal>
            <LineReveal
              className="h-section mt-5"
              lines={[
                <>
                  Let’s create <em className="em-accent">memorable</em>
                </>,
                "guest experiences.",
              ]}
            />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-[28rem] text-base leading-[1.75] text-foreground/75">
                Partner with us to offer your guests unique electric tuk-tuk experiences across Sri
                Lanka.
              </p>
              <div className="mt-8 max-w-[34rem]">
                <p className="flex items-center justify-between border-b border-primary/20 pb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-accent">
                  <span>The concierge checklist</span>
                  <span className="font-script text-lg normal-case tracking-normal">
                    all ticked
                  </span>
                </p>
                <ul className="grid sm:grid-cols-2 sm:gap-x-8">
                  {hotelPerks.map((p, i) => (
                    <li
                      key={p}
                      className="flex items-center gap-3 border-b border-dashed border-primary/15 py-3 text-[15px] text-primary"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5 shrink-0 text-accent"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ transform: `rotate(${[-6, 4, -2, 7][i]}deg)` }}
                        aria-hidden
                      >
                        <path d="M3.5 13.5c2 1.2 3.6 3 4.8 5.2C11 12 15 7 20.5 4" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3">
                <PrimaryBtn
                  href={`mailto:${EMAIL}`}
                  icon={<Handshake className="h-4 w-4" aria-hidden />}
                >
                  Become a Partner
                </PrimaryBtn>
                <span className="-rotate-3 font-script text-[1.45rem] leading-none text-accent">
                  ← just say hello
                </span>
              </div>
            </Reveal>
          </div>
          <div className="relative pr-6 sm:pr-10">
            <RevealImage
              src={hotel}
              alt="Hotel staff welcoming travellers beside a blue electric tuk-tuk"
              width={1200}
              height={768}
              className="aspect-[4/3] shadow-photo lg:aspect-[5/4]"
            />
            <Reveal delay={0.4} className="absolute -top-4 right-0 z-10 sm:-top-6">
              <div className="door-hanger drop-shadow-[0_18px_22px_rgb(0_0_0/0.28)]">
                <div className="hanger-cut flex w-[96px] flex-col items-center rounded-[14px] bg-sand px-2 pb-3 pt-[46px] text-center text-primary sm:w-[160px] sm:rounded-[18px] sm:px-3 sm:pb-5 sm:pt-[76px]">
                  <span className="text-[7px] font-medium uppercase tracking-[0.2em] text-primary/70 sm:text-[9px] sm:tracking-[0.24em]">
                    Built for hospitality
                  </span>
                  <span className="mt-1.5 font-display text-[1.15rem] leading-[0.95] sm:mt-2 sm:text-[1.9rem]">
                    Please
                    <br />
                    disturb.
                  </span>
                  <span className="mt-2 border-t border-primary/25 pt-1.5 font-script text-sm leading-[1.05] sm:mt-3 sm:pt-2 sm:text-xl">
                    your tuk-tuk is waiting at the lobby
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal className="map-paper mt-24 rounded-[36px] bg-seafoam/60 p-6 sm:p-10 lg:mt-28 lg:p-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Label>Hotels we’d love to partner with</Label>
              <p className="mt-4 font-display text-2xl text-primary lg:text-3xl">
                Next stops on <em className="em-accent">our map</em>
              </p>
              <p className="mt-1 -rotate-1 font-script text-xl text-accent">
                a wish list, not (yet) a partner list
              </p>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              Not current affiliations. Logos are trademarks of their respective owners; no
              partnership or endorsement is implied.
            </p>
          </div>
          <div className="relative mt-10">
            <span
              className="absolute inset-x-0 top-[5px] hidden border-t-2 border-dashed border-primary/25 lg:block"
              aria-hidden
            />
            <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-6">
              {partners.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.name}
                  delay={0.1 + i * 0.08}
                  y={16}
                  className="flex flex-col items-center"
                >
                  <span
                    className="relative z-10 h-3 w-3 rounded-full border-2 border-accent bg-background"
                    aria-hidden
                  />
                  <span className="h-5 w-px bg-primary/35" aria-hidden />
                  <div
                    className="relative grid h-28 w-full origin-top place-items-center rounded-[14px] rounded-t-[30px] border border-border/70 bg-ivory px-4 pb-4 pt-7 shadow-card transition-transform duration-500 hover:rotate-0 lg:h-32"
                    style={{ transform: `rotate(${[-3, 2, -2, 3, -1, 2][i]}deg)` }}
                  >
                    <span
                      className="absolute left-1/2 top-2.5 h-3 w-3 -translate-x-1/2 rounded-full border border-primary/25 bg-seafoam"
                      aria-hidden
                    />
                    <img
                      src={p.src}
                      alt={`${p.name} logo`}
                      width={p.w}
                      height={p.h}
                      loading="lazy"
                      decoding="async"
                      className={`${p.cls} w-auto max-w-full object-contain`}
                    />
                    <span
                      className="absolute bottom-1.5 right-3 font-mono text-[8px] tracking-[0.2em] text-muted-foreground"
                      aria-hidden
                    >
                      STOP {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const galleryCols = [
  [
    [gLighthouse, "Galle lighthouse on the south coast", "Galle"],
    [bay, "Turquoise bay framed by jungle", "South coast"],
    [gTea, "Misty tea country in the hills", "Tea country"],
  ],
  [
    [gRider, "Smiling traveller riding in a tuk-tuk", "On the road"],
    [gBridge, "Train crossing the Nine Arches Bridge in Ella", "Ella"],
    [gElephant, "Elephant beside a blue tuk-tuk", "Wild encounters"],
  ],
] as const;

function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReduceMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const animate = isDesktop && !reduce;
  return (
    <section className="section pt-0">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+80px)] lg:self-start">
          <Reveal>
            <Label n="05">From the road</Label>
          </Reveal>
          <LineReveal
            className="h-section mt-5"
            lines={[
              "Moments worth",
              <>
                <em className="em-accent">slowing down</em> for.
              </>,
            ]}
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-base leading-[1.75] text-foreground/75">
              A lighthouse at golden hour, a train crossing the Nine Arches, tea country in the
              mist. Every journey is a collection of small moments - these are the places we love to
              share.
            </p>
            <GhostBtn
              href="https://instagram.com"
              icon={<Instagram className="h-4 w-4" aria-hidden />}
              className="mt-8"
            >
              Follow the journey
            </GhostBtn>
          </Reveal>
        </div>
        <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6 lg:pb-32">
          {galleryCols.map((col, ci) => (
            <motion.ul
              key={ci}
              className={`film flex flex-col gap-4 self-start rounded-[10px] bg-[oklch(0.22_0.03_165)] py-4 shadow-photo sm:gap-5 ${ci === 1 ? "mt-10 rotate-[1.5deg] lg:mt-24" : "-rotate-1"}`}
              style={animate ? { y: ci === 0 ? y1 : y2 } : {}}
            >
              {col.map(([img, alt, place], k) => (
                <li key={alt} className="group relative">
                  <span
                    className="mb-1.5 flex justify-between font-mono text-[8px] tracking-[0.2em] text-sand/80 sm:text-[9px]"
                    aria-hidden
                  >
                    <span>TUKTALES 400</span>
                    <span>{String(ci * 3 + k + 1).padStart(2, "0")}A ▸</span>
                  </span>
                  <div className="relative overflow-hidden rounded-[3px]">
                    <img
                      src={img}
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      width={912}
                      height={736}
                      className="aspect-[4/5] w-full object-cover saturate-[0.9] transition-[transform,filter] duration-[1200ms] ease-out group-hover:scale-[1.05] group-hover:saturate-100"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 pb-2 pt-10 font-script text-lg leading-none text-ivory sm:text-2xl">
                      {place}
                    </span>
                  </div>
                </li>
              ))}
            </motion.ul>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  [
    "How do I book an experience?",
    "All experiences are booked directly through our Tripadvisor listing - pick a date and you're set.",
  ],
  [
    "Where do the journeys take place?",
    "Mainly along the south coast, cultural towns and the hill country. Custom routes are welcome.",
  ],
  [
    "Can I arrange a private experience?",
    "Yes. Every journey can be private and tailored to your pace and interests.",
  ],
  [
    "How many people can travel in a tuk-tuk?",
    "Up to three passengers travel comfortably in each tuk-tuk, plus your local driver-guide.",
  ],
] as const;

function FaqItem({
  n,
  q,
  a,
  open,
  onToggle,
}: {
  n: string;
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  return (
    <li
      className={`ticket grid grid-cols-[64px_1fr] transition-colors duration-300 ${
        open ? "bg-primary text-primary-foreground" : "bg-ivory text-foreground hover:bg-card"
      }`}
    >
      <span
        className={`flex flex-col items-center justify-center border-r-2 border-dashed py-4 font-display ${
          open ? "border-primary-foreground/25 text-sand" : "border-primary/15 text-accent"
        }`}
        aria-hidden
      >
        <span className="text-[9px] font-sans uppercase tracking-[0.2em] opacity-70">No.</span>
        <span className="text-2xl leading-none">{n}</span>
      </span>
      <div>
        <h3>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={id}
            className="flex w-full items-center gap-4 py-5 pl-5 pr-5 text-left text-[15px] font-medium sm:pr-6"
          >
            <span className="flex-1">{q}</span>
            <Plus
              className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? "rotate-45 text-sand" : "text-accent"}`}
              aria-hidden
            />
          </button>
        </h3>
        <div id={id} role="region" className="faq-panel" data-open={open}>
          <div>
            <p className="pb-5 pl-5 pr-12 text-sm leading-relaxed text-primary-foreground/80 sm:pr-14">
              {a}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}

function TestimonialFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" className="section">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20 xl:gap-24">
        <div className="relative">
          <RevealImage
            src={gBridge}
            alt="A blue train crossing the Nine Arches Bridge through the jungle"
            width={912}
            height={736}
            className="aspect-[4/3] shadow-photo sm:aspect-[16/11] lg:aspect-auto lg:h-[640px]"
          />
          <Reveal
            as="figure"
            delay={0.3}
            className="guestbook relative z-10 mx-4 -mt-20 max-w-md -rotate-2 rounded-[4px] bg-ivory px-7 pb-7 pt-8 shadow-photo sm:mx-8 sm:px-9 lg:absolute lg:-bottom-6 lg:left-8 lg:m-0"
          >
            <span
              className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 rotate-[3deg] bg-sand/75"
              aria-hidden
            />
            <p className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
              <span>Our guestbook</span>
              <Quote className="h-5 w-5 fill-sand text-sand" aria-hidden />
            </p>
            <blockquote className="mt-3 font-script text-[1.65rem] leading-[32px] text-primary sm:text-[1.85rem]">
              “The best way to see the real Sri Lanka - friendly people, beautiful places and an
              unforgettable experience!”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-4">
              <img
                src={traveller}
                alt=""
                loading="lazy"
                decoding="async"
                width={96}
                height={96}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-ivory"
              />
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                A traveller from Germany
              </span>
            </figcaption>
          </Reveal>
        </div>

        <div className="max-w-xl">
          <Reveal>
            <Label n="06">Frequently asked questions</Label>
          </Reveal>
          <LineReveal
            className="h-section mt-5"
            lines={[
              <>
                Got <em className="em-accent">questions?</em>
              </>,
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-5 text-base leading-relaxed text-foreground/75">
              Here are some quick answers. If you need more details, feel free to get in touch.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {faqs.map(([q, a], i) => (
                <FaqItem
                  key={q}
                  n={String(i + 1).padStart(2, "0")}
                  q={q}
                  a={a}
                  open={open === i}
                  onToggle={() => setOpen(open === i ? null : i)}
                />
              ))}
            </ul>
            <a
              href={`mailto:${EMAIL}`}
              className="link-underline mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-primary"
            >
              <Mail className="h-4 w-4" aria-hidden /> Still curious? Write to us
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Destinations() {
  return (
    <section className="pb-8 lg:pb-12" aria-hidden>
      <ScrollMarquee
        rows={[
          {
            text: "Coastal roads ✦ Temple towns ✦ Tea country ✦ Hidden bays ✦",
            className:
              "font-display text-[clamp(3rem,8vw,8rem)] leading-[1.08] tracking-[-0.02em] text-primary",
            dir: 1,
          },
          {
            text: "Good people · Great places · Cleaner journeys ·",
            className: "font-script text-[clamp(2.6rem,6.5vw,6.5rem)] leading-[1.15] text-accent",
            dir: -1,
          },
        ]}
      />
    </section>
  );
}

function Cta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReduceMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.22, 1]);
  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[620px] items-end overflow-hidden lg:min-h-[min(92svh,780px)] lg:items-center"
    >
      <motion.img
        src={cta}
        alt="Blue tuk-tuk overlooking misty valleys at sunset"
        loading="lazy"
        decoding="async"
        width={1600}
        height={640}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[28%_center]"
        style={reduce ? {} : { scale }}
      />
      <div className="cta-scrim absolute inset-0 -z-10" aria-hidden />
      <div className="container-page grid py-16 lg:grid-cols-2 lg:py-24">
        <div className="text-primary-foreground lg:col-start-2 lg:pl-8">
          <Reveal>
            <Label n="07" light>
              Ready to explore?
            </Label>
          </Reveal>
          <LineReveal
            className="mt-5 font-display text-[clamp(2.5rem,3.2vw+1.3rem,4.5rem)] leading-[1.02] tracking-[-0.015em]"
            lines={[
              "Your Sri Lankan",
              <>
                story <em className="italic text-sand">starts here.</em>
              </>,
            ]}
          />
          <Reveal delay={0.25}>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-primary-foreground/90">
              Find the experience that suits you and book directly through our Tripadvisor listing.
            </p>
          </Reveal>
          <Reveal delay={0.35} className="mt-8 max-w-[30rem]">
            <div className="pass flex -rotate-1 bg-ivory text-primary shadow-photo transition-transform duration-500 hover:rotate-0">
              <div className="min-w-0 flex-1 p-5 sm:p-6">
                <p className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
                  <span>Ride pass</span>
                  <span className="font-script text-lg normal-case tracking-normal">TukTales</span>
                </p>
                <div className="mt-3 flex items-end gap-3">
                  <span>
                    <span className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      From
                    </span>
                    <span className="font-display text-2xl leading-none sm:text-3xl">Anywhere</span>
                  </span>
                  <span className="mb-2 flex flex-1 items-center gap-1 text-accent" aria-hidden>
                    <span className="h-0 flex-1 border-t-2 border-dashed border-current opacity-50" />
                    <Palmtree className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <span className="text-right">
                    <span className="block text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      To
                    </span>
                    <span className="font-display text-2xl leading-none sm:text-3xl">
                      Sri Lanka
                    </span>
                  </span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-primary/10 pt-3 text-[13px]">
                  {[
                    ["Vehicle", "Electric tuk-tuk"],
                    ["Seats", "Open sides"],
                    ["Pace", "Your own"],
                    ["Departure", "You choose"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                        {k}
                      </dt>
                      <dd className="font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="flex w-[var(--stub)] shrink-0 flex-col items-center justify-center gap-3 border-l-2 border-dashed border-primary/20 px-3 py-5">
                <span className="text-center font-display text-sm leading-tight">
                  Admit
                  <span className="block text-3xl text-accent">1-3</span>
                </span>
                <span className="barcode h-10 w-full text-primary/80" aria-hidden />
              </div>
            </div>
            <PrimaryBtn
              href={TRIP}
              icon={<OwlIcon />}
              className="mt-7 ring-1 ring-primary-foreground/25"
            >
              Book on Tripadvisor
            </PrimaryBtn>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const socials = [
    ["Instagram", "https://instagram.com", Instagram],
    ["Facebook", "https://facebook.com", Facebook],
  ] as const;
  return (
    <footer className="relative overflow-hidden bg-background">
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-12 pb-12 pt-20 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10 lg:pt-24">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Curated electric tuk-tuk journeys across Sri Lanka’s coasts, culture and countryside -
            at a slower, more personal pace.
          </p>
          <PrimaryBtn href={TRIP} icon={<OwlIcon />} className="mt-8">
            Book on Tripadvisor
          </PrimaryBtn>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-accent">Explore</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            {nav.map(([l, h]) => (
              <li key={l}>
                <a href={h} className="link-underline text-foreground">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-accent">Contact</p>
          <ul className="mt-5 space-y-3 text-[15px]">
            <li>
              <a href={`mailto:${EMAIL}`} className="link-underline text-foreground">
                {EMAIL}
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className="link-underline text-foreground">
                Hotel partnerships
              </a>
            </li>
            <li className="text-muted-foreground">
              South coast · Cultural triangle · Hill country
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-accent">Follow</p>
          <ul className="mt-5 flex gap-2">
            {socials.map(([label, href, I]) => (
              <li key={label}>
                <a
                  href={href}
                  {...external(href)}
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <I className="h-5 w-5" />
                </a>
              </li>
            ))}
            <li>
              <a
                href={TRIP}
                {...external(TRIP)}
                aria-label="Tripadvisor"
                className="grid h-11 w-11 place-items-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <OwlIcon className="h-5 w-6" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p
        className="pointer-events-none select-none text-center font-script text-[clamp(6rem,24vw,26rem)] leading-[0.8] text-primary/[0.08]"
        aria-hidden
      >
        TukTales
      </p>

      <div className="container-page flex flex-col items-center justify-between gap-3 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row">
        <p>© 2026 TukTales Sri Lanka. All rights reserved.</p>
        <p>Good people · Great places · Cleaner journeys</p>
      </div>
    </footer>
  );
}

function Index() {
  useSmoothScroll();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Story />
        <Experiences />
        <WhyElectric />
        <Hotels />
        <Gallery />
        <Destinations />
        <TestimonialFaq />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
