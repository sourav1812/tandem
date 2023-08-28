import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
    justifyContent: 'center',
  },
  img: {
    height: verticalScale(280),
  },
});
