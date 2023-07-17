import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  content: {
    height: verticalScale(6),
    width: scale(98),
    borderRadius: 50,
    backgroundColor: themeColor.lightGray,
  },
  circle: {
    height: verticalScale(25),
    width: verticalScale(25),
    borderRadius: 100,
    position: 'absolute',
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: themeColor.white,
  },
});
