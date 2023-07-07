import {Dimensions, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

export const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
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
    height: verticalScale(400),
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
  },
});
