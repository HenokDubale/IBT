import { NextResponse } from "next/server";

// It only checks that a session cookie EXISTS.
// The real check (is it valid, who is it) happens in getSession().
export function proxy(request) {
  if (!request.cookies.has("session")) {
    const { pathname, search } = request.nextUrl;
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Only these routes. Every other route skips the proxy.
export const config = {
  matcher: ["/cart", "/checkout", "/orders/:path*", "/dashboard"],
};
