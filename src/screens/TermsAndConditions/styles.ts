import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {},
  heading: {
    fontSize: verticalScale(21.3),
    alignSelf: 'center',
    marginTop: verticalScale(50),
  },
  info: {
    fontSize: verticalScale(14),
    textAlign: 'center',
    marginHorizontal: scale(40),
    marginVertical: verticalScale(12),
  },
  content: {
    flex: 1,
    marginTop: verticalScale(12),
    paddingHorizontal: verticalScale(20),
  },
  text: {
    fontSize: verticalScale(13),
    marginTop: verticalScale(12),
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(30),
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  button: {
    paddingHorizontal: scale(38),
    // maxWidth: 200,
  },
});
