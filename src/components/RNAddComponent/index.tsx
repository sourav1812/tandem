import {View} from 'react-native';
import React from 'react';
import Add from '@tandem/assets/svg/Add';
import {styles} from './styles';
import {translation} from '@tandem/utils/methods';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import {addComponentProps} from './interface';

const RNAddComponent = ({
  customStyle,
  boxStyle,
  textStyle,
}: addComponentProps) => {
  return (
    <View style={[boxStyle && boxStyle]}>
      <View style={[styles.container, customStyle && customStyle]}>
        <Add size={verticalScale(32)} />
      </View>
      <RNTextComponent style={[styles.name, textStyle && textStyle]}>
        {translation('ADD_ACCOUNT')}
      </RNTextComponent>
    </View>
  );
};

export default RNAddComponent;
