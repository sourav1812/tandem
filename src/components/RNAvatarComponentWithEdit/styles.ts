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
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: verticalScale(12),
  },
  img: {
    height: verticalScale(124),
    width: verticalScale(124),
    borderRadius: 1000,
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    right: 25,
    bottom: 22,
    // backgroundColor: 'rgba(255,255,255, 0.7)',
    // borderRadius: 8,
  },
});
