# Event Submission Triage Rubric

Used by `validate-event-submission.yml` (deterministic) and
`triage-event-submission.yml` (model-assisted, optional). Kept short and
fixed on purpose — the reviewing model or rule engine should only ever
see **this rubric + the single new event file**, never the rest of the
repo or other submissions.

## Stage 2 — Deterministic rules (always runs, free, no model)

Reject automatically if any of these are true:
- Front matter fails `events-schema.json` validation.
- `summary` is under 40 characters or is just a URL / promo slogan with
  no descriptive content.
- Any of `slides_url`, `recording_url`, `cover_image_url` returns a
  non-200 status.
- `cover_image_url` does not match an approved external host pattern
  (see schema `pattern` — prevents binary files being committed as a
  workaround).
- The PR modifies any file outside `docs/community/events/`.
- The PR adds a binary/image file directly (size or extension check).
- An event with the same `title` + `date` + `presenter` already exists
  in `docs/community/events/` (duplicate submission).

Anything that passes all of the above is labeled `ready-for-triage`.

## Stage 3 — Content judgment (optional, only on `ready-for-triage`)

Given the rubric below and *only* the new event file's content, classify
into exactly one label:

- **`auto-approve-eligible`** — summary and body plainly describe a real
  session (who/what/where), fields are internally consistent (e.g.
  `type: workshop` matches a workshop-shaped description), no spam or
  unrelated promotional content.
- **`needs-human-review`** — ambiguous type, thin but plausible content,
  or fields that don't quite line up (e.g. `audience: developers` but
  body describes a marketing talk).
- **`reject-with-reason`** — content is off-topic to this repo/its
  skills, is pure self-promotion unrelated to any session, or duplicates
  an existing entry not caught by the exact-match rule above.

Output format required from the reviewer (human, rule engine, or model):
one label + one sentence of reasoning. Nothing longer — this keeps the
human maintainer's queue skimmable at volume.

## Running Stage 3 without a paid API

Two supported options, either is fine:
1. **GitHub Models** (free tier, built into Actions via
   `permissions: models: read` — no external key or billing account).
2. **A maintainer's local agent** (e.g. OpenCode pointed at a local
   model) run manually or on a schedule against PRs labeled
   `ready-for-triage`, posting the same label + one-sentence verdict as
   a PR comment.

If neither is available, Stage 3 is skippable entirely — everything that
passes Stage 2 simply goes straight to `needs-human-review`, and the
system still works, just with more maintainer load.
