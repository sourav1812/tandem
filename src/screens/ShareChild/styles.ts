import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
export const styles = StyleSheet.create({
  logo: {
    height: verticalScale(32),
    width: '100%',
  },
  header: {
    marginTop: verticalScale(44),
    paddingHorizontal: scale(21),
  },
  heading: {
    textAlign: 'center',
    marginTop: verticalScale(20),
    fontSize: verticalScale(15),
  },
  qrContainer: {
    alignSelf: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  invitationCodeContainer: {
    backgroundColor: themeColor.lightGreen,
    width: '80%',
    alignSelf: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: verticalScale(30),
    marginTop: verticalScale(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
