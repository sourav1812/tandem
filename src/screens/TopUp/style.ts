import {StyleSheet} from 'react-native';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  info: {
    borderRadius: 16,
    width: '100%',
    backgroundColor: themeColor.lightGray,
    padding: 16,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: themeColor.lightGray,
  },
  about: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  button: {
    minWidth: scale(180),
    width: '100%',
  },
});
