/* eslint-disable react-native/no-inline-styles */
import {View, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import RNTextComponent from '../RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import {Props} from './interface';
import {verticalScale} from 'react-native-size-matters';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';

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
}: Props) => {
  const [highlight, setHighlight] = useState(false);
  const isTablet = checkIfTablet();

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
          style={{
            fontSize: isTablet ? 16 : verticalScale(12),
            marginBottom: 4,
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
          onChangeText={updateText}
          value={value}
        />
      </View>
    </View>
  );
};

export default RNTextInputWithLabel;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  box: {
    paddingHorizontal: verticalScale(10),
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
