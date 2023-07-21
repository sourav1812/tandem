import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    height: verticalScale(64),
    width: verticalScale(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: verticalScale(12),
    textAlign: 'center',
    marginTop: 8,
    color: 'rgba(2, 4, 8, 0.6)',
  },
});
