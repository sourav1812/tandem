import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  question: {
    fontSize: verticalScale(22),
    textAlign: 'center',
    marginTop: verticalScale(14),
  },
  subHeading: {
    fontSize: verticalScale(15),
    textAlign: 'center',
  },
  colorView: {
    alignItems: 'center',
    minWidth: '50%',
    height: verticalScale(250),
    justifyContent: 'center',
    marginTop: verticalScale(35),
    // borderWidth: 1,
  },
  colorPair: {
    height: verticalScale(270),
    justifyContent: 'space-between',
    position: 'absolute',
  },
  colorPatch: {
    marginRight: scale(33),
    marginTop: verticalScale(48),
    zIndex: 10,
    position: 'absolute',
    flexDirection: 'row',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(36),
    flexWrap: 'wrap',
    flex: 1,
  },
  secondColor: {
    transform: [
      {translateX: verticalScale(-14)},
      {rotate: `${Math.random() * 180}deg`},
    ],
  },
  tooltip: {
    marginLeft: 60,
    fontSize: verticalScale(16),
  },
});
