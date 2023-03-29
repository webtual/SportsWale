import React from 'react';

/*  Redux Files  */
import store from './src/redux/store/store'
import { Provider } from 'react-redux'
import AppNavigator from './src/navigations/AppNavigator';
import { NativeBaseProvider, Box } from "native-base";
import { LogBox } from 'react-native';

const App = () => {


LogBox.ignoreAllLogs();
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </NativeBaseProvider>

  );
}

export default App;
