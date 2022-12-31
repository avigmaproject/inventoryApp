import React, { Component } from "react"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Animated,
  Alert
} from "react-native"
import { Toast, Select, ThreeDotsIcon } from "native-base"
import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import InputText from "../../components/InputText"
import Spinner from "react-native-loading-spinner-overlay"
import { Dropdown } from "react-native-element-dropdown"
import {
  userprofile,
  gethomemasterdata,
  getProduct,
  getvendormaster
} from "../../services/api.function"
// import { setBinId, setImage } from "../../store/action/auth/action"
import { connect } from "react-redux"
import { flexDirection, marginBottom } from "styled-system"

class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      profile: [],
      name: "",
      imagepath: "",
      loading: false,
      show: false,
      search: "",
      token: "",
      userprofile: [],
      vender: "",
      totalitem: "",
      subcatitem: "",
      showvendorview: false,
      showcatview: false,
      showsubcatview: false,
      showvendorcard: false,
      showcatcard: false,
      showsubcatcard: false,
      vendorname: "",
      categoryname: "",
      venderitemcount: 0,
      catitemcount: 0,
      subcatitemcount: 0,
      vendordata: [],
      categorydata: [],
      selectedvendorItems: [],
      isFocus: false,
      selectedcatItems: [],
      catisFocus: false,
      vendorcount: 0,
      catcount: 0
    }
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      console.log("token", this.props.token)
      this.GetProfile(), this.GetHomeData()
      this.GetVendorMaster()

      // this.GetProductList()
    })
  }
  componentWillUnmount() {
    this.GetProfile(), this.GetHomeData()
    this.GetVendorMaster()
    // this._unsubscribe
  }
  GetVendorMaster = async () => {
    let data = {
      Type: 4
    }
    // console.log("data and token", data, token)
    await getvendormaster(data, this.props.token)
      .then((res) => {
        const fetchvendor = res[0]
        const collectvendor = fetchvendor?.map((item) => {
          return { value: item.Ven_PkeyID, label: item.Ven_Name }
        })
        this.setState({ vendordata: collectvendor })
        const fetchcat = res[1]
        const collectcat = fetchcat?.map((item) => {
          return { value: item.Cat_Pkey, label: item.Cat_Name }
        })
        this.setState({ categorydata: collectcat })

        // console.log("response of collectcat is", collectvendor)
      })
      .catch((error) => {
        console.log("errorr of vendor is", error)
      })
  }
  onvendorselected = (item) => {
    this.setState(
      {
        ...this.state,
        selectedvendorItems: item,
        showvendorview: false,
        searchdata:item.lable,
        id:1,
      },
      () => this.GetProductList("venderitemcount",item.label)
    )
  }
  oncatselected = (item) => {
    this.setState(
      {
        selectedcatItems: item,
        showcatview: false,
      },
      () => this.GetProductList("catitemcount",item.label)
    )
  }
  showMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      Toast.show({
        title: message,
        placement: "bottom",
        status: "success",
        duration: 5000
        // backgroundColor: 'red.500',
      })
    }
  }

  onvenderview = () => {
    if (this.state.showvendorview == false) {
      this.setState({
        showvendorview: true
      })
    } else {
      this.setState({
        showvendorview: false
      })
    }
  }
  oncatview = () => {
    if (this.state.showcatview == false) {
      this.setState({
        showcatview: true
      })
    } else {
      this.setState({
        showcatview: false
      })
    }
  }
  onsubcatview = () => {
    if (this.state.showsubcatview == false) {
      this.setState({
        showsubcatview: true
      })
    } else {
      this.setState({
        showsubcatview: false
      })
    }
  }

  renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    )
  }
  renderItemcat = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    )
  }
  GetProductList = async (key,data1) => {
    let data = {
      Type: 6,
      Pro_Vendor_Name: key === "venderitemcount" ? data1 :"",
      Cat_Name: key === "catitemcount" ? data1 :"",
      SubCat_Name: "",
      PageNumber: 1,
      NoofRows: 100
    }
    console.log("GetProductList", data)
    await getProduct(data, this.props.token)
      .then((res) => {
        this.setState({
          [key]: res[0].length
        })
      })
      .catch((error) => {
        console.log("errror is.....", error)
      })
  }

  GetHomeData = async () => {
    let data = {
      Type: 1
    }
    await gethomemasterdata(data, this.props.token)
      .then((res) => {
        this.setState({
          vender: res[1][0].TotalVendorCount,
          totalitem: res[0][0].TotalItemCount,
          subcatitem: res[2][0].TotalCategoryCount
        },()=> this.GetVendorMaster())
      })
      .catch((error) => {
        console.log("errror is.....", error)
      })
  }
  GetProfile = async () => {
    this.setState({
      loading: true
    })
    var data = JSON.stringify({
      User_PkeyId: 1,
      User_PkeyID_Master: 1,
      Type: 2
    })
    try {
      const res = await userprofile(data, this.props.token)
      // console.log("ressss of update",res)
      this.setState({
        name: res[0][0].User_Name,
        imagepath: res[0][0].User_Image_Path,
        loading: false
      })
    } catch (error) {
      console.log("error is", error)
      let message = ""
      if (error.response) {
        this.setState({
          loading: false
        })
      } else {
        message = ""
      }
      console.log({ message })
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F2F4" }}>
        <StatusBar barStyle="dark-content" backgroundColor={"white"} />
        <Spinner visible={this.state.loading} />
        <ScrollView keyboardShouldPersistTaps="handled" style={{}}>
          <View
            style={{
              backgroundColor: "#fff",
              height: 60,
              justifyContent: "center"
            }}
          >
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}
                style={{ position: "absolute", left: 20 }}
              >
                <Entypo name="menu" size={30} color="#0F0B56" />
              </TouchableOpacity>
              <View
                style={{
                  position: "absolute",
                  right: 25,
                  marginTop: -5
                  //   borderColor:"#FFFFFF"
                }}
              >
                <TouchableOpacity
                  style={{}}
                  onPress={() => this.props.navigation.navigate("MyProfile")}
                >
                  <Image
                    style={{
                      height: 45,
                      width: 45,
                      borderRadius: 45,
                      borderColor: "#BDBDBD",
                      borderWidth: 1
                    }}
                    source={{
                      uri: this.state.imagepath
                        ? this.state.imagepath
                        : "https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.heading}>Hi {this.state.name}</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 30 }}>
            <View
              style={{
                flexDirection: "row",
                height: 70,
                borderRadius: 20,
                backgroundColor: "white",
                marginTop: 30,
                alignItems: "center"
              }}
            >
              <Image
                style={{
                  marginLeft: 20,
                  height: 45,
                  width: 45,
                  borderRadius: 45,
                  borderColor: "#BDBDBD",
                  borderWidth: 1
                }}
                source={require("../../assets/Logo/items.png")}
              />
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: "600",
                  marginLeft: 20
                }}
              >
                Total Item Count ( {this.state.totalitem} )
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                height: 70,
                borderRadius: 20,
                backgroundColor: "white",
                marginTop: 30,
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => this.onvenderview()}
              >
                <Image
                  style={{
                    marginLeft: 20,
                    height: 45,
                    width: 45,
                    borderRadius: 45,
                    borderColor: "#BDBDBD",
                    borderWidth: 1
                  }}
                  source={require("../../assets/Logo/vendor.png")}
                />
                <Text style={styles.textlabel}>
                  Item Count By
                  {this.state.selectedvendorItems === "" && (
                    <Text> Vendor</Text>
                  )}{" "}
                  {this.state.selectedvendorItems.label} ({" "}
                  {this.state.venderitemcount} )
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.showvendorview && (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 15
                }}
              >
                <View style={{ width: "100%", alignSelf: "center" }}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    containerStyle={{
                      backgroundColor: "#FFF",
                      borderBottomEndRadius: 5,
                      borderBottomStartRadius: 5,
                      borderWidth: 0,
                      marginTop: -2,
                      width: "90%",
                      marginLeft: 1
                    }}
                    //  activeColor="#1FAFDF"
                    data={this.state.vendordata}
                    autoScroll
                    dropdownPosition="bottom"
                    search
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    placeholder={"Select Vendor"}
                    searchPlaceholder="Search..."
                    value={this.state.selectedvendorItems}
                    onFocus={() => this.setState({ isFocus: true })}
                    onBlur={() => this.setState({ isFocus: false })}
                    onChange={(item) => this.onvendorselected(item)}
                    renderItem={this.renderItem}
                  />
                </View>
              </View>
            )}

            <View
              style={{
                flexDirection: "row",
                height: 70,
                borderRadius: 20,
                backgroundColor: "white",
                marginTop: 30,
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row" }}
                onPress={() => this.oncatview()}
              >
                <Image
                  style={{
                    marginLeft: 20,
                    height: 45,
                    width: 45,
                    borderRadius: 45,
                    borderColor: "#BDBDBD",
                    borderWidth: 1
                  }}
                  source={require("../../assets/Logo/vendor.png")}
                />
                <Text style={styles.textlabel}>
                  Item Count By
                  {this.state.selectedvendorItems === "" && (
                    <Text> Class</Text>
                  )}{" "}
                  {this.state.selectedcatItems.label} ({" "}
                  {this.state.catitemcount} )
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.showcatview && (
              <View
                style={{
                  flexDirection: "row",

                  marginTop: 15
                }}
              >
                <View style={{ width: "80%", alignSelf: "center" }}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    containerStyle={{
                      backgroundColor: "#FFF",
                      borderBottomEndRadius: 5,
                      borderBottomStartRadius: 5,
                      borderWidth: 0,
                      marginTop: -2,
                      width: "90%",
                      marginLeft: 1
                    }}
                    //  activeColor="#1FAFDF"
                    data={this.state.categorydata}
                    autoScroll
                    dropdownPosition="bottom"
                    search
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    placeholder={"Select Class"}
                    searchPlaceholder="Search..."
                    value={this.state.selectedcatItems}
                    onFocus={() => this.setState({ catisFocus: true })}
                    onBlur={() => this.setState({ catisFocus: false })}
                    onChange={(item) => this.oncatselected(item)}
                    renderItem={this.renderItemcat}
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    color: "#0F0B56",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 30
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75
  },
  backRightBtnLeft: {
    backgroundColor: "blue",
    right: 75
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0
  },
  backTextWhite: {
    color: "#FFF"
  },
  dropdown: {
    height: 50,
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
  },
  textlabel: {
    color: "black",
    fontSize: 15,
    fontWeight: "600",
    marginRight: 10,
    marginLeft: 20,
    marginTop: 5,
    flex: 1,
    flexWrap: "wrap"
  }
})

const mapDispatchToProps = {}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.userToken
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
