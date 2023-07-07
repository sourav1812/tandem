import React, {useEffect} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {SplashScreenProps} from '@tandem/navigation/types';
import {Image} from 'react-native';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';

const SplashScreen = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(COMPONENTSNAME.SELECT_LANGUAGE);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RNScreenWrapper style={styles.container}>
      <Image
        source={require('../../assets/png/logo.png')}
        style={styles.img}
        resizeMode="contain"
      />
      <RNTextComponent style={styles.license}>
        ©️ Early Ideas Limted 2023
      </RNTextComponent>
    </RNScreenWrapper>
  );
};

export default SplashScreen;
