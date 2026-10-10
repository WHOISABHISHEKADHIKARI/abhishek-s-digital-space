import SiteLayout from "@/components/site-layout";
import { PageHero, SectionHeading } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { useProfileData } from "@/lib/use-profile-data";
import { SITE_URL, breadcrumbSchema, personRef } from "@/lib/site";
import ImageWithSkeleton from "@/components/image-with-skeleton";

const TITLE = "Volunteering & Community | Abhishek Adhikari — AI Trainer in Nepal";
const DESCRIPTION =
  "Community leadership and mentorship by Abhishek Adhikari — Co-organizer of AWS Cloud Technology Conference 2026, Panelist at Hult Prize, Mentor at Code for Change, Arduino Instructor, Prompt Engineering Facilitator, and DEV Community Nepal organizer.";

export default function VolunteeringPage() {
  const data = useProfileData();
  const volunteering = data?.volunteering ?? [];

  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/volunteering",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ItemList",
          "@id": `${SITE_URL}/volunteering#list`,
          name: "Volunteering and community work by Abhishek Adhikari",
          description: DESCRIPTION,
          itemListElement: volunteering.map((vol, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "VolunteerAction",
              name: vol.role,
              description: vol.summary,
              agent: personRef(),
              participant: vol.organization,
              ...(vol.date ? { startDate: vol.date } : {}),
            },
          })),
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Volunteering", path: "/volunteering" },
        ]),
      ],
    },
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Volunteering"
        title="Community, mentorship and teaching"
        intro="Workshops, mentorship programs, conferences and community meetups delivered across Hetauda, Chitwan, Kathmandu and beyond — often free and always practical."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="Selected work" title="Sessions and roles" />
        {volunteering.length === 0 ? (
          <p className="text-muted-foreground">Loading community work…</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {volunteering.map((vol, index) => {
              const image = vol.images?.[0];
              return (
                <article
                  key={`${vol.organization}-${vol.role}-${index}`}
                  className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  {image?.imageUrl && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <ImageWithSkeleton
                        src={image.imageUrl}
                        alt={`${vol.role} at ${vol.organization} — community work by Abhishek Adhikari`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                        wrapperClassName="absolute inset-0"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <span className="font-mono text-xs text-muted-foreground">{vol.date || vol.startDate}</span>
                    <h3 className="text-lg font-bold leading-tight">{vol.role}</h3>
                    <span className="text-sm font-semibold text-primary">{vol.organization}</span>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{vol.summary}</p>
                    {vol.impact && vol.impact.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {vol.impact.slice(0, 2).map((item, i) => (
                          <li key={i} className="flex gap-2 text-xs text-muted-foreground">
                            <span className="mt-0.5 shrink-0 text-primary">-</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
