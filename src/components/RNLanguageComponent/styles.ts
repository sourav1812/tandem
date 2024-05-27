import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '../../theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(5),
    paddingBottom: verticalScale(2),
    paddingHorizontal: verticalScale(16),
    marginHorizontal: verticalScale(20),
    borderRadius: 14,
    backgroundColor: themeColor.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: verticalScale(23),
  },
  label: {
    fontSize: verticalScale(14),
  },
});
