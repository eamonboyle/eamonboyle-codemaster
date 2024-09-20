import { initialUser } from "@/lib/initial-user";
import { redirect } from "next/navigation";

export default async function Page() {
  // Initialize user if needed
  const user = await initialUser();

  if (user) {
    if (user.role === "ADMIN") {
      redirect("/admin/dashboard");
    } else if (user.role === "INSTRUCTOR") {
      redirect("/instructor/dashboard");
    } else {
      redirect("/dashboard");
    }
  }

  return <div>Finish Sign Up</div>;
}
