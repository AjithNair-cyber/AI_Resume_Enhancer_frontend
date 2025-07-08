"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";

export function NavbarComponent() {
  return (
    <Navbar
      fluid
      className="dark:bg-bgDark border-b-1 border-white bg-lightContainer mb-12"
    >
      <NavbarBrand as={Link} href="https://flowbite-react.com"></NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="upload">Upload</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
