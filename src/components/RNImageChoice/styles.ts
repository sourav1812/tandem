import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  scrollView: {
    flex: 1,
  },

  optionsCustom: {
    margin: scale(10),
  },

  illustration: {
    height: verticalScale(126),
    width: verticalScale(126),
    borderRadius: 16,
    margin: scale(13),
    backgroundColor: themeColor.lightGray,
  },
});
