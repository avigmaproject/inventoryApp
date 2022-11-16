import React ,{useState} from 'react';
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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Select, Toast} from 'native-base';
import InputText from '../../components/InputText';
import Header from './Header';
import DropDownPicker from 'react-native-dropdown-picker';
import { flex } from 'styled-system';
export default function Additem(props){
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [id, setid] = useState(null);
  const [items, setItems] = useState([
    {label: 'Pallet', value: 'Pallet'},
    {label: 'individual item', value: 'individual item'},
  ]);
    return (
        // <ScrollView  style={{height:'100%'}}> 
        <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
            <Header
          header="Add Item"
          onPressCancel={() => props.navigation.goBack()}
          // onPressSave={() => this.editProduct()}
        />
       
    <ScrollView keyboardShouldPersistTaps="handled" style={{paddingHorizontal:20}}>
    <View style={{marginTop: 20}}>
            <InputText
              label="Select Vender"
              placeholder="Select Vender"
            />
          </View>
          <View style={{marginTop: 20}}>
            <InputText
              label="Select Subcategory"
              placeholder="Select Subcategory"
            />
          </View>
          <View style={{marginTop: 20, alignItems: 'center'}}>
          <Select
              dropdownIcon
              style={{
                fontSize: 14,
                paddingLeft: 20,
                color: '#000',
                height: 55,
                backgroundColor: '#fff',
              }}
               selectedValue={id}
              width="100%"
              placeholder="Type Of Item"
              onValueChange={itemValue => setid(itemValue)}
              _selectedItem={{
                bg: 'gray',
              }}>
              <Select.Item label="Pallet" value={'1'}  />
              <Select.Item label="individual item" value={'2'} />
            </Select>
  
            </View>
            {id=="1" ? (
  <View> 
    <View style={{marginTop: 20,}}>
    <InputText
     
     label="RFID tag"
  placeholder="Enter RFID tag"
/>
   
     
</View>
 <View style={{marginTop: 20}}>
      <InputText
     
     label="LPN#(Pallet only)"
  placeholder="Enter LPN#(Pallet only)"
/>
</View>
<View style={{marginTop: 20}}>
      <InputText
     
     label="Model#"
  placeholder="Enter Model#"
/>
</View>
<View style={{marginTop: 20}}>
      <InputText
     
     label="QTY"
  placeholder="Enter QTY"
/>
</View>
    </View>   ) :id=="2" ? (
      <View> 
      <View style={{marginTop: 20}}>
      <InputText
       
       label="RFID tag"
    placeholder="Enter RFID tag"
  />
     
       
  </View>
  
  <View style={{marginTop: 20}}>
        <InputText
       
       label="Model#"
    placeholder="Enter Model#"
  />
   <View style={{marginTop: 20}}>
        <InputText
       
       label="Serial #"
    placeholder="Serial #"
  />
  </View>
  </View>
    </View>
      ) : (
        <View>
        </View>
       )}
    


{/* <View style={{paddingHorizontal:30}}>

<View  style={{flexDirection:'row',backgroundColor:'white',marginTop:30,alignItems:'center'}}>

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}>select Vendor</Text>
            
        </View>
        <View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:30,alignItems:'center'}}>

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}>select subcategory</Text>
            
        </View>

        <View  style={{marginTop:30}}>

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}>Types of Item</Text>
            
        </View>
        <View  style={{marginTop:10}}>

  
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Item"
          style={{
            height: 55,
            borderWidth: 0,
            
          }}
          containerStyle={{
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
           
            backgroundColor: 'white',zIndex: 1000, elevation: 1000 
           
          }}
          labelStyle={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 16,
            lineHeight: 24,
           
          }}
        />
  
</View>
{value=='Pallet' ? (
  <View> 
    <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,marginTop:20}}> RFID tag</Text>
      <InputText
     
  
  placeholder="Enter RFID tag"
/>
<Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,marginTop:20}}>LPN#(Pallet only)</Text>
      <InputText
     
  
  placeholder="Enter LPN#(Pallet only)"
/>
<Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,marginTop:20}}>Model#</Text>
      <InputText
     
  
  placeholder="Enter Model#"
/>
<Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,marginTop:20}}>QTY</Text>
      <InputText
     
  
  placeholder="Enter QTY"
/>
    </View>
     ) :value=='individual item'? (
      <View><Text>other screen</Text>
    </View>
      ) : (
        <View>
        </View>
       )}
    
</View> */}

</ScrollView>
      </SafeAreaView>
    
      );
    }