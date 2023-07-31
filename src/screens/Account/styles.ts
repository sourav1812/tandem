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
    alignItems: 'center',
    marginTop: verticalScale(44),
    paddingHorizontal: scale(21),
  },
  logo: {
    height: verticalScale(32),
    width: '95%',
  },
  heading: {
    alignSelf: 'center',
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
    alignItems: 'center',
  },
  add2: {
    alignItems: 'center',
    paddingTop: verticalScale(14),
    paddingHorizontal: scale(5),
  },
  footer: {
    alignSelf: 'center',
    height: verticalScale(64),
    width: verticalScale(250),
    marginTop: verticalScale(30),
    borderRadius: 100,
    backgroundColor: themeColor.themeBlue,
    maxHeight: 64,
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
    width: scale(130),
    height: verticalScale(64),
    borderRadius: 100,
    backgroundColor: themeColor.white,
    maxHeight: 64,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeColor.lightGray,
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
