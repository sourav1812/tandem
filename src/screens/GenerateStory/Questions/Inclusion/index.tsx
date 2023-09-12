/* eslint-disable react-native/no-inline-styles */
import Camera from '@tandem/assets/svg/Camera';
import RNButton from '@tandem/components/RNButton';
import RNTextComponent from '@tandem/components/RNTextComponent';
import RNTooltip from '@tandem/components/RNTooltip';
import {STORY_PARTS} from '@tandem/constants/enums';
import {TOOLTIP} from '@tandem/constants/local';
import {getValueFromKey, storeKey} from '@tandem/helpers/encryptedStorage';
import {pushStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import {store} from '@tandem/redux/store';
import {translation} from '@tandem/utils/methods';
import {View, ImageBackground} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';
import GenerateStory from '../..';
import React, {useRef} from 'react';
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

  const currentChildAvatar = avatars.filter(
    obj => obj.path === currentChild?.avatar,
  )[0]?.file;
  const tooltipArray = getValueFromKey(TOOLTIP);

  const [tooltipFifth, setTooltipFifth] = React.useState(
    !tooltipArray.includes(15),
  );
  const [positionRefs, setPositionRefs] = React.useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const refTwo = useRef<any>(null);
  const navigation: any = useNavigation();
  const nextQuestion = () => {
    navigation.push(SCREEN_NAME.ROADMAP);
  };

  return (
    <GenerateStory
      onBack={() => {
        removeQuestionData(STORY_PARTS.INCLUSION);
      }}
      giveStatusColor={tooltipFifth}
      questionNumber={2}>
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
              setTooltipFifth(false);
              tooltipArray.push(15);
              storeKey(TOOLTIP, tooltipArray);
            }}
            dimensionObject={positionRefs}>
            <View
              ref={refTwo}
              onLayout={() => {
                refTwo?.current?.measure(
                  (
                    width: number,
                    height: number,
                    pageX: number,
                    pageY: number,
                  ) => {
                    setPositionRefs({
                      height: width,
                      width: height,
                      x: pageX,
                      y: pageY,
                    });
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
                style={[styles.buttonView, isTablet && {width: scale(180)}]}>
                <RNButton
                  title="✔"
                  customStyle={styles.buttonStyle}
                  onlyBorder
                  onClick={() => {
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
                  onClick={() => {
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
