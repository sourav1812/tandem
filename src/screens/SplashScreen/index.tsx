import React, {useEffect} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {Image} from 'react-native';
import RNTextComponent from '@tandem/components/RNTextComponent';
import DeviceInfo from 'react-native-device-info';
import {changeDevice} from '@tandem/redux/slices/tablet.slice';
import {useAppDispatch} from '@tandem/hooks/navigationHooks';
import {translation} from '@tandem/utils/methods';
import {stopLoader} from '@tandem/redux/slices/activityIndicator.slice';
import {MODE} from '@tandem/constants/mode';
import {changeMode} from '@tandem/redux/slices/mode.slice';

const SplashScreen = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(stopLoader());
    dispatch(changeMode(MODE.A));
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
      <RNTextComponent>
        {translation('READING_TIME_WITH_CHILD')}
      </RNTextComponent>
      <RNTextComponent style={styles.license}>
        ©️ Early Ideas Limited {new Date().getFullYear()}
      </RNTextComponent>
    </RNScreenWrapper>
  );
};

export default SplashScreen;
