import "dotenv/config";
import { defineConfig } from "prisma/config";

// Fallback for `prisma generate` when DATABASE_URL is unset (e.g. clean CI install).
const databaseUrl =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@127.0.0.1:5432/_prisma_generate_only";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.mjs",
  },
  datasource: {
    url: databaseUrl,
  },
});
