import {View, ImageBackground} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import RNModal from '../RNModal';
import RNButton from '../RNButton';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {verticalScale} from 'react-native-size-matters';
import Lock from '@tandem/assets/svg/LockServer';
import {translation} from '@tandem/utils/methods';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';

interface changePasswordModalProps {
  visible: boolean;
  renderModal: () => void;
}

const RNChangePassword = ({visible, renderModal}: changePasswordModalProps) => {
  let isTablet = checkIfTablet();
  return (
    <RNModal
      visible={visible}
      customStyle={styles.modal}
      renderModal={renderModal}>
      <ImageBackground
        style={[styles.container]}
        source={
          isTablet
            ? require('@tandem/assets/png/passwordChangedBgcTablet.png')
            : require('@tandem/assets/png/passwordChangedBgc.png')
        }
        resizeMode="contain">
        {/* <RNButton
          customStyle={styles.button}
          onClick={nextClick}
          title={i18n.t('WELL')}
        /> */}
        <Lock style={styles.logo} />
        <RNTextComponent style={styles.heading} isSemiBold>
          {translation('PASSWORD_RESET')}
        </RNTextComponent>
        <RNTextComponent style={styles.content}>
          {translation('YOUR_PASSWORD_HAS_BEEN_RESET')}
        </RNTextComponent>
        <RNButton
          customStyle={[styles.button, isTablet && {maxWidth: 350}]}
          title={translation('GO_TO_LOG_IN')}
          onClick={() => navigateTo(SCREEN_NAME.SIGN_UP)}
        />
      </ImageBackground>
    </RNModal>
  );
};

export default RNChangePassword;
