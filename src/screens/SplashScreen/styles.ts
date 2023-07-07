import {StyleSheet} from 'react-native';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor.white,
  },
  img: {
    height: verticalScale(67),
    width: scale(210),
  },
  license: {
    fontSize: verticalScale(10),
    position: 'absolute',
    bottom: '4%',
  },
});
