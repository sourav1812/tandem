import React, {useEffect} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {Image} from 'react-native';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import DeviceInfo from 'react-native-device-info';
import {changeDevice} from '@tandem/redux/slices/tablet.slice';
import {useDispatch} from 'react-redux';

const SplashScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      navigateTo(SCREEN_NAME.SELECT_LANGUAGE, {}, true);
    }, 2000);
  }, []);

  useEffect(() => {
    let isIpad = DeviceInfo.getSystemName() === 'iPadOS' ? true : false;
    let isAndroidTablet = DeviceInfo.isTablet();
    let isTablet = isIpad || isAndroidTablet ? true : false;
    dispatch(changeDevice(isTablet));
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
