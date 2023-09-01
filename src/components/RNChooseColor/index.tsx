/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  LayoutAnimation,
} from 'react-native';
import React, {useRef} from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {ColorPaletteType} from './interface';
import ColorPatchUp from '@tandem/assets/svg/ColorPatch';
import AddColor from '@tandem/assets/svg/AddColor';
import EmptyPatch from '@tandem/assets/svg/EmptyPatch';
import {translation} from '@tandem/utils/methods';
import RNTooltip from '../RNTooltip';
import {TOOLTIP} from '@tandem/constants/LocalConstants';
import {getValueFromKey} from '@tandem/helpers/encryptedStorage';
import chroma from 'chroma-js';
import RNButton from '../RNButton';
import {scale, verticalScale} from 'react-native-size-matters';
import RNPaintBrush from '../RNPaintBrush';
import {
  pushStoryGenerationResponse,
  clipStoryGenerationResponse,
} from '@tandem/redux/slices/storyGeneration.slice';
import {RootState, store} from '@tandem/redux/store';
import {STORY_PARTS} from '@tandem/constants/enums';
import {useSelector} from 'react-redux';

interface IPath {
  segments: String[];
  color?: string;
  size: number;
}

const tooltipArray = getValueFromKey(TOOLTIP);
const RNChooseColor = ({
  tooltipVisible,
  onTooltipClose,
  customStyle,
  isTablet,
  setDisabled,
}: ColorPaletteType) => {
  const [palleteArray, setPalletArray] = React.useState<string[]>([]);
  const [finalColor, setFinalColor] = React.useState<string>('');
  const [activeColor, setActiveColor] = React.useState<string>('');
  const [clear, setClear] = React.useState<boolean>(false);
  const [usedColor, setUsedColor] = React.useState<string[]>([]);
  const colorPalette = [
    {firstColor: '#0633FD', secondColor: '#FEF902'},
    {firstColor: '#0998FF', secondColor: '#FF9409'},
    {firstColor: '#00FDFF', secondColor: '#FF2E09'},
    {firstColor: '#02F98F', secondColor: '#FF2F8F'},
    {firstColor: '#02F902', secondColor: '#FF3FFB'},
    {firstColor: '#89F902', secondColor: '#9137FF'},
  ];
  const refOne = useRef<any>(null);
  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
  });
  const [paths, setPaths] = React.useState<IPath[]>([]);
  const valueRef = useRef<string>('');
  const portrait = useSelector(
    (state: RootState) => state.orientation.isPortrait,
  );
  const handleReset = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPalletArray([]);
    setActiveColor('');
    setFinalColor('');
    setUsedColor([]);
    setClear(true);
    setTimeout(() => {
      setClear(false);
    }, 100);
    valueRef.current = '';
  };

  React.useEffect(() => {
    return () => {
      if (valueRef.current) {
        store.dispatch(clipStoryGenerationResponse(6));
        store.dispatch(
          pushStoryGenerationResponse({
            type: STORY_PARTS.COLOR,
            response: valueRef.current,
          }),
        );
      } else {
        store.dispatch(clipStoryGenerationResponse(5));
      }
    };
  }, []);

  React.useEffect(() => {
    if (finalColor) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalColor]);

  React.useEffect(() => {
    if (usedColor.length < 2) {
      return;
    }
    const avgColor = chroma.average(usedColor).hex();
    if (activeColor !== avgColor && paths.length > 0) {
      setTimeout(() => {
        setActiveColor(avgColor);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paths.length, usedColor]);

  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {portrait && <TextData />}
        <View style={{flexDirection: portrait ? 'column' : 'row'}}>
          <View style={styles.colorView}>
            {colorPalette.map((item, index) => {
              return (
                <View
                  key={index.toString()}
                  style={[
                    styles.colorPair,
                    {transform: [{rotate: `-${30 * index}deg`}]},
                  ]}>
                  <TouchableOpacity
                    disabled={
                      palleteArray.length >= 4 ||
                      (usedColor.length >= 2 &&
                        !usedColor.includes(item.firstColor))
                    }
                    onPress={() => {
                      setActiveColor(item.firstColor);
                      if (
                        usedColor.length < 2 &&
                        !usedColor.includes(item.firstColor)
                      ) {
                        setUsedColor(prev => [...prev, item.firstColor]);
                      }
                    }}>
                    <ColorPatchUp
                      color={
                        usedColor.length >= 2
                          ? usedColor.includes(item.firstColor)
                            ? item.firstColor
                            : chroma
                                .mix(item.firstColor, 'grey', 0.8, 'rgb')
                                .hex()
                          : item.firstColor
                      }
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={
                      palleteArray.length >= 4 ||
                      (usedColor.length >= 2 &&
                        !usedColor.includes(item.secondColor))
                    }
                    onPress={() => {
                      setActiveColor(item.secondColor);
                      if (
                        usedColor.length < 2 &&
                        !usedColor.includes(item.secondColor)
                      ) {
                        setUsedColor(prev => [...prev, item.secondColor]);
                      }
                    }}>
                    <ColorPatchUp
                      color={
                        usedColor.length >= 2
                          ? usedColor.includes(item.secondColor)
                            ? item.secondColor
                            : chroma
                                .mix(item.secondColor, 'grey', 0.8, 'rgb')
                                .hex()
                          : item.secondColor
                      }
                      props={{transform: [{rotate: '180deg'}]}}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
            <View style={styles.colorPatch}>
              <RNPaintBrush
                usedColor={usedColor}
                clear={clear}
                setPathsParent={setPaths}
                color={activeColor || 'transparent'}
                height={verticalScale(170)}
              />
            </View>
          </View>
          <View style={styles.footer}>
            {!portrait && <TextData />}
            <RNTooltip
              isTablet={isTablet}
              topViewStyle={{
                alignItems: 'center',
              }}
              open={tooltipArray?.includes(7) ? false : tooltipVisible}
              setClose={onTooltipClose}
              text={translation('ADD_COLORS')}
              textStyle={styles.tooltip}
              dimensionObject={positionRefs[0]}>
              <View
                style={{
                  height: verticalScale(portrait ? 70 : 100),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
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
                {palleteArray.length < 4 ? (
                  <Pressable
                    disabled={palleteArray.includes(activeColor)}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      setPalletArray(prev =>
                        prev.length < 4 ? [...prev, activeColor] : prev,
                      );
                      setActiveColor('');
                      valueRef.current = '';
                      setUsedColor([]);
                      setClear(true);
                      setTimeout(() => {
                        setClear(false);
                      }, 100);
                    }}>
                    <AddColor fill={activeColor} />
                  </Pressable>
                ) : (
                  <RNButton
                    customStyle={{width: scale(50), height: verticalScale(30)}}
                    onClick={handleReset}
                    title="X"
                  />
                )}
              </View>
            </RNTooltip>
            {[...new Array(4).keys()].map(val => (
              <Pressable
                onPress={() => {
                  if (palleteArray[val]) {
                    setFinalColor(palleteArray[val]);
                    valueRef.current = palleteArray[val];
                  }
                }}
                key={val.toString()}>
                <EmptyPatch
                  selected={finalColor === palleteArray[val]}
                  fill={palleteArray[val] || undefined}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RNChooseColor;

const TextData = () => {
  return (
    <>
      <RNTextComponent isSemiBold style={styles.question}>
        {translation('choose-color.what-colors')}{' '}
        <RNTextComponent
          isSemiBold
          style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
          {translation('choose-color.should-we-use')}
        </RNTextComponent>{' '}
        <RNTextComponent isSemiBold style={styles.question}>
          {translation('choose-color.in-our-story')}
        </RNTextComponent>{' '}
      </RNTextComponent>
      <RNTextComponent style={styles.subHeading}>
        {translation('choose-color.select-two-colors')}
      </RNTextComponent>
    </>
  );
};
