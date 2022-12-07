import logo from '../../assets/Image/ilogo.png';
import React, {useState, useEffect} from 'react';
const {width, height} = Dimensions.get('window');
const delay = 5;
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Dimensions,
  AppState,
} from 'react-native';



const SplashScreen = ({navigation}) => {
    useEffect(() => {
    let timer1 = setTimeout(() => navigation.navigate('Login'), 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);
    return (
      <SafeAreaView>
      <Animated.Image
        source={require('../../assets/Image/ilogo.png')}
        style={{
          width: '90%',
          height: '100%',
          resizeMode: 'contain',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      />
      <Animated.View
        style={{
          width: width,
          height,
          position: 'absolute',
          zIndex: -1,
        }}
      />
    </SafeAreaView>
     );
    }
  

export default SplashScreen