import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: verticalScale(21.3),
    alignSelf: 'center',
    marginTop: verticalScale(50),
    textAlign: 'center',
  },
  info: {
    fontSize: verticalScale(14),
    textAlign: 'center',
    marginHorizontal: scale(40),
    marginVertical: verticalScale(12),
  },
});
