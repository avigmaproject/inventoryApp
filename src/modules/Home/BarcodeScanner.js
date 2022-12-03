import { View, Text } from "react-native"
import React from "react"
import { CameraScreen } from "react-native-camera-kit"
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function BarcodeScanner(props) {
  const onReadCode = (event) => {
    if (event.nativeEvent.codeStringValue) {
      AsyncStorage.setItem(`${props.route.params.title}`, event.nativeEvent.codeStringValue);
      console.log(props.route.params.title,event.nativeEvent.codeStringValue)
    }
  }
  return (
    <View>
      <CameraScreen
        scanBarcode={true}
        onReadCode={(event) => onReadCode(event)} // optional
        showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
        laserColor="red" // (default red) optional, color of laser in scanner frame
        frameColor="white" // (default white) optional, color of border of scanner frame
      />
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
