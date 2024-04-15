import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {Image} from 'react-native';
import navigateTo from '@tandem/navigation/navigate';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import {RootState, store} from '@tandem/redux/store';
import {
  addSnapShot1,
  addSnapShot2,
} from '@tandem/redux/slices/animationSnapshots.slice';
import {clearStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import LottieView from 'lottie-react-native';
import LottieAnimationFile from './animation.json';

const Congratulation = () => {
  const notificationScreenPermissions = useAppSelector(
    (state: RootState) => state.permissions,
  );
  React.useEffect(() => {
    setTimeout(() => {
      store.dispatch(
        addAlertData({
          type: 'Alert',
          message: "While you wait for the story to be built, why don't you...",
          onSuccess: () => {
            navigateTo(SCREEN_NAME.HOME);
            navigateTo(
              !notificationScreenPermissions.isFirstTime ||
                notificationScreenPermissions.notificationStatus
                ? SCREEN_NAME.BOOKSHELF
                : SCREEN_NAME.NOTIFICATION_SCREEN,
            );
          },
          onDestructive: () => {
            store.dispatch(clearStoryGenerationResponse());
            store.dispatch(addSnapShot1(null));
            store.dispatch(addSnapShot2(null));
            navigateTo(SCREEN_NAME.ROADMAP);
          },
          onThirdOption: () => {
            navigateTo(SCREEN_NAME.ACCOUNT, {}, true);
          },
          successText: 'Read a story we made earlier',
          destructiveText: 'Create another story',
          thirdOptionText: 'Go to Home',
        }),
      );
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <LottieView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: 'transparent',
        }}
        source={LottieAnimationFile}
        autoPlay
        loop
      />
    </RNScreenWrapper>
  );
};

export default Congratulation;
