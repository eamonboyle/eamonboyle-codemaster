import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db";
import { CourseWithOwner } from "@/types/course";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CourseWithOwner[] | { error: string }>
) {
  if (req.method === "GET") {
    try {
      const courses = await db.course.findMany({
        include: {
          owner: {
            include: {
              profile: true,
            },
          },
        },
      });
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch courses" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
