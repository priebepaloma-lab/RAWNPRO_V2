import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // CACHE BUSTING AGRESSIVO - força revalidação em TODAS as requests
  response.headers.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0"
  );
  response.headers.set("Pragma", "no-cache");
  response.headers.set("Expires", "0");
  response.headers.set("Surrogate-Control", "no-store");
  
  // Força navegador a não usar cache do disco
  response.headers.set("Clear-Site-Data", '"cache"');

  // Add version header for debugging
  response.headers.set("X-App-Version", "v6-FINAL");
  response.headers.set("X-Cache-Bust", Date.now().toString());

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
