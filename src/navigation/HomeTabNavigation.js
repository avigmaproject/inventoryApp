import React from "react";
import HomeScreen from "../modules/Home/HomeScreen";
import MyProfile from '../modules/Settings/Screens/Profile/MyProfile';
import BarcodeScanner from '../modules/Home/BarcodeScanner';
import ScanQr from '../modules/Scan/Screens/ScanQr'
// import Additem from '../modules/ItemManagement/Additem'
import { createStackNavigator } from "@react-navigation/stack";
const Homestack = createStackNavigator();
export default function Homenavigation() {
  return (
    <Homestack.Navigator screenOptions={{ headerShown: false }}>
      <Homestack.Screen name="HomeScreen" component={HomeScreen} />
      <Homestack.Screen name="MyProfile" component={MyProfile} />
      <Homestack.Screen name="BarcodeScanner" component={BarcodeScanner} />
      <Homestack.Screen name="ScanQr" component={ScanQr} />
      {/* <Homestack.Screen name="Additem" component={Additem} /> */}
    </Homestack.Navigator>
  );
}