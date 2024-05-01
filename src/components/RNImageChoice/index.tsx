/* eslint-disable react-native/no-inline-styles */
import {Pressable, ScrollView, Image, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {MultipleChoiceProps} from './interface';
import {
  clearParticularState,
  pushStoryGenerationResponse,
} from '@tandem/redux/slices/storyGeneration.slice';
import themeColor from '@tandem/theme/themeColor';
import {
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import {store} from '@tandem/redux/store';
import RNEmojiWithText from '../RNEmojiWithText';
import QuestionMark from '@tandem/assets/svg/QuestionMarkRed';
import RNTooltip from '../RNTooltip';
import {DIRECTION_ARROWS} from '@tandem/constants/enums';
import {translation} from '@tandem/utils/methods';
import {scale, verticalScale} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import RNTextComponent from '../RNTextComponent';

const RNImageChoice = ({
  data = [],
  customStyle,
  type,
  maxSelections = data.length,
  setDisabled,
}: MultipleChoiceProps) => {
  const activeState = useAppSelector(state => state.storyGeneration[type]);
  const [nine, setNine] = React.useState<number | undefined>(undefined);
  const isTablet = useAppSelector(state => state.deviceType.isTablet);

  React.useEffect(() => {
    if (activeState.length > 0) {
      setDisabled(false);
    }
    setTimeout(() => {
      setNine(9);
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePress = (name: string) => {
    if (activeState.includes('Not sure')) {
      store.dispatch(clearParticularState(type));
      store.dispatch(pushStoryGenerationResponse({key: type, value: [name]}));
      return;
    }
    if (maxSelections === 1 || name === 'Not sure') {
      store.dispatch(clearParticularState(type));
      store.dispatch(pushStoryGenerationResponse({key: type, value: [name]}));
      setDisabled(false);
      return;
    }
    if (activeState.length < maxSelections && !activeState.includes(name)) {
      const localRef = JSON.parse(JSON.stringify(activeState));
      localRef.push(name);
      store.dispatch(pushStoryGenerationResponse({key: type, value: localRef}));
      setDisabled(false);
      return;
    }
    const stateFiltered = activeState.filter(oldName => oldName !== name);
    if (stateFiltered.length === activeState.length) {
      return;
    }
    store.dispatch(
      pushStoryGenerationResponse({
        key: type,
        value: stateFiltered,
      }),
    );
    if (stateFiltered.length === 0) {
      setDisabled(true);
    }
  };

  return (
    <ScrollView
      style={[styles.scrollView, customStyle && customStyle]}
      contentContainerStyle={{
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
      }}
      scrollEnabled
      showsVerticalScrollIndicator={false}>
      {data.map((value, indexLocal) => {
        return (
          <View key={indexLocal.toString()}>
            {indexLocal === 0 ? (
              <RNTooltip
                isTablet={isTablet}
                top={DIRECTION_ARROWS.NORTH}
                open={nine}
                rotation={scale(-30)}
                topViewStyle={{alignItems: 'center'}}
                textContainerStyle={[styles.tooltipContainer]}
                textStyle={styles.tooltip}
                text={translation('CHOOSE_FROM_THE_GIVE_OPTIONS')}>
                <AnimatedImageChoice
                  value={value}
                  onPress={() => handlePress(value.name)}
                  activeState={activeState}
                />
              </RNTooltip>
            ) : (
              <AnimatedImageChoice
                value={value}
                onPress={() => handlePress(value.name)}
                activeState={activeState}
                key={indexLocal.toString()}
              />
            )}
          </View>
        );
      })}
      <RNEmojiWithText
        isSelected={activeState.includes('Not sure')}
        onPress={() => handlePress('Not sure')}
        heading={'Not sure'}
        customStyle={styles.illustration}
        bgcColor={'pink'}
        Svgimg={QuestionMark}
        showBorderWhenPressed
      />
    </ScrollView>
  );
};

export default RNImageChoice;

const AnimatedImageChoice = ({
  value,
  onPress,
  activeState,
}: {
  value: {
    name: string;
    file: string;
  };
  onPress: () => void;
  activeState: string[];
}) => {
  const scaleButton = useSharedValue(1);

  const runAnimation = () => {
    scaleButton.value = withSequence(
      withTiming(0.9, {duration: 200}),
      withTiming(1),
    );
  };

  return (
    <Pressable
      onPress={() => {
        onPress();
        runAnimation();
      }}>
      <Animated.View style={{transform: [{scale: scaleButton}]}}>
        <LinearGradient
          colors={
            activeState.includes(value.name)
              ? ['transparent', '#00000095', '#000000']
              : ['transparent', 'transparent', '#000000b8']
          }
          style={[
            styles.illustration,
            {
              position: 'absolute',
              zIndex: 1,
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: 10,
              backgroundColor: 'transparent',
              borderWidth: 3,
              borderColor: activeState.includes(value.name)
                ? themeColor.themeBlue
                : 'transparent',
            },
          ]}>
          <RNTextComponent
            style={{color: 'white', fontSize: verticalScale(12)}}
            isSemiBold>
            {value.name}
          </RNTextComponent>
        </LinearGradient>

        <Image source={{uri: value.file}} style={[styles.illustration]} />
      </Animated.View>
    </Pressable>
  );
};
