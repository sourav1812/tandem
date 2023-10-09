/* eslint-disable react-native/no-inline-styles */
import {View, FlatList, Pressable, RefreshControl} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import SearchIcon from '@tandem/assets/svg/SearchIcon';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNStoryCard from '@tandem/components/RNStoryCard';
import {scale, verticalScale} from 'react-native-size-matters';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import navigateTo from '@tandem/navigation/navigate';
import {ValidationError} from '@tandem/utils/validations';
import {translation} from '@tandem/utils/methods';
import BlueBotton from '@tandem/assets/svg/BlueButton';
import BothButton from '@tandem/assets/svg/BothButton';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {MODE} from '@tandem/constants/mode';
import getStories from '@tandem/api/getStories';
import {RootState, store} from '@tandem/redux/store';
import themeColor from '@tandem/theme/themeColor';
import {BooksData} from './interface';
import {clearStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import SadFace from '@tandem/assets/svg/Sad';
import {
  addSnapShot1,
  addSnapShot2,
} from '@tandem/redux/slices/animationSnapshots.slice';
import bookshelfDays from '@tandem/functions/bookshelfDays';

const Bookshelf = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const loader = useAppSelector(state => state.activityIndicator.isEnabled);
  console.log(loader, 'loaderloader345tf');
  const mode = useAppSelector(state => state.mode.mode);
  const [searchText, setText] = useState<ValidationError>({value: ''});
  const [datesKeys, setDateKeys] = useState<string[]>([]);
  const books = useAppSelector((state: RootState) => state.bookShelf.books);
  const data: BooksData[] = React.useMemo(
    () =>
      books?.map((book, index) => {
        const isThisWeek =
          ((new Date().getTime() -
            new Date(book.storyInfo[0].createdAt).getTime()) *
            1.157) /
            10_00_00_000 <
          7; // ! are checking if the book is screated within a week
        let week: string = translation(
          bookshelfDays(new Date(book.storyInfo[0].createdAt)),
        );
        if (datesKeys.includes(week)) {
          week = '';
        } else {
          setDateKeys(prev => [...prev, week]);
        }
        return {
          id: book.storyInfo[0].bookId,
          headerTitle: book.title || `Mock Story ${index + 1}`,
          time:
            new Date(book.storyInfo[0].createdAt).toDateString() || 'Some Date',
          image: require('../../assets/png/imageOne.png'),
          readingTime:
            Math.ceil(
              book.storyInfo[0].pages
                .map(obj => obj.text)
                .join()
                .split(' ').length / 100,
            ) || 10, //  ! avg reading speed is 200 to 300 wpm so we are calculating time in miniutes to read the whole story. using 100 wpm for children
          isNew: isThisWeek, // ! langauge support?
          emogi: null,
          // book.rating && book.rating !== 0
          //   ? ratingList[book.rating - 1].name
          //   : null,
          week,
          teaser: book.teaser,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [books],
  );

  useEffect(() => {
    getAllStories();
  }, []);

  const getAllStories = async () => {
    try {
      await getStories();
    } catch (e) {
      console.log(e);
    }
  };

  const listEmptyComponent = React.useCallback(() => {
    const currentChild = store.getState().createChild.currentChild;
    return (
      <View style={styles.listEmptyComponentContainer}>
        <View style={styles.listEmptyComponentEmogiContainer}>
          <SadFace />
        </View>
        {searchText.value === '' ? (
          <>
            <RNTextComponent isSemiBold style={styles.nothingToSeeText}>
              {mode === MODE.A ? currentChild.name + ' ' : null}
              {translation(`bookshelf.${mode}.heading`)}
            </RNTextComponent>
            <RNTextComponent numberOfLines={2} style={styles.whyDontWriteStory}>
              {translation(`bookshelf.${mode}.subHeading`)}
            </RNTextComponent>
          </>
        ) : (
          <RNTextComponent numberOfLines={2} style={styles.whyDontWriteStory}>
            {translation('NO_RESULTS')}
          </RNTextComponent>
        )}
        <RNButton
          customStyle={{width: '40%', minWidth: '40%'}}
          title={translation('bookshelf.write-a-story')}
          onClick={() => {
            store.dispatch(clearStoryGenerationResponse());
            store.dispatch(addSnapShot1(null));
            store.dispatch(addSnapShot2(null));
            navigateTo(SCREEN_NAME.ROADMAP);
          }}
        />
      </View>
    );
  }, [mode, searchText.value]);

  const renderItem = React.useCallback(({item}: {item: BooksData}) => {
    return (
      <>
        <View style={[{marginHorizontal: isTablet ? verticalScale(30) : 0}]}>
          {item.week && (
            <RNTextComponent
              style={styles.heading}
              numberOfLines={2}
              isSemiBold>
              {item.week}
            </RNTextComponent>
          )}
          <RNStoryCard
            item={item}
            onPress={() => {
              navigateTo(SCREEN_NAME.STORY, {routeData: item});
            }}
          />
        </View>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seperateComponent = () => {
    return <View style={{height: verticalScale(12)}} />;
  };

  return (
    <RNScreenWrapper>
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              mode === MODE.A
                ? themeColor.themeBlue
                : mode === MODE.B
                ? themeColor.lightGreen
                : themeColor.gold,
          },
        ]}>
        <View style={styles.headingView}>
          <View style={styles.spaces} />
          <RNTextComponent style={styles.bookshelfHeaderText} isSemiBold>
            {translation('BOOKSHELF')}
          </RNTextComponent>
          <Pressable
            style={[styles.spaces, {alignItems: 'flex-end'}]}
            onPress={() => navigateTo(SCREEN_NAME.ACCOUNT)}>
            {mode === MODE.B ? (
              <BothButton style={styles.button} />
            ) : (
              <BlueBotton style={styles.button} />
            )}
          </Pressable>
        </View>
        <RNTextInputWithLabel
          hint={translation('SEARCH')}
          value={searchText}
          updateText={setText}
          inputStyle={styles.searchBoxInputStyle}
          backgroundColor="#ffffff"
          containerStyle={[
            styles.searchBoxContainerStyle,
            isTablet && {marginHorizontal: scale(12)},
          ]}
          Icon={<SearchIcon />}
        />
        <View style={styles.bottomViewContainer}>
          <FlatList
            bounces={false}
            style={styles.flatListContatiner}
            contentContainerStyle={[styles.flatListContentContainer]}
            data={data?.filter(obj =>
              searchText.value
                ? obj.headerTitle
                    .toLowerCase()
                    .includes(searchText.value.toLowerCase())
                : true,
            )}
            renderItem={renderItem}
            ListEmptyComponent={listEmptyComponent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={seperateComponent}
            ListFooterComponent={() => {
              return <View style={{height: '5%'}} />;
            }}
            refreshControl={
              <RefreshControl
                refreshing={loader}
                onRefresh={getAllStories}
                colors={[themeColor.themeBlue]}
              />
            }
          />
        </View>
      </View>
    </RNScreenWrapper>
  );
};

export default Bookshelf;
