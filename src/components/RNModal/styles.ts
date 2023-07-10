import {Dimensions, StyleSheet} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  offset: {
    flex: 1,
  },
});
