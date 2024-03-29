/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {styles} from './styles';
import themeColor from '@tandem/theme/themeColor';
import {verticalScale} from 'react-native-size-matters';
import {Keyboard, Pressable, ScrollView, View} from 'react-native';
import RNButton from '@tandem/components/RNButton';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {StateObject} from './interface';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import Subtract from '@tandem/assets/svg/Subtract';
import Add from '@tandem/assets/svg/Add';
import navigateTo from '@tandem/navigation/navigate';
import {translation} from '@tandem/utils/methods';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import validateForm, {
  FORM_INPUT_TYPE,
  ValidationError,
} from '@tandem/utils/validations';
import {RootState} from '@tandem/redux/store';
import {HelpCenterProps} from '@tandem/navigation/types';
import contactUs from '@tandem/api/contactUs';

const HelpCenter = ({route}: HelpCenterProps) => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );

  const fromPeople = route.params?.fromPeople;

  const [state, setState] = useState<StateObject>({
    firstTab: false,
  });
  const [email, setEmail] = useState<ValidationError>({value: ''});
  const [name, setName] = useState<ValidationError>({value: ''});
  const [message, setMessage] = useState<ValidationError>({value: ''});
  const {firstTab} = state;

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
      <RNLogoHeader
        heading={translation('HELP_CENTER')}
        textHeading
        customStyle={{
          marginTop: portrait ? verticalScale(50) : verticalScale(20),
        }}
        showBackButton={fromPeople ? true : false}
      />
      <View
        style={[
          styles.customTab,
          {marginTop: portrait ? verticalScale(20) : 0},
        ]}>
        <RNButton
          title={translation('FAQ')}
          pressableStyle={{flex: 1}}
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
          title={translation('CONTACT_US')}
          onlyBorder
          onClick={rightTab}
          pressableStyle={{flex: 1}}
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
      <ScrollView
        onScroll={() => {
          Keyboard.dismiss();
        }}
        scrollEventThrottle={1}
        style={{flex: 1}}
        contentContainerStyle={[
          styles.scrollView,
          isTablet && {paddingHorizontal: firstTab ? 160 : 50},
        ]}
        showsVerticalScrollIndicator={false}>
        {firstTab ? (
          <>
            <RNTextComponent
              isSemiBold
              style={[styles.subHeading, isTablet && {fontSize: 25}]}>
              {translation('QUESTIONS_COMMENTS')}
            </RNTextComponent>
            <RNTextInputWithLabel
              label={translation('NAME')}
              backgroundColor={themeColor.lightGray}
              containerStyle={styles.input2}
              value={name}
              validationType={FORM_INPUT_TYPE.NAME}
              updateText={setName}
              hint={translation('ENTER_NAME')}
              inputStyle={styles.inputText}
            />
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

            <RNTextInputWithLabel
              multiline
              label={translation('MESSAGE')}
              validationType={FORM_INPUT_TYPE.NAME}
              backgroundColor={themeColor.lightGray}
              containerStyle={styles.input2}
              value={message}
              updateText={setMessage}
              hint={translation('ENTER_MESSAGE')}
              inputStyle={[styles.inputText, {width: '100%', flex: 0}]}
              inputViewStyle={styles.inputView}
            />
          </>
        ) : (
          <FAQScreen />
        )}
      </ScrollView>

      <RNButton
        pressableStyle={styles.button}
        title={firstTab ? translation('SEND') : translation('CONTINUE')}
        onClick={async () => {
          if (firstTab) {
            if (
              name.message ||
              email.message ||
              message.message ||
              name.value === '' ||
              email.value === '' ||
              message.value === ''
            ) {
              setEmail(validateForm(FORM_INPUT_TYPE.EMAIL, email.value));
              setMessage(validateForm(FORM_INPUT_TYPE.NAME, message.value));
              setName(validateForm(FORM_INPUT_TYPE.NAME, name.value));
              return;
            }
            try {
              await contactUs({
                name: name.value,
                email: email.value,
                message: message.value,
              });
            } catch (error) {
              console.log('error in contact us api', error);
              return;
            }
          }

          if (fromPeople) {
            navigateTo();
          } else {
            navigateTo(SCREEN_NAME.ACCOUNT, {}, true);
          }
        }}
      />
    </RNScreenWrapper>
  );
};

const FAQScreen = () => {
  return (
    <>
      <ExpandDetails
        title={translation('FAQ_QA.Q1')}
        text={translation('FAQ_QA.A1')}
      />
      <ExpandDetails
        title={translation('FAQ_QA.Q2')}
        text={translation('FAQ_QA.A2')}
      />
      <ExpandDetails
        title={translation('FAQ_QA.Q3')}
        text={translation('FAQ_QA.A3')}
      />
      <ExpandDetails
        title={translation('FAQ_QA.Q4')}
        text={translation('FAQ_QA.A4')}
      />
      <ExpandDetails
        title={translation('FAQ_QA.Q5')}
        text={translation('FAQ_QA.A5')}
      />
      <ExpandDetails
        title={translation('FAQ_QA.Q6')}
        text={translation('FAQ_QA.A6')}
      />
      <ExpandDetails
        title={translation('FAQ_QA.Q7')}
        text={translation('FAQ_QA.A7')}
      />
      <ExpandDetails
        title={translation('FAQ_QA.Q8')}
        text={translation('FAQ_QA.A8')}
      />
      <ExpandDetails
        title={translation('FAQ_QA.Q9')}
        text={translation('FAQ_QA.A9')}
      />
      <ExpandDetails
        title={translation('FAQ_QA.Q10')}
        text={translation('FAQ_QA.A10')}
      />
      <ExpandDetails
        title={translation('FAQ_QA.Q11')}
        text={translation('FAQ_QA.A11')}
      />
    </>
  );
};

export default HelpCenter;

const ExpandDetails = ({title, text}: {title: string; text: string}) => {
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
          {title}
        </RNTextComponent>
        {open && (
          <RNTextComponent style={styles.expandedText}>{text}</RNTextComponent>
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
