import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: `100%`,
  },
  img: {
    padding: scale(10),
    borderRadius: scale(16),
  },
  footer: {
    position: 'absolute',
    backgroundColor: themeColor.white,
    width: '100%',
    paddingHorizontal: scale(22),
  },
  heading: {
    marginTop: verticalScale(20),
    fontSize: 25,
    textAlign: 'center',
  },
  content: {
    padding: scale(10),
    fontSize: verticalScale(13),
    textAlign: 'center',
  },
  button: {
    marginTop: verticalScale(25),
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    height: verticalScale(6),
    width: verticalScale(6),
    backgroundColor: themeColor.lightGray,
    marginHorizontal: 5,
    borderRadius: 100,
  },
});
