import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {Image} from 'react-native';
import {RNConfettiAnimation} from '@tandem/components/RNConfettiAnimation';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';

const Congratulation = () => {
  React.useEffect(() => {
    setTimeout(() => {
      navigateTo(SCREEN_NAME.HOME);
    }, 4000);
  }, []);

  return (
    <RNScreenWrapper style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: 'https://media.istockphoto.com/id/960999328/vector/congratulations-card-with-light-rays.jpg?s=612x612&w=0&k=20&c=MO46WkFcvAbRU-S1nZUz_Rko2d8XJtp-fgBk4fmgn-E=',
        }}
        resizeMode="contain"
      />
      <RNConfettiAnimation />
    </RNScreenWrapper>
  );
};

export default Congratulation;
