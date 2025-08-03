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
import { signIn, signOut, useSession } from "next-auth/react";

export default function NavbarComponent() {
  const { status } = useSession();

  return (
    <Navbar
      fluid
      className="dark:bg-bgDark border-b-1 border-white bg-lightContainer mb-12"
    >
      <NavbarBrand>
        <Image src={LogoImage.src} alt="logo" width={200} height={80} />
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="upload">Upload</NavbarLink>
        {status == "unauthenticated" ? (
          <NavbarLink className="hover:cursor-pointer" onClick={() => signIn()}>
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
      </NavbarCollapse>
    </Navbar>
  );
}
