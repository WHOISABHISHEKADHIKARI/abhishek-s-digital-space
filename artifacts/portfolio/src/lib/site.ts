export const SITE_URL = "https://abhishekadhikari.com";

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function assetUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  return /^https?:\/\//.test(path) ? path : absoluteUrl(path);
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function personRef() {
  return { "@id": `${SITE_URL}/#person` };
}

export const NAV_LINKS: Array<{ href: string; label: string }> = [
  { href: "/ai-trainer-nepal/", label: "AI Trainer" },
  { href: "/ai-training", label: "AI Training" },
  { href: "/open-source", label: "Open Source" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/news", label: "News" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const FOOTER_LINKS: Array<{ href: string; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ai-trainer-nepal/", label: "AI Trainer in Nepal" },
  { href: "/ai-training", label: "Corporate AI Training" },
  { href: "/open-source", label: "Open Source" },
  { href: "/experience", label: "Experience" },
  { href: "/work", label: "Work" },
  { href: "/volunteering", label: "Volunteering" },
  { href: "/certifications", label: "Certifications" },
  { href: "/news", label: "News & Media" },
  { href: "/recommendations", label: "Recommendations" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];
