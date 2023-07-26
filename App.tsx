import React, {FC, useEffect} from 'react';
import AppNavigator from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {Platform, UIManager} from 'react-native';

const App: FC = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
