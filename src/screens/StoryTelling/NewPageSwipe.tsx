/* eslint-disable react-native/no-inline-styles */
import {ImageBackground, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import Book from '@tandem/api/getStories/interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import {
  FlatList,
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  ScrollView,
} from 'react-native-gesture-handler';
import {height, width} from '@tandem/helpers/dimensions';
import RNButton from '@tandem/components/RNButton';
import themeColor from '@tandem/theme/themeColor';
import {StateObject} from './interface';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import Orientation from 'react-native-orientation-locker';
import {FONT_SIZES} from '@tandem/constants/local';
import markBookAsRead from '@tandem/api/markBookAsRead';
import {MODE} from '@tandem/constants/mode';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {updatePage} from '@tandem/redux/slices/bookShelf.slice';
import {store} from '@tandem/redux/store';
interface IPage {
  text: string;
  img: string;
}

export default ({
  textArray,
  state,
  book,
  updateState,
  publicRoute,
}: {
  textArray: IPage[];
  book: Book;
  state: StateObject;
  updateState: (data: any) => void;
  publicRoute: boolean;
}) => {
  const [isClosed, setClosed] = React.useState(false);
  const [swipeEnabled, setSwipeEnabled] = React.useState(true);
  const isTablet = useAppSelector(rootState => rootState.deviceType.isTablet);
  const level = useAppSelector(rootState => rootState.storyLevel.level);
  const size = useAppSelector(rootState => rootState.storyLevel.size);
  const mode = useAppSelector(rootState => rootState.mode.mode);
  const translateY = useSharedValue(0);
  React.useEffect(() => {
    if (isTablet) {
      Orientation.lockToLandscapeLeft();
    }
    return () => {
      if (isTablet) {
        Orientation.unlockAllOrientations();
      }
    };
  }, [isTablet]);

  const onGestureEvent = (e: GestureEvent<PanGestureHandlerEventPayload>) => {
    const nativeEvent = e.nativeEvent;
    if (!swipeEnabled) {
      return;
    }
    if (isTablet) {
      setClosed(false);
      return;
    }
    if (nativeEvent.velocityY > 0 && !isClosed) {
      setClosed(true);
      translateY.value = withTiming(1000);
      setSwipeEnabled(false);
    } else if (nativeEvent.velocityY < 0 && isClosed) {
      setClosed(false);
      translateY.value = withTiming(0);
      setSwipeEnabled(false);
    }
  };
  const flatListRef = useRef<FlatList>(null);
  const renderItem = React.useCallback(
    ({item, index}: {item: IPage; index: number}) => {
      return (
        <ImageBackground source={{uri: item.img}} style={styles.imageBg}>
          <Animated.View
            style={[
              {
                transform: [{translateY: translateY}],
              },
              styles.bottomSheet,
            ]}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
              <RNTextComponent
                style={{textAlign: 'center', fontSize: FONT_SIZES[size]}}
                isMedium>
                {book.storyInfo[level].pages[index].text}
              </RNTextComponent>
            </ScrollView>
          </Animated.View>
        </ImageBackground>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isClosed, level, size],
  );
  const renderItemLandscape = React.useCallback(
    ({item, index}: {item: IPage; index: number}) => {
      return (
        <View
          style={{width: height.hmax, height: '100%', flexDirection: 'row'}}>
          <ImageBackground
            source={{uri: item.img}}
            style={{height: '100%', width: height.hmax / 2}}
          />
          <ScrollView
            contentContainerStyle={{
              height: '100%',
              width: height.hmax / 2,
              justifyContent: 'center',
              padding: 20,
            }}
            showsVerticalScrollIndicator={false}
            bounces={false}>
            <RNTextComponent
              style={{textAlign: 'center', fontSize: FONT_SIZES[size]}}
              isMedium>
              {book.storyInfo[level].pages[index].text}
            </RNTextComponent>
          </ScrollView>
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [level, size],
  );
  const renderFooter = () => {
    return (
      <ImageBackground
        source={{uri: textArray[textArray.length - 1].img}}
        style={[styles.imageBg, {width: isTablet ? height.hmax : width.wMax}]}>
        <View
          style={[
            {
              height: '65%',
            },
            styles.bottomSheet,
          ]}>
          <RNTextComponent
            style={{
              textAlign: 'center',
              fontSize: verticalScale(20),
              marginBottom: verticalScale(15),
            }}
            isSemiBold>
            The End
          </RNTextComponent>
          <RNTextComponent
            style={{
              textAlign: 'center',
              fontSize: verticalScale(12),
              marginBottom: verticalScale(35),
            }}
            isMedium>
            Great work. Now why don't you...
          </RNTextComponent>
          {!publicRoute && !state.isStoryRated && (
            <RNButton
              onClick={() => {
                updateState({ratingModal: true});
              }}
              title="Rate this story..."
            />
          )}
          <RNButton
            customStyle={{
              marginVertical: verticalScale(10),
              backgroundColor: themeColor.purple,
              borderColor: themeColor.purple,
            }}
            onClick={() => {
              updateState({showQuestion: true});
            }}
            title="Answer these questions..."
          />
          {book.storyInfo[level]?.conversationStarters &&
            book.storyInfo[level]?.conversationStarters.length > 0 && (
              <RNButton
                customStyle={{
                  backgroundColor: themeColor.gold,
                  borderColor: themeColor.gold,
                }}
                onClick={() => {
                  navigateTo(SCREEN_NAME.CONVERSATION_STARTERS, {
                    conversationStarters:
                      book.storyInfo[level].conversationStarters,
                  });
                }}
                title="Have you thought about..."
              />
            )}
          <RNButton
            customStyle={{
              marginVertical: verticalScale(10),

              backgroundColor: themeColor.themeBlue,
              borderColor: themeColor.themeBlue,
            }}
            onClick={() => {
              if (!publicRoute) {
                markBookAsRead(book._id, {
                  ...(mode === MODE.C && {solo: true}),
                  ...(mode === MODE.B && {tandem: true}),
                });
              }
              navigateTo(SCREEN_NAME.HOME);
            }}
            title="Go to Home"
          />
        </View>
      </ImageBackground>
    );
  };
  const onViewableItemsChanged = React.useCallback(({changed}) => {
    store.dispatch(updatePage(changed[0].index));
  }, []);
  return (
    <PanGestureHandler
      activeOffsetY={[-10, 10]}
      simultaneousHandlers={[flatListRef]}
      onEnded={() => {
        setSwipeEnabled(true);
      }}
      onGestureEvent={onGestureEvent}>
      <FlatList
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        ref={flatListRef}
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.text}
        decelerationRate={0.3}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={textArray}
        renderItem={isTablet ? renderItemLandscape : renderItem}
        ListFooterComponent={renderFooter}
      />
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    width: width.wMax,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    maxHeight: '80%',
    paddingHorizontal: verticalScale(15),
    paddingVertical: verticalScale(30),
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
});
