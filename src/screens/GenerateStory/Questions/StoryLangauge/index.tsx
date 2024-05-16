import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNLanguageComponent from '@tandem/components/RNLanguageComponent';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState, store} from '@tandem/redux/store';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {pushStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import {STORY_PARTS} from '@tandem/constants/enums';
import Orientation from 'react-native-orientation-locker';
import {translation} from '@tandem/utils/methods';

const languages = [
  {name: 'English', flag: '🇬🇧', code: 'en'},
  {name: 'Türkçe', flag: '🇹🇷', code: 'tr'},
  {name: 'বাংলা', flag: '🇧🇩', code: 'bn'},
  {name: 'Polski', flag: '🇵🇱', code: 'pl'},
  {name: 'ગુજરાતી', flag: '🇮🇳', code: 'gu'},
  {name: 'ਪੰਜਾਬੀ', flag: '🇮🇳', code: 'pa'},
  {name: 'اردو', flag: '🇵🇰', code: 'ur'},
  {name: 'Français', flag: '🇫🇷', code: 'fr'},
];

const SelectLanguage = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const [lan, setLang] = React.useState('');

  React.useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  React.useEffect(() => {
    if (lan) {
      store.dispatch(
        pushStoryGenerationResponse({key: STORY_PARTS.LANGAUGE, value: lan}),
      );
      setTimeout(() => {
        navigateTo(SCREEN_NAME.ROADMAP);
      }, 300);
    }
  }, [lan]);
  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white}}>
      <RNTextComponent style={styles.heading} isSemiBold>
        {translation('STORY_LANGUAGE')}
      </RNTextComponent>
      <RNTextComponent style={styles.info}>
        {translation('WHICH_LANGUAGE')}
      </RNTextComponent>
      <View style={[!portrait && {marginHorizontal: scale(100)}]}>
        {languages.map((item, index) => {
          return (
            <Pressable
              key={index.toString()}
              onPress={() => {
                setLang(item.code);
              }}>
              <RNLanguageComponent
                title={item.name}
                flag={item.flag}
                customStyle={{
                  marginTop: verticalScale(14),
                  marginHorizontal: isTablet ? scale(35) : verticalScale(60),
                  ...(lan === item.code && {
                    backgroundColor: themeColor.themeBlue,
                  }),
                }}
              />
            </Pressable>
          );
        })}
      </View>
      <RNTextComponent style={[styles.info, styles.footer]}>
        {translation('NOTE')}
      </RNTextComponent>
    </RNScreenWrapper>
  );
};

export default SelectLanguage;

const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: verticalScale(21.3),
    alignSelf: 'center',
    marginTop: verticalScale(45),
    textAlign: 'center',
  },
  info: {
    fontSize: verticalScale(14),
    textAlign: 'center',
    marginHorizontal: scale(40),
    marginTop: verticalScale(10),
  },
  footer: {
    fontSize: verticalScale(10),
    marginTop: 'auto',
    marginBottom: verticalScale(40),
  },
});
