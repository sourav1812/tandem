/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {styles} from './styles';
import themeColor from '@tandem/theme/themeColor';
import {verticalScale} from 'react-native-size-matters';
import {ScrollView, View} from 'react-native';
import RNCheckboxWithText from '@tandem/components/RNCheckboxWithText';
import RNButton from '@tandem/components/RNButton';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {StateObject} from './interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';
import logout from '@tandem/functions/logout';
import {storeKey} from '@tandem/helpers/encryptedStorage';
import {TERMS_ACCEPTED} from '@tandem/constants/localConstants';

const TermsAndConditions = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [state, setState] = useState<StateObject>({
    term1: false,
    term2: false,
    term3: false,
  });

  const {term1, term2, term3} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };
  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white}}>
      <RNTextComponent style={styles.heading} isSemiBold>
        {translation('T_AND_C')}
      </RNTextComponent>
      <RNTextComponent
        style={[styles.heading, {marginTop: verticalScale(12)}]}
        isSemiBold>
        {translation('WELCOME_TO_OUR_APP')}
      </RNTextComponent>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <RNTextComponent
            style={[
              styles.text,
              {paddingHorizontal: verticalScale(40), textAlign: 'center'},
            ]}>
            {/* By using our app, you agree to our Terms of Use.{'\n'}
            Please read them carefully. */}
            {translation('BY_USING_OUR_APP_YOU_AGREE')}
            {'\n'}
            {translation('PLEASE_READ_THEM_CAREFULLY')}
          </RNTextComponent>
          <RNTextComponent style={styles.text}>
            1. {translation('USER_ELIGIBILITY')} {'\n\n'}
            2. {translation('USER_ELIGIBILITY')} {'\n\n'}
            3. {translation('USER_ELIGIBILITY')} {'\n\n'}
            4. {translation('USER_ELIGIBILITY')} {'\n\n'}
            5. {translation('USER_ELIGIBILITY')} {'\n\n'}
          </RNTextComponent>
          <RNCheckboxWithText onAccept={() => updateState({term1: !term1})} />
          <RNCheckboxWithText onAccept={() => updateState({term2: !term2})} />
          <RNCheckboxWithText onAccept={() => updateState({term3: !term3})} />
        </ScrollView>
        <View
          style={[styles.footerButton, isTablet && {paddingHorizontal: 100}]}>
          <RNButton
            onlyBorder
            buttonColor={themeColor.themeBlue}
            onClick={() => {
              logout({});
            }}
            title={translation('CANCEL')}
            customStyle={styles.button}
          />
          <RNButton
            onClick={() => {
              storeKey(TERMS_ACCEPTED, TERMS_ACCEPTED);
              navigateTo(SCREEN_NAME.HELP_CENTER);
            }}
            title={translation('ACCEPT')}
            customStyle={[
              styles.button,
              !term1 || !term2 || !term3
                ? {
                    backgroundColor: themeColor.lightGray,
                    borderColor: themeColor.lightGray,
                  }
                : null,
            ]}
            isDisabled={term1 || term2 || term3 ? false : true}
          />
        </View>
      </View>
    </RNScreenWrapper>
  );
};

export default TermsAndConditions;
