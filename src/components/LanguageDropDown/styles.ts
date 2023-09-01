import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  dropdownBox: {
    marginBottom: 4,
    marginTop: verticalScale(14),
  },
  label: {
    fontSize: verticalScale(13),
  },
  dropdown: {
    backgroundColor: themeColor.input,
    borderRadius: 12,
    paddingHorizontal: verticalScale(16),
    paddingVertical: verticalScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerButton: {
    position: 'absolute',
    bottom: '2%',
    alignSelf: 'center',
    width: '100%',
  },
  button: {
    width: '100%',
  },
  bottom: {
    color: themeColor.red,
    textAlign: 'center',
    marginTop: verticalScale(24),
  },
  profile: {
    height: verticalScale(77),
    width: verticalScale(77),
    marginTop: verticalScale(22),
    // marginBottom: verticalScale(13),
    backgroundColor: themeColor.gold,
    borderRadius: 1000,
    alignSelf: 'center',
  },
});
