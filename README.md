### What it does

Each user can own or participate in multiple **Projects**. A project groups its **Members** (each with a role: Owner, Admin or Member) and a sequence of **Iterations** with fixed start and end dates (think sprints). Inside an iteration the team plans **Tasks**, each one annotated with an estimated duration (expected time), the time actually spent, and function points (story points).

During execution, tasks accumulate two kinds of follow-up work:
- **Improvements** — refinements or scope additions that emerge while building.
- **Bugs** — defects discovered before or after delivery.

Both are stored in their own tables but share creation rules through a single factory, and both carry their own function points so the system can measure how much extra work each task generated.

### Productivity indicators

From this model, Prodyo computes three indicators per iteration / project, all returned as percentages:

- **Velocity** = (expected time / actual time) × 100 — how close the team came to its own estimates.
- **Instability Index** = improvement story points / task story points — how much in-flight scope shifted.
- **Rework Index** = bug story points / task story points — how much extra work came from defects.

All duration-related fields are stored and transmitted as integer seconds; conversions to a human-readable format happen only in the UI.

### Architecture

- `apps/api` — Go backend. chi for routing, sqlx for persistence, DuckDB as the database, JWT in HttpOnly cookies for auth, Scalar to serve the OpenAPI docs.
- `apps/web` — React + Vite frontend, managed with Bun. Tailwind, React Router, TanStack Query with a Command Pattern service layer, fetch as HTTP client, react-hook-form for forms, React Charts for the productivity dashboard.
- `packages/*` — shared frontend packages.
- `docs/` — design docs, OpenAPI artifacts, and conventions.

### Local development

Backend:
```
cd apps/api
go run ./cmd/api
```

Frontend:
```
cd apps/web
bun install
bun run dev
```

Full stack via Docker:
```
docker compose up --build
```
