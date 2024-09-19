"use client";

import { useAuth, useUser } from "@clerk/nextjs";

export default function DashboardPage() {
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { user } = useUser();

  if (!isLoaded) {
    // Handle loading state however you like
    return null;
  }

  if (isSignedIn) {
    return (
      <div className="container mx-auto py-8">Hello {user?.fullName}!</div>
    );
  }

  return <div>Not signed in</div>;
}
