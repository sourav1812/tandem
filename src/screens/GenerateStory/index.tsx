import { View, ScrollView, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import RNScreenWrapper from '../../components/RNScreenWrapper';
import { styles } from './styles';
import RNTextComponent from '../../components/RNTextComponent';
import themeColor from '../../theme/themeColor';
import RNEmojiWithText from '../../components/RNEmojiWithText';
import RNButton from '../../components/RNButton';
import { place , audience , typeOfStory, attribute} from './interface';
import { stateObject } from './interface';
import Camera from '../../assets/svg/Camera'
import LeftArrow from '../../assets/svg/LeftArrow'
import QuestionMark from '../../assets/svg/QuestionMark'
import { GeneratingStoryScreenProps } from '../../navigation/types';
import { COMPONENTSNAME } from '../../navigation/ComponentName';
import RNChooseColor from '../../components/RNChooseColor';
import { checkIfTablet } from '../../hooks/isTabletHook';
import { verticalScale } from 'react-native-size-matters';


const GenerateStory = ({ navigation} :GeneratingStoryScreenProps) => {
  const isTablet = checkIfTablet();
  const [state, setState] = useState<stateObject>({
    questionNumber: 0,
    colorPalette: [
      {
        color: 'Blue',
        icon: (
          require('../../assets/png/blueSplash.png')
        ),
        isSelected: false,
        colorCode : themeColor.themeBlue
      },
      {
        color: 'Pink',
        icon: (
          require('../../assets/png/pinkSplash.png')
        ),
        isSelected: false,
        colorCode : themeColor.pink

      },
      {
        color: 'Yellow',
        icon: (
          require('../../assets/png/yellowSplash.png')
        ),
        isSelected: false,
        colorCode : themeColor.gold

      },
      {
        color: 'Red',
        icon: (
          require('../../assets/png/redSplash.png')
        ),
        isSelected: false,
        colorCode : themeColor.red
      },
    ],
  });

  const { questionNumber, colorPalette } = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return { ...previouState, ...date };
    });
  };

  const dynamicHeading = () => {
    switch (questionNumber) {
      case 0:
        return (
          <RNTextComponent
            isSemiBold
            style={{ ...styles.question, color: 'rgba(10, 8, 4, 0.6)' }}>
            Where shall we {`\n`}{' '}
            <RNTextComponent isSemiBold style={styles.question}>
              go in our story today?
            </RNTextComponent>
          </RNTextComponent>
        );
        break;
      case 2:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            Do you want to be included in the story, Alisa?
          </RNTextComponent>
        );
        break;
      case 3:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            Who else{' '}
            <RNTextComponent
              isSemiBold
              style={{ ...styles.question, color: 'rgba(10, 8, 4, 0.6)' }}>
              is going to be in our story?{' '}
            </RNTextComponent>{' '}
          </RNTextComponent>
        );
        break;
      case 4:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            What sort of story{' '}
            <RNTextComponent
              isSemiBold
              style={{ ...styles.question, color: 'rgba(10, 8, 4, 0.6)' }}>
              do you want to make today?
            </RNTextComponent>{' '}
          </RNTextComponent>
        );
        break;
      case 5:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            Shall we include any of these things in the story?{' '}
          </RNTextComponent>
        );
        break;
    }
  };

  const dynamicContent = () => {
    switch (questionNumber) {
      case 0:
        return (
          <ScrollView
            contentContainerStyle={[styles.scrollView ]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {place.map((value, index) => {
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
        break;
      case 1:
        return (
          <RNChooseColor/>
        );
        break;
      case 2:
        return (
          <View style={[styles.picView]}>
            <ImageBackground
              source={{
                uri: 'https://previews.123rf.com/images/daniel4606/daniel46061708/daniel4606170800232/84992720-cartoon-giraffe-face.jpg',
              }}
              style={styles.addImage}
              imageStyle={{ borderRadius: 16 }}>
  
                <RNButton onlyIcon icon={<Camera/>} onClick={()=>{}} IconButtoncustomStyle={styles.camera} />
              </ImageBackground>
            <RNTextComponent style={styles.yesOrNo} isMedium>
              Yes or No?
            </RNTextComponent>
            <View style={styles.buttonView} >
              <RNButton title="✕" customStyle={styles.buttonStyle} onlyBorder onClick={nextQuestion} />
              <RNButton title="✔" customStyle={styles.buttonStyle}  onClick={nextQuestion}/>
            </View>
          </View>
        );
        break;
        case 3:
          return (
            <ScrollView
            contentContainerStyle={[styles.scrollView ]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {audience.map((value, index) => {
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
          )
        break
        case 4:
          return (
            <ScrollView
            contentContainerStyle={[styles.scrollView]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {typeOfStory.map((value, index) => {
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
          )
        break
        case 5:
          return (
            <ScrollView
            contentContainerStyle={[styles.scrollView ]}
            scrollEnabled
            showsVerticalScrollIndicator={false}>
            {attribute.map((value, index) => {
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
          )
        break
    }
  };


  const nextQuestion = () => {
    if (questionNumber <= 4) {
      updateState({ questionNumber: questionNumber + 1 });
    }else  {
      navigation.navigate(COMPONENTSNAME.ACTIVITIES)
    }
  };

  const previousQuestion = () => {
    if (questionNumber > 0) {
      updateState({ questionNumber: questionNumber - 1 });
    } else {
      navigation.goBack();
    }
  };



  return (
    <RNScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <RNButton onlyIcon onClick={previousQuestion} icon={<LeftArrow/>} />
          <RNTextComponent style={styles.heading} isSemiBold>
            Generate Story{' '}
            <RNTextComponent isSemiBold style={styles.questionNumber}>
              {questionNumber + 1}/6
            </RNTextComponent>
          </RNTextComponent>
          <RNButton onlyIcon onClick={previousQuestion} icon={<QuestionMark/>} />
        </View>
        <View style={styles.progressBar}>
          {Array.from({ length: 6 }, (_, index) => {
            return { index: index };
          }).map((index, value) => {
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
    {questionNumber != 2 &&  <RNButton
        customStyle={styles.footerButton}
        title={'Select'}
        onClick={nextQuestion}
        textStyle={styles.buttonText}
      />}
    </RNScreenWrapper>
  );
};

export default GenerateStory;
