import {View, Text, FlatList, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNTextInputWithLabel from '@tandem/components/RNTextInputWithLabel';
import SearchIcon from '@tandem/assets/svg/SearchIcon';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNStoryCard from '@tandem/components/RNStoryCard';
import {scale, verticalScale} from 'react-native-size-matters';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import i18n from '@tandem/constants/lang/i18n';
import navigateTo from '@tandem/navigation/navigate';

const Bookshelf = () => {
  const isTablet = checkIfTablet();

  const data = [
    {
      id: 0,
      headerTitle: 'Story of the best of friends. ',
      time: '14.08.2023',
      image: require('../../assets/png/imageOne.png'),
      readingTime: 7,
      isNew: true,
      emogi: ':heart_eyes:',
      week: 'This Week',
    },
    {
      id: 1,
      headerTitle: 'Story of Wonderland. ',
      time: '04.08.2023',
      image: require('../../assets/png/imageTwo.png'),
      readingTime: 3,
      isNew: false,
      emogi: ':heart_eyes:',
      week: 'Last Week',
    },
    {
      id: 2,
      headerTitle: 'Story of a little girl Lily. ',
      time: '05.08.2023',
      image: require('../../assets/png/imageThree.png'),
      readingTime: 9,
      isNew: false,
      emogi: ':heart_eyes:',
      week: '',
    },
  ];

  const listEmptyComponent = React.useCallback(() => {
    return (
      <View style={styles.listEmptyComponentContainer}>
        <View style={styles.listEmptyComponentEmogiContainer}>
          <Text style={styles.listEmptyComponentEmoji}>{'\u{1F614}'}</Text>
        </View>
        <RNTextComponent style={styles.nothingToSeeText}>
          Nothing to see here... yet!
        </RNTextComponent>
        <RNTextComponent numberOfLines={2} style={styles.whyDontWriteStory}>
          {"Why don't we write a story \n together now?"}
        </RNTextComponent>
        <RNButton title="Write a story" onClick={() => {}} />
      </View>
    );
  }, []);
  const renderItem = React.useCallback(({item}: any) => {
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
          <Pressable
            onPress={() => {
              navigateTo(SCREEN_NAME.STORY);
            }}>
            <RNStoryCard item={item} />
          </Pressable>
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
      <View style={styles.container}>
        <RNTextComponent style={styles.bookshelfHeaderText} isSemiBold>
          {i18n.t('BOOKSHELF')}
        </RNTextComponent>
        <RNTextInputWithLabel
          hint={'Search'}
          value={''}
          updateText={() => {}}
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
            style={styles.flatListContatiner}
            contentContainerStyle={[styles.flatListContentContainer]}
            data={data}
            renderItem={renderItem}
            ListEmptyComponent={listEmptyComponent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={seperateComponent}
          />
        </View>
      </View>
    </RNScreenWrapper>
  );
};

export default Bookshelf;
