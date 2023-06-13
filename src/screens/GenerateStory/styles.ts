import {StyleSheet} from 'react-native';
import themeColor from '../../theme/themeColor';
import { scale, verticalScale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : themeColor.white,
    paddingHorizontal : scale(20)
  },
  header : {
    flexDirection  : 'row',
    justifyContent : 'space-between',
    alignItems : 'center',
    marginTop : verticalScale(50)
  },
  heading : {
    fontSize : scale(20),
  },
  questionNumber : {
    fontSize : scale(20),

    color : themeColor.themeBlue
  }
});
