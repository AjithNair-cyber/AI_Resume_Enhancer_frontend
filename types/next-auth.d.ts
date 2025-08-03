// types/next-auth.d.ts
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user:DefaultSession["user"] & {
      name?: string | null;
      email?: string | null;
      id?: string;
      accessToken?: string;
      // ✅ Add custom fields here
    };
  }

}
