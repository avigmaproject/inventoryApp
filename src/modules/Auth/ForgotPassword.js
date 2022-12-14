import React, {useState, useEffect} from 'react';
import {  Snackbar } from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import Spinner from 'react-native-loading-spinner-overlay';
import Header from './components/Header';
import {Toast} from 'native-base';
import InputText from '../../components/InputText';
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
  const isValidEmail = value => {
    const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regx.test(value);
  };
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
    console.log(Validation2)
    return Validation2
    

  };
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      setdevice(1)
    } else {
      setdevice(2)
      }
      return () => {
          console.log("unmount")
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
    console.log(link);
    return link
  };
  const submitForm = async () => {

    const link =   await generateLink();
    console.log("link is",link)
       if (handleSubmit()) {
         let data = {
           EmailID: email,
           Type: 1,
           Email_Url: link,
          //  Device: device,
         };
       setloading(true);
          console.log("emaill is...",email);
         console.log(data);
         await forgotpassword(data)
           .then(res => {

             console.log('res: ', JSON.stringify(res));
             console.log('res:123', res[0].UserCode);
             onToggleSnackBar()
 
             if (res[0].UserCode === 'Sucesss') {
               console.log('successs');
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
                 console.log(error.request)
               } else if (error.responce) {
                 setmessage("Responce Error") 
                 setcolor("red")
                 onToggleSnackBar()
                 console.log(error.responce)
               } else {
                 setmessage("Somthing went wrong....") 
                 setcolor("red")
                 onToggleSnackBar()
                 console.log(error)
               }
           });
       } 
     
   };
  return (
   
      <SafeAreaView style={{flex: 1}}>
         <StatusBar barStyle="dark-content" backgroundColor={"white"} />
        <Spinner
          visible={loading}
          textContent={'Loading...'}
        />
         <Header
          text="Forgot Password"
          onPress={() =>  props.navigation.goBack()}
        />
         <View style={{paddingHorizontal:20}}>
        <Text style={{ fontSize: 16,
marginTop:10,
color: '#9B9C9F',
fontWeight: '400',}}>
                Enter the registered email address to receive the reset password
                link.{' '}
              </Text>
        <View style={{marginTop: 20}}>
        <InputText
                onChangeText={text => setEmail(text)}
                label={'Email address'}
                  value={email}
              />
              {emailError.length > 0 && (
                <Text style={{color: 'red'}}>{emailError}</Text>
              )}
        </View>

        <View style={{marginTop: 35}}>
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
  heading: {
    marginTop: 25,
    width: '90%',
    height: 43,
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: 10,
  },
  text: {
    fontSize: 30,

    color: '#424242',
    fontWeight: '700',
  },
  header: {
    width: '90%',
  },
  text2: {
    fontSize: 16,

    color: '#9B9C9F',
    fontWeight: '400',
  },
  textinput: {
    width: '100%',
    alignSelf: 'center',
    marginTop: 20,
  },
  email: {
    height: 47,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    marginVertical: 20,
    padding: 10,
  },

  forgot: {
    textAlign: 'right',
    marginTop: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#9B9C9F',
  },
  reset1: {
    textAlign: 'right',
    fontSize: 14,
    fontWeight: '600',
    color: '#9B9C9F',
    marginVertical: 5,
  },
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 16,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20,
  },
  footer: {
    fontSize: 16,

    fontWeight: '400',
    color: '#98A6AE',
    height: 22,
  },
  footer1: {
    fontSize: 16,

    fontWeight: '400',
    color: '#0FDEEB',
    height: 22,
  },
  error: {
    // textAlign: 'center',
    // justifyContent: 'center',
    color: '#DBBE80',

    fontSize: 15,
    width: '90%',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});
