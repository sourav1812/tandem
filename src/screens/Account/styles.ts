import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(22),
    backgroundColor: themeColor.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: verticalScale(44),
  },
  logo: {
    height: verticalScale(32),
    width: scale(120),
    marginRight: scale(58),
  },
  heading: {
    alignSelf: 'center',
    marginTop: verticalScale(30),
    textAlign: 'center',
  },
  content: {
    marginTop: verticalScale(18),
    flex: 1,
    paddingBottom: verticalScale(30),
  },
  add: {
    alignItems: 'center',
    paddingTop: verticalScale(26),
    paddingHorizontal: scale(5),
  },
  addText: {
    marginTop: verticalScale(42),
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  add2: {
    alignItems: 'center',
    paddingTop: verticalScale(14),
    paddingHorizontal: scale(5),
  },
  footer: {
    height: verticalScale(56),
    marginTop: verticalScale(30),
    borderRadius: 100,
    backgroundColor: themeColor.themeBlue,
    maxHeight: 60,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    flex: 0.8,
    height: verticalScale(56),
    borderRadius: 100,
    backgroundColor: themeColor.white,
    maxHeight: 60,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: themeColor.white,
    marginLeft: 20,
  },
  profile: {
    height: 30,
    width: 30,
  },
});
