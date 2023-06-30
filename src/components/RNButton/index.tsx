import { Pressable, StyleSheet, } from 'react-native'
import React from 'react'
import themeColor from '../../theme/themeColor';
import RNTextComponent from '../RNTextComponent';
import { Props } from './interface';
import { verticalScale } from 'react-native-size-matters';


const RNButton = ({ props, customStyle, onlyBorder, title , buttonColor, noBorderRadius , onClick , onlyIcon , IconButtoncustomStyle , icon, textStyle }: Props) => {
    return (
        <>
      {!onlyIcon ?  <Pressable style={[styles.container, 
            {...buttonColor && { borderColor: buttonColor, backgroundColor: buttonColor }},
            {...onlyBorder && { backgroundColor: 'white' }},
            {...noBorderRadius && { borderRadius: 0 }},
            ( customStyle &&  customStyle),
        ]} {...props} onPress={onClick}>
            <RNTextComponent isSemiBold style={[{fontSize : verticalScale(14), color: themeColor.white, ...(onlyBorder && { color: buttonColor || themeColor.themeBlue }) } , (textStyle && textStyle) ]}>
                {title}
            </RNTextComponent>
        </Pressable> : (
            <Pressable style={[styles.iconContainer, (IconButtoncustomStyle  && IconButtoncustomStyle)]} {...props} onPress={onClick}    >
                {icon}
            </Pressable>
        )  }
        </>
    )
}

export default RNButton;

const styles = StyleSheet.create({

    container: {
        borderWidth: 2,
        // maxHeight: 54,
        height: verticalScale(50),
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: themeColor.themeBlue,
        backgroundColor: themeColor.themeBlue,
        paddingHorizontal : verticalScale(28)
    },
    iconContainer: {
        borderRadius: verticalScale(12),
        backgroundColor: '#F1F4F9',
        justifyContent: 'center',
        alignItems: 'center',
        height : verticalScale(36),
        width : verticalScale(36),
      },
})
