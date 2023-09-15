import {ImageBackground, Image, View, Platform, Dimensions} from 'react-native';
import React from 'react';
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
import {RootState, store} from '@tandem/redux/store';
import socialLogin from '@tandem/functions/socialLogin';
import {SOCIAL_AUTH} from '@tandem/constants/enums';
import {useFocusEffect} from '@react-navigation/native';
import {changeOrientation} from '@tandem/redux/slices/orientation.slice';
import {changeDevice} from '@tandem/redux/slices/tablet.slice';
import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';

const SocialSignIn = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const dispatch = useDispatch();

  useFocusEffect(() => {
    let isIpad = DeviceInfo.getSystemName() === 'iPadOS' ? true : false;
    let isAndroidTablet = DeviceInfo.isTablet();
    let checkTablet = isIpad || isAndroidTablet ? true : false;
    dispatch(changeDevice(checkTablet));
    const {width, height} = Dimensions.get('window');
    store.dispatch(changeOrientation(height > width));
  });

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
            onClick={() => {
              socialLogin(SOCIAL_AUTH.FACEBOOK);
            }}
            title={`${translation('CONTINUE_WITH')} Facebook`}
            customStyle={styles.button}
          />
          <RNSocialButton
            icon={<Google />}
            onClick={() => {
              socialLogin(SOCIAL_AUTH.GOOGLE);
            }}
            title={`${translation('CONTINUE_WITH')} Google`}
            customStyle={styles.button}
          />
          {Platform.OS === 'ios' && (
            <RNSocialButton
              icon={<Apple />}
              onClick={() => {
                socialLogin(SOCIAL_AUTH.APPLE);
              }}
              title={`${translation('CONTINUE_WITH')} Apple`}
              customStyle={styles.button}
            />
          )}
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
            {translation('DONT_HAVE_ACCOUNT')}{' '}
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
