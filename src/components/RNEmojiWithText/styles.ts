import {StyleSheet} from 'react-native';
import themeColor from '../../theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    height: 130,
    width: 130,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor.themeBlue,
  },
  heading: {
    fontSize: 22,
    color: themeColor.white,
  },
  emoji: {
    fontSize: 45,
  },
});
