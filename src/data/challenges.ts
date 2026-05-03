import { cache } from "react";
import { db } from "@/server/db";

export const listChallenges = cache(async () => {
  return db.challenge.findMany({
    include: { course: true },
    orderBy: [{ courseId: "asc" }, { id: "asc" }],
  });
});
