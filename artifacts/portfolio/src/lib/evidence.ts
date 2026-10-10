export type VerificationStatus = "verified" | "partial" | "user-supplied" | "historical";

export type SourceType =
  | "official_org"
  | "event_page"
  | "news_article"
  | "social_poster"
  | "self_published"
  | "editorial_feature"
  | "podcast";

export interface SourceEntry {
  id: string;
  name: string;
  url: string;
  published: string;
  checkedOn: string;
  sourceType: SourceType;
  status: VerificationStatus;
  claims: string[];
  notes: string;
}

export const CANONICAL_IDENTITY = {
  name: "Abhishek Adhikari",
  website: "https://abhishekadhikari.com",
  github: "https://github.com/WHOISABHISHEKADHIKARI",
  linkedin: "https://www.linkedin.com/in/whoisabhishekadhikari",
  instagram: "https://instagram.com/whoisabhishekadhikari",
  email: "abhishekadhikari1254@gmail.com",
  luma: "https://luma.com/user/whoisabhishek",
} as const;

export const EVIDENCE: SourceEntry[] = [
  {
    id: "wordcamp-speaker",
    name: "WordCamp Kathmandu 2026 — Speaker listing",
    url: "https://kathmandu.wordcamp.org/2026/speaker/abhishek-adhikari/",
    published: "2026-09-18",
    checkedOn: "2026-10-11",
    sourceType: "official_org",
    status: "verified",
    claims: ["Speaker at WordCamp Kathmandu 2026", "Event dates: September 18–19, 2026", "Venue: Alice Receptions, Gairidhara, Kathmandu"],
    notes: "Officially listed as 'Speaker'. Dates and venue confirmed on the event page.",
  },
  {
    id: "wordcamp-session",
    name: "WordCamp Kathmandu 2026 — Session: Prompt Smarter, Not Harder",
    url: "https://kathmandu.wordcamp.org/2026/session/prompt-smarter-not-harder/",
    published: "2026-09-18",
    checkedOn: "2026-10-11",
    sourceType: "official_org",
    status: "verified",
    claims: ["Session title: Prompt Smarter, Not Harder", "Session type: Workshop", "Presented by Abhishek Adhikari"],
    notes: "No date, time or transcript published on the session page. Do not claim those.",
  },
  {
    id: "sdc-2026-speaker",
    name: "Secure Developer Conference 2026 — Speaker detail",
    url: "https://conference.devcommunitynepal.org/speaker-detail.html?speaker=abhishek-adhikari",
    published: "2026",
    checkedOn: "2026-10-11",
    sourceType: "event_page",
    status: "verified",
    claims: ["Speaker at Secure Developer Conference 2026", "Session: Agentic AI Workflows & Building Open-Source Tech Communities", "Bio lists role as 'Co-Founder, DEV Community Nepal & Agritech Entrepreneur'", "Hosted by Abhishek Adhikari on Luma"],
    notes: "Speaker listing establishes invited speaker role, not lead organizer. Conference also referenced with Nepali-calendar branding 'Secure Developer Conference 2083' in places — keep the English/2026 label.",
  },
  {
    id: "luma-profile",
    name: "Luma — whoisabhishek profile",
    url: "https://luma.com/user/whoisabhishek",
    published: "2026",
    checkedOn: "2026-10-11",
    sourceType: "official_org",
    status: "verified",
    claims: ["Luma profile references linkedin.com/in/whoisabhishekadhikari and instagram.com/whoisabhishekadhikari"],
    notes: "Supports the canonical whoisabhishekadhikari identity for LinkedIn/Instagram.",
  },
  {
    id: "luma-open-to-open-source",
    name: "Luma — Open to Open Source: Start Your Career in Open Source with AI",
    url: "https://lu.ma/gd5zeuli",
    published: "2026-09-25",
    checkedOn: "2026-10-11",
    sourceType: "event_page",
    status: "verified",
    claims: ["Hosted by Abhishek Adhikari together with Graphilla", "Event date: September 25, 2026, 19:00 (virtual)", "Event status: ended"],
    notes: "Same event as the Graphilla 'Open to Open Source' pre-event — do not list as two separate events.",
  },
  {
    id: "luma-sdc-2026-event",
    name: "Luma — Secure Developer Conference 2026",
    url: "https://lu.ma/1d6w9vfq",
    published: "2026",
    checkedOn: "2026-10-11",
    sourceType: "event_page",
    status: "verified",
    claims: ["Hosted by Abhishek Adhikari", "Hetauda-based conference", "122 went, sold out"],
    notes: "Do not claim authorship of the follow-up sessions without confirmation (Hetauda edition).",
  },
  {
    id: "graphilla-hackathon",
    name: "Graphilla Hacktoberfest Hack Day — Speakers",
    url: "https://hacktoberfest.graphillatechnology.com/speakers",
    published: "2026-10-08",
    checkedOn: "2026-10-11",
    sourceType: "event_page",
    status: "verified",
    claims: ["Abhishek Adhikari listed on the speakers page", "Event date: October 8, 2026"],
    notes: "",
  },
  {
    id: "instagram-hacktoberfest-judge",
    name: "Instagram post Ddb0LWtP5Kh — Hacktoberfest Pulchowk 2026 judge announcement",
    url: "https://www.instagram.com/p/Ddb0LWtP5Kh/",
    published: "2026-09",
    checkedOn: "2026-10-11",
    sourceType: "social_poster",
    status: "user-supplied",
    claims: ["Named judge at Hacktoberfest Pulchowk 2026"],
    notes: "Instagram blocks anonymous access (login wall). Evidence is the poster image in the site's social-proof gallery; the claim is user-supplied, not independently verified. Do not link the generic hacktoberfest.com as proof.",
  },
  {
    id: "colleges-nepal-feature",
    name: "Colleges Nepal — Top AI Trainer in Nepal (2026) feature",
    url: "https://collegesnepal.com/",
    published: "2026-08-10",
    checkedOn: "2026-10-11",
    sourceType: "editorial_feature",
    status: "historical",
    claims: ["Editorial feature titled 'Top AI Trainer in Nepal (2026): Abhishek Adhikari'", "Byline 'CColleges Nepal Editorial'", "Includes a disclaimer that it is an editorial feature", "Figures cited (14 skills, 13 PRs, 41k+ stars) are historical and no longer match"],
    notes: "Publish as an attributed editorial feature only. Do not present as an official ranking. Do not reuse its stale numbers.",
  },
  {
    id: "100seotools-promo",
    name: "100SEOTools — AI Trainer in Nepal promotion page (self-published)",
    url: "https://100seotools.com/",
    published: "2026",
    checkedOn: "2026-10-11",
    sourceType: "self_published",
    status: "user-supplied",
    claims: ["Self-published promotion: 'AI Trainer in Nepal | Corporate Training — Abhishek Adhikari'"],
    notes: "Owned/promotional page. Cite as self-published, not third-party press.",
  },
  {
    id: "ictframe-article",
    name: "ICT Frame — Hetauda's Abhishek Ranks Global (open source)",
    url: "https://ictframe.com/hetaudas-abhishek-ranks-global/",
    published: "2026-06",
    checkedOn: "2026-10-11",
    sourceType: "news_article",
    status: "historical",
    claims: ["News article published June 2026", "Historical claims: #10 top contributor, 3,701+ lines, 11 additions, ~40,000 users", "Article names the project 'Antigravity Awesome Skills' (stale/misnamed)"],
    notes: "Present only as historical coverage. Figures and naming are stale relative to current repo state. Do not re-cite its numbers as current.",
  },
  {
    id: "techsathi-articles",
    name: "TechSathi — Design articles by Abhishek Adhikari",
    url: "https://techsathi.com/author/abhishek-adhikari",
    published: "2023",
    checkedOn: "2026-10-11",
    sourceType: "news_article",
    status: "verified",
    claims: [
      "Designing is not a 10-minute job (2023-01-25)",
      "The Ultimate Guide to Future Design Perfection (2023-02-15)",
      "Designing is not a 10-minute job — Part 2 (2023-03-12)",
    ],
    notes: "Third TechSathi article is the '-2' follow-up. 'Binit The Internet Hero' on TechSathi is authored by the TechSathi team, NOT Abhishek — excluded.",
  },
  {
    id: "github-pulls",
    name: "GitHub API — Merged pull requests by WHOISABHISHEKADHIKARI",
    url: "https://github.com/sickn33/agentic-awesome-skills/pulls?q=is%3Apr+is%3Amerged+author%3AWHOISABHISHEKADHIKARI",
    published: "2026",
    checkedOn: "2026-10-11",
    sourceType: "official_org",
    status: "verified",
    claims: ["36 merged pull requests authored by WHOISABHISHEKADHIKARI", "125 distinct skill files contributed", "106 SME operations skills across PRs #1688–#1698 (11 PRs)", "SME PRs merged September 29–30, 2026 (Nepal time)"],
    notes: "Checked via GitHub search API (rate-limited at time of check for PRs #494–#495 file lists; total skill count already 125 without them).",
  },
  {
    id: "itrocks-podcast",
    name: "ITRocks Podcast — Can AI Build Nepal's Future?",
    url: "https://www.youtube.com/watch?v=INXrMHndbcI",
    published: "2026-07",
    checkedOn: "2026-10-11",
    sourceType: "podcast",
    status: "user-supplied",
    claims: ["Long-form interview on agritech, AI, open source, SEO, community building"],
    notes: "Link unresolved — YouTube watch page not re-verified this pass.",
  },
];

export function evidenceById(id: string): SourceEntry | undefined {
  return EVIDENCE.find((e) => e.id === id);
}

export interface PrGroup {
  pr: number;
  skills: number;
}

export const SME_PRS: PrGroup[] = [
  { pr: 1688, skills: 10 },
  { pr: 1689, skills: 10 },
  { pr: 1690, skills: 10 },
  { pr: 1691, skills: 10 },
  { pr: 1692, skills: 10 },
  { pr: 1693, skills: 10 },
  { pr: 1694, skills: 10 },
  { pr: 1695, skills: 10 },
  { pr: 1696, skills: 10 },
  { pr: 1697, skills: 10 },
  { pr: 1698, skills: 6 },
];

export function smeSkillsTotal(): number {
  return SME_PRS.reduce((sum, p) => sum + p.skills, 0);
}