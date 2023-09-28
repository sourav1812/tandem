import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
    paddingHorizontal: scale(20),
  },
  button: {
    alignSelf: 'flex-end',
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: verticalScale(10),
  },
  heading: {
    fontSize: verticalScale(18),
    textAlign: 'center',
    marginTop: verticalScale(23),
  },
  content: {
    textAlign: 'center',
  },
  girl: {alignSelf: 'center', backgroundColor: 'rgba(154,0, 255 , 0.3)'},
  boy: {alignSelf: 'center', backgroundColor: 'rgba(134, 211, 159, 0.3)'},
  sex: {
    fontSize: scale(13),
    textAlign: 'center',
    marginTop: 8,
  },
  options: {
    marginTop: verticalScale(16),
  },
  footerButton: {
    width: scale(160),
    alignSelf: 'center',
    marginTop: verticalScale(16),
  },
  bottomButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    bottom: '3%',
  },
  left: {
    width: scale(60),
  },
  leftText: {
    fontSize: 22,
  },
  rightText: {
    width: scale(230),
  },
  inputField: {
    marginTop: 8,
    // alignSelf: 'center',
  },
  inputBox: {
    backgroundColor: themeColor.lightGray,
  },
  containerBox: {
    marginTop: verticalScale(14),
  },
  avatarBox: {
    // borderWidth: 1,
    flex: 0.83,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatar: {
    margin: verticalScale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(12),
  },
  footerButtonOnSelect: {
    width: scale(160),
    alignSelf: 'center',
    marginTop: verticalScale(16),
    backgroundColor: themeColor.themeBlue,
  },
  avatarImg: {
    height: verticalScale(115),
    width: verticalScale(115),
  },
  date: {
    backgroundColor: themeColor.lightGray,
    height: verticalScale(55),
  },
  disabled: {backgroundColor: '#e9e9e9', borderColor: '#e9e9e9'},
  dropDown: {
    height: verticalScale(182),
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  role: {
    paddingVertical: verticalScale(9),
    paddingHorizontal: scale(16),
  },
});
