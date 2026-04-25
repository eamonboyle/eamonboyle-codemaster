import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient, UserRole } from "../src/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Missing DATABASE_URL");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function deleteAllData() {
  console.log("Deleting all data...");

  await prisma.submission.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.course.deleteMany();
  console.log("Deleted course-related records");

  await prisma.logins.deleteMany();
  console.log("Deleted all login records");

  await prisma.profile.deleteMany();
  console.log("Deleted all profile records");

  await prisma.user.deleteMany();
  console.log("Deleted all user records");

  console.log("All data has been deleted.");
}

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

  const courses = [
    {
      title: "Introduction to Web Development",
      description: "Learn the basics of HTML, CSS, and JavaScript",
      imageUrl: "https://placehold.co/600x400",
    },
    {
      title: "Advanced React Techniques",
      description: "Master React hooks, context, and performance optimization",
      imageUrl: "https://placehold.co/600x400",
    },
    {
      title: "Database Design with PostgreSQL",
      description: "Learn to design efficient and scalable databases",
      imageUrl: "https://placehold.co/600x400",
    },
  ];

  const created = [];
  for (const course of courses) {
    const row = await prisma.course.create({
      data: {
        ...course,
        owner: {
          connect: {
            id: bob.id,
          },
        },
      },
    });
    created.push(row);
  }

  console.log("Created courses");

  const intro = created[0];
  if (intro) {
    await prisma.challenge.createMany({
      data: [
        {
          courseId: intro.id,
          title: "Build a static landing page",
          description:
            "Recreate a simple one-column layout using semantic HTML. Focus on clear headings and a call-to-action button.",
          difficulty: "EASY",
        },
        {
          courseId: intro.id,
          title: "Style with a responsive grid",
          description:
            "Use CSS (or a framework) to build a two-column layout that stacks on small screens.",
          difficulty: "MEDIUM",
        },
        {
          courseId: intro.id,
          title: "Fetch and display API data",
          description:
            "Use fetch to load JSON from a public API and render a list. Handle loading and error states.",
          difficulty: "HARD",
        },
      ],
    });
  }

  await prisma.blogPost.create({
    data: {
      title: "Welcome to the CodeMaster blog",
      content:
        "We publish short articles on full-stack development, data structures, and how to get the most from our challenges and courses.",
      published: true,
    },
  });

  console.log("Seeded challenges and a sample blog post");
}

try {
  await main();
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  await prisma.$disconnect();
  await pool.end();
}
