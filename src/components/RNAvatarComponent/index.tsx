import {Pressable} from 'react-native';
import React, {useState} from 'react';
import {avatarComponentProps} from './interface';
import {styles} from './styles';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

const RNAvatarComponent = ({
  Icon,
  customStyle,
  pressableDisable,
}: avatarComponentProps) => {
  const [select, setSelect] = useState(false);

  return (
    <Pressable
      style={[
        styles.container,
        select && {backgroundColor: themeColor.themeBlue},
        customStyle && customStyle,
      ]}
      disabled={pressableDisable}
      onPress={() => {
        setSelect(!select);
      }}>
      <Icon.icon height={verticalScale(95)} />
    </Pressable>
  );
};

export default RNAvatarComponent;
