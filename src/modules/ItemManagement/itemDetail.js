import { Icon } from 'native-base';
import React, {useState, useEffect} from 'react';
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
 
  const [itemdetail, setitemdetail] = useState(props.route.params.Detail);
  useEffect(() => {
  //  if(props.route.params && props.route.params.Detail)
  //  {

  //   setitemdetail(props.route.params.Detail)
  //  }
    
    
   setitemdetail(props.route.params.Detail)
    },[itemdetail]);
    console.log(itemdetail,'******')
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
          <StatusBar barStyle="dark-content" backgroundColor={"white"} />
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
              value={itemdetail.Pro_Vendor_Name}
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="Category"
              placeholder="Category"
              value={itemdetail.Pro_Category}
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="Subcategory"
              placeholder="Subcategory"
              value={itemdetail.SubCat_Name}
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="Types Of Item"
              placeholder="Pallet"
              value={itemdetail.Pro_TypeOfItem}
            />
          </View>
          <View style={{marginTop: 20,}}>
            <InputText
              label="RFID Tag"
              placeholder="RFID Tag"
              value={itemdetail.Pro_RFIDTag}
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="LPN# (Pallet Only)"
              placeholder="LPN# (Pallet Only)"
              value={itemdetail.Pro_LPN}
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="Model#"
              placeholder="Model#"
              value={itemdetail.Pro_Model}
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="QTY"
              placeholder="Qty"
              value={itemdetail.Pro_Qty}
            />
          </View>
          
</View>
       
        </ScrollView>     
      </SafeAreaView>
      );
    }