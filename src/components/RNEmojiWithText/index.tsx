import {  Pressable } from 'react-native'
import React, { useState } from 'react'
import { Props } from './interface'
import { styles } from './styles'
import themeColor from '../../theme/themeColor'
import RNTextComponent from '../RNTextComponent'


const RNEmojiWithText = ({ props, customStyle, heading , emoji, showText , icon }: Props) => {

   const [isSelected, setIsSelected] = useState(false)

    return (
        <Pressable style={[
            styles.container,
            (customStyle && customStyle),
            {...(showText || isSelected) && { backgroundColor : themeColor.themeBlue }}
        ]} {...props} 
        onPress={()=>{
            setIsSelected(!isSelected)
        }}
        >
            <RNTextComponent style={{ ...styles.emoji, ...(emoji as Object), ...((showText || isSelected) && { fontSize: 40 }) }} >
                {icon}
            </RNTextComponent>
            {
                showText || isSelected && <RNTextComponent style={styles.heading} isSemiBold numberOfLines={2} >
                    {heading}
                </RNTextComponent>
            }
        </Pressable >
    )
}

export default RNEmojiWithText;
