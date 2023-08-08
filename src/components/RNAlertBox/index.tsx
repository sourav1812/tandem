/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import RNTextComponent from '../RNTextComponent';
import RNModal from '../RNModal';
import RNButton from '../RNButton';
import {verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {styles} from './style';
import {useDispatch} from 'react-redux';
import {closeAlertBox} from '@tandem/redux/slices/alertBox.slice';
import {AlertBoxInterface} from './interface';

const RNAlertBox = ({
  visible,
  renderModal,
  type,
  message,
}: AlertBoxInterface) => {
  let isTablet = useAppSelector(state => state.deviceType.isTablet);
  const dispatch = useDispatch();
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
          {type}
        </RNTextComponent>
        <RNTextComponent style={styles.info}>{message}</RNTextComponent>
        <RNButton
          onClick={() => dispatch(closeAlertBox())}
          title={'OK'}
          customStyle={[styles.button2]}
        />
      </View>
    </RNModal>
  );
};

export default RNAlertBox;
