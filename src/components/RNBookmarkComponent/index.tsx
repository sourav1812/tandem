import {View, Image} from 'react-native';
import React from 'react';
import {Props} from './interface';
import Bookmark from '@tandem/assets/svg/Bookmark';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import i18n from '@tandem/constants/api/lang/i18n';

const RNBookmarkComponent = ({
  props,
  customStyle,
  borderIconColor,
  heading,
  subHeading,
  showIcon = true,
}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {...(borderIconColor && {borderColor: borderIconColor})},
        {
          ...(showIcon && {
            backgroundColor: borderIconColor,
            paddingVertical: verticalScale(8),
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
          <RNTextComponent style={styles.heading}>{heading}</RNTextComponent>
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
            <Image
              source={{
                uri: 'https://www.pngkit.com/png/full/216-2163934_magicians-wand-emoji-magic-wand.png',
              }}
              style={styles.img}
            />
          </View>
          <RNTextComponent numberOfLines={2} isSemiBold style={styles.text2}>
            {i18n.t('WRITE_A_STORY')}
          </RNTextComponent>
        </>
      )}
    </View>
  );
};

export default RNBookmarkComponent;
