import { NavbarComponent } from "@/components/NavBar";
import "./global.css";
import { ThemeModeScript } from "flowbite-react";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      className="bg-linear-to-r from-bgLight to-lightContainer dark:bg-linear-to-r dark:from-darkContainer dark:to-bgDark dark:text-white text-primary"
    >
      <head>
        <title>AI Resume Enhancer</title>
        <ThemeModeScript />
      </head>
      <body>
        <NavbarComponent />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
