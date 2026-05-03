import { cache } from "react";
import { db } from "@/server/db";

export const listPublishedBlogPosts = cache(async () => {
  return db.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
});
