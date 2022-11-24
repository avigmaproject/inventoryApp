import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../../modules/SplashScreen/SplashScreen';
import Login from '../../modules/Auth/Login';
import ForgotPassword from '../../modules/Auth/ForgotPassword';
import ResetPassword from '../../modules/Auth/ResetPassword';
import SuccessPage from '../../modules/Auth/SuccessPage';
import Register from '../../modules/Auth/Register';
const AuthStack = createStackNavigator();

const Stack = createStackNavigator();

export default function AuthNavigation () {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
      <AuthStack.Screen name="SuccessPage" component={SuccessPage} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

