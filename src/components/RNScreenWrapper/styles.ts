import {Dimensions, StyleSheet, StatusBar} from 'react-native';


const screenHeight = Dimensions.get('window').height + (StatusBar.currentHeight || 28)
const screenWidth = Dimensions.get('window').width 

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%' ,
  },
});
