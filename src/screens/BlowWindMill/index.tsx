/* eslint-disable react-native/no-inline-styles */
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import React from 'react';
import Animated, {
  ReduceMotion,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
// import Loudness from 'react-native-loudness';
import Windmill from '@tandem/assets/svg/Windmill';
import WindmillBlades from '@tandem/assets/svg/WindmillBlades';
import {Dimensions, Platform, View} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import WindmillRing from '@tandem/assets/svg/WindmillRing';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import QuestionMark from '@tandem/assets/svg/QuestionMark';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {scale, verticalScale} from 'react-native-size-matters';
import * as permissions from 'react-native-permissions';
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
  PanGestureChangeEventPayload,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import themeColor from '@tandem/theme/themeColor';
import {translation} from '@tandem/utils/methods';
import {useDispatch} from 'react-redux';
import animateProgressBar from '@tandem/functions/animateProgressBar';
const {width: xMax, height: yMax} = Dimensions.get('screen');

const permissionsType = Platform.select({
  ios: permissions.PERMISSIONS.IOS.MICROPHONE,
  android: permissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
});

let interval: number | null = null;
const BlowWindMill = () => {
  const rotation = useSharedValue('0deg');
  const points = useSharedValue(0);
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [canShowProgress, setCanShowProgress] = React.useState(false);
  const [notificationDispatched, setNotificationDispatched] =
    React.useState(false);
  const [permissionState, setPermissionState] =
    React.useState<permissions.PermissionStatus | null>(null);

  const dispatch = useDispatch();

  const checkMicrophonePermission = async () => {
    if (!permissionsType) {
      return;
    }
    const status = await permissions.check(permissionsType);
    if (status === 'denied') {
      dispatch(
        addAlertData({
          type: 'Alert',
          message: translation('BLOW_SWIPE_WINDMILL'),
          onSuccess: async () => {
            const result = await permissions.request(permissionsType);
            setPermissionState(result);
          },
        }),
      );
      return;
    }
    setPermissionState(status);
  };

  const wrapper = () => {
    if (notificationDispatched) {
      return;
    }
    setNotificationDispatched(true);
    dispatch(
      addAlertData({
        type: 'Alert',
        message: translation('POWER_GENERATION'),
        possibleResolution: translation('STORY_AVAILABLE_SOON'),
        successText: translation('NEXT'),
        onSuccess: () => {
          if (permissionsType) {
            permissions.check(permissionsType).then(result => {
              if (result === 'granted') {
                // Loudness.stop();
              }
            });
          }
          navigateTo(SCREEN_NAME.MATCHING_PAIRS);
        },
      }),
    );
  };

  React.useEffect(() => {
    if (canShowProgress) {
      animateProgressBar({delay: 3000, percentage: 50});
    }
  }, [canShowProgress]);

  const allowProgressBar = () => {
    if (canShowProgress) {
      return;
    }
    setCanShowProgress(true);
  };

  useDerivedValue(() => {
    if (points.value > 10) {
      runOnJS(allowProgressBar)();
    }
    if (points.value === 170) {
      runOnJS(wrapper)();
    }
  }, []);

  const startFlow = () => {
    setShowInstructions(true);
    setTimeout(() => {
      setShowInstructions(false);
    }, 4000);
  };

  React.useEffect(() => {
    Orientation.lockToPortrait();
    checkMicrophonePermission();

    interval = setInterval(() => {
      // Loudness.getLoudness((loudness: any) => {
      //   if (loudness === 1) {
      //     return;
      //   }
      //   const level = 160 + loudness;
      //   if (level > mark) {
      //     rotateBlade(level * 5);
      //     return;
      //   }
      // });
    }, 200);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
      Orientation.unlockAllOrientations();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (permissionState === null) {
      return;
    }
    if (permissionState === 'granted' || permissionState === 'limited') {
      // Loudness.start();
      startFlow();
      return;
    }
    if (interval) {
      clearInterval(interval);
      startFlow();
      return;
    }
  }, [permissionState]);

  const rotateBlade = (
    power: number,
    direction: 'clockwise' | 'counterClockwise' = 'clockwise',
  ) => {
    const multiplier = direction === 'counterClockwise' ? -1 : 1;
    rotation.value = withSpring(
      +rotation.value.split('deg')[0] + power * multiplier + 'deg',
      {
        mass: 1,
        damping: 10,
        stiffness: 100,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
        reduceMotion: ReduceMotion.System,
      },
      () => {
        if (points.value < 170) {
          points.value = withTiming(points.value + 10);
        } else {
          points.value = 170;
        }
      },
    );
  };

  const checkQuadrant = (x: number, y: number) => {
    if (x < xMax / 2 && y < yMax / 2) {
      return 1;
    }
    if (x > xMax / 2 && y < yMax / 2) {
      return 2;
    }
    if (x < xMax / 2 && y > yMax / 2) {
      return 3;
    }
    if (x > xMax / 2 && y > yMax / 2) {
      return 4;
    }
  };
  const onChange = (
    e: GestureUpdateEvent<
      PanGestureHandlerEventPayload & PanGestureChangeEventPayload
    >,
  ) => {
    let directionOfRotation: 'clockwise' | 'counterClockwise' = 'clockwise';
    // ! First we determine the dominance of xVel and yVel magnitude wise
    const dominance = Math.abs(e.velocityX) > Math.abs(e.velocityY) ? 'x' : 'y';
    // ! now we specify the quadrant from where the user has swiped the windmill
    const quadrant = checkQuadrant(e.absoluteX, e.absoluteY);
    if (dominance === 'x') {
      // console.log('hi', {quadrant});
      //! dominance of x means we are using left and right swipes at the moment
      if (quadrant === 1 || quadrant === 2) {
        // ! we only need to check if we want to set direction of roation to counter clockwise
        if (e.velocityX < 0) {
          directionOfRotation = 'counterClockwise';
        }
      } else {
        if (e.velocityX > 0) {
          directionOfRotation = 'counterClockwise';
        }
      }
    } else {
      //! dominance of y means we are using up and down swipes at the moment
      if (quadrant === 1 || quadrant === 3) {
        // ! we only need to check if we want to set direction of roation to counter clockwise
        if (e.velocityY > 0) {
          directionOfRotation = 'counterClockwise';
        }
      } else {
        if (e.velocityY < 0) {
          directionOfRotation = 'counterClockwise';
        }
      }
    }
    // ! Now we have the direction of rotation, we can rotate the blades
    const powerOfRotation =
      dominance === 'x' ? Math.abs(e.velocityX) : Math.abs(e.velocityY);
    rotateBlade(powerOfRotation / 5, directionOfRotation);
  };

  const pan1 = Gesture.Pan().onChange(onChange);
  const pan2 = Gesture.Pan().onChange(onChange);
  const pan3 = Gesture.Pan().onChange(onChange);

  return (
    <RNScreenWrapper
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#211934',
      }}>
      {showInstructions && (
        <AlertPopupModal permissionState={permissionState} />
      )}
      <View
        style={{
          position: 'absolute',
          zIndex: 21,
          top: verticalScale(50),
          left: scale(10),
        }}>
        <RNButton
          onlyIcon
          onClick={() => {
            setShowInstructions(p => !p);
          }}
          icon={<QuestionMark />}
        />
      </View>
      <Animated.View
        style={{
          transform: [{rotate: rotation}],
          position: 'absolute',
          zIndex: 1,
          bottom: 277,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <GestureDetector gesture={pan1}>
          <View
            style={{
              height: 150,
              width: 100,
              position: 'absolute',
              top: 0,
              zIndex: 30,
            }}
          />
        </GestureDetector>
        <GestureDetector gesture={pan2}>
          <View
            style={{
              height: 150,
              width: 100,
              position: 'absolute',
              bottom: 45,
              left: 45,
              transform: [{rotate: '60deg'}],
              zIndex: 30,
            }}
          />
        </GestureDetector>
        <GestureDetector gesture={pan3}>
          <View
            style={{
              height: 150,
              width: 100,
              position: 'absolute',
              bottom: 45,
              right: 45,
              transform: [{rotate: '120deg'}],
              zIndex: 30,
            }}
          />
        </GestureDetector>
        <WindmillBlades />
      </Animated.View>
      <Windmill />
      <Animated.View
        style={{
          backgroundColor: '#0088ff',
          height: points,
          width: 335,
          position: 'absolute',
          bottom: 0,
          zIndex: -1,
          borderTopLeftRadius: 30,
        }}
      />
      <WindmillRing />
    </RNScreenWrapper>
  );
};

export default BlowWindMill;

const AlertPopupModal = ({
  permissionState,
}: {
  permissionState: null | permissions.PermissionStatus;
}) => {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#000000a0',
        position: 'absolute',
        zIndex: 20,
      }}>
      <View
        style={{
          width: '80%',
          backgroundColor: 'white',
          borderRadius: 20,
          position: 'absolute',
          top: verticalScale(50),
          left: scale(10) + verticalScale(36) + 10,
          padding: verticalScale(20),
        }}>
        <RNTextComponent style={{marginBottom: 10}} isSemiBold>
          {translation('POWER_UP_STORY')}
        </RNTextComponent>
        <RNTextComponent style={{fontSize: verticalScale(11)}}>
          {translation('BLOW_WIND_MICROPHONE') +
            (permissionState === 'blocked'
              ? '\n\n' +
                'You will need to enable microphone permissions from the settings.'
              : '')}
        </RNTextComponent>
        <RNTextComponent
          style={{fontSize: verticalScale(12), color: themeColor.themeBlue}}>
          {'\n' + translation('FIGURE_SPIN_BLADE') + '\n'}
        </RNTextComponent>
        <RNTextComponent style={{fontSize: verticalScale(12)}}>
          {translation('ENOUGH_POWER_TEXT')}
        </RNTextComponent>
      </View>
    </View>
  );
};
