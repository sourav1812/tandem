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
    top: -verticalScale(1),
    zIndex: 10,
  },
  header: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: verticalScale(20),
    width: '100%',
    top: verticalScale(42),
    zIndex: 10,
  },
});
