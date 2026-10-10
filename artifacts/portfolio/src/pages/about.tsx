import { Github, Linkedin, Mail } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { PageHero, SectionHeading } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { useProfileData } from "@/lib/use-profile-data";
import { SITE_URL, breadcrumbSchema, personRef } from "@/lib/site";
import { OPEN_SOURCE_FACTS } from "@/lib/profile-data";

const TITLE = "About Abhishek Adhikari | AI Trainer in Nepal";
const DESCRIPTION =
  "AI trainer, prompt engineering practitioner, open-source contributor and agritech entrepreneur from Hetauda, Nepal. Spoke at WordCamp Kathmandu 2026. Listed #1 in 'Most Commits' and #2 in 'Most Skills Added' in the Agentic Awesome Skills README (verified October 11, 2026).";

export default function AboutPage() {
  const data = useProfileData();

  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/about",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": `${SITE_URL}/about#profilepage`,
          url: `${SITE_URL}/about`,
          name: TITLE,
          description: DESCRIPTION,
          mainEntity: personRef(),
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]),
      ],
    },
  });

  const skills = data?.skills ?? [];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="About"
        title="AI trainer, agritech entrepreneur and community builder from Hetauda, Nepal"
        intro="Abhishek Adhikari trains students, teachers, professionals and teams on practical generative AI — prompt engineering, context engineering, verification and responsible use — grounded in real workflows, open-source contribution and community teaching."
      >
        <a href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground">
          <Mail size={18} /> Contact Abhishek
        </a>
        <a href="/ai-trainer-nepal/" className="inline-flex min-h-12 items-center justify-center rounded-md border bg-card px-6 font-semibold hover:bg-muted">
          AI training in Nepal
        </a>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <SectionHeading eyebrow="Who I am" title="A practitioner first, a trainer second" />
            <p className="text-lg leading-relaxed text-muted-foreground">
              {data?.profile.description ??
                "Abhishek Adhikari is an AI trainer and agritech entrepreneur from Hetauda, Nepal. He has trained hundreds of students, teachers and professionals on prompt engineering and AI literacy, speaks about practical AI at community events, and contributes reusable AI agent skills to open source."}
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              His teaching focuses on how to define a task, provide useful context, choose the right tools, verify the
              result and turn successful experiments into repeatable workflows — not on isolated tool demonstrations.
              Alongside training, he founded Himalaya Krishi, co-founded DEV Community Nepal, and has added{" "}
              <strong className="text-foreground">
                {OPEN_SOURCE_FACTS.skillsAdded} AI agent skills through {OPEN_SOURCE_FACTS.mergedPRs} merged pull requests
              </strong>{" "}
              to the open-source Agentic Awesome Skills project.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              The repository README lists his account #1 under “Most Commits” and #2 under “Most Skills Added”
              (verified {OPEN_SOURCE_FACTS.readmeRanking.verifiedDate}). Details and evidence are on the{" "}
              <a href="/open-source" className="font-semibold text-primary">
                open-source page
              </a>
              .
            </p>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-lg font-bold">Quick facts</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Based in</dt>
                  <dd className="font-medium">Hetauda, Bagmati, Nepal</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Languages</dt>
                  <dd className="font-medium">English, Nepali, Hindi</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Focus</dt>
                  <dd className="text-right font-medium">Practical generative AI, prompt & context engineering, agentic workflows</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Speaking</dt>
                  <dd className="text-right font-medium">WordCamp Kathmandu 2026</dd>
                </div>
              </dl>
              <div className="mt-5 flex gap-3">
                <a href="https://www.linkedin.com/in/whoisabhishekadhikari" target="_blank" rel="me noreferrer" aria-label="LinkedIn" className="rounded-md border p-2 hover:bg-muted">
                  <Linkedin size={18} />
                </a>
                <a href="https://github.com/WHOISABHISHEKADHIKARI" target="_blank" rel="me noreferrer" aria-label="GitHub" className="rounded-md border p-2 hover:bg-muted">
                  <Github size={18} />
                </a>
              </div>
            </div>
            <div className="rounded-2xl border bg-muted/40 p-6 text-sm">
              <p className="font-semibold">Explore more</p>
              <ul className="mt-3 space-y-2 text-muted-foreground">
                <li><a href="/experience" className="hover:text-foreground">Professional experience →</a></li>
                <li><a href="/work" className="hover:text-foreground">Projects and products →</a></li>
                <li><a href="/volunteering" className="hover:text-foreground">Community and teaching →</a></li>
                <li><a href="/certifications" className="hover:text-foreground">Certifications →</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {skills.length > 0 && (
        <section className="border-t bg-card/40">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <SectionHeading eyebrow="Skills" title="What I work with" copy="Grouped by the areas where the work actually happens." />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skills.map((cat) => (
                <div key={cat.category} className="rounded-xl border bg-background p-6">
                  <h3 className="text-lg font-bold">{cat.category}</h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {cat.items.map((s) => (
                      <li key={s.name} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
