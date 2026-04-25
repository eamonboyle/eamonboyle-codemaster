import "dotenv/config";
import { defineConfig } from "prisma/config";

// Dummy URL is only for `prisma generate` / install when .env is missing (not used to connect then).
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
