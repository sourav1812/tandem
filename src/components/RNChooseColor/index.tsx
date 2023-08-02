import {View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
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

const RNChooseColor = ({tooltipVisible, onTooltipClose}: colorPaletteType) => {
  const tooltipArray = getValueFromKey(TOOLTIP);

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
  });

  const {colorPalette, color1, color2} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  return (
    <View style={styles.container}>
      <RNTextComponent isSemiBold style={styles.question}>
        {translation('choose-color.what-colors')}
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
                  updateState({color1: item.firstColor});
                }}>
                <ColorPatchUp color={item.firstColor} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  updateState({color2: item.secondColor});
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
          <EmptyBox color={color1} />
          <EmptyBox props={{style: styles.secondColor}} color={color2} />
        </View>
      </View>
      <View style={styles.footer}>
        <RNTooltip
          open={tooltipArray.includes(7) ? false : tooltipVisible}
          setClose={onTooltipClose}
          text={translation('ADD_COLORS')}
          textStyle={styles.tooltip}
          top
          rotation={180}>
          <AddColor />
        </RNTooltip>
        {Array.from({length: 3}, (_, i) => (
          <EmptyPatch key={i.toString()} />
        ))}
      </View>
    </View>
  );
};

export default RNChooseColor;
