import CredentialsProvider from 'next-auth/providers/credentials';
import { login } from "../login";

export const authOptions = {
    providers: [
        CredentialsProvider.default({
            name: "credentials",
            async authorize(credentials) {
                const { email, password } = credentials;

                const response = await login(email, password);

                if (!response.success) {
                    throw new Error(response?.message || "Unable to login..");
                }

                return response
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.id = user.id;
                token.email = user.email,
                token.username = user.username
            }

            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.username = token.username
            }

            return session;
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/logout"
    },
    session: {
        strategy: "jwt"
    },
    // secret: process.env.NEXTAUTH_SECRET1
}