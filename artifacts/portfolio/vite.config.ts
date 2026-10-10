import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const port = Number(process.env.PORT) || 8080;
const basePath = process.env.BASE_PATH || "/";
const SITE_URL = "https://abhishekadhikari.com";

const PERSON_SCHEMA = {
  "@context": "https://schema.org",
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
    "https://luma.com/user/whoisabhishek",
    "https://kathmandu.wordcamp.org/2026/speaker/abhishek-adhikari/",
  ],
  knowsLanguage: ["English", "Nepali", "Hindi"],
  subjectOf: [
    { "@type": "WebPage", url: "https://kathmandu.wordcamp.org/2026/speaker/abhishek-adhikari/", name: "Abhishek Adhikari — WordCamp Kathmandu 2026" },
    { "@type": "ProfilePage", url: "https://luma.com/user/whoisabhishek", name: "Abhishek Adhikari on Luma" },
  ],
};

const ROUTE_META: Record<string, { title: string; description: string; keywords?: string; noindex?: boolean }> = {
  "/": {
    title: "Abhishek Adhikari | AI Trainer in Nepal – Prompt Engineering, AI Literacy & Digital Training",
    description: "Abhishek Adhikari — Nepal's AI trainer in prompt engineering, AI literacy, and digital productivity. 1,500+ students trained, WordCamp Kathmandu 2026 speaker. Listed #1 in 'Most Commits' and #2 in 'Most Skills Added' in the Agentic Awesome Skills README. AI workshops for schools, colleges, and businesses in Nepal.",
    keywords: "AI trainer Nepal, artificial intelligence training Nepal, prompt engineering Nepal, AI workshop Nepal, AI literacy Nepal, AI training Hetauda, ChatGPT training Nepal, AI education Nepal, Abhishek Adhikari, agritech Nepal, community builder, Hetauda, Nepal",
  },
  "/ai-trainer-nepal/": {
    title: "AI Trainer in Nepal | Abhishek Adhikari — Practical AI",
    description: "Practical AI training in Nepal by Abhishek Adhikari, covering prompt engineering, context engineering, responsible AI and agentic workflows. 125 skills added through 36 merged PRs to Agentic Awesome Skills. WordCamp Kathmandu 2026 speaker.",
    keywords: "AI trainer Nepal, AI training Nepal, prompt engineering Nepal, context engineering Nepal, agentic AI Nepal, AI workshop Nepal, Abhishek Adhikari, WordCamp Kathmandu",
  },
  "/about": {
    title: "About – Abhishek Adhikari | AI Trainer in Nepal",
    description: "AI trainer, prompt engineering specialist, and agritech entrepreneur from Hetauda, Nepal. 1,500+ students trained, WordCamp speaker. Listed #1 in 'Most Commits' and #2 in 'Most Skills Added' in the Agentic Awesome Skills README. 125 skills added through 36 merged pull requests.",
  },
  "/ai-training": {
    title: "Corporate AI Training in Nepal | Abhishek Adhikari",
    description: "Corporate AI training workshops for SMEs, HR teams, teachers, and non-technical staff. Practical prompt engineering, context engineering, and agentic workflow sessions. On-site in Nepal and virtual delivery.",
    keywords: "corporate AI training Nepal, AI workshop Nepal, prompt engineering workshop Nepal, AI literacy corporate training, SME AI training Nepal",
  },
  "/experience": {
    title: "Experience – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Professional experience of Abhishek Adhikari — Co-Founder of DEV Community Nepal, Founder of Himalaya Krishi & Hashtag Web Solutions, Product Designer at Sajilo Patro, and roles at Aayo Rides Nepal, Kisan Care, IT Club HSMSS, and Menzz.",
  },
  "/work": {
    title: "Projects – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Digital products built by Abhishek Adhikari — Krishi Himalaya, 100SEOTools, Redesign Profile, JNB Coffee, Murraa, Hetaudacity, Himalaya Krishi, Aayo Rides, and more across agritech, SEO, coffee, and business sectors.",
  },
  "/volunteering": {
    title: "Volunteering – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Community leadership and mentorship by Abhishek Adhikari — Co-organizer of AWS Cloud Technology Conference 2026, Panelist at Hult Prize, Mentor at Code for Change, Arduino Instructor, Prompt Engineering Facilitator, and DEV Community Nepal organizer.",
  },
  "/certifications": {
    title: "Certifications – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Professional certifications earned by Abhishek Adhikari — Google UX Design Professional Certificate, Google Digital Garage, CalArts Graphic Design, IoT enCypher, and community builder awards from DEV Community Nepal, Coding Olympics Nepal, and others.",
  },
  "/news": {
    title: "News & Media – Abhishek Adhikari | AI Trainer in Nepal",
    description: "News coverage and recognition of Abhishek Adhikari — ICT Frame open-source contribution recognition, HRIC STEAM Program leadership, Hult Prize panel, AWS Cloud Technology Conference co-organization, Krishi Pradarshani speaking, and Prompt Engineering roadmap contributor recognition.",
  },
  "/recommendations": {
    title: "Recommendations – Abhishek Adhikari | AI Trainer in Nepal",
    description: "LinkedIn recommendations for Abhishek Adhikari from industry professionals — Tanka Bhattarai, Lava Kafle, Jagadish Bidari, Upendra Prasad Neupane, Sushovan Paudyal, and Rajiv Raman Neupane.",
  },
  "/blog": {
    title: "Blog – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Articles by Abhishek Adhikari on UI/UX design trends, agritech in Nepal, React performance best practices, content strategy, user research methods, and no-code development.",
  },
  "/contact": {
    title: "Contact – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Book an AI training workshop, discuss prompt engineering, or collaborate on agritech. Contact Abhishek Adhikari via email, LinkedIn, or the contact form.",
  },
  "/open-source": {
    title: "Open-Source Contributions – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Open-source contributions by Abhishek Adhikari — 125 AI agent skills added through 36 merged pull requests to Agentic Awesome Skills, including 106 SME operations skills. Listed #1 in 'Most Commits' and #2 in 'Most Skills Added' in the repository README (verified October 11, 2026).",
    keywords: "open source AI Nepal, Agentic Awesome Skills contributor, AI skills open source, Abhishek Adhikari GitHub",
  },
  "/ai-training-sme-operations": {
    title: "AI Training for SME Operations – Abhishek Adhikari",
    description: "AI training for SME operations covering accounting, HR, reporting, governance, and inventory workflows. Based on 106 open-source skills contributed to Agentic Awesome Skills. Draft page — content pending confirmation.",
    noindex: true,
  },
  "/ai-training-hr-nepal": {
    title: "AI Training for HR Professionals in Nepal – Abhishek Adhikari",
    description: "AI training for HR teams covering prompt engineering, recruitment workflows, and employee communications. Draft page — content pending confirmation of workshop details.",
    noindex: true,
  },
  "/ai-training-teachers-nepal": {
    title: "AI Training for Teachers in Nepal – Abhishek Adhikari",
    description: "AI training for teachers and educators covering lesson planning, content creation, and student engagement. Draft page — content pending confirmation of workshop agenda and delivery options.",
    noindex: true,
  },
  "/agentic-ai-skills-workshop": {
    title: "Agentic AI Skills Workshop – Abhishek Adhikari",
    description: "Hands-on workshop on building agentic AI workflows using reusable skills. Based on open-source contributions to Agentic Awesome Skills. Draft page — curriculum and availability pending confirmation.",
    noindex: true,
  },
};

function routeHtmlPlugin(): Plugin {
  const distDir = path.resolve(import.meta.dirname, "dist/public");
  const emitRoutePages = () => {
    const base = readFileSync(path.join(distDir, "index.html"), "utf8");
    for (const [route, meta] of Object.entries(ROUTE_META)) {
      const canonicalRoute = route === "/ai-trainer-nepal/" ? "/ai-trainer-nepal/" : route;
      const canonical = `${SITE_URL}${canonicalRoute}`;
      const escapedTitle = meta.title.replace(/&/g, "&");
      let out = base;
      out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`);
      out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapedTitle}</title>`);
      out = out.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${meta.description}" />`);
      out = out.replace(/<meta name="title" content="[^"]*"\s*\/>/, `<meta name="title" content="${escapedTitle}" />`);
      out = out.replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`);
      out = out.replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapedTitle}" />`);
      out = out.replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`);
      out = out.replace(/<meta name="twitter:url" content="[^"]*"\s*\/>/, `<meta name="twitter:url" content="${canonical}" />`);
      out = out.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapedTitle}" />`);
      out = out.replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${meta.description}" />`);

      if (meta.keywords) {
        out = out.replace(
          /<meta name="keywords" content="[^"]*"\s*\/>/,
          `<meta name="keywords" content="${meta.keywords}" />`,
        );
      }

      if (meta.noindex) {
        out = out.replace(
          /<meta name="robots" content="[^"]*"\s*\/>/,
          `<meta name="robots" content="noindex, follow" />`,
        );
      } else {
        out = out.replace(
          /<meta name="robots" content="[^"]*"\s*\/>/,
          `<meta name="robots" content="index, follow, max-image-preview:large" />`,
        );
      }

      if (route === "/ai-trainer-nepal/") {
        out = out.replace(
          /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
          "",
        );
        out = out.replace(
          /\s*<script id="profile-data" type="application\/json">[\s\S]*?<\/script>/,
          "",
        );
      }

      const dir = path.join(distDir, canonicalRoute.replace(/^\//, "").replace(/\/$/, ""));
      mkdirSync(dir, { recursive: true });
      writeFileSync(path.join(dir, "index.html"), out);
    }
  };
  return {
    name: "generate-route-pages",
    apply: "build",
    closeBundle() {
      emitRoutePages();
    },
  };
}

function inlineProfileData(): Plugin {
  return {
    name: "inline-profile-data",
    apply: "build",
    transformIndexHtml(html) {
      const data = readFileSync(
        path.resolve(import.meta.dirname, "public/abhishek_profile.json"),
        "utf8",
      );
      const escaped = data.replace(/</g, "\\u003c");
      const script = `    <script id="profile-data" type="application/json">${escaped}</script>\n`;
      return html.replace("</head>", `${script}  </head>`);
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    inlineProfileData(),
    routeHtmlPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
    minify: "terser",
    terserOptions: {
      compress: { passes: 2 },
      mangle: true,
    },
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});