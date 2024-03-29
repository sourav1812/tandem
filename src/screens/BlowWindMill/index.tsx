import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import React from 'react';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
//@ts-expect-error
import Loudness from 'react-native-loudness';

const BlowWindMill = () => {
  const rotation = useSharedValue('0deg');
  const rotateBlade = (power: number) => {
    rotation.value = withTiming(
      +rotation.value.split('deg')[0] + power + 'deg',
    );
  };
  React.useEffect(() => {
    Loudness.start();
    const interval = setInterval(() => {
      Loudness.getLoudness((loudness: any) => {
        console.log(loudness);
        if (loudness > -20) {
          rotateBlade(Math.pow(Math.abs(20 + loudness), 2));
          return;
        }
        // rotation.value = withDecay({}) + 'deg';
      });
    }, 50);
    return () => {
      clearInterval(interval);
      Loudness.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <RNScreenWrapper style={{justifyContent: 'center', alignItems: 'center'}}>
      <Animated.View
        style={{
          width: '80%',
          height: 100,
          backgroundColor: 'red',
          transform: [{rotate: rotation}],
        }}
      />
    </RNScreenWrapper>
  );
};

export default BlowWindMill;
