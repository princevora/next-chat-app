import NextAuth from "next-auth/next";
import { authOptions } from "./auth";


const handler = NextAuth.default(authOptions);

export { handler as GET, handler as POST }