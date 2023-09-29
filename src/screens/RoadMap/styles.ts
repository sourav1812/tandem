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
    zIndex: 1,
  },
  startText: {
    color: themeColor.white,
  },
  who: {
    position: 'absolute',
    borderRadius: 1000,
    zIndex: 2,
  },
  where: {
    position: 'absolute',
    borderRadius: 1000,
    zIndex: 3,
  },
  whatThing: {
    position: 'absolute',
    borderRadius: 1000,
    zIndex: 4,
  },
  whatHappens: {
    position: 'absolute',
    borderRadius: 1000,
    zIndex: 5,
  },
  stylecolor: {
    position: 'absolute',
    borderRadius: 1000,
    zIndex: 6,
  },
  create: {
    zIndex: 10,
    borderRadius: 1000,
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
