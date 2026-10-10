import { Check } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { DraftBanner, PageHero, SectionHeading } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { breadcrumbSchema } from "@/lib/site";

const TITLE = "AI Training for Teachers in Nepal – Abhishek Adhikari";
const DESCRIPTION =
  "AI training for teachers and educators covering lesson planning, content creation, and student engagement. Draft page — content pending confirmation of workshop agenda and delivery options.";

const topics = [
  "AI literacy foundations for educators",
  "Lesson planning and learning material support",
  "Creating and adapting classroom content",
  "Academic integrity and verification habits",
  "Privacy and appropriate use in schools",
];

export default function TeacherTrainingPage() {
  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/ai-training-teachers-nepal",
    noindex: true,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AI Training for Teachers", path: "/ai-training-teachers-nepal" },
        ]),
      ],
    },
  });

  return (
    <SiteLayout>
      <DraftBanner note="AI and digital literacy sessions at Nirmal Secondary School and Bagmati are documented, but a repeatable teacher-training offer is not yet confirmed." />
      <PageHero
        eyebrow="Draft · Teachers"
        title="AI training for teachers in Nepal"
        intro="A proposed program for educators on using AI for lesson planning, content creation and administration while protecting academic integrity and student privacy."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="Provisional topics" title="What a program could cover" />
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
          <a href="/ai-trainer-nepal/" className="font-semibold text-primary">AI training in Nepal</a>{" "}
          or{" "}
          <a href="/ai-training" className="font-semibold text-primary">corporate AI training</a>.
        </p>
      </section>
    </SiteLayout>
  );
}
