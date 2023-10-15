"use client";

import React, { useState } from "react";
import { BasicOrg, BasicUser, SVGList } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  BsArrowUp,
  BsFillArrowUpSquareFill,
  BsFillSuitHeartFill,
  BsHearts,
  BsPlusLg,
} from "react-icons/bs";
import { postAPI } from "../std";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export interface TagProps {
  title: string;
  tcolor: string;
  bgcolor: string;
  hcolor: string;
  weight: number;
  icon: string;
}

export interface EventCardProps {
  title: string;
  organizer: BasicUser;
  description: string;
  likes: number;
  thumb?: string;
  organization?: BasicOrg;
  tags?: TagProps[];
  attendees?: BasicUser[];
}

export interface ButtonProps<T> {
  callback: (pressed: boolean) => T;
}

const Tag: React.FunctionComponent<TagProps> = (props) => (
  <div className={`h-2 bg-${props.bgcolor} hover:bg-${props.hcolor}`}>
    <>
      {SVGList[props.icon]}
      <p className={`text-sm text-${props.tcolor}`}>{props.title}</p>
    </>
  </div>
);

// function Button<T>(props: ButtonProps<T>) {
//   const [pressed, setPressed] = useState(false);

//   const onPress = () => {
//     setPressed(!pressed);
//     //props.callback(!pressed);
//   };

//   return (
//     <div
//       className={`flex items-center justify-center space-x-2 rounded-lg p-2
//             border border-solid cursor-pointer
//             ${
//               pressed
//                 ? `text-[#ffffff] bg-accent-500 hover:bg-none hover:text-accent-500 hover:border-accent-500`
//                 : `text-neutral-400 border-neutral-400 hover:bg-accent-500 hover:text-[#fff] hover:border-accent-500 hover:shadow-md duration-300`
//             }`}
//     >
//       <BsHearts onClick={onPress} />
//       <span className="text-sm">I'm interested!</span>
//     </div>
//   );
// }

const EventCard: React.FunctionComponent<EventCardProps> = (props) => {
  const likePost = (liked: boolean) => {
    postAPI("/like-event", { id: "", value: liked });
  };

  const handleInterested = (e: Event) => {
    console.log(e);
  };

  const handleJoin = (e: Event) => {
    console.log(e);
  };

  return (
    <Card className="cursor-pointer duration-300 hover:-translate-y-[7px]">
      <CardHeader className="space-y-0.5">
        <div className="flex content-between space-x-4">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-bold">{props.title}</CardTitle>
            <p className="text-sm text-neutral-600">
              Organized by {props.organizer?.displayName}
            </p>
          </div>
          <div className="flex mb-5 -space-x-6">
            {props.attendees
              ?.filter((_, i) => i < 3)
              .map((a) => (
                <img
                  className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                  src={a.avatar}
                  alt=""
                />
              ))}
            {props.attendees && props.attendees.length > 3 && (
              <div className="w-10 h-10 border-2 border-white bg-white rounded-full align-middle">
                <p>+{props.attendees.length - 3}</p>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      {/* <div className="h-[0.05rem] bg-neutral-300" /> */}
      <CardContent>
        <>
          <p className="text-sm text-muted-foreground">{props.description}</p>
          {props.tags?.map((t) => {
            <Tag {...t} />;
          })}
        </>
      </CardContent>
      <CardFooter className="float-right">
        <div className="flex space-x-2">
          <Button size="icon" onClick={() => handleInterested}>
            <BsFillSuitHeartFill size={25} className="text-neutral-50" />
          </Button>
          <Button size="icon" onClick={() => handleJoin}>
            <BsPlusLg size={25} className="text-neutral-50" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
