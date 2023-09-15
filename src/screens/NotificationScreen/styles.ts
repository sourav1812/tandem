import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  bgc: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  icon: {
    alignSelf: 'center',
  },
  content: {
    fontSize: scale(14),
    textAlign: 'center',
    marginTop: verticalScale(18),
  },
  para: {
    fontSize: scale(11.5),
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: scale(25),
  },
});
