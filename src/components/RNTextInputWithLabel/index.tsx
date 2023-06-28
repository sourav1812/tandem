import {View, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import RNTextComponent from '../RNTextComponent';
import themeColor from '../../theme/themeColor';
import Show from '../../assets/svg/Eye';
import {Props} from './interface';

const RNTextInputWithLabel = ({
  props,
  label,
  showLabel ,
  hint,
  updateText,
  value,
  inputStyle,
  showIcon,
  backgroundColor,
  Icon,
}: Props) => {
  const [highlight, setHighlight] = useState(false);

  const toggleHighlight = () => {
    setHighlight(!highlight);
  };

  return (
    <View style={styles.container}>
      {showLabel && (
        <RNTextComponent style={{fontSize: 14, marginBottom: 8}}>
          {label}
        </RNTextComponent>
      )}
      <View
        style={[
          styles.box,
          highlight && {borderColor: themeColor.themeBlue},
          {backgroundColor: backgroundColor ? backgroundColor : undefined},
        ]}>
        {Icon && Icon}
        <TextInput
          style={[styles.textinput, inputStyle && inputStyle]}
          {...props}
          placeholder={hint}
          onFocus={toggleHighlight}
          onBlur={toggleHighlight}
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
    alignItems: 'center',
    // borderWidth: 1
  },
  box: {
    paddingHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textinput: {
    padding: 14,
    color: themeColor.black,
    fontSize: 14,
  },
});
