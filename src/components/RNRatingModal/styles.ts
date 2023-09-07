import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '../../theme/themeColor';

export const styles = StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    minWidth: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: verticalScale(12),
  },
  rateView: {
    height: verticalScale(35),
    width: verticalScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 72,
  },
  emoji: {
    fontSize: verticalScale(18),
  },
});
