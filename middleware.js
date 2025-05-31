import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // If user visits login page and already has token, redirect to dashboard
  if (pathname === "/admin-annex-global-conferences" && token) {
    return NextResponse.redirect(
      new URL("/admin-annex-global-conferences/dashboard", request.url)
    );
  }

  // Protect dashboard route
  if (
    pathname.startsWith("/admin-annex-global-conferences/dashboard") &&
    !token
  ) {
    return NextResponse.redirect(
      new URL("/admin-annex-global-conferences", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-annex-global-conferences",
    "/admin-annex-global-conferences/dashboard/:path*",
  ],
};