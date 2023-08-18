/* eslint-disable react-native/no-inline-styles */
import {
  View,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import RNButton from '@tandem/components/RNButton';
import {
  place,
  audience,
  typeOfStory,
  attribute,
  illustration,
} from './interface';
import {StateObject} from './interface';
import Camera from '@tandem/assets/svg/Camera';
import LeftArrow from '@tandem/assets/svg/LeftArrow';
import QuestionMark from '@tandem/assets/svg/QuestionMark';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import RNChooseColor from '@tandem/components/RNChooseColor';
import navigateTo from '@tandem/navigation/navigate';
import {scale, verticalScale} from 'react-native-size-matters';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';
import RNChoiceQuestions from '@tandem/components/RNChoiceQuestions';
import {setQuestionIndex} from '@tandem/redux/slices/questions.slice';
import {translation} from '@tandem/utils/methods';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {TOOLTIP} from '@tandem/constants/LocalConstants';
import RNTooltip from '@tandem/components/RNTooltip';
import {RootState, store} from '@tandem/redux/store';
import {avatarArray} from '../CreateChildProfile/interface';
import {STORY_PARTS} from '@tandem/constants/enums';
import {
  clipStoryGenerationResponse,
  pushStoryGenerationResponse,
} from '@tandem/redux/slices/storyGeneration.slice';

const GenerateStory = () => {
  const dispatch = useAppDispatch();

  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const currentChild = useAppSelector(state => state.createChild.currentChild);

  const portrait = useAppSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const questionIndex = useAppSelector(state => state.questions.index);
  const [disabled, setDisabled] = React.useState(true);
  const tooltipArray = getValueFromKey(TOOLTIP);
  const refOne = useRef<any>(null);
  const refTwo = useRef<any>(null);

  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
    1: {height: 0, width: 0, x: 0, y: 0},
  });
  const [state, setState] = useState<StateObject>({
    addedIllustration: null,
    tooltipFirst: false,
    tooltipSecond: false,
    tooltipThird: false,
    tooltipFourth: false,
    tooltipFifth: false,
  });

  const {
    addedIllustration,
    tooltipFirst,
    tooltipSecond,
    tooltipThird,
    tooltipFourth,
    tooltipFifth,
  } = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const onCloseFirstTooltip = () => {
    updateState({tooltipFirst: false, tooltipSecond: true});
    tooltipArray.push(5);
    storeKey(TOOLTIP, tooltipArray);
  };

  const onCloseThirdTooltip = () => {
    updateState({tooltipThird: false});
    tooltipArray.push(7);
    storeKey(TOOLTIP, tooltipArray);
  };

  React.useEffect(() => {
    setDisabled(true);
    if (!tooltipArray?.includes(5)) {
      updateState({tooltipFirst: true});
    }
    if (questionIndex === 6) {
      updateState({tooltipThird: true});
    }
    if (questionIndex === 1) {
      updateState({tooltipFifth: true});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionIndex]);

  const dynamicContent = () => {
    switch (questionIndex) {
      case 0:
        return (
          <>
            <RNTextComponent
              isSemiBold
              style={[
                styles.question,
                !portrait && {height: verticalScale(40)},
              ]}>
              {translation('WHO')}{' '}
              <RNTextComponent
                isSemiBold
                style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
                {translation('generate-story.is-in-story')}{' '}
              </RNTextComponent>
            </RNTextComponent>
            <RNChoiceQuestions
              setDisabled={setDisabled}
              type={STORY_PARTS.WHO}
              index={0}
              maxSelections={3}
              isTablet={isTablet}
              data={audience}
              visibletoolTip={tooltipFirst}
              onTooltipClose={onCloseFirstTooltip}
            />
          </>
        );
      case 1:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.question}>
              {translation('generate-story.included-in-story')}{' '}
              {currentChild.name}?
            </RNTextComponent>
            <View
              style={[
                styles.picView,
                !portrait && {
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'flex-start',
                  marginTop: verticalScale(40),
                },
              ]}>
              <ImageBackground
                source={
                  currentChild.imageUrl
                    ? {
                        uri: currentChild.imageUrl,
                      }
                    : avatarArray[currentChild.avtarIndex].icon
                }
                style={styles.addImage}
                imageStyle={{borderRadius: 200}}>
                <RNButton
                  onlyIcon
                  icon={<Camera height={18} width={20} />}
                  onClick={() => {}}
                  IconButtoncustomStyle={styles.camera}
                />
              </ImageBackground>
              <RNTooltip
                placement={!portrait ? 'left' : undefined}
                isTablet={isTablet}
                topViewStyle={{
                  height: !portrait ? scale(150) : undefined,
                  alignItems: 'center',
                  marginRight: !portrait ? scale(50) : undefined,
                }}
                textStyle={{fontSize: !portrait ? scale(14) : scale(18)}}
                bottom={portrait ? 'South' : undefined}
                top={portrait ? undefined : 'SouthEast'}
                text={translation('YES_NO_SELECT')}
                open={tooltipArray?.includes(15) ? false : tooltipFifth}
                setClose={() => {
                  setState({
                    ...state,
                    tooltipFifth: false,
                  });
                  tooltipArray.push(15);
                  storeKey(TOOLTIP, tooltipArray);
                }}
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
                  }}
                  style={[
                    styles.buttonContainer,
                    tooltipFifth && {
                      backgroundColor: 'white',
                      borderRadius: scale(20),
                      height: portrait ? '53%' : '70%',
                      width: '120%',
                      marginBottom: portrait
                        ? verticalScale(130)
                        : verticalScale(100),
                    },
                  ]}>
                  <RNTextComponent style={styles.yesOrNo} isMedium>
                    {translation('YES')} or {translation('NO')}?
                  </RNTextComponent>
                  <View
                    style={[
                      styles.buttonView,
                      isTablet && {width: scale(180)},
                    ]}>
                    <RNButton
                      title="✔"
                      customStyle={styles.buttonStyle}
                      onlyBorder
                      onClick={() => {
                        store.dispatch(
                          pushStoryGenerationResponse({
                            type: STORY_PARTS.INCLUSION,
                            response: true,
                          }),
                        );
                        nextQuestion();
                      }}
                      textStyle={styles.YesbuttonText}
                    />
                    <RNButton
                      title="✕"
                      customStyle={styles.buttonStyle}
                      onClick={() => {
                        store.dispatch(
                          pushStoryGenerationResponse({
                            type: STORY_PARTS.INCLUSION,
                            response: false,
                          }),
                        );
                        nextQuestion();
                      }}
                      textStyle={styles.YesbuttonText}
                    />
                  </View>
                </View>
              </RNTooltip>
            </View>
          </>
        );
      case 2:
        return (
          <>
            <RNTextComponent
              isSemiBold
              style={[
                styles.question,
                {
                  color: 'rgba(10, 8, 4, 0.6)',
                  height: verticalScale(70),
                },
              ]}>
              {translation('generate-story.where-shall-we')}
              {'\n '}
              <RNTextComponent isSemiBold style={styles.question}>
                {translation('generate-story.go-in-our-story')}
              </RNTextComponent>
            </RNTextComponent>
            <RNChoiceQuestions
              setDisabled={setDisabled}
              type={STORY_PARTS.WHERE}
              index={2}
              maxSelections={2}
              data={place}
            />
          </>
        );
      case 3:
        return (
          <>
            <RNTextComponent
              isSemiBold
              style={[styles.question, {height: verticalScale(70)}]}>
              {translation('generate-story.include-things')}{' '}
            </RNTextComponent>
            <RNChoiceQuestions
              setDisabled={setDisabled}
              type={STORY_PARTS.WHAT_THINGS}
              index={3}
              maxSelections={2}
              data={attribute}
            />
          </>
        );
      case 4:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.question}>
              {translation('generate-story.what-sort-of')}{' '}
              <RNTextComponent
                isSemiBold
                style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
                {translation('generate-story.do-you-want-today')}
              </RNTextComponent>{' '}
            </RNTextComponent>
            <RNChoiceQuestions
              setDisabled={setDisabled}
              type={STORY_PARTS.WHAT_HAPPENS}
              index={4}
              maxSelections={3}
              data={typeOfStory}
            />
          </>
        );
      case 5:
        return (
          <>
            <RNTextComponent
              isSemiBold
              style={[styles.question, {height: verticalScale(70)}]}>
              {translation('generate-story.what-style-illustration')}{' '}
              <RNTextComponent
                style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}
                isSemiBold>
                {translation('generate-story.shall-we-use')}
              </RNTextComponent>{' '}
            </RNTextComponent>
            <ScrollView
              contentContainerStyle={[styles.scrollView]}
              scrollEnabled
              showsVerticalScrollIndicator={false}>
              {illustration.map((value, index) => {
                return (
                  <Pressable
                    key={index.toString()}
                    onPress={() => {
                      updateState({addedIllustration: index});
                      setDisabled(false);
                    }}>
                    <Image
                      source={value.url}
                      style={[
                        styles.illustration,
                        index === addedIllustration && {
                          borderWidth: 3,
                          borderColor: themeColor.themeBlue,
                        },
                      ]}
                    />
                  </Pressable>
                );
              })}
            </ScrollView>
          </>
        );
      case 6:
        return (
          <RNChooseColor
            setDisabled={setDisabled}
            isTablet={isTablet}
            tooltipVisible={tooltipThird}
            onTooltipClose={onCloseThirdTooltip}
            customStyle={{paddingHorizontal: scale(16)}}
          />
        );
    }
  };

  const nextQuestion = () => {
    if (questionIndex < 7) {
      if (questionIndex === 5 && addedIllustration) {
        store.dispatch(clipStoryGenerationResponse(5));
        store.dispatch(
          pushStoryGenerationResponse({
            type: STORY_PARTS.STYLES,
            response: addedIllustration,
          }),
        );
      }

      dispatch(setQuestionIndex(questionIndex + 1));
      if (questionIndex !== 0 && questionIndex !== 5) {
        navigateTo(SCREEN_NAME.ROADMAP);
      }
    }
  };

  const previousQuestion = () => {
    if (questionIndex > 0) {
      dispatch(setQuestionIndex(questionIndex - 1));
    }
    navigateTo();
  };

  return (
    <RNScreenWrapper
      giveStatusColor={
        (tooltipFirst && !tooltipArray?.includes(5)) ||
        (tooltipSecond && !tooltipArray?.includes(6)) ||
        (tooltipThird && !tooltipArray?.includes(7)) ||
        (tooltipFourth && !tooltipArray?.includes(8))
      }>
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: scale(20),
          }}>
          <View style={styles.header}>
            <RNButton
              onlyIcon
              onClick={previousQuestion}
              icon={<LeftArrow />}
            />
            <RNTextComponent style={styles.heading} isSemiBold>
              {translation('GENERATE_STORY')}{' '}
              <RNTextComponent isSemiBold style={styles.questionNumber}>
                {questionIndex === 0 ? 1 : questionIndex}/6
              </RNTextComponent>
            </RNTextComponent>
            <RNButton
              onlyIcon
              onClick={previousQuestion}
              icon={<QuestionMark />}
            />
          </View>
          <View style={styles.progressBar}>
            {Array.from({length: 6}, (_, index) => {
              return {index: index};
            }).map(index => {
              const indicatorIndex = questionIndex === 0 ? 1 : questionIndex;
              return (
                <View
                  key={index.index}
                  style={[
                    styles.indicator,
                    {
                      backgroundColor:
                        index.index < indicatorIndex
                          ? themeColor.themeBlue
                          : 'rgba(66, 133, 246, 0.5)',
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
        {dynamicContent()}
      </View>
      <RNTooltip
        isTablet={isTablet}
        topViewStyle={{
          alignItems: 'center',
        }}
        open={tooltipArray?.includes(6) ? false : tooltipSecond}
        setClose={() => {
          tooltipArray.push(6);
          updateState({tooltipSecond: false});
        }}
        bottom={'South'}
        text={translation('PRESS_THE_BUTTON')}
        textStyle={styles.tooltip}
        dimensionObject={positionRefs[0]}>
        <View
          style={{width: '100%', backgroundColor: 'pink'}}
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
          {questionIndex !== 1 && (
            <RNButton
              isDisabled={disabled}
              customStyle={[
                styles.footerButton,
                {height: verticalScale(70), maxHeight: verticalScale(70)},
              ]}
              title={translation('SELECT')}
              onClick={nextQuestion}
              textStyle={styles.buttonText}
            />
          )}
        </View>
      </RNTooltip>
    </RNScreenWrapper>
  );
};

export default GenerateStory;
