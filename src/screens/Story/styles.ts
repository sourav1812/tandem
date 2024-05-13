import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poster: {
    height: '48%',
    width: '100%',
  },
  scrollView: {
    width: '100%',
    maxHeight: '60%',
    minHeight: '45%',
    borderTopLeftRadius: verticalScale(16),
    borderTopRightRadius: verticalScale(16),
    marginTop: 'auto',
    marginBottom: verticalScale(60),
    backgroundColor: themeColor.white,
  },
  midContent: {
    top: -verticalScale(30),
    zIndex: 20,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: scale(20),
  },
  rating: {
    height: verticalScale(60),
    width: verticalScale(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 72,
    backgroundColor: themeColor.lightGray,
  },
  emoji: {
    fontSize: verticalScale(40),
    color: themeColor.white,
  },
  new: {
    fontSize: verticalScale(20),
    color: themeColor.white,
  },
  duration: {
    borderRadius: verticalScale(26),
    backgroundColor: themeColor.purple,
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(6),
  },
  scrollContainer: {
    paddingVertical: verticalScale(35),
    paddingHorizontal: verticalScale(18),
    paddingBottom: verticalScale(30),
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    marginLeft: scale(10),
    fontSize: verticalScale(12),
  },
  heading: {
    fontSize: verticalScale(21),
    marginTop: verticalScale(8),
  },
  story: {
    fontSize: verticalScale(14),
    marginTop: verticalScale(14),
  },
  button: {
    borderRadius: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: verticalScale(60),
    maxHeight: verticalScale(60),
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: verticalScale(21),
    position: 'absolute',
    top: verticalScale(44),
    zIndex: 3,
    width: '100%',
  },
  menuItem: {
    height: verticalScale(26),
    paddingRight: 0,
  },
  menuBox: {
    width: verticalScale(150),
    marginRight: verticalScale(22),
  },
  menu: {
    backgroundColor: 'yellow',
    width: verticalScale(170),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: verticalScale(8),
  },
  text: {
    fontSize: verticalScale(16),
  },
});
