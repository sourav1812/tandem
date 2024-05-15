import themeColor from '@tandem/theme/themeColor';
import React, {useImperativeHandle} from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {verticalScale} from 'react-native-size-matters';
import RNTextComponent from '../RNTextComponent';
import {Pressable, StyleSheet, View} from 'react-native';
import {translation} from '@tandem/utils/methods';
import LottieView from 'lottie-react-native';
import RobotAnimation from '@tandem/screens/RobotBuildingBook/robotAnimation.json';

const FloatingProgressBar = React.forwardRef((_, ref) => {
  const top = useSharedValue(-400);
  const zIndex = useSharedValue(-1);
  const progress = useSharedValue('0%');
  useImperativeHandle(ref, () => ({
    animateProgress: (percentage: number) => {
      if (percentage === 0) {
        console.log('percentage passed is 0');
        top.value = -400;
        progress.value = '0%';
        zIndex.value = -1;
        return;
      }
      if (percentage < +progress.value.split('%')[0]) {
        console.log('progress calue is greater than percentage passed');
        top.value = -400;
        progress.value = '0%';
        zIndex.value = -1;
      }
      zIndex.value = 100;
      setTimeout(() => {
        top.value = withTiming(
          verticalScale(40),
          {
            duration: 2000,
          },
          () => {
            progress.value = withTiming(
              `${percentage}%`,
              {duration: 1000},
              () => {
                top.value = withDelay(1000, withTiming(-400));
                zIndex.value = withDelay(1000, withTiming(-1));
              },
            );
          },
        );
      }, 1000);
    },
  }));

  return (
    <Animated.View
      style={[styles.floatingView, {zIndex, transform: [{translateY: top}]}]}>
      <Pressable
        style={styles.pressable}
        onPress={() => {
          top.value = withTiming(-400);
        }}>
        <LottieView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
          }}
          source={RobotAnimation}
          autoPlay
          loop
        />
        <View style={styles.progressWrapper}>
          <RNTextComponent>
            {translation('ROBOT_CREATING_BOOK')}
          </RNTextComponent>
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
        </View>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  floatingView: {
    position: 'absolute',
    alignSelf: 'center',
    width: '93%',
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
  pressable: {
    padding: verticalScale(15),
    flexDirection: 'row',
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
  progressWrapper: {width: '80%'},
});

export default FloatingProgressBar;
