import { currentUser } from "@/lib/current-user";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function EditCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const user = await currentUser();

  if (!user || user === null) {
    redirect("/sign-in");
  }

  if (user.role !== "INSTRUCTOR") {
    redirect("/dashboard");
  }

  const course = await db.course.findUnique({
    where: { id: Number(params.courseId) },
  });

  if (!course || course.ownerId !== user.id) {
    redirect("/instructor/dashboard");
  }

  async function updateCourse(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    await db.course.update({
      where: { id: Number(params.courseId) },
      data: {
        title,
        description,
      },
    });

    redirect("/instructor/dashboard");
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Edit Course</h1>
      <form action={updateCourse} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Course Title
          </label>
          <Input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={course.title}
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Course Description
          </label>
          <Textarea
            id="description"
            name="description"
            required
            defaultValue={course.description}
            className="mt-1"
          />
        </div>
        <Button type="submit">Update Course</Button>
      </form>
    </div>
  );
}
