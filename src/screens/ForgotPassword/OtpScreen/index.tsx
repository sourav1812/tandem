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
import {verticalScale} from 'react-native-size-matters';
import styles from './styles';
import RNTimerText from '@tandem/components/RNTimerText';

const OtpScreen = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [showButton, setShowButton] = useState(false);
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
            <RNTextComponent
              style={[
                styles.subHeading,
                {
                  fontSize: isTablet ? verticalScale(11) : verticalScale(13),
                  marginTop: verticalScale(10),
                },
              ]}>
              Didn't get the code?
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
