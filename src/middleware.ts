// src/middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null
  const role = req.cookies.get("role")?.value || null

  const { pathname } = req.nextUrl

  if (pathname.startsWith("/faculty") && role !== "staff") {
    return NextResponse.redirect(new URL("/unauth", req.url))
  }

  if (pathname.startsWith("/student") && role !== "student") {
    return NextResponse.redirect(new URL("/unauth", req.url))
  }
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauth", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/faculty/:path*", "/student/:path*", "/admin/:path*"],
}
