import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

export const styles = StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: scale(20),
    borderRadius: verticalScale(16),
  },
  image: {
    height: verticalScale(90),
    width: verticalScale(90),
    borderWidth: verticalScale(3),
    borderColor: themeColor.white,
    borderRadius: 72,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColor.purple,
    alignSelf: 'center',
    marginTop: -verticalScale(50),
  },
  heading: {
    fontSize: verticalScale(22),
    color: themeColor.white,
    textAlign: 'center',
  },
  top: {
    backgroundColor: themeColor.purple,
    borderTopLeftRadius: verticalScale(16),
    borderTopRightRadius: verticalScale(16),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: scale(20),
    marginBottom: verticalScale(12),
  },
  title: {
    fontSize: verticalScale(20),
    color: themeColor.white,
    textAlign: 'center',
  },
  box: {
    alignItems: 'center',

    // borderColor: themeColor.white,
    width: scale(90),
  },
  stat: {
    fontSize: verticalScale(16),
    color: themeColor.white,
    textAlign: 'center',
  },
  bottom: {
    backgroundColor: themeColor.white,
    borderBottomLeftRadius: verticalScale(16),
    borderBottomRightRadius: verticalScale(16),
    padding: verticalScale(22),
  },
  button: {
    marginTop: verticalScale(16),
    minWidth: '100%',
  },
  emoji: {
    height: verticalScale(56),
    width: verticalScale(56),
  },
});
