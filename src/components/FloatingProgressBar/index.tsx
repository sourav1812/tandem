import themeColor from '@tandem/theme/themeColor';
import React from 'react';

import Animated, {
  useSharedValue,
  withSpring,
  ReduceMotion,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {verticalScale} from 'react-native-size-matters';
import RNTextComponent from '../RNTextComponent';
import {StyleSheet, View} from 'react-native';

const FloatingProgressBar = () => {
  const progress = useSharedValue('20%');
  const top = useSharedValue(-400);
  React.useEffect(() => {
    setTimeout(() => {
      top.value = withSpring(
        verticalScale(50),
        {
          mass: 10,
          damping: 1000,
          stiffness: 1000,
          overshootClamping: false,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 2,
          reduceMotion: ReduceMotion.System,
        },
        () => {
          progress.value = withTiming('80%', {duration: 1000}, () => {
            top.value = withDelay(1000, withTiming(-400));
          });
        },
      );
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Animated.View style={[styles.floatingView, {top: top}]}>
      <RNTextComponent>Story Book Generation Progress</RNTextComponent>
      <View style={styles.progressBorder}>
        <Animated.View
          style={[
            styles.progress,
            {
              width: progress,
            },
          ]}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  floatingView: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 100,
    width: '93%',
    padding: verticalScale(15),
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 20,
  },
  progressBorder: {
    borderColor: themeColor.themeBlue,
    borderWidth: 2,
    borderRadius: 20,
    marginTop: verticalScale(8),
    height: verticalScale(20),
  },
  progress: {
    backgroundColor: themeColor.themeBlue,
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default FloatingProgressBar;
