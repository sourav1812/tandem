import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import LottieView from 'lottie-react-native';
import RobotAnimation from '@tandem/screens/RobotBuildingBook/robotAnimation.json';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {LayoutAnimation} from 'react-native';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const RobotBuildingBook = () => {
  const [showText, setShow] = React.useState(false);
  const progressRef = useAppSelector(
    state => state.activityIndicator.progressRef,
  );
  React.useEffect(() => {
    if (progressRef !== null) {
      progressRef.animateProgress(0);
    }
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      setShow(true);
    }, 2000);
    setTimeout(() => {
      navigateTo(SCREEN_NAME.MATCHING_PAIRS);
    }, 6000);
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
        <RNTextComponent isSemiBold style={styles.text}>
          {translation('ROBOT_TEXT_CONFETTI')}
        </RNTextComponent>
      )}
    </RNScreenWrapper>
  );
};

export default RobotBuildingBook;
