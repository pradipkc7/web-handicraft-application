import { NextResponse, type NextRequest } from "next/server";
import { getUserData } from "./lib/cookies";

const publicRoutes = ["/login", "/register"];
const adminRoutes = ["/admin"];

const startsWithRoute = (pathname: string, routes: string[]) =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;
  const user = await getUserData();
  const isPublicRoute = startsWithRoute(pathname, publicRoutes);
  const isAdminRoute = startsWithRoute(pathname, adminRoutes);

  if (!token && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (token && user) {
    if (isAdminRoute && user.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthoeized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
