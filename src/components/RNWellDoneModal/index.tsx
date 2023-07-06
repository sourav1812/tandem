import {View, Image, StatusBar} from 'react-native';
import React from 'react';
import {wellDoneModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import RNButton from '../RNButton';
import {checkIfTablet} from '../../hooks/isTabletHook';

const RNWellDoneModal = ({
  visible = true,
  renderModal,
  nextClick,
}: wellDoneModalProps) => {
  const isTablet = checkIfTablet();
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
          isTablet && {marginHorizontal: verticalScale(80)},
        ]}>
        <Image
          source={require('../../assets/png/greenTick.png')}
          style={styles.tick}
        />
        <RNTextComponent isSemiBold style={styles.heading}>
          Well Done
        </RNTextComponent>
        <RNTextComponent style={styles.info}>
          you named 2 animals beginning with the letter C!
        </RNTextComponent>
        <RNButton
          customStyle={styles.button}
          onClick={nextClick}
          title="Next"
        />
      </View>
    </Modal>
  );
};

export default RNWellDoneModal;
