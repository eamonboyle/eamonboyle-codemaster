import { currentUser } from "@/lib/current-user";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function CreateCoursePage() {
  const user = await currentUser();

  if (!user || user === null) {
    redirect("/sign-in");
  }

  if (user.role !== "INSTRUCTOR") {
    redirect("/dashboard");
  }

  async function createCourse(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;

    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    if (user) {
      await db.course.create({
        data: {
          title,
          description,
          imageUrl,
          ownerId: user.id,
        },
      });
    }

    redirect("/instructor/dashboard");
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-6 text-2xl font-bold">Create New Course</h1>
      <form action={createCourse} className="space-y-4">
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
            className="mt-1"
          />
        </div>
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Course Image URL
          </label>
          <Input
            type="url"
            id="imageUrl"
            name="imageUrl"
            className="mt-1"
            placeholder="https://example.com/course-image.jpg"
          />
        </div>
        <Button type="submit">Create Course</Button>
      </form>
    </div>
  );
}
