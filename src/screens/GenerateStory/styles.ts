import {StyleSheet} from 'react-native';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
    paddingHorizontal: scale(20),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(40),
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
    fontSize: verticalScale(21),
    textAlign: 'center',
    marginTop: verticalScale(14),
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  optionsCustom: {
    height: verticalScale(132),
    width: verticalScale(132),
    marginTop: verticalScale(20),
  },
  footerButton: {
    borderRadius: 0,
    height: verticalScale(80),
    paddingTop: verticalScale(25),
    justifyContent: 'flex-start',
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
    width: verticalScale(190),
    borderRadius: 200,
  },
  yesOrNo: {
    fontSize: verticalScale(20),
    marginTop: verticalScale(20),
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(250),
    justifyContent: 'space-between',
    marginTop: verticalScale(16),
  },
  buttonStyle: {
    height: verticalScale(90),
    width: verticalScale(90),
    maxHeight: verticalScale(80),
  },
  camera: {
    position: 'absolute',
    top: '8%',
    right: '26%',
    zIndex: 3,
    height: verticalScale(25),
    width: scale(22),
    borderRadius: 12,
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
  buttonText: {
    fontSize: verticalScale(16),
  },
  illustration: {
    height: verticalScale(126),
    width: verticalScale(126),
    borderRadius: 16,
    marginTop: verticalScale(18),
  },
  tooltip: {
    textAlign: 'center',
    fontSize: verticalScale(16),
    marginTop: 10,
  },
  YesbuttonText: {
    fontSize: verticalScale(20),
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
