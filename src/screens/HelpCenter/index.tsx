/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {styles} from './styles';
import themeColor from '@tandem/theme/themeColor';
import {verticalScale} from 'react-native-size-matters';
import {Pressable, ScrollView, View} from 'react-native';
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
import {FORM_INPUT_TYPE, ValidationError} from '@tandem/utils/validations';
import {RootState} from '@tandem/redux/store';
import {HelpCenterProps} from '@tandem/navigation/types';

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
        onClick={() => {
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
        title="What is TANDEM?"
        text="TANDEM is an app that allows you and your child to generate and read stories together, and to share them with others. It’s AI powered and draws on cutting-edge developmental science, designed to help your child to thrive, and to help to build early relationships."
      />
      <ExpandDetails
        title="What age of children is TANDEM designed for?"
        text="Tandem has been designed with children aged from 2-5 years in mind, but we think that those older and younger will love it too. The app adapts to different reading ages and developmental stages to try to make sure that it’s always pitched at the right level."
      />
      <ExpandDetails
        title="How does TANDEM keep my, and my child’s, data private and safe?"
        text="Keeping your data secure, and being clear about what data we collect, are really important to us. We follow strict data protection standards which includes… [KEV to add here?]. You can read more about our approach to data protection here: [link to privacy policy]"
      />
      <ExpandDetails
        title="What data do you collect, and why?"
        text="TANDEM, like most apps, collects data on your interactions with the app. We also collect data from your child’s interactions with the app. These include things like how often you use Tandem, how long you spend doing different tasks like creating stories and reading together, and how many stories you create. We are also planning to use audio and eventually video data from your time reading together to track things like your child’s reading level, and the ‘serve and return’ back-forth turn taking in your reading together. Before we introduce this feature we’ll ask for your explicit permission though."
      />
      <ExpandDetails
        title="Can I track my child's progress and activities through TANDEM?"
        text="Not yet, but we’re working on this. We’re planning to build in both a survey that you can complete to track your child’s development, and - eventually - automated tracking of your child’s development. When we introduce these we’ll tell you more about them if you choose to opt into them."
      />
      <ExpandDetails
        title="How does TANDEM generate stories?"
        text="You can think of it a bit like a set of AI powered story dice. When your child uses TANDEM they create stories by choosing from a set of characters, ideas, things and types of stories, and these are fed into our story engine, which then uses one of several AI large language models to create a story that we then check and improve on. Eventually, we’ll also allow these stories to link to each other, allowing the AI to make engaging, fun and interesting stories that both you and your child want to read. We’re also working on adding in sound effects too."
      />
      <ExpandDetails
        title="Is the content in TANDEM educational?"
        text="Yes, but we’re more interested in you and your child having fun together. There is a wealth of evidence that shared attention and interaction in the early years are the ‘magic ingredient’ for good child development. So although the content we create will help to promote early learning and literacy, we’re really trying to help to support relationships through you having fun reading and laughing together. You can learn more about early interaction here."
      />
      <ExpandDetails
        title="What AI is in the ‘backend’ of the app?"
        text="We’re currently testing a few different AI engines to power TANDEM, including those from OpenAI (GPT4 and DALLE 3) and those from Anthropic (Pi). Eventually, we will run our own servers, but for now our ‘Reasoning engine - Velo’ - the brains behind TANDEM, which checks all the content and helps to make sure it’s good quality - works with external APIs. You can read more about Velo here [link to blog-tbc]."
      />
      <ExpandDetails
        title="Do I have to pay to use TANDEM?"
        text="No, at least not at the moment. For now, while we’re building and testing, everything is free. You can use TANDEM as much as you want. However, because every story creation costs money because of the computing power needed to make and to check it, eventually we will need to build a subscription model. But we’re very keen that those who don’t have many books at home are able to have access to TANDEM, so we’re looking at a number of business models to allow this."
      />
      <ExpandDetails
        title="How can I leave and delete all my information?"
        text="We hope you don’t want to leave, but you can find the option to delete your account, and all the information we hold in it, in the settings page of the app."
      />
      <ExpandDetails
        title="What are the technical requirements for using TANDEM?"
        text="Tandem is compatible with most modern smartphones and tablets. Check the app’s download page in the app store for specific operating system requirements."
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
