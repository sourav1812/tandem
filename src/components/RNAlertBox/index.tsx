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
import themeColor from '@tandem/theme/themeColor';

const RNAlertBox = ({
  visible,
  renderModal,
  type,
  message,
  possibleResolution,
}: AlertBoxInterface) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const {onSuccess, onDestructive} = useAppSelector(
    state => state.alertBoxReducer.data,
  );

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
            alignItems: 'center',
            justifyContent: 'center',
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: onDestructive ? 'space-around' : 'center',
            alignSelf: 'center',
            width: '100%',
          }}>
          <RNButton
            onClick={() => {
              if (onSuccess) {
                onSuccess();
              }
              dispatch(clearAlertData());
            }}
            title={'OK'}
            customStyle={[
              styles.button2,
              {minWidth: onDestructive ? '60%' : '90%'},
            ]}
          />
          {onDestructive ? (
            <RNButton
              onClick={() => {
                if (onDestructive) {
                  onDestructive();
                }
                dispatch(clearAlertData());
              }}
              title={'NO'}
              customStyle={[
                styles.button2,
                {
                  backgroundColor: themeColor.red,
                  borderColor: themeColor.red,
                  minWidth: '60%',
                },
              ]}
            />
          ) : null}
        </View>
      </View>
    </RNModal>
  );
};

export default RNAlertBox;
