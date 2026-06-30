// import { NextResponse, NextRequest } from "next/server";

// const publicRoutes = ["/login", "/register"];
// const adminRoutes = ["/admin"];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // get token from cookies (middleware-safe way)
//   const token = request.cookies.get("token")?.value;

//   const isPublicRoute = publicRoutes.some((route) =>
//     pathname.startsWith(route),
//   );

//   const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

//   // Not logged in → block protected routes
//   if (!token && !isPublicRoute) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   //  logged in user → block auth pages
//   if (token && isPublicRoute) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // admin protection (simple version)
//   if (token && isAdminRoute) {
//     try {
//       // NOTE: only works if token contains role in payload (JWT)
//       const payload = JSON.parse(
//         Buffer.from(token.split(".")[1], "base64").toString(),
//       );

//       if (payload?.role !== "admin") {
//         return NextResponse.redirect(new URL("/unauthorized", request.url));
//       }
//     } catch {
//       return NextResponse.redirect(new URL("/login", request.url));
//     }
//   }

//   return NextResponse.next();
// }

// // routes where middleware runs
// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
// };
