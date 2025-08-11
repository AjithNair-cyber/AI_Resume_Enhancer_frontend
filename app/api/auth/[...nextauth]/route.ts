import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import getAxiosClient from "@/config/axios-instance";

const handler =  NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      id: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        console.log("Credentials:", credentials);
        let user
        try{
          const axiosInstance = getAxiosClient()
          const res =  await axiosInstance.post("/login", { email : credentials?.email, password : credentials?.password})
          console.log(res)
          user = await res?.data?.data;
        } catch(err){
          console.log(err)
        }

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin", // Displays signin buttons
    error: "/signin", // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token ;
      return session;
    },
  },
  secret : process.env.NEXTAUTH_SECRET,
});


export { handler as GET, handler as POST } 