import React from 'react';

import { RiTreeLine, RiGraduationCapLine } from 'react-icons/ri';
import { IoFastFoodOutline } from 'react-icons/io5';

export interface BasicUser {
    displayName: string,
    userName: string,
    avatar: string,
    bio: string
}

export interface BasicOrg {
    displayName: string,
    userName: string,
    avatar: string,
    bio: string
}

export const SVGList: {[icon: string] : () => React.JSX.Element} = {
    "tree": () => (<RiTreeLine/>),
    "cap": () => (<RiGraduationCapLine/>),
    "food": () => (<IoFastFoodOutline/>),
} 