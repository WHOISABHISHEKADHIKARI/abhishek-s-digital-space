import { ExternalLink, Github, GitPullRequest, Star } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { PageHero, SectionHeading } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { SITE_URL, breadcrumbSchema, personRef } from "@/lib/site";
import { OPEN_SOURCE_FACTS } from "@/lib/profile-data";
import { SME_PRS, smeSkillsTotal } from "@/lib/evidence";

const TITLE = "Open-Source Contributions | Abhishek Adhikari — AI Trainer in Nepal";
const DESCRIPTION =
  "Open-source contributions by Abhishek Adhikari — 125 AI agent skills added through 36 merged pull requests to Agentic Awesome Skills, including 106 SME operations skills. Listed #1 in 'Most Commits' and #2 in 'Most Skills Added' in the repository README (verified October 11, 2026).";

const stats: Array<[string, string]> = [
  [String(OPEN_SOURCE_FACTS.skillsAdded), "AI agent skills added"],
  [String(OPEN_SOURCE_FACTS.mergedPRs), "Merged pull requests"],
  [String(OPEN_SOURCE_FACTS.smeSkillsCount), "SME operations skills"],
  ["#1 / #2", "README rankings"],
];

const categories = [
  { name: "SME operations", count: 106, detail: `Delivered across pull requests ${OPEN_SOURCE_FACTS.smePRRange}, ${OPEN_SOURCE_FACTS.smeDateRange}. Covers accounting, HR, reporting, governance and inventory workflows.` },
  { name: "Reusable agent skills", count: 125, detail: "Reusable, well-scoped skills that let AI agents complete defined tasks with clear inputs and outputs." },
];

const evidence: Array<{ label: string; title: string; copy: string; href: string }> = [
  { label: "Profile", title: "GitHub profile", copy: "Public developer identity and repositories.", href: OPEN_SOURCE_FACTS.evidenceLinks.githubProfile },
  { label: "Repository", title: "Agentic Awesome Skills", copy: "The canonical repository for the skills project.", href: OPEN_SOURCE_FACTS.evidenceLinks.repo },
  { label: "README", title: "Top contributors", copy: "Repository README contributor rankings.", href: OPEN_SOURCE_FACTS.evidenceLinks.readmeContributors },
  { label: "Pull requests", title: "Merged PR search", copy: "Filtered list of merged PRs authored by the account.", href: OPEN_SOURCE_FACTS.evidenceLinks.prSearch },
  { label: "PR #1688", title: "Skills PR #1688", copy: "First PR in the SME operations skill batch.", href: OPEN_SOURCE_FACTS.evidenceLinks.pr1688 },
  { label: "PR #1698", title: "Skills PR #1698", copy: "Later PR in the SME operations skill batch.", href: OPEN_SOURCE_FACTS.evidenceLinks.pr1698 },
  { label: "Third party", title: "Star History", copy: "Repository star and rank history — not an individual contributor ranking.", href: OPEN_SOURCE_FACTS.evidenceLinks.starHistory },
];

export default function OpenSourcePage() {
  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/open-source",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ProfilePage",
          "@id": `${SITE_URL}/open-source#profilepage`,
          url: `${SITE_URL}/open-source`,
          name: TITLE,
          description: DESCRIPTION,
          mainEntity: personRef(),
        },
        {
          "@type": "ItemList",
          "@id": `${SITE_URL}/open-source#skills`,
          name: "AI agent skills contributed by Abhishek Adhikari",
          itemListElement: categories.map((cat, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "DefinedTerm",
              name: cat.name,
              description: cat.detail,
              inDefinedTermSet: "Agentic Awesome Skills",
            },
          })),
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Open Source", path: "/open-source" },
        ]),
      ],
    },
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Open source"
        title="Reusable AI agent skills, contributed in the open"
        intro={`${OPEN_SOURCE_FACTS.skillsAdded} AI agent skills added through ${OPEN_SOURCE_FACTS.mergedPRs} merged pull requests to Agentic Awesome Skills. The repository README lists the account #1 under “Most Commits” and #2 under “Most Skills Added” (verified ${OPEN_SOURCE_FACTS.readmeRanking.verifiedDate}).`}
      >
        <a href={OPEN_SOURCE_FACTS.evidenceLinks.repo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground">
          <Github size={18} /> View repository
        </a>
        <a href={OPEN_SOURCE_FACTS.evidenceLinks.prSearch} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border bg-card px-6 font-semibold hover:bg-muted">
          <GitPullRequest size={18} /> See merged PRs
        </a>
      </PageHero>

      <section className="border-b bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-5 py-10 md:grid-cols-4 md:px-8">
          {stats.map(([value, label]) => (
            <div key={label} className="rounded-xl border bg-background px-6 py-8 text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">{value}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-b bg-card/40">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <SectionHeading eyebrow="Audit trail" title="SME operations skills, PR by PR" />
          <p className="max-w-3xl leading-relaxed text-muted-foreground">
            The {smeSkillsTotal()} SME operations skills were merged across {SME_PRS.length} pull requests on September
            29–30, 2026. Each PR added 10 skills, except the final PR #{SME_PRS[SME_PRS.length - 1].pr}, which added 6.
            The table below lists every pull request in the batch.
          </p>
          <div className="mt-8 max-w-2xl overflow-hidden rounded-xl border bg-background">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Skills added per merged pull request in the SME operations batch</caption>
              <thead>
                <tr className="border-b bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <th scope="col" className="px-4 py-3 font-semibold">Pull request</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Skills added</th>
                </tr>
              </thead>
              <tbody>
                {SME_PRS.map(({ pr, skills }) => (
                  <tr key={pr} className="border-b last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-2.5">
                      <a href={`https://github.com/sickn33/agentic-awesome-skills/pull/${pr}`} target="_blank" rel="noopener noreferrer" className="font-mono font-semibold text-primary hover:underline">
                        PR #{pr} <ExternalLink size={12} className="inline" />
                      </a>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono">{skills}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t bg-muted/50">
                  <td className="px-4 py-3 font-semibold">Total</td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-primary">{smeSkillsTotal()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading eyebrow="What was contributed" title="Skills with a defined job" />
            <p className="leading-relaxed text-muted-foreground">
              Each skill is a scoped, reusable instruction that lets an AI agent complete a defined task with clear
              inputs, steps and outputs. The work focuses on making agents useful for everyday operations rather than
              impressive in demos.
            </p>
            <div className="mt-8 space-y-5">
              {categories.map((cat) => (
                <article key={cat.name} className="rounded-xl border bg-card p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-bold">{cat.name}</h3>
                    <span className="font-mono text-sm text-primary">{cat.count} skills</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cat.detail}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 rounded-xl border-l-4 border-primary bg-muted/50 p-5 text-sm leading-relaxed text-muted-foreground">
              Repository stars and rankings measure a repository, not an individual. The README contributor tables are the
              relevant source for the commit and skills-added rankings cited here, and they can change over time — the
              live sources are linked on this page.
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              These skills shape the practical{" "}
              <a href="/ai-trainer-nepal/" className="font-semibold text-primary">AI training in Nepal</a>{" "}
              offered by Abhishek.
            </p>
          </div>

          <aside className="space-y-4">
            <h2 className="text-lg font-bold">Inspect the evidence</h2>
            <ul className="space-y-3">
              {evidence.map((item) => (
                <li key={item.title}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-xl border bg-card p-4 transition hover:border-primary/50">
                    <Star size={16} className="mt-1 shrink-0 text-primary" />
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</span>
                      <span className="mt-0.5 flex items-center gap-1.5 font-semibold group-hover:text-primary">
                        {item.title} <ExternalLink size={13} />
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{item.copy}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">README ranking verified {OPEN_SOURCE_FACTS.readmeRanking.verifiedDate} from the {OPEN_SOURCE_FACTS.readmeRanking.source}.</p>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
