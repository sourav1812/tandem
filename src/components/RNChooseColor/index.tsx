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
import {COLOR_PALETTE} from '@tandem/constants/local';
import chroma from 'chroma-js';
import RNButton from '../RNButton';
import {scale, verticalScale} from 'react-native-size-matters';
import RNPaintBrush from '../RNPaintBrush';
import {pushStoryGenerationResponse} from '@tandem/redux/slices/storyGeneration.slice';
import {RootState, store} from '@tandem/redux/store';
import {STORY_PARTS} from '@tandem/constants/enums';
import {useAppSelector} from '@tandem/hooks/navigationHooks';
import ColorRemove from '@tandem/assets/svg/ColorRemove';
import {addAlertData} from '@tandem/redux/slices/alertBox.slice';

interface IPath {
  segments: String[];
  color?: string;
  size: number;
}

const RNChooseColor = ({
  // tooltipVisible,
  // onTooltipClose,
  customStyle,
  isTablet,
  setDisabled,
}: ColorPaletteType) => {
  const [palleteArray, setPalletArray] = React.useState<string[]>([]);
  const [finalColor, setFinalColor] = React.useState<string>('');
  const [activeColor, setActiveColor] = React.useState<string>('');
  const [clear, setClear] = React.useState<boolean>(false);
  const [clearTimeoutOfMixing, setClearTimoutOfMixing] = React.useState<
    number | undefined
  >();
  const [tweleve, setTweleve] = React.useState<undefined | number>(undefined);
  const [controlPaintMixHz, setControlPaintMixHz] =
    React.useState<boolean>(false);
  const [usedColor, setUsedColor] = React.useState<string[]>([]);

  const refOne = useRef<any>(null);
  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
  });
  const [paths, setPaths] = React.useState<IPath[]>([]);
  const portrait = useAppSelector(
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
  };

  React.useEffect(() => {
    if (usedColor.length < 2 || controlPaintMixHz) {
      return;
    }
    const avgColor = chroma.average(usedColor).hex();
    if (activeColor !== avgColor && paths.length > 0) {
      setControlPaintMixHz(true);
      const timeout = setTimeout(() => {
        setActiveColor(avgColor);
        setControlPaintMixHz(false);
      }, 2000);
      setClearTimoutOfMixing(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paths.length, usedColor]);
  React.useEffect(() => {
    setTimeout(() => {
      setTweleve(12);
    }, 200);
  }, []);
  React.useEffect(() => {
    if (palleteArray.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    store.dispatch(
      pushStoryGenerationResponse({
        key: STORY_PARTS.COLOR,
        value: palleteArray,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palleteArray.length]);

  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {portrait && <TextData />}
        <View style={{flexDirection: portrait ? 'column' : 'row'}}>
          <View style={styles.colorView}>
            {COLOR_PALETTE.map((item, index) => {
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
              open={tweleve}
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
                    disabled={activeColor === ''}
                    onPress={() => {
                      if (palleteArray.includes(activeColor)) {
                        store.dispatch(
                          addAlertData({
                            type: 'Message',
                            message: translation('COLOR_ADDED'),
                            onSuccess: () => {
                              setActiveColor('');
                              setUsedColor([]);
                              setClear(true);
                              setTimeout(() => {
                                setClear(false);
                              }, 100);
                            },
                          }),
                        );
                        return;
                      }
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      setPalletArray(prev =>
                        prev.length < 4 ? [...prev, activeColor] : prev,
                      );
                      setActiveColor('');
                      if (clearTimeoutOfMixing !== undefined) {
                        clearTimeout(clearTimeoutOfMixing);
                        setClearTimoutOfMixing(undefined);
                        setControlPaintMixHz(false);
                      }
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
                  }
                }}
                key={val.toString()}>
                {finalColor === palleteArray[val] && (
                  <ColorRemove
                    onPress={() => {
                      const localRef = [...palleteArray];
                      localRef.splice(val, 1);
                      setPalletArray(localRef);
                      setFinalColor('');
                    }}
                  />
                )}
                <EmptyPatch fill={palleteArray[val] || undefined} />
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
