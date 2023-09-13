import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import Svg, {Path} from 'react-native-svg';

function SvgComponent({onPress}: {onPress: () => void}) {
  return (
    <Pressable onPress={onPress} style={styles.svg}>
      <Svg
        width={verticalScale(20)}
        height={verticalScale(20)}
        viewBox="0 0 16 16"
        fill="none">
        <Path d="M12 8H4" stroke="#4285F6" strokeLinecap="round" />
      </Svg>
    </Pressable>
  );
}

export default SvgComponent;

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    backgroundColor: '#F1F4F9',
    borderRadius: verticalScale(5),
    overflow: 'hidden',
  },
});
