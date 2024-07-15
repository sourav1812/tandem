import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
export const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(10),
    borderRadius: verticalScale(10),
    position: 'absolute',
    alignSelf: 'center',
  },
});
