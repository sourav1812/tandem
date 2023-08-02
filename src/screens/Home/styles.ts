import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: themeColor.gold,
    marginBottom: verticalScale(40),
  },
  profilePic: {
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 200,
    backgroundColor: themeColor.white,
    width: verticalScale(89),
    zIndex: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  heading: {
    fontSize: verticalScale(16),
    textAlign: 'center',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  cardPortrait: {
    height: verticalScale(120),
    width: verticalScale(120),
  },
  headingPortrait: {
    // marginTop: verticalScale(0),
  },
  optionsPortrait: {
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueButton: {
    position: 'absolute',
    right: 24,
  },
  tooltipTwo: {
    height: 'auto',
    width: 'auto',
  },
});
