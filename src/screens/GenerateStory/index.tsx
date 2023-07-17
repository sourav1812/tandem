/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
import {View, ScrollView, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import RNScreenWrapper from '@tandem/components/RNScreenWrapper';
import {styles} from './styles';
import RNTextComponent from '@tandem/components/RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import RNEmojiWithText from '@tandem/components/RNEmojiWithText';
import RNButton from '@tandem/components/RNButton';
import {place, audience, typeOfStory, attribute} from './interface';
import {stateObject} from './interface';
import Camera from '@tandem/assets/svg/Camera';
import LeftArrow from '@tandem/assets/svg/LeftArrow';
import QuestionMark from '@tandem/assets/svg/QuestionMark';
import {GeneratingStoryScreenProps} from '@tandem/navigation/types';
import {COMPONENTSNAME} from '@tandem/navigation/ComponentName';
import RNChooseColor from '@tandem/components/RNChooseColor';
import i18n from '@tandem/constants/api/lang/i18n';

const GenerateStory = ({navigation}: GeneratingStoryScreenProps) => {
  const [state, setState] = useState<stateObject>({
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
  });

  const {questionNumber} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const dynamicHeading = () => {
    switch (questionNumber) {
      case 0:
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
      case 2:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            Do you want to be included in the story, Alisa?
          </RNTextComponent>
        );
      case 3:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            Who else{' '}
            <RNTextComponent
              isSemiBold
              style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
              is going to be in our story?{' '}
            </RNTextComponent>{' '}
          </RNTextComponent>
        );
      case 4:
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
      case 5:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            Shall we include any of these things in the story?{' '}
          </RNTextComponent>
        );
    }
  };

  const dynamicContent = () => {
    switch (questionNumber) {
      case 0:
        return (
          <ScrollView
            contentContainerStyle={[styles.scrollView]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {place.map(value => {
              return (
                <RNEmojiWithText
                  heading={value.name}
                  customStyle={styles.optionsCustom}
                  icon={value.icon}
                  bgcColor={value.bgc}
                />
              );
            })}
          </ScrollView>
        );
      case 1:
        return <RNChooseColor />;
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
            <View style={styles.buttonView}>
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
          <ScrollView
            contentContainerStyle={[styles.scrollView]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {audience.map(value => {
              return (
                <RNEmojiWithText
                  heading={value.name}
                  customStyle={styles.optionsCustom}
                  icon={value.icon}
                  bgcColor={value.bgc}
                />
              );
            })}
          </ScrollView>
        );
      case 4:
        return (
          <ScrollView
            contentContainerStyle={[styles.scrollView]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {typeOfStory.map(value => {
              return (
                <RNEmojiWithText
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
          <ScrollView
            contentContainerStyle={[styles.scrollView]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {attribute.map(value => {
              return (
                <RNEmojiWithText
                  heading={value.name}
                  customStyle={styles.optionsCustom}
                  icon={value.icon}
                  bgcColor={value.bgc}
                />
              );
            })}
          </ScrollView>
        );
    }
  };

  const nextQuestion = () => {
    if (questionNumber <= 4) {
      updateState({questionNumber: questionNumber + 1});
    } else {
      navigation.navigate(COMPONENTSNAME.ACTIVITIES);
    }
  };

  const previousQuestion = () => {
    if (questionNumber > 0) {
      updateState({questionNumber: questionNumber - 1});
    } else {
      navigation.goBack();
    }
  };

  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <RNButton onlyIcon onClick={previousQuestion} icon={<LeftArrow />} />
          <RNTextComponent style={styles.heading} isSemiBold>
            {i18n.t('GENERATE_STORY')}{' '}
            <RNTextComponent isSemiBold style={styles.questionNumber}>
              {questionNumber + 1}/6
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
                style={[
                  styles.indicator,
                  {
                    ...{
                      backgroundColor:
                        index.index <= questionNumber
                          ? themeColor.themeBlue
                          : 'rgba(66, 133, 246, 0.5)',
                    },
                  },
                ]}
              />
            );
          })}
        </View>
        {dynamicHeading()}
        {dynamicContent()}
      </View>
      {questionNumber != 2 && (
        <RNButton
          customStyle={styles.footerButton}
          title={i18n.t('SELECT')}
          onClick={nextQuestion}
          textStyle={styles.buttonText}
        />
      )}
    </RNScreenWrapper>
  );
};

export default GenerateStory;
