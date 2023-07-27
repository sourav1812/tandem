import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: `100%`,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: themeColor.white,
    width: '100%',
    paddingHorizontal: scale(22),
    paddingVertical: verticalScale(20),
    borderTopLeftRadius: verticalScale(12),
    borderTopRightRadius: verticalScale(12),
  },
  heading: {
    fontSize: scale(22),
    textAlign: 'center',
  },
  content: {
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
    marginTop: verticalScale(16),
  },
  inactive: {
    height: verticalScale(6),
    width: verticalScale(6),
    backgroundColor: themeColor.lightGray,
    marginHorizontal: 5,
    borderRadius: 100,
  },
});
