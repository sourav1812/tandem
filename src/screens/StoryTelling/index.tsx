/* eslint-disable react/no-unstable-nested-components */
import {
  View,
  ImageBackground,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useCallback, useRef} from 'react';
import {styles} from './style';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNButton from '@tandem/components/RNButton';
import Close from '@tandem/assets/svg/Cross';
import Speaker from '@tandem/assets/svg/VolumeDown';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNCharacterComponent from '@tandem/components/RNCharacterComponent';
import {characterList, StateObject} from './interface';
import {characterProps} from '@tandem/components/RNCharacterComponent/interface';
import RNCongratsModal from '@tandem/components/RNCongratsModal';
import themeColor from '@tandem/theme/themeColor';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import Meter from '@tandem/assets/svg/Meter';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNReadingLevelModal from '@tandem/components/RNReadingLevelModal';
import RNReadingTipsModal from '@tandem/components/RNReadingTipsModal';
import RNRatingModal from '@tandem/components/RNRatingModal';
import {scale, verticalScale} from 'react-native-size-matters';
import navigateTo from '@tandem/navigation/navigate';
import {MODE} from '@tandem/constants/mode';
import Mic from '@tandem/assets/svg/BlueMic';
import MuteMic from '@tandem/assets/svg/MuteMic';
import {RootState} from '@tandem/redux/store';
import {translation} from '@tandem/utils/methods';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNVoiceQuesiton from '@tandem/components/RNVoiceQuesiton';
import QuestionMark from '@tandem/assets/svg/QuestionMark';
import RNWellDoneModal from '@tandem/components/RNWellDoneModal';
import RNMultipleChoice from '@tandem/components/RNMultipleChoice';

const StoryTelling = () => {
  const flatlistRef = useRef(null);

  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const mode = useAppSelector(state => state.mode.mode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [renderModal, setRenderModal] = useState(false);
  const [readingLevel, setReadingLevel] = useState(false);
  const [readingTip, setReadingTip] = useState(true);
  const [state, setState] = useState<StateObject>({
    ratingModal: true,
    toggleMic: false,
    showQuestion: false,
    wellDoneModal: false,
  });
  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;
  const {ratingModal, toggleMic, showQuestion, wellDoneModal} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };
  const renderStory = () => {
    return (
      <ImageBackground
        style={[styles.container, {height: height, width: width}]}
        source={require('../../assets/png/storyBackground.png')}>
        {currentIndex + 1 === 5 && (
          <View>
            <View style={styles.summary}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <RNTextComponent style={styles.title} isSemiBold>
                  Magic Castle
                </RNTextComponent>
                <RNTextComponent style={styles.mainCharacter} isSemiBold>
                  The main Characters
                </RNTextComponent>
                <View style={styles.characterList}>
                  {characterList.map((item: characterProps) => {
                    return (
                      <RNCharacterComponent
                        characterName={item.characterName}
                        url={item.url}
                        customStyle={styles.boxStyle}
                      />
                    );
                  })}
                </View>
                <RNTextComponent style={styles.content}>
                  Fascinating children's book that recounts the exciting
                  adventure of three friends, Tim, Lena, and Max. Together they
                  go in search of the lost treasure, about which legends and
                  tales are told. During their journey, the children encounter
                  mysterious conspiracies, solve puzzles, and overcome dangers
                  to reach their.
                </RNTextComponent>
              </ScrollView>
            </View>
            <RNButton
              title={`${translation('GREAT')}!`}
              customStyle={[
                styles.footerButton,
                isTablet && {maxHeight: verticalScale(180)},
              ]}
              textStyle={isTablet && {fontSize: scale(12)}}
              onClick={toggleModal}
            />
          </View>
        )}
      </ImageBackground>
    );
  };
  const onViewableItemsChanged = useCallback(({viewableItems}: any) => {
    console.log(viewableItems[0].index);
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

  React.useEffect(() => {
    switch (currentIndex) {
      case 1:
        updateState({showQuestion: true});
        break;
      case 2:
        updateState({showQuestion: true});
        break;
    }
  }, [currentIndex]);

  const toggleModal = () => {
    setRenderModal(!renderModal);
  };
  const renderReadingLevel = () => {
    setReadingLevel(!readingLevel);
  };
  const renderTipLevel = () => {
    setReadingTip(!readingTip);
  };

  const renderRatingModal = () => {
    updateState({ratingModal: !ratingModal});
  };

  const renderWellDoneModal = () => {
    updateState({wellDoneModal: !wellDoneModal});
  };

  const headerButton = () => {
    switch (mode) {
      case MODE.A:
        return (
          <RNButton
            onlyIcon
            icon={<Meter />}
            onClick={() => renderReadingLevel()}
          />
        );

      case MODE.B:
        return <RNButton onlyIcon icon={<Speaker />} onClick={() => {}} />;

      case MODE.C:
        return (
          <RNButton
            onlyIcon
            icon={toggleMic ? <MuteMic /> : <Mic />}
            onClick={() => updateState({toggleMic: !toggleMic})}
          />
        );
    }
  };

  const renderQuestions = () => {
    switch (currentIndex) {
      case 1:
        return (
          <View style={styles.questionView}>
            <RNLogoHeader
              heading={translation('QUESTIONS_ABOUT_THE_STORY')}
              textHeading
              titleStyle={styles.headerTitle}
              customStyle={styles.headerStyle}
              rightIcon={
                <RNButton onlyIcon icon={<QuestionMark />} onClick={() => {}} />
              }
            />
            <RNVoiceQuesiton
              // onClick={renderWellDoneModal}
              onClick={() => {
                updateState({showQuestion: false});
              }}
              customStyle={{paddingHorizontal: scale(20)}}
            />
          </View>
        );
      case 2:
        return (
          <RNMultipleChoice
            onNextPress={() => {
              navigateTo(SCREEN_NAME.STORY_TELLING);
            }}
          />
        );
    }
  };

  return (
    <RNScreenWrapper>
      <View style={styles.headingButton}>
        <RNButton
          onlyIcon
          icon={<Close />}
          onClick={() => {
            navigateTo(SCREEN_NAME.BOOKSHELF);
          }}
        />
        {currentIndex + 1 === 5 && (
          <RNTextComponent isSemiBold style={styles.summaryTitle}>
            {translation('SUMMARY')}
          </RNTextComponent>
        )}
        {headerButton()}
      </View>
      <FlatList
        data={Array.from({length: 5}, (_, i) => {
          return {index: i};
        })}
        ref={flatlistRef}
        renderItem={renderStory}
        pagingEnabled
        horizontal
        decelerationRate={50}
        onEndReachedThreshold={2}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 2, // adjust threshold as needed
        }}
        showsHorizontalScrollIndicator={false}
      />
      {currentIndex + 1 != 5 && (
        <ImageBackground
          style={styles.storyContent}
          blurRadius={20}
          source={require('../../assets/png/blurBgc.png')}
          imageStyle={[
            styles.imageStyle,
            isTablet && {
              borderTopLeftRadius: verticalScale(8),
              borderTopRightRadius: verticalScale(8),
            },
          ]}>
          <RNTextComponent style={styles.slideNo} isSemiBold>
            1/{currentIndex + 1}
          </RNTextComponent>
          <RNTextComponent
            style={[
              styles.slideNo,
              {color: themeColor.black, textAlign: 'center', zIndex: 3},
            ]}
            isSemiBold>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            sunt quod culpa nulla praesentium accusantium voluptas sit esse,
            quibusdam dasperisi!
          </RNTextComponent>
        </ImageBackground>
      )}
      {showQuestion && renderQuestions()}
      <RNCongratsModal visible={renderModal} renderModal={toggleModal} />
      <RNReadingLevelModal
        visible={readingLevel}
        renderModal={renderReadingLevel}
        nextClick={renderReadingLevel}
      />
      {currentIndex === 3 && (
        <RNReadingTipsModal
          visible={readingTip}
          renderModal={renderTipLevel}
          nextClick={renderTipLevel}
        />
      )}
      {currentIndex + 1 === 5 && mode === MODE.B && (
        <RNRatingModal
          visible={ratingModal}
          renderModal={renderRatingModal}
          nextClick={renderRatingModal}
        />
      )}
      <RNWellDoneModal
        visible={wellDoneModal}
        renderModal={renderWellDoneModal}
        nextClick={() => {
          updateState({
            showQuestion: false,
          });
          // flatlistRef?.current?.scrollToIndex({
          //   animated: true,
          //   index: currentIndex + 1,
          // });
        }}
      />
    </RNScreenWrapper>
  );
};

export default StoryTelling;
