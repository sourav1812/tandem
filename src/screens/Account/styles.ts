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
    width: '100%',
  },
  heading: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  content: {
    marginTop: verticalScale(18),
    height: '77%',
    paddingBottom: verticalScale(30),
    marginLeft: verticalScale(20),
    alignItems: 'center',
  },
  add: {
    alignItems: 'center',
  },
  addText: {
    fontSize: verticalScale(14),
    marginTop: verticalScale(8),
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add2: {
    alignItems: 'center',
  },
  footer: {
    alignSelf: 'center',
    height: verticalScale(64),
    // width: verticalScale(270),
    paddingLeft: 10,
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
    height: 25,
    width: 25,
    marginHorizontal: 10,
    borderRadius: 100,
  },
  topList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yellowContainer: {
    height: verticalScale(20),
    width: verticalScale(20),
    borderRadius: 100,
    backgroundColor: '#FEC247CC',
    position: 'absolute',
    left: 0,
  },
  blueContainer: {
    height: verticalScale(30),
    width: verticalScale(30),
    borderRadius: 100,
    backgroundColor: '#4285F6CC',
    position: 'absolute',
    marginLeft: scale(10),
    left: 0,
  },
});
