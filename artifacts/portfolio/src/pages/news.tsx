import { ExternalLink } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { PageHero, SectionHeading } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { useProfileData } from "@/lib/use-profile-data";
import { SITE_URL, breadcrumbSchema, personRef } from "@/lib/site";
import ImageWithSkeleton from "@/components/image-with-skeleton";

const TITLE = "News & Media | Abhishek Adhikari — AI Trainer in Nepal";
const DESCRIPTION =
  "News coverage and recognition of Abhishek Adhikari — ICT Frame open-source contribution recognition, HRIC STEAM Program leadership, Hult Prize panel, AWS Cloud Technology Conference co-organization, Krishi Pradarshani speaking, and Prompt Engineering roadmap contributor recognition.";

export default function NewsPage() {
  const data = useProfileData();
  const news = data?.newsMedia ?? [];
  const media = data?.mediaAppearances ?? [];

  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/news",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ItemList",
          "@id": `${SITE_URL}/news#list`,
          name: "News and media coverage of Abhishek Adhikari",
          description: DESCRIPTION,
          itemListElement: news.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "NewsArticle",
              headline: item.title,
              description: item.description,
              datePublished: item.date,
              url: item.url ?? undefined,
              author: personRef(),
              publisher: { "@type": "Organization", name: item.source },
            },
          })),
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "News & Media", path: "/news" },
        ]),
      ],
    },
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="News & Media"
        title="Recognition, coverage and media appearances"
        intro="Press mentions, event coverage and interviews documenting agritech, AI, open source and community work in Nepal."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="Coverage & recognition" title="In the news" />
        {news.length === 0 ? (
          <p className="text-muted-foreground">Loading coverage…</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {news.map((item) => (
              <article key={`${item.title}-${item.source}`} className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
                {item.imageUrl && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                    <ImageWithSkeleton
                      src={item.imageUrl}
                      alt={`${item.title} — coverage on ${item.source}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                      wrapperClassName="absolute inset-0"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {item.type.replace(/_/g, " ")}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <h2 className="text-lg font-bold leading-snug">{item.title}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  <span className="text-xs font-medium text-primary/80">{item.source}</span>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary hover:underline">
                      View coverage <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {media.length > 0 && (
        <section className="border-t bg-card/40">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <SectionHeading eyebrow="Interviews & features" title="Media appearances" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {media.map((item) => (
                <article key={item.url ?? item.title} className="flex flex-col overflow-hidden rounded-xl border bg-background shadow-sm">
                  {item.imageUrl && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                      <ImageWithSkeleton
                        src={item.imageUrl}
                        alt={`${item.title} — ${item.outlet}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                        wrapperClassName="absolute inset-0"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-xs font-semibold text-secondary">{item.type}</span>
                      <span className="font-mono text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <h2 className="text-base font-bold leading-snug">{item.title}</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                    <span className="text-xs font-medium text-primary/80">{item.outlet}</span>
                    {item.url && (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary hover:underline">
                        Watch <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
