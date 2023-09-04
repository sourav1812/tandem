import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: themeColor.white,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(22),
  },
  heading: {
    fontSize: verticalScale(16),
    color: themeColor.black,
    textAlign: 'center',
    marginTop: verticalScale(30),
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(20),
    justifyContent: 'space-between',
    // marginBottom: verticalScale(10),
  },
  button: {
    paddingHorizontal: scale(38),
    // maxWidth: 200,
  },
  avatarView: {
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  avatar: {
    marginTop: verticalScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(12),
  },
  avatarImg: {
    height: verticalScale(120),
    borderRadius: 100,
  },
});
