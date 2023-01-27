import React, { useState, useEffect } from "react"
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
  FlatList
} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import InputText from "../../components/InputText"
import { FAB } from "react-native-paper"
import Header from "../ItemManagement/Header"
import Icon from "react-native-vector-icons/Feather"
import HeaderBack from "../../components/HeaderBack"
import { getproductlist } from "../../services/api.function"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"

export default function Lookup(props) {
  const [isview, setisview] = useState(true)
  const [item, setitem] = useState([])
  const token = useSelector((state) => state.authReducer.userToken)
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F2F4" }}>
    <StatusBar barStyle="dark-content" backgroundColor={"white"} />
    {/* <Header
      header="Lookup"
      back={true}
      filtricon={true}
      onPressCancel={() => props.navigation.goBack()}
    //   onPressSave={() => onAdditem()}
    /> */}
     <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              flexDirection:'row',
              alignContent:'center'
            }}
          >
             <View
        style={{
          flexDirection: 'row',
           marginTop: 13,
           marginLeft:20
        //   justifyContent: 'space-between',
          //   alignItems: 'center',
        }}>
              <TouchableOpacity
                 onPress={() => props.navigation.goBack()}
                style={{}}>
                <Ionicons name="arrow-back" size={30} color="#0F0B56" />
              </TouchableOpacity>
            
        </View>
        <View style={{justifyContent:'center',marginLeft:120}}>
        <Text
          style={{
            color: '#0F0B56',
            fontSize: 24,
            lineHeight: 36,
            fontWeight: '600',
          }}>
         Lookup
        </Text>
        </View>
          </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ paddingHorizontal: 20 }}
      >
          <View> 
          <View style={{flexDirection:'row',marginTop:10}}>
          <View style={{ width: "87%" }}>
                <InputText
                  label="#model"
                  placeholder="Enter #model"
                //   value={rfidtxt}
                />
              </View>
              <View
                style={{
                  width: "10%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 5
                }}
              >
                <TouchableOpacity
                  // onPress={() => onshowscanneropen("rfid")}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={30}
                    color="#1FAFDF"
                  />
                </TouchableOpacity>
              </View>
             
          </View>
          <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop:260
          }}
        >
          <Text style={{ color: "black", fontSize: 24, weight: "600" }}>
            No Locations
          </Text>
        </View>
          </View> 
      </ScrollView>
  </SafeAreaView>
)
}