import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  profile: {
    height: verticalScale(60),
    width: verticalScale(60),
  },
  name: {
    fontSize: verticalScale(14),
    marginTop: verticalScale(8),
  },
});
