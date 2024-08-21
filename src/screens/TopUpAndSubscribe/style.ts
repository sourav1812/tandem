import {StyleSheet} from 'react-native';
import themeColor from '@tandem/theme/themeColor';
import {scale, verticalScale} from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(22),
    backgroundColor: themeColor.white,
    alignItems: "center"
  },
  header: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(44),
    paddingHorizontal: scale(0),
  },
  logo: {
    height: verticalScale(32),
    width: "100%"
  },
  sides: {
    flex: 1,
  },
  firstTab: {
    flex: 1,
  },
  menu: {
    width: "100%",
    marginTop: verticalScale(13),
  },
});
