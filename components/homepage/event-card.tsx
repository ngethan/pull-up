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
  BsTrash,
} from "react-icons/bs";
import { postAPI } from "../std";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa";
import { Form } from "../ui/form";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDriveFileMove } from 'react-icons/md';
export interface TagProps {
    id: string;
  title: string;
  tcolor: string;
  bgcolor: string;
  hcolor: string;
  weight: number;
  icon: string;
}

export interface EventCardProps {
    activeUser: string,
    id: string,
  title: string;
  organizer: BasicUser;
  likes: number;
  description?: string;
  thumb?: string;
  organization?: BasicOrg;
  tags?: TagProps[];
  attendees?: BasicUser[];
  deleteEvent?: () => void;
}

export interface ButtonProps<T> {
    children: ReactNode;
    toggleable?: boolean;
    className?: string;
  callback?: (pressed: boolean) => T;
}

export const Tag: React.FunctionComponent<TagProps> = (props) => (
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
    props.callback!(!pressed);
    if (props.toggleable)
        setPressed(!pressed);
  };

  return (
    <a
        onClick={onPress}
      className={`flex items-center justify-center space-x-2 rounded-md p-2
            border border-solid cursor-pointer
            ${
              pressed
                ? `text-[#ffffff] bg-primary-500 hover:bg-none hover:text-primary-500 hover:border-primary-500`
                : `text-primary-500 border-neutral-200 hover:bg-primary-500 hover:text-[#fff] hover:border-primary-500 hover:shadow-md duration-300`
            } ${props.className}`}
    >
        {props.children}
      {/* <BsHearts  /> */}
      {/* <span className="text-sm">Read More</span> */}
    </a>
  );
}

const EventCard: React.FunctionComponent<EventCardProps> = (props) => {
    var initialHeight: number | undefined = 0;

    const [expanded, setExpanded] = useState(false);
    const [spanNum, setSpanNum] = useState(1);
    const [hovered, setHovered] = useState(false);

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

  const handleInterested = (e: Event) => {
    console.log(e);
  };

  const handleJoin = (e: Event) => {
    console.log(e);
  };

  const handleEdit = () => {

  };

  const handleDelete = () => {

  };

  const handleMove = () => {

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
            key={props.id}
            className={`relative mx-auto w-full cursor-pointer duration-300 hover:-translate-y-[7px] ${expanded ? `row-span-2` : ""}`}
            onClick={handleCardPress}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
        <CardHeader className="space-y-0.5">
            <div className="flex justify-between">
            <div className="flex flex-col">
                <CardTitle className="text-lg font-bold">{props.title}</CardTitle>
                <p className="text-sm text-neutral-600">
                Organized by <a 
                        className="text-primary-900 text-bold"
                        href={`/u/${props.organizer?.username}`}>{props.organizer?.name}
                    </a>
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
            <p ref={descriptionRef} className="text-xs text-muted-foreground">
                {props.description?.length! > 200 && !expanded ? props.description?.slice(0, 200) + "..." : props.description}
                </p>
            {props.tags?.map((t) => {
                <Tag {...t} />;
            })}
            </>
        </CardContent>
        <CardFooter className="float-right">
            <div className="flex space-x-2">
            <CustomButton
                callback={() => handleInterested}
            >
                <BsHeart size={20} />
            </CustomButton>
            <CustomButton
                callback={() => handleJoin}
            >
                <BsPlusLg size={20} />
            </CustomButton>
            {/* <CustomButton/> */}
            </div>
        </CardFooter>
        { hovered && 
            <div className="flex absolute bottom-0 left-[2rem]">
                <CustomButton 
                    className="rounded-none rounded-tl-md"
                    callback={() => handleEdit}
                >
                    <BiEditAlt size={18} />
                </CustomButton>
                <CustomButton 
                    className="rounded-none border-l-[1px]"
                    callback={() => handleDelete}
                >
                    <BsTrash size={18} />
                </CustomButton>
                <CustomButton 
                    className="rounded-none rounded-tr-md"
                    callback={() => handleMove}
                >
                    <MdOutlineDriveFileMove size={18} />
                </CustomButton>
            </div>
        }
        </Card>
  );
};

export default EventCard;
