import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

import Navbar from "./nav/navbar";

const feeds: { title: string, href: string, description: string }[] = [
  {title: "Trending", href: "/", description: "Trending events"},
  {title: "Friends", href: "/friends", description: "Events from friends"},
  {title: "Community", href: "/community", description: "Events from your communities"}
]

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Navbar/>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-bold">Some Post</CardTitle>  
            <p>hello</p>
            <CardContent>
              <p className="text-sm text-muted-foreground">This is some kind of card content</p>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
