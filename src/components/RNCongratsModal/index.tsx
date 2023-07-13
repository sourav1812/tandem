import {View} from 'react-native';
import React from 'react';
import RNModal from '../RNModal';
import {styles} from './styles';
import {congratsModalProps} from './interface';
import RNTextComponent from '../RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';
import RNButton from '@tandem/components/RNButton';
import {useNavigation} from '@react-navigation/native';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import i18n from '@tandem/constants/api/lang/i18n';

const RNCongratsModal = ({
  visible = false,
  renderModal,
}: congratsModalProps) => {
  let isTablet = checkIfTablet();
  const navigation = useNavigation();

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
            <RNTextComponent style={{fontSize: verticalScale(32)}}>
              🥳
            </RNTextComponent>
          </View>
          <RNTextComponent isSemiBold style={styles.heading}>
            {i18n.t('CONGRATS')}!
          </RNTextComponent>
          <View style={styles.info}>
            <View style={styles.box}>
              <RNTextComponent style={styles.title} isSemiBold>
                100%
              </RNTextComponent>
              <RNTextComponent style={styles.stat}>
                {i18n.t('ACCURACY')}
              </RNTextComponent>
            </View>
            <View style={styles.box}>
              <RNTextComponent style={styles.title} isSemiBold>
                80
              </RNTextComponent>
              <RNTextComponent style={styles.stat} numberOfLines={1}>
                {i18n.t('SPEED')}
              </RNTextComponent>
            </View>
            <View style={styles.box}>
              <RNTextComponent style={styles.title} isSemiBold>
                6 min
              </RNTextComponent>
              <RNTextComponent style={styles.stat}>
                {i18n.t('DURATION')}
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
            You have create and read your own story
          </RNTextComponent>
          <RNButton
            title={i18n.t('HOME')}
            customStyle={styles.button}
            onClick={() => {
              navigation.navigate(COMPONENTSNAME.HOME);
            }}
          />
          <RNButton
            title={i18n.t('SHARE')}
            customStyle={styles.button}
            onClick={() => {
              navigation.navigate(COMPONENTSNAME.QUESTIONS);
            }}
            onlyBorder
          />
        </View>
      </View>
    </RNModal>
  );
};

export default RNCongratsModal;
