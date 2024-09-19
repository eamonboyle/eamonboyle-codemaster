import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();

// Function to delete all data from the database
async function deleteAllData() {
  console.log("Deleting all data...");

  // Delete all records from the Logins table
  await prisma.logins.deleteMany();
  console.log("Deleted all login records");

  // Delete all records from the Profile table
  await prisma.profile.deleteMany();
  console.log("Deleted all profile records");

  // Delete all records from the User table
  await prisma.user.deleteMany();
  console.log("Deleted all user records");

  console.log("All data has been deleted.");
}

// Call the deleteAllData function before creating new records
await deleteAllData();

async function main() {
  const alice = await prisma.user.create({
    data: {
      clerkId: "clerk_alice",
      email: "alice@prisma.io",
      username: "alice123",
      role: UserRole.STUDENT,
      profile: {
        create: {
          firstName: "Alice",
          lastName: "Johnson",
          bio: "Aspiring developer",
        },
      },
    },
  });

  const bob = await prisma.user.create({
    data: {
      clerkId: "clerk_bob",
      email: "bob@prisma.io",
      username: "bob456",
      role: UserRole.INSTRUCTOR,
      profile: {
        create: {
          firstName: "Bob",
          lastName: "Smith",
          bio: "Experienced instructor",
        },
      },
    },
  });

  console.log({ alice, bob });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
