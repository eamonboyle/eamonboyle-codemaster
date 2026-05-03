import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listChallenges } from "@/data/challenges";

export const dynamic = "force-dynamic";

export default async function ChallengesPage() {
  const challenges = await listChallenges();

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-2 text-3xl font-bold">Challenges</h1>
      <p className="mb-8 text-muted-foreground">
        Practice with challenges attached to our courses. Open a course to see
        the full list in context.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {challenges.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{c.title}</CardTitle>
                <Badge variant="secondary">{c.difficulty}</Badge>
              </div>
              <CardDescription>
                <Link
                  href={`/courses/${c.courseId}`}
                  className="text-primary hover:underline"
                >
                  {c.course.title}
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{c.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {challenges.length === 0 && (
        <p className="text-muted-foreground">No challenges yet. Check back soon.</p>
      )}
    </div>
  );
}
