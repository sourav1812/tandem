import React from 'react';
import {ScrollView, TextInput, View} from 'react-native';

const App: () => JSX.Element = () => {
  return (
    <View
      style={{
        backgroundColor: 'yellow',
        flex: 1,
        flexDirection: 'column-reverse',
      }}>
      <View
        style={{
          backgroundColor: 'red',
          flex: 0.7,
        }}>
        <View style={{flex: 0.7, backgroundColor: 'purple'}}>
          <ScrollView style={{backgroundColor: 'blue'}}>
            {[...new Array(1000)].map(() => (
              <TextInput
                style={{
                  backgroundColor: 'white',
                  marginVertical: 5,
                }}
              />
            ))}
          </ScrollView>
        </View>
      </View>
      <View style={{backgroundColor: 'white', flex: 0.2}}>
        <View style={{backgroundColor: 'orange', flex: 0.5}} />
        <View style={{backgroundColor: 'brown', flex: 0.5}} />
      </View>
    </View>
  );
};
export default App;
