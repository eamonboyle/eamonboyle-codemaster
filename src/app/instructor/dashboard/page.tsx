import { Button } from "@/components/ui/button";
import Link from "next/link";
import { currentUser } from "@/lib/current-user";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export default async function InstructorDashboardPage() {
  const user = await currentUser();
  const courses = await db.course.findMany({
    where: { ownerId: user?.id },
  });

  async function deleteCourse(courseId: string) {
    "use server";
    await db.course.delete({
      where: { id: Number(courseId) },
    });
    revalidatePath("/instructor/dashboard");
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold">Instructor Dashboard</h1>
      <Link href="/instructor/dashboard/create-course" passHref>
        <Button>Create New Course</Button>
      </Link>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Manage Courses</h2>
        <ul>
          {courses.map((course) => (
            <li
              key={course.id}
              className="my-2 flex items-center justify-between"
            >
              <span>{course.title}</span>
              <div>
                <Link
                  href={`/instructor/dashboard/edit-course/${course.id}`}
                  passHref
                >
                  <Button variant="outline" className="mr-2">
                    Edit
                  </Button>
                </Link>
                <form
                  action={deleteCourse.bind(null, course.id.toString())}
                  className="inline"
                >
                  <Button variant="destructive" type="submit">
                    Delete
                  </Button>
                </form>
              </div>
            </li>
          ))}

          {courses.length === 0 && <p>No courses found</p>}
        </ul>
      </div>
    </div>
  );
}
