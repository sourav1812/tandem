import {StyleSheet} from 'react-native';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(50),
    paddingHorizontal: scale(20),
  },
  heading: {
    fontSize: scale(18),
  },
  questionNumber: {
    fontSize: scale(18),

    color: themeColor.themeBlue,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(16),
  },
  indicator: {
    height: verticalScale(10),
    width: scale(48),
    borderRadius: verticalScale(8),
    backgroundColor: 'rgba(66, 133, 246, 0.5)',
  },
  question: {
    fontSize: verticalScale(22),
    textAlign: 'center',
    marginTop: verticalScale(14),
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionsCustom: {
    height: verticalScale(132),
    width: verticalScale(132),
    marginTop: verticalScale(20),
  },
  subHeading: {
    fontSize: verticalScale(14),
    textAlign: 'center',
  },
  colorName: {
    position: 'absolute',
    zIndex: 3,
    borderWidth: 1,
    borderColor: 'transparent',
    fontSize: verticalScale(18),
    color: themeColor.white,
  },
  colorView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  colorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop : verticalScale(10)
    position: 'absolute',
    bottom: '5%',
    alignSelf: 'center',
    width: '100%',
  },
  circle: {
    height: verticalScale(65),
    width: verticalScale(65),
    borderWidth: 2,
    borderColor: themeColor.themeBlue,
    borderRadius: verticalScale(72),
  },
  mixedColor: {
    height: verticalScale(65),
    width: scale(150),
    borderRadius: verticalScale(50),
    borderWidth: 2,
    borderColor: themeColor.themeBlue,
  },
  picView: {
    flex: 1,
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  addImage: {
    height: verticalScale(190),
    width: scale(265),
  },
  yesOrNo: {
    fontSize: verticalScale(20),
    marginTop: verticalScale(20),
  },
  buttonStyle: {
    height: verticalScale(90),
    width: verticalScale(100),
  },
  camera: {
    position: 'absolute',
    top: '6%',
    right: '5%',
    zIndex: 3,
  },
  img: {
    height: verticalScale(120),
    width: verticalScale(120),
    // marginRight : verticalScale(30)
  },
  isSelected: {
    height: verticalScale(140),
    width: verticalScale(140),
    // marginRight : verticalScale(30)
  },
});
