
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
import { View, Text } from 'react-native'
import React from 'react'

export default function BarcodeScanner() {
  return (
    <View>
      <Text>BarcodeScanner</Text>
    </View>
  )
}