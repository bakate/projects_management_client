import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function AuthenticationPage() {
  const [redirect, setRedirect] = useState<string | null>("login");
  return (
    <>
      <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to={redirect === "login" ? "/auth/signup" : "/auth"}
          onClick={() => {
            if (redirect === "login") {
              setRedirect("signup");
            } else {
              setRedirect("login");
            }
          }}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          {redirect === "login" ? "Sign Up" : "Login"}
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <Link to="/">
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              Projects Management
            </div>
          </Link>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Start where you are. Use what you have. Do what you can
                .&rdquo;
              </p>
              <footer className="text-sm">Pablo Picasso</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <Outlet />
        </div>
      </div>
    </>
  );
}
