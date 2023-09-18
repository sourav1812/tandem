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
  button: {
    alignSelf: 'center',
    width: '100%',
  },
  inputText: {
    fontSize: verticalScale(13),
    width: '100%',
  },
});
