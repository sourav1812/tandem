import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
    paddingLeft: scale(20),
  },
  button: {
    marginTop: verticalScale(42),
    alignSelf: 'flex-end',
    marginRight: scale(20),
  },
  roadmap: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: verticalScale(20),
  },
  start: {
    height: verticalScale(80),
    width: verticalScale(80),
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: themeColor.purple,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: verticalScale(40),
  },
  startText: {
    fontSize: verticalScale(14),
    color: themeColor.white,
  },
  who: {
    position: 'absolute',
    bottom: verticalScale(105),
    left: scale(15),
  },
  where: {
    position: 'absolute',
    bottom: verticalScale(195),
  },
  whatThing: {
    position: 'absolute',
    bottom: verticalScale(280),
    left: scale(0),
  },
  whatHappens: {
    position: 'absolute',
    bottom: verticalScale(368),
  },
  stylecolor: {
    position: 'absolute',
    bottom: verticalScale(456),
    left: scale(18),
  },
  create: {
    position: 'absolute',
    bottom: verticalScale(516),
    left: scale(106),
  },
});
