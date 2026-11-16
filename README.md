# Verdant — Talent Operations

A responsive frontend demo for organizing recruitment requirements from simulated WhatsApp group messages, finding relevant candidates, reviewing outreach, and managing shared tasks.

## Open

Open `dist/index.html` in a modern browser. No install, backend, account, or credentials are needed. All application code and styles are included. Optional Google Fonts fall back to system fonts when offline.

## Walkthrough

1. Open WhatsApp inbox and choose Simulate message.
2. Add a text message or demo voice transcript.
3. Click Review & capture, validate the extracted requirement, and save.
4. Open the requirement to review scored matches, then create outreach drafts.
5. Edit or approve a draft to simulate sending; simulate a reply to create a follow-up task.
6. Import a CSV in Lead database, update consent and exclusions, and review Reports.

## Included

Overview, requirements CRUD/statuses, candidate profiles, CSV import with validation and deduplication, export, simulated group inbox and replies, demo transcript playback using browser speech synthesis, editable outreach drafts, eligibility checks, duplicate prevention, task board, reports, global search, automation preferences, activity trail, workspace settings, JSON backup/restore and reset.

## Data and boundaries

This is frontend-only. Data lives in browser localStorage, separately on each device/origin. No real messages are received or sent. Voice playback is synthesized from a demo transcript, not an uploaded recording. Extraction is a reviewable keyword-based demonstration, not an AI service. Country/category/skills matching is deterministic and explainable; candidates require human review. Excluded, unavailable and non-consenting candidates cannot receive simulated outreach. No background processing occurs after the page closes. Shared tasks demonstrate team ownership; there is no real multi-user sync or authentication. The initial dataset uses fictional names and placeholder contact details.

## Design system

White surfaces, forest-green actions, muted mint states; Manrope headings and DM Sans body text; CSS tokens for colors, 14px card radius, consistent button/input states, compact table typography and responsive layouts. Motion respects reduced-motion preferences.

## Checks

Run `node --check dist/app.js` and `node check.cjs`. The behavior checks render every page and verify matching, ranking, duplicate prevention, eligibility at send time, replies, CSV parsing and HTML escaping. These are logic checks, not full browser E2E tests.

## GitHub Pages deployment

The workflow in `.github/workflows/pages.yml` checks the app and publishes `dist` when pushed to `main`. In the GitHub repository, enable Pages with GitHub Actions as the build source before the initial deployment. The resulting URL is returned by the deploy job; a URL should only be shared after that job succeeds. No build dependencies or backend credentials are required.
