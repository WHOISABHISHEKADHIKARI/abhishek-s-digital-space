import React, { useState, useEffect, useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Github, Linkedin, ExternalLink, Moon, Sun, Mail, Camera, Award, FileImage, Image, ArrowUp, Send, Zap } from "lucide-react";
import profileData from "../../../../abhishek_profile.json";
import ImagePreview from "../components/image-preview";
import ImageWithSkeleton from "../components/image-with-skeleton";
import ErrorBoundary from "../components/error-boundary";

const sectionLimits = {
  experience: 5,
  projects: 6,
  volunteering: 6,
  certifications: 6,
  news: 4,
  recommendations: 4,
};

function SectionHeader({
  label,
  title,
  summary,
}: {
  label: string;
  title: string;
  summary?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <div className="text-xs font-semibold tracking-wide text-primary mb-2">
        {label}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {summary && (
        <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
          {summary}
        </p>
      )}
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

function ShowMoreButton({
  expanded,
  hiddenCount,
  onClick,
}: {
  expanded: boolean;
  hiddenCount: number;
  onClick: () => void;
}) {
  if (hiddenCount <= 0) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-6 rounded-lg border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted active:scale-[0.97] transition-all duration-200 min-h-11"
    >
      {expanded ? "Show less" : `Show ${hiddenCount} more`}
    </button>
  );
}

const MEDIUM_FEED = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@abhishekadhikari1254";

function stripHtml(html: string) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
}

function cleanMediumUrl(url: string) {
  return url.replace(/\?source=rss.*/, "");
}

function formatDate(pubDate: string) {
  const d = new Date(pubDate);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

function BlogPosts({ spring, prefersReducedMotion }: { spring: any; prefersReducedMotion: boolean | null }) {
  const [posts, setPosts] = useState<any[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(MEDIUM_FEED)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.status === "ok" && data.items?.length) {
          setPosts(data.items.map((item: any) => ({
            title: item.title,
            publication: "Medium",
            date: formatDate(item.pubDate),
            url: cleanMediumUrl(item.link),
            summary: stripHtml(item.description).slice(0, 200),
            tags: item.categories ?? [],
            coverImage: item.thumbnail || null,
          })));
        } else {
          setPosts([]);
        }
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => { cancelled = true; };
  }, []);

  if (error) return <EmptyState message="Could not load blog posts. Visit medium.com/@abhishekadhikari1254" />;
  if (posts === null) return <div className="flex items-center justify-center py-16"><span className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (posts.length === 0) return <EmptyState message="Nothing to show yet. Check back soon." />;

  return (
    <div className="space-y-4">
      {posts.map((post, i) => (
        <motion.a
          key={post.url}
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.4, ...spring }}
          whileHover={{ y: -3 }}
          className="group flex flex-col sm:flex-row gap-5 p-6 rounded-2xl bg-muted/30 border border-muted hover:border-primary/40 hover:bg-muted/50 transition-all"
        >
          <div className="sm:w-36 sm:h-24 w-full h-40 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            {post.coverImage ? (
              <ImageWithSkeleton src={post.coverImage} alt={`${post.title} — blog post by Abhishek Adhikari on Medium`} loading="lazy" decoding="async" className="w-full h-full object-cover" wrapperClassName="w-full h-full" />
            ) : (
              <FileImage size={28} className="text-primary/30" />
            )}
          </div>
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">{post.date}</span>
              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{post.publication}</span>
            </div>
            <h3 className="font-bold text-base group-hover:text-primary transition-colors">{post.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{post.summary}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag: string, t: number) => (
                <span key={t} className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">{tag}</span>
              ))}
            </div>
          </div>
          <ExternalLink size={16} className="shrink-0 self-center text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.a>
      ))}
    </div>
  );
}

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);
  const [erroredImages, setErroredImages] = useState<Set<string>>(new Set());
  const markErrored = (key: string) => setErroredImages((prev) => new Set(prev).add(key));
  const prefersReducedMotion = useReducedMotion();
  const spring = useMemo(() => prefersReducedMotion ? { duration: 0 } : { ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }, [prefersReducedMotion]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const validate = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!form.name.trim()) errors.name = "Name is required.";
    if (!form.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";
    if (!form.message.trim()) errors.message = "Message is required.";
    if (form.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setSending(true);
    try {
      const response = await fetch("https://formspree.io/f/xrebreqr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (response.ok) {
        setSent(true);
        setForm({ name: "", email: "", message: "" });
        setFormErrors({});
        setTimeout(() => setSent(false), 4000);
      }
    } catch {
      setFormErrors({ name: "Something went wrong. Please try again later." });
    } finally {
      setSending(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((current) => ({ ...current, [section]: !current[section] }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpandedSections({ experience: true, projects: true, volunteering: true, certifications: true, news: true, recommendations: true });
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const visibleItems = <T,>(section: keyof typeof sectionLimits, items: T[]) =>
    expandedSections[section] ? items : items.slice(0, sectionLimits[section]);

  const projects = profileData.projects.flatMap((cat: any) =>
    cat.items.map((item: any) => ({ ...item, category: cat.category })),
  );
  const experiences = visibleItems("experience", profileData.experience);
  const visibleProjects = visibleItems("projects", projects);
  const volunteering = visibleItems("volunteering", profileData.volunteering);
  const certifications = visibleItems("certifications", (profileData as any).certifications ?? []);
  const newsMedia = visibleItems("news", (profileData as any).newsMedia ?? []);
  const recommendations = visibleItems("recommendations", profileData.recommendations);

  return (
    <div className="min-h-screen font-sans">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="fixed -top-20 left-4 z-skip rounded-b-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-md transition-all duration-200 focus:top-0 focus:outline-none"
      >
        Skip to content
      </a>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href={profileData.profile.website} className="font-bold text-lg tracking-tight" rel="author">AA.</a>
          <div className="hidden md:flex items-center gap-1 text-sm font-medium">
            {["about", "experience", "projects", "certifications", "blog", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            <span className="mx-1 w-px h-5 bg-border" />
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 active:scale-90"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" className="max-w-5xl mx-auto px-6 pt-28 pb-24 space-y-24">
        
        {/* Hero */}
        <ErrorBoundary section="Hero">
        <section id="hero" className="space-y-6 pt-8 relative">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-decorative-3/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
          <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-8">
            <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ...spring }}
              className="flex-1"
              style={{ willChange: "transform, opacity" }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-primary">
                {profileData.profile.name}
              </h1>
              <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                I help agribusinesses scale 10x through digital systems, build tech communities that outlive events, and craft SEO strategies that turn websites into revenue assets.
              </p>
              <p className="mt-3 text-sm text-muted-foreground/70 leading-relaxed max-w-xl">
                Founded Himalaya Krishi (220+ livestock), co-founded DEV Community Nepal (100+ events), and consulted 10+ clients on technical SEO and digital growth from Hetauda, Nepal.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2, ...spring }}
              className="shrink-0"
            >
              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-2 border-border shadow-xl bg-muted">
                <ImageWithSkeleton
                  src="/abhishek-adhikari-profile.png"
                  alt="Abhishek Adhikari — Lead Organizer & Speaker"
                  className="w-full h-full object-cover"
                  wrapperClassName="w-full h-full"
                />
              </div>
            </motion.div>

          </div>
          
          <motion.div 
            className="flex gap-4 pt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2, ...spring }}
            style={{ willChange: "transform, opacity" }}
          >
            <a href={profileData.profile.linkedin} target="_blank" rel="me noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:scale-[0.97] transition-all duration-200 shadow-sm">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href={profileData.profile.github} target="_blank" rel="me noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 active:scale-[0.97] transition-all duration-200 shadow-sm">
              <Github size={18} /> GitHub
            </a>
          </motion.div>
        </section>
        </ErrorBoundary>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ...spring }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border bg-border"
        >
          {[
            ["220+", "Livestock capacity"],
            ["100+", "Community events"],
            ["10+", "SEO clients"],
            ["12", "AI skills built"],
          ].map(([value, label]) => (
            <div key={label} className="bg-card px-6 py-8 text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{value}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="relative py-4">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-border/60" />
          <div className="relative flex justify-center">
            <span className="bg-background px-4 text-xs text-muted-foreground/40 uppercase tracking-widest font-medium">What I do</span>
          </div>
        </div>

        {/* Antigravity Skills */}
        <ErrorBoundary section="AI Skills">
        <section id="skills">
          <SectionHeader
            label="AI Skills"
            title="Skills I contributed to Antigravity"
            summary="Agentic skills published in the Antigravity Awesome Skills library (1,541+ skills, 40k+ stars) — available for Claude Code, Cursor, Gemini CLI, Copilot, and more."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "WordPress Centric High SEO Optimized Blogwriting", id: "wordpress-centric-high-seo-optimized-blogwriting-skill", cat: "WordPress SEO", ver: "v9.13.0" },
              { name: "Codebase to WordPress Converter", id: "codebase-to-wordpress-converter", cat: "WordPress Development", ver: "v9.13.0" },
              { name: "LinkedIn Profile Optimizer", id: "linkedin-profile-optimizer", cat: "LinkedIn SEO", ver: "v10.0.0" },
              { name: "Indexing Issue Auditor", id: "indexing-issue-auditor", cat: "Technical SEO", ver: "v10.0.0" },
              { name: "Social Post Writer SEO", id: "social-post-writer-seo", cat: "Social SEO", ver: "v10.4.0" },
              { name: "Next.js SEO Indexing", id: "nextjs-seo-indexing", cat: "Technical SEO", ver: "v11.10.0" },
              { name: "Schema Markup Generator", id: "schema-markup-generator", cat: "Structured Data SEO", ver: "v11.10.0" },
              { name: "Social Metadata Hardening", id: "social-metadata-hardening", cat: "Social Metadata SEO", ver: "v11.10.0" },
              { name: "Vibe Code Cleanup", id: "vibe-code-cleanup", cat: "AI Code Quality", ver: "v11.10.0" },
              { name: "VibeCode Production QA Validator", id: "vibecode-production-qa-validator", cat: "Production QA", ver: "v11.10.0" },
              { name: "ExamPrep AI", id: "examprep-ai", cat: "Education AI", ver: "v12.1.0" },
              { name: "CV Generator", id: "cv-generator", cat: "Career/CV AI", ver: "v12.2.0" },
            ].map((skill, i) => (
              <motion.a
                key={skill.id}
                href={`https://github.com/sickn33/antigravity-awesome-skills/blob/main/skills/${skill.id}/SKILL.md`}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4, ...spring }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px hsla(40,20%,10%,0.08)" }}
                className="flex items-start gap-3 p-4 rounded-xl border bg-card hover:bg-muted/40 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap size={16} className="text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm leading-snug">{skill.name}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{skill.cat}</span>
                    <span className="text-xs text-muted-foreground/60 font-mono">{skill.ver}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href="https://github.com/sickn33/antigravity-awesome-skills"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink size={14} />
              Browse the full Antigravity Awesome Skills library
            </a>
          </div>
        </section>
        </ErrorBoundary>

        {/* About */}
        <ErrorBoundary section="About">
        <section id="about">
          <SectionHeader
            label="About"
            title="Rural roots. Practical technology. Community scale."
            summary="Three businesses, 100+ events, 10+ clients — and a track record of turning small experiments into real impact."
          />
          <p className="text-base md:text-lg leading-relaxed text-foreground/90 max-w-3xl">
            I started in agriculture at 14 — managing a family buffalo farm that grew from 25 to 220+ head through systematic feeding, digital record-keeping, and market linkage. That same mindset now drives everything I do: build systems that scale, teach what you know, and invest in communities that outlast any single project.
          </p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            {[
              ["220+", "livestock capacity scaled at Himalaya Krishi"],
              ["100+", "virtual community events supported"],
              ["10+", "clients and growth projects managed"],
            ].map(([metric, text]) => (
              <div key={metric} className="rounded-xl border bg-muted/30 p-4">
                <div className="text-2xl font-bold text-primary">{metric}</div>
                <div className="mt-1 text-sm text-muted-foreground leading-snug">{text}</div>
              </div>
            ))}
          </div>
        </section>
        </ErrorBoundary>

        {/* Experience */}
        <ErrorBoundary section="Experience">
        <section id="experience">
          <SectionHeader
            label="Experience"
            title="Where I have worked"
            summary="Showing the most relevant roles first. Expand for the full timeline."
          />
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border hidden md:block" />
            <div className="space-y-6">
              {experiences.map((exp: any, i: number) => {
                const orgColors = [
                  "bg-decorative-1 text-white",
                  "bg-decorative-2 text-white",
                  "bg-decorative-3 text-white",
                  "bg-decorative-4 text-white",
                  "bg-decorative-5 text-white",
                  "bg-decorative-6 text-white",
                  "bg-decorative-1 text-white",
                  "bg-decorative-5 text-white",
                ];
                const colorClass = orgColors[i % orgColors.length];
                const orgInitials = exp.organization
                  .split(/[\s&]+/)
                  .filter((w: string) => w.length > 2)
                  .slice(0, 2)
                  .map((w: string) => w[0].toUpperCase())
                  .join("");
                const logoErrored = erroredImages.has(`exp-logo-${i}`);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4, ...spring }}
                    className="relative md:pl-16"
                    data-testid={`card-experience-${i}`}
                  >
                    {/* Logo tile — sits on the timeline */}
                    <div className={`hidden md:flex absolute left-0 top-0 w-10 h-10 rounded-xl items-center justify-center text-xs font-bold shrink-0 shadow-sm ${colorClass}`}>
                      {exp.logoUrl && !logoErrored ? (
                        <ImageWithSkeleton src={exp.logoUrl} alt={`${exp.organization} logo — ${exp.role} at ${exp.organization}, Abhishek Adhikari work experience ${exp.startDate}–${exp.endDate}`} className="w-full h-full object-cover rounded-xl" wrapperClassName="w-full h-full" onError={() => markErrored(`exp-logo-${i}`)} />
                      ) : (
                        orgInitials || exp.organization.slice(0, 2).toUpperCase()
                      )}
                    </div>

                    {/* Card */}
                    <div className="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.99]">
                      {/* Header — logo inline on mobile, hidden on desktop (logo is absolute there) */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`flex md:hidden w-10 h-10 rounded-xl items-center justify-center text-xs font-bold shrink-0 shadow-sm ${colorClass}`}>
                          {exp.logoUrl && !logoErrored ? (
                            <ImageWithSkeleton src={exp.logoUrl} alt={`${exp.organization} logo — ${exp.role} at ${exp.organization}, Abhishek Adhikari work experience ${exp.startDate}–${exp.endDate}`} className="w-full h-full object-cover rounded-xl" wrapperClassName="w-full h-full" onError={() => markErrored(`exp-logo-${i}`)} />
                          ) : (
                            orgInitials || exp.organization.slice(0, 2).toUpperCase()
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                            <h3 className="text-base font-semibold leading-tight">{exp.role}</h3>
                            <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">{exp.startDate} – {exp.endDate}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-sm font-medium text-primary">{exp.organization}</span>
                            <span className="text-xs text-muted-foreground border rounded-full px-2 py-0.5">{exp.type}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-foreground/75 mb-3 leading-relaxed">{exp.summary}</p>
                      {exp.impact && (
                        <ul className="space-y-1.5">
                          {exp.impact.slice(0, 2).map((imp: string, j: number) => (
                            <li key={j} className="flex gap-2 text-sm text-muted-foreground">
                              <span className="text-primary mt-0.5 shrink-0">-</span>
                              <span>{imp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <ShowMoreButton
            expanded={Boolean(expandedSections.experience)}
            hiddenCount={profileData.experience.length - sectionLimits.experience}
            onClick={() => toggleSection("experience")}
          />
        </section>
        </ErrorBoundary>

        {/* Projects */}
        <ErrorBoundary section="Projects">
        <section id="projects">
          <SectionHeader
            label="Projects"
            title="What I have built"
            summary="A shorter project wall keeps the page easier to scan while preserving every link."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleProjects.map((item: any, i: number) => {
                const screenshotUrl = item.imageUrl ?? `https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&meta=false&embed=screenshot.url`;
              const categoryColors: Record<string, string> = {
                "Personal Brand": "bg-accent/15 text-accent dark:bg-accent/20 dark:text-accent",
                "SEO & Tools": "bg-primary/15 text-primary dark:bg-primary/20 dark:text-primary",
                "Agriculture": "bg-decorative-3/15 text-decorative-3 dark:bg-decorative-3/20 dark:text-decorative-3",
                "Coffee & Training": "bg-decorative-1/15 text-decorative-1 dark:bg-decorative-1/20 dark:text-decorative-1",
                "Business & Corporate": "bg-decorative-5/15 text-decorative-5 dark:bg-decorative-5/20 dark:text-decorative-5",
              };
              const badgeClass = categoryColors[item.category] ?? "bg-muted text-muted-foreground";
              return (
                <motion.a
                  key={i}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`card-project-${i}`}
                  className="group relative flex flex-col rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4, ...spring }}
                  whileHover={{ y: -6, boxShadow: "0 16px 48px hsla(40,20%,10%,0.1)" }}
                >
                  {/* Screenshot image */}
                  <div className="relative w-full aspect-[16/9] overflow-hidden">
                    {erroredImages.has(`project-${i}`) ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <span className="text-5xl font-bold text-primary/30">{item.name.charAt(0).toUpperCase()}</span>
                      </div>
                    ) : (
                        <ImageWithSkeleton
                        src={screenshotUrl}
                        alt={`${item.name} — ${item.category} website project built by Abhishek Adhikari`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        wrapperClassName="absolute inset-0"
                        onError={() => markErrored(`project-${i}`)}
                      />
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 rounded-full p-3 shadow-lg">
                        <ExternalLink size={20} className="text-foreground" />
                      </div>
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="flex flex-col gap-2 p-4">
                    <span className={`self-start text-xs font-semibold px-2.5 py-0.5 rounded-full ${badgeClass}`}>
                      {item.category}
                    </span>
                    <span className="font-semibold text-base text-foreground leading-tight">{item.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{item.url.replace(/^https?:\/\//, "")}</span>
                  </div>
                </motion.a>
              );
            })}
          </div>
          <ShowMoreButton
            expanded={Boolean(expandedSections.projects)}
            hiddenCount={projects.length - sectionLimits.projects}
            onClick={() => toggleSection("projects")}
          />
        </section>
        </ErrorBoundary>

        {/* Volunteering */}
        <ErrorBoundary section="Volunteering">
        <section id="volunteering">
          <SectionHeader
            label="Leadership"
            title="Community and teaching moments"
            summary="A curated first view of events, certificates, and facilitation work."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {volunteering.map((vol: any, i: number) => {
              const img = vol.images?.[0];
              const typeConfig: Record<string, { icon: React.ReactNode; label: string; gradient: string }> = {
                event_photo: {
                  icon: <Camera size={28} />,
                  label: "Event Photo",
                  gradient: "from-decorative-3/80 to-decorative-4/40",
                },
                certificate: {
                  icon: <Award size={28} />,
                  label: "Certificate",
                  gradient: "from-decorative-1/80 to-decorative-2/40",
                },
                poster: {
                  icon: <FileImage size={28} />,
                  label: "Poster",
                  gradient: "from-decorative-5/80 to-decorative-6/40",
                },
              };
              const cfg = img ? (typeConfig[img.type] ?? { icon: <Image size={28} />, label: img.type, gradient: "from-decorative-4/80 to-decorative-5/40" }) : null;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4, ...spring }}
                  whileHover={{ y: -4, boxShadow: "0 12px 40px hsla(40,20%,10%,0.08)" }}
                  className="rounded-xl bg-card border shadow-sm overflow-hidden flex flex-col"
                  data-testid={`card-volunteering-${i}`}
                >
                  {/* Image placeholder */}
                  {cfg && (
                    <div
                      className={`relative w-full aspect-[16/7] bg-gradient-to-br ${cfg.gradient} flex flex-col items-center justify-center gap-2 text-white/50 ${img.imageUrl ? "cursor-pointer" : ""}`}
                      onClick={() => img.imageUrl && setPreview({ src: img.imageUrl, alt: img.caption ?? "" })}
                    >
                      {cfg.icon}
                      <span className="text-xs font-semibold tracking-widest uppercase opacity-60">{cfg.label}</span>
                      {img.imageUrl && (
                        <ImageWithSkeleton
                          src={img.imageUrl}
                          alt={img.caption ? `${img.caption} — ${vol.role} at ${vol.organization}, Abhishek Adhikari volunteering (${vol.date || vol.startDate})` : `${vol.role} at ${vol.organization} — volunteer work by Abhishek Adhikari`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover"
                          wrapperClassName="absolute inset-0"
                        />
                      )}
                      {img.caption && (
                        <div className="absolute bottom-0 inset-x-0 px-4 py-2 bg-foreground/40 backdrop-blur-sm">
                          <p className="text-white text-xs line-clamp-1">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  )}
                  {/* Card body */}
                  <div className="p-5 flex flex-col gap-1">
                    <div className="text-xs font-mono text-muted-foreground">{vol.date || vol.startDate}</div>
                    <h3 className="font-bold text-base leading-tight">{vol.role}</h3>
                    <div className="text-primary text-sm mb-2">{vol.organization}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{vol.summary}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <ShowMoreButton
            expanded={Boolean(expandedSections.volunteering)}
            hiddenCount={profileData.volunteering.length - sectionLimits.volunteering}
            onClick={() => toggleSection("volunteering")}
          />
        </section>
        </ErrorBoundary>

        {/* Certifications */}
        <ErrorBoundary section="Certifications">
        <section id="certifications">
          <SectionHeader
            label="Certificates"
            title="Certifications I hold"
            summary="Certificate previews are available without making this section a wall."
          />
          {certifications.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
              {certifications.map((cert: any, i: number) => {
                const issuerInitials = cert.issuer.slice(0, 2).toUpperCase();
                const issuerColors = [
                  "from-decorative-1/20 to-decorative-2/10 border-decorative-1/30",
                  "from-decorative-3/20 to-decorative-4/10 border-decorative-3/30",
                  "from-decorative-5/20 to-decorative-6/10 border-decorative-5/30",
                  "from-decorative-2/20 to-decorative-3/10 border-decorative-2/30",
                  "from-decorative-4/20 to-decorative-5/10 border-decorative-4/30",
                  "from-decorative-6/20 to-decorative-1/10 border-decorative-6/30",
                ];
                const cardAccent = issuerColors[i % issuerColors.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4, ...spring }}
                    whileHover={{ y: -6, boxShadow: "0 16px 48px hsla(40,20%,10%,0.1)" }}
                    className={`group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-300 ${cardAccent}`}
                  >
                    {/* Certificate image */}
                    {cert.imageUrl && (
                      <div
                        className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted to-muted/50 cursor-pointer"
                        onClick={() => setPreview({ src: cert.imageUrl, alt: cert.title })}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <ImageWithSkeleton
                          src={cert.imageUrl}
                          alt={`${cert.title} — ${cert.issuer} professional certification credential, Abhishek Adhikari earned ${cert.date}`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                          wrapperClassName="absolute inset-0"
                        />
                        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-background/90 rounded-full p-2.5 shadow-lg backdrop-blur-sm">
                            <Image size={18} className="text-foreground" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Card body */}
                    <div className="flex flex-col gap-3 p-4 pt-3.5">
                      {/* Issuer row */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-primary font-bold text-xs tracking-wide">
                            {issuerInitials}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-semibold text-foreground truncate leading-tight">{cert.issuer}</div>
                          {cert.platform && (
                            <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">{cert.platform}</div>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-muted-foreground shrink-0">{cert.date}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-sm leading-snug text-foreground line-clamp-2">{cert.title}</h3>

                      {/* Skills */}
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {cert.skills.slice(0, 3).map((sk: string, s: number) => (
                            <span key={s} className="text-[11px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground font-medium">{sk}</span>
                          ))}
                          {cert.skills.length > 3 && (
                            <span className="text-[11px] px-2 py-0.5 text-muted-foreground/60">+{cert.skills.length - 3}</span>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-1 mt-auto border-t border-muted/50">
                        {cert.credentialId && (
                          <span className="text-[11px] text-muted-foreground/60 font-mono truncate max-w-[60%]" title={cert.credentialId}>
                            {cert.credentialId}
                          </span>
                        )}
                        <div className="flex-1" />
                        {cert.url ? (
                          <a href={cert.url} target="_blank" rel="noopener noreferrer"
                            className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors">
                            Verify <ExternalLink size={11} />
                          </a>
                        ) : (
                          cert.credentialId && <span className="text-[11px] text-muted-foreground/40 italic">No link</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <ShowMoreButton
              expanded={Boolean(expandedSections.certifications)}
              hiddenCount={((profileData as any).certifications ?? []).length - sectionLimits.certifications}
              onClick={() => toggleSection("certifications")}
            />
          </>
        ) : (
          <EmptyState message="No certificates listed yet." />
        )}
        </section>
        </ErrorBoundary>

        {/* Blog */}
        <ErrorBoundary section="Blog">
        <section id="blog">
          <SectionHeader label="Blog" title="What I write on Medium" summary="Real posts from medium.com/@abhishekadhikari1254" />
          <BlogPosts spring={spring} prefersReducedMotion={prefersReducedMotion} />
        </section>
        </ErrorBoundary>

        {/* News & Media */}
        <ErrorBoundary section="News">
        <section id="news">
          <SectionHeader
            label="Recognition"
            title="News and public proof"
          />
          {newsMedia.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              {newsMedia.map((item: any, i: number) => {
                const typeColors: Record<string, string> = {
                  recognition: "bg-accent/15 text-accent dark:bg-accent/20 dark:text-accent",
                  event_coverage: "bg-primary/15 text-primary dark:bg-primary/20 dark:text-primary",
                  speaking: "bg-secondary/15 text-secondary dark:bg-secondary/20 dark:text-secondary",
                  press: "bg-decorative-2/15 text-decorative-2 dark:bg-decorative-2/20 dark:text-decorative-2",
                };
                const typeLabel: Record<string, string> = {
                  recognition: "Recognition",
                  event_coverage: "Event",
                  speaking: "Speaking",
                  press: "Press",
                };
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4, ...spring }}
                    whileHover={{ y: -4, boxShadow: "0 12px 40px hsla(40,20%,10%,0.08)" }}
                    className="rounded-xl bg-muted/30 border border-muted flex flex-col overflow-hidden"
                  >
                    {/* Image - drop in public/sections/news/images/ and set imageUrl in JSON */}
                    {item.imageUrl && (
                      <div className="w-full h-36 bg-muted cursor-pointer"
                        onClick={() => setPreview({ src: item.imageUrl, alt: item.title })}>
                        <ImageWithSkeleton src={item.imageUrl} alt={`${item.title} — ${item.source} news coverage featuring Abhishek Adhikari agritech entrepreneur Nepal ${item.date}`} loading="lazy" decoding="async" className="w-full h-full object-cover" wrapperClassName="w-full h-full" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[item.type] ?? typeColors.press}`}>
                          {typeLabel[item.type] ?? item.type}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">{item.date}</span>
                      </div>
                      <h3 className="font-bold text-sm leading-snug">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
                      <div className="text-xs text-primary/70 font-medium">{item.source}</div>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1 w-fit">
                          <ExternalLink size={12} /> View coverage
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <ShowMoreButton
              expanded={Boolean(expandedSections.news)}
              hiddenCount={((profileData as any).newsMedia ?? []).length - sectionLimits.news}
              onClick={() => toggleSection("news")}
            />
          </>
        ) : (
          <EmptyState message="Nothing to show yet." />
        )}
        </section>
        </ErrorBoundary>

        {/* Recommendations */}
        <ErrorBoundary section="Recommendations">
        <section id="recommendations">
          <SectionHeader
            label="Recommendations"
            title="What people say"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {recommendations.map((rec: any, i: number) => {
              const avatarColors = [
                "bg-decorative-1 text-white",
                "bg-decorative-3 text-white",
                "bg-decorative-2 text-white",
                "bg-decorative-5 text-white",
                "bg-decorative-4 text-white",
                "bg-decorative-6 text-white",
                "bg-decorative-1 text-white",
                "bg-decorative-5 text-white",
              ];
              const initials = rec.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("").toUpperCase();
              const colorClass = avatarColors[i % avatarColors.length];
              const avatarErrored = erroredImages.has(`rec-avatar-${i}`);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.4, ...spring }}
                  whileHover={{ y: -4, boxShadow: "0 12px 40px hsla(40,20%,10%,0.08)" }}
                  className="p-5 rounded-xl bg-muted/30 border border-muted flex flex-col gap-4 transition-all duration-200"
                  data-testid={`card-recommendation-${i}`}
                >
                  <p className="italic text-sm text-foreground/80 leading-relaxed flex-1 line-clamp-4">"{rec.excerpt}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-muted">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${colorClass}`}>
                      {rec.imageUrl && !avatarErrored ? (
                        <ImageWithSkeleton src={rec.imageUrl} alt={`${rec.name}, ${rec.title} — LinkedIn recommendation for Abhishek Adhikari`} loading="lazy" decoding="async" className="h-full w-full rounded-full object-cover" wrapperClassName="h-full w-full" onError={() => markErrored(`rec-avatar-${i}`)} />
                      ) : (
                        initials
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm">{rec.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{rec.title}</div>
                      {rec.relationship && (
                        <div className="text-xs text-primary/70 mt-0.5">{rec.relationship}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <ShowMoreButton
            expanded={Boolean(expandedSections.recommendations)}
            hiddenCount={profileData.recommendations.length - sectionLimits.recommendations}
            onClick={() => toggleSection("recommendations")}
          />
        </section>
        </ErrorBoundary>

        {/* Contact */}
        <ErrorBoundary section="Contact">
        <section id="contact">
          <SectionHeader
            label="Contact"
            title="Get in touch"
          />
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <p className="text-lg text-foreground/80 leading-relaxed">
                Whether you have a collaboration in mind, want to discuss agritech, or just want to say hello — my inbox is open.
              </p>
              <div className="space-y-3 pt-2">
                <a href={`mailto:${profileData.profile.email ?? "abhishek@abhishekadhikari.com"}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={16} /> {profileData.profile.email ?? "abhishek@abhishekadhikari.com"}
                </a>
                <a href={profileData.profile.linkedin} target="_blank" rel="me noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin size={16} /> LinkedIn
                </a>
                <a href={profileData.profile.website} target="_blank" rel="author noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink size={16} /> {profileData.profile.website?.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
              data-testid="form-contact"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Name <span className="text-destructive">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setFormErrors(f => ({ ...f, name: undefined })); }}
                    data-testid="input-name"
                    className={`rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${formErrors.name ? "border-destructive/50 focus:ring-destructive/40" : "focus:ring-primary/40"}`}
                  />
                  {formErrors.name && <p className="text-xs text-destructive">{formErrors.name}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email <span className="text-destructive">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setFormErrors(f => ({ ...f, email: undefined })); }}
                    data-testid="input-email"
                    className={`rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${formErrors.email ? "border-destructive/50 focus:ring-destructive/40" : "focus:ring-primary/40"}`}
                  />
                  {formErrors.email && <p className="text-xs text-destructive">{formErrors.email}</p>}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Message <span className="text-destructive">*</span></label>
                <textarea
                  required
                  rows={5}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setFormErrors(f => ({ ...f, message: undefined })); }}
                  data-testid="input-message"
                  className={`rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 transition resize-none ${formErrors.message ? "border-destructive/50 focus:ring-destructive/40" : "focus:ring-primary/40"}`}
                />
                {formErrors.message && <p className="text-xs text-destructive">{formErrors.message}</p>}
              </div>
              <button
                type="submit"
                data-testid="button-submit"
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 active:scale-[0.97] transition-all duration-200 shadow-sm disabled:opacity-50"
              >
                {sending ? "Sending..." : sent ? "Message sent." : <><Send size={15} /> Send Message</>}
              </button>
            </motion.form>
          </div>
        </section>
        </ErrorBoundary>

      </main>

      {/* Image preview lightbox */}
      <ImagePreview
        src={preview?.src ?? ""}
        alt={preview?.alt ?? ""}
        open={preview !== null}
        onClose={() => setPreview(null)}
      />

      {/* Back to top */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showTop ? 1 : 0, scale: showTop ? 1 : 0.8, pointerEvents: showTop ? "auto" : "none" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        style={{ willChange: "transform, opacity" }}
        data-testid="button-back-to-top"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 active:scale-90 transition-all duration-200"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </motion.button>

      {/* Footer */}
      <footer className="border-t bg-card py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="font-bold text-lg mb-1">{profileData.profile.name}</div>
            <div className="text-sm text-muted-foreground">Building the future of Nepal's tech and agriculture.</div>
          </div>
          <div className="flex gap-4">
            <a href={profileData.profile.linkedin} aria-label="LinkedIn profile" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
            <a href={profileData.profile.github} aria-label="GitHub profile" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></a>
            <a href={profileData.profile.website} aria-label="Website" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
