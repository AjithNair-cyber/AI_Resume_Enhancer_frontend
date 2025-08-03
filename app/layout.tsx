import NavbarComponent from "@/components/NavBar";
import "./global.css";
import { ThemeModeScript } from "flowbite-react";
import { Analytics } from "@vercel/analytics/next";
import Provider from "./Provider";
import PrivateRoute from "@/components/HOCs/PrivateRoute";

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
        <Provider>
          <NavbarComponent />
          <PrivateRoute>
            {/* Wrapping children with PrivateRoute to protect routes */}
            {children}
          </PrivateRoute>
          {/* Navbar component is placed outside of PrivateRoute to ensure it is always rendered */}
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
