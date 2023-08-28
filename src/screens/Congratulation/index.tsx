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
          uri: 'https://png.pngtree.com/png-vector/20220826/ourmid/pngtree-gold-congratulations-lettering-graduate-sticker-with-confetti-transparent-background-png-image_6109456.png',
        }}
        resizeMode="contain"
      />
      <RNConfettiAnimation />
    </RNScreenWrapper>
  );
};

export default Congratulation;
