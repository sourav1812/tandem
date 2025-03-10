import {scale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import themeColor from '@tandem/theme/themeColor';
const styles = StyleSheet.create({
  container: {
    // paddingTop: verticalScale(40),
    paddingHorizontal: scale(21),
  },
  modalHeading: {
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  heading: {
    marginTop: verticalScale(44),
    alignItems: 'center',
  },
  text: {
    fontSize: verticalScale(18),
  },
  listContentContainer: {
    paddingBottom: scale(30),
    marginTop: verticalScale(15),
  },
  modalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentContainer: {
    backgroundColor: themeColor.white,
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(10),
    borderRadius: verticalScale(10),
  },
  itemContainer: {
    borderColor: themeColor.themeBlue,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: verticalScale(10),
    justifyContent: 'center',
    paddingHorizontal: scale(10),
    paddingBottom: verticalScale(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: scale(250),
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
export default styles;
