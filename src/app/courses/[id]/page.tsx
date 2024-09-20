import { notFound } from "next/navigation";
import Image from "next/image";
import { CourseWithOwner } from "@/types/course";
import { BreadcrumbWithCustomSeparator } from "@/components/navigation/breadcrumb-with-custom-serpator";

async function getCourse(id: string): Promise<CourseWithOwner> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`,
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error("Failed to fetch course");
  }
  return res.json();
}

export default async function CoursePage({
  params,
}: {
  params: { id: string };
}) {
  const course = await getCourse(params.id);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: course.title, isCurrent: true },
  ];

  return (
    <div className="container mx-auto py-8">
      <BreadcrumbWithCustomSeparator items={breadcrumbItems} />
      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h1 className="mb-4 text-3xl font-bold">{course.title}</h1>
          <p className="mb-4 text-gray-600">
            Instructor:{" "}
            {course.owner?.profile?.firstName ||
              course.owner?.username ||
              "Unknown"}{" "}
            {course.owner?.profile?.lastName || ""}
          </p>
          <p className="mb-4 text-gray-700">{course.description}</p>
        </div>
        <div>
          {course.imageUrl && (
            <div className="overflow-hidden rounded-lg">
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={600}
                height={400}
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
      {/* Add more course details here */}
    </div>
  );
}
