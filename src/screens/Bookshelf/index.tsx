/* eslint-disable react-native/no-inline-styles */
import {
  View,
  FlatList,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
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
import {store} from '@tandem/redux/store';
import themeColor from '@tandem/theme/themeColor';
import {BooksData} from './interface';
import {clearStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import SadFace from '@tandem/assets/svg/Sad';
import {
  addSnapShot1,
  addSnapShot2,
} from '@tandem/redux/slices/animationSnapshots.slice';
import bookshelfDays from '@tandem/functions/bookshelfDays';
import {changeStoryLevel} from '@tandem/redux/slices/storyLevel.slice';
import {useDispatch} from 'react-redux';
import {ratingList} from '@tandem/components/RNRatingModal/interface';
import Book from '@tandem/api/getStories/interface';

const Bookshelf = () => {
  const dispatch = useDispatch();
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const currentChild = useAppSelector(state => state.createChild.currentChild);
  const mode = useAppSelector(state => state.mode.mode);
  const [searchText, setText] = useState<ValidationError>({value: ''});
  const images = useAppSelector(state => state.bookShelf.images);
  const [bookObjects, setBookObjects] = useState<{
    endReached: boolean;
    books: Book[];
  }>({endReached: false, books: []});
  const data: BooksData[] = React.useMemo(
    () =>
      bookObjects.books?.map((book, index) => {
        const isThisWeek =
          ((new Date().getTime() - new Date(book.createdAt).getTime()) *
            1.157) /
            10_00_00_000 <
          7; // ! are checking if the book is screated within a week
        const week: string = translation(
          bookshelfDays(new Date(book.createdAt)),
        );
        return {
          id: book._id,
          headerTitle: book.title || `Mock Story ${index + 1}`,
          time: new Date(book.createdAt).toDateString() || 'Some Date',
          image: images[book._id]?.[0] || null,
          readingTime:
            Math.ceil(
              book.storyInfo[0].pages
                .map(obj => obj.text)
                .join()
                .split(' ').length / 100,
            ) || 10, //  ! avg reading speed is 200 to 300 wpm so we are calculating time in miniutes to read the whole story. using 100 wpm for children
          isNew: isThisWeek, // ! langauge support?
          emogi:
            book?.ratingInfo?.[0]?.storyRating &&
            book?.ratingInfo?.[0]?.storyRating !== 0
              ? ratingList[book.ratingInfo?.[0].storyRating - 1].name
              : null,
          week,
          teaser: book.teaser,
          book,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bookObjects.books.length, images],
  );

  const listFooterComponent = () => {
    return <View style={{height: 25}} />;
  };

  const listEmptyComponent = React.useCallback(() => {
    const currentChildLocal = store.getState().createChild.currentChild;
    return (
      <View style={styles.listEmptyComponentContainer}>
        <View style={styles.listEmptyComponentEmogiContainer}>
          <SadFace />
        </View>
        {searchText.value === '' ? (
          <>
            <RNTextComponent isSemiBold style={styles.nothingToSeeText}>
              {mode === MODE.A ? currentChildLocal.name + ' ' : null}
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

  const renderItem = React.useCallback(
    ({item}: {item: BooksData}) => {
      if (images[item.id] === undefined) {
        return <ActivityIndicator />;
      }
      return (
        <View
          style={[
            {
              marginHorizontal: isTablet ? verticalScale(30) : 0,
            },
          ]}>
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
              dispatch(changeStoryLevel(2));
              navigateTo(SCREEN_NAME.STORY, {routeData: item});
            }}
          />
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images],
  );
  const [page, setPage] = React.useState(1);
  const [isLoading, setLoading] = React.useState(false);
  const fetchMoreData = () => {
    if (!bookObjects.endReached && !isLoading && !searchText.value) {
      setPage(page + 1);
    }
  };
  React.useEffect(() => {
    const f = async () => {
      try {
        setLoading(true);
        console.log('currentPage', page);
        const response = await getStories(page);
        setBookObjects(prev => ({
          books:
            page === 1 ? response.books : [...prev.books, ...response.books],
          endReached: response.endReached,
        }));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    f();
  }, [page]);
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
            {mode === MODE.B && <BothButton style={styles.button} />}
            {mode === MODE.A && <BlueBotton style={styles.button} />}
            {mode === MODE.C && (
              <View
                style={[
                  styles.accountbutton,
                  {
                    height: isTablet ? scale(22) : scale(30),
                    width: isTablet ? scale(22) : scale(30),
                    marginRight: isTablet ? scale(20) : scale(15),
                  },
                ]}>
                <View
                  style={[
                    styles.dot,
                    {
                      height: isTablet ? scale(12) : scale(15),
                      width: isTablet ? scale(12) : scale(15),
                    },
                  ]}
                />
              </View>
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
            data={
              bookObjects.books.filter(
                book => book.childId === currentChild.childId,
              ).length > 0
                ? data?.filter(obj =>
                    searchText.value
                      ? obj.headerTitle
                          .toLowerCase()
                          .includes(searchText.value.toLowerCase())
                      : true,
                  )
                : []
            }
            renderItem={renderItem}
            ListEmptyComponent={listEmptyComponent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={seperateComponent}
            ListFooterComponent={listFooterComponent}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => {
                  setPage(1);
                }}
                colors={[themeColor.themeBlue]}
              />
            }
            keyExtractor={item => item.id}
            onEndReached={fetchMoreData}
            onEndReachedThreshold={0.2}
          />
        </View>
      </View>
    </RNScreenWrapper>
  );
};

export default Bookshelf;
