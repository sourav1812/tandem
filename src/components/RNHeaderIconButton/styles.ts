import {StyleSheet} from 'react-native';
import themeColor from '../../theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: '#F1F4F9',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    color: themeColor.themeBlue,
  },
});
