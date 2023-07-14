import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  img: {
    height: verticalScale(45),
    width: scale(200),
    alignSelf: 'center',
    marginTop: verticalScale(130),
  },
  heading: {
    fontSize: scale(19),
    textAlign: 'center',
    color: themeColor.themeBlue,
    marginVertical: verticalScale(6),
  },
  button: {
    marginTop: verticalScale(20),
  },
  or: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(18),
  },
  line: {
    borderTopWidth: 1,
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontSize: scale(14),
  },
  signup: {
    color: themeColor.themeBlue,
    fontSize: scale(14),
  },
});
