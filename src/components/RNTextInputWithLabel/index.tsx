/* eslint-disable react-native/no-inline-styles */
import {View, TextInput, StyleSheet, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import RNTextComponent from '../RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import {Props} from './interface';
import {verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import validateForm from '@tandem/utils/validations';
import Show from '@tandem/assets/svg/Eye';
import Hide from '@tandem/assets/svg/CloseEye';

const RNTextInputWithLabel = ({
  props,
  label,
  hint,
  updateText,
  value,
  inputStyle,
  backgroundColor,
  Icon,
  containerStyle,
  inputViewStyle,
  validationType,
  errorTextStyle,
  rightSideIcon,
}: Props) => {
  const [highlight, setHighlight] = useState(false);
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const onFocus = () => {
    setHighlight(true);
  };

  const onBlur = () => {
    setHighlight(false);
  };

  return (
    <>
      <View style={[styles.container, containerStyle && containerStyle]}>
        {label && (
          <RNTextComponent
            style={{
              fontSize: isTablet ? 16 : verticalScale(12),
              marginBottom: 2,
            }}>
            {label}
          </RNTextComponent>
        )}
        <View
          style={[
            styles.box,
            highlight && {borderWidth: 1, borderColor: themeColor.themeBlue},
            {backgroundColor: backgroundColor ? backgroundColor : undefined},
            inputViewStyle && inputViewStyle,
          ]}>
          {Icon && Icon}
          <TextInput
            style={[
              styles.textinput,
              isTablet && {paddingHorizontal: 12, paddingVertical: 16},
              inputStyle && inputStyle,
            ]}
            {...props}
            placeholder={hint}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={text => {
              if (validationType) {
                updateText(validateForm(validationType, text));
              } else {
                updateText({value: text});
              }
            }}
            value={value.value}
            secureTextEntry={rightSideIcon && !showPassword}
          />
          {rightSideIcon && (
            <Pressable onPress={togglePassword}>
              {showPassword ? <Show /> : <Hide />}
            </Pressable>
          )}
        </View>
      </View>
      {value?.message && (
        <Text style={[styles.errorText, errorTextStyle]}>{value.message}</Text>
      )}
    </>
  );
};

export default RNTextInputWithLabel;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  errorText: {
    color: 'darkred',
    fontSize: verticalScale(10),
  },
  box: {
    paddingLeft: verticalScale(10),
    paddingRight: verticalScale(30),
    borderRadius: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: {
    paddingHorizontal: verticalScale(8),
    paddingVertical: verticalScale(14),
    color: themeColor.black,
    fontSize: verticalScale(11),
  },
});
