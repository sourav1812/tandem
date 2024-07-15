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
import {translation} from '@tandem/utils/methods';

const RNAlertBox = ({
  renderModal,
  type,
  message,
  possibleResolution,
}: AlertBoxInterface) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const alertData = useAppSelector(state => state.alertBoxReducer.data);
  const progressRef = useAppSelector(
    state => state.activityIndicator.progressRef,
  );
  const dispatch = useAppDispatch();

  React.useLayoutEffect(() => {}, [message]);

  const fixProgressbarState = () => {
    if (
      progressRef !== undefined &&
      progressRef !== null &&
      Object.keys(progressRef).length !== 0
    ) {
      progressRef.forceSetPercentage();
    }
  };

  if (!message) {
    return null;
  }

  return (
    <RNModal
      visible={true}
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
          {translation(type)}
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
            justifyContent: alertData.onDestructive ? 'space-around' : 'center',
            alignSelf: 'center',
            width: '100%',
            flexWrap: alertData.onThirdOption ? 'wrap' : undefined,
          }}>
          <RNButton
            onClick={async () => {
              dispatch(clearAlertData());
              fixProgressbarState(); // ! might hv to revert
              if (alertData.onSuccess) {
                await alertData.onSuccess();
              }
            }}
            title={alertData.successText || 'OK'}
            customStyle={[
              styles.button2,
              {
                maxWidth: alertData.onThirdOption
                  ? '90%'
                  : alertData.onDestructive
                  ? '70%'
                  : '90%',
                minWidth: alertData.onThirdOption
                  ? '90%'
                  : alertData.onDestructive
                  ? '60%'
                  : '90%',
              },
            ]}
            textStyle={
              alertData.successText ? {fontSize: verticalScale(10)} : {}
            }
          />
          {alertData.onDestructive ? (
            <RNButton
              onClick={() => {
                if (alertData.onDestructive) {
                  alertData.onDestructive();
                }
                dispatch(clearAlertData());
                fixProgressbarState();
              }}
              title={alertData.destructiveText || 'NO'}
              customStyle={[
                styles.button2,
                {
                  backgroundColor: themeColor.red,
                  borderColor: themeColor.red,
                  minWidth: alertData.onThirdOption ? '90%' : '60%',
                  maxWidth: alertData.onThirdOption ? '90%' : '70%',
                },
              ]}
              textStyle={
                alertData.destructiveText ? {fontSize: verticalScale(10)} : {}
              }
            />
          ) : null}
          {alertData.onThirdOption ? (
            <RNButton
              onClick={() => {
                if (alertData.onThirdOption) {
                  alertData.onThirdOption();
                }
                dispatch(clearAlertData());
                fixProgressbarState();
              }}
              title={alertData.thirdOptionText || ''}
              customStyle={[
                styles.button2,
                {
                  backgroundColor: themeColor.gold,
                  borderColor: themeColor.gold,
                  minWidth: '90%',
                  maxWidth: '90%',
                },
              ]}
              textStyle={
                alertData.destructiveText ? {fontSize: verticalScale(10)} : {}
              }
            />
          ) : null}
        </View>
      </View>
    </RNModal>
  );
};

export default RNAlertBox;
