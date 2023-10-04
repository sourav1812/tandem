/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React, {useState} from 'react';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import themeColor from '@tandem/theme/themeColor';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {scale, verticalScale} from 'react-native-size-matters';
import styles from './styles';
import RNTimerText from '@tandem/components/RNTimerText';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {translation} from '@tandem/utils/methods';
import {confirmOtp, getOtp} from '@tandem/api/forgotPassword';
import {OtpScreenInterface} from '@tandem/navigation/types';

const OtpScreen = ({route}: OtpScreenInterface) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [showButton, setShowButton] = useState(false);
  const [isCodeWrong, setCodeWrong] = useState(false);

  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;
  const [otp, setOtp] = useState<string>('');

  const handleClick = async (code: string) => {
    try {
      const response = await confirmOtp(code, route.params.email);
      console.log({response});
      navigateTo(SCREEN_NAME.CREATE_PASSWORD, {
        resetToken: response.resetToken,
      });
    } catch (error) {
      console.log('error in Confirm OTP screen', error);
      setCodeWrong(true);
    }
  };

  React.useEffect(() => {
    if (otp.length < 6) {
      setCodeWrong(false);
    }
  }, [otp]);

  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white, flex: 1}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          height: height,
          width: width,
        }}>
        <ScrollView
          contentContainerStyle={{
            height: height,
            width: width,
          }}>
          <RNLogoHeader customStyle={styles.header} />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <RNTextComponent style={styles.heading} isSemiBold>
              {translation('otp-screen.enter-the-code')}
            </RNTextComponent>
            <RNTextComponent
              style={[
                styles.subHeading,
                {
                  fontSize: isTablet ? verticalScale(11) : verticalScale(13),
                  marginTop: verticalScale(10),
                },
              ]}>
              {translation('otp-screen.enter-six-digit-code')}
              {
                <RNTextComponent
                  style={[
                    styles.subHeading,
                    {
                      fontSize: isTablet
                        ? verticalScale(11)
                        : verticalScale(13),
                      marginTop: verticalScale(10),
                      color: themeColor.themeBlue,
                    },
                  ]}>
                  {route.params.email || 'email'}
                </RNTextComponent>
              }
            </RNTextComponent>
            <OTPInputView
              style={{
                width: '85%',
                height: verticalScale(48),
                marginVertical: verticalScale(40),
              }}
              pinCount={6}
              code={otp}
              onCodeChanged={setOtp}
              codeInputFieldStyle={{
                color: isCodeWrong ? '#FF0101' : '#020408',
                borderRadius: scale(40),
                fontSize: scale(20),
                fontWeight: 'bold',
                backgroundColor: '#F1F4F9',
                borderColor: '#F1F4F9',
              }}
              codeInputHighlightStyle={{
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                color: isCodeWrong ? '#FF0101' : '#020408',
                fontWeight: 'bold',
                fontSize: scale(20),
              }}
              autoFocusOnLoad={false}
              onCodeFilled={(code: string) => {
                handleClick(code);
              }}
            />
            <RNTextComponent
              style={[
                styles.subHeading,
                {
                  fontSize: isTablet ? verticalScale(11) : verticalScale(13),
                  marginTop: verticalScale(10),
                },
                isCodeWrong && {color: '#FF0101'},
              ]}>
              {!isCodeWrong
                ? translation('otp-screen.did-not-get-code')
                : translation('otp-screen.this-code-is-invalid')}
            </RNTextComponent>
            {!showButton && (
              <RNTextComponent
                style={[
                  styles.subHeading,
                  {
                    fontSize: isTablet ? verticalScale(11) : verticalScale(13),
                    marginTop: verticalScale(10),
                  },
                ]}>
                {translation('otp-screen.you-can-resend-in')}
                {<RNTimerText setIsTimerFinished={setShowButton} />}
              </RNTextComponent>
            )}
            {showButton && (
              <RNButton
                title={translation('otp-screen.resend')}
                customStyle={styles.button}
                onClick={async () => {
                  try {
                    await getOtp(route.params.email);
                    setShowButton(false);
                  } catch (error) {
                    console.log('error while resending otp', error);
                  } finally {
                    setOtp('');
                    setCodeWrong(false);
                  }
                }}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RNScreenWrapper>
  );
};

export default OtpScreen;
