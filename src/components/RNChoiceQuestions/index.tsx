import {ScrollView} from 'react-native';
import React, {useRef} from 'react';
import {styles} from './styles';
import RNEmojiWithText from '../RNEmojiWithText';
import {MultipleChoiceProps} from './interface';
import RNTooltip from '../RNTooltip';
import {translation} from '@tandem/utils/methods';
import {pushStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import {useAppDispatch, useAppSelector} from '@tandem/hooks/navigationHooks';

const RNChoiceQuestions = ({
  data = [],
  customStyle,
  visibletoolTip = false,
  itemStyle,
  onTooltipClose = () => {},
  type,
  maxSelections = data.length,
  setDisabled,
}: MultipleChoiceProps) => {
  const refOne = useRef<any>(null);
  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
  });
  const isTablet = useAppSelector(state => state.deviceType.isTablet);
  const activeState = useAppSelector(state => state.storyGeneration[type]);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    if (activeState.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeState.length]);

  const handlePress = (name: string) => {
    if (maxSelections === 1) {
      dispatch(pushStoryGenerationResponse({key: type, value: [name]}));
      return;
    }
    if (activeState.length < maxSelections && !activeState.includes(name)) {
      dispatch(
        pushStoryGenerationResponse({key: type, value: [...activeState, name]}),
      );
      return;
    }
    dispatch(
      pushStoryGenerationResponse({
        key: type,
        value: activeState.filter(oldName => oldName !== name),
      }),
    );
  };

  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={[styles.scrollView, customStyle && customStyle]}
      scrollEnabled
      showsVerticalScrollIndicator={false}>
      {data.map((value, indexLocal) => {
        if (indexLocal === 0) {
          return (
            <RNTooltip
              key={indexLocal.toString()}
              isTablet={isTablet}
              topViewStyle={{
                alignItems: 'center',
              }}
              open={visibletoolTip}
              setClose={onTooltipClose}
              text={translation('CHOOSE_FROM_THE_GIVE_OPTIONS')}
              textContainerStyle={[
                styles.tooltipContainer,
                itemStyle && itemStyle,
              ]}
              textStyle={styles.tooltip}
              dimensionObject={positionRefs[0]}>
              <RNEmojiWithText
                isSelected={activeState.includes(value.name)}
                onPress={() => handlePress(value.name)}
                onLayout={() => {
                  refOne?.current?.measure(
                    (
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
                }}
                heading={value.name}
                customStyle={styles.optionsCustom}
                icon={value.icon}
                bgcColor={value.bgc}
                Svgimg={value.svgIcon}
              />
            </RNTooltip>
          );
        } else {
          return (
            <RNEmojiWithText
              isSelected={activeState.includes(value.name)}
              onPress={() => handlePress(value.name)}
              key={indexLocal.toString()}
              heading={value.name}
              customStyle={[styles.optionsCustom, itemStyle && itemStyle]}
              icon={value?.icon}
              bgcColor={value.bgc}
              Svgimg={value.svgIcon}
            />
          );
        }
      })}
    </ScrollView>
  );
};

export default RNChoiceQuestions;
