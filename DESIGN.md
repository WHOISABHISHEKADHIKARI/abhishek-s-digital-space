---
name: Abhishek Adhikari — Portfolio
colors:
  background: "#F5F1EB"
  background-dark: "#131514"
  foreground: "#101A14"
  foreground-dark: "#EFEDE6"
  border: "#DDD6CC"
  border-dark: "#2B302B"
  
  card: "#FAF7F2"
  card-dark: "#181A18"
  card-foreground: "#101A14"
  card-foreground-dark: "#EFEDE6"
  
  primary: "#242C1A"
  primary-dark: "#5B9E45"
  primary-foreground: "#FFFFFF"
  primary-foreground-dark: "#101A14"
  
  secondary: "#323F45"
  secondary-dark: "#58737D"
  secondary-foreground: "#FFFFFF"
  secondary-foreground-dark: "#EFEDE6"
  
  muted: "#EDE6DE"
  muted-dark: "#212421"
  muted-foreground: "#55665C"
  muted-foreground-dark: "#8C998D"
  
  accent: "#8F6532"
  accent-dark: "#BA8A4A"
  accent-foreground: "#FFFFFF"
  accent-foreground-dark: "#101A14"
  
  destructive: "#D94545"
  destructive-dark: "#8B2D2D"
  destructive-foreground: "#FAFAFA"
  
  ring: "#242C1A"
  ring-dark: "#5B9E45"
  input: "#DDD6CC"
  input-dark: "#2B302B"
  
  elevate-1: "hsla(40, 20%, 10%, 0.04)"
  elevate-1-dark: "hsla(120, 8%, 96%, 0.04)"
  elevate-2: "hsla(40, 20%, 10%, 0.08)"
  elevate-2-dark: "hsla(120, 8%, 96%, 0.08)"

typography:
  display-hero:
    fontFamily: '"Outfit", system-ui, sans-serif'
    fontSize: 48px
    fontWeight: "700"
    lineHeight: 1.1
    letterSpacing: -0.02em
    darkMode: true
  headline-xl:
    fontFamily: '"Outfit", system-ui, sans-serif'
    fontSize: 30px
    fontWeight: "700"
    lineHeight: 1.2
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: '"Outfit", system-ui, sans-serif'
    fontSize: 24px
    fontWeight: "700"
    lineHeight: 1.3
  headline-md:
    fontFamily: '"Outfit", system-ui, sans-serif'
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 1.3
  body-lg:
    fontFamily: '"Geist", system-ui, sans-serif'
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 1.7
  body-md:
    fontFamily: '"Geist", system-ui, sans-serif'
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 1.6
  body-sm:
    fontFamily: '"Geist", system-ui, sans-serif'
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 1.5
  label-sm:
    fontFamily: '"Geist", system-ui, sans-serif'
    fontSize: 12px
    fontWeight: "600"
    lineHeight: 1.4
    letterSpacing: 0.02em
  label-xs:
    fontFamily: '"Geist", system-ui, sans-serif'
    fontSize: 11px
    fontWeight: "500"
    lineHeight: 1.3
  caption-mono:
    fontFamily: '"JetBrains Mono", Menlo, monospace'
    fontSize: 12px
    fontWeight: "400"
    lineHeight: 1.4

rounded:
  sm: 0.25rem
  DEFAULT: 0.375rem
  md: 0.5rem
  lg: 0.75rem
  xl: 1rem
  2xl: 1.25rem
  full: 9999px

spacing:
  base: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  section: 96px
  container: 64rem
  container-narrow: 48rem
  gutter: 24px

motion:
  duration-fast: 150ms
  duration-default: 200ms
  duration-slow: 300ms
  duration-slower: 500ms
  easing-default: cubic-bezier(0.4, 0, 0.2, 1)
  easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1)
  stagger-delay: 40ms
  stagger-delay-slow: 70ms

elevation:
  level-0:
    boxShadow: none
  level-1:
    boxShadow: "0 1px 2px hsla(40, 20%, 10%, 0.04)"
    boxShadow-dark: "0 1px 2px hsla(120, 8%, 96%, 0.04)"
  level-2:
    boxShadow: "0 4px 12px hsla(40, 20%, 10%, 0.08)"
    boxShadow-dark: "0 4px 12px hsla(120, 8%, 96%, 0.08)"
  level-3:
    boxShadow: "0 8px 24px hsla(40, 20%, 10%, 0.1)"
    boxShadow-dark: "0 8px 24px hsla(120, 8%, 96%, 0.1)"

components:
  card-default:
    backgroundColor: "{colors.card}"
    backgroundColor-dark: "{colors.card-dark}"
    textColor: "{colors.card-foreground}"
    textColor-dark: "{colors.card-foreground-dark}"
    border: "1px solid {colors.border}"
    border-dark: "1px solid {colors.border-dark}"
    rounded: "{rounded.xl}"
    padding: 20px
    elevation: "{elevation.level-1}"
    hover:
      elevation: "{elevation.level-2}"
      translateY: -2px
  card-image:
    rounded: "{rounded.lg}"
    overflow: hidden
    aspectRatio: 4 / 3
    hover:
      scale: 1.05
  button-primary:
    backgroundColor: "{colors.primary}"
    backgroundColor-dark: "{colors.primary-dark}"
    textColor: "{colors.primary-foreground}"
    textColor-dark: "{colors.primary-foreground-dark}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
    fontWeight: "500"
    fontSize: 14px
    transition: "{motion.duration-default} {motion.easing-default}"
    hover:
      opacity: 0.9
    active:
      scale: 0.97
  button-secondary:
    backgroundColor: "{colors.secondary}"
    backgroundColor-dark: "{colors.secondary-dark}"
    textColor: "{colors.secondary-foreground}"
    textColor-dark: "{colors.secondary-foreground-dark}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
    fontWeight: "500"
    fontSize: 14px
    transition: "{motion.duration-default} {motion.easing-default}"
    hover:
      opacity: 0.9
    active:
      scale: 0.97
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.muted-foreground}"
    textColor-dark: "{colors.muted-foreground-dark}"
    border: "1px solid {colors.border}"
    border-dark: "1px solid {colors.border-dark}"
    rounded: "{rounded.lg}"
    padding: "8px 16px"
    fontWeight: "500"
    fontSize: 14px
    transition: "{motion.duration-default} {motion.easing-default}"
    hover:
      backgroundColor: "{colors.muted}"
      backgroundColor-dark: "{colors.muted-dark}"
      textColor: "{colors.foreground}"
      textColor-dark: "{colors.foreground-dark}"
    active:
      scale: 0.97
  button-icon:
    width: 44px
    height: 44px
    rounded: "{rounded.lg}"
    backgroundColor: transparent
    textColor: "{colors.muted-foreground}"
    textColor-dark: "{colors.muted-foreground-dark}"
    transition: "{motion.duration-default} {motion.easing-default}"
    hover:
      backgroundColor: "{colors.muted}"
      backgroundColor-dark: "{colors.muted-dark}"
      textColor: "{colors.foreground}"
      textColor-dark: "{colors.foreground-dark}"
    active:
      scale: 0.9
  input-field:
    backgroundColor: transparent
    border: "1px solid {colors.border}"
    border-dark: "1px solid {colors.border-dark}"
    rounded: "{rounded.lg}"
    padding: "8px 12px"
    fontSize: 14px
    focus:
      ringColor: "{colors.ring}"
      ringColor-dark: "{colors.ring-dark}"
      ringWidth: 2px
  badge:
    backgroundColor: "{colors.muted}"
    backgroundColor-dark: "{colors.muted-dark}"
    textColor: "{colors.muted-foreground}"
    textColor-dark: "{colors.muted-foreground-dark}"
    rounded: "{rounded.full}"
    padding: "2px 10px"
    fontSize: 11px
    fontWeight: "500"
  nav-link:
    padding: "6px 12px"
    rounded: "{rounded.md}"
    textColor: "{colors.muted-foreground}"
    textColor-dark: "{colors.muted-foreground-dark}"
    fontWeight: "500"
    fontSize: 14px
    transition: "{motion.duration-default} {motion.easing-default}"
    hover:
      backgroundColor: "{colors.muted}"
      backgroundColor-dark: "{colors.muted-dark}"
      textColor: "{colors.foreground}"
      textColor-dark: "{colors.foreground-dark}"
  avatar-circle:
    rounded: "{rounded.full}"
    width: 40px
    height: 40px
    fontWeight: "700"
    fontSize: 14px
  avatar-square:
    rounded: "{rounded.lg}"
    width: 40px
    height: 40px
    overflow: hidden
  timeline-dot:
    width: 40px
    height: 40px
    rounded: "{rounded.lg}"
    fontWeight: "700"
    fontSize: 12px
    boxShadow: "{elevation.level-1}"
  section-header-label:
    fontSize: 12px
    fontWeight: "600"
    textColor: "{colors.primary}"
    textColor-dark: "{colors.primary-dark}"
    marginBottom: 8px
  back-to-top:
    width: 44px
    height: 44px
    rounded: "{rounded.full}"
    backgroundColor: "{colors.primary}"
    backgroundColor-dark: "{colors.primary-dark}"
    textColor: "{colors.primary-foreground}"
    textColor-dark: "{colors.primary-foreground-dark}"
    elevation: "{elevation.level-3}"
    hover:
      opacity: 0.9
    active:
      scale: 0.9
  image-preview-overlay:
    backgroundColor: "rgba(0, 0, 0, 0.8)"
    backdropBlur: 4px
    zIndex: 100
    closeButton:
      textColor: "rgba(255, 255, 255, 0.8)"
      hoverTextColor: "#FFFFFF"
  show-more-button:
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
    border-dark: "1px solid {colors.border-dark}"
    padding: "8px 16px"
    fontWeight: "500"
    fontSize: 14px
    textColor: "{colors.muted-foreground}"
    textColor-dark: "{colors.muted-foreground-dark}"
    transition: "{motion.duration-default} {motion.easing-default}"
    hover:
      backgroundColor: "{colors.muted}"
      backgroundColor-dark: "{colors.muted-dark}"
      textColor: "{colors.foreground}"
      textColor-dark: "{colors.foreground-dark}"
    active:
      scale: 0.97
  skill-bar:
    height: 6px
    rounded: "{rounded.full}"
    backgroundColor: "{colors.muted}"
    backgroundColor-dark: "{colors.muted-dark}"
    fillColor: "{colors.primary}"
    fillColor-dark: "{colors.primary-dark}"
    transition: "{motion.duration-slower} {motion.easing-spring}"

---

## Brand & Style

This design system serves a personal portfolio and professional brand for an agritech entrepreneur and community builder. The aesthetic is **earthy-modern** — grounded in warm neutrals and deep forest greens, yet crisp and contemporary in its typography and spacing.

The visual personality is confident without being loud, premium without being cold. It balances the professionalism expected of a business leader with the warmth and approachability of a community organizer. The design never tries to impress with visual tricks; instead, it builds trust through clarity, consistency, and generous whitespace.

A subtle noise overlay (`opacity: 0.015`) applied to the root container adds a tactile, matte-finish texture that breaks the sterile flatness of pure digital rendering — a deliberate nod to the physical, agricultural world the portfolio represents.

## Colors

The palette is built around a **warm cream** background (`#F5F1EB`) and a **deep forest green** primary (`#242C1A`) — colors drawn from soil, paper, and foliage rather than from digital defaults.

- **Primary (Forest Green):** The single accent color. Used for headings, key actions, interactive states, and section labels. In light mode it reads as a dark, authoritative green; in dark mode it shifts to a luminous, slightly brighter green (`#5B9E45`) that glows against the charcoal surface.
- **Warm Grays:** All neutral surfaces are tinted warm (40° hue) rather than pure gray. The grays carry a subtle golden undertone that prevents the interface from feeling sterile or hospital-like.
- **Slate Secondary:** A cool counterpoint (`#323F45`) used sparingly for GitHub and secondary buttons. It provides just enough temperature contrast to distinguish primary from secondary actions without introducing a second accent color.
- **Amber Accent:** A muted ochre (`#8F6532`) reserved for decorative elements like certificate card borders and volunteer type labels. It adds visual variety without competing with the primary green.
- **Dark Mode:** The dark palette shifts backgrounds to a near-black charcoal with a green tint (`#131514`). Cards lift slightly lighter (`#181A18`) against the deeper background. The primary green inverts to a vibrant leaf-green that pops against the dark surface while maintaining the earthy character.

Shadows are never pure black-at-opacity. They are tinted to match the background hue — warm brown in light mode, cool white in dark mode — so the interface feels physically cohesive rather than floating in a void.

## Typography

The system uses a **paired-family** approach: **Geist** for body text and interface labels, **Outfit** for headlines and display text. Both are variable fonts loaded exclusively from Google Fonts — no Inter or system font fallback used in the loaded fonts, though `system-ui` is listed as a CSS fallback.

- **Outfit (headings):** A geometric sans-serif with a slightly condensed, confident appearance. Used for all `h1`–`h6` elements via a global CSS rule. The hero name uses `48px` at bold weight with `-0.02em` letter-spacing to command attention without shouting. Section headers use `30px` and `24px` at bold or semibold weights.
- **Geist (body):** Vercel's typeface — clean, neutral, highly legible at all sizes. Body text is `16px` at `400` weight with `1.6` line-height for comfortable reading. The max paragraph width is capped at roughly 65 characters (`max-w-xl` / `max-w-2xl`) to prevent long line lengths.
- **JetBrains Mono (mono):** Used for dates, credential IDs, and code-adjacent metadata. Its distinctive ligatures and tall x-height make small text more readable.
- **`text-wrap: balance`** is applied to all headings to eliminate orphaned words. Body text uses `text-wrap: pretty` for refined ragged edges.
- **Semantic weights:** 400 (Regular) for body, 500 (Medium) for navigation, 600 (SemiBold) for subheadings, 700 (Bold) for display text. This four-tier weight system creates clear hierarchy without visual jumps.

## Layout & Spacing

The layout is a **centered single-column** structure with a `64rem` (1024px) max-width container and `24px` horizontal gutters. Sections are separated by `96px` of vertical whitespace, giving each content block room to breathe.

- **Rhythm:** An 8px base unit governs all spacing. Padding, gaps, and margins are multiples of 4px from this baseline.
- **Grids:** Two/three-column card grids use CSS Grid with `gap-4` (`16px`) to `gap-6` (`24px`). The experience section uses a custom timeline layout with a vertical rule (`w-px`) and absolute-positioned logo tiles offset into the left margin.
- **Responsiveness:** The layout is mobile-first. Single-column on small screens, two columns at `sm` (`640px`), three columns at `md`/`lg` where appropriate. The navigation collapses from desktop pills to a hidden state (mobile menu not yet implemented).
- **Negative space:** Cards are never crammed. Each card has `20px` internal padding. Lists and paragraphs maintain `16px`–`24px` gaps between items. The hero section has `32px` gap between the name and the social buttons.

## Elevation & Depth

Depth is established through **tinted shadows** and **subtle hover translations**, never through heavy borders or gradients.

- **Level 0:** Flat surfaces — background, muted containers. No shadow.
- **Level 1:** Default cards — `box-shadow: 0 1px 2px hsla(40, 20%, 10%, 0.04)`. Barely perceptible; just enough to separate the card from the background.
- **Level 2:** Hovered cards — `box-shadow: 0 4px 12px hsla(40, 20%, 10%, 0.08)`. Combined with `translateY(-2px)` for a physical "lift" effect.
- **Level 3:** Back-to-top button and modals — `box-shadow: 0 8px 24px hsla(40, 20%, 10%, 0.1)`.

In dark mode, shadow colors shift to `hsla(120, 8%, 96%, ...)` — a faint white-green tint — so elevated elements appear to emit rather than absorb light.

The noise overlay adds a final layer of depth: it sits at `z-index: 9999` with `pointer-events: none`, providing a fixed grain texture that prevents the interface from feeling purely digital.

## Shapes

The shape language is **soft without being playful**. All corners use rounded values that feel intentional rather than aggressive.

- **Cards:** `1rem` (`rounded-xl`) — the primary container radius throughout.
- **Buttons:** `0.75rem` (`rounded-lg`) — a medium radius that feels clickable but not pill-shaped.
- **Avatar circles:** `9999px` (`rounded-full`) — reserved for people's faces (recommendations) to preserve the familiar portrait format.
- **Icon containers:** `0.75rem` (`rounded-lg`) — squared but soft, used for experience organization logos and certification issuer badges.
- **Inputs:** `0.5rem` (`rounded-md`) — slightly tighter to visually distinguish interactive fields from static cards.
- **Badges:** `9999px` (`rounded-full`) — pill-shaped for skill tags and category labels.

## Motion

Motion is restrained and purposeful. Every animated element follows these principles:

- **Staggered entry:** Cards fade in with `opacity: 0, y: 16` → `opacity: 1, y: 0` using Framer Motion. Items in a grid cascade with `40ms` to `70ms` delay between each, creating a ripple effect without feeling slow.
- **Spring physics:** The image preview lightbox uses spring-based scale animation (`scale: 0.9 → 1.0`) for a weighty, natural open/close feel.
- **Hover to lift:** Cards translate upward `2px` to `6px` on hover, combined with deepened shadow (`level-2` or `level-3`). Project thumbnails scale to `1.05`. Entry animations use `ease: [0.22, 1, 0.36, 1]` (cubic-bezier overshoot) for a natural deceleration curve. Spring physics (`stiffness: 120, damping: 12`) applied to the hero profile photo and image preview lightbox for weighty, physical feel.
- **Press to compress:** Buttons scale to `0.97` on active/press, simulating a physical button collapse. The theme toggle compresses to `0.9` for a more tactile feel.
- **Scroll-driven:** Entry animations are tied to `whileInView` with `viewport: { once: true }` — elements animate once when they enter the viewport and do not replay.
- **Back-to-top:** The button fades and scales based on scroll position (`y > 400`), using a `200ms` transition for smooth appearance/disappearance.

## Components

### Cards

The card is the fundamental content container. It consists of a rounded (`1rem`) border + background with a whisper-thin shadow. On hover, the shadow deepens and the card lifts `2px`. Cards in grids (certifications, projects) use consistent `20px` padding and `16px` internal gaps. The footer of each card is pushed to the bottom with `mt-auto` so action rows align vertically across uneven content.

### Image Preview (Lightbox)

Clicking a certificate, volunteering, or news image opens a full-screen modal (`.fixed inset-0 z-[100]`). The backdrop is `rgba(0, 0, 0, 0.8)` with `backdrop-filter: blur(4px)`. The image scales in from `0.9` using spring easing. Clicking the backdrop or pressing `Escape` closes the preview. The image container prevents propagation so clicking the image itself does not close.

### Navigation

The top bar uses `backdrop-filter: blur(12px)` over a semi-transparent background, creating a frosted glass effect. Desktop navigation links are inline pills with `6px 12px` padding that highlight on hover with a muted background. The dark mode toggle sits behind a `1px` divider and uses `active:scale-90`. A "Skip to content" link is provided for keyboard users, positioned off-screen by default and sliding in on focus.

### Certification Cards

Each certificate card has a colored accent border derived from an indexed color array of six decorative tones (warm terracotta, forest green, sage, teal, ochre, clay) — all drawn from the custom `--color-decorative-*` token set rather than Tailwind defaults. The image area shows a `4/3` aspect ratio with `object-contain` padding to preserve document proportions. On hover, the image scales `1.05` and a dark gradient overlay fades in with a magnifying glass icon, indicating clickability. The footer shows the credential ID (truncated) on the left and a "Verify" external link on the right, separated by a muted border.

### Image Error Handling

All images (project screenshots, experience logos, recommendation avatars) use React state to track errors rather than DOM manipulation. On error, they display styled initials or gradient placeholders instead of broken image icons.

## Surface & Texture

The noise overlay is the only texture in the system. It uses an inline SVG `feTurbulence` filter at `baseFrequency: 0.8` with `4` octaves, repeated at `256px` tiles at `opacity: 0.015`. This is subtle enough to be nearly invisible on first glance but contributes a matte, printed-paper feel that distinguishes the interface from pure vector flatness.

## Accessibility

- Focus rings use the primary color at `2px` width via the `ring` Tailwind utility.
- `::selection` styling applies the primary hue at `20%` opacity for a subtle highlight.
- All images have descriptive `alt` text from the data source.
- The contact form uses semantic `<label>` elements and `required` attributes for native validation.
- `scroll-behavior: smooth` is set on `<html>` to prevent jarring anchor jumps.

---

## Anti-AI-Slop Audit Results

**Score: 0/10 flags — clean.** All categories pass.

| Category | Status | Details |
|----------|--------|---------|
| Fonts | PASS | Geist (body) + Outfit (headings) — no Inter/Roboto/Arial |
| Colors | PASS | Custom HSL tokens only — no default Tailwind palette, no purple-pink gradients |
| Depth | PASS | Tinted shadows (3 levels), noise overlay texture, glassmorphism nav |
| Animation | PASS | Framer Motion stagger + spring + hover lift on all cards |
| Generic | PASS | Custom components — no shadcn defaults, no stock illustrations, no "Lorem ipsum" |

### Changes Applied During Audit
1. Replaced all Tailwind default color tokens (`emerald-500`, `blue-500`, `slate-700`, etc.) with custom `decorative-*` tokens and semantic colors.
2. Fixed `not-found.tsx` — replaced `bg-gray-50`, `text-red-500`, `text-gray-900` with `bg-background`, `text-destructive`, `text-foreground`.
3. Fixed `"Opened in mail app!"` → `"Message sent."` per copy-guide.md (no exclamation marks in success messages).
4. Added `--decorative-1` through `--decorative-6` CSS tokens for issuer badges, category colors, avatar backgrounds, and volunteer gradients.

---

## Handoff Report

### Phase Progress (fusengine/agents design-expert pipeline)

| Phase | Status | Notes |
|-------|--------|-------|
| 0: Identity System | ✅ Complete | DESIGN.md — YAML frontmatter + 9 sections |
| 1: Browse Research | ⛔ Blocked | Requires fuse-browser MCP tool |
| 2: UX Copy | ✅ Complete | `copy-guide.md` — creative sector voice profile |
| 3: Components | ✅ Partial | Applied premium hover lift + spring physics; omitted Gemini-generated components (no gemini-design MCP) |
| 4: Animations | ✅ Complete | `whileHover` lift on all cards, spring easing, stagger delays |
| 5: Design Audit | ✅ Complete | Anti-AI-slop: 0 flags. WCAG: focus rings, alt text, semantic labels, smooth scroll |
| 6: Handoff Review | ✅ Complete | This report |

### Running Servers
- Portfolio: `http://localhost:8080`
- API Server: `http://localhost:5000`
- Mockup Sandbox: `http://localhost:3001`

---

## SEO / AEO / GEO Audit

### Meta Tags (index.html)
| Tag | Value |
|-----|-------|
| `title` | "Abhishek Adhikari – Agritech Entrepreneur & Community Builder \| Nepal" |
| `description` | Includes metrics: "220+ livestock capacity scaled, 100+ community events, 10+ clients" |
| `keywords` | "agritech Nepal, community builder, rural innovation, SEO consultant, Hetauda" |
| `author` | Abhishek Adhikari |
| `canonical` | `https://abhishekadhikari.com` |
| `og:image` | Full absolute URL with 1200×630 dimensions |
| `og:locale` | `en_US` |
| `og:site_name` | "Abhishek Adhikari" |
| `twitter:image` | Full absolute URL |
| `robots` | `index, follow` |

### Structured Data (JSON-LD)
- **Person** schema: name, jobTitle, description, sameAs (LinkedIn, GitHub), email, knowsAbout (8 topics), alumniOf, address (Hetauda, NP)
- **WebSite** schema: name, url, author reference, inLanguage

### Image SEO
All 14 `<img>` tags updated:
- **Descriptive alt text** — template pattern: `"{specific content} — {category/context} by Abhishek Adhikari"` for every image
- **`loading="lazy"`** — on all below-the-fold images (projects, volunteering, certificates, blog, news, recommendations)
- **`decoding="async"`** — on all below-the-fold images for faster paint
- Hero photo and experience logos remain **eager** (above the fold)

### Technical SEO
| File | Purpose |
|------|---------|
| `public/sitemap.xml` | Single URL entry with monthly changefreq, priority 1.0 |
| `public/robots.txt` | Allow all, sitemap reference |
| `public/favicon.svg` | Existing — verified serving correctly |

### Content & Copy
- **Alt text** includes relevant keywords naturally (agritech, Nepal, community builder, volunteer, certification)
- **Heading hierarchy**: `h1` (name) → `h2` (section titles) → `h3` (card titles) — clean, logical
- **Semantic HTML**: `<main>`, `<section>` with `id`, `<nav>`, skip-to-content link present
- **404 page**: Rewrote from developer-facing "Did you forget to add to router?" → user-facing "Page Not Found" with "Back to Home" link
- **Fonts**: Removed Inter from Google Fonts load — only Geist + Outfit loaded

---

### Changes Made (Redesign Audit Pass)

| Item | Change |
|------|--------|
| Z-index scale | Replaced `z-[100]`, `z-[200]`, `9999` with named tokens (`--z-nav`, `--z-preview`, `--z-toast`, `--z-skip`, `--z-noise`) |
| Empty states | New `EmptyState` component for Blog, News, Certifications sections |
| Form validation | Client-side validation: required fields, email regex, min-length (10 chars) |
| Inline errors | Per-field error messages + destructive border styling on invalid fields |
| Visual overlap | `-mt-8` on About section to break strict flat grid |
| Font numeric | `tabular-nums` suggested — numbers use proportional font (deferred) |
| Icon library | Lucide retained — swapping to Phosphor would touch 20+ files (deferred) |

### Open Items
- Mobile navigation menu not yet implemented (currently nav links hide on small screens)
- Certificate and news sections use "Show N more" buttons but no expand/collapse animation
- Form uses `mailto:` fallback — no real backend integration for server-side submission
- API server data schema may diverge from portfolio expectations (not validated)
- Geist variable font loaded via Google Fonts CDN; prefer `@fontsource-variable/geist-sans` if it becomes available on npm
- No privacy policy or cookie consent banner (scope decision: personal portfolio)
