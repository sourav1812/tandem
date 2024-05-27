import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  voiceQuestion: {
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
    marginVertical: verticalScale(15),
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
  footerButton: {
    borderRadius: 0,
    height: verticalScale(80),
    paddingTop: verticalScale(20),
    justifyContent: 'flex-start',

    borderWidth: 0,
  },
  icon: {
    alignSelf: 'center',
    // position: 'absolute',
    // bottom: '3%',
    marginBottom: 20,
  },
  tooltipTwo: {
    height: 'auto',
    width: 'auto',
  },
  voiceView: {
    height: verticalScale(350),
    borderWidth: 1,
  },
});
