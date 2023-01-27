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
import { FAB } from "react-native-paper"
import Header from "../ItemManagement/Header"
import Icon from "react-native-vector-icons/Feather"
import HeaderBack from "../../components/HeaderBack"
import { getproductlist } from "../../services/api.function"
import { useSelector } from "react-redux"
import { useFocusEffect } from "@react-navigation/native"
export default function PutawayScreen(props) {
  
  const [isview, setisview] = useState(true)
  const [item, setitem] = useState([])
  const token = useSelector((state) => state.authReducer.userToken)
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F2F4" }}>
      <StatusBar barStyle="dark-content" />
      <Header
        header="Pallets"
        back={true}
        lookup={true}
        onLookup={() => props.navigation.navigate("Lookup")}
        onPressCancel={() => props.navigation.goBack()}
        onPressFilter={() => props.navigation.navigate("Filter")}
      />
      {/* {!isview ? ( */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1
          }}
        >
          <Text style={{ color: "black", fontSize: 24, weight: "600" }}>
            No Pallets
          </Text>
        </View>
      {/* ) : (
        <View style={{ paddingHorizontal: 30, flex: 1 }}>
        </View>
      )} */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 50,
          right: 30,
          zIndex: 1,
          height: 65
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "#21618C",
            borderRadius: 50
          }}
          onPress={() => props.navigation.navigate("AddPallet")}
        >
          <Icon name="plus-circle" size={65} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
