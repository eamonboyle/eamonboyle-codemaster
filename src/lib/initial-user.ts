import { db } from "@/server/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserRole } from "@prisma/client";

export const initialUser = async () => {
  const user = await currentUser();

  if (!user) {
    return auth().redirectToSignIn();
  }

  const primaryEmail = user.emailAddresses[0]?.emailAddress;
  if (!primaryEmail) {
    throw new Error("User must have a primary email address");
  }

  const existingUser = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!existingUser) {
    return await db.user.create({
      data: {
        clerkId: user.id,
        email: primaryEmail,
        username: primaryEmail,
        role: UserRole.STUDENT,
        profile: {
          create: {
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user.imageUrl,
          },
        },
      },
    });
  }

  return existingUser;
};
