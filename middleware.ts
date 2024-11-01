import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (cookies().has("token")) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("login", "true");
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ["/dashboard/:path", "/api/:path"],
};
