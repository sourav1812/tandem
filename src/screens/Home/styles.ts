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
  },
  profilePic: {
    position: 'absolute',
    bottom: -verticalScale(26),
    borderRadius: 200,
    borderWidth: 1,
    padding: 10,
    borderColor: themeColor.white,
    backgroundColor: themeColor.white,
    height: verticalScale(89),
    width: verticalScale(89),
    zIndex: 5,
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
    justifyContent: 'space-around',
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
});
