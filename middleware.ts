import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // if user hasn't setup name yet, redirect them to setup page
  if (
    (await supabase.auth.getUser()) !== null &&
    (await supabase
      .from("profiles")
      .select()
      .eq("id", await supabase.auth.getUser())) !== null &&
    (
      await supabase
        .from("profiles")
        .select()
        .eq("id", await supabase.auth.getUser())
    ).data !== null &&
    (await supabase
      .from("profiles")
      .select()
      .eq("id", await supabase.auth.getUser()))!.data!.length > 0 &&
    ((
      await supabase
        .from("profiles")
        .select()
        .eq("id", (await supabase.auth.getUser()).data.user?.id)
    )?.data)![0].username === null &&
    !pathname.startsWith("/setup-name")
  ) {
    return NextResponse.redirect(new URL("/setup-name", req.url));
  }

  // if user hasn't setup tags yet
  // if (
  //   (await supabase.auth.getUser()) !== null &&
  //   (await supabase
  //     .from("profiles")
  //     .select()
  //     .eq("id", await supabase.auth.getUser())) !== null &&
  //   (
  //     await supabase
  //       .from("profiles")
  //       .select()
  //       .eq("id", await supabase.auth.getUser())
  //   ).data !== null &&
  //   (await supabase
  //     .from("profiles")
  //     .select()
  //     .eq("id", await supabase.auth.getUser()))!.data!.length > 0 &&
  //   ((
  //     await supabase
  //       .from("profiles")
  //       .select()
  //       .eq("id", (await supabase.auth.getUser()).data.user?.id)
  //   )?.data)![0].tags === null &&
  //   !pathname.startsWith("/setup-name")
  // ) {
  //   console.log("c");
  //   return NextResponse.redirect(new URL("/setup-tags", req.url));
  // }

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
