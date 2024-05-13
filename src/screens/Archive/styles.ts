import {Platform, StyleSheet} from 'react-native';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  bookshelfHeaderText: {
    alignSelf: 'center',
    fontSize: verticalScale(22),
    color: themeColor.white,
  },
  bottomViewContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: verticalScale(17),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: themeColor.white,
  },
  searchBoxContainerStyle: {
    alignSelf: 'center',
    width: '90%',
  },
  searchBoxInputStyle: {
    width: '85%',
    alignSelf: 'center',
  },
  listEmptyComponentContainer: {
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: verticalScale(50),
  },
  listEmptyComponentEmogiContainer: {
    width: verticalScale(50),
    height: verticalScale(50),
    borderRadius: 100,
    backgroundColor: '#F1F4F9',
    alignItems: 'center',
    paddingLeft: Platform.OS === 'ios' ? 0 : 0.8,
    justifyContent: 'center',
  },
  listEmptyComponentEmoji: {fontSize: verticalScale(30)},
  nothingToSeeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: verticalScale(14),
    marginTop: verticalScale(10),
  },
  whyDontWriteStory: {
    fontFamily: 'Poppins-Regular',
    fontSize: verticalScale(12),
    textAlign: 'center',
    marginTop: verticalScale(10),
    marginBottom: verticalScale(20),
  },
  flatListContatiner: {},
  flatListContentContainer: {
    marginTop: verticalScale(20),
    paddingHorizontal: verticalScale(16),
    paddingBottom: 50,
  },
  heading: {
    fontSize: verticalScale(14),
    marginBottom: verticalScale(8),
  },
  headingView: {
    marginTop: verticalScale(45),
    marginBottom: verticalScale(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spaces: {
    flex: 1,
  },
  button: {
    marginRight: verticalScale(20),
    marginBottom: 10,
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
    padding: 5,
    borderRadius: scale(8),
  },
});
