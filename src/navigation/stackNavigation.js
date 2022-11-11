import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from '../modules/Home/HomeScreen';
import CreateBin from '../modules/Bins/Screens/CreateBin';
import ShowBinData from '../modules/Bins/Screens/ShowBinData';
import QrCode from '../modules/Bins/Screens/QrCode';
import EditBin from '../modules/Bins/Screens/EditBin';
import ItemList from '../modules/Items/Screens/ItemList';
import CreateItem from '../modules/Items/Screens/CreateItem';
import EditItem from '../modules/Items/Screens/EditItem';
import ItemDetails from '../modules/Items/Screens/ItemDetails';
import {DrawerNavigator} from './Drawer/DrawerStack';
import MyProfile from '../modules/Settings/Screens/Profile/MyProfile';
import EditProfile from '../modules/Settings/Screens/Profile/EditProfile';
import Export from '../modules/Settings/Screens/Export/Export';
import ScanQr from '../modules/Scan/Screens/ScanQr';
import Setting from '../modules/Settings/Screens/Setting';
import Profiles from '../modules/Settings/Screens/ChildProfile/Profiles';
import UpdateProfile from '../modules/Settings/Screens/ChildProfile/UpdateProfile';
import AddProfile from '../modules/Settings/Screens/ChildProfile/AddProfile';
import MoveItems from '../modules/Settings/Screens/Move_Bin_Item/MoveItems';
import TransferBin from '../modules/Settings/Screens/Move_Bin_Item/TransferBin';

import * as React from "react";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
       <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
       <Stack.Screen name="MyProfile" component={MyProfile} />
       <Stack.Screen name="EditProfile" component={EditProfile} />
       <Stack.Screen name="Export" component={Export} />
       <Stack.Screen name="ScanQr" component={ScanQr} />
      <Stack.Screen name="CreateBin" component={CreateBin} />
       <Stack.Screen name="ShowBinData" component={ShowBinData} />
       <Stack.Screen name="QrCode" component={QrCode} />
       <Stack.Screen name="EditBin" component={EditBin} />
       <Stack.Screen name="ItemList" component={ItemList} />
       <Stack.Screen name="ItemDetails" component={ItemDetails} />
       <Stack.Screen name="CreateItem" component={CreateItem} />
       <Stack.Screen name="EditItem" component={EditItem} />
       <Stack.Screen name="Setting" component={Setting} />
       <Stack.Screen name="Profiles" component={Profiles} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
       <Stack.Screen name="AddProfile" component={AddProfile} />
       <Stack.Screen name="MoveItems" component={MoveItems} />
     <Stack.Screen name="TransferBin" component={TransferBin} />
    </Stack.Navigator>
  );
}
