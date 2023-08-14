import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  headingButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: '8%',
    width: '100%',
    paddingHorizontal: verticalScale(22),
    zIndex: 2,
  },
  storyContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: verticalScale(18),
    alignItems: 'center',
  },
  imageStyle: {
    borderTopLeftRadius: verticalScale(16),
    borderTopRightRadius: verticalScale(16),
  },
  slideNo: {
    fontSize: verticalScale(18),
    color: themeColor.themeBlue,
    marginHorizontal: verticalScale(12),
  },
  summary: {
    backgroundColor: themeColor.white,
    borderTopLeftRadius: verticalScale(16),
    borderTopRightRadius: verticalScale(16),
    padding: verticalScale(18),
  },
  title: {
    fontSize: verticalScale(21),
  },
  mainCharacter: {
    fontSize: verticalScale(18),
    marginTop: verticalScale(10),
  },
  characterList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  boxStyle: {
    marginRight: verticalScale(16),
  },
  content: {
    fontSize: verticalScale(14),
    marginTop: verticalScale(10),
  },
  footerButton: {
    borderRadius: 0,
    height: verticalScale(80),
    paddingTop: verticalScale(20),
    justifyContent: 'flex-start',
  },
  summaryTitle: {
    fontSize: verticalScale(18),
    color: themeColor.white,
    alignSelf: 'center',
  },
  questionView: {
    flex: 1,
    backgroundColor: themeColor.white,
    position: 'absolute',
    zIndex: 2,
    height: '100%',
    width: '100%',
  },
  headerTitle: {
    width: '60%',
    textAlign: 'center',
  },
  headerStyle: {
    marginTop: verticalScale(32),
    alignItems: 'center',
    paddingHorizontal: scale(20),
  },
  multiplechoice: {
    flex: 1,
    zIndex: 20,
  },
  tooltipTwo: {
    height: 'auto',
    width: 'auto',
  },
});
