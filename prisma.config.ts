import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "app/prisma/schema.prisma",
  migrations: {
    path: "app/prisma/migrations",
    seed: "tsx app/prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
