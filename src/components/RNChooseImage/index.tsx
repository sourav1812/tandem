/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {SignoutModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import RNModal from '../RNModal';
import RNButton from '../RNButton';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';

const RNChooseImage = ({
  visible,
  renderModal,
  openCamera,
  openGallery,
}: SignoutModalProps) => {
  let isTablet = useAppSelector(state => state.deviceType.isTablet);

  return (
    <RNModal
      visible={visible}
      customStyle={styles.modal}
      renderModal={renderModal}>
      <View
        style={[
          styles.container,
          isTablet && {
            width: verticalScale(260),
            alignSelf: 'center',
            padding: 24,
          },
        ]}>
        <RNTextComponent isMedium style={styles.heading}>
          {translation('ADD_PHOTO')}
        </RNTextComponent>
        <View
          style={[styles.footerButton, isTablet && {paddingHorizontal: 40}]}>
          <RNButton
            onlyBorder
            buttonColor={themeColor.themeBlue}
            onClick={() => {
              renderModal();
              openCamera();
            }}
            title={translation('CAMERA')}
            customStyle={[styles.button2, isTablet && {maxWidth: 150}]}
          />
          <RNButton
            onClick={() => {
              renderModal();
              openGallery();
            }}
            title={translation('GALLERY')}
            customStyle={[styles.button2, isTablet && {maxWidth: 150}]}
          />
        </View>
      </View>
    </RNModal>
  );
};

export default RNChooseImage;
