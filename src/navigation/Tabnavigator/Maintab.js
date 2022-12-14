import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import Itemlist from "../../modules/ItemManagement/Itemlist"
import Itemnavigation from "../ItemtabNavigation"
import HomeTabNavigation from "../HomeTabNavigation"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
const Tab = createBottomTabNavigator()
const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#21618C",
        tabBarInactiveTintColor: "grey",
        headerShown: false,
        tabBarOptions: {
          labelStyle: {
            fontSize: 60
          }
        },
        tabBarStyle: { height: 70, fontSize: 60,paddingBottom:10,marginTop:10 },
        tabStyle: { fontSize: 50 },
        tabBarHideOnKeyboard: true
      })}
      activeColor="#000000"
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeTabNavigation}
        options={{
          // tabBarLabel: "Dashboard",
          tabBarColor: "#000000",
          tabBarIcon: ({ color }) => (
            <Icon name="view-dashboard-outline" color={color} size={35} />
          )
        }}
      />

      <Tab.Screen
        name="Item Management"
        component={Itemnavigation}
        options={{
          // tabBarLabel: "Item Management",

          tabBarColor: "#000000",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="inventory" color={color} size={35} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
export default Tabs
