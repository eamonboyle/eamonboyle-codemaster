import { currentUser } from "@/lib/current-user";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  if (user.role === "INSTRUCTOR") {
    // send to instructor dashboard
    redirect("/instructor/dashboard");
  }

  return <div className="container mx-auto py-8">Hello {user.email}!</div>;
}
