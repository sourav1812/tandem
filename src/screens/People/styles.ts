import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
    paddingHorizontal: scale(21),
  },
  button: {
    marginTop: verticalScale(40),
    alignSelf: 'flex-end',
  },
  customTab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(5),
    height: verticalScale(40),
  },
  tab: {
    flex: 1,
    borderRadius: 0,
  },
  profile: {
    height: verticalScale(84),
    width: verticalScale(84),
    borderRadius: 1000,
    alignSelf: 'center',
    marginTop: verticalScale(18),
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  name: {
    fontSize: verticalScale(17),
    textAlign: 'center',
    marginTop: 8,
  },
  menu: {
    marginTop: verticalScale(13),
  },
  firstTab: {
    flex: 1,
  },
  bigpeople: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: themeColor.white,
  },
  addButton: {
    marginTop: verticalScale(18),
    height: verticalScale(85),
    width: verticalScale(85),
  },
  littlePeople: {
    flex: 1,
    paddingTop: verticalScale(21),
  },
  scrollview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  addText: {
    marginTop: verticalScale(10),
  },
});
