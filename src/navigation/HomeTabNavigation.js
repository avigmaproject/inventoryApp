import React from "react";
import HomeScreen from "../modules/Home/HomeScreen";
import MyProfile from '../modules/Settings/Screens/Profile/MyProfile';
import UpdateProfile from '../modules/Settings/Screens/ChildProfile/UpdateProfile';
import EditProfile from '../modules/Settings/Screens/Profile/EditProfile';
import BarcodeScanner from '../modules/Home/BarcodeScanner';
import { createStackNavigator } from "@react-navigation/stack";
const Homestack = createStackNavigator();
export default function Homenavigation() {
  return (
    <Homestack.Navigator screenOptions={{ headerShown: false }}>
      <Homestack.Screen name="HomeScreen" component={HomeScreen} />
      <Homestack.Screen name="MyProfile" component={MyProfile} />
      <Homestack.Screen name="EditProfile" component={EditProfile} />
      <Homestack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Homestack.Screen name="BarcodeScanner" component={BarcodeScanner} />
     
    </Homestack.Navigator>
  );
}