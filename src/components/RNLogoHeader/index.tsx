import {View, Image} from 'react-native';
import React from 'react';
import {LogoHeaderProps} from './interface';
import {styles} from './styles';
import Back from '../../assets/svg/LeftArrow';
import RNButton from '../RNButton';
import {useNavigation} from '@react-navigation/native';
import RNTextComponent from '../RNTextComponent';

const RNLogoHeader = ({
  customStyle,
  textHeading,
  heading,
  titleStyle,
}: LogoHeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <View style={styles.sides}>
        <RNButton
          onlyIcon
          icon={<Back />}
          onClick={() => {
            navigation.goBack();
          }}
        />
      </View>
      {!textHeading ? (
        <Image
          source={require('../../assets/png/logo.png')}
          style={styles.img}
          resizeMode="contain"
        />
      ) : (
        <RNTextComponent
          isSemiBold
          style={[styles.header, titleStyle && titleStyle]}>
          {heading}
        </RNTextComponent>
      )}
      <View style={styles.sides} />
    </View>
  );
};

export default RNLogoHeader;
