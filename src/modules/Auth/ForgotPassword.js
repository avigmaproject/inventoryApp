import React, {useState, useEffect} from 'react';
import {  Snackbar } from 'react-native-paper';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from './components/Header';
import {Toast} from 'native-base';
import Button from '../../components/Button';
import {forgotpassword} from '../../services/api.function';
const ForgotPasswordScreen = (props) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setloading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setmessage] = useState('');
  const [color, setcolor] = useState('green');
  const [device, setdevice] = useState(0)
  const handleSubmit = () => {
    var Validation2=true;
  
    if (!email) {
      setEmailError('Email is required*');
      Validation2 = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid email!');
      Validation2 = false;
    } else {
      setEmailError('');
      Validation2 = true;
    }
    return Validation2
  };
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      setdevice(1)
    } else {
      setdevice(2)
      }
      return () => {
        }
      },[])
        const onToggleSnackBar = () => setVisible(!visible);
        const onDismissSnackBar = () => setVisible(false);
  const generateLink = async () => {
    const link = await dynamicLinks().buildShortLink({
      link: `https://inventoryapp.page.link/forgetpassword/${email}`,

      domainUriPrefix: 'https://inventoryapp.page.link',
      
      android: {
        packageName: 'com.inventoryapp',
        fallbackUrl: 'https://play.google.com/store/apps/details?id=com.inventoryapp',
      },
      navigation: {
        forcedRedirectEnabled: true,
      },
    });
    // Clipboard.setString(link)
    return link
  };
  const submitForm = async () => {
    const link =   await generateLink();
       if (handleSubmit()) {
         let data = {
           EmailID: email,
           Type: 1,
           Email_Url: link,
          //  Device: device,
         };
       setloading(true);
         await forgotpassword(data)
           .then(res => {

             onToggleSnackBar() 
             if (res[0].UserCode === 'Sucesss') {
                setmessage("Link sent successfully. Please check your registered email.") 
             setcolor("green")
             }
             if (res[0].UserCode === 'Error') {
             setmessage("This email is not register with us.") 
             setcolor("green")
             }
             setloading(false);
            
           })
           .catch(error => {
              if (error.request) {
                 setmessage("Request Error") 
                 setcolor("red")
                 onToggleSnackBar()
               } else if (error.responce) {
                 setmessage("Responce Error") 
                 setcolor("red")
                 onToggleSnackBar()
               } else {
                 setmessage("Somthing went wrong....") 
                 setcolor("red")
                 onToggleSnackBar()
               }
           });
       } 
     
   };
  return (
   
      <SafeAreaView style={styles.container}>
         <StatusBar barStyle="dark-content" backgroundColor={"white"} />
        <Spinner
          visible={loading}
          textContent={'Loading...'}
        />
         <Header
          text="Forgot Password"
          onPress={() =>  props.navigation.goBack()}
        />
         <View style={styles.mainview}>
        <Text style={styles.textstyle}>
                Enter the registered email address to receive the reset password
                link.{' '}
              </Text>
        <View style={styles.inputview}>
        <InputText
                onChangeText={text => setEmail(text)}
                label={'Email address'}
                  value={email}
              />
              {emailError.length > 0 && (
                <Text style={styles.text}>{emailError}</Text>
              )}
        </View>

        <View style={styles.buttonview}>
        <Button
            text="Send Link"
            backgroundColor="#2874A6"
            onPress={() => submitForm()}
          />
        </View>
        </View>
        <Snackbar
       visible={visible}
       onDismiss={onDismissSnackBar}
       style={{backgroundColor: color}}
       action={{
         label: 'OK',
         onPress: () => {
           onDismissSnackBar;
         },
       }}>
          {message}
          </Snackbar>
      </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  mainview:{
    paddingHorizontal:20
  },
  textstyle:
    { fontSize: 16,
      marginTop:10,
      color: '#9B9C9F',
      fontWeight: '400',},
      buttonview:
      {marginTop: 35},
      text:{
        color: 'red'
      },
      inputview:
      {marginTop: 20}
  
});
