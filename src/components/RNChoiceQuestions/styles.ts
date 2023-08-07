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
    justifyContent: 'center',
  },
  optionsCustom: {
    height: verticalScale(130),
    width: verticalScale(130),
    margin: scale(10),
  },
  tooltipContainer: {
    width: scale(200),
    height: 'auto',
    marginTop: verticalScale(8),
  },
  tooltip: {
    textAlign: 'center',
    fontSize: verticalScale(16),
    marginTop: 10,
  },
});
