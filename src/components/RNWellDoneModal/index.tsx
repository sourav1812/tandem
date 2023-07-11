import {View, Image} from 'react-native';
import React from 'react';
import {wellDoneModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import RNButton from '../RNButton';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import RNModal from '../RNModal';

const RNWellDoneModal = ({
  visible = true,
  renderModal,
  nextClick,
}: wellDoneModalProps) => {
  const isTablet = checkIfTablet();
  return (
    <RNModal
      visible={visible}
      customStyle={styles.modal}
      renderModal={renderModal}>
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
    </RNModal>
  );
};

export default RNWellDoneModal;
