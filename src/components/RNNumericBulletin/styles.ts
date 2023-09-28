import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  content: {
    height: verticalScale(7),
    width: scale(98),
    borderRadius: 50,
    backgroundColor: themeColor.lightGray,
  },
  circle: {
    height: verticalScale(35),
    width: verticalScale(35),
    borderRadius: 100,
    position: 'absolute',
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: themeColor.white,
    fontSize: verticalScale(25),
  },
});
