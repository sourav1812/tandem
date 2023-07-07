import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '../../theme/themeColor';

export const styles = StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  container: {
    marginRight: verticalScale(20),
    marginTop: verticalScale(50),
    backgroundColor: themeColor.white,
    borderRadius: verticalScale(4),
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  menu: {
    width: verticalScale(170),
    borderWidth: 1,
    borderColor: themeColor.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  text: {
    fontSize: verticalScale(12),
  },
});
