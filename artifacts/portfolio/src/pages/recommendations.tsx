import SiteLayout from "@/components/site-layout";
import { PageHero } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { useProfileData } from "@/lib/use-profile-data";
import { SITE_URL, breadcrumbSchema } from "@/lib/site";
import ImageWithSkeleton from "@/components/image-with-skeleton";

const TITLE = "Recommendations | Abhishek Adhikari — AI Trainer in Nepal";
const DESCRIPTION =
  "LinkedIn recommendations for Abhishek Adhikari from industry professionals — Tanka Bhattarai, Lava Kafle, Jagadish Bidari, Upendra Prasad Neupane, Sushovan Paudyal, and Rajiv Raman Neupane.";

export default function RecommendationsPage() {
  const data = useProfileData();
  const recommendations = data?.recommendations ?? [];

  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/recommendations",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ItemList",
          "@id": `${SITE_URL}/recommendations#list`,
          name: "Recommendations for Abhishek Adhikari",
          description: DESCRIPTION,
          itemListElement: recommendations.map((rec, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Person",
              name: rec.name,
              jobTitle: rec.title,
              description: rec.excerpt,
            },
          })),
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Recommendations", path: "/recommendations" },
        ]),
      ],
    },
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Recommendations"
        title="What people say"
        intro="Recommendations from mentors, clients and colleagues on community building, product design, entrepreneurship and technical work."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        {recommendations.length === 0 ? (
          <p className="text-muted-foreground">Loading recommendations…</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {recommendations.map((rec) => (
              <figure key={rec.name} className="flex flex-col gap-5 rounded-xl border bg-card p-6 shadow-sm">
                <blockquote className="flex-1 text-base italic leading-relaxed text-foreground/85">
                  “{rec.excerpt}”
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t pt-4">
                  <div className="size-11 shrink-0 overflow-hidden rounded-full bg-muted">
                    {rec.imageUrl && (
                      <ImageWithSkeleton
                        src={rec.imageUrl}
                        alt={`${rec.name} — recommendation for Abhishek Adhikari`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                        wrapperClassName="h-full w-full"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold">{rec.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{rec.title}</p>
                    <p className="text-xs text-primary/80">{rec.relationship} · {rec.date}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
