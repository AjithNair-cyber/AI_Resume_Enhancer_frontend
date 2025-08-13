"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Image from "next/image";
import LogoImage from "../public/logo.png";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NavbarComponent() {
  const { status } = useSession();
  const router = useRouter();

  return (
    <Navbar
      fluid
      className="dark:bg-bgDark border-b-1 border-white bg-lightContainer mb-12"
    >
      <NavbarBrand href="/">
        <Image src={LogoImage.src} alt="logo" width={200} height={80} />
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="upload">Upload</NavbarLink>
        <NavbarLink href="resumes">My Resumes</NavbarLink>
        {status == "unauthenticated" ? (
          <NavbarLink
            className="hover:cursor-pointer"
            onClick={() => router.push("/signin")}
          >
            Login
          </NavbarLink>
        ) : (
          <NavbarLink
            className="hover:cursor-pointer"
            onClick={() => signOut()}
          >
            Logout
          </NavbarLink>
        )}
        {status == "unauthenticated" && (
          <NavbarLink
            className="hover:cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </NavbarLink>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}
