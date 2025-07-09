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

export function NavbarComponent() {
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
      </NavbarCollapse>
    </Navbar>
  );
}
