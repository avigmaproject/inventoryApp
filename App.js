import "react-native-gesture-handler"

import * as React from "react"
import { Provider, useDispatch, useSelector } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"
import { connect } from "react-redux"
import store, { persistor } from "./src/store"
import MaintabNavivgation from "./src/navigation/Tabnavigator/Maintab"
import AuthStack from "./src/navigation/Authstack"
import { NavigationContainer } from "@react-navigation/native"
import { NativeBaseProvider } from "native-base"
import {DrawerNavigator} from './src/navigation/Drawer/DrawerStack';

const App = () => {
  const userToken = useSelector((state) => state.authReducer.userToken)

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {userToken ? <DrawerNavigator /> : <AuthStack />}
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

const AppWrapper = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
export default AppWrapper
