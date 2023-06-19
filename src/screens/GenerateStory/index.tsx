import { View, ScrollView, Pressable, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import RNScreenWrapper from '../../components/RNScreenWrapper';
import { styles } from './styles';
import RNTextComponent from '../../components/RNTextComponent';
import themeColor from '../../theme/themeColor';
import RNEmojiWithText from '../../components/RNEmojiWithText';
import RNButton from '../../components/RNButton';
import { place , audience , typeOfStory} from './interface';
import { stateObject } from './interface';
import BlueSplash from '../../assets/svg/BlueSplash';
import PinkSplash from '../../assets/svg/PinkSplash';
import YellowSplash from '../../assets/svg/YellowSplash';
import RedSplash from '../../assets/svg/RedSplash';
import { verticalScale } from 'react-native-size-matters';
import { colorPalette } from './interface';
import Camera from '../../assets/svg/Camera'
import LeftArrow from '../../assets/svg/LeftArrow'
import QuestionMark from '../../assets/svg/QuestionMark'
import { GeneratingStoryScreenProps } from '../../navigation/types';
import { COMPONENTSNAME } from '../../navigation/ComponentName';


const GenerateStory = ({ navigation} :GeneratingStoryScreenProps) => {
  const [state, setState] = useState<stateObject>({
    questionNumber: 0,
    colorPalette: [
      {
        color: 'Blue',
        icon: (
          <BlueSplash height={verticalScale(130)} width={verticalScale(130)} />
        ),
        isSelected: false,
        colorCode : themeColor.themeBlue
      },
      {
        color: 'Pink',
        icon: (
          <PinkSplash height={verticalScale(130)} width={verticalScale(130)} />
        ),
        isSelected: false,
        colorCode : themeColor.pink

      },
      {
        color: 'Yellow',
        icon: (
          <YellowSplash
            height={verticalScale(160)}
            width={verticalScale(160)}
          />
        ),
        isSelected: false,
        colorCode : themeColor.gold

      },
      {
        color: 'Red',
        icon: (
          <RedSplash height={verticalScale(120)} width={verticalScale(120)} />
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
              go in our story today
            </RNTextComponent>
          </RNTextComponent>
        );
        break;
      case 1:
        return (
          <>
            <RNTextComponent
              isSemiBold
              style={styles.question}>
              Where colors{' '}
              <RNTextComponent isSemiBold style={{...styles.question , color:  "rgba(10, 8, 4, 0.6)"}}>
                should we use
              </RNTextComponent>{' '}
              <RNTextComponent
                isSemiBold
                style={styles.question}>
                in our story?
              </RNTextComponent>{' '}
            </RNTextComponent>
            <RNTextComponent style={styles.subHeading}>
              Select two colors to get a third
            </RNTextComponent>
          </>
        );
        break;
      case 2:
        return (
          <RNTextComponent isSemiBold style={styles.question}>
            Do you want to be included in this story Alisa?
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
              is goin to be in our story?{' '}
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
            What sort of story do you want to make today?{' '}
          </RNTextComponent>
        );
        break;
    }
  };

  const selectColors = (index: number) => {
    let colorList  : any = [...colorPalette];
    let indexOfFirst = colorList.findIndex((value : colorPalette)=>value.isSelected);
    let indexOfLast = colorList.findLastIndex((value :colorPalette)=>value.isSelected);
    console.log(indexOfFirst, indexOfLast , "indexOfFirstindexOfFirst")
    if (
      colorList.filter((item: colorPalette) => item.isSelected === true)
        .length < 2 || indexOfFirst == index || indexOfLast== index
    ) {
      colorList[index].isSelected = !colorList[index].isSelected
    }
    updateState({colorPalette : colorList})
  };

  // const blendColors = ()=>{
  //   switch (colorPalette.filter((item)=>item.isSelected)[0].colorCode ,colorPalette.filter((item)=>item.isSelected)[1].colorCode) {
  //     case :
        
  //       break;
    
  //     default:
  //       break;
  //   }
  // }

  const dynamicContent = () => {
    switch (questionNumber) {
      case 0:
        return (
          <ScrollView
            contentContainerStyle={styles.scrollView}
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
          <>
            <View style={[styles.scrollView]}>
              {colorPalette.map((value, index) => {
                return (
                  <Pressable
                    style={styles.colorView}
                    onPress={() => selectColors(index)}>
                    {value.isSelected &&   <RNTextComponent style={styles.colorName} isSemiBold>
                      {value.color}
                    </RNTextComponent> }
                    {value.icon}
                  </Pressable>
                );
              })}
            </View>
            <View style={styles.colorInfo}>
            <View style={[styles.circle , {backgroundColor : colorPalette.filter((item)=>item.isSelected).length >0 ? colorPalette.filter((item)=>item.isSelected)[0].colorCode : themeColor.white}   ]} />
              <View style={[styles.mixedColor]} />
              <View style={[styles.circle , {backgroundColor : colorPalette.filter((item)=>item.isSelected).length >1 ? colorPalette.filter((item)=>item.isSelected)[1].colorCode : themeColor.white}   ]} />
            </View>
          </>
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
            contentContainerStyle={styles.scrollView}
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
            contentContainerStyle={styles.scrollView}
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
            contentContainerStyle={styles.scrollView}
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
    }
  };

  const nextQuestion = () => {
    if (questionNumber <= 4) {
      updateState({ questionNumber: questionNumber + 1 });
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
      />}
    </RNScreenWrapper>
  );
};

export default GenerateStory;
