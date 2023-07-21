import {View, Pressable, Alert, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import {stateObject} from './interface';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';
import ColorPatchUp from '@tandem/assets/svg/ColorPatch';
import EmptyBox from '@tandem/assets/svg/EmptyColorBox';
import AddColor from '@tandem/assets/svg/AddColor';
import EmptyPatch from '@tandem/assets/svg/EmptyPatch';

const RNChooseColor = () => {
  const isTablet = checkIfTablet();

  const [state, setState] = useState<stateObject>({
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
        What colors{' '}
        <RNTextComponent
          isSemiBold
          // eslint-disable-next-line react-native/no-inline-styles
          style={{...styles.question, color: 'rgba(10, 8, 4, 0.6)'}}>
          should we use
        </RNTextComponent>{' '}
        <RNTextComponent isSemiBold style={styles.question}>
          in our story?
        </RNTextComponent>{' '}
      </RNTextComponent>
      <RNTextComponent style={styles.subHeading}>
        Select two colors to get a third
      </RNTextComponent>
      <View style={styles.colorView}>
        {colorPalette.map((item, index) => {
          return (
            <View
              style={[
                styles.colorPair,
                {transform: [{rotate: `-${30 * index}deg`}]},
              ]}>
              <TouchableOpacity
                onPress={() => {
                  console.log(item.secondColor);

                  updateState({color1: item.firstColor});
                }}>
                <ColorPatchUp color={item.firstColor} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log(item.secondColor);

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
        <AddColor />
        {Array.from({length: 3}, (_, i) => (
          <EmptyPatch />
        ))}
      </View>
    </View>
  );
};

export default RNChooseColor;
