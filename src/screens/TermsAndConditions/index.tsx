/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {styles} from './styles';
import themeColor from '@tandem/theme/themeColor';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {TermsAndConditionsProps} from '@tandem/navigation/types';
import {verticalScale} from 'react-native-size-matters';
import {ScrollView, View} from 'react-native';
import RNCheckboxWithText from '@tandem/components/RNCheckboxWithText';
import RNButton from '@tandem/components/RNButton';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';
import i18n from '@tandem/constants/api/lang/i18n';

const TermsAndConditions = ({navigation}: TermsAndConditionsProps) => {
  const isTablet = checkIfTablet();
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
          </RNTextComponent>
          <RNTextComponent style={styles.text}>
            {i18n.t('USER_ELIGIBILITY')} {'\n\n'}
            {i18n.t('USER_ELIGIBILITY')} {'\n\n'}
            {i18n.t('USER_ELIGIBILITY')} {'\n\n'}
          </RNTextComponent>
          <RNCheckboxWithText />
          <RNCheckboxWithText />
          <RNCheckboxWithText />
        </ScrollView>
        <View
          style={[styles.footerButton, isTablet && {paddingHorizontal: 100}]}>
          <RNButton
            onlyBorder
            buttonColor={themeColor.themeBlue}
            onClick={() => {
              navigation.goBack();
            }}
            title={i18n.t('CANCEL')}
            customStyle={styles.button}
          />
          <RNButton
            onClick={() => {
              navigation.navigate(COMPONENTSNAME.HELP_CENTER);
            }}
            title={i18n.t('ACCEPT')}
            customStyle={styles.button}
          />
        </View>
      </View>
    </RNScreenWrapper>
  );
};

export default TermsAndConditions;
