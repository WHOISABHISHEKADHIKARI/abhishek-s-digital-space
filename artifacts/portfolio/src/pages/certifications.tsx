import { ExternalLink } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { PageHero } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { useProfileData } from "@/lib/use-profile-data";
import { SITE_URL, breadcrumbSchema, personRef } from "@/lib/site";
import ImageWithSkeleton from "@/components/image-with-skeleton";

const TITLE = "Certifications | Abhishek Adhikari — AI Trainer in Nepal";
const DESCRIPTION =
  "Professional certifications earned by Abhishek Adhikari — Google UX Design Professional Certificate, Google Digital Garage, CalArts Graphic Design, IoT enCypher, and community builder awards from DEV Community Nepal, Coding Olympics Nepal, and others.";

export default function CertificationsPage() {
  const data = useProfileData();
  const certifications = data?.certifications ?? [];

  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/certifications",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ItemList",
          "@id": `${SITE_URL}/certifications#list`,
          name: "Certifications held by Abhishek Adhikari",
          description: DESCRIPTION,
          itemListElement: certifications.map((cert, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "EducationalOccupationalCredential",
              name: cert.title,
              description: `${cert.issuer}${cert.platform ? ` — ${cert.platform}` : ""}`,
              url: cert.url ?? undefined,
              dateCreated: cert.date,
              ...(cert.credentialId ? { identifier: cert.credentialId } : {}),
              recognizedBy: { "@type": "Organization", name: cert.issuer },
              about: personRef(),
            },
          })),
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Certifications", path: "/certifications" },
        ]),
      ],
    },
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Certifications"
        title="Certifications and credentials"
        intro="Formal certificates from Google, CalArts, enCypher and Coursera, alongside recognitions for community building, training and mentorship."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        {certifications.length === 0 ? (
          <p className="text-muted-foreground">Loading certifications…</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <article key={`${cert.title}-${cert.issuer}`} className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                {cert.imageUrl && (
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <ImageWithSkeleton
                      src={cert.imageUrl}
                      alt={`${cert.title} — ${cert.issuer} certificate earned by Abhishek Adhikari`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain p-3"
                      wrapperClassName="absolute inset-0"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{cert.issuer}</span>
                    <span className="font-mono text-xs text-muted-foreground">{cert.date}</span>
                  </div>
                  <h2 className="text-base font-bold leading-snug">{cert.title}</h2>
                  {cert.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto flex items-center justify-between gap-2 pt-2 text-xs">
                    {cert.credentialId ? (
                      <span className="truncate font-mono text-muted-foreground" title={cert.credentialId}>
                        {cert.credentialId}
                      </span>
                    ) : (
                      <span />
                    )}
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex shrink-0 items-center gap-1 font-semibold text-primary hover:underline"
                        aria-label={`Verify ${cert.title}`}
                      >
                        Verify <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
