import { Course, User, Profile } from "@prisma/client";

export type CourseWithOwner = Course & {
  id: number;
  owner:
    | (User & {
        profile: Profile | null;
      })
    | null;
};
