import {ImageBackground, Image, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {SocialSignInProps} from '@tandem/navigation/types';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import Fb from '@tandem/assets/svg/FBlogo';
import Google from '@tandem/assets/svg/GoogleLogo';
import Apple from '@tandem/assets/svg/AppleLogo';
import RNSocialButton from '@tandem/components/RNSocialButton';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {scale} from 'react-native-size-matters';
import RNButton from '@tandem/components/RNButton';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';

const SocialSignIn = ({navigation}: SocialSignInProps) => {
  const isTablet = checkIfTablet();
  return (
    <RNScreenWrapper>
      <ImageBackground
        style={styles.container}
        source={require('@tandem/assets/png/signInBgc.png')}
        resizeMode="stretch">
        <View style={[isTablet && {paddingHorizontal: scale(70)}]}>
          <Image
            source={require('../../assets/png/logo.png')}
            style={styles.img}
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
              navigation.navigate(COMPONENTSNAME.SIGN_IN);
            }}
          />
          <RNTextComponent
            style={[styles.buttonText, isTablet && {fontSize: 18}]}>
            {translation('DONT_HAVE_AN_ACCOUNT')}{' '}
            <RNTextComponent
              isSemiBold
              style={[styles.signup, isTablet && {fontSize: 18}]}
              handleOnPress={() => {
                navigation.navigate(COMPONENTSNAME.SIGN_UP);
              }}>
              {translation('SIGN_IN')}
            </RNTextComponent>
          </RNTextComponent>
        </View>
      </ImageBackground>
    </RNScreenWrapper>
  );
};

export default SocialSignIn;
