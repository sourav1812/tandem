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
  tooltipText: {
    textAlign: 'center',
    fontSize: verticalScale(16),
    marginTop: 10,
  },
  tooltipUserWrapper: {
    height: verticalScale(89),
    width: verticalScale(89),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  tooltipUserImage: {
    height: verticalScale(59),
    width: verticalScale(59),
    borderRadius: 100,
  },
  tooltipUserName: {
    marginTop: 5,
    position: 'absolute',
    bottom: -verticalScale(10),
    fontSize: verticalScale(18),
  },
  curveViewHeaderWrapper: {
    width: '100%',
    backgroundColor: 'transparent',
    height: verticalScale(23),
    position: 'absolute',
    bottom: -verticalScale(17),
    justifyContent: 'space-between',
    flexDirection: 'row',
    zIndex: 50,
  },
  curvedViewHeaderLeft: {
    backgroundColor: themeColor.gold,
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
  },
  curvedViewHeaderRight: {
    backgroundColor: themeColor.gold,
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
  },
  changeChildWrapper: {
    height: verticalScale(89),
    width: verticalScale(89),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(15),
  },
  changeChildImage: {
    height: verticalScale(59),
    width: verticalScale(59),
    borderRadius: 100,
  },
});
