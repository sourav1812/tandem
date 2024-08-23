import {StyleSheet} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';
export const styles = StyleSheet.create({
  bottomContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: verticalScale(80),
  },
  value: {
    marginHorizontal: 10,
  },
  button: {
    marginBottom: verticalScale(80),
    width: '80%',
    alignSelf: 'center',
  },
});
