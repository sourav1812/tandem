import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
    paddingHorizontal: scale(21),
    paddingTop: 0,
  },
  text: {
    fontSize: verticalScale(18),
  },
  heading: {
    marginTop: verticalScale(44),
    alignItems: 'center',
  },
  subHeading: {
    fontSize: verticalScale(14),
    textAlign: 'center',
    marginTop: verticalScale(22),
  },
  qr: {
    height: verticalScale(150),
    width: verticalScale(150),
    alignSelf: 'center',
    marginTop: verticalScale(8),
  },
  seperation: {
    alignItems: 'center',
    marginTop: verticalScale(16),
  },
  line: {
    borderWidth: 1,
    borderColor: themeColor.lightGray,
    flex: 1,
  },
  or: {
    marginHorizontal: 8,
  },
  button: {
    width: '100%',
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: verticalScale(10),
  },
  inputView: {
    borderWidth: 1.5,
    borderColor: themeColor.lightGray,
    paddingRight: scale(13),
  },
});
