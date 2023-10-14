"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import React from "react";

import { AiOutlinePlus } from 'react-icons/ai';

const navElms: {
    title: string, symbol: string, 
    children: { title: string, href: string, description: string }[]
}[] = [
    {title: "Create", symbol: "plus", children: [
        {title: "New Event", href: "/new", description: "Create a new event"},
        {title: "Join Community", href: "/join-community", description: "Join an existing community"},
    ]}
];


export default function Navbar() {

  return (
    <>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>
                        
                    </NavigationMenuTrigger>

                    {/* Create menu */}
                    <NavigationMenuContent>
                        <ul>
                            {navElms.map(e => {
                                return (
                                    <li>
                                        <NavigationMenuLink asChild>
                                            {/* <svg></svg> */}
                                            <a href={e.href}>{e.title}</a>
                                        </NavigationMenuLink>
                                    </li>
                                )
                            })}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink>Hello</NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </>
  );
}
