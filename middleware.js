import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server"

export { default } from "next-auth/middleware"

export async function middleware(request) {
	const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
	const url = request.nextUrl;
	const { pathname } = url;

	const userURI = "/u/home";

	if (token && (
		pathname.startsWith("/login") ||
		pathname.startsWith("/register")
	)) {
		return NextResponse.redirect(new URL(userURI, request.url));
	}
	if (!token && pathname.startsWith(userURI)) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (!token && (pathname.startsWith("/logout") || pathname.startsWith("/onboard/set-user"))) {
		return NextResponse.redirect(new URL("/", request.url));
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
		"/onboard/set-user"
	]
}