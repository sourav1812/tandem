import {View, ViewStyle, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Inactive from '@tandem/assets/svg/InactiveCheckbox';
import Active from '@tandem/assets/svg/ActiveCheckbox';
import RNTextComponent from '../RNTextComponent';
import i18n from '@tandem/constants/lang/i18n';

export interface Props {
  customStyle?: ViewStyle;
  onAccept: () => void;
}

const RNCheckboxWithText = ({customStyle, onAccept}: Props) => {
  const [select, setSelect] = useState(false);

  const toggleCheckbox = () => {
    onAccept();
    setSelect(!select);
  };

  return (
    <Pressable
      onPress={toggleCheckbox}
      style={[styles.container, customStyle && customStyle]}>
      <View>{select ? <Active /> : <Inactive />}</View>
      <RNTextComponent style={styles.text}>
        {i18n.t('I_AGREE_TO_THE_TERMS')}
      </RNTextComponent>
    </Pressable>
  );
};

export default RNCheckboxWithText;
