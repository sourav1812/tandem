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
    fontSize : scale(18),
  },
  questionNumber : {
    fontSize : scale(18),

    color : themeColor.themeBlue
  },
  progressBar : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    marginTop : verticalScale(16)
  },
  indicator : {
    height : verticalScale(10),
    width : scale(48),
    borderRadius : verticalScale(8),
    backgroundColor : 'rgba(66, 133, 246, 0.5)'
  }
});
