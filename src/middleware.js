import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server"
import { socket } from "./app/socket";

export { default } from "next-auth/middleware"

export async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const url = request.nextUrl;
    const { pathname } = url;

    const userURI = "/u/home";

    console.log(token);

    if (token && (
        pathname.startsWith("/login") ||
        pathname.startsWith("/register")
    )) {
        return NextResponse.redirect(new URL(userURI, request.url));
    }

    // If the user doesn't have a token and tries to access protected routes, redirect to "/"
    if (!token) {
        if (
            pathname.startsWith(userURI) ||
            pathname.startsWith("/u/chats") ||
            pathname.startsWith("/logout")
        ) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/u/:path*',
        "/login",
        "/register",
        "/logout",
        "/dashboard",
    ]
}