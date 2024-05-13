/* eslint-disable react-native/no-inline-styles */
import {View, TextInput, StyleSheet, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import RNTextComponent from '../RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import {Props} from './interface';
import {verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import validateForm, {FORM_INPUT_TYPE} from '@tandem/utils/validations';
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
  rightSideIconProp,
  autoCapitalize = undefined,
  multiline = undefined,
  labelStyle,
  editable = true,
  scrollEnabled,
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
    <View style={[styles.container, containerStyle && containerStyle]}>
      {label && (
        <RNTextComponent
          style={[
            {
              fontSize: isTablet ? 16 : verticalScale(12),
              marginBottom: 2,
            },
            labelStyle,
          ]}>
          {label}
        </RNTextComponent>
      )}
      <View
        style={[
          styles.box,
          {
            borderWidth: 1,
            borderColor: highlight ? themeColor.themeBlue : 'transparent',
          },
          {backgroundColor: backgroundColor ? backgroundColor : undefined},
          inputViewStyle && inputViewStyle,
        ]}>
        {Icon && Icon}
        <TextInput
          textContentType={
            validationType === FORM_INPUT_TYPE.PASSWORD
              ? 'password'
              : validationType === FORM_INPUT_TYPE.EMAIL
              ? 'emailAddress'
              : 'none'
          }
          keyboardType={
            validationType === FORM_INPUT_TYPE.EMAIL
              ? 'email-address'
              : 'default'
          }
          editable={editable}
          multiline={multiline}
          autoCapitalize={autoCapitalize}
          scrollEnabled={scrollEnabled}
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
            if (updateText) {
              if (validationType) {
                updateText(validateForm(validationType, text));
              } else {
                updateText({value: text});
              }
            }
          }}
          value={value.value}
          secureTextEntry={rightSideIcon && !showPassword && !rightSideIconProp}
        />
        {rightSideIcon &&
          (rightSideIconProp ? (
            <Pressable onPress={togglePassword}>{rightSideIconProp}</Pressable>
          ) : (
            <Pressable onPress={togglePassword}>
              {showPassword ? <Show /> : <Hide />}
            </Pressable>
          ))}
      </View>
      <Text
        style={[
          styles.errorText,
          errorTextStyle,
          {color: value?.message ? 'darkred' : 'transparent'},
        ]}>
        {value.message}
      </Text>
    </View>
  );
};

export default RNTextInputWithLabel;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  errorText: {
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
    fontSize: verticalScale(14),
    flex: 1,
  },
});
