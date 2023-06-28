import { ImageSourcePropType } from "react-native";

export interface colorPalette {
    color : string,
    icon : ImageSourcePropType,
    isSelected : boolean;
    colorCode : string;
}
export interface stateObject {
    colorPalette : colorPalette[],
}