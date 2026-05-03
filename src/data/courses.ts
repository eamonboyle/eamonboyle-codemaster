import { notFound } from "next/navigation";
import { cache } from "react";
import { db } from "@/server/db";
import { type CourseWithOwner, type CourseWithOwnerAndChallenges } from "@/types/course";

export const listCoursesWithOwner = cache(async (): Promise<CourseWithOwner[]> => {
  return db.course.findMany({
    include: {
      owner: {
        include: {
          profile: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });
});

export const getCourseByIdWithOwner = cache(
  async (id: number): Promise<CourseWithOwnerAndChallenges> => {
    if (!Number.isFinite(id) || id < 1) {
      notFound();
    }
    const course = await db.course.findUnique({
      where: { id },
      include: {
        owner: {
          include: {
            profile: true,
          },
        },
        Challenge: {
          orderBy: { id: "asc" },
        },
      },
    });
    if (!course) {
      notFound();
    }
    return course;
  },
);
