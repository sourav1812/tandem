import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '../../theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 2,
    paddingHorizontal: verticalScale(16),
    marginHorizontal: verticalScale(20),
    borderRadius: 14,
    backgroundColor: themeColor.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    fontSize: 28,
  },
  label: {
    fontSize: verticalScale(14),
  },
});
