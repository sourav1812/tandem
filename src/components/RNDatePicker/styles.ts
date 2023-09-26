import {StyleSheet} from 'react-native';
import {verticalScale, scale} from 'react-native-size-matters';

export default StyleSheet.create({
  modal: {
    padding: 0,
    margin: 0,
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 0.6,
    marginHorizontal: scale(40),
    borderRadius: verticalScale(12),
    backgroundColor: 'white',
    paddingVertical: verticalScale(20),
    maxHeight: 270,
  },
  text: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 6,
    borderRadius: 6,
  },
  top: {
    flexDirection: 'row',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 60,
  },
  box: {height: '93%', width: '50%'},
  line: {borderWidth: 0.3, height: '93%', borderColor: 'black'},
});
