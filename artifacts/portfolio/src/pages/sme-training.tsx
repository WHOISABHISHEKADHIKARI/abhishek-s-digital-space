import { Check } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { DraftBanner, PageHero, SectionHeading } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { breadcrumbSchema } from "@/lib/site";
import { OPEN_SOURCE_FACTS } from "@/lib/profile-data";

const TITLE = "AI Training for SME Operations – Abhishek Adhikari";
const DESCRIPTION =
  "AI training for SME operations covering accounting, HR, reporting, governance, and inventory workflows. Based on 106 open-source skills contributed to Agentic Awesome Skills. Draft page — content pending confirmation.";

const modules = [
  { name: "Accounting support", detail: "Drafting, summarising and checking routine financial documents." },
  { name: "HR workflows", detail: "Job descriptions, screening support, onboarding and policy summaries." },
  { name: "Reporting", detail: "Turning raw updates into structured internal reports." },
  { name: "Governance", detail: "Policy, compliance and meeting documentation support." },
  { name: "Inventory", detail: "Stock records, reorder notes and supplier communication." },
];

export default function SMETrainingPage() {
  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/ai-training-sme-operations",
    noindex: true,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AI Training for SME Operations", path: "/ai-training-sme-operations" },
        ]),
      ],
    },
  });

  return (
    <SiteLayout>
      <DraftBanner note="This page describes a training offer that is still being finalised. Module titles and scope are provisional." />
      <PageHero
        eyebrow="Draft · SME operations"
        title="AI training for SME operations"
        intro={`A proposed workshop mapping the ${OPEN_SOURCE_FACTS.smeSkillsCount} SME operations skills contributed to open source onto practical modules for accounting, HR, reporting, governance and inventory teams.`}
      />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="Provisional modules" title="Mapping skills to workflows" copy="Each module would pair a workplace task with a reusable agent skill and a verification step." />
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
            Pending confirmation: the final agenda, exercise set and delivery format. Until then this page is marked
            noindex and is not included in the sitemap or navigation.
          </p>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          For a confirmed, currently available offer, see{" "}
          <a href="/ai-training" className="font-semibold text-primary">corporate AI training</a>.
        </p>
      </section>
    </SiteLayout>
  );
}
