import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  optionsCustom: {
    height: verticalScale(132),
    width: verticalScale(132),
    marginTop: verticalScale(20),
  },
});
