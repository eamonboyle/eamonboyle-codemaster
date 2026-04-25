import Image from "next/image";
import { BreadcrumbWithCustomSeparator } from "@/components/navigation/breadcrumb-with-custom-serpator";
import { getCourseByIdWithOwner } from "@/data/courses";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourseByIdWithOwner(Number(id));

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
      {course.Challenge.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Challenges</h2>
          <ul className="space-y-3">
            {course.Challenge.map((ch) => (
              <li
                key={ch.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border p-4"
              >
                <div>
                  <p className="font-medium">{ch.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {ch.description}
                  </p>
                </div>
                <Badge variant="secondary">{ch.difficulty}</Badge>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
