import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '../../theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(22),
    backgroundColor: themeColor.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: verticalScale(44),
  },
  logo: {
    height: verticalScale(32),
    width: scale(120),
    marginRight: scale(58),
  },
  heading: {
    alignSelf: 'center',
    marginTop: verticalScale(30),
  },
  content: {
    marginTop: verticalScale(18),
    flex: 1,
    paddingBottom: verticalScale(30),
  },
  add: {
    alignItems: 'center',
    paddingTop: verticalScale(26),
    paddingHorizontal: scale(5),
  },
  addText: {
    marginTop: verticalScale(42),
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  add2: {
    alignItems: 'center',
    paddingTop: verticalScale(14),
    paddingHorizontal: scale(5),
  },
});
