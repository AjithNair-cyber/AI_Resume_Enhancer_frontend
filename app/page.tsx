"use client";

import HeroSection from "@/components/Hero";
import Loader from "@/components/Loader";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  if (status == "loading") {
    return <Loader />;
  }

  if (status == "unauthenticated") {
    router.push("/");
  }

  return (
    <div>
      <HeroSection />
    </div>
  );
}
