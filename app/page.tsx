import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { BsFire, BsFillBuildingFill, BsHearts } from "react-icons/bs";
import { BiSolidCity } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TbLogout } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EventCard, { EventCardProps } from "@/components/homepage/event-card";
import PostButton from "@/components/PostButton";
import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
// const feeds: { title: string; href: string; description: string }[] = [
//   { title: "Trending", href: "/", description: "Trending events" },
//   { title: "Friends", href: "/friends", description: "Events from friends" },
//   {
//     title: "Community",
//     href: "/community",
//     description: "Events from your communities",
//   },
// ];
const sampleEvents: EventCardProps[] = [
  {
    title: "Volleyball on the swamp",
    description: "Come play volleyball on the swamp!",
    likes: 0,
    attendees: [
      {
        displayName: "Nate Hayman",
        userName: "nathanielhayman",
        avatar:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff0%2F6c%2F98%2Ff06c986500a82f9c16e821ebac0503d1.jpg&f=1&nofb=1&ipt=a2da82c15e128613866c1a3c915861215fa8032685bf61c12fe0b0a044369bfe&ipo=images",
      },
      {
        displayName: "Nate Hayman",
        userName: "nathanielhayman",
        avatar:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff0%2F6c%2F98%2Ff06c986500a82f9c16e821ebac0503d1.jpg&f=1&nofb=1&ipt=a2da82c15e128613866c1a3c915861215fa8032685bf61c12fe0b0a044369bfe&ipo=images",
      },
      {
        displayName: "Nate Hayman",
        userName: "nathanielhayman",
        avatar:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff0%2F6c%2F98%2Ff06c986500a82f9c16e821ebac0503d1.jpg&f=1&nofb=1&ipt=a2da82c15e128613866c1a3c915861215fa8032685bf61c12fe0b0a044369bfe&ipo=images",
      },
      {
        displayName: "Nate Hayman",
        userName: "nathanielhayman",
        avatar:
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff0%2F6c%2F98%2Ff06c986500a82f9c16e821ebac0503d1.jpg&f=1&nofb=1&ipt=a2da82c15e128613866c1a3c915861215fa8032685bf61c12fe0b0a044369bfe&ipo=images",
      },
    ],
  },
  {
    title: "Study in Olin",
    description: "Come study with us in Olin Library!",
    likes: 0,
  },
  {
    title: "Study in Olin",
    description: "Come study with us in Olin Library!",
    likes: 0,
  },
  {
    title: "Study in Olin",
    description: "Come study with us in Olin Library!",
    likes: 0,
  },
  {
    title: "Study in Olin",
    description: "Come study with us in Olin Library!",
    likes: 0,
  },
  {
    title: "Study in Olin",
    description: "Come study with us in Olin Library!",
    likes: 0,
  },
];

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const authUser = (await supabase.auth.getUser()).data.user!;
  const userId = authUser?.id;
  const user = (await supabase.from("profiles").select().eq("id", userId))
    .data?.[0];

  const organizationIds = user?.organizations;
  const organizationData = [];
  for (let i = 0; i < organizationIds?.length; i++) {
    const o = await supabase
      .from("organizations")
      .select()
      .eq("id", organizationIds[i]);
    organizationData.push(o?.data?.[0]);
  }

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-neutral-500 rounded-lg sm:hidden hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-50 dark:bg-neutral-800">
          <div className="flex flex-col h-full justify-between">
            <div>
              <ul className="space-y-2 font-medium">
                <li className="w-full text-center">
                  <span className="font-bold text-2xl duration-300 flex-1 ml-1 whitespace-nowrap">
                    Pull Up
                  </span>
                </li>
                <hr />
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 rounded-lg group hover:bg-neutral-100 duration-300"
                  >
                    <BsFire size={25} className="text-[#E68B38] duration-300" />
                    <span className="font-bold group-hover:text-[#E68B38] duration-300 flex-1 ml-1 whitespace-nowrap">
                      Trending
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 rounded-lg group hover:bg-neutral-100 duration-300"
                  >
                    <BsHearts
                      size={25}
                      className="group-hover:text-accent-500 text-neutral-500 duration-300"
                    />
                    <span className="group-hover:text-accent-500 duration-300 flex-1 ml-1 whitespace-nowrap">
                      Interested
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 rounded-lg group hover:bg-neutral-100 duration-300"
                  >
                    <FaUserFriends
                      size={25}
                      className="group-hover:text-success text-neutral-500 duration-300"
                    />
                    <span className="group-hover:text-success duration-300 flex-1 ml-1 whitespace-nowrap">
                      Friends
                    </span>
                  </a>
                </li>
                <hr />
                <li>
                  <a
                    href="#"
                    className="flex items-center p-2 rounded-lg group hover:bg-neutral-100 duration-300"
                  >
                    <BiSolidCity
                      size={25}
                      className="group-hover:text-primary-500 text-neutral-500 duration-300"
                    />
                    <span className="group-hover:text-primary-500 duration-300 flex-1 ml-1 whitespace-nowrap">
                      Organizations
                    </span>
                  </a>
                </li>
                {organizationData.length > 0
                  ? organizationData.map((o) => (
                      <li>
                        <a
                          href="#"
                          className="flex items-center p-2 rounded-lg group hover:bg-neutral-100 duration-300"
                        >
                          <BsFillBuildingFill
                            size={25}
                            className="group-hover:text-primary-500 text-neutral-500 duration-300"
                          />
                          <span className="group-hover:text-primary-500 duration-300 flex-1 ml-1 whitespace-nowrap">
                            {o ? o.display_name : ""}
                          </span>
                        </a>
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
            <div>
              {authUser && (
                <div className="flex flex-row">
                  <Avatar className="mr-2">
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>
                      {(user.name ?? "A")[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-bold">{user.username}</p>
                    <p className="text-sm">{user.name}</p>
                  </div>
                </div>
              )}
              {!authUser && (
                <div className="flex flex-row">
                  <Button className="text-white w-full mr-2">
                    <Link href="/auth/login">Login</Link>
                  </Button>
                  <Button className="text-white w-full">
                    <Link href="/auth/register">Register</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
          {/* <Button variant="ghost">
              <Link href="/auth/sign-out">
                <TbLogout />
              </Link>
            </Button> */}
        </div>
      </aside>

      <div className="sm:ml-64 pt-6">
        <div className="grid grid-cols-3 gap-4">
          {sampleEvents.map((e) => (
            <EventCard {...e} />
          ))}
        </div>
      </div>

      <PostButton />
    </>
  );
}
