import themeColor from '@tandem/theme/themeColor';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: verticalScale(280),
  },
  text: {
    textAlign: 'center',
    margin: verticalScale(10),
    backgroundColor: 'white',
    padding: verticalScale(15),
    borderColor: '#00000030',
    borderWidth: 3,
    borderRadius: 20,
    position: 'absolute',
    alignSelf: 'center',
  },
  button: {
    position: 'absolute',
    width: '93%',
    bottom: verticalScale(40),
  },
});
