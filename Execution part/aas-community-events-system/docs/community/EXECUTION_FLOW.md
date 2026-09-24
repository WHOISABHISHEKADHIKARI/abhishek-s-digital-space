# Community Events System — Execution Flow

This is the step-by-step build-and-run plan for adding the events/contribution
system to this repo. Follow it top to bottom once; after that, the system
runs itself and this doc becomes onboarding reference for new maintainers.

---

## Phase 0 — One-time setup (you, via GitHub Desktop)

1. Open GitHub Desktop → **Clone** `sickn33/agentic-awesome-skills` if not
   already local.
2. Create a branch: `feat/community-events-system`.
3. Add these files (generated alongside this doc) to the matching paths:
   - `docs/community/EVENT_TEMPLATE.md`
   - `docs/community/events-schema.json`
   - `.github/ISSUE_TEMPLATE/event-submission.yml`
   - `.github/workflows/validate-event-submission.yml`
   - `.github/workflows/triage-event-submission.yml`
4. Add one real example event under `docs/community/events/` using your own
   sessions (e.g. `2026-09-15-prompt-is-smarter-not-harder.md`) — a repo with
   zero example content gets zero imitators.
5. Add a short section to `CONTRIBUTING.md`:
   > ### Contributing an event write-up
   > Open a [new event submission](../../issues/new?template=event-submission.yml).
   > It auto-drafts a PR from your answers — no need to hand-edit files.
6. Commit in GitHub Desktop → Push → **Open PR** into `main`. Get one other
   maintainer to review this initial scaffold (it's infrastructure, not
   content, so it only needs one pass).
7. Merge.

From here on, **you never touch these files again** — contributors interact
only through the Issue Form.

---

## Phase 1 — Contributor flow (automatic, repeats per submission)

```
Contributor clicks "New Issue" → picks "Event Submission"
        │
        ▼
Fills structured form (title, date, type, links, summary)
        │
        ▼
GitHub Action reads the issue body → renders EVENT_TEMPLATE.md
→ commits docs/community/events/YYYY-MM-DD-slug.md
→ opens PR, labels it `event-submission`
        │
        ▼
validate-event-submission.yml runs automatically:
  - schema check (events-schema.json)
  - link check (slides/recording/cover image all resolve)
  - no binary files added
  - PR only touches docs/community/events/*
        │
   ┌────┴────┐
 FAIL       PASS
   │           │
   ▼           ▼
Bot comments   Label: ready-for-triage
with exact
fix needed,        │
PR stays open      ▼
for contributor  triage-event-submission.yml runs
to push a fix   (rule-based first, model-assisted
                 second — see docs/community/TRIAGE.md)
                    │
              ┌─────┼─────┐
        auto-approve  needs-human  reject
              │        review        │
              ▼           │          ▼
        merge-ready   maintainer   bot comments
        (maintainer   reviews      reason, closes
        spot-checks   diff +       after 14 days
        occasionally) verdict      if untouched
                          │
                          ▼
                    approve → merge
        │
        ▼
Merge to main triggers Pages rebuild:
  - new page at /events/<slug>/ with Event JSON-LD
  - /events/ index regenerated
  - sitemap.xml updated
        │
        ▼
Post-merge structured-data check (non-blocking, opens
follow-up issue if JSON-LD is malformed)
```

---

## Phase 2 — What runs where (so you know what to debug and where)

| Step | Runs in | Cost | Doc |
|---|---|---|---|
| Issue form → draft PR | GitHub Actions | free (public repo) | this file |
| Schema/link/scope validation | GitHub Actions | free | `events-schema.json` |
| Rule-based spam filter | GitHub Actions | free | `TRIAGE.md` |
| Content judgment (optional) | GitHub Models *or* a maintainer's local OpenCode session | free / self-hosted | `TRIAGE.md` |
| Human final review | You / maintainers, GitHub Desktop or web | — | — |
| Static site build | GitHub Pages | free | `apps/web-app` build config |
| Structured-data check | GitHub Actions + open-source validator | free | — |

---

## Phase 3 — Maintainer's weekly loop

1. Open PRs labeled `needs-human-review` (this should be the minority —
   most resolve via `auto-approve-eligible` after spot-checking).
2. Merge or request changes.
3. Once a month, spot-check 5 random `auto-approve-eligible` merges to
   confirm the rule/triage layer isn't drifting — adjust `TRIAGE.md`
   rubric if it is.
4. That's it. No manual site build, no manual sitemap edits, no image
   hosting to manage.

---

## Phase 4 — Scaling checkpoints (revisit only if these trip)

- **PR volume gets too high for one review queue** → split labels by
  `type` (workshop / bootcamp / corporate / etc.) and rotate maintainers
  per category.
- **GitHub Models free tier gets rate-limited at volume** → fall back to
  rule-based-only triage (Phase 1 still works, just more goes to
  `needs-human-review`) or move triage to a maintainer's local OpenCode
  + local model, run on a schedule against the open PR queue.
- **Structured data starts failing validation post-merge** → tighten
  `events-schema.json` required fields rather than fixing pages by hand.

---

## Files in this system (reference)

- `docs/community/EVENT_TEMPLATE.md` — the front-matter template contributors' answers get poured into.
- `docs/community/events-schema.json` — machine-checkable shape of a valid event file.
- `docs/community/TRIAGE.md` — the rubric used for rule-based and model-assisted triage.
- `.github/ISSUE_TEMPLATE/event-submission.yml` — the structured intake form.
- `.github/workflows/validate-event-submission.yml` — Stage 2 checks.
- `.github/workflows/triage-event-submission.yml` — Stage 3 checks.
- `docs/community/events/*.md` — the actual submitted content (grows over time).
