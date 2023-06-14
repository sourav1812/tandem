import {StyleSheet} from 'react-native';
import themeColor from '../../theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: themeColor.lightGray,
    borderRadius: 16,
  },
  img: {
    height: 126,
    width: 108,
    borderRadius: 16,
  },
  right: {
    marginLeft: 13,
    width: '58%',
  },
  heading: {
    fontSize: 20,
  },
  date: {
    fontSize: 14,
    marginVertical: 4,
  },
  progressContainer: {
    height: 9,
    width: '100%',

    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: themeColor.white,
  },
  progress: {
    backgroundColor: themeColor.gold,
    flexDirection: 'row',
    height: 9,
    width: '70%',
  },
});
