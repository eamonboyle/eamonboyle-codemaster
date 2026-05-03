import { listPublishedBlogPosts } from "@/data/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await listPublishedBlogPosts();

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-2 text-3xl font-bold">Blog</h1>
      <p className="mb-8 text-muted-foreground">
        News and tips from the CodeMaster team.
      </p>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                {post.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-muted-foreground">No published posts yet.</p>
      )}
    </div>
  );
}
