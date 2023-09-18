/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import React, {useState, useRef} from 'react';
import {styles} from './style';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import RNButton from '@tandem/components/RNButton';
import Close from '@tandem/assets/svg/Cross';
import Speaker from '@tandem/assets/svg/VolumeDown';
import RNTextComponent from '@tandem/components/RNTextComponent';
import {StateObject} from './interface';
import RNCongratsModal from '@tandem/components/RNCongratsModal';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import RNReadingLevelModal from '@tandem/components/RNReadingLevelModal';
import RNRatingModal from '@tandem/components/RNRatingModal';
import {scale, verticalScale} from 'react-native-size-matters';
import navigateTo from '@tandem/navigation/navigate';
import {RootState} from '@tandem/redux/store';
import {translation} from '@tandem/utils/methods';
import RNLogoHeader from '@tandem/components/RNLogoHeader';
import RNVoiceQuesiton from '@tandem/components/RNVoiceQuesiton';
import QuestionMark from '@tandem/assets/svg/QuestionMark';
import RNWellDoneModal from '@tandem/components/RNWellDoneModal';
import RNMultipleChoice from '@tandem/components/RNMultipleChoice';
import {TOOLTIP} from '@tandem/constants/local';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import RNTooltip from '@tandem/components/RNTooltip';
import {useRoute} from '@react-navigation/native';
import Book from '@tandem/api/getStories/interface';
import {PageFlip} from '@tandem/components/PageFlip';
import rateStory from '@tandem/api/rateStory';

const StoryTelling = () => {
  const tooltipArray = getValueFromKey(TOOLTIP);
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [renderModal, setRenderModal] = useState(false);
  const [readingLevel, setReadingLevel] = useState(false);
  const routes: any = useRoute();
  const routesData = routes?.params;
  const books = useAppSelector((state: RootState) => state.bookShelf.books);
  const book = books.filter((item: Book) => item?.bookId === routesData.id)[0];
  const totalPages = book?.pages?.length - 1;
  const [currentIndex, setActiveIndex] = React.useState(totalPages);
  const [state, setState] = useState<StateObject>({
    ratingModal: true,
    toggleMic: false,
    showQuestion: false,
    wellDoneModal: false,
    tooltipOne: !tooltipArray?.includes(8),
    tooltipTwo: false,
    tooltipThree: false,
    tooltipFour: false,
  });

  const refOne = useRef<any>(null);
  const refTwo = useRef<any>(null);

  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
    1: {height: 0, width: 0, x: 0, y: 0},
    2: {height: 0, width: 0, x: 0, y: 0},
  });

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
  React.useEffect(() => {
    // switch (currentIndex) {
    //   case 1:
    //     updateState({showQuestion: true});
    //     break;
    //   case 3:
    //     updateState({showQuestion: true});
    //     break;
    // }
    if (currentIndex === 1 && book.rating === 0) {
      updateState({ratingModal: true});
    }
    if (currentIndex === 0) {
      setTimeout(() => {
        setRenderModal(true);
      }, 2000);
    }
  }, [book.rating, currentIndex]);

  const toggleModal = () => {
    setRenderModal(!renderModal);
  };
  const renderReadingLevel = () => {
    setReadingLevel(!readingLevel);
  };
  // const renderTipLevel = () => {
  //   setReadingTip(!readingTip);
  // };

  const submitRatingModal = async (rating: number) => {
    updateState({ratingModal: !ratingModal});
    if (rating === 0) {
      return;
    }
    try {
      await rateStory(book.bookId, rating);
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
    <RNScreenWrapper giveStatusColor={tooltipOne || tooltipTwo}>
      <View
        style={[
          styles.headingButton,
          {opacity: tooltipArray?.includes(10) ? 1 : tooltipThree ? 0.1 : 1},
        ]}>
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
              }}
            />
          </View>
        </RNTooltip>
        {currentIndex === totalPages && (
          <RNTextComponent isSemiBold style={styles.summaryTitle}>
            {translation('SUMMARY')}
          </RNTextComponent>
        )}
        {headerButton()}
      </View>
      <PageFlip
        readWithoutImages={routesData?.readWithoutImages}
        book={book}
        activeIndex={currentIndex}
        setActiveIndex={setActiveIndex}
        tooltipState={state}
        setTooltipState={setState}
      />

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
      {currentIndex === 1 && book.rating === 0 && (
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
    </RNScreenWrapper>
  );
};

export default StoryTelling;
