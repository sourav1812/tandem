import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import themeColor from '../../theme/themeColor';
import RNTextComponent from '../RNTextComponent';
import { Props } from './interface';


const RNButton = ({ props, customStyle, onlyBorder, children = 'Text', buttonColor, noBorderRadius }: Props) => {
    return (
        <Pressable style={[styles.container, {
            ...(buttonColor && { borderColor: buttonColor, backgroundColor: buttonColor }),
            ...(onlyBorder && { backgroundColor: 'white' }
            ),
            ...(noBorderRadius && { borderRadius: 0 }),
            ...(customStyle as Object),
        }]} {...props} >
            <RNTextComponent isSemiBold style={{ color: themeColor.white, ...(onlyBorder && { color: buttonColor || themeColor.themeBlue }), fontSize: 16 }}>
                {children}
            </RNTextComponent>
        </Pressable>
    )
}

export default RNButton;

const styles = StyleSheet.create({

    container: {
        borderWidth: 1,
        maxHeight: 54,
        height: 54,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: themeColor.themeBlue,
        backgroundColor: themeColor.themeBlue,
    }
})