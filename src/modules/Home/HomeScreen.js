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
import { Toast, Select } from "native-base"
import Entypo from "react-native-vector-icons/Entypo"
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Spinner from "react-native-loading-spinner-overlay"
import {
  userprofile,
} from "../../services/api.function"
// import { setBinId, setImage } from "../../store/action/auth/action"
import { connect } from "react-redux"
import { marginBottom } from "styled-system"

class HomeScreen extends Component {
  constructor() {
    super()
    this.state = {
      bin_data: [],
      profile: [],
      name: "",
      splitname: "",
      imagepath: "",
      loading: false,
      binid: null,
      qrData: "",
      show: false,
      search: "",
      noData: false,
      binownerid: null,
      usermaster: null,
      token: "",
      profileid: "",
      activeid: null,
      userprofile: [],
      searchData: [],
      flag: false
    }
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
     console.log("token",this.props.token)
     this.GetProfile()
    })
  }
  componentWillUnmount() {
    this._unsubscribe
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
  GetProfile = async token => {
    // alert('second');
    this.setState({
      loading: true,
    });

    var data = JSON.stringify({
      User_PkeyId: 1,
      User_PkeyID_Master: 1,
      Type: 2,
    });
    try {
      const res = await userprofile(data, this.props.token);
    console.log("ressss of update",res)
          this.setState(
            {
              name: res[0][0].User_Name,
              imagepath: res[0][0].User_Image_Path,
              loading: false,
            },
           
          );
        

     
    } catch (error) {
    console.log("error is",error)
      let message = '';
      if (error.response) {
        this.setState({
          loading: false,
        });
      } else {
        message = '';
      }
      console.log({message});
    }
  };
 

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F2F4" }}>
        <Spinner visible={this.state.loading} />
        <View
          style={{
            backgroundColor: "#fff",
            height: 65,
            justifyContent:'center',
           
          }}
        >
          <View
            style={{
              justifyContent: "center",
              // alignItems: 'center',
              flexDirection: "row",
             
            }}
          >
            <TouchableOpacity
              onPress={() =>
               this.props.navigation.openDrawer()
              }
              style={{position: 'absolute', left: 20}}>
              <Entypo name="menu" size={30} color="#0F0B56" />
            </TouchableOpacity>
            <View
              style={{
                 position: "absolute",
                right: 25,
               marginTop:-5
                //   borderColor:"#FFFFFF"
              }}
            >
              <TouchableOpacity style={{ }}
                onPress={() => this.props.navigation.navigate("MyProfile")}
              >
                <Image
                  style={{
                    height: 45,
                    width: 45,
                    borderRadius: 45,
                    borderColor: "#BDBDBD",
                    borderWidth: 1,
                    
                  }}
                  source={{
                    uri: this.state.imagepath
                      ? this.state.imagepath
                      : "https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", }}>
              <Text style={styles.heading}>Hi </Text>
              <Text style={styles.heading}>{this.state.name}</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              flexDirection: "row",
              height: 80,
              borderRadius: 20,
              backgroundColor: "white",
              marginTop: 30,
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("BarcodeScanner")}
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
                style={{ marginLeft: 20 }}
              />
              {/* <Image
                  style={{
                    marginLeft:20,
                    height: 45,
                    width: 45,
                    borderRadius: 45,
                    borderColor: '#BDBDBD',
                    borderWidth: 1,
                  }}
                  source={require('../../assets/Logo/barcode.png')}
                 
                
                /> */}
              <Text
                style={{
                  color: "black",
                  fontSize: 15,
                  fontWeight: "600",
                  marginLeft: 15
                }}
              >
                Scan Barcode
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              height: 80,
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
                marginLeft: 15
              }}
            >
              Total Item Count (1000)
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              height: 80,
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
              source={require("../../assets/Logo/vendor.png")}
            />
            <Text
              style={{
                color: "black",
                fontSize: 15,
                fontWeight: "600",
                marginLeft: 30
              }}
            >
              Item Count By Vendor (40)
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              height: 80,
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
                marginLeft: 30
              }}
            >
              Item Count By Subcategory (25)
            </Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    color: "#0F0B56",
    fontSize: 24,
    fontWeight: "bold",
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
  }
})

const mapDispatchToProps = {
 
}
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.userToken,
})
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)