import {Dimensions, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import themeColor from '../../theme/themeColor';
import { useOrientation } from '../../hooks/useOrientation';




export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColor.white,
  },
  header: {
    height: verticalScale(185),
    flexDirection: 'row',
  },
  left: {
    backgroundColor: themeColor.gold,
    flex: 1,
    // width : scale()
    borderBottomRightRadius: verticalScale(16),
  },
  middle: {
    backgroundColor: themeColor.gold,
    width: scale(88),
  },
  right: {
    backgroundColor: themeColor.gold,
    flex: 1,

    borderBottomLeftRadius: verticalScale(16),
  },
  profilePic: {
    position: 'absolute',
    bottom: '-19%',
    borderRadius: 72,
    borderWidth: 10,
    borderColor: themeColor.white,
    height: scale(89),
    width: scale(89),
    zIndex: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  heading: {
    fontSize: scale(21),
    textAlign: 'center',
    marginTop: verticalScale(35),
  },
  options: {
    height: verticalScale(280),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardPortrait:  {
    height: verticalScale(120),
    width : verticalScale(120),
    marginTop :  0
  },
  headingPortrait : {
    textAlign : 'left',
    marginTop : verticalScale(10)
  },
  optionsPortrait : {
    justifyContent: 'space-evenly'
  }
});
