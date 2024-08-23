import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
export const styles = StyleSheet.create({
  header: {
    marginTop: verticalScale(44),
    paddingHorizontal: scale(21),
  },
  logo: {
    height: verticalScale(32),
    width: '100%',
  },
  heading: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    marginHorizontal: scale(10),
  },
  scannerContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },
});
