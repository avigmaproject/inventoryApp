import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Header = ({header, onPressCancel, onPressSave, ...props}) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: 55,
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingBottom:10
      }}>
      <View
        style={{
          flexDirection: 'row',
           marginTop: 10,
          justifyContent: 'space-between',
          //   alignItems: 'center',
        }}>
         
            {props.back ? (
              <TouchableOpacity
                onPress={() =>  props.navigation.goBack()}
                style={{position: 'absolute', left: 20, top: 12}}>
                <Ionicons name="arrow-back" size={30} color="#0F0B56" />
              </TouchableOpacity>
                ) : props.cancel ? (
        <TouchableOpacity
          onPress={onPressCancel}
          style={{
            backgroundColor: '#F3F2F4',
            height: 35,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:15
          }}>
          <Text
            style={{
              color: '#ACACAC',
              fontSize: 12,
              lineHeight: 21,
              fontWeight: '500',
            }}>
            Cancel
          </Text>
        </TouchableOpacity>
         ) : null}
        <Text
          style={{
            color: '#0F0B56',
            fontSize: 20,
            lineHeight: 36,
            fontWeight: '600',
          }}>
          {header}
        </Text>
        <TouchableOpacity
          onPress={onPressSave}
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
              fontSize: 12,
              lineHeight: 21,
              fontWeight: '500',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
