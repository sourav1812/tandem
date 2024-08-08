import {StyleSheet} from 'react-native';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  about: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: scale(289),
    alignItems: 'center',
    marginBottom: 50,
    gap: 10,
  },
  button: {
    minWidth: scale(180),
    width: '100%',
  },
});
