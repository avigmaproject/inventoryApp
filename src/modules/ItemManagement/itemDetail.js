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
import HeaderBack from '../../components/HeaderBack';
import InputText from '../../components/InputText';
export default function ItemDetail(props){
 
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
        <View
          style={{
            backgroundColor: '#fff',
            height: 60,
            justifyContent: 'center',
            //   alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() =>  props.navigation.goBack()}
            style={{position: 'absolute', left: 20, top: 20}}>
            <Ionicons name="arrow-back" size={30} color="#0F0B56" />
          </TouchableOpacity>
          </View>
   <ScrollView style={{paddingHorizontal:30,}}>
 
        <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
          <Text style={{color: 'black',
              fontSize: 28,
              fontWeight: '600',}}>Items Details</Text>
        </View>
<View style={{alignSelf:'flex-end',marginRight:30,marginTop:30}}>
  <TouchableOpacity style={{height:30,width:80,justifyContent:'center',alignItems:'center',backgroundColor:'#1FAFDF'}}>
      <Text style={{color:'white'}} >save</Text>
  </TouchableOpacity>

</View>  
<View style={{paddingBottom:20}}> 
<View style={{marginTop: 20}}>
            <InputText
              label="Select Vender"
              placeholder="Select Vender"
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="Select Vender"
              placeholder="Select Vender"
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