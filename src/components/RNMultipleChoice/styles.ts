import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  voiceQuestion: {
    marginTop: verticalScale(24),
    backgroundColor: themeColor.lightGray,
    paddingVertical: verticalScale(14),
    paddingHorizontal: verticalScale(16),
    borderRadius: verticalScale(11),
  },
  emojiView: {
    height: verticalScale(82),
    width: verticalScale(82),
    borderRadius: verticalScale(72),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: themeColor.white,
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
  answerField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(14),
  },
  bullitin: {
    height: verticalScale(45),
    width: verticalScale(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 72,
    backgroundColor: themeColor.lightGreen,
  },
  leftText: {
    fontSize: verticalScale(22),
    color: themeColor.white,
  },
  input: {
    flex: 0.9,
    borderRadius: verticalScale(14),
    height: verticalScale(50),
    backgroundColor: themeColor.white,
    fontSize: verticalScale(18),
    fontWeight: '500',
    paddingHorizontal: verticalScale(14),
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
    backgroundColor: themeColor.themeBlue,
    borderWidth: 0,
    zIndex: 40,
  },
  icon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '3%',
  },
  optionsCustom: {
    height: verticalScale(115),
    width: verticalScale(115),
    marginTop: verticalScale(20),
    backgroundColor: themeColor.white,
  },
  options: {
    height: verticalScale(280),
    // alignSelf: 'center',
  },
  scroll: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
