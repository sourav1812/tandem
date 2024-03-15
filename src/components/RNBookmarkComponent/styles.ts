import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '../../theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: verticalScale(140),
    maxHeight: verticalScale(190),
    borderRadius: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: scale(5),
    padding: verticalScale(2),
  },
  icon: {
    position: 'absolute',
    top: '-1%',
    right: '11%',
  },
  heading: {
    fontSize: verticalScale(14),
    color: 'rgba(2, 4, 8, 0.6)',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: verticalScale(12),
    textAlign: 'center',
  },
  imgContainer: {
    height: verticalScale(45),
    maxWidth: verticalScale(45),
    maxHeight: verticalScale(45),
    width: verticalScale(45),
    borderRadius: 72,
    backgroundColor: themeColor.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    fontSize: verticalScale(22),
  },
  text2: {
    fontSize: verticalScale(18),
    color: themeColor.white,
    marginHorizontal: verticalScale(8),
    textAlign: 'center',
  },
});
