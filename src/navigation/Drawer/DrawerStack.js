import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from '../../components/DrawerContent';
import HomeScreen from '../../modules/Home/HomeScreen';
import HomeTabNavigation from '../HomeTabNavigation';
import MaintabScreen from "../Tabnavigator/Maintab"

const Drawer = createDrawerNavigator();

export const DrawerNavigator = (props) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen name="HomeTabNavigation" component={HomeTabNavigation} />
    </Drawer.Navigator>
  );
};
