import {View, TextInput, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import RNTextComponent from '../RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import Show from '@tandem/assets/svg/Eye';
import Hide from '@tandem/assets/svg/CloseEye';
import {Props} from './interface';
import {verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const RNSecureTextInput = ({
  props,
  label,
  hint,
  updateText,
  value,
  inputStyle,
  showError,
  title,
  customStyle,
}: Props) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [highlight, setHighlight] = useState<boolean>(false);
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
    <View style={[styles.container, customStyle && customStyle]}>
      <RNTextComponent
        style={{fontSize: isTablet ? 16 : verticalScale(12), marginBottom: 6}}>
        {title}
      </RNTextComponent>
      <View
        style={[
          styles.box,
          highlight && {borderWidth: 1, borderColor: themeColor.themeBlue},
        ]}>
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
          onChangeText={updateText}
          value={value}
          secureTextEntry={!showPassword}
        />
        <Pressable onPress={togglePassword}>
          {showPassword ? <Show /> : <Hide />}
        </Pressable>
      </View>
      {showError && (
        <RNTextComponent style={styles.label}>{label}</RNTextComponent>
      )}
    </View>
  );
};

export default RNSecureTextInput;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1
  },
  box: {
    paddingHorizontal: verticalScale(14),
    borderRadius: verticalScale(12),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColor.lightGray,
  },
  textinput: {
    flex: 1,
    paddingHorizontal: verticalScale(8),
    paddingVertical: verticalScale(14),
    color: themeColor.black,
    fontSize: verticalScale(12),
    marginRight: verticalScale(14),
  },
  label: {fontSize: verticalScale(11), marginTop: 6, color: themeColor.red},
});
