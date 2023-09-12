import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

export const styles = StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    marginHorizontal: verticalScale(20),
    padding: verticalScale(20),
    backgroundColor: themeColor.white,
    borderRadius: verticalScale(16),
  },
  heading: {
    fontSize: verticalScale(18),
    textAlign: 'center',
    color: themeColor.black,
  },
  info: {
    textAlign: 'center',
    fontSize: verticalScale(14),
    marginHorizontal: verticalScale(25),
    marginTop: 14,
  },
  button: {
    marginTop: verticalScale(14),
    width: '100%',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(16),
    justifyContent: 'space-between',
  },
  button2: {
    width: verticalScale(110),
  },
});
