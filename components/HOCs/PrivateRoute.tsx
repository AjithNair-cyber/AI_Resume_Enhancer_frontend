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
    // If the user is unauthenticated and not on the login page, redirect
    if (
      status === "unauthenticated" &&
      location !== "/api/auth/signin" &&
      location !== "/"
    ) {
      router.push("/api/auth/signin");
    }
  }, [status, location, router]);

  if (status === "loading") {
    return <Loader />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
