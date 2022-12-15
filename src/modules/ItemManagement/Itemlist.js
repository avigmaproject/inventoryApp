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
import Header from "./Header"
import Icon from "react-native-vector-icons/Feather"
import HeaderBack from "../../components/HeaderBack"
import { getproductlist } from "../../services/api.function"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

import { useSelector } from "react-redux"
export default function Itemlist(props) {
  useEffect(() => {
    GetProductList()
  }, [])
  useFocusEffect(
    React.useCallback(() => {
      GetProductList()
    }, [])
  )
  const [item, setitem] = useState([])
  const token = useSelector((state) => state.authReducer.userToken)
  console.log("token is", token)
  const GetProductList = async () => {
    let data = {
      Type: 4
    }
    console.log("data and tokenhome apgeeee", data, token)
    await getproductlist(data, token)
      .then((res) => {
        console.log("res of Product List........", res)
        setitem(res[0])
      })
      .catch((error) => {
        console.log("errror is.....", error)
      })
  }
  const _onHandleItemSelected = (itemdetail) => {
    AsyncStorage.setItem(`rfid`, itemdetail.Pro_RFIDTag.toString())
    AsyncStorage.setItem(`rfid1`, itemdetail.Pro_RFIDTag.toString())
    AsyncStorage.setItem(`lpn`,itemdetail.Pro_LPN.toString())
    AsyncStorage.setItem(`qty`, itemdetail.Pro_Qty.toString())
    AsyncStorage.setItem(`model`,itemdetail.Pro_Model.toString())
    AsyncStorage.setItem(`model1`,itemdetail.Pro_Model.toString())
    AsyncStorage.setItem(`id`,itemdetail.Pro_TypeOfItem.toString())
    AsyncStorage.setItem(`serial`,itemdetail.Pro_Serial.toString())
    AsyncStorage.setItem("id", itemdetail.Pro_TypeOfItem.toString())
    const data = { value: itemdetail.Pro_Vendor, label: itemdetail.Ven_Name }
    AsyncStorage.setItem(`vendor`, JSON.stringify(data))
    const data1 = {
      value: itemdetail.Pro_Category,
      label: itemdetail.Cat_Name
    }
    AsyncStorage.setItem(`category`, JSON.stringify(data1))
    const data2 = {
      value: itemdetail.Pro_SubCategory,
      label: itemdetail.SubCat_Name
    }
    AsyncStorage.setItem(`subcategory`, JSON.stringify(data2))
    props.navigation.navigate("Additem", { isedit: true })
  }
  const _renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          backgroundColor: "white",
          marginTop: 30,
          alignItems: "center"
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => _onHandleItemSelected(item)}
        >
          <Image
            style={{
              marginLeft: 20,
              height: 35,
              width: 35,
              borderRadius: 45,
              borderColor: "#BDBDBD",
              borderWidth: 1
            }}
            source={require("../../assets/Logo/items.png")}
          />
          <Text
            style={{
              color: "black",
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 30
            }}
          >
            {item.Pro_PkeyID}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F2F4" }}>
      <StatusBar barStyle="dark-content" />
      <Header
        header="Items"
        back={true}
        filtricon={true}
        onPressCancel={() => props.navigation.goBack()}
        onPressFilter={() => props.navigation.navigate("Filter")}
      />

      <View style={{ paddingHorizontal: 30, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            height: 50,
            backgroundColor: "white",
            marginTop: 30,
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() =>
              props.navigation.navigate("Additem", { isedit: false })
            }
          >
            <Icon
              name="plus-circle"
              size={30}
              color="#21618C"
              style={{ marginLeft: 20 }}
            />

            <Text
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "600",
                marginLeft: 30
              }}
            >
              Add Item
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList data={item} renderItem={_renderItem} />
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 10,
            right: 20,
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
            onPress={() =>
              props.navigation.navigate("Additem", { isedit: false })
            }
          >
            <Icon name="plus-circle" size={65} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}
