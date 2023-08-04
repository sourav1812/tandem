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
    width: '100%',
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
    resizeMode: 'contain',
    zIndex: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(36),
  },
  secondColor: {
    transform: [
      {translateY: -verticalScale(54)},
      {translateX: verticalScale(34)},
    ],
  },
  tooltip: {
    textAlign: 'center',
    fontSize: verticalScale(16),
    marginTop: 10,
  },
});
