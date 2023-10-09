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
    flex: 0.74,
    marginHorizontal: scale(40),
    borderRadius: verticalScale(12),
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  text: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: scale(13),
  },
  button: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 6,
  },
  top: {
    flexDirection: 'row',
    height: '83%',
    paddingVertical: 8,
  },
  box: {width: '50%', backgroundColor: 'green'},
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: 'gray',
    padding: 8,
  },
  line: {borderLeftWidth: 0.5, height: '100%', borderColor: 'gray'},
});
