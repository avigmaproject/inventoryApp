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

import InputText from '../../components/InputText';
import HeaderBack from '../../components/HeaderBack';
import DropDownPicker from 'react-native-dropdown-picker';
export default function Additem(props){
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Pallet', value: 'Pallet'},
    {label: 'individual item', value: 'individual item'},
  ]);
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
            onPress={() => props.navigation.goBack()}
            style={{position: 'absolute', left: 20, top: 20}}>
            <AntDesign name="arrowleft" size={30} color="#0F0B56" />
          </TouchableOpacity>
          
          </View>
        <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
          <Text style={{color: 'black',
              fontSize: 28,
              fontWeight: '600',}}>Add item</Text>
        </View>

<View style={{paddingHorizontal:30}}>
  {/* <ScrollView style={{backgroundColor:'yellow',height:'100%'}}> */}
<View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:30,alignItems:'center'}}>

  
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
            backgroundColor:'red'
          }}
          containerStyle={{
            width: '100%',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
           
          }}
          labelStyle={{
            fontWeight: 'bold',
            color: 'black',
            fontSize: 16,
            lineHeight: 24,
            backgroundColor:'pink'
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
     {/* </ScrollView>   */}
</View>

      </SafeAreaView>
      );
    }