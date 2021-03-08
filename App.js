import React from 'react';
import {Provider} from 'react-redux';
import {AppNavigation} from './src/AppNavigation';
import {store} from './src/redux/store/store';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
