import {StyleSheet} from 'react-native';
import themeColor from '../../theme/themeColor';
import { verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: '#F1F4F9',
    justifyContent: 'center',
    alignItems: 'center',
    height : verticalScale(36),
    width : verticalScale(36),
  },
  text: {
    fontSize: 24,
    color: themeColor.themeBlue,
  },
});
