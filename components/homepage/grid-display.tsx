"use client"

import { Tag } from "lucide-react";
import React, { useState } from "react";
import PostButton from "../PostButton";
import EventCard, { EventCardProps, TagProps } from "./event-card";
import OrgCard, { OrgCardProps } from "./org-card";


export interface GridDisplayParams {
    eventData?: EventCardProps[];
    orgData?: OrgCardProps[];
    tags?: TagProps[];
    userId: string;
    content: string;
    getDataByMatch: (dest: string, param: string, value: any) => Promise<any[]>;
    getDataByContains: (dest: string, param: string, value: any) => Promise<any[]>
}


const GridDisplay: React.FunctionComponent<GridDisplayParams> = (props) => {
    const [content, setContent] = useState(props.content);
    const [eventData, setEventData] = useState(props.eventData);
    const [orgData, setOrgData] = useState(props.orgData);

    const handleFilterChange = async (t: TagProps) => {
        if (content == "events")
            setEventData(await props.getDataByContains(content, "tags", t.id));
        else
            setOrgData(await props.getDataByContains(content, "tags", t.id));
    }

    console.log(props.userId);

    return (
        <>
            <div className="flex">
                {props.tags?.map(t => (
                    <Tag
                        onClick={() => handleFilterChange(t)}
                    />
                ))}
            </div>

            <div className="sm:ml-64 pt-6 w-full p-10">
                { content == "events" && 
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {eventData?.map((e: EventCardProps) => (
                            <EventCard {...e} activeUser={props.userId} />
                        ))}
                        {props.userId &&
                            <div className={eventData?.length! > 8 ? "absolute bottom-[2rem] right-[10rem]" : "w-full"}>
                                <PostButton />
                            </div>
                        }
                    </div>
                }

                { content == "orgs" &&
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {orgData?.map((e: OrgCardProps) => (
                            <OrgCard
                                {...e} activeUser={props.userId} 
                            />
                        ))}
                        {props.userId &&
                            <div className={orgData?.length! > 8 ? "absolute bottom-[2rem] right-[10rem]" : "w-full"}>
                                <PostButton />
                            </div>
                        }
                    </div>
                }
            </div>
        </>
    );
}

export default GridDisplay;