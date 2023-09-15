import {ImageBackground} from 'react-native';
import React from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import themeColor from '@tandem/theme/themeColor';
import {styles} from './styles';
import RNButton from '@tandem/components/RNButton';
import Close from '@tandem/assets/svg/Cross';
import Book from '@tandem/assets/svg/Book';
import {verticalScale} from 'react-native-size-matters';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {translation} from '@tandem/utils/methods';
import navigateTo from '@tandem/navigation/navigate';
import {requestPermission} from '@tandem/functions/permissions';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useAppDispatch} from '@tandem/hooks/navigationHooks';
import {
  setIsFirstTime,
  setNotificationStatus,
} from '@tandem/redux/slices/permissions.slice';

const NotificationScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <RNScreenWrapper style={{backgroundColor: themeColor.white, flex: 1}}>
      <ImageBackground
        style={styles.bgc}
        source={require('@tandem/assets/png/notificationBgc.png')}>
        <RNButton
          onlyIcon
          icon={<Close />}
          onClick={() => {
            dispatch(setIsFirstTime('false'));
            navigateTo(SCREEN_NAME.BOOKSHELF);
          }}
        />
        <Book style={styles.icon} height={verticalScale(155)} />
        <RNTextComponent isSemiBold style={styles.content}>
          {translation('DONT_MISS_NEW_BOOOKS')}
        </RNTextComponent>
        <RNTextComponent style={styles.para}>
          {translation('ACTIVATE_THE_NOTIFICATION')}
        </RNTextComponent>
        <RNButton
          pressableStyle={{marginTop: verticalScale(35)}}
          title={translation('TURN_ON_NOTIFICATION')}
          onClick={() => {
            requestPermission();
          }}
        />
        <RNButton
          pressableStyle={{marginTop: verticalScale(12)}}
          onlyBorder
          title={translation('MAYBE_LATER')}
          onClick={() => {
            dispatch(setIsFirstTime('false'));
            dispatch(setNotificationStatus(false));
            navigateTo(SCREEN_NAME.BOOKSHELF);
          }}
        />
      </ImageBackground>
    </RNScreenWrapper>
  );
};

export default NotificationScreen;
