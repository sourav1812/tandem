/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import {
  View,
  ScrollView,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import RNEmojiWithText from '@tandem/components/RNEmojiWithText';
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
import i18n from '@tandem/constants/lang/i18n';
import navigateTo from '@tandem/navigation/navigate';
import RNRoadmap from '@tandem/components/RNRoadmap';
import {scale, verticalScale} from 'react-native-size-matters';
import {useAppSelector} from '@tandem/hooks/navigationHooks';

const GenerateStory = () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const [state, setState] = useState<StateObject>({
    questionNumber: 0,
    colorPalette: [
      {
        color: 'Blue',
        icon: require('../../assets/png/blueSplash.png'),
        isSelected: false,
        colorCode: themeColor.themeBlue,
      },
      {
        color: 'Pink',
        icon: require('../../assets/png/pinkSplash.png'),
        isSelected: false,
        colorCode: themeColor.pink,
      },
      {
        color: 'Yellow',
        icon: require('../../assets/png/yellowSplash.png'),
        isSelected: false,
        colorCode: themeColor.gold,
      },
      {
        color: 'Red',
        icon: require('../../assets/png/redSplash.png'),
        isSelected: false,
        colorCode: themeColor.red,
      },
    ],
    addedIllustration: null,
  });

  const {questionNumber, addedIllustration} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const dynamicHeading = () => {
    switch (questionNumber) {
      case 0:
        return null;
      case 1:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            Who{' '}
            <RNTextComponent
              isSemiBold
              style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
              is going to be in our story?{' '}
            </RNTextComponent>{' '}
          </RNTextComponent>
        );
      case 2:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            Do you want to be included in the story, Alisa?
          </RNTextComponent>
        );
      case 3:
        return null;
      case 4:
        return (
          <RNTextComponent
            isSemiBold
            style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
            Where shall we {`\n`}{' '}
            <RNTextComponent isSemiBold style={styles.question}>
              go in our story today?
            </RNTextComponent>
          </RNTextComponent>
        );

      case 5:
        return null;
      case 6:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            Shall we include any of these things in the story?{' '}
          </RNTextComponent>
        );

      case 7:
        return null;
      case 8:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            What sort of story{' '}
            <RNTextComponent
              isSemiBold
              style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
              do you want to make today?
            </RNTextComponent>{' '}
          </RNTextComponent>
        );

      case 9:
        return null;
      case 10:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            What style of illustrations{' '}
            <RNTextComponent
              style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}
              isSemiBold>
              shall we use?
            </RNTextComponent>{' '}
          </RNTextComponent>
        );
      case 11:
        return null;
      case 12:
        return null;
    }
  };

  const dynamicContent = () => {
    switch (questionNumber) {
      case 0:
        return (
          <RNRoadmap
            questionIndex={questionNumber}
            nextQuestion={nextQuestion}
          />
        );
      case 1:
        return (
          <ScrollView
            contentContainerStyle={[styles.scrollView]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {audience.map((value, index) => {
              return (
                <RNEmojiWithText
                  key={index.toString()}
                  heading={value.name}
                  customStyle={styles.optionsCustom}
                  icon={value.icon}
                  bgcColor={value.bgc}
                />
              );
            })}
          </ScrollView>
        );
      case 2:
        return (
          <View style={[styles.picView]}>
            <ImageBackground
              source={{
                uri: 'https://previews.123rf.com/images/daniel4606/daniel46061708/daniel4606170800232/84992720-cartoon-giraffe-face.jpg',
              }}
              style={styles.addImage}
              imageStyle={{borderRadius: 16}}>
              <RNButton
                onlyIcon
                icon={<Camera height={18} width={20} />}
                onClick={() => {}}
                IconButtoncustomStyle={styles.camera}
              />
            </ImageBackground>
            <RNTextComponent style={styles.yesOrNo} isMedium>
              {i18n.t('YES')} or {i18n.t('NO')}?
            </RNTextComponent>
            <View style={[styles.buttonView, isTablet && {width: scale(180)}]}>
              <RNButton
                title="✕"
                customStyle={styles.buttonStyle}
                onlyBorder
                onClick={nextQuestion}
              />
              <RNButton
                title="✔"
                customStyle={styles.buttonStyle}
                onClick={nextQuestion}
              />
            </View>
          </View>
        );
      case 3:
        return (
          <RNRoadmap
            questionIndex={questionNumber}
            nextQuestion={nextQuestion}
          />
        );
      case 4:
        return (
          <ScrollView
            contentContainerStyle={[styles.scrollView]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {place.map((value, index) => {
              return (
                <RNEmojiWithText
                  key={index.toString()}
                  heading={value.name}
                  customStyle={styles.optionsCustom}
                  icon={value.icon}
                  bgcColor={value.bgc}
                />
              );
            })}
          </ScrollView>
        );

      case 5:
        return (
          <RNRoadmap
            questionIndex={questionNumber}
            nextQuestion={nextQuestion}
          />
        );
      case 6:
        return (
          <ScrollView
            contentContainerStyle={[styles.scrollView]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {attribute.map((value, index) => {
              return (
                <RNEmojiWithText
                  key={index.toString()}
                  heading={value.name}
                  customStyle={styles.optionsCustom}
                  icon={value.icon}
                  bgcColor={value.bgc}
                />
              );
            })}
          </ScrollView>
        );
      case 7:
        return (
          <RNRoadmap
            questionIndex={questionNumber}
            nextQuestion={nextQuestion}
          />
        );
      case 8:
        return (
          <ScrollView
            contentContainerStyle={[styles.scrollView]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {typeOfStory.map((value, index) => {
              return (
                <RNEmojiWithText
                  key={index.toString()}
                  heading={value.name}
                  customStyle={styles.optionsCustom}
                  icon={value.icon}
                  bgcColor={value.bgc}
                />
              );
            })}
          </ScrollView>
        );
      case 9:
        return (
          <RNRoadmap
            questionIndex={questionNumber}
            nextQuestion={nextQuestion}
          />
        );
      case 10:
        return (
          <ScrollView
            contentContainerStyle={[styles.scrollView]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {illustration.map((value, index) => {
              return (
                <Pressable
                  onPress={() => {
                    updateState({addedIllustration: index});
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
        );
      case 11:
        return <RNChooseColor />;
      case 12:
        return (
          <RNRoadmap
            nextQuestion={() => {
              navigateTo(SCREEN_NAME.BOTTOM_TAB);
            }}
            questionIndex={questionNumber}
          />
        );
    }
  };

  const nextQuestion = () => {
    if (questionNumber <= 10) {
      updateState({questionNumber: questionNumber + 1});
    } else {
      navigateTo(SCREEN_NAME.BOTTOM_TAB);
    }
  };

  const previousQuestion = () => {
    if (questionNumber > 0) {
      updateState({questionNumber: questionNumber - 1});
    } else {
      navigateTo();
    }
  };

  const showIndexes = () => {
    switch (questionNumber) {
      case 1:
        return 1;
      case 2:
        return 1;
      case 4:
        return 2;
      case 6:
        return 3;
      case 8:
        return 4;
      case 10:
        return 5;
      case 11:
        return 6;
    }
  };

  const showHeader = () => {
    if (
      ((questionNumber % 2 == 0 ||
        questionNumber == 1 ||
        questionNumber == 2) &&
        questionNumber != 0) ||
      questionNumber == 11
    ) {
      return (
        <>
          <View style={styles.header}>
            <RNButton
              onlyIcon
              onClick={previousQuestion}
              icon={<LeftArrow />}
            />
            <RNTextComponent style={styles.heading} isSemiBold>
              {i18n.t('GENERATE_STORY')}{' '}
              <RNTextComponent isSemiBold style={styles.questionNumber}>
                {showIndexes()}/6
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
              const currentIndex = showIndexes();
              return (
                <View
                  key={index.index}
                  style={[
                    styles.indicator,
                    {
                      ...{
                        backgroundColor:
                          index.index < currentIndex
                            ? themeColor.themeBlue
                            : 'rgba(66, 133, 246, 0.5)',
                      },
                    },
                  ]}
                />
              );
            })}
          </View>
        </>
      );
    }
  };

  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        {showHeader()}
        {dynamicHeading()}
        {dynamicContent()}
      </View>
      {(questionNumber % 2 == 0 ||
        questionNumber == 2 ||
        questionNumber == 11 ||
        questionNumber == 1) &&
        questionNumber != 0 && (
          <RNButton
            customStyle={[
              styles.footerButton,
              isTablet && {maxHeight: verticalScale(75)},
            ]}
            title={i18n.t('SELECT')}
            onClick={nextQuestion}
            textStyle={styles.buttonText}
          />
        )}
    </RNScreenWrapper>
  );
};

export default GenerateStory;
