import {View, Image, Dimensions} from 'react-native';
import React from 'react';
import {wellDoneModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import RNButton from '../RNButton';
import RNModal from '../RNModal';
import i18n from '@tandem/constants/lang/i18n';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';

const RNWellDoneModal = ({
  visible = true,
  renderModal,
  nextClick,
}: wellDoneModalProps) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const height = Dimensions.get('screen').height;

  return (
    <RNModal
      visible={visible}
      customStyle={(styles.modal, {height: height})}
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
          {i18n.t('WELL_DONE')}
        </RNTextComponent>
        <RNTextComponent style={styles.info}>
          you named 2 animals beginning with the letter C!
        </RNTextComponent>
        <RNButton
          customStyle={styles.button}
          onClick={nextClick}
          title={i18n.t('NEXT')}
        />
      </View>
    </RNModal>
  );
};

export default RNWellDoneModal;
