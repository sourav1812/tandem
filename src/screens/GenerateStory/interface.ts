import { FC, ReactNode } from "react";

export interface colorPalette {
    color : string,
    icon : ReactNode,
    isSelected : boolean;
}
export interface STATE {
    questionNumber : number;
    colorPalette : colorPalette[]
}

interface PLACE {
    name : string;
    icon :string ;
}

export  const place : PLACE[] = [
    {name : 'Home' , icon : '🏠' },
    {name : 'City' , icon : '🏙️' },
    {name : 'Jungle' , icon : '🌴' },
    {name : 'Farm' , icon : '🐮' },
    {name : 'Hill' , icon : '⛰️' },
    {name : 'Camp' , icon : '⛺' },
]  

export  const audience : PLACE[] = [
    {name : 'Domestic nimals' , icon : '🐱' },
    {name : 'Peoples' , icon : '👦🏽' },
    {name : 'Farm animals' , icon : '🐮' },
    {name : 'Jungle animals' , icon : '🦁' },
    {name : 'Space aliens' , icon : '👽' },
    {name : 'Scientists' , icon : '👨‍🔬' },
]  

export  const typeOfStory : PLACE[] = [
    {name : 'Fairy tale' , icon : '✨' },
    {name : 'Adventure' , icon : '🏄' },
    {name : 'Silly/Comedy' , icon : '🤣' },
    {name : "I don't know" , icon : '☹️' },
]  

