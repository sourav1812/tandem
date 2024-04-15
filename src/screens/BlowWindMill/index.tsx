/* eslint-disable react-native/no-inline-styles */
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import React from 'react';
import Animated, {
  ReduceMotion,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
//@ts-expect-error
import Loudness from 'react-native-loudness';
import Windmill from '@tandem/assets/svg/Windmill';
import WindmillBlades from '@tandem/assets/svg/WindmillBlades';
import {LayoutAnimation, Linking, Platform, View} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import WindmillRing from '@tandem/assets/svg/WindmillRing';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import {store} from '@tandem/redux/store';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import QuestionMark from '@tandem/assets/svg/QuestionMark';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {scale, verticalScale} from 'react-native-size-matters';
import * as permissions from 'react-native-permissions';
const permissionsType = Platform.select({
  ios: permissions.PERMISSIONS.IOS.MICROPHONE,
  android: permissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
});
const checkMicrophonePermission = async () => {
  if (!permissionsType) {
    navigateTo(SCREEN_NAME.HOME);
    return;
  }
  const result = await permissions.request(permissionsType);
  if (result === 'granted') {
    Loudness.start();
    return;
  }
  store.dispatch(
    addAlertData({
      type: 'Alert',
      message: 'You need microphone permission to play the game.',
      possibleResolution:
        'You can enable microphone permission from the settings or you can wait for story to get ready on its own',
      onSuccess: () => {
        Linking.openSettings();
        navigateTo(SCREEN_NAME.HOME);
      },
      onDestructive: () => {
        navigateTo(SCREEN_NAME.HOME);
      },
    }),
  );
};

const BlowWindMill = () => {
  const rotation = useSharedValue('0deg');
  const points = useSharedValue(0);
  const [showInstructions, setShowInstructions] = React.useState(true);
  const rotateBlade = (power: number) => {
    rotation.value = withSpring(
      +rotation.value.split('deg')[0] + power + 'deg',
      {
        duration: 3000,
        dampingRatio: 0.7,
        stiffness: 342,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
        reduceMotion: ReduceMotion.System,
      },
      () => {
        if (points.value < 170) {
          points.value = withSpring(points.value + 2, {
            mass: 15.6,
            damping: 13,
            stiffness: 431,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
            reduceMotion: ReduceMotion.System,
          });
        } else {
          points.value = 170;
        }
      },
    );
  };
  const [notificationDispatched, setNotificationDispatched] =
    React.useState(false);
  const wrapper = () => {
    if (notificationDispatched) {
      return;
    }
    setNotificationDispatched(true);
    store.dispatch(
      addAlertData({
        type: 'Alert',
        message: 'Yay! You have generated enough energy!',
        possibleResolution: 'Your Story will be available soon',
        onSuccess: () => {
          navigateTo(SCREEN_NAME.CONGRATULATION);
        },
      }),
    );
  };
  useDerivedValue(() => {
    if (points.value === 170) {
      runOnJS(wrapper)();
    }
  }, []);

  const mark = Platform.select({ios: 140, android: 130, default: 125});
  React.useEffect(() => {
    Orientation.lockToPortrait();
    checkMicrophonePermission();

    Loudness.start();
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShowInstructions(false);
    }, 3000);
    const interval = setInterval(() => {
      Loudness.getLoudness((loudness: any) => {
        const level = 160 + loudness;

        if (level > mark) {
          rotateBlade(level);
          return;
        }
        // rotation.value = withDecay({}) + 'deg';
      });
    }, 200);
    return () => {
      clearInterval(interval);
      Orientation.unlockAllOrientations();
      Loudness.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RNScreenWrapper
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#211934',
      }}>
      {showInstructions && <AlertPopupModal />}
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
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
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
          borderTopLeftRadius: 100,
        }}
      />
      <WindmillRing />
    </RNScreenWrapper>
  );
};

export default BlowWindMill;

const AlertPopupModal = () => {
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
          width: '70%',
          // height: '20%',
          backgroundColor: 'white',
          borderRadius: 20,
          position: 'absolute',
          top: verticalScale(50),
          left: scale(10) + verticalScale(36) + 10,
          padding: 20,
        }}>
        <RNTextComponent style={{marginBottom: 10}} isSemiBold>
          Mini Game
        </RNTextComponent>
        <RNTextComponent>
          Blow wind into your phone's Microphone to rotate the windmill.
        </RNTextComponent>
        <RNTextComponent>
          Generate enough energy to create your story book
        </RNTextComponent>
      </View>
    </View>
  );
};
