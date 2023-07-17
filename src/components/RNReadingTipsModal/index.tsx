import {View} from 'react-native';
import React from 'react';
import {readingTipsModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import RNModal from '../RNModal';
import RNButton from '../RNButton';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {verticalScale} from 'react-native-size-matters';
import i18n from '@tandem/constants/lang/i18n';

const RNReadingTipsModal = ({
  visible,
  renderModal,
  nextClick,
}: readingTipsModalProps) => {
  let isTablet = checkIfTablet();
  return (
    <RNModal
      visible={visible}
      customStyle={styles.modal}
      renderModal={renderModal}>
      <View
        style={[
          styles.container,
          isTablet && {width: verticalScale(270), alignSelf: 'center'},
        ]}>
        <RNTextComponent isSemiBold style={styles.heading}>
          {i18n.t('READING_TIPS')}
        </RNTextComponent>
        <RNTextComponent style={styles.info}>
          You're both doing great. Why don`t you also try to take turns reading,
          or to ask each other questions about the story as you go along?
        </RNTextComponent>
        <RNButton
          customStyle={styles.button}
          onClick={nextClick}
          title={i18n.t('WELL')}
        />
      </View>
    </RNModal>
  );
};

export default RNReadingTipsModal;
