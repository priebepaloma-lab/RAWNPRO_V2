import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Force no-cache for all pages to ensure updates are immediately visible
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");

  // Add version header for debugging
  response.headers.set("X-App-Version", "v5-nocache");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, icons, manifest (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|icons|manifest.webmanifest|brand).*)",
  ],
};
