import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttons: {
    height: verticalScale(40),
    width: verticalScale(40),
    borderRadius: verticalScale(20),
    marginHorizontal: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContent: {
    fontSize: verticalScale(12),
  },
});
