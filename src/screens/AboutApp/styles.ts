import {StyleSheet} from 'react-native';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: themeColor.white,
    paddingHorizontal: scale(21),
  },
  img: {
    height: verticalScale(67),
    width: scale(210),
    alignSelf: 'center',
    marginTop: verticalScale(10),
  },
  license: {
    fontSize: verticalScale(11.5),
    textAlign: 'center',
    color: 'rgba(2, 4, 8, 0.6)',
  },
  header: {
    alignItems: 'center',
    marginTop: verticalScale(42),
  },
  version: {
    fontSize: verticalScale(13),
    textAlign: 'center',
  },
});
