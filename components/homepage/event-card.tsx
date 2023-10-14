"use client"

import React, { useState } from 'react';
import { BasicOrg, BasicUser, SVGList } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

import { BsHearts } from 'react-icons/bs';
import { postAPI } from '../std';


export interface TagProps {
    title: string,
    tcolor: string,
    bgcolor: string,
    hcolor: string,
    weight: number,
    icon: string
}

export interface EventCardProps {
    title: string
    description: string,
    likes: number,
    thumb?: string,
    organization?: BasicOrg,
    tags?: TagProps[],
    attendees?: BasicUser[],
}

export interface ButtonProps<T> {
    callback: (pressed: boolean) => T
}


const Tag: React.FunctionComponent<TagProps> = (props) => (
    <div className={`h-2 bg-${props.bgcolor} hover:bg-${props.hcolor}`}>
        <>
            {SVGList[props.icon]}
            <p className={`text-sm text-${props.tcolor}`}>{props.title}</p>
        </>
    </div>
)

function Button<T>(props: ButtonProps<T>) {
    const [pressed, setPressed] = useState(false);

    const onPress = () => {
        setPressed(!pressed);
        //props.callback(!pressed);
    }

    return (
        <div className={`flex items-center justify-center space-x-2 rounded-lg p-2 
            border border-solid cursor-pointer 
            ${pressed 
                ? `text-[#ffffff] bg-accent-500 hover:bg-none hover:text-accent-500 hover:border-accent-500`
                
                : `text-neutral-400 border-neutral-400 hover:text-[#ffffff] hover:bg-accent-500.
                
                primary}`}`}
        >
            <BsHearts
                onClick={onPress}
            />
            <span>I'm interested!</span>
        </div>
    )
}

const EventCard: React.FunctionComponent<EventCardProps> = (props) => {
    const likePost = (liked: boolean) => {
        postAPI('/like-event', {id: "", value: liked});
    }

    return (
        <Card>
            <CardHeader className="space-y-0.5">
                <CardTitle className="text-lg font-bold">{props.title}</CardTitle>  
            </CardHeader>
            {/* <div className="h-[0.05rem] bg-neutral-300" /> */}
            <CardContent>
                    <>
                        <p className="text-sm text-muted-foreground">{props.description}</p>
                        {props.attendees?.map(a => (
                            <img src={a.avatar} alt=""/>
                        ))}
                        {props.tags?.map(t => {
                            <Tag {...t}/>
                        })}

                        <p>Posted to</p>
                        
                        <Button callback={likePost} />
                    </>
                </CardContent>
        </Card>
    )
}

export default EventCard;