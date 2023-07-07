import {View, Animated, Pressable} from 'react-native';
import React, {useState, useRef} from 'react';
import {styles} from './styles';
import RNTextComponent from '../RNTextComponent';
import themeColor from '@tandem/theme/themeColor';
import {stateObject} from './interface';
import {verticalScale} from 'react-native-size-matters';
import {colorPaletteType} from './interface';
import {checkIfTablet} from '@tandem/hooks/isTabletHook';

let memoryQue: number[] = [];

const RNChooseColor = () => {
  const isTablet = checkIfTablet();
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handleIn = () => {
    Animated.timing(scaleValue, {
      toValue: 1.3,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const [state, setState] = useState<stateObject>({
    colorPalette: [
      {
        color: 'Blue',
        icon: require('../../assets/png/blueSplash.png'),
        isSelected: false,
        colorCode: themeColor.themeBlue,
      },
      {
        color: 'Pink',
        icon: require('../../assets/png/pinkSplash.png'),
        isSelected: false,
        colorCode: themeColor.pink,
      },
      {
        color: 'Yellow',
        icon: require('../../assets/png/yellowSplash.png'),
        isSelected: false,
        colorCode: themeColor.gold,
      },
      {
        color: 'Red',
        icon: require('../../assets/png/redSplash.png'),
        isSelected: false,
        colorCode: themeColor.red,
      },
    ],
  });

  const {colorPalette} = state;

  const updateState = (date: any) => {
    setState((previouState: any) => {
      return {...previouState, ...date};
    });
  };

  const selectColors = (index: number) => {
    let colorList: colorPaletteType[] = [...colorPalette];
    memoryQue.unshift(index);
    if (memoryQue.length === 3) {
      memoryQue.pop();
    }
    colorPalette.map(colorIndex => {
      colorList[colorIndex].isSelected = false;
    });
    memoryQue.map(item => {
      colorList[item].isSelected = true;
    });
    console.log(colorList, 'colorList1234');
    updateState({colorPalette: colorList});
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
      <View
        style={[
          styles.scrollView,
          // eslint-disable-next-line react-native/no-inline-styles
          isTablet && {maxWidth: verticalScale(300), borderWidth: 0},
        ]}>
        {colorPalette.map((value, index) => {
          return (
            <Pressable
              style={styles.colorView}
              onPress={() => {
                selectColors(index);
                handleIn();
              }}>
              {value.isSelected && (
                <RNTextComponent style={styles.colorName} isSemiBold>
                  {value.color}
                </RNTextComponent>
              )}
              <Animated.Image
                source={value.icon}
                style={[
                  {
                    height: value.isSelected
                      ? verticalScale(130)
                      : verticalScale(110),
                    width: value.isSelected
                      ? verticalScale(132)
                      : verticalScale(110),
                  },
                ]}
                resizeMode="contain"
              />
              {/* <Animated.Image source={value.icon} style={[{  transform : [{scale: value.isSelected ?  scaleValue : 1}]  }  ]} resizeMode='contain' /> */}
            </Pressable>
          );
        })}
      </View>
      <View style={styles.colorInfo}>
        <View
          style={[
            styles.circle,
            {
              backgroundColor:
                colorPalette.filter(item => item.isSelected).length > 0
                  ? colorPalette.filter(item => item.isSelected)[0].colorCode
                  : themeColor.white,
            },
          ]}
        />
        <View style={[styles.mixedColor]} />
        <View
          style={[
            styles.circle,
            {
              backgroundColor:
                colorPalette.filter(item => item.isSelected).length > 1
                  ? colorPalette.filter(item => item.isSelected)[1].colorCode
                  : themeColor.white,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default RNChooseColor;
