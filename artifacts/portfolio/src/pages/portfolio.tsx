import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Github, Linkedin, ExternalLink, Moon, Sun, Mail, Camera, Award, FileImage, Image, ArrowUp, Send, MapPin, Menu, X } from "lucide-react";
import ImagePreview from "../components/image-preview";
import ImageWithSkeleton from "../components/image-with-skeleton";
import ErrorBoundary from "../components/error-boundary";
import SocialProofGallery from "../components/social-proof-gallery";

function toIsoDate(value: unknown): string | undefined {
  if (!value) return undefined;
  const s = String(value).trim();
  const months: Record<string, number> = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  };
  let m = s.match(/^(\d{4})$/);
  if (m) return `${m[1]}-01-01`;
  m = s.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?$/);
  if (m) return `${m[1]}-${m[2]}${m[3] ? `-${m[3]}` : "-01"}`;
  m = s.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{4})$/i);
  if (m) return `${m[2]}-${String(months[m[1].toLowerCase().slice(0, 3)]).padStart(2, "0")}-01`;
  m = s.match(/^(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{4})$/i);
  if (m) return `${m[3]}-${String(months[m[2].toLowerCase().slice(0, 3)]).padStart(2, "0")}-${String(m[1]).padStart(2, "0")}`;
  return undefined;
}

function injectStructuredData(id: string, data: Record<string, unknown>) {
  const existing = document.querySelector(`script[data-dynamic-ld="${id}"]`);
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-dynamic-ld", id);
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

const sectionLimits = {
  experience: 5,
  projects: 6,
  volunteering: 6,
  certifications: 6,
  news: 4,
  media: 4,
  recommendations: 4,
};

function SectionHeader({
  label,
  title,
  summary,
  headingId,
}: {
  label: string;
  title: string;
  summary?: string;
  headingId?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <div className="text-xs font-semibold tracking-wide text-primary mb-2">
        {label}
      </div>
      <h2 id={headingId} className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
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
  return html.replace(/<[^>]*>/g, "").trim();
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
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      fetch(MEDIUM_FEED, { priority: "low" } as RequestInit)
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
    };

    const el = trackRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      load();
      return () => { cancelled = true; };
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          obs.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    obs.observe(el);
    return () => { cancelled = true; obs.disconnect(); };
  }, []);

  if (error) return <EmptyState message="Could not load blog posts. Visit medium.com/@abhishekadhikari1254" />;
  if (posts === null) return <div ref={trackRef} className="flex items-center justify-center py-16"><span className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (posts.length === 0) return <EmptyState message="Nothing to show yet. Check back soon." />;

  return (
    <div ref={trackRef} className="space-y-4">
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
          <div className="sm:w-36 sm:h-24 w-full h-40 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
            {post.coverImage ? (
              <ImageWithSkeleton
                src={post.coverImage}
                alt={`${post.title} — blog article by Abhishek Adhikari AI Trainer in Nepal published on Medium ${post.date}`}
                loading="lazy"
                decoding="async"
                width={144}
                height={96}
                className="w-full h-full object-cover"
                wrapperClassName="w-full h-full"
              />
            ) : (
              <span className="text-2xl font-bold text-primary/20 select-none" aria-hidden="true">{post.title.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">{post.date}</span>
              <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{post.publication}</span>
            </div>
            <p className="font-bold text-base group-hover:text-primary transition-colors">{post.title}</p>
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
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);
  const [erroredImages, setErroredImages] = useState<Set<string>>(new Set());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileData, setProfileData] = useState<any>(() => {
    if (typeof document === "undefined") return null;
    const el = document.getElementById("profile-data") as HTMLScriptElement | null;
    if (el?.textContent) {
      try {
        return JSON.parse(el.textContent);
      } catch {
        return null;
      }
    }
    return null;
  });
  const markErrored = (key: string) => setErroredImages((prev) => new Set(prev).add(key));
  const prefersReducedMotion = useReducedMotion();
  const spring = useMemo(() => prefersReducedMotion ? { duration: 0 } : { ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }, [prefersReducedMotion]);

  useEffect(() => {
    if (profileData) return;
    fetch("/abhishek_profile.json").then(r => r.json()).then(setProfileData);
  }, [profileData]);

  useEffect(() => {
    if (!profileData) return;

    const name = profileData.profile.name;

    // Projects ItemList
    if (profileData.projects?.length) {
      let pos = 0;
      const items = profileData.projects.flatMap((cat: any) =>
        cat.items.map((item: any) => {
          pos++;
          return {
            "@type": "ListItem",
            position: pos,
            item: {
              "@type": "SoftwareApplication",
              name: item.name,
              url: item.url,
              applicationCategory: cat.category,
              author: { "@type": "Person", name },
            },
          };
        }),
      );
      injectStructuredData("projects", {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${name} Projects`,
        description: "Digital products and platforms built by Abhishek Adhikari",
        itemListElement: items,
      });
    }

    // Volunteering ItemList
    if (profileData.volunteering?.length) {
      injectStructuredData("volunteering", {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${name} Volunteering & Community Work`,
        description: "Community service, teaching, and leadership roles by Abhishek Adhikari",
        itemListElement: profileData.volunteering.map((v: any, i: number) => {
          const start = toIsoDate(v.date || v.startDate);
          const end = toIsoDate(v.endDate);
          return {
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "VolunteerAction",
              name: v.role,
              description: v.summary?.slice(0, 200) || "",
              agent: { "@type": "Person", name },
              participant: v.organization,
              ...(start ? { startDate: start } : {}),
              ...(end ? { endDate: end } : {}),
            },
          };
        }),
      });
    }

    // Certifications ItemList
    if ((profileData as any).certifications?.length) {
      injectStructuredData("certifications", {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${name} Certifications`,
        description: "Professional certifications and credentials held by Abhishek Adhikari",
        itemListElement: (profileData as any).certifications.map((c: any, i: number) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "EducationalOccupationalCredential",
            name: c.title,
            description: `${c.issuer} — ${c.platform || ""}`.trim(),
            url: c.url || "",
            author: { "@type": "Organization", name: c.issuer },
            dateCreated: c.date,
          },
        })),
      });
    }

    // NewsMedia ItemList
    if ((profileData as any).newsMedia?.length) {
      injectStructuredData("news", {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${name} News & Media Coverage`,
        description: "News articles, media coverage, and public recognition featuring Abhishek Adhikari",
        itemListElement: (profileData as any).newsMedia.map((n: any, i: number) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "NewsArticle",
            headline: n.title,
            description: n.description?.slice(0, 200) || "",
            author: { "@type": "Person", name },
            publisher: n.source,
            datePublished: n.date,
          },
        })),
      });
    }

    // Recommendations ItemList
    if (profileData.recommendations?.length) {
      injectStructuredData("recommendations", {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${name} Recommendations`,
        description: "LinkedIn recommendations from industry professionals and community leaders",
        itemListElement: profileData.recommendations.map((r: any, i: number) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Person",
            name: r.name,
            jobTitle: r.title,
            description: r.excerpt?.slice(0, 200) || "",
          },
        })),
      });
    }

    // Skills ItemList
    if (profileData.skills?.length) {
      let skillPos = 0;
      const skillItems = profileData.skills.flatMap((cat: any) =>
        cat.items.map((s: any) => {
          skillPos++;
          return {
            "@type": "ListItem",
            position: skillPos,
            item: {
              "@type": "DefinedTerm",
              name: s.name,
              inDefinedTermSet: cat.category,
            },
          };
        }),
      );
      if (skillItems.length) {
        injectStructuredData("skills", {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${name} Skills`,
          description: "Professional skills across agritech, digital marketing, design, and community building",
          itemListElement: skillItems,
        });
      }
    }

    // LocalBusiness (for personal brand / consulting)
    const profile = profileData.profile;
    if (profile.address) {
      const imageUrl = profile.image
        ? `https://abhishekadhikari.com${profile.image.startsWith("/") ? profile.image : "/" + profile.image}`
        : "https://abhishekadhikari.com/abhishek-adhikari-social.webp";
      injectStructuredData("localbusiness", {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://abhishekadhikari.com/#localbusiness",
        name: "Abhishek Adhikari — AI Trainer in Nepal Consulting",
        url: profile.website,
        email: profile.email,
        image: imageUrl,
        description: profile.description || "AI Trainer in Nepal offering prompt engineering workshops, AI literacy training, agritech consulting, and SEO digital growth services from Hetauda, Nepal.",
        knowsLanguage: profile.knowsLanguage || ["English", "Nepali", "Hindi"],
        address: {
          "@type": "PostalAddress",
          addressLocality: profile.address.locality,
          addressRegion: profile.address.region,
          addressCountry: profile.address.countryCode,
          postalCode: profile.address.postalCode,
        },
        geo: profile.geo ? {
          "@type": "GeoCoordinates",
          latitude: profile.geo.latitude,
          longitude: profile.geo.longitude,
        } : undefined,
        areaServed: [
          { "@type": "City", name: "Hetauda" },
          { "@type": "Country", name: "NP" },
        ],
      });

      // Event schemas for volunteering items that have dates
      if (profileData.volunteering?.length) {
        const eventImage = profile.image
          ? `https://abhishekadhikari.com${profile.image.startsWith("/") ? profile.image : "/" + profile.image}`
          : "https://abhishekadhikari.com/abhishek-adhikari-social.webp";
        const events = profileData.volunteering
          .filter((v: any) => toIsoDate(v.date || v.startDate || v.endDate))
          .slice(0, 10)
          .map((v: any, i: number) => {
            const start = toIsoDate(v.date || v.startDate);
            const end = toIsoDate(v.endDate);
            return {
              "@type": "ListItem",
              position: i + 1,
              item: {
                "@type": "Event",
                name: v.role,
                description: v.summary?.slice(0, 200) || "",
                url: profile.website,
                image: v.images?.[0]?.imageUrl ? `https://abhishekadhikari.com${v.images[0].imageUrl.startsWith("/") ? v.images[0].imageUrl : "/" + v.images[0].imageUrl}` : eventImage,
                organizer: {
                  "@type": "Organization",
                  name: v.organization,
                  url: "https://abhishekadhikari.com/volunteering",
                },
                performer: { "@type": "Person", name },
                eventStatus: "https://schema.org/EventCompleted",
                location: {
                  "@type": "Place",
                  name: profile.address.locality,
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: profile.address.locality,
                    addressRegion: profile.address.region,
                    addressCountry: profile.address.countryCode,
                  },
                },
                ...(start ? { startDate: start } : {}),
                ...(end ? { endDate: end } : {}),
                offers: {
                  "@type": "Offer",
                  url: profile.website,
                  price: "0",
                  priceCurrency: "NPR",
                  availability: "https://schema.org/EventScheduled",
                },
              },
            };
          });
        if (events.length) {
          injectStructuredData("events", {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `${name} Events & Community Work`,
            description: "Community events, workshops, and speaking engagements organized by Abhishek Adhikari",
            itemListElement: events,
          });
        }
      }
    }
  }, [profileData]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShowTop(window.scrollY > 400);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSending(true);
    try {
      const response = await fetch("https://formspree.io/f/xrebreqr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (!response.ok) throw new Error(`Form submission failed (${response.status})`);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    } catch {
      setSubmitError("Something went wrong with your message. Please email abhishekadhikari1254@gmail.com directly.");
    } finally {
      setSending(false);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((current) => ({ ...current, [section]: !current[section] }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setExpandedSections({ experience: true, projects: true, volunteering: true, certifications: true, news: true, media: true, recommendations: true, "ai-training": true });
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sectionMeta: Record<string, { title: string; description: string }> = {
      about: {
        title: "About – Abhishek Adhikari | AI Trainer in Nepal",
        description: "AI trainer, prompt engineering specialist, and agritech entrepreneur from Hetauda, Nepal. 1,500+ students trained, WordCamp speaker, Global Top 10 AI skills contributor.",
      },
      "ai-training": {
        title: "AI Training – Abhishek Adhikari | AI Trainer in Nepal",
        description: "AI training workshops and prompt engineering sessions by an AI Trainer in Nepal. 1,500+ students trained on ChatGPT, Claude, Gemini, and AI literacy across schools, colleges, and community events.",
      },
      experience: {
        title: "Experience – Abhishek Adhikari | AI Trainer in Nepal",
        description: "Professional experience of an AI Trainer in Nepal — Co-Founder of DEV Community Nepal, Founder of Himalaya Krishi & Hashtag Web Solutions, Product Designer at Sajilo Patro.",
      },
      projects: {
        title: "Projects – Abhishek Adhikari | AI Trainer in Nepal",
        description: "Digital products built by an AI Trainer in Nepal — Krishi Himalaya, 100SEOTools, Redesign Profile, JNB Coffee, Murraa, Hetaudacity across agritech, SEO, and branding.",
      },
      volunteering: {
        title: "Volunteering – Abhishek Adhikari | AI Trainer in Nepal",
        description: "Community leadership by an AI Trainer in Nepal — Co-organizer of AWS Cloud Technology Conference 2026, Panelist at Hult Prize, Mentor at Code for Change, Arduino Instructor, and Prompt Engineering Facilitator.",
      },
      certifications: {
        title: "Certifications – Abhishek Adhikari | AI Trainer in Nepal",
        description: "Professional certifications earned by an AI Trainer in Nepal — Google UX Design, Google Digital Garage, CalArts Graphic Design, IoT enCypher, and community builder awards.",
      },
      news: {
        title: "News & Media – Abhishek Adhikari | AI Trainer in Nepal",
        description: "News coverage of an AI Trainer in Nepal — ICT Frame global top-10 coverage, HRIC STEAM Program leadership, Hult Prize panel, AWS Cloud Technology Conference co-organization, and Krishi Pradarshani speaking.",
      },
      media: {
        title: "Interviews & Features – Abhishek Adhikari | AI Trainer in Nepal",
        description: "Interviews, feature stories, and public speaking appearances by an AI Trainer in Nepal on agritech, AI, open source, and digital innovation.",
      },
      blog: {
        title: "Blog – Abhishek Adhikari | AI Trainer in Nepal",
        description: "Articles by an AI Trainer in Nepal on UI/UX design trends, agritech in Nepal, React best practices, content strategy, user research methods, and no-code development.",
      },
      recommendations: {
        title: "Recommendations – Abhishek Adhikari | AI Trainer in Nepal",
        description: "LinkedIn recommendations from industry professionals endorsing an AI Trainer in Nepal — Tanka Bhattarai, Lava Kafle, and other industry professionals.",
      },
      contact: {
        title: "Contact – Abhishek Adhikari | AI Trainer in Nepal",
        description: "Book an AI training workshop, discuss prompt engineering, or collaborate on agritech. Contact Abhishek Adhikari via email, LinkedIn, or the contact form.",
      },
    };

    function applyMeta(hash: string) {
      const meta = sectionMeta[hash];
      if (!meta) return;
      document.title = meta.title;
      const desc = document.querySelector("meta[name='description']");
      if (desc) desc.setAttribute("content", meta.description);
      const ogTitle = document.querySelector("meta[property='og:title']");
      if (ogTitle) ogTitle.setAttribute("content", meta.title);
      const ogDesc = document.querySelector("meta[property='og:description']");
      if (ogDesc) ogDesc.setAttribute("content", meta.description);
      const twitterTitle = document.querySelector("meta[name='twitter:title']");
      if (twitterTitle) twitterTitle.setAttribute("content", meta.title);
      const twitterDesc = document.querySelector("meta[name='twitter:description']");
      if (twitterDesc) twitterDesc.setAttribute("content", meta.description);
    }

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        applyMeta(hash);
      }
    };

    const hash = window.location.hash.substring(1);
    if (hash) {
      applyMeta(hash);
    } else {
      const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
      if (currentPath !== "/") {
        const pathKey = currentPath.replace(/^\//, "");
        const sectionKey = pathKey === "work" ? "projects" : pathKey;
        if (sectionMeta[sectionKey]) applyMeta(sectionKey);
      }
    }
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) return;
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    const pageTitles: Record<string, string> = {
      "/": "AI Trainer in Nepal | Abhishek Adhikari – Prompt Engineering, AI Literacy &amp; Digital Training",
      "/about": "About – Abhishek Adhikari | AI Trainer in Nepal",
      "/ai-training": "AI Training – Abhishek Adhikari | AI Trainer in Nepal",
      "/experience": "Experience – Abhishek Adhikari | AI Trainer in Nepal",
      "/work": "Projects – Abhishek Adhikari | AI Trainer in Nepal",
      "/volunteering": "Volunteering – Abhishek Adhikari | AI Trainer in Nepal",
      "/certifications": "Certifications – Abhishek Adhikari | AI Trainer in Nepal",
      "/news": "News &amp; Media – Abhishek Adhikari | AI Trainer in Nepal",
      "/media": "Interviews &amp; Features – Abhishek Adhikari | AI Trainer in Nepal",
      "/recommendations": "Recommendations – Abhishek Adhikari | AI Trainer in Nepal",
      "/blog": "Blog – Abhishek Adhikari | AI Trainer in Nepal",
      "/contact": "Contact – Abhishek Adhikari | AI Trainer in Nepal",
    };
    document.title = pageTitles[path] || pageTitles["/"];
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    const canonicalUrl = `https://abhishekadhikari.com${path === "/" ? "" : path}`;
    if (link) {
      link.href = canonicalUrl;
    } else {
      link = document.createElement("link");
      link.rel = "canonical";
      link.href = canonicalUrl;
      document.head.appendChild(link);
    }
    const pathToSection: Record<string, string> = {
      "/about": "about",
      "/ai-training": "ai-training",
      "/experience": "experience",
      "/work": "projects",
      "/volunteering": "volunteering",
      "/certifications": "certifications",
      "/news": "news",
      "/media": "media",
      "/recommendations": "recommendations",
      "/blog": "blog",
      "/contact": "contact",
    };
    const sectionId = pathToSection[path];
    if (sectionId) {
      requestAnimationFrame(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  const visibleItems = <T,>(section: keyof typeof sectionLimits, items: T[]) =>
    expandedSections[section] ? items : items.slice(0, sectionLimits[section]);

  if (!profileData) return (
    <ErrorBoundary section="Loading">
    <div className="min-h-screen flex items-center justify-center" role="status" aria-label="Loading">
      <span className="inline-block w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
    </div>
    </ErrorBoundary>
  );

  const projects = profileData.projects.flatMap((cat: any) =>
    cat.items.map((item: any) => ({ ...item, category: cat.category })),
  );
  const experiences = visibleItems("experience", profileData.experience);
  const visibleProjects = visibleItems("projects", projects);
  const volunteering = visibleItems("volunteering", profileData.volunteering);
  const certifications = visibleItems("certifications", (profileData as any).certifications ?? []);
  const newsMedia = visibleItems("news", (profileData as any).newsMedia ?? []);
  const mediaAppearances = (profileData as any).mediaAppearances ?? [];
  const recommendations = visibleItems("recommendations", profileData?.recommendations ?? []);

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
      <ErrorBoundary section="Navbar">
      <header className="fixed top-0 w-full z-nav bg-background/80 backdrop-blur-md border-b">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href={profileData.profile.website} aria-label="Home" className="font-bold text-lg tracking-tight" rel="author">AA.</a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 active:scale-90"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="hidden md:flex items-center gap-1 text-sm font-medium">
            {["about", "ai-training", "experience", "projects", "certifications", "news", "media", "blog", "contact"].map((section) => {
              const label = section === "ai-training" ? "AI Training" : section.charAt(0).toUpperCase() + section.slice(1);
              const routePath = section === "projects" ? "/work" : `/${section}`;
              return (
              <a
                key={section}
                href={routePath}
                className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
              >
                {label}
              </a>
              );
            })}
            <span className="mx-1 w-px h-5 bg-border" />
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200 active:scale-90"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </nav>
        {mobileOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-md">
          <nav className="max-w-6xl mx-auto px-6 py-4 space-y-1">
            {["about", "ai-training", "experience", "projects", "certifications", "news", "media", "blog", "contact"].map((section) => {
              const label = section === "ai-training" ? "AI Training" : section.charAt(0).toUpperCase() + section.slice(1);
              const routePath = section === "projects" ? "/work" : `/${section}`;
              return (
                <a
                  key={section}
                  href={routePath}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
                >
                  {label}
                </a>
              );
            })}
            <button
              onClick={() => setIsDark(!isDark)}
              className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </button>
          </nav>
        </div>
        )}
      </header>
      </ErrorBoundary>

      {/* Main Content */}
      <main id="main-content" className="max-w-5xl mx-auto px-6 pt-28 pb-24 space-y-16 md:space-y-24 overflow-x-hidden">
        
        {/* Hero */}
        <ErrorBoundary section="Hero">
        <section id="hero" className="space-y-6 pt-8 relative">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none hidden sm:block" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-decorative-3/10 rounded-full blur-3xl pointer-events-none hidden sm:block" aria-hidden="true" />
          <div className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] text-primary">
                {profileData.profile.name}, AI Trainer in Nepal
              </h1>
              <p className="mt-5 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                AI Trainer in Nepal and prompt engineering specialist. I help people and businesses use AI tools effectively, from ChatGPT to Claude to Gemini, without needing a technical background.
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
                1,500+ students trained on AI literacy and prompt engineering. WordCamp Kathmandu 2026 speaker. Also founded Himalaya Krishi (220+ livestock) and co-founded DEV Community Nepal (100+ events) from Hetauda, Nepal.
              </p>
            </div>

            <div className="shrink-0">
              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-2 border-border shadow-xl bg-muted">
                <ImageWithSkeleton
                  src="/abhishek-adhikari-ai-trainer-nepal-hero-tiny.jpg"
                  srcSet="/abhishek-adhikari-ai-trainer-nepal-hero-416.jpg 416w, /abhishek-adhikari-ai-trainer-nepal-hero-tiny.jpg 520w"
                  sizes="(min-width: 768px) 208px, 160px"
                  alt="Abhishek Adhikari — AI Trainer in Nepal. Portrait of the prompt engineering specialist and AI literacy educator from Hetauda, Nepal, trained 1,500+ students."
                  width={208}
                  height={208}
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                  wrapperClassName="w-full h-full"
                />
              </div>
            </div>

          </div>
          
          <div className="flex gap-4 pt-4">
            <a href="#contact" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:scale-[0.97] transition-all duration-200 shadow-sm">
              <Mail size={18} /> Contact Now
            </a>
            <a href={profileData.profile.linkedin} target="_blank" rel="me noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 active:scale-[0.97] transition-all duration-200 shadow-sm">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href={profileData.profile.github} target="_blank" rel="me noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 active:scale-[0.97] transition-all duration-200 shadow-sm">
              <Github size={18} /> GitHub
            </a>
          </div>
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
            ["1,500+", "Students trained"],
            ["220+", "Livestock capacity"],
            ["100+", "Community events"],
            ["14", "AI skills contributed"],
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
            <span className="bg-background px-4 text-xs text-muted-foreground uppercase tracking-widest font-medium">What I do</span>
          </div>
        </div>

        {/* Social Proof Gallery */}
        <SocialProofGallery
          items={[
            { src: "/sections/volunteering/images/abhishek-adhikari--ai-digital-literacy-workshop.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Ai Digital Literacy Workshop", caption: "Ai Digital Literacy Workshop" },
            { src: "/sections/volunteering/images/abhishek-adhikari--ai-for-hr.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Ai For Hr", caption: "Ai For Hr" },
            { src: "/sections/volunteering/images/abhishek-adhikari--ai-training-j-and-b.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Ai Training J And B", caption: "Ai Training J And B" },
            { src: "/sections/volunteering/images/abhishek-adhikari--arduino-robotics-workshop-trainer.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Arduino Robotics Workshop Trainer", caption: "Arduino Robotics Workshop Trainer" },
            { src: "/sections/volunteering/images/abhishek-adhikari--aws-cloud-innovation-day-hetauda-2026.webp", alt: "Abhishek Adhikari AI Trainer in Nepal — Aws Cloud Innovation Day Hetauda 2026", caption: "Aws Cloud Innovation Day Hetauda 2026" },
            { src: "/sections/volunteering/images/abhishek-adhikari--aws-training-nepal.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Aws Training Nepal", caption: "Aws Training Nepal" },
            { src: "/sections/volunteering/images/abhishek-adhikari--bagmati-municipality.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Bagmati Municipality", caption: "Bagmati Municipality" },
            { src: "/sections/volunteering/images/abhishek-adhikari--bagmati-rural-municipality-can-federation-ai-training-teachers.webp", alt: "Abhishek Adhikari AI Trainer in Nepal — Bagmati Rural Municipality Can Federation Ai Training Teachers", caption: "Bagmati Rural Municipality Can Federation Ai Training Teachers" },
            { src: "/sections/volunteering/images/abhishek-adhikari--capacity-development-ivp-letter.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Capacity Development Ivp Letter", caption: "Capacity Development Ivp Letter" },
            { src: "/sections/volunteering/images/abhishek-adhikari--code-for-change-chitwan-figma-workshop.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Code For Change Chitwan Figma Workshop", caption: "Code For Change Chitwan Figma Workshop" },
            { src: "/sections/volunteering/images/abhishek-adhikari--code-for-change-dang-token-of-love.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Code For Change Dang Token Of Love", caption: "Code For Change Dang Token Of Love" },
            { src: "/sections/volunteering/images/abhishek-adhikari--code-for-change-open-to-open-source-ai-workflows.webp", alt: "Abhishek Adhikari AI Trainer in Nepal — Code For Change Open To Open Source Ai Workflows", caption: "Code For Change Open To Open Source Ai Workflows" },
            { src: "/sections/volunteering/images/abhishek-adhikari--coding-olympics-certificate.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Coding Olympics Certificate", caption: "Coding Olympics Certificate" },
            { src: "/sections/volunteering/images/abhishek-adhikari--community-highlight-1.jpg", alt: "Abhishek Adhikari AI Trainer in Nepal — Community Highlight 1", caption: "Community Highlight 1" },
            { src: "/sections/volunteering/images/abhishek-adhikari--dev-community-chitwan-tech-meetup.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Dev Community Chitwan Tech Meetup", caption: "Dev Community Chitwan Tech Meetup" },
            { src: "/sections/volunteering/images/abhishek-adhikari--dev-community-hetauda-tech-meetup.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Dev Community Hetauda Tech Meetup", caption: "Dev Community Hetauda Tech Meetup" },
            { src: "/sections/volunteering/images/abhishek-adhikari--dev-community-nepal-open-to-open-source-secure-developer-conference.webp", alt: "Abhishek Adhikari AI Trainer in Nepal — Dev Community Nepal Open To Open Source Secure Developer Conference", caption: "Dev Community Nepal Open To Open Source Secure Developer Conference" },
            { src: "/sections/volunteering/images/abhishek-adhikari--dev-community-project-100-bagamati.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Dev Community Project 100 Bagamati", caption: "Dev Community Project 100 Bagamati" },
            { src: "/sections/volunteering/images/abhishek-adhikari--dev-community-tech-disrupters-certificate.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Dev Community Tech Disrupters Certificate", caption: "Dev Community Tech Disrupters Certificate" },
            { src: "/sections/volunteering/images/abhishek-adhikari--devcommunity-chitwan-meetup.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Devcommunity Chitwan Meetup", caption: "Devcommunity Chitwan Meetup" },
            { src: "/sections/volunteering/images/abhishek-adhikari--devcommunity-hetauda-meetup.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Devcommunity Hetauda Meetup", caption: "Devcommunity Hetauda Meetup" },
            { src: "/sections/volunteering/images/abhishek-adhikari--figma-crash-course.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Figma Crash Course", caption: "Figma Crash Course" },
            { src: "/sections/volunteering/images/abhishek-adhikari--flutter-yoda-mentor.webp", alt: "Abhishek Adhikari AI Trainer in Nepal — Flutter Yoda Mentor", caption: "Flutter Yoda Mentor" },
            { src: "/sections/volunteering/images/abhishek-adhikari--hcdpn-ai-prompt-hr-professionals.webp", alt: "Abhishek Adhikari AI Trainer in Nepal — Hcdpn Ai Prompt Hr Professionals", caption: "Hcdpn Ai Prompt Hr Professionals" },
            { src: "/sections/volunteering/images/abhishek-adhikari--hsms-himalaya-krishi.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Hsms Himalaya Krishi", caption: "Hsms Himalaya Krishi" },
            { src: "/sections/volunteering/images/abhishek-adhikari--hsmss-10-days-ux-bootcamp.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Hsmss 10 Days Ux Bootcamp", caption: "Hsmss 10 Days Ux Bootcamp" },
            { src: "/sections/volunteering/images/abhishek-adhikari--hult-prize-iof-panelist.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Hult Prize Iof Panelist", caption: "Hult Prize Iof Panelist" },
            { src: "/sections/volunteering/images/abhishek-adhikari--nirmal-secondary-school-ict-ai-digital-literacy-training.webp", alt: "Abhishek Adhikari AI Trainer in Nepal — Nirmal Secondary School Ict Ai Digital Literacy Training", caption: "Nirmal Secondary School Ict Ai Digital Literacy Training" },
            { src: "/sections/volunteering/images/abhishek-adhikari--open-to-open-source-2.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Open To Open Source 2", caption: "Open To Open Source 2" },
            { src: "/sections/volunteering/images/abhishek-adhikari--open-to-open-source-extra.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Open To Open Source Extra", caption: "Open To Open Source Extra" },
            { src: "/sections/volunteering/images/abhishek-adhikari--open-to-open-source-prompt-engineering.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Open To Open Source Prompt Engineering", caption: "Open To Open Source Prompt Engineering" },
            { src: "/sections/volunteering/images/abhishek-adhikari--open-to-open-source.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Open To Open Source", caption: "Open To Open Source" },
            { src: "/sections/volunteering/images/abhishek-adhikari--prompt-engineering-jb-coffee.jpg", alt: "Abhishek Adhikari AI Trainer in Nepal — Prompt Engineering Jb Coffee", caption: "Prompt Engineering Jb Coffee" },
            { src: "/sections/volunteering/images/abhishek-adhikari--session-highlight-generic.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Session Highlight Generic", caption: "Session Highlight Generic" },
            { src: "/sections/volunteering/images/abhishek-adhikari--sharing-mentorship-figma-crash-course.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Sharing Mentorship Figma Crash Course", caption: "Sharing Mentorship Figma Crash Course" },
            { src: "/sections/volunteering/images/abhishek-adhikari--ui-ux-training.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Ui Ux Training", caption: "Ui Ux Training" },
            { src: "/sections/media/images/abhishek-adhikari--ai-robotics-conference.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Ai Robotics Conference", caption: "Ai Robotics Conference" },
            { src: "/sections/media/images/abhishek-adhikari--event-at-aayorides.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Event At Aayorides", caption: "Event At Aayorides" },
            { src: "/sections/media/images/abhishek-adhikari--hetauda-sdc-event.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Hetauda Sdc Event", caption: "Hetauda Sdc Event" },
            { src: "/sections/media/images/abhishek-adhikari--itrocks-ai-interview-thumbnail.png", alt: "Abhishek Adhikari AI Trainer in Nepal — Itrocks Ai Interview Thumbnail", caption: "Itrocks Ai Interview Thumbnail" },
            { src: "/sections/media/images/abhishek-adhikari--secure-developer-conference-2026-speakers.jpg", alt: "Abhishek Adhikari AI Trainer in Nepal — Secure Developer Conference 2026 Speakers", caption: "Secure Developer Conference 2026 Speakers" },
            { src: "/sections/media/images/abhishek-adhikari--secure-developer-conference.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Secure Developer Conference", caption: "Secure Developer Conference" },
            { src: "/sections/media/images/abhishek-adhikari--wordcamp-2024.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Wordcamp 2024", caption: "Wordcamp 2024" },
            { src: "/sections/media/images/abhishek-adhikari--wordcamp-2026.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Wordcamp 2026", caption: "Wordcamp 2026" },
            { src: "/sections/media/images/abhishek-adhikari--wordcamp-kathmandu-2026-speaker.jpg", alt: "Abhishek Adhikari AI Trainer in Nepal — Wordcamp Kathmandu 2026 Speaker", caption: "Wordcamp Kathmandu 2026 Speaker" },
            { src: "/sections/media/images/abhishek-adhikari--wordcamp-kathmandu-speaker.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Wordcamp Kathmandu Speaker", caption: "Wordcamp Kathmandu Speaker" },
            { src: "/sections/news/images/abhishek-adhikari--github-repo-contributor.png", alt: "Abhishek Adhikari AI Trainer in Nepal — Github Repo Contributor", caption: "Github Repo Contributor" },
            { src: "/sections/news/images/abhishek-adhikari--hric-steam-program-2025-hetauda.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Hric Steam Program 2025 Hetauda", caption: "Hric Steam Program 2025 Hetauda" },
            { src: "/sections/news/images/abhishek-adhikari--hult-prize-iof-panelist.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Hult Prize Iof Panelist", caption: "Hult Prize Iof Panelist" },
            { src: "/sections/news/images/abhishek-adhikari--ict-frame-featured.jpg", alt: "Abhishek Adhikari AI Trainer in Nepal — Ict Frame Featured", caption: "Ict Frame Featured" },
            { src: "/sections/news/images/abhishek-adhikari--krishi-pradarshani-2083-speaker.jpeg", alt: "Abhishek Adhikari AI Trainer in Nepal — Krishi Pradarshani 2083 Speaker", caption: "Krishi Pradarshani 2083 Speaker" },
            { src: "/sections/news/images/abhishek-adhikari--top-10-contributor-prompt-engineering-roadmap.jpg", alt: "Abhishek Adhikari AI Trainer in Nepal — Top 10 Contributor Prompt Engineering Roadmap", caption: "Top 10 Contributor Prompt Engineering Roadmap" },
            { src: "/sections/social-proof/images/abhishek-adhikari--ai-training-barista.jpg", alt: "Abhishek Adhikari AI Trainer in Nepal — AI Training to Barista", caption: "AI Training to Barista" },
            { src: "/sections/social-proof/images/abhishek-adhikari--ai-training-teacher-1.jpg", alt: "Abhishek Adhikari AI Trainer in Nepal — AI Training to Teacher", caption: "AI Training to Teacher" },
            { src: "/sections/social-proof/images/abhishek-adhikari--open-to-open-source-mentor.webp", alt: "Abhishek Adhikari AI Trainer in Nepal — Open to Open Source Mentor Announcement", caption: "Open to Open Source — Mentor" },
            { src: "/sections/social-proof/images/abhishek-adhikari--hacktoberfest-pulchowk-judge.jpg", alt: "Abhishek Adhikari AI Trainer in Nepal — Hacktoberfest Pulchowk Panel Judge", caption: "Hacktoberfest Pulchowk — Panel Judge" },
            { src: "/sections/social-proof/images/abhishek-adhikari--wordcamp-token-of-love.jpg", alt: "Abhishek Adhikari AI Trainer in Nepal — WordCamp Kathmandu Speaking", caption: "WordCamp Kathmandu Speaking" },
            { src: "/sections/social-proof/images/abhishek-adhikari--wordcamp-workshop.jpg", alt: "Abhishek Adhikari AI Trainer in Nepal — WordCamp Kathmandu Workshop", caption: "WordCamp Kathmandu Workshop" },
          ]}
        />

        {/* AI Training */}
        <ErrorBoundary section="AI Training">
        <section id="ai-training" aria-labelledby="ai-training-heading">
          <SectionHeader
            label="AI Training"
            headingId="ai-training-heading"
            title="AI training workshops and prompt engineering sessions in Nepal"
            summary="As an AI Trainer in Nepal, I deliver practical AI literacy training for students, teachers, and professionals with no technical background needed. 1,500+ participants trained across schools, colleges, coffee shops, and community events."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Prompt Engineering Workshop", org: "J&B Coffee Hetauda", desc: "Hands-on prompt engineering session for local business community — writing effective prompts for ChatGPT and Claude.", type: "workshop" },
              { title: "AI & Digital Literacy Workshop", org: "Nirmal Secondary School", desc: "Teacher training on AI tools, digital literacy, and integrating AI into classroom workflows.", type: "training" },
              { title: "AI in Education Workshop", org: "Nirmal Secondary School", desc: "6-hour practical session on using AI tools for lesson planning, content creation, and student engagement.", type: "workshop" },
              { title: "WordCamp Kathmandu 2026", org: "WordPress Community Nepal", desc: "Speaker — 'Prompt Smarter, Not Harder': practical prompt engineering strategies for content creators and developers.", type: "speaking" },
              { title: "AI Skills Contributor", org: "Agentic Awesome Skills", desc: "14 named AI skills contributed to a global open-source project (41k+ GitHub stars) — ranked global top 10 contributor.", type: "open-source" },
              { title: "10-Day UI/UX Training Bootcamp", org: "HSMSS Hetauda", desc: "UI/UX design training bootcamp covering Figma, wireframing, prototyping, and design thinking for students.", type: "training" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4, ...spring }}
                whileHover={{ y: -4, boxShadow: "0 12px 40px hsla(40,20%,10%,0.08)" }}
                className="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">{item.type}</span>
                </div>
                <p className="font-semibold text-base leading-tight">{item.title}</p>
                <div className="text-xs text-primary mt-1">{item.org}</div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 p-5 rounded-xl bg-muted/30 border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">1,500+ students and professionals trained</strong> across Nepal on prompt engineering, AI literacy, ChatGPT, Claude, Gemini, and practical AI tools. Available for school workshops, college sessions, corporate training, and community events. Based in Hetauda, Bagmati Province, Nepal.
            </p>
          </div>
        </section>
        </ErrorBoundary>

        {/* Experience */}
        <ErrorBoundary section="Experience">
        <section id="experience" aria-labelledby="experience-heading">
          <SectionHeader
            label="Experience"
            headingId="experience-heading"
            title="Where I have worked"
            summary="Professional experience across agritech, tech communities, design, and consulting, from an AI Trainer in Nepal to community builder and entrepreneur."
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
                        <ImageWithSkeleton src={exp.logoUrl} alt={`${exp.organization} logo — ${exp.role} at ${exp.organization}, Abhishek Adhikari AI Trainer in Nepal work experience ${exp.startDate}–${exp.endDate}`} className="w-full h-full object-cover rounded-xl" wrapperClassName="w-full h-full" onError={() => markErrored(`exp-logo-${i}`)} />
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
                            <ImageWithSkeleton src={exp.logoUrl} alt={`${exp.organization} logo — ${exp.role} at ${exp.organization}, Abhishek Adhikari AI Trainer in Nepal work experience ${exp.startDate}–${exp.endDate}`} className="w-full h-full object-cover rounded-xl" wrapperClassName="w-full h-full" onError={() => markErrored(`exp-logo-${i}`)} />
                          ) : (
                            orgInitials || exp.organization.slice(0, 2).toUpperCase()
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                            <p className="text-base font-semibold leading-tight">{exp.role}</p>
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
        <section id="projects" aria-labelledby="projects-heading">
          <SectionHeader
            label="Projects"
            headingId="projects-heading"
            title="What I have built"
            summary="Digital products built by an AI Trainer in Nepal across agriculture, SEO, coffee, and business sectors."
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
                        alt={`${item.name} — ${item.category} website project by Abhishek Adhikari AI Trainer in Nepal`}
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
                    <p className="font-semibold text-base text-foreground leading-tight">{item.name}</p>
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
<section id="volunteering" aria-labelledby="volunteering-heading">
          <SectionHeader
            label="Volunteering & Workshops"
            headingId="volunteering-heading"
            title="Community and teaching moments"
            summary="Community leadership and volunteer work by an AI Trainer in Nepal, events, certificates, and facilitation across Hetauda and beyond."
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
                           alt={img.caption ? `${img.caption} — ${vol.role} at ${vol.organization}, Abhishek Adhikari AI Trainer in Nepal volunteering (${vol.date || vol.startDate})` : `${vol.role} at ${vol.organization} — volunteer work by Abhishek Adhikari AI Trainer in Nepal`}
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
                    <p className="font-bold text-base leading-tight">{vol.role}</p>
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
        <section id="certifications" aria-labelledby="certifications-heading">
          <SectionHeader
            label="Certificates"
            headingId="certifications-heading"
            title="Certifications I hold"
            summary="Professional certifications earned by an AI Trainer in Nepal: Google UX, digital marketing, IoT, and community leadership credentials."
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
                           alt={`${cert.title} — ${cert.issuer} professional certification credential, Abhishek Adhikari AI Trainer in Nepal earned ${cert.date}`}
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
                      <p className="font-bold text-sm leading-snug text-foreground line-clamp-2">{cert.title}</p>

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
                            aria-label={`Verify ${cert.title} credential`}
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

        {/* News & Media */}
        <ErrorBoundary section="News">
<section id="news" aria-labelledby="news-heading">
           <SectionHeader
             label="Recognition & Media"
             headingId="news-heading"
             title="News, public proof, and media appearances"
             summary="Recognition, news coverage, interviews, and features documenting the work of an AI Trainer in Nepal across ICT Frame, HRIC, Hult Prize, AWS, agritech, AI, and open source."
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
                         <ImageWithSkeleton src={item.imageUrl} alt={`${item.title} — ${item.source} news coverage featuring Abhishek Adhikari AI Trainer in Nepal ${item.date}`} loading="lazy" decoding="async" className="w-full h-full object-cover" wrapperClassName="w-full h-full" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[item.type] ?? typeColors.press}`}>
                          {typeLabel[item.type] ?? item.type}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">{item.date}</span>
                      </div>
                      <p className="font-bold text-sm leading-snug">{item.title}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{item.description}</p>
                      <div className="text-xs text-primary/70 font-medium">{item.source}</div>
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer"
                          aria-label={`View ${item.title} coverage on ${item.source}`}
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

        {mediaAppearances.length > 0 ? (
        <>
            <div id="media" className="my-8 flex items-center gap-3 scroll-mt-28">
              <span className="text-lg font-bold">Media appearances</span>
              <span className="text-sm text-muted-foreground">— Interviews and features</span>
              <div className="h-px flex-1 bg-border" aria-hidden="true" />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {mediaAppearances.map((item: any, i: number) => (
                <motion.article
                  key={item.url ?? `${item.title}-${i}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4, ...spring }}
                  whileHover={{ y: -4, boxShadow: "0 12px 40px hsla(40,20%,10%,0.08)" }}
                  className="rounded-xl bg-muted/30 border border-muted flex flex-col overflow-hidden"
                >
                  {item.imageUrl && (
                    <div className="w-full h-36 bg-muted cursor-pointer"
                      onClick={() => setPreview({ src: item.imageUrl, alt: item.title })}>
                      <ImageWithSkeleton src={item.imageUrl} alt={`${item.title} — ${item.outlet} media feature with Abhishek Adhikari AI trainer Nepal ${item.date}`} loading="lazy" decoding="async" className="w-full h-full object-cover" wrapperClassName="w-full h-full" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-primary/15 text-primary dark:bg-primary/20">
                      {item.type}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">{item.date}</span>
                  </div>
                  <p className="font-bold text-base leading-snug">{item.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.description}</p>
                  <div className="text-xs text-primary/70 font-medium">{item.outlet}</div>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1 w-fit">
                      <ExternalLink size={12} /> Open source
                    </a>
                  )}
                  </div>
                </motion.article>
              ))}
            </div>
        </>
        ) : (
          <EmptyState message="Media appearances will be added soon." />
        )}
        </section>
        </ErrorBoundary>

        {/* Blog */}
        <ErrorBoundary section="Blog">
        <section id="blog" aria-labelledby="blog-heading">
          <SectionHeader headingId="blog-heading" label="Blog" title="What I write on Medium" summary="Articles by an AI Trainer in Nepal on design trends, agritech, React performance, content strategy, and no-code development." />
          <BlogPosts spring={spring} prefersReducedMotion={prefersReducedMotion} />
        </section>
        </ErrorBoundary>

        {/* Recommendations */}
        <ErrorBoundary section="Recommendations">
        <section id="recommendations" aria-labelledby="recommendations-heading">
          <SectionHeader
            label="Recommendations"
            headingId="recommendations-heading"
            title="What people say"
            summary="LinkedIn recommendations from industry professionals endorsing an AI Trainer in Nepal for community building, leadership, and technical expertise."
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
                         <ImageWithSkeleton src={rec.imageUrl} alt={`${rec.name}, ${rec.title} — LinkedIn recommendation for Abhishek Adhikari AI Trainer in Nepal`} loading="lazy" decoding="async" className="h-full w-full rounded-full object-cover" wrapperClassName="h-full w-full" onError={() => markErrored(`rec-avatar-${i}`)} />
                      ) : (
                        initials
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm">{rec.name}</p>
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
        <section id="contact" aria-labelledby="contact-heading">
          <SectionHeader
            label="Contact"
            headingId="contact-heading"
            title="Get in touch"
            summary="Book an AI training workshop in Nepal, discuss prompt engineering, or collaborate on agritech and community building."
          />
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <p className="text-lg text-foreground/80 leading-relaxed">
                Want to book an AI training workshop with an AI Trainer in Nepal, discuss prompt engineering, or collaborate on agritech? My inbox is open.
              </p>
              <div className="space-y-3 pt-2">
                {profileData.profile.address && (
                  <div className="flex items-start gap-3 text-sm text-muted-foreground">
                    <MapPin size={16} className="mt-0.5 shrink-0" />
                    <span>
                      {profileData.profile.address.locality}
                      {profileData.profile.address.region ? `, ${profileData.profile.address.region}` : ""}
                      , {profileData.profile.address.country}
                    </span>
                  </div>
                )}
                <a href={`mailto:${profileData.profile.email ?? "abhishekadhikari1254@gmail.com"}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail size={16} /> {profileData.profile.email ?? "abhishekadhikari1254@gmail.com"}
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
                    onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setSubmitError(""); }}
                    data-testid="input-name"
                    className="rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 transition focus:ring-primary/40"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email <span className="text-destructive">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setSubmitError(""); }}
                    data-testid="input-email"
                    className="rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 transition focus:ring-primary/40"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Message <span className="text-destructive">*</span></label>
                <textarea
                  required
                  rows={5}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setSubmitError(""); }}
                  data-testid="input-message"
                  className="rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 transition resize-none focus:ring-primary/40"
                />
              </div>
              {submitError && <p className="text-sm text-destructive" role="alert">{submitError}</p>}
              {sent && (
                <p className="text-sm font-medium" style={{ color: "oklch(0.52 0.16 152)" }} role="status">
                  Thank you. Your message has been sent. I will reply as soon as I can.
                </p>
              )}
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
      <ErrorBoundary section="ImagePreview">
      <ImagePreview
        src={preview?.src ?? ""}
        alt={preview?.alt ?? ""}
        open={preview !== null}
        onClose={() => setPreview(null)}
      />
      </ErrorBoundary>

      {/* Back to top */}
      <ErrorBoundary section="BackToTop">
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showTop ? 1 : 0, scale: showTop ? 1 : 0.8, pointerEvents: showTop ? "auto" : "none" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        data-testid="button-back-to-top"
        className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-50 w-10 md:w-11 h-10 md:h-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 active:scale-90 transition-all duration-200"
        aria-label="Back to top"
      >
        <ArrowUp size={18} />
      </motion.button>
      </ErrorBoundary>

      {/* Footer */}
      <ErrorBoundary section="Footer">
      <footer className="border-t bg-card py-12">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="font-bold text-lg mb-1">{profileData.profile.name}</div>
            <div className="text-sm text-muted-foreground">AI Trainer in Nepal, agritech entrepreneur and community builder.</div>
          </div>
          <div className="flex gap-4">
            <a href={profileData.profile.linkedin} aria-label="LinkedIn profile" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
            <a href={profileData.profile.github} aria-label="GitHub profile" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></a>
            <a href={profileData.profile.website} aria-label="Website" className="text-muted-foreground hover:text-primary transition-colors"><ExternalLink size={20} /></a>
          </div>
        </div>
      </footer>
      </ErrorBoundary>
    </div>
  );
}
