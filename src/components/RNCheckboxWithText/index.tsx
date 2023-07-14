import {View, ViewStyle, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Inactive from '@tandem/assets/svg/InactiveCheckbox';
import Active from '@tandem/assets/svg/ActiveCheckbox';
import RNTextComponent from '../RNTextComponent';
import i18n from '@tandem/constants/api/lang/i18n';

export interface Props {
  customStyle?: ViewStyle;
}

const RNCheckboxWithText = ({customStyle}: Props) => {
  const [select, setSelect] = useState(false);

  const toggleCheckbox = () => {
    setSelect(!select);
  };

  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <Pressable onPress={toggleCheckbox}>
        {select ? <Active /> : <Inactive />}
      </Pressable>
      <RNTextComponent style={styles.text}>
        {i18n.t('I_AGREE_TO_THE_TERMS')}
      </RNTextComponent>
    </View>
  );
};

export default RNCheckboxWithText;
