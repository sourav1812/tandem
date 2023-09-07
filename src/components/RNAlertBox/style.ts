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
    fontSize: verticalScale(21),
    textAlign: 'center',
    color: themeColor.black,
  },
  info: {
    textAlign: 'center',
    fontSize: verticalScale(14),
    marginTop: 10,
  },
  possibleResolution: {
    textAlign: 'center',
    fontSize: verticalScale(12),
    color: themeColor.themeBlue,
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
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
    marginHorizontal: verticalScale(10),
  },
});
