import { Check } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { DraftBanner, PageHero, SectionHeading } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { breadcrumbSchema } from "@/lib/site";
import { OPEN_SOURCE_FACTS } from "@/lib/profile-data";

const TITLE = "Agentic AI Skills Workshop – Abhishek Adhikari";
const DESCRIPTION =
  "Hands-on workshop on building agentic AI workflows using reusable skills. Based on open-source contributions to Agentic Awesome Skills. Draft page — curriculum and availability pending confirmation.";

const modules = [
  { name: "What makes a skill", detail: "Scope, inputs, steps and outputs of a reusable agent skill." },
  { name: "Writing a skill", detail: "Turning a task you repeat into a clear, testable instruction." },
  { name: "Composing workflows", detail: "Chaining skills into a multi-step agent workflow." },
  { name: "Tools and permissions", detail: "Giving an agent bounded access to approved tools." },
  { name: "Evaluation and review", detail: "Checking results and adding human checkpoints." },
];

export default function AgenticSkillsWorkshopPage() {
  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/agentic-ai-skills-workshop",
    noindex: true,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Agentic AI Skills Workshop", path: "/agentic-ai-skills-workshop" },
        ]),
      ],
    },
  });

  return (
    <SiteLayout>
      <DraftBanner note="The open-source contribution background is strong, but the workshop curriculum and availability are not yet confirmed." />
      <PageHero
        eyebrow="Draft · Agentic AI"
        title="Agentic AI skills workshop"
        intro={`A proposed hands-on workshop on building agentic AI workflows with reusable skills, drawing on ${OPEN_SOURCE_FACTS.skillsAdded} AI agent skills contributed through ${OPEN_SOURCE_FACTS.mergedPRs} merged pull requests to open source.`}
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="Provisional curriculum" title="Proposed modules" copy="Titles and scope are provisional until the workshop is finalised." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((mod) => (
            <article key={mod.name} className="rounded-xl border bg-card p-6">
              <h3 className="text-lg font-bold">{mod.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{mod.detail}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-xl border-l-4 border-accent bg-muted/50 p-5 text-sm leading-relaxed text-muted-foreground">
          <p className="flex items-start gap-2">
            <Check size={16} className="mt-0.5 shrink-0 text-primary" />
            Pending confirmation: curriculum, prerequisites, duration and availability. This page is marked noindex and
            is not included in the sitemap or navigation until confirmed.
          </p>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          See the{" "}
          <a href="/open-source" className="font-semibold text-primary">open-source contributions</a>{" "}
          behind this workshop, or the{" "}
          <a href="/ai-trainer-nepal/" className="font-semibold text-primary">AI Trainer in Nepal</a>{" "}
          profile for how this work shapes practical training.
        </p>
      </section>
    </SiteLayout>
  );
}
