import React, { ReactNode } from 'react';

import { RiTreeLine, RiGraduationCapLine } from 'react-icons/ri';
import { IoFastFoodOutline } from 'react-icons/io5';

export interface BasicUser {
    displayName: string,
    userName: string,
    avatar_url: string,
    bio?: string
}

export interface BasicOrg {
    displayName: string,
    userName: string,
    avatar: string,
    bio: string
}

export const SVGList: {[icon: string] : () => ReactNode} = {
    "tree": () => (<RiTreeLine/>),
    "cap": () => (<RiGraduationCapLine/>),
    "food": () => (<IoFastFoodOutline/>),
} 