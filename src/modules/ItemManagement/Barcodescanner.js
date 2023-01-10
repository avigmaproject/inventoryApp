import React, { useState, useEffect } from "react"
import {View, Text, TouchableOpacity, StyleSheet,SafeAreaView} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
// Pre-step, call this before any NFC operations
NfcManager.start();
function BarcodeScanner() {
  const [hasNfc, setHasNFC ] = useState(null);
  const [tag, settag] = useState("")
  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported()

      setHasNFC(deviceIsSupported)
      if (deviceIsSupported) {
        await NfcManager.start()
      }
    }
    checkIsSupported()
  }, [])
  // useEffect(() => {
  //   NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
  //     console.log('tag found')
  //   })

  //   return () => {
  //     NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
  //   }
  // }, [])
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }
  const readTag = async () => {
    await NfcManager.registerTagEvent();
  }
  async function readNdef() {
    try {
      // register for the NFC tag with NDEF in it
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      console.warn('Tag found', tag);
      settag(tag)
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  }
  // if (hasNfc === null) return null;
  // if (!hasNfc) {
  //   return (
  //     <View style={styles.wrapper}>
  //       <Text>NFC not supported</Text>
  //     </View>
  //   )
  // }
  return (
    <SafeAreaView style={styles.wrapper}>
     
      <TouchableOpacity style={styles.btnScan} onPress={readNdef}>
        <Text style={{ color: "white" }}>Scan Tag</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnScan: {
    backgroundColor:'#21618C',
    height:35,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15,
    marginTop:20
  }
});

export default BarcodeScanner;
// import { View, Text,TouchableOpacity } from "react-native"
// import React from "react"
// import { CameraScreen,RNCamera } from "react-native-camera-kit"
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useEffect,useState } from "react";
// import { useIsFocused } from '@react-navigation/native';
// import {SetRfid,SetRfid1,SetModel,
//     SetModel1,SetLpn,SetQty,SetSerial
// } from "../../store/action/itemdata/action"
// import { 
//     useSelector, useDispatch 
// } from 'react-redux';
// import {NfcRfidScanner} from "react-native-rfid-nfc-scanner";
// export default function BarcodeScanner(props) {
//  const [camrearef, setcamrearef] = useState(null)
//  const [barcodeid, setbarcodeid] = useState(null)
//  const isFocused = useIsFocused();
//  const [rfidtxt, setrfidtxt] = useState(null)
//  const [rfidtxt1, setrfidtxt1] = useState(null)
//  const [lpntxt, setlpntxt] = useState(null)
//  const [modeltxt, setmodeltxt] = useState(null)
//  const [model1txt, setmodel1txt] = useState(null)
//  const [qtytxt, setqtytxt] = useState(null)
//  const [serialtxt, setserialtxt] = useState(null)
//  const dispatch = useDispatch();
//  const scanner = new NfcRfidScanner();
// //  useEffect(() => {
    
// //     setbarcodeid(props.route.params.title)
// //   }, [barcodeid])
//   const goBack=()=>{
//     props.route.params.onRfiddata({rfid:rfidtxt})
//     props.navigation.goBack()
//   }
//  const onReadCode = (event) => {
//     if (event.nativeEvent.codeStringValue) {
//       if (barcodeid === "rfid")
//       {
//         setrfidtxt(event.nativeEvent.codeStringValue)
//         console.log("data rfid scannerr",event.nativeEvent.codeStringValue)
//         props.route.params.onRfiddata(event.nativeEvent.codeStringValue)
//         props.navigation.goBack()
       
//           // dispatch(SetRfid( event.nativeEvent.codeStringValue))
//       } 
//       if (barcodeid === "rfid1") 
//       {
//         setrfidtxt1(event.nativeEvent.codeStringValue)
//         dispatch(SetRfid1(event.nativeEvent.codeStringValue))
//       }
//       if (barcodeid === "lpn")
//       {
//         setlpntxt(event.nativeEvent.codeStringValue)
//         dispatch(SetLpn(event.nativeEvent.codeStringValue))
//       } 
//       if (barcodeid === "model")
//       {
//         setmodeltxt(event.nativeEvent.codeStringValue)
//         dispatch(SetModel(event.nativeEvent.codeStringValue))
//       } 
//       if (barcodeid === "model1")
//        {
//         setmodel1txt(event.nativeEvent.codeStringValue)
//         dispatch(SetModel1(event.nativeEvent.codeStringValue))
//        } 
//       if (barcodeid === "qty")
//       {
//         setqtytxt(event.nativeEvent.codeStringValue)
//         dispatch(SetQty(event.nativeEvent.codeStringValue))
//       } 
//       if (barcodeid === "serial")
//       {
//         setserialtxt(event.nativeEvent.codeStringValue)
//         dispatch(SetSerial(event.nativeEvent.codeStringValue))
//       }
//       props.navigation.navigate('Additem')
    
//     }
//   }
//   const onshowscanneropen = () => {
//     scanner.init()
  
//   }
  
//   return (
//     <View>
//          <TouchableOpacity
//                     onPress={() => onshowscanneropen()}
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "center",
//                       alignItems: "center"
//                     }}
//                   >
//                     <Text>scannn me</Text>
//                   </TouchableOpacity>
//     </View>
//     // <View>
//     //        { isFocused &&
//     //       <CameraScreen
//     //         ref={(ref) => setcamrearef(ref)}
//     //         focusMode={"on"}
//     //         flashMode={"auto"}
//     //         zoomMode={"on"}
//     //         scanBarcode={true}
//     //         barcodeScannerEnabled
//     //         onReadCode={(event) => onReadCode(event)} // optional
//     //         showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
//     //         laserColor="red" // (default red) optional, color of laser in scanner frame
//     //         frameColor="white" // (default white) optional, color of border of scanner frame
//     //       />}
//     //     </View>
//   )
// }

// // import React, {useState, useEffect} from 'react';
// // import {
// //   SafeAreaView,
// //   ScrollView,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   useColorScheme,
// //   TouchableOpacity,
// //   View,
// //   Image,
// // } from 'react-native';
// // import Icon from 'react-native-vector-icons/Feather';
// // import HeaderBack from '../../components/HeaderBack';
// // import BarcodeScanner from 'react-native-scan-barcode';
// // import Button from '../../components/Button';
// // export default function Itemlist(props){
// //   const [torchMode, settorchMode] = useState('on');
// //   const [cameraType, setcameraType] = useState('back');
// //   const  barcodeReceived = e => {
// //     console.log('Barcode: ' + e.data);
// //     console.log('Type: ' + e.type);
// //     // setvalue(false)
// //   };
// //     return (
// //      <View style={{flex:1,backgroundColor:'pink'}}>
// // <BarcodeScanner
// //         onBarCodeRead={barcodeReceived}
// //         style={{ height:250,width:200}}
// //         torchMode={torchMode}
// //         cameraType={cameraType}
// //       />
// //      </View>

// //       );
// //     }
