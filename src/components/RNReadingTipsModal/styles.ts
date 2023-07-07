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
    alignItems: 'center',
    backgroundColor: themeColor.white,
    borderRadius: verticalScale(16),
  },
  tick: {
    height: verticalScale(130),
    width: verticalScale(130),
  },
  heading: {
    fontSize: verticalScale(21),
    textAlign: 'center',
    color: themeColor.black,
  },
  info: {
    textAlign: 'center',
    fontSize: verticalScale(14),
  },
  button: {
    marginTop: verticalScale(14),
    width: '100%',
  },
});
