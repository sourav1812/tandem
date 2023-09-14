import {View, ViewStyle, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Inactive from '@tandem/assets/svg/InactiveCheckbox';
import Active from '@tandem/assets/svg/ActiveCheckbox';
import RNTextComponent from '../RNTextComponent';
import {translation} from '@tandem/utils/methods';

export interface Props {
  customStyle?: ViewStyle;
  onAccept: () => void;
  content: string;
  isRequired: boolean;
}

const RNCheckboxWithText = ({
  customStyle,
  onAccept,
  content,
  isRequired,
}: Props) => {
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
        {content}
        {'\n'}
        {!isRequired && (
          <RNTextComponent style={styles.optional}>
            ({translation('OPTIONAL')})
          </RNTextComponent>
        )}
      </RNTextComponent>
    </Pressable>
  );
};

export default RNCheckboxWithText;
