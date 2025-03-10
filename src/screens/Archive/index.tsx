/* eslint-disable react-native/no-inline-styles */
import {View, Pressable, ActivityIndicator, SectionList} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import SearchIcon from '@tandem/assets/svg/SearchIcon';
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
import getArchivedStories from '@tandem/api/getArchivedStories';
import themeColor from '@tandem/theme/themeColor';
import {BooksData} from './interface';
import SadFace from '@tandem/assets/svg/Sad';
import bookshelfDays from '@tandem/functions/bookshelfDays';
import {ratingList} from '@tandem/components/RNRatingModal/interface';
import Book from '@tandem/api/getStories/interface';
import RNButton from '@tandem/components/RNButton';
import {ImageLoading} from '../PublicLib';
import {useFocusEffect} from '@react-navigation/native';

const Archive = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const mode = useAppSelector(state => state.mode.mode);
  const [searchText, setText] = useState<ValidationError>({value: ''});
  const images = useAppSelector(state => state.bookShelf.images);
  const [page, setPage] = React.useState(1);
  const [isLoading, setLoading] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = React.useState(false);
  const [sectionList, setSectionList] = React.useState<
    {title: string; data: BooksData[]}[]
  >([]);
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
          7; // ! are checking if the book is created within a week
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
  React.useEffect(() => {
    const sectionListLocal: {title: string; data: BooksData[]}[] = [];

    const dataRef = data.filter(dataObject =>
      searchText.value
        ? dataObject.headerTitle.includes(searchText.value)
        : true,
    );

    dataRef.forEach(obj => {
      const availableIndex = sectionListLocal.findIndex(
        sl => sl.title === obj.week,
      );
      if (availableIndex === -1) {
        // ! new entry is required
        const newObjectToPush = {title: obj.week, data: [obj]};
        sectionListLocal.push(newObjectToPush);
        return;
      }
      sectionListLocal[availableIndex].data.push(obj);
    });
    setSectionList(sectionListLocal);
  }, [data, searchText.value]);

  const listFooterComponent = () => {
    if (isLoading) {
      return <ActivityIndicator />;
    }
    if (
      bookObjects.endReached &&
      bookObjects.books.length !== 0 &&
      !isImageLoading
    ) {
      return (
        <RNTextComponent
          isMedium
          style={{textAlign: 'center', fontSize: verticalScale(9)}}>
          {translation('NO_MORE_BOOKS')}
        </RNTextComponent>
      );
    }
    return <View style={{height: 25}} />;
  };

  const listEmptyComponent = React.useCallback(() => {
    if (!bookObjects.endReached || isLoading) {
      return null;
    }
    return (
      <View style={styles.listEmptyComponentContainer}>
        <View style={styles.listEmptyComponentEmogiContainer}>
          <SadFace />
        </View>
        {searchText.value === '' ? (
          <>
            <RNTextComponent numberOfLines={2} style={styles.whyDontWriteStory}>
              {translation('NO_BOOKS_IN_ARCHIVE')}
            </RNTextComponent>
          </>
        ) : (
          <RNTextComponent numberOfLines={2} style={styles.whyDontWriteStory}>
            {translation('NO_RESULTS')}
          </RNTextComponent>
        )}
      </View>
    );
  }, [bookObjects.endReached, isLoading, searchText.value]);

  React.useLayoutEffect(() => {
    setIsImageLoading(data.some(obj => obj.image === null));
  }, [images, data]);

  const renderItem = React.useCallback(
    ({item}: {item: BooksData; index: number}) => {
      if (images[item.id] === undefined) {
        return null;
      }
      return (
        <View
          style={[
            {
              marginHorizontal: isTablet ? verticalScale(30) : 0,
            },
          ]}>
          <RNStoryCard
            item={item}
            onPress={() => {
              navigateTo(SCREEN_NAME.STORY, {routeData: item});
            }}
          />
        </View>
      );
    },
    [images, isTablet],
  );

  const fetchMoreData = () => {
    if (!bookObjects.endReached && !isLoading && !searchText.value) {
      setPage(page + 1);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const f = async () => {
        try {
          setLoading(true);
          setPage(1);
          setBookObjects({books: [], endReached: false});
          const response = await getArchivedStories(1);
          setBookObjects(response);
        } catch (e) {
          console.log('error in archive pagination for useFocus effect', e);
        } finally {
          setLoading(false);
        }
      };
      f();
    }, []),
  );

  React.useEffect(() => {
    const f = async () => {
      try {
        setLoading(true);
        console.log('currentPage', page);
        const response = await getArchivedStories(page);
        setBookObjects(prev => ({
          books: [...prev.books, ...response.books],
          endReached: response.endReached,
        }));
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    if (page > 1) {
      f();
    }
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
            backgroundColor: themeColor.purple,
          },
        ]}>
        <View style={styles.headingView}>
          <RNButton
            customStyle={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              marginLeft: verticalScale(15),
            }}
            textStyle={{color: themeColor.white}}
            onClick={() => {
              navigateTo();
            }}
            title={translation('BACK')}
          />
          <RNTextComponent style={styles.bookshelfHeaderText} isSemiBold>
            {translation('ARCHIVE')}
          </RNTextComponent>
          <Pressable onPress={() => navigateTo(SCREEN_NAME.ACCOUNT)}>
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
          {isImageLoading && <ImageLoading />}
          <SectionList
            sections={sectionList}
            bounces={false}
            stickySectionHeadersEnabled={false}
            style={styles.flatListContatiner}
            contentContainerStyle={[styles.flatListContentContainer]}
            renderItem={renderItem}
            ListEmptyComponent={listEmptyComponent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={seperateComponent}
            ListFooterComponent={listFooterComponent}
            renderSectionHeader={({section: {title}}) => (
              <RNTextComponent
                style={styles.heading}
                numberOfLines={2}
                isSemiBold>
                {title}
              </RNTextComponent>
            )}
            keyExtractor={(_, index) => index.toString()}
            onEndReached={fetchMoreData}
            onEndReachedThreshold={0.2}
          />
        </View>
      </View>
    </RNScreenWrapper>
  );
};

export default Archive;
