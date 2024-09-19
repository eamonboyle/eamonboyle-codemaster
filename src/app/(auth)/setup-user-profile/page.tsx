import { initializeUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  // Initialize user if needed
  const user = await initializeUser();

  if (user) {
    redirect("/dashboard");
  }

  return <div>Finish Sign Up</div>;
}
