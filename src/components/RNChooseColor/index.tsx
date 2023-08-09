import {
  View,
  TouchableOpacity,
  ScrollView,
  Pressable,
  LayoutAnimation,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {StateObject, colorPaletteType} from './interface';
import ColorPatchUp from '@tandem/assets/svg/ColorPatch';
import EmptyBox from '@tandem/assets/svg/EmptyColorBox';
import AddColor from '@tandem/assets/svg/AddColor';
import EmptyPatch from '@tandem/assets/svg/EmptyPatch';
import {translation} from '@tandem/utils/methods';
import RNTooltip from '../RNTooltip';
import {TOOLTIP} from '@tandem/constants/LocalConstants';
import {getValueFromKey} from '@tandem/helpers/encryptedStorage';
import chroma from 'chroma-js';
import RNButton from '../RNButton';
import {scale} from 'react-native-size-matters';

const RNChooseColor = ({
  tooltipVisible,
  onTooltipClose,
  customStyle,
}: colorPaletteType) => {
  const tooltipArray = getValueFromKey(TOOLTIP);
  const [palleteArray, setPalletArray] = React.useState<string[]>([]);
  const [state, setState] = useState<StateObject>({
    colorPalette: [
      {firstColor: '#0633FD', secondColor: '#FEF902'},
      {firstColor: '#0998FF', secondColor: '#FF9409'},
      {firstColor: '#00FDFF', secondColor: '#FF2E09'},
      {firstColor: '#02F98F', secondColor: '#FF2F8F'},
      {firstColor: '#02F902', secondColor: '#FF3FFB'},
      {firstColor: '#89F902', secondColor: '#9137FF'},
    ],
    color1: '',
    color2: '',
    color3: '',
  });
  const {colorPalette, color1, color2, color3} = state;

  const refOne = useRef<any>(null);
  const [positionRefs, setPositionRefs] = React.useState({
    0: {height: 0, width: 0, x: 0, y: 0},
  });
  const updateState = (date: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const handleColors = (colorInput: string) => {
    if (!color1 && !color2) {
      updateState({
        color1: colorInput,
        color3: colorInput,
      });
    } else if (!color1 && color2 && color2 !== colorInput) {
      updateState({
        color1: colorInput,
      });
    } else if (color1 !== colorInput) {
      updateState({
        color2: colorInput,
      });
    }
  };

  useEffect(() => {
    if (color1 && color2) {
      updateState({color3: chroma.mix(color1, color2, 0.5, 'hsv').hex()});
    }
  }, [color1, color2]);

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
                    onPress={() => {
                      handleColors(item.firstColor);
                    }}>
                    <ColorPatchUp color={item.firstColor} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleColors(item.secondColor);
                    }}>
                    <ColorPatchUp
                      color={item.secondColor}
                      props={{transform: [{rotate: '180deg'}]}}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
            <View style={styles.colorPatch}>
              {color1 && (
                <Pressable
                  onPress={() => {
                    updateState({color1: '', color3: color2});
                  }}>
                  <EmptyBox color={color1} />
                </Pressable>
              )}
              {color2 && (
                <Pressable
                  onPress={() => {
                    updateState({color2: '', color3: color1});
                  }}>
                  <EmptyBox
                    props={{style: styles.secondColor}}
                    color={color2}
                  />
                </Pressable>
              )}
            </View>
          </View>
          <View style={styles.footer}>
            <RNTooltip
              open={tooltipArray.includes(7) ? false : tooltipVisible}
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
                {palleteArray.length < 4 ? (
                  <Pressable
                    onPress={() => {
                      if (
                        palleteArray.length < 4 &&
                        !palleteArray.includes(color3) &&
                        color3
                      ) {
                        setPalletArray(prev => [...prev, color3]);
                        updateState({
                          color3: '',
                        });
                      }
                    }}>
                    <AddColor fill={palleteArray.length < 4 ? color3 : ''} />
                  </Pressable>
                ) : (
                  <RNButton
                    customStyle={{width: scale(50)}}
                    onClick={() => {
                      setPalletArray([]);
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
                  handleColors(color);
                }}>
                <EmptyPatch fill={color} />
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
