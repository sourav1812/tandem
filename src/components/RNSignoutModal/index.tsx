/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import {SignoutModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import RNModal from '../RNModal';
import RNButton from '../RNButton';
import {verticalScale} from 'react-native-size-matters';
import en from '@tandem/constants/lang/en';
import themeColor from '@tandem/theme/themeColor';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const RNSignoutModal = ({
  visible,
  renderModal,
  nextClick,
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
        <RNTextComponent isSemiBold style={styles.heading}>
          {en.SIGN_OUT}
        </RNTextComponent>
        <RNTextComponent style={styles.info}>
          {en.IF_YOU_SIGN_OUT_OF_THIS_APP}
        </RNTextComponent>
        <View
          style={[styles.footerButton, isTablet && {paddingHorizontal: 40}]}>
          <RNButton
            onlyBorder
            buttonColor={themeColor.themeBlue}
            onClick={renderModal}
            title={en.CANCEL}
            customStyle={[styles.button2, isTablet && {maxWidth: 150}]}
          />
          <RNButton
            onClick={nextClick}
            title={en.ACCEPT}
            customStyle={[styles.button2, isTablet && {maxWidth: 150}]}
          />
        </View>
      </View>
    </RNModal>
  );
};

export default RNSignoutModal;
