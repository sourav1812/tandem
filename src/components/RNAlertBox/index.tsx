/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React from 'react';
import RNTextComponent from '../RNTextComponent';
import RNModal from '../RNModal';
import RNButton from '../RNButton';
import {verticalScale} from 'react-native-size-matters';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {styles} from './style';
import {AlertBoxInterface} from './interface';
import {clearAlertData} from '@tandem/redux/slices/alertBox.slice';

const RNAlertBox = ({
  visible,
  renderModal,
  type,
  message,
  possibleResolution,
}: AlertBoxInterface) => {
  let isTablet = useAppSelector(state => state.deviceType.isTablet);
  let {onSuccess} = useAppSelector(state => state.alertBoxReducer.data);
  const dispatch = useAppDispatch();
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
        {possibleResolution && (
          <RNTextComponent style={styles.possibleResolution}>
            {possibleResolution}
          </RNTextComponent>
        )}
        <RNButton
          onClick={() => {
            if (onSuccess) {
              onSuccess();
            }
            dispatch(clearAlertData());
          }}
          title={'OK'}
          customStyle={[styles.button2]}
        />
      </View>
    </RNModal>
  );
};

export default RNAlertBox;
