import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // if user hasn't engaged in setup process yet, redirect them to setup page
  if (
    ((
      await supabase
        .from("profiles")
        .select()
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
    )?.data)![0].username === null &&
    !pathname.startsWith("/setup")
  ) {
    return NextResponse.redirect(new URL("/setup", req.url));
  }

  if (
    (await supabase.auth.getSession()) !== null &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();

  return res;
}
