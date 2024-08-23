import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
    paddingHorizontal: scale(21),
  },
  heading: {
    marginTop: verticalScale(44),
    alignItems: 'center',
  },
  text: {
    fontSize: verticalScale(18),
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
  littlePeople: {
    flex: 1,
    paddingTop: verticalScale(21),
  },
  scrollview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  addText: {
    marginTop: verticalScale(10),
  },
  footerButton: {
    position: 'absolute',
    bottom: '2%',
    alignSelf: 'center',
    width: '100%',
  },
  button: {
    width: '100%',
  },
});
