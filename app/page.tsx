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
import {
  deleteOneFromDB,
  getAllFromDB,
  getAllFromDBWithMatch,
  getOneFromDB,
} from "@/components/db";
import LogoSVG from "./logo";
import LargeLogoSVG from "./large_logo";
import GridDisplay from "@/components/homepage/grid-display";

// const feeds: { title: string; href: string; description: string }[] = [
//   { title: "Trending", href: "/", description: "Trending events" },
//   { title: "Friends", href: "/friends", description: "Events from friends" },
//   {
//     title: "Community",
//     href: "/community",
//     description: "Events from your communities",
//   },
// ];
// const sampleEvents: EventCardProps[] = [
//   {
//     uuid:"abc1",
//     title: "Study in Olin",
//     description: "Vero dolor dignissimos minima animi cum tempore velit. Corporis mollitia quibusdam eaque atque sit quasi. Laboriosam amet eos deleniti recusandae alias.Rem in aut sint molestiae ut. Mollitia et rerum quibusdam quis voluptate excepturi praesentium. Quo architecto corporis quo et et molestias. Maxime facilis ut repellat soluta temporibus. Sit dolorum optio qui illum doloremque amet. Incidunt sed tempora reiciendis doloribus placeat reprehenderit et repellendus.Ex dolor maxime et magnam culpa autem fugit quos. Repellat aspernatur expedita placeat harum alias illum. Fugiat ut in quia qui alias.Mollitia ut dolor quod. Iste facilis iste dolores. Asperiores cumque corrupti occaecati. Aut sint laborum nisi. Tempore qui ea aut a et ipsa dolor. Eum eveniet consequatur iste deserunt eaque animi.Ex eius nulla aperiam. Nam non placeat sint dolores vero voluptatibus expedita accusamus. Velit reiciendis saepe perspiciatis temporibus aut in omnis eum. Fuga incidunt tempore odit error assumenda cum quibusdam. Voluptates aut laudantium non blanditiis sint asperiores est.",
//     likes: 0,
//   },
//   {
//     uuid:"abc2",
//     title: "Volleyball on the swamp",
//     description: "Come play volleyball on the swamp!",
//     likes: 0,
//     attendees: [
//       {
//         displayName: "Nate Hayman",
//         userName: "nathanielhayman",
//         avatar:
//           "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff0%2F6c%2F98%2Ff06c986500a82f9c16e821ebac0503d1.jpg&f=1&nofb=1&ipt=a2da82c15e128613866c1a3c915861215fa8032685bf61c12fe0b0a044369bfe&ipo=images",
//       },
//       {
//         displayName: "Nate Hayman",
//         userName: "nathanielhayman",
//         avatar:
//           "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff0%2F6c%2F98%2Ff06c986500a82f9c16e821ebac0503d1.jpg&f=1&nofb=1&ipt=a2da82c15e128613866c1a3c915861215fa8032685bf61c12fe0b0a044369bfe&ipo=images",
//       },
//       {
//         displayName: "Nate Hayman",
//         userName: "nathanielhayman",
//         avatar:
//           "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff0%2F6c%2F98%2Ff06c986500a82f9c16e821ebac0503d1.jpg&f=1&nofb=1&ipt=a2da82c15e128613866c1a3c915861215fa8032685bf61c12fe0b0a044369bfe&ipo=images",
//       },
//       {
//         displayName: "Nate Hayman",
//         userName: "nathanielhayman",
//         avatar:
//           "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Ff0%2F6c%2F98%2Ff06c986500a82f9c16e821ebac0503d1.jpg&f=1&nofb=1&ipt=a2da82c15e128613866c1a3c915861215fa8032685bf61c12fe0b0a044369bfe&ipo=images",
//       },
//     ],
//   },
//   {
//     uuid:"abc3",
//     title: "Study in Olin1",
//     description: "Come study with us in Olin Library!",
//     likes: 0,
//   },
//   {
//     uuid:"abc4",
//     title: "Study in Olin2",
//     description: "Come study with us in Olin Library!",
//     likes: 0,
//   },
//   {
//     uuid:"abc5",
//     title: "Study in Olin3",
//     description: "Come study with us in Olin Library!",
//     likes: 0,
//   },
//   {
//     uuid:"abc6",
//     title: "Study in Olin4",
//     description: "Come study with us in Olin Library!",
//     likes: 0,
//   },
// ];

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

  const deleteEvent = async (event: string) => {
    "use server";
    await deleteOneFromDB(supabase, "events", event);
  };

  const deleteOrg = async (org: string) => {
    "use server";
    await deleteOneFromDB(supabase, "organizations", org);
  };

  const unpackUsers = async (inp: any) => {
    var parsed = await Promise.all<any>(
      inp.map((x: string) => getOneFromDB(supabase, "profiles", x)),
    );

    return parsed.map((x) => x[0]);
  };

  const parseCards = async (d: any, dest: string) => {
    return Promise.all(
      d.map(async (elm: any) => {
        if (dest == "organizations") {
          var parsedOrganizer = await getOneFromDB(
            supabase,
            "profiles",
            elm.organizer,
          );
          parsedOrganizer = parsedOrganizer[0];

          elm.attendees = await unpackUsers(elm.attendees);
          elm.organizer = parsedOrganizer;

          return elm;
        } else if (dest == "events") {
          var parsedOwner = await getOneFromDB(supabase, "profiles", elm.owner);
          parsedOwner = parsedOwner[0];

          elm.members = await unpackUsers(elm.members);
          elm.owner = parsedOwner;

          return elm;
        }
      }),
    );
  };

  const getEventData: () => Promise<any> = async () => {
    return getAllFromDB(supabase, "events").then(async (d) => {
      return parseCards(d, "events");
    });
  };

  const getDataByMatch: <T extends unknown>(
    dest: string,
    param: string,
    value: T,
  ) => Promise<any[]> = async <T extends unknown>(
    dest: string,
    param: string,
    value: T,
  ) => {
    "use server";
    return getAllFromDBWithMatch(supabase, dest, param, value).then(
      async (d) => {
        return parseCards(d, dest);
      },
    );
  };

  const getDataByContains: <T extends unknown>(
    dest: string,
    param: string,
    value: T,
  ) => Promise<any[]> = async <T extends unknown>(
    dest: string,
    param: string,
    value: T,
  ) => {
    "use server";
    return getAllFromDBWithMatch(supabase, dest, param, value).then(
      async (d) => {
        return parseCards(d, dest);
      },
    );
  };

  const OGgetEventData: () => Promise<any> = async () => {
    "use server";
    return getAllFromDB(supabase, "events").then(async (d) => {
      return Promise.all(
        d.map(async (event: any) => {
          var parsedAttend = await Promise.all<any>(
            event.attendees.map((x: string) =>
              getOneFromDB(supabase, "profiles", x),
            ),
          );

          var parsedOrganizer = await getOneFromDB(
            supabase,
            "profiles",
            event.organizer,
          );

          parsedAttend = parsedAttend.map((x) => x[0]);
          parsedOrganizer = parsedOrganizer[0];

          console.log(parsedOrganizer);

          event.attendees = parsedAttend;
          event.organizer = parsedOrganizer;

          return event;
        }),
      );
    });
  };

  const getWeights: () => Promise<any> = async () => {
    "use server";
    return getAllFromDB(supabase, "weighted_events").then(async (d) => {
      d.sort((a: any, b: any) => a.value-b.value);
      return Promise.all(
        d.map(async (w: any) => {
          return getOneFromDB(supabase, "events", w.event_id).then(async (event: any) => {

            console.log("Hello");

            var parsedAttend = await Promise.all<any>(
              event.attendees.map((x: string) =>
                getOneFromDB(supabase, "profiles", x),
              ),
            );
  
            var parsedOrganizer = await getOneFromDB(supabase, "profiles", event.organizer);
  
            parsedAttend = parsedAttend.map(x => x[0]);
            parsedOrganizer = parsedOrganizer[0];
  
            console.log(parsedOrganizer);
  
            event.attendees = parsedAttend;
            event.organizer = parsedOrganizer;
  
            return event;
          })
        }),
      );
    });
  };

  // const eventData = await getEventData();

  const eventData = await getWeights();

  // console.log(data[0].attendees);

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

      <div className="flex flex-row w-screen">
        <aside
          id="default-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-50 dark:bg-neutral-800">
            <div className="flex flex-col h-full justify-between">
              <div>
                <ul className="space-y-2 font-medium">
                  <li className="flex flex-row w-full">
                    <LogoSVG />
                    {/* <LargeLogoSVG/> */}
                    {/* <span className="font-bold text-2xl duration-300 flex-1 ml-1 whitespace-nowrap">
                    Pull Up
                  </span> */}
                  </li>
                  <hr />
                  <li>
                    <a
                      href="#"
                      className="flex items-center p-2 rounded-lg group hover:bg-neutral-100 duration-300"
                    >
                      <BsFire
                        size={25}
                        className="text-[#E68B38] duration-300"
                      />
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
                <div>{authUser !== null && <PostButton />}</div>
                <div className="bg-neutral-200/80 rounded-lg p-2">
                  {authUser && (
                    <div className="flex flex-row justify-between w-full">
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
                      <Button
                        variant="ghost"
                        className="hover:text-primary-500 duration-300"
                      >
                        <Link href="/auth/sign-out">
                          <TbLogout size={20} />
                        </Link>
                      </Button>
                    </div>
                  )}
                  {!authUser && (
                    <div className="flex flex-row">
                      <Button className="text-white w-full mr-2">
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button className="text-white w-full">
                        <Link href="/register">Register</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </aside>

        <GridDisplay
          eventData={eventData}
          userId={userId}
          content={"events"}
        />
      </div>
    </>
  );
}
