import { version } from 'react';
import {Platform, StyleSheet} from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import themeColor from '../../theme/themeColor';



export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  poster : {
    height : verticalScale(330)
  },
  scrollView : {
    height : Platform.OS == 'ios' ? verticalScale(310) : verticalScale(345) ,
    width : '100%',
    borderTopLeftRadius : verticalScale(16),
    borderTopRightRadius :verticalScale(16),
    marginTop : -verticalScale(20),
    backgroundColor : themeColor.white,
  },
  midContent : {
    top : verticalScale(280),
    zIndex : 20,
    position : 'absolute',
    flexDirection  : 'row',
    justifyContent : "space-between",
    alignItems  :'center',
    width : '100%',

    paddingHorizontal : scale(20)
  },
  rating : {
    height : verticalScale(60),
    width : verticalScale(60),
    justifyContent : 'center',
    alignItems  :'center',
    borderRadius : 72,
    backgroundColor: themeColor.lightGray,
  },
  emoji : {
    fontSize : verticalScale(20),
    color : themeColor.white,
  },
  duration : {
    borderRadius : verticalScale(26),
    backgroundColor : themeColor.purple,
    paddingHorizontal : scale(18),
    paddingVertical : verticalScale(6)
  },
  scrollContainer : {
    paddingVertical : verticalScale(30),
    paddingHorizontal  : verticalScale(18),
  },
  dateTime : {
    flexDirection  :'row',
    alignItems  : 'center',
  },
  date : {
    fontSize : verticalScale(12)
  },
  heading : {
    fontSize  : verticalScale(21),
    marginTop  : verticalScale(8)
  },
  story: {
    fontSize : verticalScale(14),
    marginTop : verticalScale(14)
  },
  button : {
  flex : 1,
  borderRadius : 0,
  justifyContent : 'flex-start',
  paddingTop  : verticalScale(21),
  },
  headerButtons : {
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingHorizontal : verticalScale(21),
    position : 'absolute',
    top : verticalScale(44),
    zIndex : 3,
    width : '100%',
  }
});
