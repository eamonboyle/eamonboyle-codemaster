import { db } from "@/server/db";
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

export const currentUserPages = async (req: NextApiRequest) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return null;
  }

  const user = await db.user.findFirst({
    where: {
      clerkId: userId,
    },
    include: {
      profile: true,
    },
  });

  return user;
};
