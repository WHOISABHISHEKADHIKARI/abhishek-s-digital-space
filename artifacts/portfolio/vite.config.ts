import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const port = Number(process.env.PORT) || 8080;
const basePath = process.env.BASE_PATH || "/";
const SITE_URL = "https://abhishekadhikari.com";

const ROUTE_META: Record<string, { title: string; description: string }> = {
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
  "/media": {
    title: "Interviews & Features – Abhishek Adhikari | AI Trainer in Nepal",
    description: "Interviews, feature stories, and public speaking appearances by an AI Trainer in Nepal on agritech, AI, open source, and digital innovation.",
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
      const canonical = `${SITE_URL}${route}`;
      const escapedTitle = meta.title.replace(/&/g, "&amp;");
      let out = base;
      out = out.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`);
      out = out.replace(/<title>[^<]*<\/title>/, `<title>${escapedTitle}</title>`);
      out = out.replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${meta.description}" />`);
      out = out.replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`);
      out = out.replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapedTitle}" />`);
      out = out.replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`);
      out = out.replace(/<meta name="twitter:url" content="[^"]*"\s*\/>/, `<meta name="twitter:url" content="${canonical}" />`);
      out = out.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapedTitle}" />`);
      out = out.replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${meta.description}" />`);

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
