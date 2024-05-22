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
import RNButton from '@tandem/components/RNButton';
import {setEnergyGenerated} from '@tandem/redux/slices/activityIndicator.slice';
import {store} from '@tandem/redux/store';

const RobotBuildingBook = () => {
  const [showText, setShow] = React.useState(false);
  const progressRef = useAppSelector(
    state => state.activityIndicator.progressRef,
  );
  React.useEffect(() => {
    store.dispatch(setEnergyGenerated(false)); // ! setting energy to false so that we can recreate it
    if (progressRef !== null) {
      progressRef.resetProgressStatus();
    }
    setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShow(true);
    }, 3000);

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
            {translation('TANDOM_ROBOT_STORY')} + \n\n +
            {translation('Activate_Engine')}
          </RNTextComponent>

          <RNButton
            pressableStyle={styles.button}
            onClick={() => {
              navigateTo(SCREEN_NAME.BLOW_WINDMILL);
            }}
            title={translation('NEXT')}
          />
        </>
      )}
    </RNScreenWrapper>
  );
};

export default RobotBuildingBook;
