import { Pressable, StyleSheet, } from 'react-native'
import React from 'react'
import themeColor from '../../theme/themeColor';
import RNTextComponent from '../RNTextComponent';
import { Props } from './interface';
import { verticalScale } from 'react-native-size-matters';


const RNButton = ({ props, customStyle, onlyBorder, title , buttonColor, noBorderRadius , onClick , onlyIcon , IconButtoncustomStyle , icon }: Props) => {
    return (
        <>
      {!onlyIcon ?  <Pressable style={[styles.container, 
            {...buttonColor && { borderColor: buttonColor, backgroundColor: buttonColor }},
            {...onlyBorder && { backgroundColor: 'white' }},
            {...noBorderRadius && { borderRadius: 0 }},
            ( customStyle &&  customStyle),
        ]} {...props} onPress={onClick}>
            <RNTextComponent isSemiBold style={{ color: themeColor.white, ...(onlyBorder && { color: buttonColor || themeColor.themeBlue }), fontSize: verticalScale(15) }}>
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
        height: 54,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: themeColor.themeBlue,
        backgroundColor: themeColor.themeBlue,
    },
    iconContainer: {
        borderRadius: 12,
        backgroundColor: '#F1F4F9',
        justifyContent: 'center',
        alignItems: 'center',
        height : verticalScale(36),
        width : verticalScale(36),
      },
})