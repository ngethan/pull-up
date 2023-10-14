import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { BsFire, BsFillBuildingFill, BsHearts } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// const feeds: { title: string; href: string; description: string }[] = [
//   { title: "Trending", href: "/", description: "Trending events" },
//   { title: "Friends", href: "/friends", description: "Events from friends" },
//   {
//     title: "Community",
//     href: "/community",
//     description: "Events from your communities",
//   },
// ];

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });

  const authUser = (await supabase.auth.getUser()).data.user!;
  const userId = authUser?.id;
  const user = (await supabase.from("profiles").select().eq("id", userId))
    .data![0];
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
                <BsFillBuildingFill
                  size={25}
                  className="group-hover:text-primary-500 text-neutral-500 duration-300"
                />
                <span className="group-hover:text-primary-500 duration-300 flex-1 ml-1 whitespace-nowrap">
                  Organizations
                </span>
              </a>
            </li>
            {/* map organizations here */}
          </ul>
          <div className="flex flex-row">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {(user.name ?? "A")[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p>{user.name}</p>
              <p>{authUser.email}</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        {" "}
        {/* fix width issues here */}
        <div className="p-4 border-2 border-neutral-200 border-dashed rounded-lg dark:border-neutral-700">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-neutral-50 dark:bg-neutral-800">
              <p className="text-2xl text-neutral-400 dark:text-neutral-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-neutral-50 dark:bg-neutral-800">
              <p className="text-2xl text-neutral-400 dark:text-neutral-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-neutral-50 dark:bg-neutral-800">
              <p className="text-2xl text-neutral-400 dark:text-neutral-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-neutral-50 dark:bg-neutral-800">
            <p className="text-2xl text-neutral-400 dark:text-neutral-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-neutral-50 h-28 dark:bg-neutral-800">
              <p className="text-2xl text-neutral-400 dark:text-neutral-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-neutral-50 h-28 dark:bg-neutral-800">
              <p className="text-2xl text-neutral-400 dark:text-neutral-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-neutral-50 h-28 dark:bg-neutral-800">
              <p className="text-2xl text-neutral-400 dark:text-neutral-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-neutral-50 h-28 dark:bg-neutral-800">
              <p className="text-2xl text-neutral-400 dark:text-neutral-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-neutral-50 dark:bg-neutral-800">
            <p className="text-2xl text-neutral-400 dark:text-neutral-500">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded bg-neutral-50 h-28 dark:bg-neutral-800">
              <p className="text-2xl text-neutral-400 dark:text-neutral-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-neutral-50 h-28 dark:bg-neutral-800">
              <p className="text-2xl text-neutral-400 dark:text-neutral-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-neutral-50 h-28 dark:bg-neutral-800">
              <p className="text-2xl text-neutral-400 dark:text-neutral-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-neutral-50 h-28 dark:bg-neutral-800">
              <p className="text-2xl text-neutral-400 dark:text-neutral-500">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
