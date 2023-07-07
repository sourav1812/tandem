import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: scale(20),
  },
  profile: {
    height: verticalScale(90),
    width: verticalScale(90),
  },
  name: {
    fontSize: verticalScale(14),
    marginTop: verticalScale(8),
  },
});
