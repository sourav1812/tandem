import {View, Share} from 'react-native';
import React from 'react';
import RNModal from '../RNModal';
import {styles} from './styles';
import {congratsModalProps} from './interface';
import RNTextComponent from '../RNTextComponent';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';
import RNButton from '@tandem/components/RNButton';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';
import navigateTo from '@tandem/navigation/navigate';
import Emoji from '@tandem/assets/svg/Kissing';
import markBookAsRead from '@tandem/api/markBookAsRead';
import {MODE} from '@tandem/constants/mode';

const RNCongratsModal = ({
  visible = false,
  renderModal,
  bookId,
}: congratsModalProps) => {
  let isTablet = useAppSelector(state => state.deviceType.isTablet);
  const mode = useAppSelector(state => state.mode.mode);
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Hi , thanks for using Tandem.',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {}
  };

  return (
    <RNModal
      customStyle={styles.modal}
      visible={visible}
      renderModal={renderModal}>
      <View
        style={[
          styles.container,
          isTablet && {width: verticalScale(320), alignSelf: 'center'},
        ]}>
        <View style={styles.top}>
          <View style={styles.image}>
            <Emoji style={styles.emoji} />
          </View>
          <RNTextComponent isSemiBold style={styles.heading}>
            {translation('CONGRATS')}!
          </RNTextComponent>
          <View style={styles.info}>
            <View style={[styles.box, isTablet && {width: scale(60)}]}>
              <RNTextComponent
                style={[styles.title, {color: 'grey'}]}
                isSemiBold>
                100%
              </RNTextComponent>
              <RNTextComponent style={[styles.stat, {color: 'grey'}]}>
                {translation('ACCURACY')}
              </RNTextComponent>
            </View>
            <View style={[styles.box, isTablet && {width: scale(60)}]}>
              <RNTextComponent
                style={[styles.title, {color: 'grey'}]}
                isSemiBold>
                80
              </RNTextComponent>
              <RNTextComponent
                style={[styles.stat, {color: 'grey'}]}
                numberOfLines={1}>
                {translation('SPEED')}
              </RNTextComponent>
            </View>
            <View style={[styles.box, isTablet && {width: scale(60)}]}>
              <RNTextComponent style={styles.title} isSemiBold>
                6 min
              </RNTextComponent>
              <RNTextComponent style={styles.stat}>
                {translation('DURATION')}
              </RNTextComponent>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <RNTextComponent
            style={[
              styles.stat,
              {color: themeColor.black, textAlign: 'center'},
            ]}>
            {translation('congrats-modal.you-have-read-your-own-story')}
          </RNTextComponent>
          <RNButton
            title={translation('HOME')}
            customStyle={styles.button}
            onClick={() => {
              markBookAsRead(bookId, {
                ...(mode === MODE.C && {solo: true}),
                ...(mode === MODE.B && {tandem: true}),
              });
              navigateTo(SCREEN_NAME.HOME);
            }}
          />
          <RNButton
            title={translation('SHARE')}
            customStyle={styles.button}
            onClick={() => {
              onShare();
            }}
            onlyBorder
          />
        </View>
      </View>
    </RNModal>
  );
};

export default RNCongratsModal;
