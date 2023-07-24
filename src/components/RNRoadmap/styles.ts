import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
  },
  button: {
    marginTop: verticalScale(42),
    alignSelf: 'flex-end',
    marginRight: 6,
  },
  roadmap: {
    flex: 1,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: verticalScale(20),
  },
  start: {
    height: verticalScale(80),
    width: verticalScale(80),
    borderRadius: 1000,
    backgroundColor: themeColor.purple,
    justifyContent: 'center',
    alignItems: 'center',
    left: scale(25),
  },
  startText: {
    fontSize: verticalScale(14),
    color: themeColor.white,
  },
  who: {
    right: scale(36),
    top: verticalScale(14),
  },
  where: {
    top: verticalScale(59),
  },
  whatThing: {
    top: verticalScale(93),
    right: scale(50),
  },
  whatHappens: {
    top: verticalScale(133),
  },
  stylecolor: {
    top: verticalScale(166),
    right: scale(38),
  },
  create: {
    top: verticalScale(208),
    left: scale(36),
  },
});
