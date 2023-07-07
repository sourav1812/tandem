import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import en from '@tandem/constants/api/lang/en';
import {styles} from './styles';
import themeColor from '@tandem/theme/themeColor';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {verticalScale} from 'react-native-size-matters';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import RNButton from '@tandem/components/RNButton';
import {HelpCenterProps} from '@tandem/navigation/types';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {stateObject} from './interface';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';

const HelpCenter = ({navigation}: HelpCenterProps) => {
  const isTablet = checkIfTablet();

  const [state, setState] = useState<stateObject>({
    email: '',
    name: '',
    firstTab: false,
    message: '',
  });

  const {email, name, firstTab, message} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const leftTab = () => {
    updateState({firstTab: false});
  };

  const rightTab = () => {
    updateState({firstTab: true});
  };

  return (
    <RNScreenWrapper
      style={{
        backgroundColor: themeColor.white,
        paddingHorizontal: verticalScale(20),
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{height: '100%', width: '100%'}}>
        <ScrollView
          style={{height: '100%', width: '100%'}}
          showsVerticalScrollIndicator={false}>
          <RNLogoHeader
            heading={en.HELP_CENTER}
            textHeading
            customStyle={styles.heading}
          />
          <View style={styles.customTab}>
            <RNButton
              title={en.FAQ}
              onlyBorder
              onClick={leftTab}
              customStyle={[
                styles.tab,
                !firstTab
                  ? {
                      borderWidth: 0,
                      borderBottomWidth: 2,
                      borderBottomColor: themeColor.themeBlue,
                    }
                  : {borderWidth: 0},
              ]}
              textStyle={{
                fontWeight: '600',
                fontSize: 18,
                color: !firstTab ? themeColor.themeBlue : themeColor.black,
              }}
            />
            <RNButton
              title={en.CONTACT_US}
              onlyBorder
              onClick={rightTab}
              customStyle={[
                styles.tab,
                firstTab
                  ? {
                      borderWidth: 0,
                      borderBottomWidth: 2,
                      borderBottomColor: themeColor.themeBlue,
                    }
                  : {borderWidth: 0},
              ]}
              textStyle={{
                fontWeight: '600',
                fontSize: 18,
                color: firstTab ? themeColor.themeBlue : themeColor.black,
              }}
            />
          </View>
          <View style={styles.content}>
            <ScrollView
              contentContainerStyle={[
                styles.scrollView,
                isTablet && {paddingHorizontal: 160},
              ]}>
              <RNTextComponent
                isSemiBold
                style={[styles.subHeading, isTablet && {fontSize: 25}]}>
                {en.QUESTIONS_COMMENTS}
              </RNTextComponent>
              <RNTextInputWithLabel
                label={en.NAME}
                showLabel
                backgroundColor={themeColor.lightGray}
                containerStyle={styles.input2}
                value={name}
                updateText={e => {
                  updateState({name: e});
                }}
                hint={en.ENTER_NAME}
                inputStyle={styles.inputText}
              />
              <RNTextInputWithLabel
                label={en.EMAIL}
                showLabel
                backgroundColor={themeColor.lightGray}
                containerStyle={styles.input2}
                value={email}
                updateText={e => {
                  updateState({email: e});
                }}
                hint={en.ENTER_YOUR_EMAIL}
                inputStyle={styles.inputText}
              />
              <RNTextInputWithLabel
                label={en.MESSAGE}
                showLabel
                backgroundColor={themeColor.lightGray}
                containerStyle={styles.input2}
                value={message}
                updateText={e => {
                  updateState({message: e});
                }}
                hint={en.ENTER_MESSAGE}
                inputStyle={[styles.inputText, {width: '100%', flex: 0}]}
                inputViewStyle={styles.inputView}
              />
              <RNButton
                customStyle={styles.button}
                title={en.SEND}
                onClick={() => {
                  navigation.navigate(COMPONENTSNAME.ACCOUNT);
                }}
              />
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </RNScreenWrapper>
  );
};

export default HelpCenter;
