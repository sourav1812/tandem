import {Platform, StyleSheet} from 'react-native';
import themeColor from '../../theme/themeColor';
import { verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: themeColor.themeBlue,
  },
  bookshelfHeaderText: {
    alignSelf: 'center',
    marginTop: verticalScale(70),
    fontSize: verticalScale(22),
    color: themeColor.white,
    marginBottom  : verticalScale(14)
  },
  bottomViewContainer: {
    height: '82%',
    flexDirection: 'column',
    marginTop: verticalScale(17) ,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: themeColor.white,
  },
  searchBoxContainerStyle: {
    width: '90%',
  },
  searchBoxInputStyle: {
    width: '85%',
  },
  listEmptyComponentContainer: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmptyComponentEmogiContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: '#F1F4F9',
    alignItems: 'center',
    paddingLeft: Platform.OS === 'ios' ? 0 : 0.8,
    justifyContent: 'center',
  },
  listEmptyComponentEmoji: {fontSize: 30},
  nothingToSeeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 11,
  },
  whyDontWriteStory: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 25,
  },
  flatListContatiner: {
    marginBottom: verticalScale(62),
  },
  flatListContentContainer: {marginTop: verticalScale(20), marginBottom: verticalScale(25), paddingHorizontal : verticalScale(16)},
  heading : {
    fontSize : verticalScale(14),
    marginBottom : verticalScale(8)
  }
});
