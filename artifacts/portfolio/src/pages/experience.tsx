import SiteLayout from "@/components/site-layout";
import { PageHero, SectionHeading } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { useProfileData } from "@/lib/use-profile-data";
import { SITE_URL, breadcrumbSchema, personRef } from "@/lib/site";

const TITLE = "Experience | Abhishek Adhikari — AI Trainer in Nepal";
const DESCRIPTION =
  "Professional experience of Abhishek Adhikari — Co-Founder of DEV Community Nepal, Founder of Himalaya Krishi, Product Designer at Sajilo Patro, and roles at Aayo Rides Nepal, Kisan Care, IT Club HSMSS, and Menzz.";

export default function ExperiencePage() {
  const data = useProfileData();
  const experience = data?.experience ?? [];

  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/experience",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ItemList",
          "@id": `${SITE_URL}/experience#list`,
          name: "Professional experience of Abhishek Adhikari",
          description: DESCRIPTION,
          itemListElement: experience.map((exp, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "OrganizationRole",
              roleName: exp.role,
              startDate: exp.startDate,
              endDate: exp.endDate,
              description: exp.summary,
              organization: { "@type": "Organization", name: exp.organization },
              member: personRef(),
            },
          })),
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
        ]),
      ],
    },
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Experience"
        title="Where I have worked"
        intro="Professional roles across agritech, tech communities, design, digital growth and business development — from startup operations to founding and community building."
      />

      <section className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
        {experience.length === 0 ? (
          <p className="text-muted-foreground">Loading experience…</p>
        ) : (
          <ol className="relative space-y-8 border-l border-border pl-6 md:pl-8">
            {experience.map((exp, index) => (
              <li key={`${exp.organization}-${exp.role}-${index}`} className="relative">
                <span className="absolute -left-[calc(1.5rem+5px)] top-1.5 size-2.5 rounded-full bg-primary md:-left-[calc(2rem+5px)]" aria-hidden="true" />
                <article className="rounded-xl border bg-card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-lg font-bold">{exp.role}</h2>
                    <span className="font-mono text-xs text-muted-foreground">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-primary">{exp.organization}</span>
                    <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">{exp.type}</span>
                    {exp.location && <span className="text-xs text-muted-foreground">{exp.location}</span>}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{exp.summary}</p>

                  {exp.impact?.length > 0 && (
                    <ul className="mt-4 space-y-1.5">
                      {exp.impact.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-foreground/80">
                          <span className="mt-0.5 shrink-0 text-primary">-</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="border-t bg-card/40">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <SectionHeading
            eyebrow="Next"
            title="See the work behind the roles"
            copy="Projects, community teaching and credentials that sit alongside this history."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { href: "/work", title: "Projects", copy: "Digital products across agritech, SEO, coffee and business." },
              { href: "/volunteering", title: "Volunteering", copy: "Workshops, mentorship and community leadership." },
              { href: "/certifications", title: "Certifications", copy: "Google UX, digital marketing, IoT and community awards." },
            ].map((card) => (
              <a key={card.href} href={card.href} className="rounded-xl border bg-background p-6 transition hover:-translate-y-1 hover:border-primary/50">
                <h3 className="text-lg font-bold">{card.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{card.copy}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
