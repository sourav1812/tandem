import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sides: {
    flex: 1,
  },
  img: {
    height: verticalScale(30),
    width: scale(110),
  },
  header: {
    fontSize: verticalScale(20),
  },
});
