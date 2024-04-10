import React, { useEffect } from "react";

/*  Redux Files  */
import store from "./src/redux/store/store";
import { Provider } from "react-redux";
import AppNavigator from "./src/navigations/AppNavigator";
import { NativeBaseProvider, Box } from "native-base";
import { LogBox } from "react-native";
// import { SheetProvider } from "react-native-actions-sheet";
import Geocoder from 'react-native-geocoding';
import { GOOGLE_API_KEY } from "./src/constants/ConstantKey";

const App = () => {
  LogBox.ignoreAllLogs();


  useEffect(() => {

    Geocoder.init(GOOGLE_API_KEY)
  },[])

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
