import React, { useState } from "react"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native"
import qs from "qs"
import Spinner from "react-native-loading-spinner-overlay"
import { useToast } from "native-base"
import InputText from "../../components/InputText"
import Button from "../../components/Button"
import Icon from "react-native-vector-icons/Entypo"
import { login } from "../../services/api.function"
import { useDispatch } from "react-redux"
import { setToken } from "../../store/action/auth/action"
import logo from "../../assets/Image/ilogo.png"
const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [loading, setloading] = React.useState(false)
  const [data, setData] = React.useState({
    secureTextEntry: true
  })
  const toast = useToast()

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }

  const Validation = () => {
    let cancel = false
    if (email.length === 0) {
      cancel = true
    }
    if (password.length === 0) {
      cancel = true
    }
    if (cancel) {
      showerrorMessage("Fields can not be empty")
      return false
    } else {
      return true
    }
  }

  const LoginUser = async () => {
    if (Validation()) {
      setloading(true)
      let data = qs.stringify({
        username: email,
        password: password,
        clientid: 1,
        grant_type: "password"
      })
      console.log(data)
      await login(data)
        .then((res) => {
          showMessage("Login successfully")
          console.log("res: ", res)
          setloading(false)
          dispatch(setToken(res.access_token))
        })
        .catch((error) => {
          setloading(false)
          if (
            error.response.data.error_description ===
            "The UserCode or password is incorrect."
          ) {
            showerrorMessage("username or password is incorrect")
          } else {
            showerrorMessage(error.response.data.error_description)
          }
        })
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

  const showMessage = (message) => {
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

  const warningMessage = (message) => {
    if (message !== "" && message !== null && message !== undefined) {
      toast.show({
        title: message,
        placement: "bottom",
        status: "warning",
        duration: 5000
        // backgroundColor: 'red.500',
      })
    }
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F3F2F4"
      }}
    >
       <StatusBar barStyle="dark-content" backgroundColor={"white"} />
      <Spinner visible={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{ paddingHorizontal: 20 }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            // height: '50%',
            marginTop: "20%"

            // borderWidth: 1,
          }}
        >
          <Image
            source={logo}
            resizeMode="contain"
            style={{ width: 220, height: 120 }}
          />

          <Text
            style={{
              color: "#0F0B56",
              fontWeight: "800",
              fontSize: 24,
              lineHeight: 36
            }}
          >
            Login
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <InputText
            label="Email / Username"
            onChangeText={(email) => setEmail(email)}
            value={email}
            placeholder="Enter your Emal ID / Username"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <InputText
            label="Password"
            onChangeText={(password) => setPassword(password)}
            value={password}
            placeholder="Enter Your Password"
            secureTextEntry={data.secureTextEntry ? true : false}
          />
          <TouchableOpacity
            onPress={updateSecureTextEntry}
            style={{
              position: "absolute",
              right: 30,
              top: 20,
              zIndex: 1
            }}
          >
            <Icon
              name={data.secureTextEntry ? "eye-with-line" : "eye"}
              size={30}
              color="#ACACAC"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,

            // borderWidth: 1,
            alignItems: "center",
            left: 110
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text
              style={{
                color: "#2874A6",
                fontWeight: "700",
                fontSize: 14
                // lineHeight: 21,
                // textDecorationLine: 'underline',
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 35 }}>
          <Button text="Login" onPress={LoginUser} backgroundColor="#21618C" />
        </View>
        <View
          style={{
            width: "90%",
            flexDirection: "row",
            alignSelf: "center",
            marginTop: 10,
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              color: "#2874A6",
              fontWeight: "600",
              fontSize: 14,
              lineHeight: 21
            }}
          >
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text
              style={{
                color: "#2874A6",
                fontWeight: "600",
                fontSize: 14,
                lineHeight: 21,
                marginLeft: 5
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Login
