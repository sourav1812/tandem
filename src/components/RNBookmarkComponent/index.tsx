import { View, Text, Pressable, StyleSheet, TextComponent } from 'react-native'
import React from 'react'
import { Props } from './interface'
import Bookmark from '../../assets/svg/Bookmark'
import { styles } from './styles'
import themeColor from '../../theme/themeColor'
import RNTextComponent from '../RNTextComponent'


const RNBookmarkComponent = ({ props, customStyle, borderIconColor, heading = "I can't decide", subHeading = 'COMING SOON' }: Props) => {
    return (
        <Pressable style={[styles.container, {
            ...(borderIconColor && { borderColor: borderIconColor }),
            ...(customStyle as Object),
        }]} {...props} >
            <View style={styles.icon} >
                <Bookmark fill={(borderIconColor && borderIconColor)} />
            </View>
            <RNTextComponent style={styles.heading} >
                {heading}
            </RNTextComponent>
            <RNTextComponent style={{
                ...styles.subHeading,
                ...(borderIconColor && { color: borderIconColor }),
            }}>
                {subHeading}
            </RNTextComponent>
        </Pressable>
    )
}

export default RNBookmarkComponent;

