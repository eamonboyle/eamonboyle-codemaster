import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { listCoursesWithOwner } from "@/data/courses";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  const courses = await listCoursesWithOwner();

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Available Courses</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col overflow-hidden">
            {course.imageUrl && (
              <div className="relative h-48 w-full">
                <Image
                  src={course.imageUrl}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>
                By{" "}
                {course.owner?.profile?.firstName ||
                  course.owner?.username ||
                  "Unknown"}{" "}
                {course.owner?.profile?.lastName || ""}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600">{course.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/courses/${course.id}`} passHref className="w-full">
                <Button className="w-full">View Course</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
