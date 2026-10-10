import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { PageHero, SectionHeading } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { useProfileData } from "@/lib/use-profile-data";
import { SITE_URL, breadcrumbSchema, personRef } from "@/lib/site";

const TITLE = "Blog | Abhishek Adhikari — AI Trainer in Nepal";
const DESCRIPTION =
  "Articles by Abhishek Adhikari — design and UI writing published on TechSathi, plus AI training in Nepal and open-source contributions.";

const MEDIUM_FEED =
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@abhishekadhikari1254";

interface MediumPost {
  title: string;
  date: string;
  url: string;
  summary: string;
  tags: string[];
  coverImage: string | null;
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function BlogPage() {
  const data = useProfileData();
  const localPosts = data?.blog ?? [];
  const [medium, setMedium] = useState<MediumPost[] | null>(null);
  const [failed, setFailed] = useState(false);

  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/blog",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          url: `${SITE_URL}/blog`,
          name: "Abhishek Adhikari — Blog",
          description: DESCRIPTION,
          author: personRef(),
        },
        ...localPosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.summary,
          datePublished: post.date,
          url: post.url,
          author: personRef(),
          publisher: { "@type": "Organization", name: post.publication },
        })),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]),
      ],
    },
  });

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    fetch(MEDIUM_FEED, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((res) => {
        if (!active) return;
        if (res?.status === "ok") {
          setMedium(
            (res.items ?? []).map((item: { title: string; pubDate: string; link: string; description: string; categories?: string[]; thumbnail?: string }) => ({
              title: item.title,
              date: new Date(item.pubDate).toLocaleDateString("en-US", { year: "numeric", month: "short" }),
              url: item.link.replace(/\?source=rss.*/, ""),
              summary: stripHtml(item.description).slice(0, 200),
              tags: item.categories ?? [],
              coverImage: item.thumbnail || null,
            })),
          );
        } else {
          setFailed(true);
        }
      })
      .catch(() => {
        if (active) setFailed(true);
      })
      .finally(() => clearTimeout(timeout));
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Blog"
        title="Writing on design, agritech, AI and the web"
        intro="Long-form articles published on Medium and TechSathi, plus notes on building products in Nepal."
      />

      <section className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="Medium" title="Latest posts" copy="Fetched live from the Medium RSS feed." />
        {failed ? (
          <p className="text-muted-foreground">
            Unable to load the Medium feed right now. Read posts at{" "}
            <a className="font-semibold text-primary" href="https://medium.com/@abhishekadhikari1254" target="_blank" rel="noopener noreferrer">
              medium.com/@abhishekadhikari1254
            </a>
            .
          </p>
        ) : medium === null ? (
          <div className="flex items-center justify-center py-16">
            <span className="inline-block size-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : medium.length === 0 ? (
          <p className="text-muted-foreground">No posts found. Visit Medium for the latest writing.</p>
        ) : (
          <div className="space-y-4">
            {medium.map((post) => (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 rounded-xl border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/50 sm:flex-row"
              >
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={`${post.title} — article by Abhishek Adhikari`}
                    loading="lazy"
                    decoding="async"
                    width={144}
                    height={96}
                    className="h-40 w-full shrink-0 rounded-lg object-cover sm:h-24 sm:w-36"
                  />
                )}
                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-muted-foreground">{post.date}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">Medium</span>
                  </div>
                  <p className="font-bold group-hover:text-primary">{post.title}</p>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{post.summary}</p>
                </div>
                <ExternalLink size={16} className="hidden shrink-0 self-center text-muted-foreground sm:block" />
              </a>
            ))}
          </div>
        )}
      </section>

      {localPosts.length > 0 && (
        <section className="border-t bg-card/40">
          <div className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
            <SectionHeading eyebrow="Published" title="Selected articles" />
            <div className="space-y-4">
              {localPosts.map((post) => (
                <a
                  key={post.title}
                  href={post.url}
                  target={post.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group block rounded-xl border bg-background p-5 transition hover:border-primary/50"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-mono text-muted-foreground">{post.date}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground">{post.publication}</span>
                  </div>
                  <p className="mt-2 font-bold group-hover:text-primary">{post.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
