import {Pressable} from 'react-native';
import React from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextComponent from '@tandem/components/RNTextComponent';
import en from '@tandem/constants/api/lang/en';
import {styles} from './styles';
import RNLanguageComponent from '@tandem/components/RNLanguageComponent';
import themeColor from '@tandem/theme/themeColor';
import {languages} from './interface';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {scale, verticalScale} from 'react-native-size-matters';
import {SelectLanguageProps} from '@tandem/navigation/types';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';

const SelectLanguage = ({navigation}: SelectLanguageProps) => {
  const isTablet = checkIfTablet();
  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white}}>
      <RNTextComponent style={styles.heading} isSemiBold>
        {en.SELECT_LANGUAGE}
      </RNTextComponent>
      <RNTextComponent style={styles.info}>
        {en.YOU_CAN_CHANGE_IT}
      </RNTextComponent>
      {languages.map(item => {
        return (
          <Pressable
            onPress={() => {
              navigation.navigate(COMPONENTSNAME.SIGN_UP);
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
    </RNScreenWrapper>
  );
};

export default SelectLanguage;
