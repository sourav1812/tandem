import {View, StatusBar} from 'react-native';
import React from 'react';
import {ratingList, ratingModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import RNButton from '../RNButton';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';

const RNRatingModal = ({visible, renderModal, nextClick}: ratingModalProps) => {
  let isTablet = checkIfTablet();
  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      backdropOpacity={0.4}
      onBackButtonPress={renderModal}
      onBackdropPress={renderModal}>
      <StatusBar
        translucent
        backgroundColor={'rgba(0, 0, 0, 0.4)'}
        hidden={false}
        showHideTransition={'slide'}
      />
      <View
        style={[
          styles.container,
          isTablet && {width: verticalScale(270), alignSelf: 'center'},
        ]}>
        <RNTextComponent isSemiBold style={styles.heading}>
          Agree on a rating for the story:
        </RNTextComponent>
        <View style={styles.content}>
          {ratingList.map(item => {
            return (
              <View style={styles.rateView}>
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
          title="Rate"
        />
      </View>
    </Modal>
  );
};

export default RNRatingModal;
