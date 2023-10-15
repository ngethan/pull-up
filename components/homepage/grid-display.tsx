"use client"

import React, { useState } from "react";
import PostButton from "../PostButton";
import EventCard, { EventCardProps } from "./event-card";
import OrgCard, { OrgCardProps } from "./org-card";


export interface GridDisplayParams {
    eventData: EventCardProps[];
    getEventData?: () => Promise<any>;
    deleteEvent?: (id: string) => void;
    getOrgData?: () => Promise<any>;
    deleteOrg?: (id: string) => void;
    userId: string;
}


const GridDisplay: React.FunctionComponent<GridDisplayParams> = (props) => {
    const [content, setContent] = useState("events");
    const [orgData, setOrgData] = useState<OrgCardProps[]>();
    const [eventData, setEventData] = useState(props.eventData);

    console.log(props.userId);

    return (
        <div className="sm:ml-64 pt-6 w-full p-10">
            { content == "events" && 
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {eventData.map((e: EventCardProps) => (
                        <EventCard {...props.deleteEvent} {...e} activeUser={props.userId} />
                    ))}
                    {props.userId &&
                        <div className={eventData.length > 8 ? "absolute bottom-[2rem] right-[10rem]" : "w-full"}>
                            <PostButton />
                        </div>
                    }
                </div>
            }

            { content == "orgs" &&
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {orgData?.map((e: OrgCardProps) => (
                        <OrgCard
                            deleteOrg={props.deleteOrg}
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
    );
}

export default GridDisplay;