/* eslint-disable react-native/no-inline-styles */
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNTooltip from '@tandem/components/RNTooltip';
import {STORY_PARTS} from '@tandem/constants/enums';
import {pushStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import {store} from '@tandem/redux/store';
import {translation} from '@tandem/utils/methods';
import {View, ImageBackground} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';
import GenerateStory from '../..';
import React from 'react';
import {styles} from '../../styles';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {SCREEN_NAME} from '@tandem/navigation/ComponentName';
import {useNavigation} from '@react-navigation/native';
import removeQuestionData from '@tandem/functions/removeQuestionData';

export default () => {
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const currentChild = useAppSelector(state => state.createChild.currentChild);
  const portrait = useAppSelector(state => state.orientation.isPortrait);
  const avatars = useAppSelector(state => state.cache.avatars);
  const [selected, setSelected] = React.useState<number>(0);
  const [eleven, setEleven] = React.useState<number | undefined>(undefined);
  const currentChildAvatar = avatars.filter(
    obj => obj.path === currentChild?.avatar,
  )[0]?.file;
  const tooltipArray = useAppSelector(state => state.tooltipReducer);

  // const [tooltipFifth, setTooltipFifth] = React.useState(!tooltipArray?.[11]);
  React.useEffect(() => {
    setTimeout(() => {
      setEleven(11);
    }, 200);
  }, []);
  const navigation: any = useNavigation();
  const nextQuestion = () => {
    navigation.push(SCREEN_NAME.ROADMAP);
  };

  return (
    <GenerateStory
      onBack={() => {
        removeQuestionData(STORY_PARTS.INCLUSION);
      }}
      questionNumber={3}>
      <>
        <RNTextComponent isSemiBold style={styles.question}>
          {translation('generate-story.included-in-story')} {currentChild.name}?
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
            source={{
              uri: currentChildAvatar || currentChild.avatar,
            }}
            style={styles.addImage}
            imageStyle={{borderRadius: 200}}
          />
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
            open={eleven}>
            <View
              style={[
                styles.buttonContainer,
                !tooltipArray?.[11] && {
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
                style={[styles.buttonView, isTablet && {width: scale(180)}]}>
                <RNButton
                  title="✔"
                  customStyle={styles.buttonStyle}
                  onlyBorder={selected !== 1}
                  onClick={() => {
                    setSelected(1);
                    store.dispatch(
                      pushStoryGenerationResponse({
                        key: STORY_PARTS.INCLUSION,
                        value: true,
                      }),
                    );
                    nextQuestion();
                  }}
                  textStyle={styles.YesbuttonText}
                />
                <RNButton
                  title="✕"
                  customStyle={styles.buttonStyle}
                  onlyBorder={selected !== 2}
                  onClick={() => {
                    setSelected(2);
                    store.dispatch(
                      pushStoryGenerationResponse({
                        key: STORY_PARTS.INCLUSION,
                        value: false,
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
    </GenerateStory>
  );
};
