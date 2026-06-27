import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth?.token as any;
    const path = req.nextUrl.pathname;

    // Doctor trying to access hospital dashboard → redirect to doctor view
    if (path.startsWith("/dashboard") && token?.role === "doctor") {
      return NextResponse.redirect(new URL("/doctor", req.url));
    }

    // Hospital trying to access doctor view → redirect to hospital dashboard
    if (path.startsWith("/doctor") && token?.role === "hospital") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: { signIn: "/login" },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/doctor/:path*",
  ],
};
