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
import {
  updatePage,
  updateReadingProgress,
} from '@tandem/redux/slices/bookShelf.slice';
import {RootState, store} from '@tandem/redux/store';
import {translation} from '@tandem/utils/methods';
import {readBookNotification} from '@tandem/functions/notifee';
import {
  incrementReadStoryBookNumber,
  incrementStoryPageNumber,
} from '@tandem/redux/slices/activityIndicator.slice';
import selfAnalytics from '@tandem/api/selfAnalytics';
import {UsersAnalyticsEvents} from '@tandem/api/selfAnalytics/interface';
import {stopRecording} from '@tandem/functions/RecordButton';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';
import {resetRecordingState} from '@tandem/redux/slices/recordingButton.slice';
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
  const recordingpremissionGranted = useAppSelector(
    state => state.recording.permissionGranted,
  );

  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );

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
        <ImageBackground
          imageStyle={{resizeMode: 'contain', backgroundColor: 'black'}}
          source={{uri: item.img}}
          style={styles.imageBg}>
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
            imageStyle={{resizeMode: 'center'}}
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
              height: portrait ? '65%' : '100%',
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
            {translation('THE_END')}
          </RNTextComponent>
          <RNTextComponent
            style={{
              textAlign: 'center',
              fontSize: verticalScale(12),
              marginBottom: verticalScale(35),
            }}
            isMedium>
            {translation('GREAT_WORK_NOW')}
          </RNTextComponent>
          {!publicRoute && !state.isStoryRated && (
            <RNButton
              onClick={() => {
                updateState({ratingModal: true});
                stopRecording();
              }}
              title={translation('RATE_THIS_STORY')}
            />
          )}
          <RNButton
            customStyle={{
              marginVertical: verticalScale(10),
              backgroundColor: themeColor.purple,
              borderColor: themeColor.purple,
            }}
            onClick={() => {
              selfAnalytics({
                eventType: UsersAnalyticsEvents.COMPREHENSION_QUESTIONS_VISITED,
                details: {
                  level,
                  mode,
                  bookId: book._id,
                  childId: book.childId,
                },
              });
              updateState({showQuestion: true});
              stopRecording();
            }}
            title={translation('ANSWER_THESE_QUESTION')}
          />
          {book.storyInfo[level]?.conversationStarters &&
            book.storyInfo[level]?.conversationStarters.length > 0 && (
              <RNButton
                customStyle={{
                  backgroundColor: themeColor.gold,
                  borderColor: themeColor.gold,
                }}
                onClick={() => {
                  selfAnalytics({
                    eventType:
                      UsersAnalyticsEvents.CONVERSATION_STARTERS_VISITED,
                    details: {
                      level,
                      mode,
                      bookId: book._id,
                      childId: book.childId,
                    },
                  });
                  navigateTo(SCREEN_NAME.CONVERSATION_STARTERS, {
                    conversationStarters:
                      book.storyInfo[level].conversationStarters,
                  });

                  stopRecording();
                }}
                title={translation('HAVE_YOU_THOUGHT_ABOUT')}
              />
            )}
          <RNButton
            customStyle={{
              marginVertical: verticalScale(10),

              backgroundColor: themeColor.themeBlue,
              borderColor: themeColor.themeBlue,
            }}
            onClick={async () => {
              if (!publicRoute) {
                markBookAsRead(book._id, {
                  ...(mode === MODE.C && {solo: true}),
                  ...(mode === MODE.B && {tandem: true}),
                });
              }
              store.dispatch(incrementReadStoryBookNumber());
              readBookNotification();
              if (recordingpremissionGranted) {
                store.dispatch(
                  addAlertData({
                    type: 'FINAL_CHECK',
                    message: translation('RECORDING_SAVE_TEXT'),
                    onSuccess: async () => {
                      stopRecording(book._id);
                      store.dispatch(resetRecordingState());
                      navigateTo(SCREEN_NAME.HOME);
                    },
                    successText: 'Yes',
                    destructiveText: 'No',
                    onDestructive: () => {
                      stopRecording();
                      store.dispatch(resetRecordingState());
                      navigateTo(SCREEN_NAME.HOME);
                    },
                  }),
                );
                return;
              }
              navigateTo(SCREEN_NAME.HOME);
            }}
            title={translation('GO_TO_HOME')}
          />
        </View>
      </ImageBackground>
    );
  };
  const onViewableItemsChanged = React.useCallback(({changed}: any) => {
    const lastPage = book.storyInfo[0].pages.length - 1 === changed[0].index;
    if (lastPage && !changed[0].isViewable) {
      updateState({endPage: true});
      selfAnalytics({
        eventType: UsersAnalyticsEvents.BOOK_END_REACHED,
        details: {
          mode,
          bookId: book._id,
          childId: book.childId,
        },
      });
    } else {
      updateState({endPage: false});
    }
    store.dispatch(updatePage(changed[0].index));
    if (changed[0].isViewable) {
      store.dispatch(incrementStoryPageNumber());
      store.dispatch(
        updateReadingProgress({
          bookId: book._id,
          progress:
            ((changed[0].index + 1) * 100) / book.storyInfo[level].pages.length,
        }),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
