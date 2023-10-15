"use client";

import React, { ReactNode, useCallback, useEffect, useRef, useState } from "react";
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
  BsHeart,
  BsHearts,
  BsPlusLg,
} from "react-icons/bs";
import { postAPI } from "../std";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { Form } from "../ui/form";
export interface TagProps {
  title: string;
  tcolor: string;
  bgcolor: string;
  hcolor: string;
  weight: number;
  icon: string;
}

export interface EventCardProps {
    uuid: string,
  title: string;
  organizer: BasicUser;
  likes: number;
  description?: string;
  thumb?: string;
  organization?: BasicOrg;
  tags?: TagProps[];
  attendees?: BasicUser[];
}

export interface ButtonProps<T> {
  callback?: (pressed: boolean) => T;
}

const Tag: React.FunctionComponent<TagProps> = (props) => (
  <div className={`h-2 bg-${props.bgcolor} hover:bg-${props.hcolor}`}>
    <>
      {SVGList[props.icon]}
      <p className={`text-sm text-${props.tcolor}`}>{props.title}</p>
    </>
  </div>
);

function CustomButton<T>(props: ButtonProps<T>) {
  const [pressed, setPressed] = useState(false);

  const onPress = () => {
    setPressed(!pressed);
    //props.callback(!pressed);
  };

  return (
    <div
      className={`flex items-center justify-center space-x-2 rounded-lg p-2
            border border-solid cursor-pointer
            ${
              pressed
                ? `text-[#ffffff] bg-accent-500 hover:bg-none hover:text-accent-500 hover:border-accent-500`
                : `text-neutral-400 border-neutral-400 hover:bg-accent-500 hover:text-[#fff] hover:border-accent-500 hover:shadow-md duration-300`
            }`}
    >
      {/* <BsHearts onClick={onPress} /> */}
      <span className="text-sm">Read More</span>
    </div>
  );
}

const EventCard: React.FunctionComponent<EventCardProps> = (props) => {
    var initialHeight: number | undefined = 0;

    const [expanded, setExpanded] = useState(false);
    const [spanNum, setSpanNum] = useState(1);

    const descriptionRef = useCallback((node: HTMLDivElement) => {
        if (props.description?.length! > 200) {
            if (expanded) {
                console.log(node.clientHeight!/initialHeight!);
                setSpanNum(Math.ceil(node.clientHeight!/initialHeight!));
            }
            else {
                initialHeight = expanded ? initialHeight : node.clientHeight;
                console.log(initialHeight);
            }
            
        }
    }, []);

  const likePost = (liked: boolean) => {
    postAPI("/like-event", { id: "", value: liked });
  };

  const handleInterested = (e: Event) => {
    console.log(e);
  };

  const handleJoin = (e: Event) => {
    console.log(e);
  };

  const handleCardPress = () => {
    if (props.description?.length! > 200)
        setExpanded(!expanded);
  }

//   console.log(props.attendees);

//   useEffect(() => {
//       console.log("hello");
//       if (props.description.length > 200) {
//         console.log(Math.ceil(descriptionRef.current?.clientHeight!/initialHeight!));
//         setSpanNum();
//       }
//   }, [spanNum]);

  return (
        <Card 
            key={props.uuid}
            className={`mx-auto w-full cursor-pointer duration-300 hover:-translate-y-[7px] ${expanded ? `row-span-2` : ""}`}
            onClick={handleCardPress}
        >
        <CardHeader className="space-y-0.5">
            <div className="flex justify-between">
            <div className="flex flex-col">
                <CardTitle className="text-lg font-bold">{props.title}</CardTitle>
                <p className="text-sm text-neutral-600">
                Organized by {props.organizer?.name}
                </p>
            </div>
            <div className="flex mb-5 -space-x-6">
                {props.attendees
                ?.filter((_, i) => i < 3)
                .map((a) => (
                        a.avatar_url ?
                            <img
                                className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                src={a.avatar_url}
                                alt=""
                            />
                        :
                            <p className="flex items-center justify-center w-10 h-10 text-sm font-medium text-white bg-gray-700 border-2 border-white rounded-full" >
                                {a.name ? a.name.charAt(0) : "?"}
                            </p>
                ))}
                {props.attendees && props.attendees.length > 3 && (
                    <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">
                        +{props.attendees.length - 3}
                    </a>
                )}
            </div>
            </div>
        </CardHeader>
        {/* <div className="h-[0.05rem] bg-neutral-300" /> */}
        <CardContent>
            <>
            <p ref={descriptionRef} className="text-sm text-muted-foreground">
                {props.description?.length! > 200 && !expanded ? props.description?.slice(0, 200) + "..." : props.description}
                </p>
            {props.tags?.map((t) => {
                <Tag {...t} />;
            })}
            </>
        </CardContent>
        <CardFooter className="float-right">
            <div className="flex space-x-2">
            <Button
                size="icon"
                variant="outline"
                onClick={() => handleInterested}
            >
                <BsHeart size={20} className="text-primary-500" />
            </Button>
            <Button size="icon" variant="outline" onClick={() => handleJoin}>
                <BsPlusLg size={20} className="text-primary-500" />
            </Button>
            {/* <CustomButton/> */}
            </div>
        </CardFooter>
        </Card>
  );
};

export default EventCard;
