/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React from 'react';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import themeColor from '@tandem/theme/themeColor';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';
import styles from './style';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {verticalScale} from 'react-native-size-matters';
import {translation} from '@tandem/utils/methods';
import {CheckEmailInterface} from '@tandem/navigation/types';

const CheckEmail = ({route}: CheckEmailInterface) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;

  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white, flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          height: height,
          width: width,
        }}>
        <ScrollView
          bounces={false}
          contentContainerStyle={{
            height: height,
            width: width,
          }}>
          <RNLogoHeader customStyle={styles.header} />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Image
              style={{
                marginTop: 'auto',
              }}
              source={require('@tandem/assets/png/RunningBike.png')}
            />
            <RNTextComponent style={styles.heading} isSemiBold>
              {translation('check-email.check-email')}
            </RNTextComponent>
            <RNTextComponent
              style={[
                styles.subHeading,
                {
                  fontSize: isTablet ? verticalScale(11) : verticalScale(13),
                  marginTop: verticalScale(10),
                },
              ]}>
              {translation('check-email.we-have-sent-you-email')}
            </RNTextComponent>
            <RNButton
              title={'Account Page'}
              customStyle={styles.button}
              onClick={() => {
                navigateTo(SCREEN_NAME.OTP_SCREEN, {email: route.params.email});
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RNScreenWrapper>
  );
};

export default CheckEmail;
