/* eslint-disable react-native/no-inline-styles */
import {ImageBackground, ScrollView, View} from 'react-native';
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
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import {RootState} from '@tandem/redux/store';
import {
  setIsFirstTime,
  setNotificationStatus,
} from '@tandem/redux/slices/permissions.slice';

const NotificationScreen = () => {
  const dispatch = useAppDispatch();
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  return (
    <RNScreenWrapper
      style={{
        backgroundColor: themeColor.white,
      }}>
      <ImageBackground
        style={styles.bgc}
        source={
          isTablet
            ? undefined
            : require('@tandem/assets/png/notificationBgc.png')
        }
        resizeMode="cover"
      />
      <View
        style={{
          height: portrait ? verticalScale(50) : verticalScale(30),
        }}
      />
      <RNButton
        IconButtoncustomStyle={{marginLeft: 20}}
        onlyIcon
        icon={<Close />}
        onClick={() => {
          dispatch(setIsFirstTime(false));
          navigateTo(SCREEN_NAME.BOOKSHELF);
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{
          paddingHorizontal: isTablet ? 50 : 20,
          alignItems: 'center',
        }}>
        <View style={{width: portrait ? '90%' : '50%'}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Book style={styles.icon} height={155} />
            <RNTextComponent isSemiBold style={[styles.content]}>
              {translation('DONT_MISS_NEW_BOOOKS')}
            </RNTextComponent>
            <RNTextComponent style={[styles.para]}>
              {translation('ACTIVATE_THE_NOTIFICATION')}
            </RNTextComponent>
            <RNButton
              pressableStyle={{
                marginTop: verticalScale(35),
                width: '100%',
              }}
              title={translation('TURN_ON_NOTIFICATION')}
              onClick={() => {
                requestPermission();
              }}
            />
            <RNButton
              pressableStyle={{
                marginTop: verticalScale(12),
                width: '100%',
              }}
              onlyBorder
              title={translation('MAYBE_LATER')}
              onClick={() => {
                dispatch(setIsFirstTime(false));
                dispatch(setNotificationStatus(false));
                navigateTo(SCREEN_NAME.BOOKSHELF);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </RNScreenWrapper>
  );
};

export default NotificationScreen;
