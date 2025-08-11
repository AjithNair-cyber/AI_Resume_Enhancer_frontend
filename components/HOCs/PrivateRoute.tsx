"use client";

import { useSession } from "next-auth/react";
import Loader from "../Loader";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  const location = usePathname();

  useEffect(() => {
    if (status === "loading") return;

    // Redirect unauthenticated users trying to access private routes
    if (
      status === "unauthenticated" &&
      location !== "/signup" &&
      location !== "/" &&
      location !== "/signin"
    ) {
      router.push("/signin");
    }

    // Redirect authenticated users away from signin or signup pages
    if (
      status === "authenticated" &&
      (location === "/signin" || location === "/signup")
    ) {
      router.push("/");
    }
  }, [status, location, router]);

  if (status === "loading") {
    return <Loader />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
