import { ExternalLink, Github, Linkedin, Mail, Award, Bot, GraduationCap, Users } from "lucide-react";
import SiteLayout from "@/components/site-layout";
import { SectionHeading } from "@/components/page-parts";
import ImageWithSkeleton from "@/components/image-with-skeleton";
import SocialProofGallery from "@/components/social-proof-gallery";
import { usePageMeta } from "@/lib/use-page-meta";
import { useProfileData } from "@/lib/use-profile-data";
import { OPEN_SOURCE_FACTS } from "@/lib/profile-data";

const TITLE = "Abhishek Adhikari | AI Trainer in Nepal – Prompt Engineering, AI Literacy & Digital Training";
const DESCRIPTION =
  "Abhishek Adhikari — Nepal's AI trainer in prompt engineering, AI literacy, and digital productivity. Spoke at WordCamp Kathmandu 2026. Listed #1 in 'Most Commits' and #2 in 'Most Skills Added' in the Agentic Awesome Skills README (checked October 11, 2026). 125 skills added through 36 merged pull requests.";

const STATS: Array<[string, string]> = [
  ["125", "AI skills added"],
  ["36", "Merged PRs"],
  ["100+", "Community events"],
  ["220+", "Livestock capacity"],
];

const EVIDENCE = [
  {
    icon: Bot,
    label: "Open source",
    title: `${OPEN_SOURCE_FACTS.skillsAdded} AI agent skills, ${OPEN_SOURCE_FACTS.mergedPRs} merged PRs`,
    copy: "Reusable agent skills contributed to Agentic Awesome Skills. README lists the account #1 under “Most Commits” and #2 under “Most Skills Added”.",
    href: "/open-source",
  },
  {
    icon: GraduationCap,
    label: "Public speaking",
    title: "Spoke at WordCamp Kathmandu 2026",
    copy: "Session “Prompt Smarter, Not Harder” — practical prompting and AI workflows for creators and developers.",
    href: "https://kathmandu.wordcamp.org/2026/speaker/abhishek-adhikari/",
  },
  {
    icon: Users,
    label: "Community",
    title: "Co-founder, DEV Community Nepal",
    copy: "100+ virtual events and 10+ physical events connecting rural and central tech communities across Nepal.",
    href: "/experience",
  },
  {
    icon: Award,
    label: "Training",
    title: "AI literacy for real audiences",
    copy: "Sessions for students, teachers, HR teams, professionals and businesses — from schools to corporate teams.",
    href: "/ai-training",
  },
];

const EXPLORE = [
  { href: "/about", title: "About", copy: "Background, focus areas and skills." },
  { href: "/ai-trainer-nepal/", title: "AI Trainer in Nepal", copy: "The full trainer profile and approach." },
  { href: "/ai-training", title: "Corporate AI Training", copy: "Workshops for teams and organizations." },
  { href: "/experience", title: "Experience", copy: "Roles across agritech, design and growth." },
  { href: "/work", title: "Work", copy: "Products and websites built across Nepal." },
  { href: "/volunteering", title: "Volunteering", copy: "Community teaching and mentorship." },
  { href: "/certifications", title: "Certifications", copy: "Verified credentials and awards." },
  { href: "/news", title: "News & Media", copy: "Coverage, recognition and interviews." },
  { href: "/recommendations", title: "Recommendations", copy: "What mentors and clients say." },
];

const GALLERY = [
  { src: "/sections/volunteering/images/abhishek-adhikari--ai-digital-literacy-workshop.jpeg", alt: "AI and digital literacy workshop session", caption: "AI digital literacy workshop" },
  { src: "/sections/volunteering/images/abhishek-adhikari--nirmal-secondary-school-ict-ai-digital-literacy-training.webp", alt: "Teacher training on ICT and AI at Nirmal Secondary School", caption: "Teacher training — Nirmal School" },
  { src: "/sections/volunteering/images/abhishek-adhikari--prompt-engineering-jb-coffee.jpg", alt: "Prompt engineering workshop at J&B Coffee Hetauda", caption: "Prompt engineering workshop" },
  { src: "/sections/volunteering/images/abhishek-adhikari--hcdpn-ai-prompt-hr-professionals.webp", alt: "AI prompt session with HR professionals", caption: "AI prompts for HR professionals" },
  { src: "/sections/volunteering/images/abhishek-adhikari--aws-cloud-innovation-day-hetauda-2026.webp", alt: "AWS Cloud Innovation Day Hetauda 2026", caption: "AWS Cloud Innovation Day 2026" },
  { src: "/sections/volunteering/images/abhishek-adhikari--code-for-change-open-to-open-source-ai-workflows.webp", alt: "Open-source AI workflows session", caption: "Open-source AI workflows" },
  { src: "/sections/volunteering/images/abhishek-adhikari--arduino-robotics-workshop-trainer.jpeg", alt: "Arduino robotics workshop instruction", caption: "Arduino robotics workshop" },
  { src: "/sections/media/images/abhishek-adhikari--wordcamp-kathmandu-2026-speaker.jpg", alt: "WordCamp Kathmandu 2026 speaker", caption: "WordCamp Kathmandu 2026" },
  { src: "/sections/volunteering/images/abhishek-adhikari--hult-prize-iof-panelist.jpeg", alt: "Hult Prize IOF Hetauda panel", caption: "Hult Prize panel" },
  { src: "/sections/volunteering/images/abhishek-adhikari--hsmss-10-days-ux-bootcamp.jpeg", alt: "10-day UI/UX bootcamp at HSMSS", caption: "10-day UI/UX bootcamp" },
  { src: "/sections/volunteering/images/abhishek-adhikari--code-for-change-chitwan-figma-workshop.jpeg", alt: "Figma UI/UX workshop, Code for Change Chitwan", caption: "Figma workshop — Chitwan" },
  { src: "/sections/news/images/abhishek-adhikari--hric-steam-program-2025-hetauda.jpeg", alt: "HRIC STEAM Program 2025 Hetauda", caption: "HRIC STEAM Program 2025" },
];

export default function Portfolio() {
  const data = useProfileData();
  const profile = data?.profile;

  usePageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: "/",
  });

  return (
    <SiteLayout>
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.14),transparent_35%),radial-gradient(circle_at_85%_70%,hsl(var(--accent)/0.12),transparent_30%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-5 inline-flex items-center rounded-full border bg-card/70 px-3 py-1.5 text-xs font-semibold text-primary">
              Practical AI training from Nepal
            </p>
            <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-6xl">
              Abhishek Adhikari, AI Trainer in Nepal
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              I help people and businesses use AI tools effectively — from ChatGPT to Claude to Gemini — without needing
              a technical background. The focus is on clear instructions, useful context, verification and repeatable
              workflows.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Spoke at WordCamp Kathmandu 2026. Open-source contributor to Agentic Awesome Skills, with{" "}
              <strong className="text-foreground">{OPEN_SOURCE_FACTS.skillsAdded} AI agent skills added through {OPEN_SOURCE_FACTS.mergedPRs} merged pull requests</strong>.
              Founder of Himalaya Krishi and co-founder of DEV Community Nepal, based in Hetauda, Nepal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-primary px-5 font-semibold text-primary-foreground transition hover:bg-primary/90">
                <Mail size={18} /> Book a training
              </a>
              <a href="/ai-trainer-nepal/" className="inline-flex min-h-12 items-center rounded-lg border bg-card px-5 font-semibold transition hover:bg-muted">
                AI Trainer profile
              </a>
              <a href={profile?.linkedin ?? "https://www.linkedin.com/in/whoisabhishekadhikari"} target="_blank" rel="me noreferrer" aria-label="LinkedIn" className="inline-flex min-h-12 items-center rounded-lg border bg-card px-4 transition hover:bg-muted">
                <Linkedin size={18} />
              </a>
              <a href={profile?.github ?? "https://github.com/WHOISABHISHEKADHIKARI"} target="_blank" rel="me noreferrer" aria-label="GitHub" className="inline-flex min-h-12 items-center rounded-lg border bg-card px-4 transition hover:bg-muted">
                <Github size={18} />
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-sm">
            <div className="relative">
              <div className="absolute -inset-3 rotate-2 rounded-[1.5rem] bg-primary/10" aria-hidden="true" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border bg-muted shadow-2xl">
                <ImageWithSkeleton
                  src="/abhishek-adhikari-ai-trainer-nepal-hero-tiny.jpg"
                  srcSet="/abhishek-adhikari-ai-trainer-nepal-hero-416.jpg 416w, /abhishek-adhikari-ai-trainer-nepal-hero-tiny.jpg 520w"
                  sizes="(min-width: 1024px) 384px, 90vw"
                  alt="Abhishek Adhikari, AI trainer in Nepal — portrait of the prompt engineering educator from Hetauda"
                  width={520}
                  height={650}
                  fetchPriority="high"
                  className="h-full w-full object-cover"
                  wrapperClassName="h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-10 md:grid-cols-4 md:px-8">
          {STATS.map(([value, label]) => (
            <div key={label} className="rounded-xl border bg-background px-6 py-8 text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">{value}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <SocialProofGallery items={GALLERY} />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          eyebrow="Evidence, not adjectives"
          title="Work you can inspect"
          copy="Speaker profiles, GitHub activity and real training environments make the expertise easier to verify."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EVIDENCE.map(({ icon: Icon, label, title, copy, href }) => {
            const external = href.startsWith("http");
            return (
              <a
                key={title}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex flex-col rounded-xl border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon size={22} />
                </span>
                <span className="mt-5 text-xs font-semibold uppercase tracking-widest text-primary">{label}</span>
                <h3 className="mt-2 text-lg font-bold leading-snug group-hover:text-primary">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                {external && <ExternalLink size={15} className="mt-4 text-muted-foreground" />}
              </a>
            );
          })}
        </div>
      </section>

      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="AI training"
                title="Training that fits the room"
                copy="Foundational sessions for students, teachers and non-technical teams; deeper sessions for developers. Every session mixes Nepali and English, and treats privacy, hallucination and verification as working constraints."
              />
              <div className="flex flex-wrap gap-3">
                <a href="/ai-training" className="inline-flex min-h-12 items-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground transition hover:bg-primary/90">
                  Corporate training
                </a>
                <a href="/ai-trainer-nepal/" className="inline-flex min-h-12 items-center rounded-lg border bg-background px-5 font-semibold transition hover:bg-muted">
                  AI Trainer profile
                </a>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                ["Students", "Explanations, research, practice and coding with academic integrity."],
                ["Teachers", "Lesson planning, materials and admin with verification built in."],
                ["Businesses", "Research, communication, documentation and operations workflows."],
                ["Developers", "Coding agents, APIs, retrieval, evaluations and reusable skills."],
              ].map(([title, copy]) => (
                <li key={title} className="rounded-xl border bg-background p-5">
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading eyebrow="Explore" title="More about the work" copy="Each area has its own page with the details and evidence." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE.map((card) => (
            <a key={card.href} href={card.href} className="rounded-xl border bg-card p-6 transition hover:-translate-y-1 hover:border-primary/50">
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.copy}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 md:px-8 md:pb-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-foreground p-8 text-background md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get started</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Bring a real problem, not just a list of tools.</h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-background/70">
            Share your organization, audience, participant count, location, experience level and desired outcome. You
            will get a proposal scoped to the room.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="/contact" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary px-6 font-semibold text-primary-foreground">
              Contact Abhishek <Mail size={18} />
            </a>
            <a href="/open-source" className="inline-flex min-h-12 items-center justify-center rounded-md border border-background/25 px-6 font-semibold">
              See open-source work
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
