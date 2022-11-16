import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Itemlist from '../../modules/ItemManagement/Itemlist';
import Itemnavigation from '../ItemtabNavigation';
import HomeTabNavigation from '../HomeTabNavigation'
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
const Tabs =() =>{
    return(
        <Tab.Navigator
        screenOptions={({ route }) => ({
          activeTintColor:'#1FAFDF',
          inactiveTintColor:'grey',
          headerShown:false,
          tabBarOptions: {
            labelStyle: {
              fontSize: 60,
             
            },
          },
          
          // tabBarInactiveBackgroundColor:'white',
          // tabBarActiveBackgroundColor:'#1FAFDF',
          tabBarStyle: { height: 50,fontSize:60, },
          tabStyle: { fontSize: 50, },
          tabBarHideOnKeyboard: true,
        })}
          initialRouteName="Home"
        activeColor="#000000"
       
        >

        <Tab.Screen name="Dashboard" component={HomeTabNavigation} options={{
          tabBarLabel: 'Dashboard',
          tabBarColor: '#000000',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}/>
                
        <Tab.Screen name="Item Management" component={Itemnavigation} options={{
          tabBarLabel: 'Item Management',
          
          tabBarColor: '#000000',
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-sharp" color={color} size={26} />
          ),
        }}/>
        
      </Tab.Navigator>

    );
}
export default Tabs;