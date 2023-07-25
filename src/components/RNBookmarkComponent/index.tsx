import {View, Image} from 'react-native';
import React from 'react';
import {Props} from './interface';
import Bookmark from '@tandem/assets/svg/Bookmark';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

const RNBookmarkComponent = ({
  props,
  customStyle,
  borderIconColor,
  heading,
  subHeading,
  showIcon = true,
  showSubheading = false,
  emoji,
  headingStyle,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {...(borderIconColor && {borderColor: borderIconColor})},
        {
          ...(showIcon && {
            backgroundColor: borderIconColor,
            paddingVertical: verticalScale(6),
          }),
        },
        {...(!showIcon && {justifyContent: 'center'})},
        customStyle && customStyle,
      ]}
      {...props}>
      {!showIcon ? (
        <>
          <View style={styles.icon}>
            <Bookmark fill={borderIconColor && borderIconColor} />
          </View>
          <RNTextComponent
            style={[styles.heading, headingStyle && headingStyle]}>
            {heading}
          </RNTextComponent>
          <RNTextComponent
            style={[
              styles.subHeading,
              {...(borderIconColor && {color: borderIconColor})},
            ]}>
            {subHeading}
          </RNTextComponent>
        </>
      ) : (
        <>
          <View style={styles.imgContainer}>
            {emoji && (
              <RNTextComponent style={styles.img}>{emoji}</RNTextComponent>
            )}
          </View>
          <RNTextComponent
            numberOfLines={2}
            isSemiBold
            style={[
              styles.text2,
              {marginTop: verticalScale(6)},
              headingStyle && headingStyle,
            ]}>
            {heading}
          </RNTextComponent>
          {showSubheading && (
            <RNTextComponent
              numberOfLines={1}
              style={[styles.subHeading, {color: themeColor.white}]}>
              {subHeading}
            </RNTextComponent>
          )}
        </>
      )}
    </View>
  );
};

export default RNBookmarkComponent;
