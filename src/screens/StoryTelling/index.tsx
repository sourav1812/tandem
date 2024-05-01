import {LayoutAnimation, Pressable, View} from 'react-native';
import React, {useState, useRef} from 'react';
import {styles} from './style';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNButton from '@tandem/components/RNButton';
import Close from '@tandem/assets/svg/Cross';
import {StateObject} from './interface';
import RNCongratsModal from '@tandem/components/RNCongratsModal';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNReadingLevelModal from '@tandem/components/RNReadingLevelModal';
import RNRatingModal from '@tandem/components/RNRatingModal';
import {scale, verticalScale} from 'react-native-size-matters';
import navigateTo from '@tandem/navigation/navigate';
import {translation} from '@tandem/utils/methods';
import RNVoiceQuesiton from '@tandem/components/RNVoiceQuesiton';
import RNWellDoneModal from '@tandem/components/RNWellDoneModal';
import RNTooltip from '@tandem/components/RNTooltip';
import {useRoute} from '@react-navigation/native';
import rateStory from '@tandem/api/rateStory';
import {useDispatch} from 'react-redux';
import NewPageSwipe from './NewPageSwipe';
import Book from '@tandem/api/getStories/interface';
import RNTextComponent from '@tandem/components/RNTextComponent';
import Options from '@tandem/assets/svg/ThreeDots';
import Add from '@tandem/assets/svg/Add';
import Subtract from '@tandem/assets/svg/Subtract';
import {
  changeStoryLevel,
  changeTextSize,
} from '@tandem/redux/slices/storyLevel.slice';
import {FONT_SIZES} from '@tandem/constants/local';
import {store} from '@tandem/redux/store';
import {MODE} from '@tandem/constants/mode';
import {Stats, updateChildStats} from '@tandem/redux/slices/createChild.slice';
import themeColor from '@tandem/theme/themeColor';
import reportImage from '@tandem/api/reportImage';

const StoryTelling = ({navigation}: {navigation: any}) => {
  const tooltipArray = useAppSelector(state => state.tooltipReducer);
  const dispatch = useDispatch();
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [renderModal, setRenderModal] = useState(false);
  const [readingLevel, setReadingLevel] = useState(false);
  const routes: any = useRoute();
  const routesData = routes?.params;
  const book: Book = routesData.book;
  const publicRoute: boolean = routesData.publicRoute;
  const level = useAppSelector(rootState => rootState.storyLevel.level);
  const sizeIndex = useAppSelector(rootState => rootState.storyLevel.size);
  const mode = useAppSelector(state => state.mode.mode);
  const cuurentParent = useAppSelector(state => state.createChild.currentAdult);
  const activePageNumber = useAppSelector(
    state => state.bookShelf.activePageNumber,
  );

  React.useEffect(() => {
    // logic to calculate time spent reading story
    const timeSpent = () => {
      if (mode === MODE.A || publicRoute) {
        return;
      }
      const modeState = mode === MODE.C ? 'solo' : 'tandem';
      const stats: Stats = JSON.parse(
        JSON.stringify(store.getState().createChild.stats?.[book.childId]),
      );
      // we will call this in an interval and add 5 sec to it
      if (modeState === 'tandem') {
        // for tandem we will store a complex object
        let parentReadingArray = stats.reading.totalTime[modeState];
        const targetIndex = parentReadingArray.findIndex(
          obj => obj.parentId === cuurentParent.profileId,
        );
        if (targetIndex === -1) {
          parentReadingArray.push({
            parentId: cuurentParent.profileId,
            time: 5,
          });
        } else {
          parentReadingArray[targetIndex] = {
            ...parentReadingArray[targetIndex],
            time: parentReadingArray[targetIndex].time + 5,
          };
        }
        stats.reading.totalTime[modeState] = parentReadingArray;
      } else {
        const timeAlreadyPast = stats.reading?.totalTime?.[modeState];
        stats.reading.totalTime[modeState] = timeAlreadyPast + 5;
      }
      dispatch(updateChildStats({childId: book.childId, stats: {...stats}}));
    };
    const unsubscribe = setInterval(() => {
      timeSpent();
    }, 5000);
    return () => {
      clearInterval(unsubscribe);
    };
  }, [book.childId, cuurentParent.profileId, dispatch, mode, publicRoute]);

  const [state, setState] = useState<StateObject>({
    ratingModal: false,
    toggleMic: false,
    showQuestion: false,
    wellDoneModal: false,
    isStoryRated: !!book.ratingInfo?.[0]?._id,
  });

  const refOne = useRef<any>(null);
  const refTwo = useRef<any>(null);
  const [canGoBack, setGoBack] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
    1: {height: 0, width: 0, x: 0, y: 0},
    2: {height: 0, width: 0, x: 0, y: 0},
  });
  const [selectedReason, setReason] = React.useState('');
  const [openReportModal, setReportModal] = React.useState(false);

  const REASONS = [
    'Inappropriate for children (graphic/violence, etc)',
    "Picture isn't good enough!",
  ];
  const {ratingModal, showQuestion, wellDoneModal} = state;

  const updateState = (data: any) => {
    setState((previouState: any) => {
      return {...previouState, ...data};
    });
  };

  React.useEffect(() => {
    navigation.addListener(
      'beforeRemove',
      (e: {preventDefault: () => void}) => {
        if (canGoBack) {
          return;
        }
        e.preventDefault();
      },
    );
  }, [canGoBack, navigation]);

  const toggleModal = () => {
    setRenderModal(!renderModal);
  };
  const renderReadingLevel = () => {
    setReadingLevel(!readingLevel);
  };

  const submitRatingModal = async (rating: number) => {
    updateState({ratingModal: !ratingModal});
    if (rating === 0) {
      return;
    }
    try {
      await rateStory(book.storyInfo[0].bookId, rating);
      updateState({isStoryRated: true});
    } catch (error) {
      console.log('error in rating story post', error);
    }
  };
  const renderRatingModal = async () => {
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
          alignItems: 'flex-end',
        }}
        open={13}
        text={translation('STORY_LEVEL')}
        // text={translation('READ_ALOUD')}
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
          <RNButton
            onlyIcon
            icon={<Options />}
            onClick={() => {
              setMenu(p => !p);
            }}
          />
        </View>
      </RNTooltip>
    );
  };
  const menuRenderItem = React.useCallback(() => {
    return (
      <Pressable
        onPress={() => {
          setMenu(false);
        }}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundColor: '#000000c0',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            right: '6%',
            position: 'absolute',
            top: '15%',
            padding: 20,
            justifyContent: 'center',
            width: '60%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RNTextComponent style={{marginRight: 'auto'}}>
              Text Size
            </RNTextComponent>
            <Pressable
              style={{paddingHorizontal: 5}}
              onPress={() => {
                dispatch(
                  changeTextSize(
                    sizeIndex < FONT_SIZES.length - 1
                      ? sizeIndex + 1
                      : sizeIndex,
                  ),
                );
              }}>
              <Add size={30} />
            </Pressable>
            <Pressable
              style={{padding: 7, paddingVertical: 10}}
              onPress={() => {
                dispatch(
                  changeTextSize(sizeIndex > 0 ? sizeIndex - 1 : sizeIndex),
                );
              }}>
              <Subtract size={20} />
            </Pressable>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RNTextComponent style={{marginRight: 'auto'}}>
              Reading Level
            </RNTextComponent>
            <Pressable
              style={{paddingHorizontal: 5}}
              onPress={() => {
                dispatch(
                  changeStoryLevel(
                    level < book.storyInfo.length - 1 ? level + 1 : level,
                  ),
                );
              }}>
              <Add size={30} />
            </Pressable>
            <Pressable
              style={{padding: 7, paddingVertical: 10}}
              onPress={() => {
                dispatch(changeStoryLevel(level > 0 ? level - 1 : level));
              }}>
              <Subtract size={20} />
            </Pressable>
          </View>

          <RNButton
            customStyle={{
              marginTop: 10,
              height: verticalScale(40),
              marginHorizontal: -7,
            }}
            textStyle={{fontSize: verticalScale(12)}}
            title="Report/Flag image"
            onClick={() => {
              setReason('');
              setTimeout(() => {
                // Some way to report image
                setReportModal(true);
                setMenu(false);
              }, 200);
            }}
          />

          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RNTextComponent style={{marginRight: 'auto'}}>
              Smart Listen
            </RNTextComponent>
          </View> */}
        </View>
      </Pressable>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, level, sizeIndex]);

  React.useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [menu, openReportModal, selectedReason]);

  const reportImageRenderModal = React.useCallback(() => {
    return (
      <Pressable
        onPress={() => {
          setMenu(false);
        }}
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundColor: '#000000c0',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            alignSelf: 'center',
            position: 'absolute',
            padding: 25,
            justifyContent: 'center',
            width: '90%',
          }}>
          <RNTextComponent
            isSemiBold
            style={{
              marginBottom: verticalScale(20),
              fontSize: verticalScale(13),
              textAlign: 'center',
            }}>
            We're sorry about that! Please can you tell us what the problem is?
          </RNTextComponent>

          {REASONS.map(reason => (
            <Pressable
              onPress={() => {
                setReason(prev => (prev === reason ? '' : reason));
              }}
              key={reason}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <RNTextComponent style={{marginRight: 'auto'}}>
                {reason}
              </RNTextComponent>
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 100,
                  width: verticalScale(20),
                  height: verticalScale(20),
                  borderColor: themeColor.themeBlue,
                  backgroundColor:
                    selectedReason === reason
                      ? themeColor.themeBlue
                      : 'transparent',
                }}
              />
            </Pressable>
          ))}

          {selectedReason && (
            <RNButton
              customStyle={{marginVertical: verticalScale(10)}}
              title="Submit"
              onClick={async () => {
                // POST req
                try {
                  setReportModal(false);
                  await reportImage({
                    bookId: book._id,
                    reason: selectedReason,
                    page: activePageNumber + 1,
                  });
                } catch (error) {
                  console.log('error in reporting image', error);
                }
              }}
            />
          )}
          <RNButton
            onlyBorder
            title="Cancel"
            onClick={() => {
              setTimeout(() => {
                setReportModal(false);
              }, 200);
            }}
          />
        </View>
      </Pressable>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePageNumber, selectedReason]);

  const renderQuestions = () => {
    return (
      <View style={styles.questionView}>
        {/* <RNLogoHeader
          heading={translation('READ_A_STORY')}
          textHeading
          titleStyle={styles.headerTitle}
          customStyle={styles.headerStyle}
          rightIcon={
            <RNButton onlyIcon icon={<QuestionMark />} onClick={() => {}} />
          }
        /> */}
        <RNVoiceQuesiton
          questions={book.storyInfo[level].comprehension_questions}
          onClick={renderWellDoneModal}
          customStyle={{paddingHorizontal: scale(20)}}
        />
      </View>

      // switch (currentIndex) {
      //   case 2:
      //     return (
      //       <View style={styles.questionView}>
      //         <RNLogoHeader
      //           heading={translation('READ_A_STORY')}
      //           textHeading
      //           titleStyle={styles.headerTitle}
      //           customStyle={styles.headerStyle}
      //           rightIcon={
      //             <RNButton onlyIcon icon={<QuestionMark />} onClick={() => {}} />
      //           }
      //         />
      //         <RNVoiceQuesiton
      //           onClick={renderWellDoneModal}
      //           customStyle={{paddingHorizontal: scale(20)}}
      //         />
      //       </View>
      //     );
      //   case 3:
      //     return (
      //       <View style={styles.questionView}>
      //         <RNLogoHeader
      //           heading={translation('QUESTIONS_ABOUT_THE_STORY')}
      //           textHeading
      //           titleStyle={styles.headerTitle}
      //           customStyle={styles.headerStyle}
      //           rightIcon={
      //             <RNButton onlyIcon icon={<QuestionMark />} onClick={() => {}} />
      //           }
      //         />
      //         <RNMultipleChoice
      //           onNextPress={() => {
      //             updateState({showQuestion: false});
      //             dispatch(changeTooltipState(16));
      //           }}
      //           customStyle={[styles.multiplechoice]}
      //         />
      //       </View>
      //     );
      // }
    );
  };
  return (
    <RNScreenWrapper>
      <View
        style={[styles.headingButton, {opacity: tooltipArray?.[15] ? 1 : 0.7}]}>
        <RNTooltip
          isTablet={isTablet}
          topViewStyle={{
            alignItems: 'center',
          }}
          open={14}
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
          <View
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
            }}>
            <RNButton
              onlyIcon
              icon={<Close />}
              onClick={() => {
                navigateTo(SCREEN_NAME.BOOKSHELF);
                setGoBack(true);
              }}
            />
          </View>
        </RNTooltip>
        {/* {currentIndex === totalPages && (
          <RNTextComponent isSemiBold style={styles.summaryTitle}>
            {translation('SUMMARY')}
          </RNTextComponent>
        )} */}
        {headerButton()}
      </View>
      <NewPageSwipe
        updateState={updateState}
        state={state}
        textArray={routesData?.textArray}
        book={book}
        publicRoute={publicRoute}
      />
      {/* <PageFlip
        readingLevel={readingLevel}
        textArray={routesData?.textArray}
        activeIndex={currentIndex}
        setActiveIndex={setActiveIndex}
        tooltipState={state}
        setTooltipState={setState}
        book={book}
      /> */}
      {showQuestion && renderQuestions()}
      <RNCongratsModal
        bookId={book._id}
        visible={renderModal}
        renderModal={toggleModal}
      />
      <RNReadingLevelModal
        bookLength={book.storyInfo.length}
        visible={readingLevel}
        renderModal={renderReadingLevel}
        nextClick={renderReadingLevel}
        setVissible={setReadingLevel}
      />
      {/* {currentIndex === 3 && (
        <RNReadingTipsModal
          visible={readingTip}
          renderModal={renderTipLevel}
          nextClick={renderTipLevel}
        />
      )} */}
      {book?.ratingInfo.length === 0 && (
        <RNRatingModal
          visible={ratingModal}
          renderModal={renderRatingModal}
          nextClick={submitRatingModal}
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
      {menu && menuRenderItem()}
      {openReportModal && reportImageRenderModal()}
    </RNScreenWrapper>
  );
};

export default StoryTelling;
