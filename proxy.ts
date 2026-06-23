import { NextResponse, type NextRequest } from "next/server";

const publicRoutes = ["/login", "/register"];
const protectedRoutes = ["/dashboard", "/admin"];

const startsWithRoute = (pathname: string, routes: string[]) =>
  routes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;
  const isPublicRoute = startsWithRoute(pathname, publicRoutes);
  const isProtectedRoute = startsWithRoute(pathname, protectedRoutes);

  if (!token && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
