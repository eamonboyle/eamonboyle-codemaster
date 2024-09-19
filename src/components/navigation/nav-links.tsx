"use client";

import Link from "next/link";
import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const NavLinks: React.FC = () => {
  const { isSignedIn } = useAuth();
  const pathName = usePathname();

  const isActive = (path: string) => pathName === path;

  return (
    <>
      <Link
        href="/"
        className={cn(
          "nav-link text-white",
          isActive("/") && "font-bold underline",
        )}
      >
        Home
      </Link>
      <Link
        href="/blog"
        className={cn(
          "nav-link text-white",
          isActive("/blog") && "font-bold underline",
        )}
      >
        Blog
      </Link>
      <Link
        href="/courses"
        className={cn(
          "nav-link text-white",
          isActive("/courses") && "font-bold underline",
        )}
      >
        Courses
      </Link>
      <Link
        href="/challenges"
        className={cn(
          "nav-link text-white",
          isActive("/challenges") && "font-bold underline",
        )}
      >
        Challenges
      </Link>
      {isSignedIn && (
        <>
          <Link
            href="/dashboard"
            className={cn(
              "nav-link text-white",
              isActive("/dashboard") && "font-bold underline",
            )}
          >
            Profile
          </Link>
          <Link
            href="/code-test"
            className={cn(
              "nav-link text-white",
              isActive("/code-test") && "font-bold underline",
            )}
          >
            Code Test
          </Link>
        </>
      )}
      {!isSignedIn ? (
        <div className="flex gap-2">
          <Link href="/sign-up">
            <Button variant="outline">Sign Up</Button>
          </Link>{" "}
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      ) : (
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-6 h-6",
            },
          }}
        />
      )}
    </>
  );
};

export default NavLinks;
