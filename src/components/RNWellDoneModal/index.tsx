import {View, Image, Dimensions} from 'react-native';
import React from 'react';
import {wellDoneModalProps} from './interface';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import RNButton from '../RNButton';
import RNModal from '../RNModal';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';
import {translation} from '@tandem/utils/methods';

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
          isTablet && {
            marginHorizontal: !portrait
              ? verticalScale(200)
              : verticalScale(80),
          },
        ]}>
        <Image
          source={require('../../assets/png/greenTick.png')}
          style={styles.tick}
        />
        <RNTextComponent isSemiBold style={styles.heading}>
          {translation('WELL_DONE')}
        </RNTextComponent>
        <RNTextComponent style={styles.info}>
          You answered all the questions
        </RNTextComponent>
        <RNButton
          customStyle={styles.button}
          onClick={() => {
            renderModal();
            nextClick();
          }}
          title={translation('OK')}
        />
      </View>
    </RNModal>
  );
};

export default RNWellDoneModal;
