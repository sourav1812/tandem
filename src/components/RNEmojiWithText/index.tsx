import { View, Text, Pressable, StyleSheet, TextComponent } from 'react-native'
import React from 'react'
import { Props } from './interface'
import Bookmark from '../../assets/svg/Bookmark'
import { styles } from './styles'
import themeColor from '../../theme/themeColor'
import RNTextComponent from '../RNTextComponent'


const RNEmojiWithText = ({ props, customStyle, heading = "Lion", emoji, showText }: Props) => {
    return (
        <Pressable style={[
            styles.container,
            (customStyle && customStyle),
        ]} {...props} >
            <RNTextComponent style={{ ...styles.emoji, ...(emoji as Object), ...(showText && { fontSize: 30 }) }} >
                🦁
            </RNTextComponent>
            {
                showText && <RNTextComponent style={styles.heading} isSemiBold >
                    {heading}
                </RNTextComponent>
            }
        </Pressable >
    )
}

export default RNEmojiWithText;
