import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: verticalScale(14),
  },
  text: {
    fontSize: verticalScale(13),
    marginLeft: 16,
    marginTop: -4,
  },
  optional: {
    color: '#808080',
    fontSize: verticalScale(9),
  },
});
