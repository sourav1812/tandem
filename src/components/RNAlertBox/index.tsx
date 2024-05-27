/* eslint-disable react-native/no-inline-styles */
import {LayoutAnimation, View} from 'react-native';
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
  const {
    onSuccess,
    onDestructive,
    onThirdOption,
    successText,
    destructiveText,
    thirdOptionText,
  } = useAppSelector(state => state.alertBoxReducer.data);
  const progressRef = useAppSelector(
    state => state.activityIndicator.progressRef,
  );
  const dispatch = useAppDispatch();

  React.useLayoutEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [message]);

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
            justifyContent: onDestructive ? 'space-around' : 'center',
            alignSelf: 'center',
            width: '100%',
            flexWrap: onThirdOption ? 'wrap' : undefined,
          }}>
          <RNButton
            onClick={async () => {
              if (onSuccess) {
                await onSuccess();
              }
              dispatch(clearAlertData());
              fixProgressbarState();
            }}
            title={successText || 'OK'}
            customStyle={[
              styles.button2,
              {
                maxWidth: onThirdOption ? '90%' : onDestructive ? '70%' : '90%',
                minWidth: onThirdOption ? '90%' : onDestructive ? '60%' : '90%',
              },
            ]}
            textStyle={successText ? {fontSize: verticalScale(10)} : {}}
          />
          {onDestructive ? (
            <RNButton
              onClick={() => {
                if (onDestructive) {
                  onDestructive();
                }
                dispatch(clearAlertData());
                fixProgressbarState();
              }}
              title={destructiveText || 'NO'}
              customStyle={[
                styles.button2,
                {
                  backgroundColor: themeColor.red,
                  borderColor: themeColor.red,
                  minWidth: onThirdOption ? '90%' : '60%',
                  maxWidth: onThirdOption ? '90%' : '70%',
                },
              ]}
              textStyle={destructiveText ? {fontSize: verticalScale(10)} : {}}
            />
          ) : null}
          {onThirdOption ? (
            <RNButton
              onClick={() => {
                if (onThirdOption) {
                  onThirdOption();
                }
                dispatch(clearAlertData());
                fixProgressbarState();
              }}
              title={thirdOptionText || ''}
              customStyle={[
                styles.button2,
                {
                  backgroundColor: themeColor.gold,
                  borderColor: themeColor.gold,
                  minWidth: '90%',
                  maxWidth: '90%',
                },
              ]}
              textStyle={destructiveText ? {fontSize: verticalScale(10)} : {}}
            />
          ) : null}
        </View>
      </View>
    </RNModal>
  );
};

export default RNAlertBox;
