import { View, Text, TextInputProps, TextInput, StyleSheet, StyleProp } from 'react-native'
import React, { useState } from 'react'
import RNTextComponent from '../RNTextComponent';
import themeColor from '../../theme/themeColor';
import Show from '../../assets/svg/Eye'
import { Props } from './interface';



const RNTextInputWithLabel = ({ props, label = 'Label', showLabel = true, hint = 'Text...', updateText, value, inputStyle, showIcon, Icon }: Props) => {

    const [highlight, setHighlight] = useState(false)

    const toggleHighlight = () => {
        setHighlight(!highlight)
    }

    return (
        <View style={styles.container}>
            {showLabel && <RNTextComponent style={{ fontSize: 14, marginBottom: 8 }}>
                {label}
            </RNTextComponent>}
            <View style={{
                ...styles.box,
                ...(highlight && { borderColor: themeColor.themeBlue }),
            }} >
                {showIcon && (
                    <Show />
                )}
                <TextInput
                    style={{
                        ...styles.textinput,
                        ...(inputStyle as Object)
                    }}
                    {...props}
                    placeholder={hint}
                    onFocus={toggleHighlight}
                    onBlur={toggleHighlight}
                    onChangeText={updateText}
                    value={value}
                />
            </View>
        </View>
    )
}

export default RNTextInputWithLabel;

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1
    },
    box: {
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textinput: {
        paddingVertical: 14,
        color: themeColor.black,
        fontSize: 14,
    }
})