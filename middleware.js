import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const userContextCookie = request.cookies.get("userContext")?.value;

  const { pathname } = request.nextUrl;

  // Redirect if user visits login but is already authenticated
  if (pathname === "/admin-annex-global-conferences" && token) {
    return NextResponse.redirect(
      new URL("/admin-annex-global-conferences/dashboard", request.url)
    );
  }

  // Redirect if accessing dashboard without token
  if (
    pathname.startsWith("/admin-annex-global-conferences/dashboard") &&
    !token
  ) {
    return NextResponse.redirect(
      new URL("/admin-annex-global-conferences", request.url)
    );
  }

  // ⛔️ Block dashboard access for isRoleUser === true
  if (
    pathname === "/admin-annex-global-conferences/dashboard/conference" &&
    userContextCookie
  ) {
    try {
      const userContext = JSON.parse(userContextCookie);
      if (userContext.isRoleUser === true) {
            return NextResponse.rewrite(new URL("/404", request.url));
      }
    } catch (err) {
      console.error("Invalid userContext cookie:", err);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-annex-global-conferences",
    "/admin-annex-global-conferences/dashboard/:path*",
  ],
};
