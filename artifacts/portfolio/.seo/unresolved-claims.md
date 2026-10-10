# Unresolved claims & owner-decisions backlog (PRIVATE — do not publish)

Status as of: 2026-10-11 (browser/API checks; owner verification still required where marked).

These are claims that could not be verified from public sources (or that depend on
owner-supplied documents). They must NOT appear on the public site as verified facts,
and they are tracked here so the owner can resolve or consciously keep them.

---

## Claims/identity

| # | Claim | Status | Why unresolved | Resolution path |
|---|-------|--------|----------------|-----------------|
| 1 | LinkedIn vanity slug `whoisabhishekadhikari` (canonical identity) | UNVERIFIED online | LinkedIn blocks anonymous access; cannot curl the profile URL. The owner's audit directive defines this as canonical and the Luma bio references it. | Owner verifies in a logged-in browser: https://www.linkedin.com/in/whoisabhishekadhikari |
| 2 | Instagram canonical `whoisabhishekadhikari` | PARTIAL | Same login wall. Luma bio corroborates it. | Owner screenshots profile for audit record. |
| 3 | Hacktoberfest Pulchowk 2026 "judge" title | EXCLUDED | Source is Instagram post Ddb0LWtP5Kh (login-gated) and the poster image. Per the latest directive the judge claim is removed site-wide. | Removed from `mediaAppearances` and from the sitemap image list this pass. Do not reinstate without an independently verifiable source. |
| 4 | "Open to Open Source" mentor title (Graphilla pre-event, Sep 25 2026) | USER-SUPPLIED | Poster image evidence only; event page names Abhishek as host of the Luma event but not the printed role. | Owner confirms printed role. |
| 5 | "1,500+ students trained on prompt engineering / AI literacy" | REMOVED | No public tally or official source located tracing this number. It was self-reported. | Removed from all public copy this pass (index.html, vite.config ROUTE_META, `public/abhishek_profile.json`, llms.txt). Training is described qualitatively instead. Owner may reinstate only with a source, marked "self-reported". |
| 6 | Medium handle `@abhishekadhikari1254` + RSS feed | PARTIAL | Feed is fetched at runtime from rss2json; not independently verified this pass. Blog page degrades gracefully on failure. | Owner confirms the Medium profile exists / is intended. |
| 7 | Event: "Build Your Career with AI Workflows" | FOUND | Resolved this pass — https://lu.ma/eyevf4x7 (2026-09-10, 10:00–13:00), hosted by Abhishek Adhikari + Nirajan Subedi. | Publish as a distinct "Open to Open Source" event (do not merge with the Sep 25 `gd5zeuli` event). |
| 8 | Event: "Building Applications with IBM Bob" | FOUND (not a role) | https://lu.ma/jxeyh7fd (2026-09-01, Hotel Dragon). Host is Upendra Prasad Neupane; Abhishek's name appears but no host/speaker role is verified. | Do not publish as a role (`publishable: false` in the evidence register). |
| 9 | Secure Developer Conference Nepali-calendar branding ("2083") | AMBIGUOUS | Conference branded as "Secure Developer Conference 2083" (Vikram Samvat) in some materials and "2026" in English in others. | Keep "Secure Developer Conference 2026" as the canonical English label; flag collision. |

## Historical/stale claims kept only with historical framing

| # | Claim | How to frame |
|---|-------|--------------|
| 10 | ICT Frame article (Jun 2026): "#10 top contributor", "3,701+ lines", "11 additions", "~40,000 users", repo called "Antigravity Awesome Skills" | Present as *historical press coverage* only. Never cite its numbers as current; the repo is now "agentic-awesome-skills" with 125 skills / 36 PRs. |
| 11 | Colleges Nepal editorial feature "Top AI Trainer in Nepal (2026)" with "14 skills / 13 PRs / 41k+ stars" and "Global Top 10" | Present as *attributed editorial feature* (byline: CColleges Nepal Editorial) with a disclaimer; do not present as an official ranking and do not reuse its stale figures. |
| 12 | 100SEOTools promotional page "AI Trainer in Nepal" | Cite as self-published promotion only (owner-owned). |
| 13 | "41k+ stars" phrasing on the open-source news item | Removed from public copy; repository star count is not verified current this pass. |

## Owner-supplied / employer-photographic evidence (not externally verifiable)

- Aayo Rides launch: 4 new outlets (Chitwan/Dang/Butwal), 200+ riders onboarded, ~20,000 app downloads in Hetauda, "Rs 10 for 5 km" campaign.
- Himalaya Krishi: livestock scaled 25 → 220+ Murrah buffalo; farm digital record systems.
- DEV Community Nepal: 100+ virtual events, 10+ physical events, community-partner support.
- IT Club HSMSS / Coding Olympics Nepal: 5+ events, 16+ colleges reached.
- Sajilo Patro, Kisan Care, Menzz, enCypher IoT internship, Figma/Arduino workshops: rely on internal certificates/PDFs.
These stay as owner-provided narrative; each is backed by a certificate/PDF/photo in the site image index where referenced.

## Technical/owner actions still required (blockers)

| # | Item | Owner/live-site action |
|---|------|------------------------|
| 14 | OG image is 1200×862 and index.html `og:image:width/height` already say 1200×862 (no mismatch) | Optional: re-export social image at exactly 1200×630 (current is technically valid, non-standard 1200×862). |
| 15 | Image-usage permissions for event posters/photos (third-party events) | Confirm owner has rights for the event images currently served. |
| 16 | Search Console / Bing verification token | Add site verification; confirm once deployed. |
| 17 | Real-device Core Web Vitals + axe/browser testing | Run Lighthouse on production after deploy; owner or CI. |
| 18 | Linked-`hacktoberfest.com` generic link removed from media entry | Already done in this pass (entry url → null). Nothing further. |
| 19 | Prerender/SSR hydration test in a headless browser | Implemented this pass: `src/ssr.tsx` + `scripts/prerender.mjs` render 17 route pages into `dist/public` (createRoot CSR take-over, not React hydration). Validated via build output checks; full browser/axe check on deploy. |
| 20 | TechSathi 3rd article "Designing is not a 10-minute job — Part 2" (2023-03-12) URL | Not locatable (author archive 404s; site search empty; `-2`/`part-2` slugs 404). Excluded from the visible blog list this pass. Owner may confirm the URL. |
| 21 | Open-source "selected skill example" filenames (for open-source page examples) | GitHub API rate limit (~60/hr, no token) blocked PR #1688 file-list fetch. PR-by-PR skill-count table already shipped from `SME_PRS`; example names pending reset/token. |
| 22 | WordCamp/SDC media entries — session URLs | Applied: WordCamp entry url → session page; SDC entry url → speaker-detail + correct session title "Agentic AI Workflows & Building Open-Source Tech Communities". |

## Decisions applied in this pass (owner directive)

- Removed all public references to **Hashtag Web Solutions / Hashtag Web Solution / Hashtagweb / hashtagweb.com.np** (profile-data experience entry, index.html schema role, vite.config meta, experience.tsx description, llms.txt, sitemap image entry; deleted `abhishek-adhikari--hashtag-web-solutions-logo.jpeg` from `public/` and `dist/`). The root `abhishek_profile.json` mirror was updated the same way (email/linkedin/sameAs, Hashtag entry removed). Generic uses of the word "hashtag" (e.g., social tags) are preserved.
- **Canonical identity changed** to LinkedIn/Instagram `whoisabhishekadhikari` per the new audit directive. Note: this reverses the earlier approved `whoisabhishek` LinkedIn canonical that was committed on Oct 11, 2026; the site and llms.txt now use `whoisabhishekadhikari`. Flag if the owner wants the older slug restored.
- Emails standardized on `abhishekadhikari1254@gmail.com` (public). `abhishek@abhishekadhikari.com` retired from public data; `abhishekdank1254@gmail.com` not published.
- Blog list replaced (7 fabricated local `/blog/*` posts removed) with the two live, verified TechSathi articles (2023-01-25, 2023-02-15). Third article excluded (see #20).
- `mediaAppearances` fixed: WordCamp entry → session URL; SDC entry → speaker-detail URL + correct session title; Hacktoberfest judge url → null; "Open to Open Source" url → https://lu.ma/gd5zeuli.
- Open-source page: added PR-by-PR evidence table (SME_PRS, 11 PRs / 106 skills) and adjusted blog copy. Selected-skill example names still blocked (see #21).
- SSR/prerender implemented (see #19); `package.json` build now runs `vite build && node scripts/prerender.mjs`.
- No data was pushed/deployed, no forms submitted, no external profiles modified during this audit.

---

## Second pass (2026-10-11, later) — decisions applied

### Editorial exclusions / reframing
- **Hacktoberfest judge claim removed entirely**: `mediaAppearances` entry deleted from `public/abhishek_profile.json`; `sections/social-proof/images/…hacktoberfest-pulchowk-judge.jpg` removed from `sitemap.xml` image list. (Image file left on disk, unlinked.)
- **"1,500+ students trained" removed** from `index.html` (meta/og/twitter/WebSite), `vite.config.ts` ROUTE_META (`/`, `/about`), `public/abhishek_profile.json` profile.description, and `public/llms.txt` (4 places).
- **100SEOTools removed from authority framing**: dropped the "Built 100+ SEO tools (100SEOTools)" bullet from `llms.txt` Key facts. It remains a project under `/work` only.
- **"verified October 11, 2026" softened to "checked October 11, 2026"** across about/portfolio/open-source/vite.config/JSON (GitHub API could not be revalidated this pass — see below).
- **Corporate training availability softened**: `/ai-training` meta description changed from "On-site in Nepal and virtual delivery." to "Delivery format is agreed per engagement." (both the component `DESCRIPTION` and `vite.config.ts` ROUTE_META). Confidentiality copy remains hedged advice, not a guarantee.

### News / media placement
- `public/abhishek_profile.json` `mediaAppearances` corrected to verified YouTube titles/channels (ITRocks #9 — Indra PC; Entrepreneurs of Nepal Ep 06; Global TV HD).
- `newsMedia` expanded with verified independent press + authored analysis: Daman Post (open-source, historical), ICT Frame (Nepali), Kandara Samachar, E-kripa (neutral title, investment figure **not** reproduced), Cyber Samir (SDC 2026), Nawalpur Online, and the Daman Post data-centre **authored analysis** (labelled as writing, not independent coverage).
- **E-kripa note**: its headline contains an outlet-reported "NPR 10 crore" investment figure. That figure is not independently verified and is deliberately **not** reproduced on the site.

### Verified this pass (HTTP 200 + titles)
- Luma (dates confirmed from page JSON): `gd5zeuli` Open to Open Source: Start Your Career… — 2026-09-25 19:00–21:00 (Abhishek + Graphilla Technology); `eyevf4x7` Open to Open Source: Build Your Career with AI Workflows — 2026-09-10 (Abhishek + Nirajan Subedi); `1d6w9vfq` Secure Developer Conference 2026 — 2026-08-31→09-01, Hetauda (Abhishek among hosts); `jxeyh7fd` IBM Bob and `yrpybu3u` Beyond The Prompt are **not** Abhishek-hosted (attendee only) → not published as roles.
- Press: damanpost 309 & 518, kandarasamachar 68692, ekripa 40153, blog.cybersamir SDC, np.ictframe, techsathi ×2, nawalpur — all 200 with titles captured in `src/lib/evidence.ts`.

### Structured data / build
- **Route JSON-LD architecture fixed**: the homepage's WebSite/Person/WebPage/ContactPoint JSON-LD was previously duplicated into every prerendered route. Now `vite.config.ts` (`routeHtmlPlugin`) strips the base JSON-LD from every non-home route and injects a correct per-route `WebPage` + `BreadcrumbList` (with `id="page-schema"`, so the client effect replaces rather than duplicates it). Homepage WebSite/Person gained `@id` anchors (`#website`, `#person`) that sub-routes reference.
- **Fake 11-item homepage BreadcrumbList removed** from `index.html`.
- `vercel.json`: removed the redundant per-route canonical `Link` headers; added rewrites for the 6 previously-missing generated routes (`/ai-trainer-nepal`, `/open-source`, `/ai-training-sme-operations`, `/ai-training-hr-nepal`, `/ai-training-teachers-nepal`, `/agentic-ai-skills-workshop`).
- Blog Medium fetch hardened: `AbortController` 10s timeout, non-OK responses treated as failure.
- Validated: `tsc` clean; build clean; 17 routes prerendered; every route exactly one `<h1>`, correct canonical, drafts `noindex, follow`; `404.html` `noindex, nofollow`; 13 indexable URLs in sitemap (drafts excluded).

### Evidence register
- `src/lib/evidence.ts` upgraded to the full 15-field schema (`id, title, category, organization, role, eventDate, publicationDate, sourceUrl, sourceType, verificationStatus, supportedClaims, unsupportedClaims, lastCheckedAt, intendedPlacement, publishable`) and seeded with all sources above. Judges/IBM Bob/Beyond The Prompt/Astromova marked `publishable: false`.

### New/remaining blockers
- **GitHub API rate limit exhausted (0 remaining)** at time of writing → PR/file counts (36 PRs / 125 skills / 106 SME) are `partial`, checked earlier the same day, **not** revalidated. Revalidate with a token before treating as current.
- `https://astronovafoundation.com/hetauda-research` → HTTP 000 (unreachable) → excluded.
- Daman Post data-centre byline: visible "अभिषेक अधिकारी" byline found; owner confirmation of authorship still recommended before any stronger "authored by" framing.
- **Root `/Users/abhi/abhishek-s-digital-space/abhishek_profile.json` is stale and UNREFERENCED** (the site only reads `artifacts/portfolio/public/abhishek_profile.json`). It still contains different data: "400-litre-per-day organic milk farm", "10+ crore"/NPR figures, 7 fabricated `/blog/*` URLs, and a 4-item `mediaAppearances`. Recommend deleting it or syncing it from `public/` to avoid future confusion. It is outside the deploy artifact and was not edited.
- No browser/screenshot/Lighthouse/axe tooling available locally → real viewport and CWV checks still deferred to post-deploy.