import {
  type Challenge,
  type Course,
  type Profile,
  type User,
} from "@/generated/prisma/client";

export type CourseWithOwner = Course & {
  id: number;
  owner:
    | (User & {
        profile: Profile | null;
      })
    | null;
};

export type CourseWithOwnerAndChallenges = CourseWithOwner & {
  Challenge: Challenge[];
};
