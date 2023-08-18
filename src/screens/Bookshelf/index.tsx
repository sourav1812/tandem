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
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {translation} from '@tandem/utils/methods';
import BlueBotton from '@tandem/assets/svg/BlueButton';
import BothButton from '@tandem/assets/svg/BothButton';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {MODE} from '@tandem/constants/mode';
import getStories from '@tandem/api/getStories';

const Bookshelf = () => {
  const isTablet = checkIfTablet();
  const mode = useAppSelector(state => state.mode.mode);
  const [searchText, setText] = useState<ValidationError>({value: ''});
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
