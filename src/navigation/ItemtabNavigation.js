import React from "react";
import Itemlist from "../modules/ItemManagement/Itemlist";
import Additem from '../modules/ItemManagement/Additem'
import ItemDetail from '../modules/ItemManagement/itemDetail'

import { createStackNavigator } from "@react-navigation/stack";


const Itemstack = createStackNavigator();
export default function Itemnavigation() {
  return (
    <Itemstack.Navigator screenOptions={{ headerShown: false }}>
      <Itemstack.Screen name="Itemlist" component={Itemlist} />
      <Itemstack.Screen name="Additem" component={Additem} />
      <Itemstack.Screen name="ItemDetail" component={ItemDetail} />
    </Itemstack.Navigator>
  );
}