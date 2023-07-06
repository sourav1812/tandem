import { StyleProp, ViewStyle } from "react-native";

export interface LogoHeaderProps {
    customStyle : StyleProp<ViewStyle>;
    textHeading ?: boolean;
    heading ?: string;
}