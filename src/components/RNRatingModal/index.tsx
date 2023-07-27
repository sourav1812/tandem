import {View} from 'react-native';
import React from 'react';
import {ratingList, ratingModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import RNButton from '../RNButton';
import RNModal from '../RNModal';
import i18n from '@tandem/constants/lang/i18n';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const RNRatingModal = ({visible, renderModal, nextClick}: ratingModalProps) => {
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
          {i18n.t('AGREE_ON_A_RATING_FOR_THE_STORY')}:
        </RNTextComponent>
        <View style={styles.content}>
          {ratingList.map((item, index) => {
            return (
              <View key={index} style={styles.rateView}>
                <RNTextComponent style={styles.emoji}>
                  {item.name}
                </RNTextComponent>
              </View>
            );
          })}
        </View>
        <RNButton
          customStyle={styles.button}
          onClick={nextClick}
          title={i18n.t('RATE')}
        />
      </View>
    </RNModal>
  );
};

export default RNRatingModal;
