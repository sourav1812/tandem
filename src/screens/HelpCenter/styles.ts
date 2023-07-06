import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import themeColor from "../../theme/themeColor";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

export const styles = StyleSheet.create({
    container: {},
    heading : {
        marginTop  :verticalScale(50)
    },
    content : {
        flex  :1,
    },
    customTab : {
        flexDirection : 'row',
        alignItems : 'center',
        marginTop  :verticalScale(20)
    },
    tab : {
        flex :1,
        borderRadius : 0
    },
    subHeading : {
        fontSize : verticalScale(21),
        textAlign : 'center',
    },
    scrollView:  {
        marginTop : verticalScale(20),  
    },
    input2 : {
        width : '100%',
        marginTop   : verticalScale(12),
        
    },
    inputText:  {
        fontSize : verticalScale(13),
        flex : 1,   
    },  
    inputView : {height : verticalScale(200) , justifyContent : 'flex-start' ,flexDirection  :'column'},
    button : {
        marginTop : verticalScale(30)
    }
})