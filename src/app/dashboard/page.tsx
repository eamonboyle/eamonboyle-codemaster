import { currentUser } from "@/lib/current-user";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return <div className="container mx-auto py-8">Hello {user.email}!</div>;
}
