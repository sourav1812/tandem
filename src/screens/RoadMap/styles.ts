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
    marginRight: scale(20),
  },
  roadmap: {
    flex: 1,
    alignItems: 'center',
  },
  start: {
    position: 'absolute',
    borderRadius: 100,
    backgroundColor: themeColor.purple,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  startText: {
    color: themeColor.white,
  },
  who: {
    position: 'absolute',
  },
  where: {
    position: 'absolute',
  },
  whatThing: {
    position: 'absolute',
  },
  whatHappens: {
    position: 'absolute',
  },
  stylecolor: {
    position: 'absolute',
  },
  create: {
    top: -verticalScale(80),
    zIndex: 10,
  },
});
