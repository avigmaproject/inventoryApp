import React, { useState, useEffect } from "react"
import {
  getvendormaster,
  getsubcategorymaster,
  additemdata,
  getcategorymaster
} from "../../services/api.function"
import { CameraScreen, RNCamera } from "react-native-camera-kit"
import { useToast } from "native-base"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  Image
} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Select, Toast } from "native-base"
import InputText from "../../components/InputText"
import Header from "../ItemManagement/Header"
import { Dropdown } from "react-native-element-dropdown"
import { useSelector } from "react-redux"
import { useIsFocused } from '@react-navigation/native';
export default function AddPallet(props) {
  const [selectedvendorItems, setselectedvendorItems] = useState(null)
  const [selectedcatItems, setselectedcatItems] = useState({})
  const [selectedsubcatItems, setselectedsubcatItems] = useState({})
  const [subcatdropdown, setsubcatdropdown] = useState([])
  const [isview, setisview] = useState(false)
  const [isviewcat, setisviewcat] = useState(false)
  const [isviewsub, setisviewsub] = useState(false)
  const [isFocus, setIsFocus] = useState(false)
  const [isFocuscat, setIsFocuscat] = useState(false)
  const [isFocusubcat, setIsFocusubcat] = useState(false)
  const [vendor, setvendor] = useState([])
  const [Category, setcategory] = useState([])
  const [vendorid, setvendorid] = useState([])
  const [vid, setvid] = useState([])
  const [catid, setcatid] = useState([])
  const [subcatid, setsubcatid] = useState([])
  const [catiddata, setcatiddata] = useState([])

  const [subCategory, setsubcategory] = useState([])
  const [barcodeid, setbarcodeid] = useState(null)
  const [rfidtxt, setrfidtxt] = useState(null)
  const [rfidtxt1, setrfidtxt1] = useState(null)
  const [lpntxt, setlpntxt] = useState(null)
  const [modeltxt, setmodeltxt] = useState(null)
  const [model1txt, setmodel1txt] = useState(null)
  const [qtytxt, setqtytxt] = useState(null)
  const [serialtxt, setserialtxt] = useState(null)
  const [camrearef, setcamrearef] = useState(null)
  const [showview, setshowview] = useState(false)
  const [id, setid] = useState(false)
  const token = useSelector((state) => state.authReducer.userToken)
  const isFocused = useIsFocused();
  useEffect(() => {
    GetVendorMaster()
    Vendorid(), Categoryid()
  }, [vid])
  useEffect(() => {
    Categoryid()
  }, [catid])
  useEffect(() => {
    Subcategoryid()
  }, [subcatid])
  const onReadCode = (event) => {
    if (event.nativeEvent.codeStringValue) {
      if (barcodeid === "rfid") setrfidtxt(event.nativeEvent.codeStringValue)
      if (barcodeid === "rfid1") setrfidtxt1(event.nativeEvent.codeStringValue)
      if (barcodeid === "lpn") setlpntxt(event.nativeEvent.codeStringValue)
      if (barcodeid === "model") setmodeltxt(event.nativeEvent.codeStringValue)
      if (barcodeid === "model1")
        setmodel1txt(event.nativeEvent.codeStringValue)
      if (barcodeid === "qty") setqtytxt(event.nativeEvent.codeStringValue)
      if (barcodeid === "serial")
        setserialtxt(event.nativeEvent.codeStringValue)
      console.log("qrcode is ", event.nativeEvent.codeStringValue)
      setshowview(false)
    }
  }
  const onshowscanneropen = (text) => {
    console.log("text is", text)
    setbarcodeid(text)
    setshowview(true)
  }
  const toast = useToast()
  const Validation = () => {
    let cancel = false

    if (!vendor) {
      cancel = true
    }
    if (!Category) {
      cancel = true
    }
    if (!subCategory) {
      cancel = true
    }
    if (id === "1") {
      if (!rfidtxt) {
        cancel = true
      }
      if (!lpntxt) {
        cancel = true
      }
      if (!modeltxt) {
        cancel = true
      }
      if (!qtytxt) {
        cancel = true
      }
    } else {
      if (!rfidtxt1) {
        cancel = true
      }

      if (!model1txt) {
        cancel = true
      }
      if (!serialtxt) {
        cancel = true
      }
    }

    if (cancel) {
      showerrorMessage("Fields can not be empty")
      return false
    } else {
      return true
    }
  }
  const showerrorMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      toast.show({
        title: message,
        placement: "bottom",
        status: "error",
        duration: 5000
        // backgroundColor: 'red.500',
      })
    }
  }
  const onAdditem = async () => {
    if (Validation()) {
      let data = {
        Type: 1,
        Pro_Vendor: selectedvendorItems.value,
        Ven_Name: selectedvendorItems.label,
        Pro_Category: selectedcatItems.value,
        Cat_Name: selectedcatItems.label,
        Pro_SubCategory: selectedsubcatItems.value,
        SubCat_Name: selectedsubcatItems.label,
        Pro_TypeOfItem: id,
        Pro_RFIDTag: id == "2" ? rfidtxt1 : rfidtxt,
        Pro_LPN: lpntxt,
        Pro_Model: id == "2" ? model1txt : modeltxt,
        Pro_Serial: serialtxt,
        Pro_Qty: qtytxt,
        Pro_IsActive: true
      }
      // return 0
      await additemdata(data, token)
        .then((res) => {
          alert("Item Added")
          console.log(
            "subcategory items are ........",
            data.Pro_SubCategory,
            data.SubCat_Name
          )
          props.navigation.navigate("Itemlist")
        })
        .catch((error) => {
          console.log("errror is.....", error)
        })
    }
  }
  const onvendorselected = async (item) => {
    setselectedvendorItems(item)
    console.log("vendor item.....", item)
    const vanderitem = JSON.stringify(item.value)
    setvid(vanderitem)
    Vendorid()
    console.log("vid is", vid)
    setisview(true)
  }
  const oncatselected = async (item) => {
    setselectedcatItems(item)
    setisviewcat(true)
    const catitem = JSON.stringify(item.value)
    setcatid(catitem)
    Categoryid(catitem)
    GetSubCategory(item)
  }
  const onsubselected = (item) => {
    setselectedsubcatItems(item)
    setsubcatdropdown(item.value)
    setisviewsub(true)
    const subcatitem = JSON.stringify(item.value)
    setsubcatid(subcatitem)
    Subcategoryid(subcatitem)
  }
  const Categoryid = async (id) => {
    let data = {
      Type: 2,
      Cat_Pkey: id ? id: catid
    }
    await getcategorymaster(data, token)
      .then((res) => {
        setcatiddata(res[0][0].Cat_ID)
      })
      .catch((error) => {
        console.log("errorr of vendor is", error)
      })
  }
  const Vendorid = async () => {
    let data = {
      Type: 2,
      Ven_PkeyID: vid
    }
    await getvendormaster(data, token)
      .then((res) => {
        console.log("response of vendor  ", res[0])
        const vendoriddata = res[0][0].Ven_ID
        setvendorid(vendoriddata)
      })
      .catch((error) => {
        console.log("errorr of vendor is", error)
      })
  }
  const Subcategoryid = async (id) => {
    let data = {
      Type: 2,
      SubCat_Pkey:id?id: subcatid
    }
    await getsubcategorymaster(data, token)
      .then((res) => {
        const subcaytiddata = res[0][0].SubCat_ID
        setsubcatid(subcaytiddata)
      })
      .catch((error) => {
        console.log("errorr of vendor is", error)
      })
  }
  const GetVendorMaster = async () => {
    let data = {
      Type: 4
    }
    // console.log("data and token", data, token)
    await getvendormaster(data, token)
      .then((res) => {
        const fetchvendor = res[0]
        const collectvendor = fetchvendor?.map((item) => {
          return { value: item.Ven_PkeyID, label: item.Ven_Name }
        })
        setvendor(collectvendor)
        const fetchcat = res[1]
        const collectcat = fetchcat?.map((item) => {
          return { value: item.Cat_Pkey, label: item.Cat_Name }
        })
        const cat = fetchcat?.map((item) => {
          return { value: item.Cat_ID, label: item.Cat_Name }
        })
        setcatid(cat)
        console.log("category id", cat)
        setcategory(collectcat)
        console.log("response of collectcat is", collectvendor)
      })
      .catch((error) => {
        console.log("errorr of vendor is", error)
      })
  }
  const GetSubCategory = async (item) => {
    console.log("item", item)
    console.log("id of subcategory", item.value)
    let data = {
      Type: 5,
      SubCat_Cat_Pkey: item.value
    }
    console.log("")
    console.log("data and token", data, token)
    await getsubcategorymaster(data, token)
      .then((res) => {
        const fetchsubcat = res[0]
        console.log("subcatttt", fetchsubcat)
        const collectsubcat = fetchsubcat?.map((item) => {
          return { value: item.SubCat_Pkey, label: item.SubCat_Name }
        })
        setsubcategory(collectsubcat)
        console.log("selected sub class  ", collectsubcat)
        // console.log('responsee of subcategory', collectsubcat);
      })
      .catch((error) => {
        console.log("errorr of subcategory is", error)
      })
  }
  const onselectItem = async (itemValue) => {
    // await AsyncStorage.setItem('id', itemValue);
    setid(itemValue)
    console.log("id", id)
  }
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    )
  }
  const renderItemcat = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    )
  }
  const renderItemsubcat = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    )
  }
  return (
    // <ScrollView  style={{height:'100%'}}>
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F2F4" }}>
      <StatusBar barStyle="dark-content" backgroundColor={"white"} />
      <Header
        header="Add Pallet"
        back={true}
        save={true}
        title={"Save"}
        onPressCancel={() => props.navigation.goBack()}
        onPressSave={() => onAdditem()}
      />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={{ paddingHorizontal: 20 }}
        >
            <View> 
            <View style={{flexDirection:'row',marginTop:10}}>
            <View style={{ width: "87%" }}>
                  <InputText
                    label="RFID tag"
                    placeholder="Enter RFID tag"
                    value={rfidtxt}
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
            <View style={{flexDirection:'row',marginTop:10}}>
            <View style={{ width: "87%" }}>
                  <InputText
                    label="Location"
                    placeholder="Scan Location"
                    value={rfidtxt}
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
            {/* <View>
                <TouchableOpacity
        //   onPress={onPressSave}
          style={{
            backgroundColor:'#21618C',
            height: 35,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:15
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              lineHeight: 21,
              fontWeight: '500',
            }}>
            Status
          </Text>
        </TouchableOpacity>
                </View> */}

            </View>
           
         
                
           
        
           
        </ScrollView>
   
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  dropdown: {
    height: 58,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderColor: "#21618C",
    backgroundColor: "#FFF",
    width: "100%",
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },
  icon: {
    marginRight: 5,
    color: "#000"
  },
  label: {
    position: "absolute",
    backgroundColor: "#000",
    left: 22,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    display: "none"
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#000"
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#000"
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: "#21618C",
    color: "black"
  },
  item: {
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textItem: {
    fontSize: 16,
    color: "black"
  }
})
