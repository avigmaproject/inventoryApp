import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import { padding } from 'styled-system';

const InputText = props => {
  return (
    <TextInput
      label={props.label}
      value={props.value}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder}
      secureTextEntry={props.secureTextEntry}
      keyboardType={props.keyboardType}
      onSubmitEditing={props.onSubmitEditing}
      onBlur={props.onBlur}
      mode="outlined"
      outlineColor="#2874A6"
      
      // dense
      style={{
        width: '100%',
        alignSelf: 'center',
      
        fontSize: 14,
        color: '#000000',
        borderRadius:45
      }}
      theme={{
        colors: {
          placeholder: '#ACACAC',
          text: '#000',
          primary: '#21618C',
          underlineColor: '#2874A6',
          background: '#FFFFFF',
          borderRadius:40,
          
        },
      }}
    />
  );
};

export default InputText;
