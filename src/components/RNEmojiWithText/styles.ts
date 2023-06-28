import {StyleSheet} from 'react-native';
import themeColor from '../../theme/themeColor';
import { verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    height: verticalScale(120),
    width: verticalScale(120),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor.lightGray,
    padding : verticalScale(14)
  },
  heading: {
    fontSize: verticalScale(17),
    color: themeColor.white,
    textAlign : 'center',
  },
  emoji: {
    fontSize: verticalScale(38),
    fontFamily : 'Poppins-Bold',
  },
});
