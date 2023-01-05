import { View, Text } from "react-native"
import React from "react"
import { CameraScreen,RNCamera } from "react-native-camera-kit"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect,useState } from "react";
import { useIsFocused } from '@react-navigation/native';
import {SetRfid,SetRfid1,SetModel,
    SetModel1,SetLpn,SetQty,SetSerial
} from "../../store/action/itemdata/action"
import { 
    useSelector, useDispatch 
} from 'react-redux';
export default function BarcodeScanner(props) {
 const [camrearef, setcamrearef] = useState(null)
 const [barcodeid, setbarcodeid] = useState(null)
 const isFocused = useIsFocused();
 const [rfidtxt, setrfidtxt] = useState(null)
 const [rfidtxt1, setrfidtxt1] = useState(null)
 const [lpntxt, setlpntxt] = useState(null)
 const [modeltxt, setmodeltxt] = useState(null)
 const [model1txt, setmodel1txt] = useState(null)
 const [qtytxt, setqtytxt] = useState(null)
 const [serialtxt, setserialtxt] = useState(null)
 const dispatch = useDispatch();

 useEffect(() => {
    
    setbarcodeid(props.route.params.title)
  }, [barcodeid])
 const onReadCode = (event) => {
    if (event.nativeEvent.codeStringValue) {
      if (barcodeid === "rfid")
      {
        setrfidtxt(event.nativeEvent.codeStringValue)
        dispatch(SetRfid( event.nativeEvent.codeStringValue))
      } 
      if (barcodeid === "rfid1") 
      {
        setrfidtxt1(event.nativeEvent.codeStringValue)
        dispatch(SetRfid1(event.nativeEvent.codeStringValue))
      }
      if (barcodeid === "lpn")
      {
        setlpntxt(event.nativeEvent.codeStringValue)
        dispatch(SetLpn(event.nativeEvent.codeStringValue))
      } 
      if (barcodeid === "model")
      {
        setmodeltxt(event.nativeEvent.codeStringValue)
        dispatch(SetModel(event.nativeEvent.codeStringValue))
      } 
      if (barcodeid === "model1")
       {
        setmodel1txt(event.nativeEvent.codeStringValue)
        dispatch(SetModel1(event.nativeEvent.codeStringValue))
       } 
      if (barcodeid === "qty")
      {
        setqtytxt(event.nativeEvent.codeStringValue)
        dispatch(SetQty(event.nativeEvent.codeStringValue))
      } 
      if (barcodeid === "serial")
      {
        setserialtxt(event.nativeEvent.codeStringValue)
        dispatch(SetSerial(event.nativeEvent.codeStringValue))
      }
      props.navigation.navigate('Additem')
    
    }
  }
  const onshowscanneropen = (text) => {
    console.log("text is", text)
    setbarcodeid(text)
   
  }
  return (
    <View>
           { isFocused &&
          <CameraScreen
            ref={(ref) => setcamrearef(ref)}
            focusMode={"on"}
            flashMode={"auto"}
            zoomMode={"on"}
            scanBarcode={true}
            barcodeScannerEnabled
            onReadCode={(event) => onReadCode(event)} // optional
            showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
            laserColor="red" // (default red) optional, color of laser in scanner frame
            frameColor="white" // (default white) optional, color of border of scanner frame
          />}
        </View>
  )
}

// import React, {useState, useEffect} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   TouchableOpacity,
//   View,
//   Image,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import HeaderBack from '../../components/HeaderBack';
// import BarcodeScanner from 'react-native-scan-barcode';
// import Button from '../../components/Button';
// export default function Itemlist(props){
//   const [torchMode, settorchMode] = useState('on');
//   const [cameraType, setcameraType] = useState('back');
//   const  barcodeReceived = e => {
//     console.log('Barcode: ' + e.data);
//     console.log('Type: ' + e.type);
//     // setvalue(false)
//   };
//     return (
//      <View style={{flex:1,backgroundColor:'pink'}}>
// <BarcodeScanner
//         onBarCodeRead={barcodeReceived}
//         style={{ height:250,width:200}}
//         torchMode={torchMode}
//         cameraType={cameraType}
//       />
//      </View>

//       );
//     }
