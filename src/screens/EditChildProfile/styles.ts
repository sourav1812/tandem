import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
    paddingHorizontal: scale(21),
  },
  text: {
    fontSize: verticalScale(18),
  },
  heading: {
    marginTop: verticalScale(50),
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginTop: verticalScale(8),
  },
  input: {
    marginTop: verticalScale(14),
  },
  inputBox: {
    backgroundColor: themeColor.input,
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
  dropdownBox: {marginBottom: 4, marginTop: verticalScale(14)},
  label: {
    fontSize: verticalScale(13),
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

    borderRadius: 1000,
    alignSelf: 'center',
  },
  date: {
    backgroundColor: themeColor.lightGray,
    height: verticalScale(55),
  },
});
