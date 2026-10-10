import { Check, ChevronDown, ArrowRight, ShieldCheck, Users, Workflow } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { PageHero, SectionHeading } from "@/components/page-parts";
import { usePageMeta } from "@/lib/use-page-meta";
import { SITE_URL, breadcrumbSchema, personRef } from "@/lib/site";

const TITLE = "Corporate AI Training in Nepal | Abhishek Adhikari";
const DESCRIPTION =
  "Corporate AI training workshops for SMEs, HR teams, teachers, and non-technical staff. Practical prompt engineering, context engineering, and agentic workflow sessions. On-site in Nepal and virtual delivery.";

const faqs: Array<[string, string]> = [
  [
    "Who is this training suitable for?",
    "Foundational sessions suit SMEs, HR and operations teams, teachers, administrators and other non-technical staff. Developer-oriented sessions are available for engineering teams. Sessions are scoped to the roles, tools and tasks in the room.",
  ],
  [
    "What will participants practice?",
    "Participants work through prompt templates, context packs, workflow templates and verification checklists using their own realistic (non-sensitive) tasks, so they leave with reusable patterns rather than notes about features.",
  ],
  [
    "Can non-technical employees participate?",
    "Yes. Foundations require no coding. The focus is on clear instructions, useful context, checking outputs and turning a good result into a repeatable workflow.",
  ],
  [
    "What preparation is needed?",
    "For hands-on sessions each participant should bring a laptop with internet access. No prior AI experience is required for foundations. A short call before the session helps tailor examples.",
  ],
  [
    "Which tools are used, and do we need subscriptions?",
    "Sessions may use ChatGPT, Claude, Gemini and Perplexity. Participants use their own accounts; subscriptions are not provided as part of the training. The method is tool-agnostic so it survives changes in the tools.",
  ],
  [
    "How are confidential information and inaccurate outputs handled?",
    "Exercises use synthetic or approved non-sensitive data. Participants are advised not to paste proprietary or personal information into cloud AI tools, and verification steps are built into every workflow.",
  ],
  [
    "What information do you need for a quotation?",
    "Organization, team size and roles, current AI experience, goals, preferred dates, preferred format (on-site or virtual) and an approximate budget range. Share these via the contact form and you will receive a proposal.",
  ],
];

const audiences = [
  "SMEs and growing businesses",
  "HR and operations teams",
  "Teachers and educators",
  "Non-technical staff",
  "Marketing and content teams",
  "Developers (advanced track)",
];

const outcomes = [
  "Write clearer, more reliable prompts",
  "Assemble useful context for a task",
  "Choose tools appropriate to the job",
  "Verify important outputs before use",
  "Turn good results into repeatable workflows",
  "Set sensible privacy and review boundaries",
];

export default function CorporateAITraining() {
  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/ai-training",
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          "@id": `${SITE_URL}/ai-training#service`,
          name: "Corporate AI Training in Nepal",
          serviceType: "Corporate AI training and workshops",
          description: DESCRIPTION,
          provider: personRef(),
          areaServed: [
            { "@type": "Country", name: "Nepal" },
            { "@type": "Place", name: "Virtual delivery" },
          ],
          url: `${SITE_URL}/ai-training`,
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/ai-training#faq`,
          mainEntity: faqs.map(([name, text]) => ({
            "@type": "Question",
            name,
            acceptedAnswer: { "@type": "Answer", text },
          })),
        },
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "AI Training", path: "/ai-training" },
        ]),
      ],
    },
  });

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Corporate AI training"
        title="Practical AI training for teams that need to use it well"
        intro="Hands-on sessions for SMEs, HR teams, teachers and non-technical staff. Participants practise on realistic tasks, then leave with templates and a verification habit instead of a list of features."
      >
        <a href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground">
          Request a training proposal <ArrowRight size={18} />
        </a>
        <a href="#faq" className="inline-flex min-h-12 items-center justify-center rounded-md border bg-card px-6 font-semibold hover:bg-muted">
          Read the FAQ
        </a>
      </PageHero>

      <section className="border-b bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8">
          {[
            { icon: Users, title: "Built around your team", copy: "Examples use your roles, tools and tasks — HR, operations, teaching, sales, admin or engineering." },
            { icon: Workflow, title: "Practice, not slides", copy: "Every session includes hands-on exercises with prompt templates, context packs and workflow templates." },
            { icon: ShieldCheck, title: "Responsible by default", copy: "Privacy, hallucinations, source checking and human review are treated as working constraints." },
          ].map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon size={22} />
              </span>
              <div>
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="Who it is for" title="Audiences" copy="The principles are shared; the examples and depth change with the room." />
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience) => (
            <li key={audience} className="flex items-center gap-3 rounded-xl border bg-card p-4 text-sm font-medium">
              <Check size={17} className="shrink-0 text-primary" /> {audience}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <SectionHeading eyebrow="What participants practise" title="Practical exercises" copy="This is the core of the session — using real tasks, not watching someone else use AI." />
          <div className="grid gap-5 md:grid-cols-2">
            {[
              { title: "Prompt templates", copy: "Structured prompts for reports, summaries, drafts and analysis, with clear objectives, context and output formats." },
              { title: "Context packs", copy: "Assembling the files, examples and constraints a task actually needs so results are grounded." },
              { title: "Workflow templates", copy: "Turning a one-off success into a repeatable, multi-step process the team can reuse." },
              { title: "Verification checklists", copy: "Checking facts, sources, assumptions and limits before an output is used or shared." },
            ].map((item) => (
              <article key={item.title} className="rounded-xl border bg-background p-6">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Outcomes" title="What participants leave with" />
            <ul className="space-y-3">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3 text-sm">
                  <Check size={17} className="mt-0.5 shrink-0 text-primary" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-card p-7">
            <h2 className="text-xl font-bold">Logistics</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="font-semibold">Delivery</dt>
                <dd className="mt-1 text-muted-foreground">On-site in Nepal (Hetauda, Kathmandu and other cities) or virtual via video call. The exact format is agreed per engagement.</dd>
              </div>
              <div>
                <dt className="font-semibold">Prerequisites</dt>
                <dd className="mt-1 text-muted-foreground">None for foundations. For hands-on sessions, a laptop with internet access.</dd>
              </div>
              <div>
                <dt className="font-semibold">Tools</dt>
                <dd className="mt-1 text-muted-foreground">ChatGPT, Claude, Gemini and Perplexity. Participants use their own accounts; subscriptions are not provided.</dd>
              </div>
              <div>
                <dt className="font-semibold">Confidentiality</dt>
                <dd className="mt-1 text-muted-foreground">Exercises use synthetic or approved non-sensitive data. Participants are advised not to paste proprietary information into cloud AI tools.</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="faq" className="border-y bg-card/50">
        <div className="mx-auto max-w-4xl px-5 py-16 md:px-8 md:py-24">
          <SectionHeading eyebrow="Questions" title="Corporate AI training FAQ" />
          <div className="divide-y rounded-xl border bg-background">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group p-5 md:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold">
                  {question}
                  <ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" />
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-foreground text-background">
          <div className="p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Next step</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Request a training proposal</h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-background/70">
              Share your organization, team size and roles, current AI experience, goals, preferred dates, format and an
              approximate budget range. You will receive a scoped proposal in return.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground">
                Go to contact form <ArrowRight size={18} />
              </a>
              <a href="mailto:abhishekadhikari1254@gmail.com?subject=Corporate%20AI%20Training%20Enquiry" className="inline-flex min-h-12 items-center justify-center rounded-md border border-background/25 px-6 font-semibold">
                Email directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
