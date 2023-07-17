import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    height: verticalScale(134),
    width: verticalScale(134),

    backgroundColor: themeColor.lightGray,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
});
