"use client";

import { Button } from "flowbite-react";
import Resume from "../public/eb2619e1-9aa5-4aaf-860f-146515ab2279_pages-to-jpg-0001.jpg";
import { SparklesText } from "./magicui/sparkles-text";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex md:flex-row flex-col gap-10">
      <div className="ml-4 flex-1">
        <h1 className="text-primary leading-tight dark:text-secondaryDark text-5xl font-bold tracking-tight text-center">
          Get Hired Faster with
        </h1>
        <p className=" text-blue-600 dark:text-primaryDark md:text-7xl text-5xl font-bold text-center">
          AI-Enhanced Resume
        </p>
        <p className="text-primary leading-snug font-semibold dark:text-secondaryDark mt-4 md:text-2xl text-xl text-center">
          Enter your dream job or job description and enhance your resume with
          tailor made
        </p>
        <p className="text-primary font-semibold dark:text-secondaryDark md:text-2xl text-xl text-center">
          professional summary and skills
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link href="/upload">
            <Button className="bg-blue-600 pl-8 pr-8 pt-6 pb-6 ">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      <div className="ml-4 mr-6 flex-1 flex mb-4">
        <center>
          <SparklesText>
            {" "}
            <Image
              src={Resume.src}
              alt="Resume Image"
              className="w-1/2 shadow-2xl"
            />
          </SparklesText>
        </center>
      </div>
    </div>
  );
}
