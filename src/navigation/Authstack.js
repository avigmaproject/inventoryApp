import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from '../modules/SplashScreen/SplashScreen';
import Login from '../modules/Auth/Login';
import ForgotPassword from '../modules/Auth/ForgotPassword';
import ResetPassword from '../modules/Auth/ResetPassword';
import SuccessPage from '../modules/Auth/SuccessPage';
import Register from '../modules/Auth/Register';

import * as React from "react";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }} >
      {/* <Stack.Screen name="SplashScreen" component={SplashScreen} /> */}
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SuccessPage" component={SuccessPage} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
