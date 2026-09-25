import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Languages,
  Menu,
  Moon,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  Workflow,
  X,
} from "lucide-react";

const SITE_URL = "https://abhishekadhikari.com";
const PAGE_URL = `${SITE_URL}/ai-trainer-nepal/`;

const evidence = [
  {
    image: "/sections/media/images/abhishek-adhikari--wordcamp-kathmandu-2026-speaker.jpg",
    label: "Public speaking",
    title: "WordCamp Kathmandu 2026 speaker",
    copy: "Official speaker for “Prompt Smarter, Not Harder,” a practical session on prompting and AI workflows.",
    href: "https://kathmandu.wordcamp.org/2026/speaker/abhishek-adhikari/",
  },
  {
    image: "/sections/news/images/abhishek-adhikari--github-repo-contributor.png",
    label: "Open source",
    title: "Agentic AI skills contributor",
    copy: "Public GitHub work in reusable agent instructions, workflow design and open-source AI tooling.",
    href: "https://github.com/WHOISABHISHEKADHIKARI",
  },
  {
    image: "/sections/volunteering/images/abhishek-adhikari--nirmal-secondary-school-ict-ai-digital-literacy-training.webp",
    label: "AI literacy",
    title: "Training grounded in real audiences",
    copy: "Practical sessions for educators, students, professionals and technology communities in Nepal.",
    href: "/volunteering",
  },
];

const topics = [
  { icon: Sparkles, title: "AI literacy", copy: "Generative AI fundamentals, useful capabilities, hallucinations, limitations and verification." },
  { icon: BrainCircuit, title: "Prompt engineering", copy: "Objectives, context, examples, constraints, structured outputs, iteration and evaluation." },
  { icon: Workflow, title: "Context engineering", copy: "Files, retrieval, tools, memory, reusable instructions and workflow constraints." },
  { icon: Bot, title: "Agentic AI", copy: "Goals, tools, agent skills, multi-step workflows, validation and human oversight." },
  { icon: Code2, title: "AI-assisted development", copy: "Coding agents, APIs, RAG, structured outputs, tests, debugging and code review." },
  { icon: ShieldCheck, title: "Responsible AI", copy: "Privacy, bias, source checking, academic integrity and sensible automation boundaries." },
];

const audiences = [
  { title: "Students", copy: "Use AI for explanations, research, practice and coding while protecting academic integrity." },
  { title: "Teachers", copy: "Support lesson planning, learning materials and administration with privacy and verification built in." },
  { title: "Businesses", copy: "Map real workflows across research, communication, documentation, knowledge and operations." },
  { title: "Developers", copy: "Work with coding agents, APIs, retrieval, evaluations, reusable skills, testing and debugging." },
  { title: "Agriculture & AgriTech", copy: "Explore records, knowledge access, communication and operational support without replacing domain experts." },
];

const faqs = [
  ["What does an AI trainer in Nepal teach?", "An AI trainer helps people apply artificial intelligence to real tasks. Sessions can cover AI literacy, prompt engineering, context engineering, research, verification, agentic workflows, automation and responsible use."],
  ["Do I need coding skills?", "No. Foundational workshops for students, teachers, teams and professionals do not require coding. Developer sessions can go deeper into APIs, RAG, structured outputs and agent workflows."],
  ["What is context engineering?", "Context engineering designs the full information environment around an AI task: instructions, files, retrieved documents, examples, memory, tools, permissions and evaluation rules."],
  ["What is agentic AI?", "Agentic AI describes systems that can work toward a goal over multiple steps, use approved tools, evaluate results and ask for human review when needed."],
  ["What tools are covered?", "Sessions may use ChatGPT, Claude, Gemini and other tools suited to the task. The durable focus is task definition, context, workflow design, verification and responsible use."],
  ["Can colleges and companies book a workshop?", "Yes. Sessions can be scoped for colleges, organizations, developer communities and teams. Share your audience, experience level, preferred format and desired outcome when you enquire."],
];

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl mb-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">{eyebrow}</p>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
      {copy && <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">{copy}</p>}
    </div>
  );
}

export default function AITrainerNepal() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const initial = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(initial);
    document.documentElement.classList.toggle("dark", initial);

    document.title = "AI Trainer in Nepal | Abhishek Adhikari — Practical AI";
    const description = "Practical AI training in Nepal by Abhishek Adhikari, covering prompt engineering, context engineering, responsible AI and agentic workflows.";
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", PAGE_URL);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: "Abhishek Adhikari",
          url: SITE_URL,
          image: `${SITE_URL}/abhishek-adhikari-ai-trainer-nepal-hero.webp`,
          description: "Nepal-based AI trainer and practitioner focused on practical generative AI, prompt engineering, context engineering and agentic workflows.",
          homeLocation: { "@type": "Country", name: "Nepal" },
          sameAs: [
            "https://github.com/WHOISABHISHEKADHIKARI",
            "https://www.linkedin.com/in/whoisabhishekadhikari/",
            "https://kathmandu.wordcamp.org/2026/speaker/abhishek-adhikari/",
          ],
        },
        {
          "@type": "WebPage",
          "@id": `${PAGE_URL}#webpage`,
          url: PAGE_URL,
          name: "AI Trainer in Nepal | Abhishek Adhikari — Practical AI",
          about: { "@id": `${SITE_URL}/#person` },
          inLanguage: "en",
        },
        {
          "@type": "Service",
          "@id": `${PAGE_URL}#service`,
          name: "Practical AI Training in Nepal",
          serviceType: "AI training and workshops",
          provider: { "@id": `${SITE_URL}/#person` },
          areaServed: { "@type": "Country", name: "Nepal" },
          url: PAGE_URL,
        },
        {
          "@type": "FAQPage",
          "@id": `${PAGE_URL}#faq`,
          mainEntity: faqs.map(([name, text]) => ({
            "@type": "Question",
            name,
            acceptedAnswer: { "@type": "Answer", text },
          })),
        },
      ],
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.pageSchema = "ai-trainer-nepal";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-background text-foreground noise-overlay">
      <a href="#main" className="fixed left-3 top-3 z-skip -translate-y-20 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:translate-y-0">Skip to content</a>
      <header className="sticky top-0 z-nav border-b bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <a href="/" className="font-heading text-lg font-bold tracking-tight">Abhishek Adhikari<span className="text-primary">.</span></a>
          <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex">
            <a href="#approach" className="text-sm text-muted-foreground hover:text-foreground">Approach</a>
            <a href="#topics" className="text-sm text-muted-foreground hover:text-foreground">Topics</a>
            <a href="#audiences" className="text-sm text-muted-foreground hover:text-foreground">For you</a>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</a>
            <a href="#book" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Book a workshop</a>
            <button onClick={toggleTheme} aria-label={dark ? "Use light theme" : "Use dark theme"} className="rounded-md border p-2 hover:bg-muted">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={toggleTheme} aria-label={dark ? "Use light theme" : "Use dark theme"} className="rounded-md border p-2">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
            <button onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu" className="rounded-md border p-2">{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t bg-background px-5 py-4 md:hidden" aria-label="Mobile navigation">
            <div className="mx-auto grid max-w-7xl gap-3">
              {[['Approach', '#approach'], ['Topics', '#topics'], ['For you', '#audiences'], ['FAQ', '#faq'], ['Book a workshop', '#book']].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium">{label}</a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="main">
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.14),transparent_35%),radial-gradient(circle_at_85%_70%,hsl(var(--accent)/0.12),transparent_30%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card/70 px-3 py-1.5 text-xs font-semibold text-primary"><Sparkles size={14} /> Practical AI training from Nepal</div>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-7xl">AI Trainer in Nepal for practical AI, prompt engineering & agentic workflows</h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">Learn how to define the task, provide useful context, choose the right tools, verify the result and turn successful experiments into repeatable workflows.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#book" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground">Book an AI workshop <ArrowRight size={18} /></a>
                <a href="#topics" className="inline-flex min-h-12 items-center justify-center rounded-md border bg-card px-6 font-semibold hover:bg-muted">Explore training topics</a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Check size={16} className="text-primary" /> Nepali + English</span>
                <span className="flex items-center gap-2"><Check size={16} className="text-primary" /> Beginner to developer</span>
                <span className="flex items-center gap-2"><Check size={16} className="text-primary" /> Responsible by design</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-4 rotate-2 rounded-[2rem] bg-primary/10" />
              <img src="/abhishek-adhikari-ai-trainer-nepal-hero.webp" alt="Abhishek Adhikari, AI trainer in Nepal" width="960" height="1200" fetchPriority="high" className="relative aspect-[4/5] w-full rounded-[1.5rem] border object-cover shadow-2xl" />
              <div className="absolute -bottom-5 left-5 right-5 rounded-xl border bg-card/95 p-4 shadow-xl backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">Practitioner → contributor → trainer</p>
                <p className="mt-1 text-sm font-medium">Training shaped by real workflows, open-source contribution and community teaching.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b bg-card/40 px-5 py-10 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[.7fr_1.3fr] md:items-start">
            <p className="text-sm font-semibold text-primary">Quick answer</p>
            <div>
              <h2 className="text-2xl font-bold">Who is Abhishek Adhikari?</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">Abhishek Adhikari is a Nepal-based AI trainer, prompt engineering practitioner, open-source contributor, technology community builder and AgriTech entrepreneur. His training focuses on practical generative AI, context engineering, agentic workflows, verification and responsible adoption rather than isolated tool demonstrations.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <SectionHeading eyebrow="Evidence, not adjectives" title="Work you can inspect" copy="Public speaker profiles, GitHub activity and real training environments make the expertise easier to verify." />
          <div className="grid gap-6 md:grid-cols-3">
            {evidence.map((item) => (
              <a key={item.title} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="group overflow-hidden rounded-xl border bg-card transition hover:-translate-y-1 hover:shadow-xl">
                <img src={item.image} alt={item.title} width="640" height="420" loading="lazy" className="aspect-[16/10] w-full object-cover" />
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">{item.label}</p>
                  <h3 className="mt-2 text-xl font-bold group-hover:text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">View evidence <ExternalLink size={15} /></span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="approach" className="border-y bg-muted/40 px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="A durable method" title="AI training should outlast the latest tool" copy="Tools change. Clear instructions, useful context, verification and sound workflow design continue to matter." />
            <div className="grid gap-8 lg:grid-cols-2">
              <article className="rounded-2xl border bg-card p-7 md:p-10">
                <h3 className="text-2xl font-bold">Prompt engineering</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">Prompt engineering designs and improves instructions for an AI system. A strong prompt makes the objective, relevant context, examples, constraints and expected output clear, then evaluates the result.</p>
                <div className="mt-7 rounded-lg border-l-4 border-primary bg-muted/60 p-5 text-sm leading-relaxed">“Draft a 500-word event report using the attached agenda. Include the organizer, date, audience and learning themes. Do not invent quotes. Mark missing facts as <code>[NEEDS INPUT]</code>.”</div>
                <p className="mt-5 text-sm text-muted-foreground">Prompting is not a bag of secret phrases. It is clear thinking translated into instructions.</p>
              </article>
              <article className="rounded-2xl border bg-card p-7 md:p-10">
                <h3 className="text-2xl font-bold">Context engineering</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">Context engineering designs the complete information environment around a task: system instructions, files, retrieved documents, examples, memory, tools, APIs, permissions and evaluation criteria.</p>
                <ul className="mt-7 grid gap-3 text-sm">
                  {["The right information at the right step", "Tools and permissions with clear boundaries", "Reusable instructions and project knowledge", "Checks for accuracy, safety and completeness"].map((item) => <li key={item} className="flex gap-3"><Check size={17} className="mt-0.5 shrink-0 text-primary" />{item}</li>)}
                </ul>
              </article>
            </div>

            <div className="mt-8 overflow-hidden rounded-xl border bg-card">
              <div className="grid grid-cols-2 bg-primary text-primary-foreground">
                <div className="p-4 font-bold md:p-6">Prompt engineering</div>
                <div className="border-l border-primary-foreground/20 p-4 font-bold md:p-6">Context engineering</div>
              </div>
              {[
                ["Focuses on instructions", "Designs the whole information environment"],
                ["Often improves one interaction", "Supports repeatable, multi-step workflows"],
                ["Uses objectives, constraints and formats", "Adds files, retrieval, tools, memory and permissions"],
                ["Evaluates the response", "Evaluates the response and how it was produced"],
              ].map(([prompt, context]) => (
                <div key={prompt} className="grid grid-cols-2 border-t text-sm md:text-base">
                  <div className="p-4 md:p-6">{prompt}</div>
                  <div className="border-l p-4 text-muted-foreground md:p-6">{context}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <img src="/sections/volunteering/images/abhishek-adhikari--code-for-change-open-to-open-source-ai-workflows.webp" alt="Abhishek Adhikari presenting open-source AI workflows" width="480" height="640" loading="lazy" className="mx-auto aspect-[3/4] w-full max-w-md rounded-2xl border object-cover shadow-xl" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Agentic AI without the hype</p>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">From a goal to a checked result</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">Agentic AI systems can pursue a goal through multiple steps, use tools and respond to results with varying autonomy. Reliable workflows keep the permissions, validation and human checkpoints explicit.</p>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Receive a goal", "Inspect context", "Choose approved tools", "Take a bounded action", "Evaluate the result", "Iterate or ask a person"].map((step, index) => (
                <li key={step} className="flex items-center gap-3 rounded-lg border bg-card p-4"><span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{index + 1}</span><span className="font-medium">{step}</span></li>
              ))}
            </ol>
            <a href="https://github.com/sickn33/agentic-awesome-skills" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">Explore the open-source project <Github size={18} /></a>
          </div>
        </section>

        <section id="topics" className="border-y bg-card/50 px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-7xl">
            <SectionHeading eyebrow="Training topics" title="Build judgment, not tool dependency" copy="A session combines the topics that fit the audience and the problem. It does not try to rush through everything." />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {topics.map(({ icon: Icon, title, copy }) => (
                <article key={title} className="rounded-xl border bg-background p-6">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon size={22} /></div>
                  <h3 className="mt-5 text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="audiences" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <SectionHeading eyebrow="Designed around the audience" title="Different people need different AI training" copy="The principles are shared. The examples, depth, risks and outcomes should change with the room." />
          <div className="grid gap-4 lg:grid-cols-5">
            {audiences.map((item, index) => (
              <article key={item.title} className="rounded-xl border bg-card p-6 lg:min-h-64">
                <span className="text-sm font-mono text-primary">0{index + 1}</span>
                <h3 className="mt-8 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y bg-primary text-primary-foreground">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
            <div className="flex gap-5"><Languages className="mt-1 shrink-0" size={30} /><div><h2 className="text-2xl font-bold">Nepali + English</h2><p className="mt-3 leading-relaxed text-primary-foreground/80">Sessions can mix Nepali and English so participants understand the concept while becoming comfortable with standard AI terminology.</p></div></div>
            <div className="flex gap-5"><ShieldCheck className="mt-1 shrink-0" size={30} /><div><h2 className="text-2xl font-bold">Responsible by design</h2><p className="mt-3 leading-relaxed text-primary-foreground/80">Privacy, hallucinations, bias, source checking, academic integrity and human review are working constraints in every session.</p></div></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <SectionHeading eyebrow="Session design" title="Understand. Apply. Evaluate. Build." />
          <div className="grid gap-5 md:grid-cols-4">
            {[
              ["Understand", "Learn what the technology can and cannot do."],
              ["Apply", "Work through realistic tasks with suitable tools."],
              ["Evaluate", "Check accuracy, assumptions, sources and limits."],
              ["Build", "Turn useful experiments into repeatable workflows."],
            ].map(([title, copy], index) => (
              <article key={title} className="relative rounded-xl border bg-card p-6"><span className="text-5xl font-bold text-primary/15">{index + 1}</span><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p></article>
            ))}
          </div>
          <div className="mt-12 grid gap-8 rounded-2xl bg-muted/60 p-7 md:grid-cols-2 md:p-10">
            <div><h3 className="text-2xl font-bold">What participants should leave with</h3><ul className="mt-5 grid gap-3 text-sm">{["Clearer AI instructions", "Better context and tool selection", "A method for checking important outputs", "Repeatable workflows with human review"].map(item => <li key={item} className="flex gap-3"><Check size={17} className="shrink-0 text-primary" />{item}</li>)}</ul></div>
            <div><h3 className="text-2xl font-bold">What this training is not</h3><p className="mt-5 text-sm leading-relaxed text-muted-foreground">It is not a mathematical machine-learning degree, deep neural-network architecture course, GPU infrastructure program, job guarantee or shortcut that removes human thinking. The specialization is applied generative AI and practical adoption.</p></div>
          </div>
        </section>

        <section id="faq" className="border-y bg-muted/40 px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-4xl">
            <SectionHeading eyebrow="Questions" title="AI training FAQs" />
            <div className="divide-y rounded-xl border bg-card">
              {faqs.map(([question, answer]) => (
                <details key={question} className="group p-5 md:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-bold">{question}<ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" /></summary>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="book" className="px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-foreground text-background">
            <div className="grid lg:grid-cols-[1.15fr_.85fr]">
              <div className="p-8 md:p-12 lg:p-16">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Book a session</p>
                <h2 className="mt-3 text-3xl font-bold md:text-5xl">Bring a real problem, not just a list of tools.</h2>
                <p className="mt-5 max-w-2xl leading-relaxed text-background/70">Share your organization, audience, participant count, location, experience level, desired outcome, preferred format and duration.</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="mailto:abhishekadhikari1254@gmail.com?subject=AI%20Workshop%20Enquiry" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground">Book an AI workshop <ArrowRight size={18} /></a>
                  <a href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md border border-background/25 px-6 font-semibold">Contact Abhishek</a>
                </div>
              </div>
              <img src="/sections/volunteering/images/abhishek-adhikari--prompt-engineering-jb-coffee.jpg" alt="Abhishek Adhikari delivering a prompt engineering workshop in Nepal" width="1536" height="2048" loading="lazy" className="h-full min-h-80 w-full object-cover" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Abhishek Adhikari · Nepal</p>
          <div className="flex gap-5"><a href="/">Portfolio</a><a href="https://github.com/WHOISABHISHEKADHIKARI" target="_blank" rel="noopener noreferrer">GitHub</a><a href="/contact">Contact</a></div>
        </div>
      </footer>
    </div>
  );
}
