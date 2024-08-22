import RNTextComponent from '@tandem/components/RNTextComponent';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import navigateTo from '@tandem/navigation/navigate';
import {RootState} from '@tandem/redux/store';
import React from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {styles} from './styles';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import FastImage from 'react-native-fast-image';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import {translation} from '@tandem/utils/methods';
import {saveCurrentChild} from '@tandem/redux/slices/createChild.slice';
import {useDispatch} from 'react-redux';

const LittlePeople = () => {
  const dispatch = useDispatch();
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  const avatars = useAppSelector(stateL => stateL.cache.avatars);

  const children = useAppSelector(
    (state1: RootState) => state1.createChild.childList,
  );
  return (
    <RNScreenWrapper style={styles.container}>
      <RNLogoHeader
        textHeading
        heading={translation('SELECT_A_CHILD')}
        customStyle={styles.heading}
        titleStyle={styles.text}
      />
      <View style={styles.littlePeople}>
        <ScrollView contentContainerStyle={styles.scrollview}>
          {children.map((child, index) => {
            if (!child.connected) {
              const childcacheImage = avatars.filter(
                obj => obj.path === child?.avatar,
              )[0]?.file;
              return (
                <Pressable
                  key={index.toString()}
                  onPress={() => {
                    dispatch(saveCurrentChild(child));
                    navigateTo(SCREEN_NAME.CONNECTION_REQUESTS);
                  }}>
                  <FastImage
                    source={{
                      uri: child.avatar,
                      priority: FastImage.priority.high,
                    }}
                    style={[
                      styles.profile,
                      isTablet && {
                        height: verticalScale(94),
                        width: verticalScale(94),
                      },
                    ]}
                  />
                  <RNTextComponent caps style={styles.name} isSemiBold>
                    {child.name}
                  </RNTextComponent>
                </Pressable>
              );
            }
          })}
        </ScrollView>
      </View>
    </RNScreenWrapper>
  );
};

export default LittlePeople;
