import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: verticalScale(21),
    paddingTop: verticalScale(52),
    backgroundColor: themeColor.white,
  },
  backButton: {
    borderWidth: 1,
  },
  heading: {
    fontSize: verticalScale(19),
    marginTop: verticalScale(28),
  },
  scrollViewParent: {
    flex: 1,
    paddingBottom: verticalScale(21),
    alignSelf: 'center',
    width: scale(300),
  },
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  players: {
    height: verticalScale(130),
    width: verticalScale(130),
    borderRadius: verticalScale(14),
    marginTop: verticalScale(16),
  },
});
