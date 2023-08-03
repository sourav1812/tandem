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
import {RootState} from '@tandem/redux/store';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {scale, verticalScale} from 'react-native-size-matters';
import styles from './styles';
import RNTimerText from '@tandem/components/RNTimerText';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OtpScreen = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [showButton, setShowButton] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const [isCodeWrong, setCodeWrong] = useState(false);

  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;
  const [otp, setOtp] = useState<string>('');

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
              Enter the code
            </RNTextComponent>
            <RNTextComponent
              style={[
                styles.subHeading,
                {
                  fontSize: isTablet ? verticalScale(11) : verticalScale(13),
                  marginTop: verticalScale(10),
                },
              ]}>
              Please enter the 4 digit code sent to{' '}
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
                  hello@gmail.com
                </RNTextComponent>
              }
            </RNTextComponent>
            <OTPInputView
              style={{
                width: '60%',
                height: verticalScale(48),
                marginVertical: verticalScale(40),
              }}
              pinCount={4}
              code={otp}
              onCodeChanged={setOtp}
              codeInputFieldStyle={{
                height: scale(40),
                width: scale(40),
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
              onCodeFilled={(code: any) => {
                if (code.length === 4) {
                  setCodeWrong(true);
                  console.log(code);
                }
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
              {!isCodeWrong ? `Didn't get the code?` : `This Code is wrong.`}
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
                You can resend in
                {<RNTimerText setIsTimerFinished={setShowButton} />}
              </RNTextComponent>
            )}
            {showButton && (
              <RNButton
                title={'Resend'}
                customStyle={styles.button}
                onClick={() => {
                  navigateTo(SCREEN_NAME.CREATE_PASSWORD);
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
