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
| 3 | Hacktoberfest Pulchowk 2026 "judge" title | USER-SUPPLIED | Source is Instagram post Ddb0LWtP5Kh (login-gated). Poster image is the only evidence we hold. | Keep as social-proof image with neutral framing until owner confirms the role; do not link hacktoberfest.com as proof. |
| 4 | "Open to Open Source" mentor title (Graphilla pre-event, Sep 25 2026) | USER-SUPPLIED | Poster image evidence only; event page names Abhishek as host of the Luma event but not the printed role. | Owner confirms printed role. |
| 5 | "1,500+ students trained on prompt engineering / AI literacy" | USER-SUPPLIED | No public tally or official source located tracing this number. It is self-reported. | Owner keeps as self-reported figure or provides a source; keep the phrasing "self-reported" available for the report. |
| 6 | Medium handle `@abhishekadhikari1254` + RSS feed | PARTIAL | Feed is fetched at runtime from rss2json; not independently verified this pass. Blog page degrades gracefully on failure. | Owner confirms the Medium profile exists / is intended. |
| 7 | Event: "Build Your Career with AI Workflows" | NOT FOUND | Not listed on Luma profile during research (short-lived or removed). | Owner provides URL. |
| 8 | Event: "Building Applications with IBM Bob" | NOT FOUND | Same as above. | Owner provides URL. |
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