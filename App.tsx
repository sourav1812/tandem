import { View, Text, StyleSheet } from 'react-native'
import React, { FC } from 'react';
import RNTextComponent from './src/components/RNTextComponent';
import RNButton from './src/components/RNButton';
import RNTextInputWithLabel from './src/components/RNTextInputWithLabel';
import RNSecureTextInput from './src/components/RNSecureTextInput';


const App: FC = () => {
  return (
    <View style={styles.view} >
      <RNSecureTextInput showIcon />
    </View>
  )
}

export default App;


const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    fontSize: 40,
    // fontFamily: 'Poppins-Regular'
  }
})