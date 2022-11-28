import React, {Component} from 'react';
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
} from 'react-native';
import { connect } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import InputText from '../../../../components/InputText';
import Spinner from 'react-native-loading-spinner-overlay';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {signOut,userId} from '../../../../store/action/auth/action';
import {ActionSheetCustom as ActionSheet} from 'react-native-actionsheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAB} from 'react-native-paper';
import InputView from '../../../../components/InputView';
import Button from '../../../../components/Button';
import BackButton from '../../../../components/BackButton';
import {Select, useToast} from 'native-base';
import {
  userprofile,
  registerStoreImage,
  updateuserprofile,
} from '../../../../services/api.function';

const options = [
  'Cancel',
  <View>
    <Text style={{color: 'black'}}>Gallery</Text>
  </View>,
  <Text style={{color: 'black'}}>Camera</Text>,
];

class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      base64: '',
      filename: 'image',
      imagepath: '',
      loading: false,
      name: '',
      email: '',
      phone: null,
      gender: null,
      userid: null,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
     console.log("token",this.props.token)
    this.getUserData()
    

    });
  }

  componentWillUnmount() {
    this._unsubscribe;
  }
  Logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [{text: 'LOGOUT', onPress: () => this.logoutUser()}, {text: 'CANCEL'}],
      {cancelable: false},
    );
  };

  logoutUser = async () => {
    this.props.signOut();
  };
  onOpenImage = () => this.ActionSheet.show();

  ImageGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      multiple: false,
      compressImageQuality: 0.5,
    }).then(image => {
      console.log(image);
      if (image.data) {
        this.setState(
          {
            base64: image.data,
            filename:
              Platform.OS === 'ios' ? image.filename : 'images' + new Date(),
            imagepath: image.path,
          },
          () => {
            this.uploadImage();
          },
        );
      }
    });
  };

  ImageCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      multiple: false,
      compressImageQuality: 0.5,
    }).then(image => {
      console.log(image);
      if (image.data) {
        this.setState(
          {
            base64: image.data,
            filename:
              Platform.OS === 'ios' ? image.filename : 'images' + new Date(),
            imagepath: image.path,
          },
          () => {
            this.uploadImage();
          },
        );
      }
    });
  };

  uploadImage = async () => {
    this.setState({loading: true});
    const {base64} = this.state;
    let data = JSON.stringify({
      Type: 6,
      User_Image_Base: 'data:image/png;base64, ' + base64,
    });
    try {
      const res = await registerStoreImage(data, this.props.token);
      console.log(data, 'dataaaaaa');
      console.log(res, 'resssss');
      AsyncStorage.setItem('imagepath', res[1]);
      this.setState({loading: false});
    } catch (error) {
      if (error.request) {
        console.log(error.request);
      } else if (error.responce) {
        console.log(error.responce);
      } else {
        console.log(error);
      }
    }
  };
  onHandleChange = (key, value) => {
  
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          [key]: value,
        },
      });
    }
  getUserData = async () => {
    this.setState({loading: true});
    var data = JSON.stringify({
      User_PkeyId: 1,
      User_PkeyID_Master: 1,
      Type: 2,
    });
    try {
      const res = await userprofile(data, this.props.token);
      console.log(res, 'ressssssss');
      console.log(res[0][0].User_Email, ' res[0][0].User_Email');
      this.setState({
        name: res[0][0].User_Name,
        email: res[0][0].User_Email,
        phone: res[0][0].User_Phone,
        userid: res[0][0].User_PkeyID,
        gender: res[0][0].User_Gender,
        imagepath: res[0][0].User_Image_Path,
        loading: false,
      });
    } catch (error) {
      console.log('hihihihihihih', {e: error.response.data.error});
      let message = '';
      if (error.response) {
        this.setState({isLoading: false});
      } else {
        message = '';
      }
      console.log({message});
    }
  };
   Validation = () => {
    let cancel = false;
    if (this.state.form.name.length === 0) {
      cancel = true;
    }
    if (this.state.form.phone.length === 0) {
      cancel = true;
    }
    if (cancel) {
      showerrorMessage('Fields can not be empty');
      return false;
    } else {
      return true;
    }
  };

  PhoneValidation = () => {
    let cancel = false;
    if (this.state.form.phone.length > 10 || this.state.form.phone.length < 10) {
      cancel = true;
    }
    if (cancel) {
      showerrorMessage('Invalid Phone Number');
      return false;
    } else {
      return true;
    }
  };
  updateUserData = async () => {
    console.log("helloo update")
    //  if (this.Validation() && this.PhoneValidation()) {
      // this.setState({loading: true});
      let data = {
        User_PkeyID:this.state.form.userid,
        User_Email: this.state.form.email,
        User_Name:this.state.form.name,
        User_Phone: this.state.form.phone,
        User_Gender: this.state.form.gender,
        User_Image_Path: this.state.form.imagepath,
        User_Password:this.state.form.password,
        Type: 2,
        User_Type: 1,
        User_IsActive: 1,
        User_IsDelete: 0,
      };
      console.log(data, 'userrrrr');
      try {
        const res = await updateuserprofile(data, this.state.token);
        console.log('ressssss:', res);
         showMessage('Profile Updated');
      } catch (error) {
        // showerrorMessage(error.response.data.error_description);
        console.log('errrro',error)
      }
    //  }
  };
  showMessage = message => {
    if (message !== '' && message !== null && message !== undefined) {
      toast.show({
        title: message,
        placement: 'bottom',
        status: 'success',
        duration: 5000,
        // backgroundColor: 'red.500',
      });
    }
  };

  
  validateGender = value => {
    var lvalue = 0;
    switch (value) {
      case null: {
        lvalue = 'NA';
        break;
      }
      case 2: {
        lvalue = 'Other';
        break;
      }
      case 1: {
        lvalue = 'Male';
        break;
      }
      case 0: {
        lvalue = 'Female';
        break;
      }
    }
    return lvalue;
  };

  render() {
    const {name, email, phone, userid, gender, imagepath, loading} = this.state;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
        <Spinner visible={loading} />
        <View
          style={{
            backgroundColor: '#fff',
            height: 200,
            justifyContent: 'center',
            //   alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{position: 'absolute', left: 20, top: 20}}>
            <Ionicons name="arrow-back" size={30} color="#0F0B56" />
          </TouchableOpacity>
          <Text
            style={{
              color: '#0F0B56',
              fontSize: 24,
              lineHeight: 36,
              fontWeight: '700',
              top: 20,
            }}>
            My Profile
          </Text>
          <TouchableOpacity
            onPress={() => this.Logout()}
            style={{position: 'absolute',right: 20, top: 20}}>
           <Text style={{color:'#21618C',fontSize:18,fontWeight:'600'}}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              position: 'absolute',
              zIndex: 100,
              top: 80,
            }}
            onPress={() => this.onOpenImage()}>
            <Image
              style={{
                height: 140,
                width: 140,
                borderRadius: 120,
                borderColor: '#21618C',
                borderWidth: 1,
                top: 10,
              }}
              source={{
                uri: imagepath
                  ? imagepath
                  : 'https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg',
              }}
            />
            <FAB
              small
              icon="camera"
              style={{
                position: 'absolute',
                right: 0,
                bottom: 10,
                backgroundColor: '#ACACAC',
              }}
            />
          </TouchableOpacity>
        </View>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={
            <Text style={{color: '#000', fontSize: 18}}>Profile Photo</Text>
          }
          options={options}
          cancelButtonIndex={0}
          destructiveButtonIndex={4}
          useNativeDriver={true}
          onPress={index => {
            if (index === 0) {
              // cancel action
            } else if (index === 1) {
              this.ImageGallery();
            } else if (index === 2) {
              this.ImageCamera();
            }
          }}
        />
        <ScrollView style={{paddingHorizontal:20}}>
          <View
            style={{
              marginTop: 50,
            }}>
             <InputText label="Full Name" value={name} 
              // onChangeText={name => (name)}
              onChangeText={(text) => this.onHandleChange("name", text)}
            
            />
          </View>
          <View
            style={{
              marginTop: 20,
            }}>
             <InputText label="Phone no." value={phone}
                keyboardType="numeric"
                // onChangeText={phone => this.state.phone(phone)}
          onChangeText={(text) => this.onHandleChange("phone", text)}
            />
          </View>
          <View
            style={{
              marginTop: 20,
            }}>
            <InputText label="Email Address" value={email} 
            //onChangeText={(text) => this.onHandleChange("name", text)}
            />
          </View>
          {/* <View
            style={{
              marginTop: 20,
            }}>
            <InputText
              label="Gender"
              value={
                this.validateGender(gender) != null
                  ? this.validateGender(gender)
                  : 'NA'
              }
              onChangeText={(text) => this.onHandleChange("gender", text)}
            />
          </View> */}
          <View style={{marginTop: 20, alignItems: 'center'}}>
          <Select
            _selectedItem={{
              bg: '#ACACAC',
            }}
            mt={1}
            style={{
              justifyContent: 'center',
              height: 65,
              fontSize: 14,
              color: '#000000',
              backgroundColor: '#fff',
            }}
            mode="dropdown"
            width="100%"
            placeholder="Select Gender"
             value={
                this.validateGender(gender) != null
                  ? this.validateGender(gender)
                  : 'NA'
              }
            // selectedValue={gender}
            onValueChange={itemValue => this.onHandleChange("gender", itemValue)}>
            <Select.Item label="Female" value={1} />
            <Select.Item label="Male" value={2} />
            <Select.Item label="Other" value={3} />
          </Select>
        </View>
          <View
            style={{
              marginTop: 20,
            }}>
            <InputText label="Password" value="********"
              onChangeText={(text) => this.onHandleChange("password", text)} 
              />

          </View>
          <View
            style={{
              marginTop: 20,
             
            }}>
            <Button
              text="Update Profile"
              // onPress={() => this.props.navigation.navigate('EditProfile')}
              onPress={() => this.updateUserData()}
              backgroundColor="#21618C"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const mapDispatchToProps = {
  signOut,
  userId,
};
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.userToken,
});
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);