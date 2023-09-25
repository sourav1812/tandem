import {StyleSheet} from 'react-native';
import themeColor from '../../theme/themeColor';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    height: verticalScale(120),
    width: verticalScale(120),
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor.lightGray,
    padding: verticalScale(14),
  },
  heading: {
    color: themeColor.white,
    textAlign: 'center',
  },
  emoji: {
    fontSize: verticalScale(45),
    fontFamily: 'Poppins-Bold',
  },
  svgIcon: {
    height: verticalScale(55),
    width: verticalScale(55),
  },
});
