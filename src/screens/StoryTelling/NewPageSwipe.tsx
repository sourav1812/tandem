/* eslint-disable react-native/no-inline-styles */
import {
  ImageBackground,
  LayoutAnimation,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';
import React from 'react';
import Book from '@tandem/api/getStories/interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {verticalScale} from 'react-native-size-matters';
import {
  Gesture,
  GestureDetector,
  GestureUpdateEvent,
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
interface IPage {
  text: string;
  img: string;
}

export default ({
  textArray,
  state,
  book,
  updateState,
}: {
  textArray: IPage[];
  book: Book;
  state: StateObject;
  updateState: (data: any) => void;
}) => {
  const [isClosed, setClosed] = React.useState(false);
  const isTablet = useAppSelector(rootState => rootState.deviceType.isTablet);
  const level = useAppSelector(rootState => rootState.storyLevel.level);
  const size = useAppSelector(rootState => rootState.storyLevel.size);
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

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onUpdate((g: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      if (isTablet) {
        setClosed(false);
        return;
      }
      if (g.velocityY > 0 && !isClosed) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setClosed(true);
      } else if (g.velocityY < 0 && isClosed) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setClosed(false);
      }
    });
  const renderItem = React.useCallback(
    ({item, index}: {item: IPage; index: number}) => {
      return (
        <ImageBackground source={{uri: item.img}} style={styles.imageBg}>
          <View
            style={[
              {
                maxHeight: isClosed ? 0 : '80%',
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
          </View>
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
          {!state.isStoryRated && (
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
          <RNButton
            customStyle={{
              backgroundColor: themeColor.gold,
              borderColor: themeColor.gold,
            }}
            onClick={() => {}}
            title="Have you thought about..."
          />
        </View>
      </ImageBackground>
    );
  };

  return (
    <GestureDetector gesture={pan}>
      <FlatList
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
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    width: width.wMax,
    height: '100%',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
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
