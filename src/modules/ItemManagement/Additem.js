import React ,{useState,useEffect} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {
  getvendormaster
} from '../../services/api.function'
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AntDesign from 'react-native-vector-icons/AntDesign';
import Barcodescanner from '../Home/BarcodeScanner'
import {Select, Toast} from 'native-base';
import InputText from '../../components/InputText';
import Header from './Header';
import DropDownPicker from 'react-native-dropdown-picker';
import { flex } from 'styled-system';
import {useSelector} from 'react-redux';
export default function Additem(props){
  const [selectedItems, setSelectedItems] = useState()
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [vendor, setvendor] = useState([0]);
  const [Category, setcategory] = useState([0]);
  const [id, setid] = useState(null);
  // const [items, setItems] = useState([
  //   {label: 'Pallet', value: 'Pallet'},
  //   {label: 'Individual item', value: 'individual item'},
  // ]);
  const token = useSelector(state => state.authReducer.userToken);
  console.log('token is',token)
  const items = [
    // name key is must. It is to show the text in front
    {id: 1, name: 'angellist'},
    {id: 2, name: 'codepen'},
    {id: 3, name: 'envelope'},
    {id: 4, name: 'etsy'},
    {id: 5, name: 'facebook'},
    {id: 6, name: 'foursquare'},
    {id: 7, name: 'github-alt'},
    {id: 8, name: 'github'},
    {id: 9, name: 'gitlab'},
    {id: 10, name: 'instagram'},
  ];
  useEffect(() => {
    GetVendorMaster()
  }, [])
  const GetVendorMaster = async () => {
    let data = {
      Type: 4,
      
    };
    console.log("data and token",data,token)
    await getvendormaster(data,token)
      .then(res => {
        const fetchvendor = res[0]
        const collectvendor = fetchvendor?.map((item) => {
          return { id: item.Ven_PkeyID,name: item.Ven_Name }
        })
        setvendor(collectvendor)
        const fetchcat = res[1]
        const collectcat = fetchcat?.map((item) => {
          return { id: item.Cat_Pkey,name: item.Cat_Name }
        })
        setcategory(collectcat)
     console.log("response of vendor is",vendor)
     console.log("response of vendor is",res[0])
     console.log("response of vendor is",res[1])
       
      })
      .catch(error => {
        console.log("errorr of vendor is",error)
      });
  };
    return (
        // <ScrollView  style={{height:'100%'}}> 
        <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
            <Header
          header="Add Item"
          onPressCancel={() => props.navigation.goBack()}
          // onPressSave={() => this.editProduct()}
        />
       {/* <View style={{}}>
      <Text style={{fontSize:30}}>{props.route.params.data}</Text>
    </View> */}
    <ScrollView keyboardShouldPersistTaps="handled" style={{paddingHorizontal:20}}>
      <View style={{marginTop:20}}>
      <SearchableDropdown
             selectedItems={selectedItems}
          onTextChange={(text) => console.log(text)}
           onItemSelect={(item) =>setSelectedItems((item))}
          containerStyle={{padding: 5}}
          textInputStyle={{
            // Inserted text style
            padding: 12,
            borderWidth: 1,
            color:'black',
            borderColor: '#2874A6',
            backgroundColor: '#fff',
          }}
          itemStyle={{
            // Single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#fff',
            borderColor: '#2874A6',
            borderWidth: 1,
          }}
          itemTextStyle={{
            color: 'black',
          }}
          itemsContainerStyle={{
            // maxHeight: '60%',
          }}
          items={vendor}
          // defaultIndex={2}
          placeholder="Select Vendor"
          resPtValue={false}
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={{marginTop:20}}>
      <SearchableDropdown
            selectedItems={selectedItems}
          onTextChange={(text) => console.log(text)}
          onItemSelect={(item) =>setSelectedItems((item))}
          containerStyle={{padding: 5}}
          textInputStyle={{
            // Inserted text style
            padding: 12,
            borderWidth: 1,
            color:'black',
            borderColor: '#2874A6',
            backgroundColor: '#fff',
          }}
          itemStyle={{
            // Single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#fff',
            borderColor: '#2874A6',
            borderWidth: 1,
          }}
          itemTextStyle={{
          
            color: 'black',
          }}
          itemsContainerStyle={{

            // maxHeight: '60%',
          }}
          items={Category}
          // defaultIndex={2}
          placeholder="Select Category"
          underlineColorAndroid="transparent"
        />
      </View>
      <View style={{marginTop:20}}>
      <SearchableDropdown
            selectedItems={selectedItems}
          onTextChange={(text) => console.log(text)}
           onItemSelect={(item) =>setSelectedItems((item))}
          containerStyle={{padding: 5}}
          textInputStyle={{
            // Inserted text style
            padding: 12,
            borderWidth: 1,
            color:'black',
            borderColor: '#2874A6',
            backgroundColor: '#fff',
          }}
          itemStyle={{
            // Single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#fff',
            borderColor: '#2874A6',
            borderWidth: 1,
          }}
          itemTextStyle={{
          
            color: 'black',
          }}
          itemsContainerStyle={{

            // maxHeight: '60%',
          }}
          items={items}
          // defaultIndex={2}
          placeholder="Select Subcategory"
          resPtValue={false}
          underlineColorAndroid="transparent"
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
              <Select.Item label="Individual item" value={'2'} />
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
 <View style={{marginTop: 20,width:"100%",flexDirection:'row'}}>
<View style={{width:'90%'}}>
<InputText
     
     label="LPN#(Pallet only)"
  placeholder="Enter LPN#(Pallet only)"
/>
</View>
<View style={{width:'10%',justifyContent:'center',alignItems:'center',marginLeft:5}}>    
<TouchableOpacity
              onPress={() => props.navigation.navigate("BarcodeScanner")}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <MaterialIcons
                name="qr-code-scanner"
                size={30}
                color="#1FAFDF"
              
              />
              </TouchableOpacity>
              </View>
</View>
<View style={{marginTop: 20,width:"100%",flexDirection:'row'}}>
<View style={{width:'90%'}}>
      <InputText
     
     label="Model#"
  placeholder="Enter Model#"
  
/>
</View>
<View style={{width:'10%',justifyContent:'center',alignItems:'center',marginLeft:5}}>    
<TouchableOpacity
              onPress={() =>props.navigation.navigate("BarcodeScanner")}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <MaterialIcons
                name="qr-code-scanner"
                size={30}
                color="#1FAFDF"
              
              />
              </TouchableOpacity>
              </View>
</View>
<View style={{marginTop: 20,width:"100%",flexDirection:'row'}}>
<View style={{width:'90%'}}>
      <InputText
     label="QTY"
  placeholder="Enter QTY"
/>
</View>
<View style={{width:'10%',justifyContent:'center',alignItems:'center',marginLeft:5}}>    
<TouchableOpacity
              onPress={() =>props.navigation.navigate("BarcodeScanner")}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <MaterialIcons
                name="qr-code-scanner"
                size={30}
                color="#1FAFDF"
              
              />
              </TouchableOpacity>
              </View>
</View>
    </View>   ) :id=="2" ? (
      <View> 
      <View style={{marginTop: 20}}>
      <InputText
       label="RFID tag"
    placeholder="Enter RFID tag"
  />
     </View>
  
  <View style={{marginTop: 20,width:"100%",flexDirection:'row'}}>
  <View style={{width:'90%'}}>
        <InputText
       
       label="Model#"
    placeholder="Enter Model#"
  />
  </View>
  <View style={{width:'10%',justifyContent:'center',alignItems:'center',marginLeft:5}}>    
<TouchableOpacity
             onPress={() => props.navigation.navigate("BarcodeScanner")}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <MaterialIcons
                name="qr-code-scanner"
                size={30}
                color="#1FAFDF"         
              />
              </TouchableOpacity>
              </View>
              </View>
              <View style={{marginTop: 20,width:"100%",flexDirection:'row'}}>
   <View style={{width:'90%'}}>
        <InputText
       label="Serial #"
    placeholder="Serial #"
  />
  </View>
  <View style={{width:'10%',justifyContent:'center',alignItems:'center',marginLeft:5}}>    
<TouchableOpacity
              onPress={() => props.navigation.navigate("BarcodeScanner")}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <MaterialIcons
                name="qr-code-scanner"
                size={30}
                color="#1FAFDF" />
              </TouchableOpacity>
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