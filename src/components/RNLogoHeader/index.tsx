import {View, Image} from 'react-native';
import React from 'react';
import {LogoHeaderProps} from './interface';
import {styles} from './styles';
import Back from '../../assets/svg/LeftArrow';
import RNButton from '../RNButton';
import RNTextComponent from '../RNTextComponent';
import navigateTo from '@tandem/navigation/navigate';

const RNLogoHeader = ({
  customStyle,
  textHeading,
  heading,
  titleStyle,
  rightIcon,
  onRightButtonPress,
  customRight = false,
  showBackButton = true,
}: LogoHeaderProps) => {
  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <View style={styles.sides}>
        {showBackButton && (
          <RNButton
            onlyIcon
            icon={<Back />}
            onClick={() => {
              if (customRight && onRightButtonPress) {
                onRightButtonPress();
              } else {
                navigateTo();
              }
            }}
          />
        )}
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
      <View style={[styles.sides, {alignItems: 'flex-end'}]}>
        {rightIcon && rightIcon}
      </View>
    </View>
  );
};

export default RNLogoHeader;
