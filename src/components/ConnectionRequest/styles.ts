import themeColor from '@tandem/theme/themeColor';
import {scale} from 'react-native-size-matters';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
const styles = StyleSheet.create({
  request: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childImageContainer: {
    height: verticalScale(60),
    width: verticalScale(60),
    borderRadius: verticalScale(30),
    borderColor: themeColor.lightGreen,
    borderWidth: 2,
    marginVertical: verticalScale(5),
    overflow: 'hidden',
  },
  childDetail: {
    flex: 1,
    marginHorizontal: verticalScale(20),
  },
});
export default styles;
