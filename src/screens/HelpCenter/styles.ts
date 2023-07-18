import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {},
  heading: {
    marginTop: verticalScale(50),
  },
  content: {
    flex: 1,
  },
  customTab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },
  tab: {
    flex: 1,
    borderRadius: 0,
  },
  subHeading: {
    fontSize: verticalScale(20.4),
    textAlign: 'center',
  },
  scrollView: {
    marginTop: verticalScale(20),
  },
  input2: {
    width: '100%',
    marginTop: verticalScale(12),
  },
  inputText: {
    fontSize: verticalScale(13),
    flex: 1,
  },
  inputView: {
    height: verticalScale(200),
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  button: {
    // marginTop: verticalScale(30),
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    maxWidth: 362,
    bottom: '4%',
  },
  expandDetailsWrapper: {
    backgroundColor: '#F1F4F9',
    padding: verticalScale(12),
    borderRadius: 16,
    flexDirection: 'row',
    marginTop: verticalScale(14),
    width: '100%',
    justifyContent: 'space-between',
  },
  expandedText: {
    fontSize: verticalScale(12.5),
    color: '#020408',
    opacity: 0.5,
    marginTop: 10,
  },
  switchButton: {
    borderRadius: 8,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: verticalScale(35),
    width: verticalScale(35),
  },
  highlightedTab: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: themeColor.themeBlue,
  },
  tabText: {fontWeight: '600', fontSize: verticalScale(16)},
});
