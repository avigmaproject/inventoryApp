import React from "react";
import HomeScreen from "../modules/Home/HomeScreen";
import MyProfile from '../modules/Settings/Screens/Profile/MyProfile';
import BarcodeScanner from "../modules/ItemManagement/Barcodescanner";
import ScanQr from '../modules/Scan/Screens/ScanQr'
 import Itemlist from "../modules/ItemManagement/Itemlist";
import Additem from '../modules/ItemManagement/Additem'
import ItemDetail from '../modules/ItemManagement/itemDetail'
import Filter from "../modules/ItemManagement/Filter";
import PutawayScreen from "../modules/Home/PutawayScreen";
import AddPallet from "../modules/Home/AddPallet";
import Lookup from "../modules/Home/Lookup";
import Itemcount from '../modules/ItemManagement/itemcount'
import { createStackNavigator } from "@react-navigation/stack";
const Homestack = createStackNavigator();
export default function Homenavigation() {
  return (
    <Homestack.Navigator screenOptions={{ headerShown: false }}>
      <Homestack.Screen name="HomeScreen" component={HomeScreen} />
      <Homestack.Screen name="MyProfile" component={MyProfile} />
      <Homestack.Screen name="PutawayScreen" component={PutawayScreen} />
      <Homestack.Screen name="Itemlist" component={Itemlist} />
      <Homestack.Screen name="Lookup" component={Lookup} />
      <Homestack.Screen name="AddPallet" component={AddPallet} />
      <Homestack.Screen name="ScanQr" component={ScanQr} />
      <Homestack.Screen name="Additem" component={Additem} />
      <Homestack.Screen name="ItemDetail" component={ItemDetail} />
      <Homestack.Screen name="Itemcount" component={Itemcount} />
      <Homestack.Screen name="Filter" component={Filter} />
      <Homestack.Screen name="BarcodeScanner" component={BarcodeScanner} />
    </Homestack.Navigator>
  );
}