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
import i18n from '@tandem/constants/lang/i18n';
import navigateTo from '@tandem/navigation/navigate';
import {StateObject} from './interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

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
        {i18n.t('T_AND_C')}
      </RNTextComponent>
      <RNTextComponent
        style={[styles.heading, {marginTop: verticalScale(12)}]}
        isSemiBold>
        {i18n.t('WELCOME_TO_OUR_APP')}
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
            {i18n.t('BY_USING_OUR_APP_YOU_AGREE')}
            {'\n'}
            {i18n.t('PLEASE_READ_THEM_CAREFULLY')}
          </RNTextComponent>
          <RNTextComponent style={styles.text}>
            1. {i18n.t('USER_ELIGIBILITY')} {'\n\n'}
            2. {i18n.t('USER_ELIGIBILITY')} {'\n\n'}
            3. {i18n.t('USER_ELIGIBILITY')} {'\n\n'}
            4. {i18n.t('USER_ELIGIBILITY')} {'\n\n'}
            5. {i18n.t('USER_ELIGIBILITY')} {'\n\n'}
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
              navigateTo();
            }}
            title={i18n.t('CANCEL')}
            customStyle={styles.button}
          />
          <RNButton
            onClick={() => {
              navigateTo(SCREEN_NAME.HELP_CENTER);
            }}
            title={i18n.t('ACCEPT')}
            customStyle={[
              styles.button,
              !term1 && !term2 && !term3
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
