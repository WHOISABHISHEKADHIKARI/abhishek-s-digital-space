import { useEffect } from "react";
import { absoluteUrl } from "./site";

export interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  image?: string;
}

function upsertMeta(key: "name" | "property", name: string, content: string) {
  let el = document.head.querySelector(`meta[${key}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function usePageMeta({ title, description, path, noindex, schema, image }: PageMetaInput) {
  const schemaJson = schema ? JSON.stringify(schema) : "";

  useEffect(() => {
    const canonical = absoluteUrl(path);
    document.title = title;

    upsertMeta("name", "title", title);
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:url", canonical);
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
    if (image) {
      const abs = absoluteUrl(image);
      upsertMeta("property", "og:image", abs);
      upsertMeta("property", "og:image:secure_url", abs);
      upsertMeta("name", "twitter:image", abs);
    }

    let link = document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

    const scriptId = "page-schema";
    document.getElementById(scriptId)?.remove();
    if (schemaJson) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      script.textContent = schemaJson;
      document.head.appendChild(script);
    }
  }, [title, description, path, noindex, image, schemaJson]);
}
