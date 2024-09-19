import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";

export async function initializeUser() {
  const clerkUser = await currentUser();

  if (clerkUser) {
    const dbUser = await db.user.findUnique({
      where: {
        clerkId: clerkUser.id,
      },
    });

    const primaryEmail = clerkUser.emailAddresses[0]?.emailAddress;
    if (!primaryEmail) {
      throw new Error("User must have a primary email address");
    }

    if (!dbUser) {
      return await db.user.create({
        data: {
          clerkId: clerkUser.id,
          email: primaryEmail,
          username: clerkUser.username as string,
          role: UserRole.STUDENT,
          profile: {
            create: {
              firstName: clerkUser.firstName as string,
              lastName: clerkUser.lastName as string,
              profileImage: clerkUser.imageUrl as string,
            },
          },
        },
      });
    }

    return dbUser;
  }

  return null;
}
