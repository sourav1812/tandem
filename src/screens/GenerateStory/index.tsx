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

const GenerateStory = () => {
  const dispatch = useAppDispatch();
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const questionIndex = useAppSelector(state => state.questions.index);

  const [state, setState] = useState<StateObject>({
    addedIllustration: null,
  });

  const {addedIllustration} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const dynamicContent = () => {
    switch (questionIndex) {
      case 0:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.question}>
              {translation('WHO')}{' '}
              <RNTextComponent
                isSemiBold
                style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
                {translation('generate-story.is-in-story')}{' '}
              </RNTextComponent>{' '}
            </RNTextComponent>
            <RNChoiceQuestions data={audience} />
          </>
        );
      case 1:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.question}>
              {translation('generate-story.included-in-story')}
            </RNTextComponent>
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
                {translation('YES')} or {translation('NO')}?
              </RNTextComponent>
              <View
                style={[styles.buttonView, isTablet && {width: scale(180)}]}>
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
          </>
        );
      case 2:
        return (
          <>
            <RNTextComponent
              isSemiBold
              style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
              {translation('generate-story.where-shall-we')}
              {`\n`}{' '}
              <RNTextComponent isSemiBold style={styles.question}>
                {translation('generate-story.go-in-our-story')}
              </RNTextComponent>
            </RNTextComponent>
            <RNChoiceQuestions data={place} />
          </>
        );
      case 3:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.question}>
              {translation('generate-story.include-things')}{' '}
            </RNTextComponent>
            <RNChoiceQuestions data={attribute} />
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
            <RNChoiceQuestions data={typeOfStory} />
          </>
        );
      case 5:
        return (
          <>
            <RNTextComponent isSemiBold style={styles.question}>
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
          </>
        );
      case 6:
        return <RNChooseColor />;
    }
  };

  const nextQuestion = () => {
    if (questionIndex < 7) {
      dispatch(setQuestionIndex(questionIndex + 1));
      if (questionIndex !== 0 && questionIndex !== 5) {
        navigateTo(SCREEN_NAME.ROADMAP, {}, true);
      }
    }
  };

  const previousQuestion = () => {
    if (questionIndex > 0) {
      navigateTo();
    } else {
      navigateTo(SCREEN_NAME.BOTTOM_TAB);
    }
  };

  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <RNButton onlyIcon onClick={previousQuestion} icon={<LeftArrow />} />
          <RNTextComponent style={styles.heading} isSemiBold>
            {translation('GENERATE_STORY')}{' '}
            <RNTextComponent isSemiBold style={styles.questionNumber}>
              {questionIndex + 1}/6
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
            return (
              <View
                key={index.index}
                style={[
                  styles.indicator,
                  {
                    ...{
                      backgroundColor:
                        index.index < questionIndex
                          ? themeColor.themeBlue
                          : 'rgba(66, 133, 246, 0.5)',
                    },
                  },
                ]}
              />
            );
          })}
        </View>
        {dynamicContent()}
      </View>
      <RNButton
        customStyle={[
          styles.footerButton,
          isTablet && {maxHeight: verticalScale(75)},
        ]}
        title={translation('SELECT')}
        onClick={nextQuestion}
        textStyle={styles.buttonText}
      />
    </RNScreenWrapper>
  );
};

export default GenerateStory;
