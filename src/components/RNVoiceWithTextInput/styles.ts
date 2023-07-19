import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    backgroundColor: themeColor.white,
  },
  emojiView: {
    height: verticalScale(82),
    width: verticalScale(82),
    borderRadius: verticalScale(72),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: themeColor.lightGray,
  },
  emoji: {
    fontSize: verticalScale(28),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  heading: {
    fontSize: verticalScale(18),
    textAlign: 'center',
    marginTop: verticalScale(14),
  },

  // buttonView : {
  //     flexDirection : 'row',
  //     alignItems : 'center',
  //     width : scale(250),
  //     justifyContent : 'space-between',
  //     marginTop : verticalScale(16)
  //   },
  footerButton: {
    borderRadius: 0,
    height: verticalScale(80),
    paddingTop: verticalScale(20),
    justifyContent: 'flex-start',
    borderWidth: 0,
  },
  icon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '3%',
  },
  input: {
    width: '90%',
    borderWidth: 2,
    borderColor: themeColor.themeBlue,
    borderRadius: verticalScale(14),
    marginTop: verticalScale(16),
  },
  inputBox: {
    marginTop: verticalScale(21),
    alignSelf: 'center',
    alignItems: 'center',
  },
});
