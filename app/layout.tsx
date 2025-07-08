import { NavbarComponent } from "@/components/NavBar";
import "./global.css";
import { ThemeModeScript } from "flowbite-react";

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
        <ThemeModeScript />
      </head>
      <body>
        <NavbarComponent />
        {children}
      </body>
    </html>
  );
}
