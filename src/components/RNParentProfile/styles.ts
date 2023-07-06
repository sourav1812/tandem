import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: scale(20),
  },
  profile: {
    height: verticalScale(95),
    width: verticalScale(95),
  },
  name: {
    fontSize: verticalScale(14),
    marginTop: verticalScale(8),
  },
});
