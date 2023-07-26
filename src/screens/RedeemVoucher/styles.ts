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
    marginTop: verticalScale(44),
    alignItems: 'center',
  },
  subHeading: {
    fontSize: verticalScale(14),
    textAlign: 'center',
    marginTop: verticalScale(22),
  },
  qr: {
    height: verticalScale(280),
    width: verticalScale(280),
    alignSelf: 'center',
    marginTop: verticalScale(8),
  },
  seperation: {
    flexDirection: 'row',
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
    position: 'absolute',
    bottom: '3%',
    width: '100%',
    alignSelf: 'center',
  },
  inputContainer: {
    marginTop: verticalScale(15),
  },
  inputView: {
    borderWidth: 1.5,
    borderColor: themeColor.lightGray,
    paddingRight: scale(13),
  },
});
