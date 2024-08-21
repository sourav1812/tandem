import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(21),
    marginTop: verticalScale(37),
  },
  heading: {
    fontSize: verticalScale(20),
    alignSelf: 'center',
    marginTop: verticalScale(85),
  },
  subHeading: {
    textAlign: 'center',
    paddingHorizontal: scale(40),
  },
  button: {
    paddingHorizontal: '27%',
    marginTop: verticalScale(21),
    height: verticalScale(50),
  },
  codeInputFieldStyle: {
    height: scale(20),
    width: scale(20),
    color: '#020408',
    borderRadius: scale(20),
    backgroundColor: '#F1F4F9',
    borderColor: '#F1F4F9',
  },
});

export default styles;
