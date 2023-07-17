import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: themeColor.lightGray,
    padding: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: verticalScale(13),
  },
});
