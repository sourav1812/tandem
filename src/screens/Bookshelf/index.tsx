/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, Pressable} from 'react-native';
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
import {RootState} from '@tandem/redux/store';
import themeColor from '@tandem/theme/themeColor';
import {BooksData} from './interface';
import {ratingList} from '@tandem/components/RNRatingModal/interface';

const Bookshelf = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const mode = useAppSelector(state => state.mode.mode);
  const [searchText, setText] = useState<ValidationError>({value: ''});
  const books = useAppSelector((state: RootState) => state.bookShelf.books);
  const data: BooksData[] = books?.map((book, index) => {
    const isThisWeek =
      ((new Date().getTime() - new Date(book.createdAt).getTime()) * 1.157) /
        10_00_00_000 <
      7; // ! are checking if the book is screated within a week
    return {
      id: book.bookId,
      headerTitle: book.title || `Mock Story ${index + 1}`,
      time: new Date(book.createdAt).toDateString() || 'Some Date',
      image: book.thumbnail || require('../../assets/png/imageOne.png'),
      readingTime: Math.ceil(book.story.split(' ').length / 100) || 10, //  ! avg reading speed is 200 to 300 wpm so we are calculating time in miniutes to read the whole story. using 100 wpm for children
      isNew: isThisWeek, // ! langauge support?
      emogi:
        book.rating && book.rating !== 0
          ? ratingList[book.rating - 1].name
          : null,
      week: isThisWeek ? 'This Week' : 'Last Week', // ! need langauge support
      teaser: book.teaser,
    };
  });

  useEffect(() => {
    (async () => {
      try {
        getStories();
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const listEmptyComponent = React.useCallback(() => {
    return (
      <View style={styles.listEmptyComponentContainer}>
        <View style={styles.listEmptyComponentEmogiContainer}>
          <Text style={styles.listEmptyComponentEmoji}>{'\u{1F614}'}</Text>
        </View>
        <RNTextComponent style={styles.nothingToSeeText}>
          {translation('bookshelf.nothing-to-see-here')}
        </RNTextComponent>
        <RNTextComponent numberOfLines={2} style={styles.whyDontWriteStory}>
          {`${translation('bookshelf.why-dont-we-one')} \n ${translation(
            'bookshelf.why-dont-we-two',
          )}together now?`}
        </RNTextComponent>
        <RNButton
          title={translation('bookshelf.write-a-story')}
          onClick={() => {}}
        />
      </View>
    );
  }, []);
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
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={listEmptyComponent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={seperateComponent}
            ListFooterComponent={() => {
              return <View style={{height: '5%'}} />;
            }}
          />
        </View>
      </View>
    </RNScreenWrapper>
  );
};

export default Bookshelf;
