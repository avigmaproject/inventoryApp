import * as React from 'react';
import {Button as PaperButton} from 'react-native-paper';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const Button = ({text, ...props}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        alignSelf: 'center',
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: props.backgroundColor,
        borderRadius: 8,
      }}
      onPress={props.onPress}>
      <Text
        style={{
          color: '#FFFFFF',
          fontWeight: '600',
          fontSize: 18,
          lineHeight: 24,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
