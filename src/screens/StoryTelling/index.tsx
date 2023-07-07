/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import {View, ImageBackground, FlatList, ScrollView} from 'react-native';
import React, {useState, useCallback} from 'react';
import {styles} from './style';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNButton from '@tandem/components/RNButton';
import Close from '@tandem/assets/svg/Cross';
import Speaker from '@tandem/assets/svg/VolumeDown';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNCharacterComponent from '@tandem/components/RNCharacterComponent';
import {characterList, stateObject} from './interface';
import {characterProps} from '@tandem/components/RNCharacterComponent/interface';
import RNCongratsModal from '@tandem/components/RNCongratsModal';
import themeColor from '@tandem/theme/themeColor';
import {StoryTellingScreenProps} from '@tandem/navigation/types';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';
import Meter from '@tandem/assets/svg/Meter';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNReadingLevelModal from '@tandem/components/RNReadingLevelModal';
import RNReadingTipsModal from '@tandem/components/RNReadingTipsModal';
import RNRatingModal from '@tandem/components/RNRatingModal';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import {verticalScale} from 'react-native-size-matters';

const StoryTelling = ({navigation}: StoryTellingScreenProps) => {
  const isTablet = checkIfTablet();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [renderModal, setRenderModal] = useState(false);
  const [readingLevel, setReadingLevel] = useState(false);
  const [readingTip, setReadingTip] = useState(true);
  const [state, setState] = useState<stateObject>({
    ratingModal: true,
  });

  const {ratingModal} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };
  const mode = useAppSelector(state => state.mode.mode);
  console.log(mode, 'StoryTellingScreenProps');
  const renderStory = () => {
    return (
      <ImageBackground
        style={styles.container}
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
              title="Great!"
              customStyle={styles.footerButton}
              onClick={toggleModal}
            />
          </View>
        )}
      </ImageBackground>
    );
  };
  const onViewableItemsChanged = useCallback(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }, []);

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

  return (
    <RNScreenWrapper>
      <View style={styles.headingButton}>
        <RNButton
          onlyIcon
          icon={<Close />}
          onClick={() => {
            navigation.navigate(COMPONENTSNAME.BOOKSHELF);
          }}
        />
        {currentIndex + 1 === 5 && (
          <RNTextComponent isSemiBold style={styles.summaryTitle}>
            Summary
          </RNTextComponent>
        )}
        <RNButton
          onlyIcon
          icon={
            mode === 'bmode' && currentIndex + 1 < 5 ? <Meter /> : <Speaker />
          }
          onClick={() => {
            if (mode === 'bmode' && currentIndex + 1 < 5) {
              renderReadingLevel();
            }
          }}
        />
      </View>
      <FlatList
        data={Array.from({length: 5}, (_, i) => {
          return {index: i};
        })}
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
      {currentIndex + 1 === 5 && mode === 'bmode' && (
        <RNRatingModal
          visible={ratingModal}
          renderModal={renderRatingModal}
          nextClick={renderRatingModal}
        />
      )}
    </RNScreenWrapper>
  );
};

export default StoryTelling;
