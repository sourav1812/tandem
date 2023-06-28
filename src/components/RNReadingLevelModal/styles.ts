import {StyleSheet} from 'react-native';
import { scale, verticalScale} from 'react-native-size-matters';
import themeColor from '../../theme/themeColor';

export const styles = StyleSheet.create({
    modal : {
        padding : 0,
        margin : 0,
        justifyContent : 'center',
        flex : 1
    },
    container : {
        marginHorizontal  : verticalScale(20),
        padding : verticalScale(21),
        alignItems : 'center',
        backgroundColor : themeColor.white,
        borderRadius : verticalScale(16)
      },
      tick : {
        height : verticalScale(130),
        width : verticalScale(130)
      },
      heading : {
        fontSize : verticalScale(19),
        textAlign : 'center',
        color : themeColor.black,
        marginTop  : verticalScale(8)
      },
      info : {
        textAlign : 'center',
        fontSize : verticalScale(14)
      },
      button : {
        marginTop :verticalScale(32),
        width : '100%',
      },
      icon : {
        alignSelf  :'flex-end'
      },
      content : {
        flexDirection  : 'row',
        alignItems  :'center',
        justifyContent : 'space-between',
        marginTop : verticalScale(15)
      },
      indicator : {
        width : scale(8),
        borderRadius : verticalScale(50),
        marginHorizontal : verticalScale(2)
      }
});