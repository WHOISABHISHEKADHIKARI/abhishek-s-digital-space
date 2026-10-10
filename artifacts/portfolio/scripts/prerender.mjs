import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist", "public");

const profile = JSON.parse(
  readFileSync(path.join(root, "public", "abhishek_profile.json"), "utf8"),
);

globalThis.__PROFILE_DATA__ = profile;

const server = await createServer({
  root,
  configFile: path.join(root, "vite.config.ts"),
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "warn",
});

const { renderPage } = await server.ssrLoadModule("/src/ssr.tsx");

function walk(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (entry.name === "index.html") acc.push(full);
  }
  return acc;
}

const rootDiv = /<div id="root"><\/div>/;
const files = walk(distDir);
let count = 0;

for (const file of files) {
  const dirName = path.dirname(path.relative(distDir, file));
  let route = dirName === "." ? "/" : `/${dirName.replaceAll(path.sep, "/")}`;
  if (route === "/ai-trainer-nepal") route = "/ai-trainer-nepal/";

  const html = readFileSync(file, "utf8");
  if (!rootDiv.test(html)) continue;

  const body = renderPage(route);
  const out = html.replace(rootDiv, `<div id="root">${body}</div>`);
  writeFileSync(file, out);
  count += 1;
  console.log(`prerendered ${route} (${body.length} chars of markup)`);
}

await server.close();
console.log(`Prerendered ${count} route pages.`);