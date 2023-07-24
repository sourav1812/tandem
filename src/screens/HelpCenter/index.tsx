import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {styles} from './styles';
import themeColor from '@tandem/theme/themeColor';
import {verticalScale} from 'react-native-size-matters';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import RNButton from '@tandem/components/RNButton';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {StateObject} from './interface';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import i18n from '@tandem/constants/lang/i18n';
import Subtract from '@tandem/assets/svg/Subtract';
import Add from '@tandem/assets/svg/Add';
import navigateTo from '@tandem/navigation/navigate';
import {translation} from '@tandem/utils/methods';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const HelpCenter = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const [state, setState] = useState<StateObject>({
    email: '',
    name: '',
    firstTab: false,
    message: '',
  });

  const {email, name, firstTab, message} = state;

  const updateState = (newState: any) => {
    setState((previouState: StateObject) => {
      return {...previouState, ...newState};
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
            heading={i18n.t('HELP_CENTER')}
            textHeading
            customStyle={styles.heading}
          />
          <View style={styles.customTab}>
            <RNButton
              title={i18n.t('FAQ')}
              onlyBorder
              onClick={leftTab}
              customStyle={[
                styles.tab,
                !firstTab ? styles.highlightedTab : {borderWidth: 0},
              ]}
              textStyle={[
                styles.tabText,
                {
                  color: !firstTab ? themeColor.themeBlue : themeColor.black,
                },
                isTablet && {fontSize: verticalScale(12)},
              ]}
            />
            <RNButton
              title={i18n.t('CONTACT_US')}
              onlyBorder
              onClick={rightTab}
              customStyle={[
                styles.tab,
                firstTab ? styles.highlightedTab : {borderWidth: 0},
              ]}
              textStyle={[
                styles.tabText,
                {
                  color: firstTab ? themeColor.themeBlue : themeColor.black,
                },
                isTablet && {fontSize: verticalScale(12)},
              ]}
            />
          </View>
          <View style={styles.content}>
            <ScrollView
              contentContainerStyle={[
                styles.scrollView,
                isTablet && {paddingHorizontal: firstTab ? 160 : 50},
              ]}>
              {firstTab ? (
                <>
                  <RNTextComponent
                    isSemiBold
                    style={[styles.subHeading, isTablet && {fontSize: 25}]}>
                    {i18n.t('QUESTIONS_COMMENTS')}
                  </RNTextComponent>
                  <RNTextInputWithLabel
                    label={i18n.t('NAME')}
                    backgroundColor={themeColor.lightGray}
                    containerStyle={styles.input2}
                    value={name}
                    updateText={e => {
                      updateState({name: e});
                    }}
                    hint={i18n.t('ENTER_NAME')}
                    inputStyle={styles.inputText}
                  />
                  <RNTextInputWithLabel
                    label={i18n.t('EMAIL')}
                    backgroundColor={themeColor.lightGray}
                    containerStyle={styles.input2}
                    value={email}
                    updateText={e => {
                      updateState({email: e});
                    }}
                    hint={i18n.t('ENTER_YOUR_EMAIL')}
                    inputStyle={styles.inputText}
                  />
                  <RNTextInputWithLabel
                    label={i18n.t('MESSAGE')}
                    backgroundColor={themeColor.lightGray}
                    containerStyle={styles.input2}
                    value={message}
                    updateText={e => {
                      updateState({message: e});
                    }}
                    hint={i18n.t('ENTER_MESSAGE')}
                    inputStyle={[styles.inputText, {width: '100%', flex: 0}]}
                    inputViewStyle={styles.inputView}
                  />
                </>
              ) : (
                <FAQScreen />
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <RNButton
        customStyle={styles.button}
        title={firstTab ? translation('SEND') : translation('CONTINUE')}
        onClick={() => {
          navigateTo(SCREEN_NAME.ACCOUNT);
        }}
      />
    </RNScreenWrapper>
  );
};

const FAQScreen = () => {
  return (
    <View>
      <ExpandDetails />
      <ExpandDetails />
      <ExpandDetails />
      <ExpandDetails />
      {/* <RNButton
        customStyle={styles.button}
        title={'Continue'}
        onClick={() => {
          navigateTo(SCREEN_NAME.CREATE_CHILD_PROFILE);
        }}
      /> */}
    </View>
  );
};

export default HelpCenter;

const ExpandDetails = () => {
  const [open, setOpen] = React.useState(false);

  const handleSwitching = () => {
    setOpen(prev => !prev);
  };

  return (
    <Pressable onPress={handleSwitching} style={styles.expandDetailsWrapper}>
      <View style={{flexShrink: 1}}>
        <RNTextComponent
          isSemiBold
          style={{fontSize: verticalScale(13), color: '#000'}}>
          Alright, but what exactly do you do?
        </RNTextComponent>
        {open && (
          <RNTextComponent style={styles.expandedText}>
            As a creative agency we work with you to develop solutions to
            address your brand needs. That includes various aspects of brand
            planning and strategy, marketing and design.
          </RNTextComponent>
        )}
      </View>
      <Pressable
        onPress={handleSwitching}
        style={[
          styles.switchButton,
          {backgroundColor: open ? '#fff' : '#4285F6'},
        ]}>
        {!open ? <Add color="#fff" /> : <Subtract />}
      </Pressable>
    </Pressable>
  );
};
