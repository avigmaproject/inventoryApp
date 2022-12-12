import logo from '../../assets/Image/ilogo.png';
import React, {useState, useEffect} from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
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
  const handleDynamicLink = link => {
    console.log("===> link",link)
        // Handle dynamic link inside your own application
        navigation.navigate('ResetPassword', {link: link.url});
    
      };
      useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
        // When the component is unmounted, remove the listener
        return () => unsubscribe();
      }, []);
      useEffect(() => {
        dynamicLinks()
          .getInitialLink()
          .then(link => {
            if (link.url) {
    console.log("getInitialLink",link.url)
         navigation.navigate('ResetPassword', {link: link.url});
    
              // ...set initial route as offers screen
            }
          });
      }, []);
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