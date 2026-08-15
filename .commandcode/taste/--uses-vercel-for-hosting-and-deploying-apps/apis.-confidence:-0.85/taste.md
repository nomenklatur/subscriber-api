# - Uses Vercel for hosting and deploying apps/APIs. Confidence: 0.85
- Uses Vercel for hosting and deploying apps/APIs. Confidence: 0.85
- Uses Bun as the runtime/package manager (bunVersion in vercel.json, `bun run` scripts). Confidence: 0.8
- Uses Drizzle ORM with drizzle-kit migrations. Confidence: 0.7
- Wants database migrations to run automatically on every deployment (not as a manual step). Confidence: 0.8
- Uses Supabase (PostgreSQL) as the database. Confidence: 0.7
- Uses a dedicated, non-`public` Postgres schema, configured via a `DATABASE_SCHEMA` env var (schema defined with `pgSchema(env.DATABASE_SCHEMA)`). Confidence: 0.75
- Organizes backend code in a layered architecture under `src/infrastructure` (e.g. `config/`, `database/`, `database/schema/`). Confidence: 0.6
