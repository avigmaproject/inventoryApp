import { Icon } from 'native-base';
import React  from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from './Header';
import InputText from '../../components/InputText';
export default function ItemDetail(props){
 
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
         <StatusBar barStyle="dark-content" />
         <Header
        header="Items Details"
        back={true}
        save={true}
     
        onPressCancel={() => props.navigation.goBack()}
        // onPressSave={() => this.editProduct()}
      />
       
   <ScrollView style={{paddingHorizontal:30,}}>
 
       
<View style={{paddingBottom:20}}> 

          <View style={{marginTop: 20}}>
            <InputText
              label="Select Vendor"
              placeholder="Select Vendor"
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="Subcategory"
              placeholder="Subcategory"
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="Types Of Item"
              placeholder="Pallet"
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="RFID Tag"
              placeholder="RFID Tag"
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="LPN# (Pallet Only)"
              placeholder="LPN# (Pallet Only)"
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="Model#"
              placeholder="Model#"
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="QTY"
              placeholder="Qty"
            />
          </View>
          
</View>
       
        </ScrollView>     
      </SafeAreaView>
      );
    }