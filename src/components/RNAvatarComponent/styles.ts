import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    height: verticalScale(124),
    width: verticalScale(124),

    backgroundColor: themeColor.lightGray,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
});
