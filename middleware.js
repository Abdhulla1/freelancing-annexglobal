import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const isProtected = request.nextUrl.pathname.startsWith("/admin-annex-global-conferences/dashboard");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/admin-annex-global-conferences", request.url));
  }

  return NextResponse.next();
}

// defineing which routes should use middleware
export const config = {
  matcher: ["/admin-annex-global-conferences/dashboard/:path*"],
};
