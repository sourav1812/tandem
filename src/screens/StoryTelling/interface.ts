

import { characterProps } from "../../components/RNCharacterComponent/interface"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"



export const characterList : characterProps[]  = [
    {characterName : 'Princess Lili' , url : require('../../assets/png/character1.png') },
    {characterName : 'Frutti' , url : require('../../assets/png/character2.png') },
]

export interface stateObject {
    ratingModal  : boolean;
}