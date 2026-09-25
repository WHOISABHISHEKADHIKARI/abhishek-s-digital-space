import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const port = Number(process.env.PORT) || 8080;
const basePath = process.env.BASE_PATH || "/";
const SITE_URL = "https://abhishekadhikari.com";
const AI_TRAINER_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Abhishek Adhikari",
      url: `${SITE_URL}/`,
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
      "@id": `${SITE_URL}/ai-trainer-nepal/#webpage`,
      url: `${SITE_URL}/ai-trainer-nepal/`,
      name: "AI Trainer in Nepal | Abhishek Adhikari — Practical AI",
      about: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}/ai-trainer-nepal/#service`,
      name: "Practical AI Training in Nepal",
      serviceType: "AI training and workshops",
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: { "@type": "Country", name: "Nepal" },
      url: `${SITE_URL}/ai-trainer-nepal/`,
    },
  ],
};
const AI_TRAINER_STATIC_HTML = `
    <div id="root" class="noise-overlay">
      <main style="max-width:900px;margin:0 auto;padding:64px 24px;font-family:system-ui,sans-serif;line-height:1.65">
        <h1>AI Trainer in Nepal for Practical AI, Prompt Engineering &amp; Agentic Workflows</h1>
        <p>Abhishek Adhikari is a Nepal-based AI trainer, prompt engineering practitioner, open-source contributor, technology community builder and AgriTech entrepreneur. His training focuses on practical generative AI, context engineering, agentic workflows, verification and responsible adoption.</p>
        <p><a href="#book">Book an AI workshop</a> · <a href="#topics">Explore training topics</a></p>
        <h2>Evidence behind the training</h2>
        <ul>
          <li><a href="https://kathmandu.wordcamp.org/2026/speaker/abhishek-adhikari/">WordCamp Kathmandu 2026 speaker profile</a></li>
          <li><a href="https://github.com/WHOISABHISHEKADHIKARI">Public GitHub profile and open-source work</a></li>
          <li><a href="https://github.com/sickn33/agentic-awesome-skills">Agentic Awesome Skills open-source project</a></li>
        </ul>
        <h2>Prompt Engineering Training in Nepal</h2>
        <p>Prompt engineering designs and improves instructions for an AI system. A strong prompt makes the objective, relevant context, examples, constraints and expected output clear, then evaluates the result. It is clear thinking translated into instructions, not a collection of secret phrases.</p>
        <h2>Beyond Prompt Engineering: Context Engineering</h2>
        <p>Context engineering designs the complete information environment around a task: system instructions, files, retrieved documents, examples, memory, tools, APIs, permissions and evaluation criteria. It becomes important when a task is too complex or important for a single chat message.</p>
        <h2>Agentic AI Training in Nepal</h2>
        <p>Agentic AI systems can pursue a goal through multiple steps, use tools and respond to results with varying autonomy. Reliable workflows make permissions, validation, stopping conditions and human checkpoints explicit.</p>
        <h2 id="topics">AI training topics</h2>
        <ul>
          <li>AI literacy, capabilities, limitations and hallucination checking</li>
          <li>Prompt engineering and structured outputs</li>
          <li>Context engineering, files, tools, retrieval and memory</li>
          <li>Agentic AI, reusable skills and workflow validation</li>
          <li>AI-assisted development, APIs, RAG, tests and code review</li>
          <li>Responsible AI, privacy, bias, verification and human oversight</li>
        </ul>
        <h2>Training for students, teachers, businesses and developers</h2>
        <p>Sessions are adapted to the audience. Students can focus on learning and academic integrity; teachers on educational materials and privacy; businesses on real workflows and internal knowledge; developers on APIs, retrieval, evaluations and coding agents.</p>
        <h2>How a session works</h2>
        <ol><li>Understand what the technology can and cannot do.</li><li>Apply it to realistic tasks.</li><li>Evaluate accuracy, assumptions and limitations.</li><li>Build useful experiments into repeatable workflows.</li></ol>
        <h2>Responsible AI</h2>
        <p>The goal is not to trust AI more. The goal is to use AI more intelligently. Training covers hallucinations, privacy, confidential information, bias, source checking, academic integrity and sensible automation boundaries.</p>
        <h2 id="book">Book an AI Training Session in Nepal</h2>
        <p>Share your organization, audience, participant count, location, current experience, desired outcome, preferred format and duration.</p>
        <p><a href="mailto:abhishekadhikari1254@gmail.com?subject=AI%20Workshop%20Enquiry">Book an AI workshop</a> · <a href="/contact">Contact Abhishek</a></p>
      </main>
    </div>`;

const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/ai-trainer-nepal": {
    title: "AI Trainer in Nepal | Abhishek Adhikari — Practical AI",
    description: "Practical AI training in Nepal by Abhishek Adhikari, covering prompt engineering, context engineering, responsible AI and agentic workflows.",
  },
  "/about": {
    title: "About – Abhishek Adhikari | AI Trainer in Nepal",
    description: "AI trainer, prompt engineering specialist, and agritech entrepreneur from Hetauda, Nepal. 1,500+ students trained, WordCamp speaker, Global Top 10 AI skills contributor.",
  },
  "/ai-training": {
    title: "AI Training – Abhishek Adhikari | AI Trainer in Nepal",
    description: "AI training workshops and prompt engineering sessions by an AI Trainer in Nepal. 1,500+ students trained on ChatGPT, Claude, Gemini, and AI literacy across schools, colleges, and community events.",
  },
  "/experience": {
    title: "Experience – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Professional experience of an AI Trainer in Nepal — Co-Founder of DEV Community Nepal, Founder of Himalaya Krishi & Hashtag Web Solutions, Product Designer at Sajilo Patro.",
  },
  "/work": {
    title: "Projects – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Digital products built by an AI Trainer in Nepal — Krishi Himalaya, 100SEOTools, Redesign Profile, JNB Coffee, Murraa, Hetaudacity across agritech, SEO, and branding.",
  },
  "/volunteering": {
    title: "Volunteering – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Community leadership by an AI Trainer in Nepal — Co-organizer of AWS Cloud Technology Conference 2026, Panelist at Hult Prize, Mentor at Code for Change, Arduino Instructor, and Prompt Engineering Facilitator.",
  },
  "/certifications": {
    title: "Certifications – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Professional certifications earned by an AI Trainer in Nepal — Google UX Design, Google Digital Garage, CalArts Graphic Design, IoT enCypher, and community builder awards.",
  },
  "/news": {
    title: "News & Media – Abhishek Adhikari | AI Trainer in Nepal",
    description: "News coverage of an AI Trainer in Nepal — ICT Frame global top-10 coverage, HRIC STEAM Program leadership, Hult Prize panel, AWS Cloud Technology Conference co-organization, and Krishi Pradarshani speaking.",
  },
  "/recommendations": {
    title: "Recommendations – Abhishek Adhikari | AI Trainer in Nepal",
    description: "LinkedIn recommendations from industry professionals endorsing an AI Trainer in Nepal — Tanka Bhattarai, Lava Kafle, and other industry professionals.",
  },
  "/blog": {
    title: "Blog – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Articles by an AI Trainer in Nepal on UI/UX design trends, agritech in Nepal, React best practices, content strategy, user research methods, and no-code development.",
  },
  "/contact": {
    title: "Contact – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Book an AI training workshop, discuss prompt engineering, or collaborate on agritech. Contact Abhishek Adhikari via email, LinkedIn, or the contact form.",
  },
};

function routeHtmlPlugin(): Plugin {
  const distDir = path.resolve(import.meta.dirname, "dist/public");
  const emitRoutePages = () => {
    const base = readFileSync(path.join(distDir, "index.html"), "utf8");
    for (const [route, meta] of Object.entries(ROUTE_META)) {
      const canonical = route === "/ai-trainer-nepal" ? `${SITE_URL}${route}/` : `${SITE_URL}${route}`;
      const escapedTitle = meta.title.replace(/&/g, "&amp;");
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

      if (route === "/ai-trainer-nepal") {
        out = out.replace(
          /<meta name="keywords" content="[^"]*"\s*\/>/,
          '<meta name="keywords" content="AI trainer Nepal, AI training Nepal, prompt engineering Nepal, context engineering Nepal, agentic AI Nepal, AI workshop Nepal" />',
        );
        out = out.replace(
          /\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g,
          "",
        );
        out = out.replace(
          /\s*<script id="profile-data" type="application\/json">[\s\S]*?<\/script>/,
          "",
        );
        out = out.replace(
          /<div id="root" class="noise-overlay">[\s\S]*<\/div>\s*<\/body>/,
          `${AI_TRAINER_STATIC_HTML}\n  </body>`,
        );
        out = out.replace(
          "</head>",
          `    <script type="application/ld+json">${JSON.stringify(AI_TRAINER_SCHEMA)}</script>\n  </head>`,
        );
      }

      const dir = path.join(distDir, route.replace(/^\//, ""));
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
