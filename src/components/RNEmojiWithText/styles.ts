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
  },
  heading: {
    fontSize: 22,
    color: themeColor.white,
    textAlign : 'center',
  },
  emoji: {
    fontSize: 50,
  },
});
