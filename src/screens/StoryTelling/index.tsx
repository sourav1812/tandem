/* eslint-disable react-native/no-inline-styles */
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
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNReadingLevelModal from '@tandem/components/RNReadingLevelModal';
import RNRatingModal from '@tandem/components/RNRatingModal';
import {scale, verticalScale} from 'react-native-size-matters';
import navigateTo from '@tandem/navigation/navigate';
import {MODE} from '@tandem/constants/mode';
import {RootState} from '@tandem/redux/store';
import {translation} from '@tandem/utils/methods';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNVoiceQuesiton from '@tandem/components/RNVoiceQuesiton';
import QuestionMark from '@tandem/assets/svg/QuestionMark';
import RNWellDoneModal from '@tandem/components/RNWellDoneModal';
import RNMultipleChoice from '@tandem/components/RNMultipleChoice';
import {TOOLTIP} from '@tandem/constants/LocalConstants';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import RNTooltip from '@tandem/components/RNTooltip';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Book from '@tandem/api/getStories/interface';
import {STORIES_RESPONSE} from '@tandem/constants/enums';

const StoryTelling = () => {
  const flatlistRef = useRef(null);
  const tooltipArray = getValueFromKey(TOOLTIP);
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const mode = useAppSelector(state => state.mode.mode);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [renderModal, setRenderModal] = useState(false);
  const [readingLevel, setReadingLevel] = useState(false);
  const routes: any = useRoute();
  const routesData = routes?.params;
  const books = useSelector((state: RootState) => state.bookShelf.books);
  const renderData = books.filter(
    (item: Book) => item?.bookId === routesData.id,
  )[0];
  const [storyText, setStoryText] = useState('');

  const totalpages = renderData?.pages?.length;

  const [state, setState] = useState<StateObject>({
    ratingModal: true,
    toggleMic: false,
    showQuestion: false,
    wellDoneModal: false,
    tooltipOne: true,
    tooltipTwo: false,
    tooltipThree: false,
    tooltipFour: false,
  });

  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const refOne = useRef<any>(null);
  const refTwo = useRef<any>(null);
  const refThree = useRef<any>(null);

  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
    1: {height: 0, width: 0, x: 0, y: 0},
    2: {height: 0, width: 0, x: 0, y: 0},
  });
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;
  const {
    ratingModal,
    showQuestion,
    wellDoneModal,
    tooltipOne,
    tooltipTwo,
    tooltipThree,
    tooltipFour,
  } = state;

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
        {currentIndex === totalpages && (
          <View>
            <View
              style={[
                styles.summary,
                {height: !portrait ? verticalScale(270) : verticalScale(400)},
              ]}>
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
    if (viewableItems.length > 0) {
      setCurrentIndex(
        renderData?.pages?.[viewableItems[0].index][
          STORIES_RESPONSE.PAGE_NUMBER
        ],
      );

      setStoryText(
        renderData?.pages?.[viewableItems[0].index][
          STORIES_RESPONSE.STORY_TEXT
        ],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    switch (currentIndex) {
      case 1:
        updateState({showQuestion: true});
        break;
      case 3:
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
  // const renderTipLevel = () => {
  //   setReadingTip(!readingTip);
  // };

  const renderRatingModal = () => {
    updateState({ratingModal: !ratingModal});
  };

  const renderWellDoneModal = () => {
    updateState({wellDoneModal: !wellDoneModal});
  };

  const headerButton = () => {
    // switch (mode) {
    //   case MODE.A:
    //     return (
    //       <RNButton
    //         onlyIcon
    //         icon={<Meter />}
    //         onClick={() => renderReadingLevel()}
    //       />
    //     );

    //   case MODE.B:
    //     return <RNButton onlyIcon icon={<Speaker />} onClick={() => {}} />;

    //   case MODE.C:
    //     return (
    //       <RNButton
    //         onlyIcon
    //         icon={toggleMic ? <MuteMic /> : <Mic />}
    //         onClick={() => updateState({toggleMic: !toggleMic})}
    //       />
    //     );
    // }

    return (
      <RNTooltip
        isTablet={isTablet}
        topViewStyle={{
          alignItems: 'center',
        }}
        open={tooltipArray?.includes(8) ? false : tooltipOne}
        setClose={() => {
          updateState({tooltipOne: false, tooltipTwo: true});
          tooltipArray.push(8);
          storeKey(TOOLTIP, tooltipArray);
        }}
        text={translation('READ_ALOUD')}
        textContainerStyle={styles.tooltipTwo}
        textStyle={[
          {
            textAlign: 'center',
            fontSize: verticalScale(16),
            marginTop: 10,
          },
        ]}
        dimensionObject={positionRefs[0]}>
        <View
          ref={refOne}
          onLayout={() => {
            refOne?.current?.measure(
              (
                x: number,
                y: number,
                width: number,
                height: number,
                pageX: number,
                pageY: number,
              ) => {
                setPositionRefs(prev => ({
                  ...prev,
                  0: {height: width, width: height, x: pageX, y: pageY},
                }));
              },
            );
          }}>
          <RNButton onlyIcon icon={<Speaker />} onClick={() => {}} />
        </View>
      </RNTooltip>
    );
  };

  const renderQuestions = () => {
    switch (currentIndex) {
      case 2:
        return (
          <View style={styles.questionView}>
            <RNLogoHeader
              heading={translation('READ_A_STORY')}
              textHeading
              titleStyle={styles.headerTitle}
              customStyle={styles.headerStyle}
              rightIcon={
                <RNButton onlyIcon icon={<QuestionMark />} onClick={() => {}} />
              }
            />
            <RNVoiceQuesiton
              onClick={renderWellDoneModal}
              // onClick={() => {
              //   updateState({showQuestion: false});
              // }}
              customStyle={{paddingHorizontal: scale(20)}}
              tooltipOneVisible={tooltipFour}
              onTooltipOneClose={() => {
                updateState({tooltipFour: false});
              }}
            />
          </View>
        );
      case 3:
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
            <RNMultipleChoice
              onNextPress={() => {
                updateState({showQuestion: false});
                tooltipArray.push(12);
                storeKey(TOOLTIP, tooltipArray);
              }}
              customStyle={[
                styles.multiplechoice,
                // !portrait && {
                //   height: verticalScale(200),
                // },
              ]}
            />
          </View>
        );
    }
  };

  return (
    <RNScreenWrapper
      giveStatusColor={tooltipArray?.includes(13) ? false : true}>
      <View style={styles.headingButton}>
        <RNTooltip
          isTablet={isTablet}
          topViewStyle={{
            alignItems: 'center',
          }}
          open={tooltipArray?.includes(9) ? false : tooltipTwo}
          setClose={() => {
            updateState({tooltipTwo: false, tooltipThree: true});
            tooltipArray.push(9);
            storeKey(TOOLTIP, tooltipArray);
          }}
          text={translation('EXIT')}
          textContainerStyle={[
            styles.tooltipTwo,
            {marginRight: 0, marginLeft: 24},
          ]}
          textStyle={[
            {
              textAlign: 'center',
              fontSize: verticalScale(16),
              marginTop: 10,
            },
          ]}
          dimensionObject={positionRefs[1]}>
          <RNButton
            ref={refTwo}
            onLayout={() => {
              refTwo?.current?.measure(
                (
                  x: number,
                  y: number,
                  width: number,
                  height: number,
                  pageX: number,
                  pageY: number,
                ) => {
                  setPositionRefs(prev => ({
                    ...prev,
                    1: {height: width, width: height, x: pageX, y: pageY},
                  }));
                },
              );
            }}
            onlyIcon
            icon={<Close />}
            onClick={() => {
              navigateTo(SCREEN_NAME.BOOKSHELF);
            }}
          />
        </RNTooltip>
        {currentIndex === totalpages && (
          <RNTextComponent isSemiBold style={styles.summaryTitle}>
            {translation('SUMMARY')}
          </RNTextComponent>
        )}
        {headerButton()}
      </View>
      <FlatList
        data={Array.from({length: totalpages}, (_, i) => {
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
      {currentIndex !== totalpages && (
        <RNTooltip
          isTablet={isTablet}
          topViewStyle={{alignItems: 'center'}}
          bottom="South"
          open={tooltipArray?.includes(10) ? false : tooltipThree}
          setClose={() => {
            updateState({tooltipFour: true, tooltipThree: false});
            tooltipArray.push(10);
            storeKey(TOOLTIP, tooltipArray);
          }}
          text={translation('READ_A_STORY')}
          textContainerStyle={[styles.tooltipTwo, {margin: 0, marginLeft: 20}]}
          mainStyle={{
            marginTop: verticalScale(-140),
            height: verticalScale(200),
          }}
          textStyle={[
            {
              textAlign: 'center',
              fontSize: verticalScale(16),
              marginTop: 10,
            },
          ]}
          dimensionObject={positionRefs[2]}>
          <View
            style={{width: '100%', backgroundColor: 'black'}}
            ref={refThree}
            onLayout={() => {
              refThree?.current?.measure(
                (
                  x: number,
                  y: number,
                  width: number,
                  height: number,
                  pageX: number,
                  pageY: number,
                ) => {
                  setPositionRefs(prev => ({
                    ...prev,
                    2: {height: width, width: height, x: pageX, y: pageY},
                  }));
                },
              );
            }}>
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
                {currentIndex}/{totalpages - 1}
              </RNTextComponent>
              <RNTextComponent
                style={[
                  styles.slideNo,
                  {color: themeColor.black, textAlign: 'center', zIndex: 3},
                ]}
                isSemiBold>
                {storyText}
              </RNTextComponent>
            </ImageBackground>
          </View>
        </RNTooltip>
      )}
      {showQuestion && renderQuestions()}
      <RNCongratsModal visible={renderModal} renderModal={toggleModal} />
      <RNReadingLevelModal
        visible={readingLevel}
        renderModal={renderReadingLevel}
        nextClick={renderReadingLevel}
      />
      {/* {currentIndex === 3 && (
        <RNReadingTipsModal
          visible={readingTip}
          renderModal={renderTipLevel}
          nextClick={renderTipLevel}
        />
      )} */}
      {currentIndex === totalpages && mode === MODE.B && (
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
