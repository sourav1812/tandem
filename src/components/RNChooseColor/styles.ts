import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import themeColor from "../../theme/themeColor";

export const styles = StyleSheet.create({
    container  :{
        flex : 1,
    },
    question : {
        fontSize : verticalScale(22),
        textAlign : 'center',
        marginTop : verticalScale(14)
      },
      subHeading : {
        fontSize : verticalScale(14),
        textAlign: 'center'
      },
      scrollView : {
        flexWrap : 'wrap',
        flexDirection : 'row',
        justifyContent :'space-between',
        alignSelf : 'center',
      },
      colorName : {
        position : 'absolute',
        zIndex : 3,
        borderWidth :1,
        borderColor : 'transparent',
        fontSize :verticalScale(16),
        color : themeColor.white
      },
      colorView : {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop : verticalScale(20)
      },
      colorInfo : {
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent : 'space-between',
        // marginTop : verticalScale(10)
        position : 'absolute',
        bottom : '5%',
        alignSelf  :'center',
        width : '100%',
      },
      circle : {
        height : verticalScale(65),
        width : verticalScale(65),
        borderWidth : 2,
        borderColor : themeColor.themeBlue,
        borderRadius : verticalScale(72)
      },
      mixedColor : {
        height : verticalScale(65),
        width : scale(150),
        borderRadius : verticalScale(50),
        borderWidth : 2,
        borderColor : themeColor.themeBlue,
      },
})