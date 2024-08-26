import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import LottieView from 'lottie-react-native';
import RobotAnimation from '@tandem/screens/RobotBuildingBook/robotAnimation.json';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';

import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNButton from '@tandem/components/RNButton';
import selfAnalytics from '@tandem/api/selfAnalytics';
import {UsersAnalyticsEvents} from '@tandem/api/selfAnalytics/interface';
import SO_send_to_robots from '@tandem/assets/appInteraction/SO_send_to_robots.mp3';
import {Audio} from 'expo-av';

const RobotBuildingBook = () => {
  const [showText, setShow] = React.useState(false);
  const progressRef = useAppSelector(
    state => state.activityIndicator.progressRef,
  );
  const [soundState, setSoundState] = useState<Audio.Sound | undefined>();

  React.useEffect(() => {
    const f = async () => {
      const {sound} = await Audio.Sound.createAsync(SO_send_to_robots);
      setSoundState(sound);
      sound.playAsync();
    };
    f(); // ! setting energy to false so that we can recreate it
    if (
      progressRef !== undefined &&
      progressRef !== null &&
      Object.keys(progressRef).length !== 0
    ) {
      progressRef.resetProgressStatus();
    }
    setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => {
      soundState?.unloadAsync();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <RNScreenWrapper style={styles.container}>
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
      {showText && (
        <>
          <RNTextComponent isSemiBold style={styles.text}>
            {
              translation('TANDOM_ROBOT_STORY')
              //  +'\n\n ' +
              //   translation('Activate_Engine')
            }
          </RNTextComponent>

          <RNButton
            pressableStyle={styles.button}
            onClick={() => {
              navigateTo(SCREEN_NAME.MATCHING_PAIRS);
              selfAnalytics({
                eventType: UsersAnalyticsEvents.SEND_TO_ROBOT,
                details: {},
              });
            }}
            title={translation('SEND')}
          />
        </>
      )}
    </RNScreenWrapper>
  );
};

export default RobotBuildingBook;
