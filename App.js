import React from "react";

/*  Redux Files  */
import store from "./src/redux/store/store";
import { Provider } from "react-redux";
import AppNavigator from "./src/navigations/AppNavigator";
import { NativeBaseProvider, Box } from "native-base";
import { LogBox } from "react-native";
// import { SheetProvider } from "react-native-actions-sheet";

const App = () => {
  LogBox.ignoreAllLogs();
  return (
    // <SheetProvider>
      <NativeBaseProvider>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </NativeBaseProvider>
    // </SheetProvider>
  );
};

export default App;
