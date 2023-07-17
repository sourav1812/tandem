import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
    paddingHorizontal: scale(21),
  },
  button: {
    marginTop: verticalScale(40),
    alignSelf: 'flex-end',
  },
  customTab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(5),
  },
  tab: {
    flex: 1,
    borderRadius: 0,
  },
  profile: {
    backgroundColor: themeColor.lightGreen,
    height: verticalScale(64),
    width: verticalScale(64),
    borderRadius: 72,
    alignSelf: 'center',
    marginTop: verticalScale(18),
  },
  name: {
    fontSize: verticalScale(17),
    textAlign: 'center',
    marginTop: 8,
  },
  menu: {
    marginTop: verticalScale(13),
  },
});
