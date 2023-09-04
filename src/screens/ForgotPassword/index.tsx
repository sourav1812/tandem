/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {styles} from './styles';
import themeColor from '@tandem/theme/themeColor';
import RNButton from '@tandem/components/RNButton';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {verticalScale} from 'react-native-size-matters';
import navigateTo from '@tandem/navigation/navigate';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';
import {translation} from '@tandem/utils/methods';

const ForgotPassword = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [email, setEmail] = useState<ValidationError>({value: ''});
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
          <ImageBackground
            style={styles.container}
            source={
              isTablet
                ? require('@tandem/assets/png/forgotPasswordTabletBgc.png')
                : require('@tandem/assets/png/forgotPasswordMobileBgc.png')
            }
            resizeMode="stretch">
            <RNLogoHeader customStyle={styles.header} />
            <RNTextComponent style={styles.heading} isSemiBold>
              {translation('FORGOT_PASSWORD')}?
            </RNTextComponent>
            <RNTextComponent
              style={[
                styles.subHeading,
                {
                  fontSize: isTablet ? verticalScale(11) : verticalScale(13),
                  marginTop: verticalScale(10),
                },
              ]}>
              {translation('ENTER_EMAIL_FOR_VERIFICATION')}
            </RNTextComponent>
            <View
              style={[
                styles.form,
                isTablet && {paddingHorizontal: verticalScale(120)},
              ]}>
              <RNTextInputWithLabel
                label={translation('EMAIL')}
                backgroundColor={themeColor.lightGray}
                containerStyle={styles.input2}
                value={email}
                validationType={FORM_INPUT_TYPE.EMAIL}
                updateText={setEmail}
                hint={translation('ENTER_YOUR_EMAIL')}
                inputStyle={styles.inputText}
              />
              <RNButton
                title={translation('GET_CODE')}
                customStyle={styles.button}
                onClick={() => {
                  navigateTo(SCREEN_NAME.CHECK_EMAIL);
                }}
              />
            </View>
          </ImageBackground>
        </ScrollView>
      </KeyboardAvoidingView>
    </RNScreenWrapper>
  );
};

export default ForgotPassword;
