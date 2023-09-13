import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  bgc: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(48),
  },
  icon: {
    alignSelf: 'center',
    marginTop: verticalScale(60),
  },
  content: {
    fontSize: scale(17),
    textAlign: 'center',
    marginTop: verticalScale(18),
  },
  para: {
    fontSize: scale(14.5),
    textAlign: 'center',
    marginTop: verticalScale(6),
    paddingHorizontal: scale(25),
  },
});
