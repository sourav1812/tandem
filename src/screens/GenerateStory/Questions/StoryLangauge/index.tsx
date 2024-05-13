import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNLanguageComponent from '@tandem/components/RNLanguageComponent';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';

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
    if (lan) {
      setTimeout(() => {
        navigateTo(SCREEN_NAME.ROADMAP);
      }, 300);
    }
  }, [lan]);
  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white}}>
      <RNTextComponent style={styles.heading} isSemiBold>
        Story Language
      </RNTextComponent>
      <RNTextComponent style={styles.info}>
        What language do you want this story to be written in?
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
        Note: non-English languages are still in testing… please do rate your
        stories when you’ve read them so we can keep improving
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
    marginTop: verticalScale(50),
    textAlign: 'center',
  },
  info: {
    fontSize: verticalScale(14),
    textAlign: 'center',
    marginHorizontal: scale(40),
    marginVertical: verticalScale(12),
  },
  footer: {
    fontSize: verticalScale(10),
    marginTop: 'auto',
    marginBottom: verticalScale(40),
  },
});
