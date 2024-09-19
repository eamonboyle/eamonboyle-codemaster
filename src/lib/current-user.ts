import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";

export const currentUser = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      clerkId: userId,
    },
    include: {
      profile: true,
    },
  });

  return user;
};
