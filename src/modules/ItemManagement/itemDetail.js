import React, {useState, useEffect} from 'react';
import {
  getvendormaster,
  getsubcategorymaster,
  additemdata,
} from '../../services/api.function';
import { CameraScreen,RNCamera } from "react-native-camera-kit"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import Barcodescanner from '../Home/BarcodeScanner';
import {Select, Toast} from 'native-base';
import InputText from '../../components/InputText';
import Header from './Header';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
import { createIconSetFromFontello } from 'react-native-vector-icons';

export default function ItemDetail(props) {
  const [camrearef, setcamrearef] = useState(null)
  const [showview, setshowview] = useState(false);
  const [id,setid]=useState(false)
  const [rfid,setrfid]=useState(null)
  const [lpn,setlpn]=useState(null)
  const [qty,setqty]=useState(null)
  const [series,setseries]=useState(null)
  const onReadCode = (event) => {
    if (event.nativeEvent.codeStringValue) {
      if(id === 'model')
      setrfid(event.nativeEvent.codeStringValue)
      if(id === 'lpl')
      setlpn(event.nativeEvent.codeStringValue)
      if(id === 'qty')
      setqty(event.nativeEvent.codeStringValue)
      if(id === 'series')
      setseries(event.nativeEvent.codeStringValue)
     console.log("qrcode is ",event.nativeEvent.codeStringValue)
     setshowview(false);
    }
  }
  const onshowscanneropen = (text) => {
    console.log("text is",text)
    setid(text)
    setshowview(true);
  }
  return (
    <View style={{flex:1}}>
    {/* // <ScrollView  style={{height:'100%'}}>
//     <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
//  <StatusBar barStyle="dark-content" backgroundColor={"white"} />
//       <Header */}
{/* //         header="Add Item"
//         back={true}
//         save={true}
//         onPressCancel={() => props.navigation.goBack()}
//         // onPressSave={() => onupdate()}
//       />
      {/* <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{paddingHorizontal: 20}}> */}
          {showview ?
          <View style={{paddingHorizontal:20}}>
 <CameraScreen
        ref={(ref) => setcamrearef(ref)}
        focusMode={"on"}
        flashMode= {"auto"}
        zoomMode={"on"}
        scanBarcode={true}
        barcodeScannerEnabled
        
        onReadCode={(event) => onReadCode(event)} // optional
        showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
        laserColor="red" // (default red) optional, color of laser in scanner frame
        frameColor="white" // (default white) optional, color of border of scanner frame
      />
          </View>:
        <View style={{width: '100%', alignSelf: 'center',marginTop:20}}>
        
          <View>
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row',marginLeft:5}}>
              <View style={{width: '87%'}}>
                <InputText
                  label="RFID tag"
                  placeholder="Enter RFID tag"
                value={rfid}
                />
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <TouchableOpacity
                   onPress={() => onshowscanneropen("model")}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={30}
                    color="#1FAFDF"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row',marginLeft:5}}>
              <View style={{width: '87%'}}>
                <InputText
                  label="LPN#(Pallet only)"
                  placeholder="Enter LPN#(Pallet only)"
                   value={lpn}
                />
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <TouchableOpacity
                  onPress={() => onshowscanneropen("lpl")}
                  // onPress={() =>
                  //   props.navigation.navigate('BarcodeScanner', {
                  //     title: 'lpn',
                  //   })
                  // }
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={30}
                    color="#1FAFDF"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row',marginLeft:5}}>
              <View style={{width: '87%'}}>
                <InputText
                  label="Model#"
                  placeholder="Enter Model#"
                   value={series}
                />
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <TouchableOpacity
                onPress={() => onshowscanneropen("series")}
                  // onPress={() =>
                  //   props.navigation.navigate('BarcodeScanner', {
                  //     title: 'model',
                  //   })
                  // }
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={30}
                    color="#1FAFDF"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row',marginLeft:5}}>
              <View style={{width: '87%'}}>
                <InputText label="QTY" placeholder="Enter QTY" 
              value={qty} 
                />
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <TouchableOpacity
                  onPress={() => onshowscanneropen("qty")}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={30}
                    color="#1FAFDF"
                  />
                </TouchableOpacity>
              </View>
            </View>
        
      </View>
      </View>
}
</View>
  )
}
const styles = StyleSheet.create({
  dropdown: {
    height: 58,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderColor:'#21618C',
    backgroundColor: '#FFF',
    width: '100%',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    borderBottomRightRadius:5,
    borderBottomLeftRadius:5,
  },
  icon: {
    marginRight: 5,
    color: '#000',
  },
  label: {
    position: 'absolute',
    backgroundColor: '#000',
    left: 22,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    display: 'none',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: '#21618C',
    color: 'black',
  },
  item: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    fontSize: 16,
    color: 'black',
  },
});
