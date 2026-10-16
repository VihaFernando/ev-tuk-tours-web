import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReduceMotion } from "@/hooks/use-smooth-scroll";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "figure" | "p";
};

export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const reduce = useReduceMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** Heading whose lines slide up from behind a mask as it enters the viewport. */
export function LineReveal({
  lines,
  className,
  as = "h2",
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const reduce = useReduceMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.11, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] mb-[-0.12em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: reduce ? 0 : "105%", opacity: reduce ? 0 : 1 },
              show: { y: "0%", opacity: 1, transition: { duration: 1.1, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

function Fade({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

export type HighlightPart = string | { src: string; alt: string };

function InlineImage({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="mx-[0.06em] inline-block h-[0.78em] w-[1.75em] overflow-hidden rounded-full align-[-0.06em]">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </span>
  );
}

/** Paragraph whose words (and inline photo pills) fill in from faint to full as the reader scrolls. */
export function ScrollHighlight({
  parts,
  className,
}: {
  parts: HighlightPart[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReduceMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const tokens = parts.flatMap<HighlightPart>((p) =>
    typeof p === "string" ? p.split(/(\s+)/).filter(Boolean) : [p],
  );
  const total = tokens.filter((t) => typeof t !== "string" || t.trim()).length;
  let n = 0;
  return (
    <p ref={ref} className={className}>
      {tokens.map((t, i) => {
        if (typeof t === "string" && !t.trim()) return t;
        const node = typeof t === "string" ? t : <InlineImage {...t} />;
        if (reduce) return <span key={i}>{node}</span>;
        const k = n++;
        return (
          <Fade key={i} progress={scrollYProgress} range={[k / total, (k + 1) / total]}>
            {node}
          </Fade>
        );
      })}
    </p>
  );
}

/** Number that counts up once it scrolls into view. */
export function CountUp({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReduceMotion();
  const [val, setVal] = useState(to);
  useEffect(() => {
    if (reduce) return setVal(to);
    if (!inView) return setVal(0);
    const c = animate(0, to, { duration: 1.6, ease: EASE, onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  );
}

/** Image framed by a rounded box that opens up and settles as it scrolls into view. */
export function RevealImage({
  src,
  alt,
  width,
  height,
  className = "",
  imgClassName = "",
  parallax = 10,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReduceMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const clip = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["inset(9% 7% 9% 7% round 28px)", "inset(0% 0% 0% 0% round 24px)"],
  );
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-[24px] ${className}`}
      style={reduce ? {} : { clipPath: clip }}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={`absolute inset-x-0 top-[-12%] h-[124%] w-full object-cover ${imgClassName}`}
        style={reduce ? {} : { y }}
      />
    </motion.div>
  );
}

/** Oversized type that slides sideways as the page scrolls. */
export function ScrollMarquee({
  rows,
}: {
  rows: { text: string; className: string; dir: 1 | -1 }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return (
    <div ref={ref} className="overflow-hidden py-6" aria-hidden>
      {rows.map((r, i) => (
        <MarqueeRow key={i} progress={scrollYProgress} {...r} />
      ))}
    </div>
  );
}

function MarqueeRow({
  progress,
  text,
  className,
  dir,
}: {
  progress: MotionValue<number>;
  text: string;
  className: string;
  dir: 1 | -1;
}) {
  const reduce = useReduceMotion();
  const x = useTransform(progress, [0, 1], dir === 1 ? ["0%", "-25%"] : ["-25%", "0%"]);
  return (
    <motion.div className={`flex w-max whitespace-nowrap ${className}`} style={reduce ? {} : { x }}>
      {Array.from({ length: 4 }, (_, k) => (
        <span key={k} className="pr-[0.5em]">
          {text}
        </span>
      ))}
    </motion.div>
  );
}
