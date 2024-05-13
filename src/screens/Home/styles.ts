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
    height: verticalScale(140),
    width: verticalScale(140),
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
    marginBottom: 8,
    zIndex: 2,
  },
  tooltipUserName: {
    marginTop: 5,
    position: 'absolute',
    bottom: -verticalScale(10),
    fontSize: verticalScale(16),
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
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
  },
  curvedViewHeaderRight: {
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
  accountbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
  },
  dot: {
    backgroundColor: themeColor.gold,
    height: scale(12),
    width: scale(12),
    padding: scale(2),
    borderRadius: scale(8),
  },
});
