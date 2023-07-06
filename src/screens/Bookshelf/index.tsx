import {View, Text, FlatList, Pressable} from 'react-native';
import React from 'react';
import {styles} from './styles';
import RNScreenWrapper from '../../components/RNScreenWrapper';
import RNTextInputWithLabel from '../../components/RNTextInputWithLabel';
import SearchIcon from '../../assets/svg/SearchIcon';
import RNButton from '../../components/RNButton';
import RNTextComponent from '../../components/RNTextComponent';
import RNStoryCard from '../../components/RNStoryCard';
import {scale, verticalScale} from 'react-native-size-matters';
import {BookShelfScreenProps} from '../../navigation/types';
import {COMPONENTSNAME} from '../../navigation/ComponentName';
import {checkIfTablet} from '../../hooks/isTabletHook';

const Bookshelf = ({navigation}: BookShelfScreenProps) => {
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
              navigation.navigate(COMPONENTSNAME.STORY);
            }}>
            <RNStoryCard item={item} />
          </Pressable>
        </View>
      </>
    );
  }, []);

  const seperateComponent = () => {
    return <View style={{height: verticalScale(12)}} />;
  };

  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <RNTextComponent style={styles.bookshelfHeaderText} isSemiBold>
          Bookshelf
        </RNTextComponent>
        <RNTextInputWithLabel
          label={''}
          hint={'Search'}
          value={''}
          showLabel={false}
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
