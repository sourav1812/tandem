import React, {useEffect} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {Image} from 'react-native';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';

const SplashScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      navigateTo(SCREEN_NAME.SELECT_LANGUAGE);
    }, 2000);
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
