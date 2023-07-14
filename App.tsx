import React, {FC} from 'react';
import AppNavigator from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
