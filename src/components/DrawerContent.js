import React, {Component} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {View, Alert, StyleSheet} from 'react-native';
import {Select, Toast} from 'native-base';
import Icon from "react-native-vector-icons/Ionicons"
import {Avatar, Title, Caption, Drawer, Divider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import {useDispatch} from 'react-redux';
import {signOut, userId} from '../store/action/auth/action';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {getprofiles, activeprofile} from '../services/api.function';
import {connect} from 'react-redux';
import {StackActions} from '@react-navigation/native';

class DrawerContent extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      profileid: [],
      name: '',
      imagepath: '',
      loading: false,
      photo: '',
      activeid: null,
      userpkeyid: null,
    };
  }

  componentDidMount() {
    console.log(this.props)
   
  }
  // componentWillUnmount() {
  //   this._unsubscribe();
  // }

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

    await AsyncStorage.removeItem('token');
  };

  GetProfile = async token => {
    this.setState({
      loading: true,
    });

    var data = JSON.stringify({
      Type: 3,
    });
    try {
      const res = await getprofiles(data, token);
      console.log(res, 'res[0][0].User_Name');
      this.setState({
        loading: false,
        data: res[0],
      });
      for (i = 0; i < res[0].length; i++) {
        if (res[0][i].User_IsActive_Prof === true) {
          this.setState({
            loading: false,
            name: res[0][i].User_Name,
            imagepath: res[0][i].User_Image_Path,
          });
        }
      }
    } catch (error) {
      console.log('hihihihihihih', {e: error.response.data.error});
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
      <DrawerContentScrollView
        contentContainerStyle={{backgroundColor: '#F3F2F4', flex: 1}}>
        {/* <View
          style={{
            bottom: 10,
            paddingLeft: 10,
            // marginBottom: 25,
            backgroundColor: '#0F0B56',
            height: 125,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 30,
              alignItems: 'center',
            }}>
            <Avatar.Image
              source={{
                uri: this.state.imagepath
                  ? this.state.imagepath
                  : 'https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg',
              }}
              size={50}
            />
            {/* <View style={{flexDirection: 'column'}}>
              <Select
                // dropdownIcon
                variant="unstyled"
                style={{
                  fontSize: 20,
                  paddingLeft: 20,
                  color: '#FFFFFF',
                  fontWeight: '600',
                  height: 40,
                  borderColor: 'transparent',
                  borderWidth: 0,
                }}
                minWidth="150"
                selectedValue={this.state.profileid}
                placeholder={this.state.name}
                placeholderTextColor="#FFFFFF"
                onValueChange={itemValue =>
                  this.setState({profileid: itemValue}, () =>
                    this.activateProfile(),
                  )
                }
                _selectedItem={{
                  bg: 'gray',
                }}>
                {this.state.data.map(item => {
                  return (
                    <Select.Item
                      label={item.User_Name}
                      value={item.User_PkeyID}
                    />
                  );
                })}
              </Select>
            </View> */}
        {/* <Title
              style={{
                fontSize: 20,
                paddingLeft: 20,
                color: '#FFFFFF',
                fontWeight: '600',
              }}>
              {this.state.name}
            </Title>
          </View>
        </View> */}

        <Drawer.Section>
          <DrawerItem
            icon={() => (
              <Icon name="home" color="#21618C" size={25} />
            )}
            label="Home"
            onPress={() => this.props.navigation.navigate('HomeScreen')}
            labelStyle={styles.labelStyle}
          />
          <Divider />
          <DrawerItem
            icon={() => (
              <MaterialCommunityIcons
                name="qrcode-scan"
                color="#21618C"
                size={25}
              />
            )}
            label="Barcode Scanner"
            onPress={() => this.props.navigation.navigate('BarcodeScanner')}
            labelStyle={styles.labelStyle}
          />
          <Divider />
          <DrawerItem
            icon={() => (
              <Icon name="person-circle-sharp" color="#21618C" size={30} />
            )}
            label="Profile"
            onPress={() => this.props.navigation.navigate('MyProfile')}
            labelStyle={styles.labelStyle}
          />
          <Divider />
          <DrawerItem
            icon={() => (
              <MaterialIcons name="logout" color="#21618C" size={25} />
            )}
            label="Logout"
            onPress={() => this.Logout()}
            labelStyle={styles.labelStyle}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    );
  }
}

const styles = StyleSheet.create({
  labelStyle: {
    color: '#0F0B56',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 26,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    left: 5,
  },
});

const mapDispatchToProps = {
  signOut,
  userId,
};
const mapStateToProps = (state, ownProps) => ({
  // contacts: state.contactReducer.contacts,
  // parentid: state.parentidReducer.parentid,
});
export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
