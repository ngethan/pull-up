import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  if (pathname === "/auth/sign-out") return;

  // if user hasn't setup name yet, redirect them to setup page
  if (
    (await supabase.auth.getUser()).data.user !== null &&
    (
      await supabase
        .from("profiles")
        .select()
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
    ).data !== null &&
    (await supabase
      .from("profiles")
      .select()
      .eq("id", (await supabase.auth.getUser()).data.user?.id))!.data!.length >
      0
  ) {
    const userProfile = (
      await supabase
        .from("profiles")
        .select()
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
    ).data![0];
    if (
      userProfile.username === null &&
      !pathname.startsWith("/setup-username")
    ) {
      return NextResponse.redirect(new URL("/setup-username", req.url));
    } else if (
      (userProfile.tags === null || userProfile.tags.length === 0) &&
      !pathname.startsWith("/setup-tags") &&
      !pathname.startsWith("/setup-username")
    ) {
      return NextResponse.redirect(new URL("/setup-tags", req.url));
    }
  }

  if (
    (await supabase.auth.getUser()).data.user !== null &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();

  return res;
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
