/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {styles} from './styles';
import themeColor from '@tandem/theme/themeColor';
import {verticalScale} from 'react-native-size-matters';
import {ScrollView, View} from 'react-native';
import RNCheckboxWithText from '@tandem/components/RNCheckboxWithText';
import RNButton from '@tandem/components/RNButton';
import {StateObject} from './interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';
import logout from '@tandem/functions/logout';
import {consentFormApi} from '@tandem/api/consentFormApi';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';

const TermsAndConditions = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const userData = useAppSelector(state => state.userData.userDataObject);
  const [state, setState] = useState<StateObject>({
    terms: userData.consentForm?.options.map(item => ({
      ...item,
      isAgreed: false,
    })),
    agreedToAllTerms: false,
  });

  const {terms, agreedToAllTerms} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  useEffect(() => {
    updateState({
      terms: userData.consentForm?.options.map(item => ({
        ...item,
        isAgreed: false,
      })),
    });
  }, [userData]);

  const handleContentForm = async () => {
    try {
      consentFormApi({data: {isAgreed: true}});
      navigateTo(SCREEN_NAME.HELP_CENTER, {});
    } catch (error) {
      console.log(error, 'consent from api error');
    }
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
            {userData.consentForm.terms}
          </RNTextComponent>
          {terms.map((item, index) => {
            return (
              <RNCheckboxWithText
                content={item.description}
                onAccept={() => {
                  let termsArray = [...terms];
                  termsArray[index].isAgreed = !termsArray[index].isAgreed;
                  updateState({
                    terms: termsArray,
                    agreedToAllTerms:
                      termsArray.filter(
                        item => item.isRequired && !item.isAgreed,
                      ).length === 0
                        ? true
                        : false,
                  });
                }}
                isRequired={item.isRequired}
                key={index.toString()}
              />
            );
          })}
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
              handleContentForm();
            }}
            title={translation('ACCEPT')}
            customStyle={[
              styles.button,
              agreedToAllTerms
                ? null
                : {
                    backgroundColor: themeColor.lightGray,
                    borderColor: themeColor.lightGray,
                  },
            ]}
            isDisabled={agreedToAllTerms ? false : true}
          />
        </View>
      </View>
    </RNScreenWrapper>
  );
};

export default TermsAndConditions;
