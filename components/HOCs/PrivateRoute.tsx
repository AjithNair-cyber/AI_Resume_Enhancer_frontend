"use client";

import { useSession } from "next-auth/react";
import Loader from "../Loader";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  const location =
    typeof window !== "undefined" ? window.location.pathname : "";

  // If the user is on the login page, do not redirect
  if (location === "/api/auth/signin" || location === "/") {
    return <>{children}</>;
  }
  if (status === "loading") {
    return <Loader />;
  }
  if (status === "unauthenticated") {
    router.push("/api/auth/signin");
    return null; // Prevent rendering children while redirecting
  }

  return <>{children}</>;
};

export default PrivateRoute;
