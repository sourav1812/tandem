import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  img: {
    height: verticalScale(90),
    width: verticalScale(90),
    borderRadius: verticalScale(12),
  },
  title: {
    fontSize: verticalScale(12),
    marginTop: verticalScale(8),
  },
});
