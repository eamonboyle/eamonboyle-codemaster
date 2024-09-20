import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db";
import { CourseWithOwner } from "@/types/course";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CourseWithOwner | { error: string }>
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const course = await db.course.findUnique({
        where: { id: Number(id) },
        include: {
          owner: {
            include: {
              profile: true,
            },
          },
        },
      });

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch course" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}