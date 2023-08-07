import {ImageBackground, Image, View} from 'react-native';
import React, {version} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import Fb from '@tandem/assets/svg/FBlogo';
import Google from '@tandem/assets/svg/GoogleLogo';
import Apple from '@tandem/assets/svg/AppleLogo';
import RNSocialButton from '@tandem/components/RNSocialButton';
import {scale, verticalScale} from 'react-native-size-matters';
import RNButton from '@tandem/components/RNButton';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';

const SocialSignIn = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  return (
    <RNScreenWrapper>
      <ImageBackground
        style={styles.container}
        source={
          isTablet
            ? !portrait
              ? require('@tandem/assets/png/tabletWelcomeScreen.png')
              : require('@tandem/assets/png/authScreenBgc.png')
            : require('@tandem/assets/png/signInMobileBgc.png')
        }
        resizeMode="stretch">
        <View
          style={[
            isTablet && {paddingHorizontal: !portrait ? scale(150) : scale(70)},
          ]}>
          <Image
            source={require('../../assets/png/logo.png')}
            style={[styles.img, !portrait && {marginTop: verticalScale(30)}]}
            resizeMode="contain"
          />
          <RNTextComponent isSemiBold style={styles.heading}>
            {translation('SIGN_IN')}
          </RNTextComponent>
          <RNSocialButton
            icon={<Fb />}
            onClick={() => {}}
            title={`${translation('CONTINUE_WITH')} Facebook`}
            customStyle={styles.button}
          />
          <RNSocialButton
            icon={<Google />}
            onClick={() => {}}
            title={`${translation('CONTINUE_WITH')} Google`}
            customStyle={styles.button}
          />
          <RNSocialButton
            icon={<Apple />}
            onClick={() => {}}
            title={`${translation('CONTINUE_WITH')} Apple`}
            customStyle={styles.button}
          />
          <View style={styles.or}>
            <View style={styles.line} />
            <RNTextComponent
              style={{
                fontSize: isTablet ? 20 : scale(12),
                marginHorizontal: 10,
              }}>
              Or
            </RNTextComponent>
            <View style={styles.line} />
          </View>
          <RNButton
            title={translation('SIGN_IN_WITH_PASSWORD')}
            onClick={() => {
              navigateTo(SCREEN_NAME.SIGN_IN);
            }}
          />
          <RNTextComponent
            style={[styles.buttonText, isTablet && {fontSize: 18}]}>
            {translation('DONT_HAVE_AN_ACCOUNT')}{' '}
            <RNTextComponent
              isSemiBold
              style={[styles.signup, isTablet && {fontSize: 18}]}
              handleOnPress={() => {
                navigateTo(SCREEN_NAME.SIGN_UP);
              }}>
              {translation('SIGN_UP')}
            </RNTextComponent>
          </RNTextComponent>
        </View>
      </ImageBackground>
    </RNScreenWrapper>
  );
};

export default SocialSignIn;
