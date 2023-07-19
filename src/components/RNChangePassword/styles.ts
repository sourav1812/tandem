import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor.white,
    height: '100%',
    width: '100%',
  },
  heading: {
    fontSize: verticalScale(18),
    marginTop: verticalScale(16),
  },
  content: {
    fontSize: verticalScale(13),
    marginTop: verticalScale(10),
    marginHorizontal: 40,
    textAlign: 'center',
  },
  logo: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '88%',
    marginTop: verticalScale(20),
  },
});
