import {Pressable, View} from 'react-native';
import React from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import en from '@tandem/constants/lang/en';
import {styles} from './styles';
import RNLanguageComponent from '@tandem/components/RNLanguageComponent';
import themeColor from '@tandem/theme/themeColor';
import {languages} from './interface';
import {scale, verticalScale} from 'react-native-size-matters';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import i18n from '@tandem/constants/lang/i18n';
import navigateTo from '@tandem/navigation/navigate';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';

const SelectLanguage = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white}}>
      <RNTextComponent style={styles.heading} isSemiBold>
        {en.SELECT_LANGUAGE}
      </RNTextComponent>
      <RNTextComponent style={styles.info}>
        {en.YOU_CAN_CHANGE_IT}
      </RNTextComponent>
      <View style={[!portrait && {marginHorizontal: scale(100)}]}>
        {languages.map((item, index) => {
          return (
            <Pressable
              key={index.toString()}
              onPress={() => {
                i18n.locale = item.code;
                navigateTo(SCREEN_NAME.ONBOARDING);
              }}>
              <RNLanguageComponent
                title={item.name}
                flag={item.flag}
                customStyle={{
                  marginTop: verticalScale(14),
                  marginHorizontal: isTablet ? scale(35) : verticalScale(14),
                }}
              />
            </Pressable>
          );
        })}
      </View>
    </RNScreenWrapper>
  );
};

export default SelectLanguage;
