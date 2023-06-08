
import React from 'react';
import {
    Text,
    StyleSheet,
    StyleProp,
    TextStyle,
} from 'react-native';

interface Props {
    children: string;
    isBold?: boolean;
    isSemiBold?: boolean;
    isMedium?: boolean;
    style?: StyleProp<TextStyle>;
    numberOfLines?: number;
    handleOnPress?: any;
}
const RNTextComponent = ({
    children,
    style,
    isBold,
    isMedium,
    isSemiBold,
    numberOfLines,
    handleOnPress,
}: Props) => {

    return (
        <Text
            numberOfLines={numberOfLines}
            style={[
                styles.text,
                {
                    ...(isMedium && {
                        fontSize: 16,
                        fontFamily: 'Poppins-Medium',
                    }),

                    ...(isSemiBold && { fontSize: 16, fontFamily: 'Poppins-SemiBold' }),

                    ...(isBold && { fontSize: 14, fontFamily: 'Poppins-Bold' }),

                    ...(style as object),
                },
            ]}
            onPress={handleOnPress}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
    },
});

export default RNTextComponent;
