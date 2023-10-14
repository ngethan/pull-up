import EventCard, { EventCardProps } from "@/components/homepage/event-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

const feeds: { title: string, href: string, description: string }[] = [
  {title: "Trending", href: "/", description: "Trending events"},
  {title: "Friends", href: "/friends", description: "Events from friends"},
  {title: "Community", href: "/community", description: "Events from your communities"}
]


const sampleEvents: EventCardProps[] = [
  {title: "Volleyball on the swamp", description: "Come play volleyball on the swamp!", likes: 0},
  {title: "Study in Olin", description: "Come study with us in Olin Library!", likes: 0}
]

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {sampleEvents.map(e => (
          <EventCard {...e} />
        ))}
      </div>
    </>
  );
}
