export const SITE_URL = "https://abhishekadhikari.com";
export const PAGE_URL = `${SITE_URL}/ai-trainer-nepal/`;
export const PAGE_TITLE = "AI Trainer in Nepal | Abhishek Adhikari — Practical AI";
export const PAGE_DESCRIPTION =
  "Practical AI training in Nepal by Abhishek Adhikari, covering prompt engineering, context engineering, responsible AI and agentic workflows.";

export const AI_TRAINER_FAQ: Array<[string, string]> = [
  [
    "What does an AI trainer in Nepal teach?",
    "An AI trainer helps people apply artificial intelligence to real tasks. Sessions can cover AI literacy, prompt engineering, context engineering, research, verification, agentic workflows, automation and responsible use.",
  ],
  [
    "Do I need coding skills?",
    "No. Foundational workshops for students, teachers, teams and professionals do not require coding. Developer sessions can go deeper into APIs, RAG, structured outputs and agent workflows.",
  ],
  [
    "What is context engineering?",
    "Context engineering designs the full information environment around an AI task: instructions, files, retrieved documents, examples, memory, tools, permissions and evaluation rules.",
  ],
  [
    "What is agentic AI?",
    "Agentic AI describes systems that can work toward a goal over multiple steps, use approved tools, evaluate results and ask for human review when needed.",
  ],
  [
    "What tools are covered?",
    "Sessions may use ChatGPT, Claude, Gemini and other tools suited to the task. The durable focus is task definition, context, workflow design, verification and responsible use.",
  ],
  [
    "Can colleges and companies book a workshop?",
    "Request an AI training proposal and share your audience, goals, preferred date and delivery preference. Format and availability are confirmed during the enquiry.",
  ],
];

export const AI_TRAINER_CITATIONS = [
  {
    number: 1,
    title: "Abhishek Adhikari — WordCamp Kathmandu 2026 speaker profile",
    publisher: "WordCamp Kathmandu",
    href: "https://kathmandu.wordcamp.org/2026/speaker/abhishek-adhikari/",
    supports: "Speaker status, session title and public description of AI, open-source, community and AgriTech work.",
  },
  {
    number: 2,
    title: "WHOISABHISHEKADHIKARI on GitHub",
    publisher: "GitHub",
    href: "https://github.com/WHOISABHISHEKADHIKARI",
    supports: "Public developer identity, repositories and open-source activity.",
  },
  {
    number: 3,
    title: "Agentic Awesome Skills",
    publisher: "GitHub",
    href: "https://github.com/sickn33/agentic-awesome-skills",
    supports: "Canonical open-source repository for the reusable agent skills project.",
  },
  {
    number: 4,
    title: "Abhishek Adhikari (@whoisabhishek)",
    publisher: "Luma",
    href: "https://luma.com/user/whoisabhishek",
    supports: "Public events identity and hosted or attended technology events.",
  },
  {
    number: 5,
    title: "sickn33/agentic-awesome-skills repository rank",
    publisher: "Star History",
    href: "https://www.star-history.com/sickn33/agentic-awesome-skills/",
    supports: "Live third-party repository star and global-rank history; this is not an individual contributor ranking.",
  },
];

export function buildAITrainerNepalSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Abhishek Adhikari",
        url: SITE_URL,
        image: `${SITE_URL}/abhishek-adhikari-ai-trainer-nepal-hero.webp`,
        description:
          "Nepal-based AI trainer and practitioner focused on practical generative AI, prompt engineering, context engineering and agentic workflows.",
        homeLocation: { "@type": "Country", name: "Nepal" },
        sameAs: [
          "https://github.com/WHOISABHISHEKADHIKARI",
          "https://www.linkedin.com/in/whoisabhishek/",
          "https://luma.com/user/whoisabhishek",
          "https://kathmandu.wordcamp.org/2026/speaker/abhishek-adhikari/",
        ],
        subjectOf: [
          {
            "@type": "WebPage",
            url: "https://kathmandu.wordcamp.org/2026/speaker/abhishek-adhikari/",
            name: "Abhishek Adhikari — WordCamp Kathmandu 2026",
          },
          { "@type": "ProfilePage", url: "https://luma.com/user/whoisabhishek", name: "Abhishek Adhikari on Luma" },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        about: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
        citation: AI_TRAINER_CITATIONS.map((source) => source.href),
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
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "AI Trainer in Nepal", item: PAGE_URL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: AI_TRAINER_FAQ.map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text },
        })),
      },
    ],
  };
}
