import {View} from 'react-native';
import React from 'react';
import {readingTipsModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import RNModal from '../RNModal';
import RNButton from '../RNButton';
import {verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';

const RNReadingTipsModal = ({
  visible,
  renderModal,
  nextClick,
}: readingTipsModalProps) => {
  let isTablet = useAppSelector(state => state.deviceType.isTablet);
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
          {translation('READING_TIPS')}
        </RNTextComponent>
        <RNTextComponent style={styles.info}>
          {translation('reading-tips.you-are-both')}
        </RNTextComponent>
        <RNButton
          customStyle={styles.button}
          onClick={nextClick}
          title={translation('WELL')}
        />
      </View>
    </RNModal>
  );
};

export default RNReadingTipsModal;
