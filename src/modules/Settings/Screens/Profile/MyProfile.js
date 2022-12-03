import React, { Component } from "react"
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Alert
} from "react-native"
import { connect } from "react-redux"
import Ionicons from "react-native-vector-icons/Ionicons"
import InputText from "../../../../components/InputText"
import Spinner from "react-native-loading-spinner-overlay"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import ImagePicker from "react-native-image-crop-picker"
import { signOut, userId } from "../../../../store/action/auth/action"
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { FAB } from "react-native-paper"
import InputView from "../../../../components/InputView"
import Button from "../../../../components/Button"
import BackButton from "../../../../components/BackButton"
import Icon from "react-native-vector-icons/Entypo"
import { Select, useToast } from "native-base"
import {
  userprofile,
  registerStoreImage,
  updateuserprofile
} from "../../../../services/api.function"

const options = [
  "Cancel",
  <View>
    <Text style={{ color: "black" }}>Gallery</Text>
  </View>,
  <Text style={{ color: "black" }}>Camera</Text>
]

class MyProfile extends Component {
  constructor() {
    super()
    this.state = {
      form: {},
      base64: "",
      loading: false,
      hidePassword: true
    }
  }

  componentDidMount() {
    const { navigation } = this.props
    this._unsubscribe = navigation.addListener("focus", () => {
      this.getUserData()
    })
  }

  // componentWillUnmount() {
  //   this._unsubscribe
  // }
  Logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "LOGOUT", onPress: () => this.logoutUser() },
        { text: "CANCEL" }
      ],
      { cancelable: false }
    )
  }

  logoutUser = async () => {
    this.props.signOut()
  }
  onOpenImage = () => this.ActionSheet.show()

  ImageGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      multiple: false,
      compressImageQuality: 1
    }).then((image) => {
      console.log(image)
      if (image.data) {
        this.setState(
          {
            base64: image.data,
            filename:
              Platform.OS === "ios" ? image.filename : "images" + new Date(),

            form: {
              ...this.state.form,
              imagepath: image.path
            }
          },
          () => {
            this.uploadImage(image.data)
          }
        )
      }
    })
  }

  ImageCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      multiple: false,
      compressImageQuality: 1
    }).then((image) => {
      console.log(image)
      if (image.data) {
        this.setState(
          {
            base64: image.data,
            filename:
              Platform.OS === "ios" ? image.filename : "images" + new Date(),

            form: {
              ...this.state.form,
              imagepath: image.path
            }
          },
          () => {
            this.uploadImage(image.data)
          }
        )
      }
    })
  }

  uploadImage = async (base) => {
    this.setState({ loading: true })
    const { base64 } = this.state
    let data = JSON.stringify({
      Type: 6,
      User_Image_Base: "data:image/png;base64, " + base64 ? base64 : base
    })
    try {
      const res = await registerStoreImage(data, this.props.token)
      console.log(res[1], "data")
      this.setState({
        form: {
          ...this.state.form,
          imagepath: res[1]
        },
        loading: false
      })
    } catch (error) {
      if (error.request) {
        console.log(error.request)
      } else if (error.responce) {
        console.log(error.responce)
      } else {
        console.log(error)
      }
    }
  }
  onHandleChange = (key, value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [key]: value
      }
    })
    console.log("key ", key)
    console.log("Value ", value)
  }
  getUserData = async () => {
    this.setState({ loading: true })
    var data = JSON.stringify({
      User_PkeyId: 1,
      User_PkeyID_Master: 1,
      Type: 2
    })
    try {
      const res = await userprofile(data, this.props.token)
      console.log("res ==> userprofile",res[0][0])
      this.setState({
        form: {
          ...this.state.form,
          name: res[0][0].User_Name,
          password: res[0][0].User_Password,
          email: res[0][0].User_Email,
          phone: res[0][0].User_Phone,
          userid: res[0][0].User_PkeyID,
          gender: res[0][0].User_Gender,
          imagepath: res[0][0].User_Image_Path
        },
        loading: false
      })
      console.log(" res ==>form ", this.state.form)
    } catch (error) {
      console.log("hihi", { e: error.response.data.error })
      let message = ""
      if (error.response) {
        this.setState({ isLoading: false })
      } else {
        message = ""
      }
      console.log({ message })
    }
  }
  Validation = () => {
    let cancel = false
    if (this.state.form.name.length === 0) {
      cancel = true
    }
    if (this.state.form.phone.length === 0) {
      cancel = true
    }
    if (cancel) {
      showerrorMessage("Fields can not be empty")
      return false
    } else {
      return true
    }
  }

  PhoneValidation = () => {
    let cancel = false
    if (
      this.state.form.phone.length > 10 ||
      this.state.form.phone.length < 10
    ) {
      cancel = true
    }
    if (cancel) {
      showerrorMessage("Invalid Phone Number")
      return false
    } else {
      return true
    }
  }
  updateUserData = async () => {
    if (this.Validation() && this.PhoneValidation()) {
      // this.setState({loading: true});
      let data = {
        User_PkeyID: this.state.form.userid,
        User_Email: this.state.form.email,
        User_Name: this.state.form.name,
        User_Phone: this.state.form.phone,
        User_Gender: this.state.form.gender,
        User_Image_Path: this.state.form.imagepath,
        User_Password: this.state.form.password,
        Type: 2,
        User_Type: 1,
        User_IsActive: 1,
        User_IsDelete: 0
      }
      console.log(data, "userrrrr")
      try {
        const res = await updateuserprofile(data, this.props.token)
        console.log("ressssss:", res)
        this.getUserData()
        alert("Profile Updated")
      } catch (error) {
        console.log("errrro", error)
      }
    }
  }
  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword })
  }
  showMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      toast.show({
        title: message,
        placement: "bottom",
        status: "success",
        duration: 5000
        // backgroundColor: 'red.500',
      })
    }
  }

  validateGender = (value) => {
    var lvalue = 0
    switch (value) {
      case null: {
        lvalue = "NA"
        break
      }
      case 2: {
        lvalue = "Other"
        break
      }
      case 1: {
        lvalue = "Male"
        break
      }
      case 0: {
        lvalue = "Female"
        break
      }
    }
    return lvalue
  }

  render() {
    const { name, email, phone, gender, imagepath, password } = this.state.form
    console.log("imagepath",imagepath)
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F2F4" }}>
        <Spinner visible={this.state.loading} />
        <View
          style={{
            backgroundColor: "#fff",
            height: 60,
            justifyContent: "center",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{ position: "absolute", left: 20, top: 20 }}
          >
            <Ionicons name="arrow-back" size={30} color="#0F0B56" />
          </TouchableOpacity>
          <Text
            style={{
              color: "#0F0B56",
              fontSize: 24,
              lineHeight: 36,
              fontWeight: "700",
              top: 20
            }}
          >
            My Profile
          </Text>
          <TouchableOpacity
            onPress={() => this.Logout()}
            style={{ position: "absolute", right: 20, top: 20 }}
          >
            <Text style={{ color: "#21618C", fontSize: 18, fontWeight: "600" }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => this.onOpenImage()}
          >
            <Image
              style={{
                height: 140,
                width: 140,
                borderRadius: 120,
                borderColor: "#21618C",
                borderWidth: 1
              }}
              source={{
                uri: imagepath
                  ? imagepath
                  : "https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
              }}
            />
            <FAB
              small
              icon="camera"
              style={{
                position: "absolute",
                right: 100,
                bottom: 10,
                backgroundColor: "#ACACAC"
              }}
            />
          </TouchableOpacity>
          <ActionSheet
            ref={(o) => (this.ActionSheet = o)}
            title={
              <Text style={{ color: "#000", fontSize: 18 }}>Profile Photo</Text>
            }
            options={options}
            cancelButtonIndex={0}
            destructiveButtonIndex={4}
            useNativeDriver={true}
            onPress={(index) => {
              if (index === 0) {
                // cancel action
              } else if (index === 1) {
                this.ImageGallery()
              } else if (index === 2) {
                this.ImageCamera()
              }
            }}
          />
        </View>

        <ScrollView style={{ paddingHorizontal: 20 }}>
          <View
            style={{
              marginTop: 10
            }}
          >
            <InputText
              label="Full Name"
              value={name}
              onChangeText={(text) => this.onHandleChange("name", text)}
            />
          </View>
          <View
            style={{
              marginTop: 20
            }}
          >
            <InputText
              label="Phone no."
              value={phone}
              keyboardType="numeric"
              onChangeText={(text) => this.onHandleChange("phone", text)}
            />
          </View>
          <View
            style={{
              marginTop: 20
            }}
          >
            <InputText label="Email Address" value={email} />
          </View>
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Select
              _selectedItem={{
                bg: "#ACACAC"
              }}
              mt={1}
              style={{
                justifyContent: "center",
                height: 65,
                fontSize: 14,
                color: "#000000",
                backgroundColor: "#fff"
              }}
              mode="dropdown"
              width="100%"
              placeholder="Select Gender"
              selectedValue={gender}
              onValueChange={(itemValue) =>
                { 
            console.log("itemValue",itemValue)
            this.onHandleChange("gender", itemValue)}
              }
            >
              <Select.Item label="Female" value={1} />
              <Select.Item label="Male" value={2} />
              <Select.Item label="Other" value={3} />
            </Select>
          </View>
          <View
            style={{
              marginTop: 20
            }}
          >
            <InputText
              label="Password"
              value={password}
              onChangeText={(text) => this.onHandleChange("password", text)}
              secureTextEntry={this.state.hidePassword}
            />
            <TouchableOpacity
              onPress={() => this.managePasswordVisibility()}
              style={{
                position: "absolute",
                right: 30,
                top: 20,
                zIndex: 1
              }}
            >
              <Icon
                name={this.state.hidePassword ? "eye-with-line" : "eye"}
                size={30}
                color="#ACACAC"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 20
            }}
          >
            <Button
              text="Update Profile"
              onPress={() => this.updateUserData()}
              backgroundColor="#21618C"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const mapDispatchToProps = {
  signOut
}
const mapStateToProps = (state) => ({
  token: state.authReducer.userToken
})
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)
