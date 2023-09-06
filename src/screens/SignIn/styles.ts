import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  heading: {
    fontSize: verticalScale(21.3),
    alignSelf: 'center',
    marginTop: verticalScale(30),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(21),
    marginTop: verticalScale(37),
  },
  input: {
    width: '100%',
    marginTop: verticalScale(18),
  },
  input2: {
    width: '100%',
    marginTop: verticalScale(12),
  },
  form: {
    paddingHorizontal: verticalScale(21),
  },
  button: {
    marginTop: verticalScale(21),
    height: verticalScale(50),
  },
  text: {
    color: themeColor.black,
  },
  bottomOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: verticalScale(12),
  },
  option: {
    borderWidth: 1,
    borderColor: themeColor.themeBlue,
    borderRadius: 16,
    paddingHorizontal: scale(31),
    paddingVertical: scale(13),
  },
  buttonText: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontSize: scale(12),
  },
  signup: {
    color: themeColor.themeBlue,
    fontSize: scale(12),
  },
  inputText: {
    fontSize: verticalScale(13),
    width: '100%',
  },
  line: {
    borderWidth: 0.6,
    flex: 0.45,
    borderColor: themeColor.lightGray,
  },
  continueDesign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(22),
  },
  forgotPassword: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 6,
  },
});
