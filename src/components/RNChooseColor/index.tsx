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
import {colorPaletteType} from './interface';
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
import {store} from '@tandem/redux/store';
import {STORY_PARTS} from '@tandem/constants/enums';

interface IPath {
  segments: String[];
  color?: string;
  size: number;
}

const RNChooseColor = ({
  tooltipVisible,
  onTooltipClose,
  customStyle,
  isTablet,
}: colorPaletteType) => {
  const tooltipArray = getValueFromKey(TOOLTIP);
  const [palleteArray, setPalletArray] = React.useState<string[]>([]);
  const [finalColor, setFinalColor] = React.useState<string>('');
  const [activeColor, setActiveColor] = React.useState<string>('');
  const [clear, setClear] = React.useState<boolean>(false);
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
    const palletArrRef = [...palleteArray];
    if (palletArrRef.length === 4) return;
    const newpaths = [...paths];
    if (palletArrRef.length >= 2 && newpaths.length > 2) {
      setTimeout(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setActiveColor(chroma.average(palleteArray).hex());
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeColor]);

  return (
    <View style={[styles.container, customStyle && customStyle]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <RNTextComponent isSemiBold style={styles.question}>
          {translation('choose-color.what-colors')}{' '}
          <RNTextComponent
            isSemiBold
            // eslint-disable-next-line react-native/no-inline-styles
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
        <View>
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
                      palleteArray.length >= 2 &&
                      !palleteArray.includes(item.firstColor)
                    }
                    onPress={() => {
                      setActiveColor(item.firstColor);
                      if (!palleteArray.includes(item.firstColor)) {
                        LayoutAnimation.configureNext(
                          LayoutAnimation.Presets.easeInEaseOut,
                        );
                        setPalletArray(prev => [...prev, item.firstColor]);
                      }
                    }}>
                    <ColorPatchUp
                      color={
                        palleteArray.length >= 2
                          ? palleteArray.includes(item.firstColor)
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
                      palleteArray.length >= 2 &&
                      !palleteArray.includes(item.secondColor)
                    }
                    onPress={() => {
                      setActiveColor(item.secondColor);
                      if (!palleteArray.includes(item.secondColor)) {
                        LayoutAnimation.configureNext(
                          LayoutAnimation.Presets.easeInEaseOut,
                        );
                        setPalletArray(prev => [...prev, item.secondColor]);
                      }
                    }}>
                    <ColorPatchUp
                      color={
                        palleteArray.length >= 2
                          ? palleteArray.includes(item.secondColor)
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
                clear={clear}
                setPathsParent={setPaths}
                color={activeColor || 'transparent'}
                height={verticalScale(170)}
              />
            </View>
          </View>
          <View style={styles.footer}>
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
                {palleteArray.length < 3 ? (
                  <Pressable
                    disabled={palleteArray.includes(activeColor)}
                    onPress={() => {
                      setPalletArray(prev => [...prev, activeColor]);
                    }}>
                    <AddColor
                      fill={
                        palleteArray.includes(activeColor) ? '' : activeColor
                      }
                    />
                  </Pressable>
                ) : (
                  <RNButton
                    customStyle={{width: scale(50), height: verticalScale(30)}}
                    onClick={() => {
                      setPalletArray([]);
                      setActiveColor('');
                      setClear(true);
                      setTimeout(() => {
                        setClear(false);
                      }, 100);
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      valueRef.current = '';
                    }}
                    title="X"
                  />
                )}
              </View>
            </RNTooltip>
            {palleteArray.map((color, i) => (
              <Pressable
                key={i.toString()}
                onPress={() => {
                  setFinalColor(color);
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut,
                  );
                  setActiveColor(color);
                  valueRef.current = color;
                }}>
                <EmptyPatch selected={finalColor === color} fill={color} />
              </Pressable>
            ))}
          </View>
        </View>
        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
};

export default RNChooseColor;
