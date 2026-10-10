import { ExternalLink } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { PageHero } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { useProfileData } from "@/lib/use-profile-data";
import { SITE_URL, breadcrumbSchema, personRef } from "@/lib/site";
import ImageWithSkeleton from "@/components/image-with-skeleton";

const TITLE = "Projects & Work | Abhishek Adhikari — AI Trainer in Nepal";
const DESCRIPTION =
  "Digital products built by Abhishek Adhikari — Krishi Himalaya, 100SEOTools, Redesign Profile, JNB Coffee, Murraa, Hetaudacity, Himalaya Krishi, Aayo Rides, and more across agritech, SEO, coffee, and business sectors.";

export default function WorkPage() {
  const data = useProfileData();
  const projects = data?.projects ?? [];
  let position = 0;

  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/work",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ItemList",
          "@id": `${SITE_URL}/work#list`,
          name: "Projects by Abhishek Adhikari",
          description: DESCRIPTION,
          itemListElement: projects.flatMap((cat) =>
            cat.items.map((item) => {
              position += 1;
              return {
                "@type": "ListItem",
                position,
                item: {
                  "@type": "SoftwareApplication",
                  name: item.name,
                  url: item.url,
                  applicationCategory: cat.category,
                  author: personRef(),
                },
              };
            }),
          ),
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ]),
      ],
    },
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Work"
        title="Projects and digital products"
        intro="Websites, platforms and tools built across agritech, SEO, coffee, business services and personal branding — most of them for real clients and real operations in Nepal."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        {projects.length === 0 ? (
          <p className="text-muted-foreground">Loading projects…</p>
        ) : (
          <div className="space-y-16">
            {projects.map((cat) => (
              <div key={cat.category}>
                <h2 className="mb-6 text-2xl font-bold">{cat.category}</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item) => {
                    const shot =
                      item.imageUrl ??
                      `https://api.microlink.io/?url=${encodeURIComponent(item.url)}&screenshot=true&meta=false&embed=screenshot.url`;
                    return (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                          <ImageWithSkeleton
                            src={shot}
                            alt={`${item.name} — ${cat.category} project by Abhishek Adhikari`}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            wrapperClassName="absolute inset-0"
                          />
                        </div>
                        <div className="flex flex-col gap-1 p-4">
                          <span className="self-start rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                            {cat.category}
                          </span>
                          <p className="flex items-center gap-2 font-semibold leading-tight">
                            {item.name}
                            <ExternalLink size={14} className="text-muted-foreground" />
                          </p>
                          <span className="truncate text-xs text-muted-foreground">{item.url.replace(/^https?:\/\//, "")}</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
