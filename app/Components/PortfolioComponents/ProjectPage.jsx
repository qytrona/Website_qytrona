"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatedHeading,
  CtaBanner,
  Icon,
  PillButton,
  ProcessTimeline,
  Reveal,
  Section,
  SectionHeader,
  useInView,
} from "../CompanyComponents/Shared";
import { FeatureCard, ToolsMarquee } from "../SolutionComponents/SolutionPage";
import { solutions } from "../SolutionComponents/solutionsData";
import { industries } from "../IndustryComponents/industriesData";
import { categories, projects } from "./portfolioData";
import ProjectCard, { SampleBadge } from "./ProjectCard";
import ProjectCover from "./ProjectCover";

const solutionBySlug = Object.fromEntries(solutions.map((s) => [s.slug, s]));
const industryBySlug = Object.fromEntries(industries.map((i) => [i.slug, i]));
const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));

/* ----------------------------- scroll progress ---------------------------- */

// Thin orange bar along the top of the window that fills as the visitor reads the case study.
function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1">
      <div ref={bar} className="h-full origin-left bg-gradient-to-r from-[#FF5F2D] to-[#ff8a5c]" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}

/* ---------------------------------- hero ---------------------------------- */

function projectMeta(p) {
  const cat = categoryBySlug[p.category];
  const ind = industryBySlug[p.industry];
  return {
    cat,
    items: [
      // industries without their own page use the project's industryLabel (no link)
      { label: "Industry", icon: ind?.icon || "globe", value: ind?.name || p.industryLabel, href: ind && `/industries/${ind.slug}` },
      { label: "Category", icon: cat?.icon, value: cat?.name, href: cat && `/portfolio/${cat.slug}` },
      { label: "Platform", icon: "mobile", value: p.platform },
    ],
  };
}

// The project screenshot on a dark stage: zooms out on reveal (ProjectCover) and drifts gently on scroll.
function ShowcaseStage({ p, meta }) {
  const stage = useRef(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = stage.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
      el.style.setProperty("--drift", `${progress * 28}px`);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const chipPos = ["left-8 top-8", "right-8 top-1/3", "bottom-8 left-1/4"];

  return (
    <div ref={stage} className="relative overflow-hidden rounded-[2rem] bg-[#0c0705] p-3 sm:p-5">
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
      <span className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#FF5F2D]/30 blur-3xl" />
      <span className="pointer-events-none absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-[#FF5F2D]/20 blur-3xl" />
      <span className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-dashed border-white/15 animate-[spin_50s_linear_infinite]" />

      <div className="relative overflow-hidden rounded-[1.5rem]" style={{ transform: "translateY(var(--drift, 0px))", transition: "transform 0.2s linear" }}>
        {p.cover.type === "image" ? (
          <ProjectCover cover={p.cover} fit="contain" className="h-[320px] !bg-transparent sm:h-[440px] lg:h-[560px]" />
        ) : (
          <ProjectCover cover={p.cover} className="aspect-[4/3] sm:aspect-[16/9]" />
        )}
      </div>

      {/* floating info chips (desktop) */}
      {meta.items.map((m, i) => (
        <span
          key={m.label}
          className={`pointer-events-none absolute hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-white/90 px-4 py-2.5 text-sm shadow-xl shadow-black/30 backdrop-blur animate-float xl:flex ${chipPos[i]}`}
          style={{ animationDelay: `${i * 0.8}s` }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FF5F2D] text-white">
            <Icon name={m.icon} className="h-3.5 w-3.5" />
          </span>
          <span>
            <span className="block text-[10px] uppercase tracking-widest text-gray-500">{m.label}</span>
            <span className="block font-semibold text-[#0c0705]">{m.value}</span>
          </span>
        </span>
      ))}
    </div>
  );
}

function ProjectHero({ p }) {
  const meta = projectMeta(p);
  const cat = meta.cat;

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 pb-12 pt-28 sm:px-10 sm:pt-32 lg:px-14 lg:pt-40">
      <span className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-[#FF5F2D]/[0.07] blur-3xl" />
      <span className="pointer-events-none absolute -left-40 top-64 h-[420px] w-[420px] rounded-full bg-[#FF5F2D]/[0.05] blur-3xl" />

      <Reveal variant="fade" duration={600}>
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition-colors hover:text-[#FF5F2D]">Home</Link>
          <span className="text-gray-300">/</span>
          <Link href="/portfolio" className="transition-colors hover:text-[#FF5F2D]">Portfolio</Link>
          <span className="text-gray-300">/</span>
          <Link href={`/portfolio/${cat.slug}`} className="transition-colors hover:text-[#FF5F2D]">{cat.name}</Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#0c0705]">{p.name}</span>
        </nav>
      </Reveal>

      <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
        <div>
          <Reveal variant="fade" delay={100}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#FF5F2D]/20 bg-[#FF5F2D]/10 px-3 py-1.5 text-xs font-medium text-[#FF5F2D]">
                <Icon name="briefcase" className="h-3.5 w-3.5" />
                Case Study
              </span>
              {p.sample && <SampleBadge />}
            </div>
          </Reveal>
          <AnimatedHeading
            as="h1"
            title={p.name}
            delay={150}
            className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-[#0c0705] sm:text-5xl md:text-6xl xl:text-7xl"
          />
        </div>

        <Reveal delay={350}>
          <p className="text-base leading-relaxed text-gray-600 sm:text-lg">{p.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.services.map((sv) => (
              <Link
                key={sv}
                href={`/solutions/${sv}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-[#0c0705] transition-colors hover:border-[#FF5F2D] hover:text-[#FF5F2D]"
              >
                <Icon name={solutionBySlug[sv]?.icon || "spark"} className="h-3.5 w-3.5 text-[#FF5F2D]" />
                {solutionBySlug[sv]?.name || sv}
              </Link>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <PillButton href="/contact">Start a similar project</PillButton>
            <Link href="/portfolio" className="group inline-flex items-center gap-2 text-sm font-medium text-[#0c0705] transition-colors hover:text-[#FF5F2D]">
              View all work
              <Icon name="arrow" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal variant="scale" delay={300} duration={1100} className="relative mt-12">
        <ShowcaseStage p={p} meta={meta} />
      </Reveal>
    </section>
  );
}

/* -------------------------------- at a glance ------------------------------ */

function AtAGlance({ p }) {
  const meta = projectMeta(p);
  const cells = [
    ...meta.items,
    { label: "Services", icon: "spark", value: p.services.map((sv) => solutionBySlug[sv]?.short || sv).join(" · ") },
  ];
  return (
    <div className="px-6 sm:px-10 lg:px-14">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-200 lg:grid-cols-4">
        {cells.map((c, i) => (
          <Reveal key={c.label} delay={i * 100} className="h-full bg-gray-50">
            <div className="group relative h-full p-6 sm:p-8">
              <span className="absolute left-0 top-0 h-[3px] w-0 bg-[#FF5F2D] transition-all duration-500 group-hover:w-full" />
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#FF5F2D] shadow-sm transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <p className="mt-5 text-xs uppercase tracking-[0.15em] text-gray-500">{c.label}</p>
              {c.href ? (
                <Link href={c.href} className="mt-1 block text-lg font-semibold text-[#0c0705] transition-colors hover:text-[#FF5F2D]">
                  {c.value}
                </Link>
              ) : (
                <p className="mt-1 text-lg font-semibold text-[#0c0705]">{c.value}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ design details ----------------------------- */

// Interactive zoom explorer: the full screenshot with three numbered hotspots, a magnified
// close-up of the active one, and feature tabs. Auto-cycles until the visitor picks a detail.
const detailFocus = [
  { x: 24, y: 28 },
  { x: 74, y: 44 },
  { x: 42, y: 78 },
];
const DETAIL_MS = 4000;

function DesignDetails({ p }) {
  const items = p.features.slice(0, 3);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [ref, inView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    if (!auto || !inView) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % items.length), DETAIL_MS);
    return () => clearTimeout(id);
  }, [active, auto, inView, items.length]);

  const pick = (i) => {
    setAuto(false);
    setActive(i);
  };
  const focus = detailFocus[active];

  return (
    <div ref={ref} className="grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
      {/* full screenshot with hotspots */}
      <Reveal variant="left" className="h-full">
        <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[2rem] bg-[#0c0705] p-5 sm:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
          <span className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FF5F2D]/25 blur-3xl" />

          <div className="relative w-full max-w-[640px]">
            <Image
              src={p.cover.src}
              alt={p.cover.alt || p.name}
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full rounded-2xl shadow-2xl shadow-black/40"
            />
            {items.map((f, i) => {
              const on = i === active;
              return (
                <button
                  key={f.title}
                  type="button"
                  onClick={() => pick(i)}
                  aria-label={`Show detail ${i + 1}: ${f.title}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${detailFocus[i].x}%`, top: `${detailFocus[i].y}%` }}
                >
                  {on && <span className="absolute inset-0 animate-ping rounded-full bg-[#FF5F2D] opacity-60" />}
                  <span
                    className={`relative flex items-center justify-center rounded-full font-mono text-xs font-semibold shadow-lg transition-all duration-500 ${
                      on ? "h-10 w-10 bg-[#FF5F2D] text-white ring-4 ring-[#FF5F2D]/30" : "h-8 w-8 bg-white text-[#0c0705] hover:scale-110"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* zoom panel + feature tabs */}
      <Reveal variant="right" delay={150} className="h-full">
        <div className="flex h-full flex-col gap-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-gray-200 bg-[#f3f3f1]">
            <div
              className="absolute inset-0 bg-no-repeat transition-[background-position] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] [background-size:260%]"
              style={{ backgroundImage: `url(${p.cover.src})`, backgroundPosition: `${focus.x}% ${focus.y}%` }}
              role="img"
              aria-label={`${p.name}: ${items[active]?.title} close-up`}
            />
            <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#0c0705]/85 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
              <Icon name="search" className="h-3.5 w-3.5 text-[#FF5F2D]" />
              Zoomed detail {String(active + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {items.map((f, i) => {
              const on = i === active;
              return (
                <button
                  key={f.title}
                  type="button"
                  onClick={() => pick(i)}
                  className={`group relative flex items-start gap-4 overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
                    on ? "border-[#FF5F2D]/40 bg-[#fff7f3] shadow-lg shadow-[#FF5F2D]/10" : "border-gray-200 bg-white hover:border-[#FF5F2D]/30"
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
                      on ? "bg-[#FF5F2D] text-white" : "bg-[#FF5F2D]/10 text-[#FF5F2D]"
                    }`}
                  >
                    <Icon name={f.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gray-400">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-semibold text-[#0c0705]">{f.title}</span>
                    </span>
                    <span
                      className={`grid transition-all duration-500 ${on ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <span className="overflow-hidden text-sm leading-relaxed text-gray-600">{f.desc}</span>
                    </span>
                  </span>
                  {/* auto-play progress */}
                  {on && auto && inView && (
                    <span
                      key={`progress-${active}`}
                      className="absolute bottom-0 left-0 h-[3px] bg-[#FF5F2D]"
                      style={{ animation: `detail-progress ${DETAIL_MS}ms linear forwards` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

/* ----------------------------- services involved --------------------------- */

function ServicesInvolved({ p }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {p.services.map((sv, i) => {
        const s = solutionBySlug[sv];
        if (!s) return null;
        return (
          <Reveal key={sv} delay={i * 120} className="h-full">
            <Link
              href={`/solutions/${sv}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:bg-[#0c0705] hover:shadow-2xl hover:shadow-[#0c0705]/20"
            >
              <span className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#FF5F2D]/0 blur-2xl transition-colors duration-500 group-hover:bg-[#FF5F2D]/40" />
              <div className="relative flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF5F2D] text-white">
                  <Icon name={s.icon} className="h-5 w-5" />
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-[#0c0705] transition-all duration-500 group-hover:-rotate-45 group-hover:border-[#FF5F2D] group-hover:bg-[#FF5F2D] group-hover:text-white">
                  <Icon name="arrow" className="h-4 w-4" />
                </span>
              </div>
              <h3 className="relative mt-8 text-xl font-semibold tracking-tight text-[#0c0705] transition-colors duration-500 group-hover:text-white">
                {s.name}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-gray-600 transition-colors duration-500 group-hover:text-white/70">
                {s.tagline}
              </p>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}


/* --------------------------- challenge / solution ------------------------- */

function ChallengeSolution({ p }) {
  const cards = [
    { label: "The challenge", icon: "target", text: p.challenge, dark: true },
    { label: "Our solution", icon: "spark", text: p.solution, dark: false },
  ];
  return (
    <div className="relative grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* connector between the two cards */}
      <Reveal variant="scale" delay={350} className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-[#0c0705] text-[#FF5F2D] shadow-xl">
          <Icon name="arrow" className="h-6 w-6" />
        </span>
      </Reveal>
      {cards.map((c, i) => (
        <Reveal key={c.label} variant={i === 0 ? "left" : "right"} delay={i * 150} className="h-full">
          <article
            className={`group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[2rem] p-8 text-white transition-transform duration-500 hover:-translate-y-2 sm:p-10 ${
              c.dark ? "bg-[#0c0705]" : "bg-gradient-to-br from-[#FF5F2D] to-[#e6481a]"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.1] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:18px_18px]" />
            <span className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-dashed animate-[spin_40s_linear_infinite] ${c.dark ? "border-[#FF5F2D]/30" : "border-white/40"}`} />
            <span className="pointer-events-none absolute -bottom-10 -right-10 text-white/[0.07] transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110">
              <Icon name={c.icon} className="h-52 w-52" />
            </span>

            <div className="relative flex items-center gap-3">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.dark ? "bg-[#FF5F2D] text-white" : "bg-white text-[#FF5F2D]"}`}>
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] backdrop-blur">
                {c.label}
              </span>
            </div>
            <p className="relative mt-auto pt-10 text-xl font-medium leading-snug tracking-tight sm:text-2xl">
              {c.text}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* --------------------------------- outcome -------------------------------- */

function Outcome({ p }) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <Reveal variant="left" className="h-full">
        <div className="relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[2rem] bg-[#fbe3d1] p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#FF5F2D_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(180deg,black,transparent)]" />
          <span className="relative inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-[#FF5F2D]">
            <Icon name="growth" className="h-3.5 w-3.5" />
            The outcome
          </span>
          <h3 className="relative mt-6 text-3xl font-semibold leading-tight tracking-tight text-[#0c0705] sm:text-4xl">
            Built with{" "}
            {p.services.map((s, i) => (
              <span key={s}>
                <Link href={`/solutions/${s}`} className="text-[#FF5F2D] underline decoration-[#FF5F2D]/30 underline-offset-4 transition-colors hover:decoration-[#FF5F2D]">
                  {solutionBySlug[s]?.short}
                </Link>
                {i < p.services.length - 2 ? ", " : i === p.services.length - 2 ? " & " : ""}
              </span>
            ))}
            .
          </h3>
          <div className="relative mt-auto pt-8">
            <PillButton href="/contact">Get similar results</PillButton>
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 content-center gap-x-10 gap-y-2 sm:grid-cols-2">
        {p.outcomes.map((o, i) => (
          <Reveal key={o} delay={i * 90}>
            <div className="group relative flex items-start gap-4 py-5">
              <span className="absolute inset-x-0 top-0 h-px bg-gray-200" />
              <span className="absolute left-0 top-0 h-px w-0 bg-[#FF5F2D] transition-all duration-500 group-hover:w-full" />
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fbe3d1] text-[#FF5F2D] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#FF5F2D] group-hover:text-white">
                <Icon name="check" className="h-4 w-4" />
              </span>
              <p className="pt-1.5 font-medium text-[#0c0705]">{o}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- next project ------------------------------ */

function chipsFor(project) {
  const ind = industryBySlug[project.industry];
  const cat = categoryBySlug[project.category];
  return [ind?.name || project.industryLabel, cat?.name].filter(Boolean);
}

// End-of-case-study navigator: a big "next project" card (screenshot shown in full on a tilted
// frame that straightens on hover) plus previous / next links to step through every project.
function NextProject({ prev, next, nextIndex, total }) {
  return (
    <div>
      <Reveal variant="scale">
        <Link
          href={`/portfolio/work/${next.slug}`}
          className="group relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] bg-[#0c0705] p-7 text-white transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#FF5F2D]/25 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14 lg:p-14"
        >
          {/* background: dots, glows, giant ghost word */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
          <span className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#FF5F2D]/25 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
          <span className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#FF5F2D]/15 blur-3xl" />
          <span className="pointer-events-none absolute -bottom-8 left-4 select-none text-[7rem] font-semibold leading-none tracking-tighter text-white/[0.04] transition-transform duration-700 group-hover:translate-x-6 sm:text-[11rem] lg:text-[13rem]">
            NEXT
          </span>

          {/* text */}
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#FF5F2D]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF5F2D] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF5F2D]" />
                </span>
                Next project
              </span>
              <span className="font-mono text-sm text-white/40">
                {String(nextIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {chipsFor(next).map((c) => (
                <span key={c} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/75">
                  {c}
                </span>
              ))}
            </div>

            <h3 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl lg:text-5xl xl:text-6xl">
              {next.name}
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-white/60">{next.summary}</p>

            <span className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#FF5F2D] py-1.5 pl-6 pr-1.5 font-medium text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#0c0705]">
              View case study
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#FF5F2D] transition-all duration-500 group-hover:-rotate-45 group-hover:bg-[#FF5F2D] group-hover:text-white">
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </span>
          </div>

          {/* screenshot on a tilted frame that straightens and lifts on hover */}
          <div className="relative [perspective:1400px]">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-white/[0.06] p-2 ring-1 ring-white/10 shadow-2xl shadow-black/50 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotateY(-10deg)_rotateX(4deg)_rotate(-2deg)] group-hover:[transform:rotateY(0deg)_rotateX(0deg)_rotate(0deg)_scale(1.03)]">
              {next.cover.type === "image" ? (
                <ProjectCover cover={next.cover} fit="contain" className="h-[240px] rounded-[1.1rem] !bg-white/[0.04] sm:h-[320px] lg:h-[360px]" />
              ) : (
                <ProjectCover cover={next.cover} className="aspect-[4/3] rounded-[1.1rem]" />
              )}
            </div>
          </div>
        </Link>
      </Reveal>

      {/* previous / next */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { label: "Previous project", project: prev, dir: "prev" },
          { label: "Next project", project: next, dir: "next" },
        ].map(({ label, project, dir }, i) => (
          <Reveal key={dir} delay={i * 120}>
            <Link
              href={`/portfolio/work/${project.slug}`}
              className={`group flex items-center gap-4 rounded-[1.5rem] border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-[#FF5F2D]/40 hover:shadow-lg hover:shadow-[#FF5F2D]/10 sm:p-5 ${
                dir === "next" ? "sm:flex-row-reverse sm:text-right" : ""
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[#0c0705] transition-all duration-300 group-hover:bg-[#FF5F2D] group-hover:text-white">
                <Icon name="arrow" className={`h-4 w-4 transition-transform duration-300 ${dir === "prev" ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"}`} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs uppercase tracking-[0.15em] text-gray-500">{label}</span>
                <span className="block truncate font-semibold text-[#0c0705] transition-colors group-hover:text-[#FF5F2D]">{project.name}</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- page ---------------------------------- */

export default function ProjectPage({ slug }) {
  const idx = projects.findIndex((x) => x.slug === slug);
  if (idx < 0) return null;
  const p = projects[idx];
  const nextIndex = (idx + 1) % projects.length;
  const next = projects[nextIndex];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const related = projects
    .filter((x) => x.slug !== p.slug && x.slug !== next.slug)
    .sort((a, b) => (b.category === p.category) - (a.category === p.category))
    .slice(0, 3);

  const process = solutionBySlug[p.services[0]]?.process;

  return (
    <>
      <ScrollProgress />
      <ProjectHero p={p} />

      <AtAGlance p={p} />

      <Section className="bg-white">
        <SectionHeader title="Challenge &" highlight="solution">
          What the client needed — and how we solved it.
        </SectionHeader>
        <ChallengeSolution p={p} />
      </Section>

      {p.cover.type === "image" && (
        <Section className="bg-gray-50">
          <SectionHeader title="Design" highlight="details">
            Explore the key screens — tap a number to zoom in.
          </SectionHeader>
          <DesignDetails p={p} />
        </Section>
      )}

      <Section className="bg-white">
        <SectionHeader title="Key" highlight="features">
          The capabilities that made the difference.
        </SectionHeader>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {p.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 110} className="h-full">
              <FeatureCard f={f} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Reveal variant="fade" duration={1000}>
        <div className="px-6 sm:px-10 lg:px-14">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
            Tech stack
          </p>
          <div className="overflow-hidden rounded-[2rem]">
            <ToolsMarquee tools={p.tech} />
          </div>
        </div>
      </Reveal>

      {process && (
        <Section className="bg-gray-50">
          <SectionHeader title="How we" highlight="delivered it">
            Our {solutionBySlug[p.services[0]].name.toLowerCase()} process, from first call to launch.
          </SectionHeader>
          <ProcessTimeline steps={process} />
        </Section>
      )}

      <Section className="bg-white">
        <SectionHeader title="The" highlight="outcome">
          What the finished product delivers.
        </SectionHeader>
        <Outcome p={p} />
      </Section>

      <Section className="bg-gray-50">
        <SectionHeader title="Services" highlight="involved">
          The Qytrona services that came together on this project.
        </SectionHeader>
        <ServicesInvolved p={p} />
      </Section>

      {/* Next project */}
      <Section className="bg-white">
        <NextProject prev={prev} next={next} nextIndex={nextIndex} total={projects.length} />
      </Section>

      {related.length > 0 && (
        <Section className="bg-white">
          <SectionHeader title="More" highlight="work">
            Other projects you might like.
          </SectionHeader>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 120} className="h-full">
                <ProjectCard project={r} index={i} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Reveal variant="scale">
        <CtaBanner
          title="Have a similar"
          highlight="project?"
          text="Tell us what you're building and we'll get back within one business day with ideas and a clear quote."
          label="Start Your Project"
        />
      </Reveal>
    </>
  );
}
