import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
// import { getTokenData } from "./utils/token";

export async function middleware(req: NextRequest) {
  if (
    ["/dashboard", "/api/v1/user", "/api/v1/card"].some((ele) =>
      req.nextUrl.pathname.startsWith(ele)
    )
  ) {
    if ((await cookies()).has("token")) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.searchParams.set("login", "true");
    return NextResponse.redirect(url);
  }

  // if (
  //   ["/api/v1/user", "/api/v1/card"].some((ele) =>
  //     req.nextUrl.pathname.startsWith(ele)
  //   )
  // ) {
  //   const url = req.nextUrl.clone();
  //   url.pathname = "/";
  //   url.searchParams.set("login", "true");
  //   if (!cookies().has("token")) {
  //     return NextResponse.redirect(url);
  //   }
  // }
}

export const config = {
  matcher: ["/dashboard/:path", "/api/v1/card/:path", "/api/v1/user"],
};
