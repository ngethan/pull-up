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
  {title: "Volleyball on the swamp", description: "Come play volleyball on the swamp!", likes: 0,
    attendees: [ {displayName: "Nate Hayman", userName: "nathanielhayman", "avatar": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff0%2F6c%2F98%2Ff06c986500a82f9c16e821ebac0503d1.jpg&f=1&nofb=1&ipt=a2da82c15e128613866c1a3c915861215fa8032685bf61c12fe0b0a044369bfe&ipo=images"}, {displayName: "Nate Hayman", userName: "nathanielhayman", "avatar": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff0%2F6c%2F98%2Ff06c986500a82f9c16e821ebac0503d1.jpg&f=1&nofb=1&ipt=a2da82c15e128613866c1a3c915861215fa8032685bf61c12fe0b0a044369bfe&ipo=images"}, {displayName: "Nate Hayman", userName: "nathanielhayman", "avatar": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff0%2F6c%2F98%2Ff06c986500a82f9c16e821ebac0503d1.jpg&f=1&nofb=1&ipt=a2da82c15e128613866c1a3c915861215fa8032685bf61c12fe0b0a044369bfe&ipo=images"} ]},
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
