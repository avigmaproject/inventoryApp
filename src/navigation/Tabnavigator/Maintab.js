import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import Itemlist from "../../modules/ItemManagement/Itemlist"
import Itemnavigation from "../ItemtabNavigation"
import HomeTabNavigation from "../HomeTabNavigation"
import Icon from "react-native-vector-icons/Ionicons"
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
        tabBarStyle: { height: 50, fontSize: 60 },
        tabStyle: { fontSize: 50 },
        tabBarHideOnKeyboard: true
      })}
      activeColor="#000000"
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeTabNavigation}
        options={{
          tabBarLabel: "Dashboard",
          tabBarColor: "#000000",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          )
        }}
      />

      <Tab.Screen
        name="ItemManagement"
        component={Itemnavigation}
        options={{
          tabBarLabel: "Item Management",

          tabBarColor: "#000000",
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-sharp" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
export default Tabs
