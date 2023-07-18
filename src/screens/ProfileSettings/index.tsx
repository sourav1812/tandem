import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {translation} from '@tandem/utils/methods';
import {Pressable, Switch, View} from 'react-native';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import {stateObject} from './interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {scale, verticalScale} from 'react-native-size-matters';
import DownArrow from '@tandem/assets/svg/DownArrow';
import themeColor from '@tandem/theme/themeColor';
import RNButton from '@tandem/components/RNButton';

const ProfileSettings = () => {
  const isTablet = checkIfTablet();
  const [state, setState] = useState<stateObject>({
    name: '',
    email: '',
  });

  const {name, email} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  return (
    <RNScreenWrapper style={styles.container}>
      <RNLogoHeader
        textHeading
        heading={translation('PROFILE_SETTINGS')}
        titleStyle={styles.text}
        customStyle={styles.heading}
      />
      <View
        style={[styles.content, isTablet && {paddingHorizontal: scale(65)}]}>
        <RNTextInputWithLabel
          label={translation('YOUR_NAME')}
          containerStyle={styles.input}
          hint={translation('NAME')}
          inputViewStyle={styles.inputBox}
          value={name}
          updateText={e => updateState({name: e})}
        />
        <RNTextInputWithLabel
          label={translation('YOUR_EMAIL')}
          containerStyle={styles.input}
          hint={translation('EMAIL')}
          inputViewStyle={styles.inputBox}
          value={email}
          updateText={e => updateState({name: e})}
        />
        <LanguageDropDown />
        <NotificationSwitch />
      </View>
      <View
        style={[
          styles.footerButton,
          isTablet && {paddingHorizontal: scale(65)},
        ]}>
        <RNButton
          customStyle={styles.button}
          title={translation('SAVE_CHANGES')}
          onClick={() => {}}
        />
        <RNTextComponent style={styles.bottom} isSemiBold>
          {translation('DELETE_MY_ACCOUNT')}
        </RNTextComponent>
      </View>
    </RNScreenWrapper>
  );
};

export default ProfileSettings;

const LanguageDropDown = () => {
  const isTablet = checkIfTablet();
  return (
    <View>
      <RNTextComponent
        style={[
          styles.dropdownBox,
          {fontSize: isTablet ? 16 : verticalScale(12)},
        ]}>
        {translation('LANGUAGE')}
      </RNTextComponent>
      <Pressable
        style={[
          styles.dropdown,
          isTablet && {paddingVertical: verticalScale(10)},
        ]}>
        <RNTextComponent style={[isTablet && {fontSize: 18}]}>
          English
        </RNTextComponent>
        <DownArrow />
      </Pressable>
    </View>
  );
};

const NotificationSwitch = () => {
  const isTablet = checkIfTablet();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
  };
  return (
    <Pressable
      style={[
        styles.dropdown,
        {
          borderRadius: 16,
          marginTop: verticalScale(12),
          backgroundColor: themeColor.lightGray,
          paddingVertical: isTablet ? verticalScale(11) : verticalScale(14),
        },
      ]}>
      <RNTextComponent
        style={[styles.label, isTablet && {fontSize: verticalScale(11)}]}>
        {translation('NOTIFICATION')}
      </RNTextComponent>
      <Switch
        trackColor={{false: themeColor.themeBlue, true: themeColor.gold}}
        thumbColor={themeColor.white}
        ios_backgroundColor={themeColor.gold}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </Pressable>
  );
};
