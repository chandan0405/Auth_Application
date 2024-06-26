import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicpath = path === "/login" || path === "/signup";
  const tockenValue = request.cookies.get("token")?.value || "";
  if (isPublicpath && tockenValue) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
  if (!isPublicpath && !tockenValue) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
