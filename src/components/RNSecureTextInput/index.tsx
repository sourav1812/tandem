import { View, Text, TextInputProps, TextInput, StyleSheet, StyleProp, TextInputStyle, Pressable } from 'react-native'
import React, { useState } from 'react'
import RNTextComponent from '../RNTextComponent';
import themeColor from '../../theme/themeColor';
import Show from './../../assets/fonts/svg/Eye';
import Hide from './../../assets/fonts/svg/CloseEye'

interface Props {
    props?: TextInputProps;
    label: string;
    showLabel?: boolean;
    hint: string;
    value: string;
    updateText: (value: string) => void;
    inputStyle?: StyleProp<TextInputStyle>;
    showError?: boolean;
}

const RNSecureTextInput = ({ props, label = 'Label', showLabel = true, hint = 'Text...', updateText, value, inputStyle, showError }: Props) => {

    const [highlight, setHighlight] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const toggleHighlight = () => {
        setHighlight(!highlight)
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }



    return (
        <View style={styles.container}>
            <RNTextComponent style={{ fontSize: 14, marginBottom: 8 }}>
                Password
            </RNTextComponent>
            <View style={{
                ...styles.box,
                ...(highlight && { borderColor: themeColor.themeBlue }),
            }} >
                <TextInput
                    style={{
                        ...styles.textinput,
                        ...(inputStyle as Object),
                    }}
                    {...props}
                    placeholder={hint}
                    onFocus={toggleHighlight}
                    onBlur={toggleHighlight}
                    onChangeText={updateText}
                    value={value}
                    secureTextEntry={showPassword}
                />
                <Pressable onPress={togglePassword} >
                    {showPassword ? (
                        <Hide />
                    ) : (
                        <Show />
                    )}
                </Pressable>
            </View>
            {showError && <RNTextComponent style={{ fontSize: 15, marginTop: 5, color: themeColor.red }}>
                {label}
            </RNTextComponent>}
        </View>
    )
}

export default RNSecureTextInput;

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1
    },
    box: {
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    textinput: {
        flex: 1,
        paddingVertical: 14,
        color: themeColor.black,
        fontSize: 14,
        marginRight: 16
        // backgroundColor: themeColor.themeBlue,
    }
})