import {Dimensions, StyleSheet} from 'react-native';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: `100%`,
  },
  img: {
    height: height,
    width: width,
  },
});
