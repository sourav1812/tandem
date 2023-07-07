import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '../../theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: verticalScale(134),
    width: verticalScale(134),
    maxHeight: 190,
    maxWidth: 190,
    borderRadius: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: '-2%',
    right: '10%',
  },
  heading: {
    fontSize: 16,
    color: 'rgba(2, 4, 8, 0.6)',
  },
  subHeading: {
    fontSize: 14,
    letterSpacing: 0,
    marginTop: verticalScale(4),
  },
  imgContainer: {
    height: verticalScale(45),
    maxWidth: 47,
    maxHeight: 47,
    width: verticalScale(45),
    borderRadius: 72,
    backgroundColor: themeColor.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: verticalScale(28),
    width: verticalScale(28),
  },
  text2: {
    fontSize: verticalScale(18),
    color: themeColor.white,
    marginHorizontal: verticalScale(18),
    textAlign: 'center',
    letterSpacing: 0,
  },
});
