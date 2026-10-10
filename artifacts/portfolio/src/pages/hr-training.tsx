import { Check } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { DraftBanner, PageHero, SectionHeading } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { breadcrumbSchema } from "@/lib/site";

const TITLE = "AI Training for HR Professionals in Nepal – Abhishek Adhikari";
const DESCRIPTION =
  "AI training for HR teams covering prompt engineering, recruitment workflows, and employee communications. Draft page — content pending confirmation of workshop details.";

const topics = [
  "Prompt engineering for HR tasks",
  "Drafting job descriptions and role scopes",
  "Structuring screening and interview notes",
  "Employee communication and policy summaries",
  "Privacy, fairness and verification in HR use",
];

export default function HRTrainingPage() {
  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/ai-training-hr-nepal",
    noindex: true,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AI Training for HR Professionals", path: "/ai-training-hr-nepal" },
        ]),
      ],
    },
  });

  return (
    <SiteLayout>
      <DraftBanner note="A single AI prompt session with HR professionals is documented, but a standalone HR workshop offer is not yet confirmed." />
      <PageHero
        eyebrow="Draft · HR teams"
        title="AI training for HR professionals in Nepal"
        intro="A proposed session for HR teams on applying prompt engineering to recruitment, documentation and employee communication, with privacy, fairness and verification built in."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="Provisional topics" title="What a session could cover" />
        <ul className="grid gap-3 sm:grid-cols-2">
          {topics.map((topic) => (
            <li key={topic} className="flex items-center gap-3 rounded-xl border bg-card p-4 text-sm font-medium">
              <Check size={17} className="shrink-0 text-primary" /> {topic}
            </li>
          ))}
        </ul>
        <div className="mt-10 rounded-xl border-l-4 border-accent bg-muted/50 p-5 text-sm leading-relaxed text-muted-foreground">
          Pending confirmation: workshop agenda, duration and delivery options. This page is marked noindex and is not
          included in the sitemap or navigation until the offer is confirmed.
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          For a confirmed, currently available offer, see{" "}
          <a href="/ai-training" className="font-semibold text-primary">corporate AI training</a>.
        </p>
      </section>
    </SiteLayout>
  );
}
