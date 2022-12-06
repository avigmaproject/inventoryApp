import React, {useState, useEffect} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {
  getvendormaster,
  getsubcategorymaster,
  additemdata
} from '../../services/api.function';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Barcodescanner from '../Home/BarcodeScanner';
import {Select, Toast} from 'native-base';
import InputText from '../../components/InputText';
import Header from './Header';
import DropDownPicker from 'react-native-dropdown-picker';
import {flex} from 'styled-system';
import {useSelector} from 'react-redux';
export default function Additem(props) {
  const [selectedvendorItems, setselectedvendorItems] = useState();
  const [selectedcatItems, setselectedcatItems] = useState();
  const [selectedsubcatItems, setselectedsubcatItems] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [vendor, setvendor] = useState([]);
  const [Category, setcategory] = useState([]);
  const [subCategory, setsubcategory] = useState([]);
  const [id, setid] = useState(null);
  const [rfidtxt, setrfidtxt] = useState(null);
  const [rfidtxt1, setrfidtxt1] = useState(null);
 const [lpntxt, setlpntxt] = useState(null);
 const [modeltxt, setmodeltxt] = useState(null);
 const [model1txt, setmodel1txt] = useState(null);
 const [qtytxt, setqtytxt] = useState(null);
   const [serialtxt, setserialtxt] = useState(null);
  //   {label: 'Pallet', value: 'Pallet'},
  //   {label: 'Individual item', value: 'individual item'},
  // ]);
  const token = useSelector(state => state.authReducer.userToken);
  console.log('token is', token);

  useEffect(() => {
    GetVendorMaster();
    //
  }, []);
  useEffect(() => {
      getAsyncData()
    }, [])
    const onAdditem = async () => {
      let data = {
        Type: 1,
        // Pro_Vendor_Name: vendor,
        // Pro_Category: Category,
        // Pro_SubCategory: subCategory,
        // Pro_TypeOfItem: address,
        Pro_RFIDTag: rfidtxt,
        Pro_LPN: lpntxt,
        Pro_Model: modeltxt,
        Pro_Serial: serialtxt,
        Pro_Qty:qtytxt
      }
      console.log("Add itemss....",data, token)
      await additemdata(data, token)
        .then((res) => {
        
          console.log("res of additem........", res[0])
        
        })
        .catch((error) => {
          console.log("errror is.....", error)
       
          
        })
    }
    
  const getAsyncData = async () => {
    const rfid = await AsyncStorage.getItem('rfid');
    const rfid1 = await AsyncStorage.getItem('rfid1');
    const lpn = await AsyncStorage.getItem('lpn');
    const model = await AsyncStorage.getItem('model');
    const serial = await AsyncStorage.getItem('serial');
    const qty = await AsyncStorage.getItem('qty');
    const model1 = await AsyncStorage.getItem('model1');
    const vendor = await AsyncStorage.getItem('vendor');
    // const cat = await AsyncStorage.getItem('category');
    // const subcat = await AsyncStorage.getItem('subcategory');
   
    const parsevendor= vendor != null ? JSON.parse(vendor) : null
    setselectedvendorItems(parsevendor)
    
    setrfidtxt(rfid)
    setrfidtxt1(rfid1)
    setlpntxt(lpn)
    setqtytxt(qty)
    setmodel1txt(model1)
    setserialtxt(serial)
    setmodeltxt(model)
  };
 
  const onvendorselected = item => {
    setselectedvendorItems(item);
    console.log("vendor item.....",item)
    const vanderitem = JSON.stringify(item)
     AsyncStorage.setItem(`vendor`, vanderitem);
  };
  const oncatselected = item => {
    setselectedcatItems(item);
    GetSubCategory(item);
    AsyncStorage.setItem(`category`, item);
  };
  const onsubselected = item => {
    setselectedsubcatItems(item);
    AsyncStorage.setItem(`subcategory`, item);
  };
  const GetVendorMaster = async () => {
    let data = {
      Type:4,
    };
    console.log('data and token', data, token);
    await getvendormaster(data, token)
      .then(res => {
        const fetchvendor = res[0];
        const collectvendor = fetchvendor?.map(item => {
          return {id: item.Ven_PkeyID, name: item.Ven_Name};
        });
        setvendor(collectvendor);
        const fetchcat = res[1];
        const collectcat = fetchcat?.map(item => {
          return {id: item.Cat_Pkey, name: item.Cat_Name};
        });
        setcategory(collectcat);
        console.log('response of collectcat is', collectcat);
      })
      .catch(error => {
        console.log('errorr of vendor is', error);
      });
  };
  const GetSubCategory = async item => {
    console.log(item);
    let data = {
      Type: 5,
      SubCat_Cat_Pkey: item.id,
    };

    console.log('data and token', data, token);
    await getsubcategorymaster(data, token)
      .then(res => {
        const fetchsubcat = res[0];
        const collectsubcat = fetchsubcat?.map(item => {
          return {id: item.SubCat_Cat_Pkey, name: item.SubCat_Name};
        });
        setsubcategory(collectsubcat);
        console.log('responsee of subcategory', res[0]);
      })
      .catch(error => {
        console.log('errorr of subcategory is', error);
      });
  };
  return (
    // <ScrollView  style={{height:'100%'}}>
    <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
      <Header
        header="Add Item"
        back={true}
        save={true}
        onPressCancel={() => props.navigation.goBack()}
        onPressSave={() => onAdditem()}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{paddingHorizontal: 20}}>
        <View style={{marginTop: 20}}>
          <SearchableDropdown
            selectedItems={selectedvendorItems}
            onTextChange={text => console.log(text)}
            onItemSelect={item => onvendorselected(item)}

            containerStyle={{padding: 5}}
            textInputStyle={{
              // Inserted text style
              padding: 12,
              borderWidth: 1,
              color: 'black',
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
            itemsContainerStyle={
              {
                // maxHeight: '60%',
              }
            }
            items={vendor}
            // defaultIndex={2}
            placeholder="Select Vendor"
            resPtValue={false}
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={{marginTop: 20}}>
          <SearchableDropdown
            selectedItems={selectedcatItems}
            onTextChange={text => console.log(text)}
            onItemSelect={item => oncatselected(item)}
            containerStyle={{padding: 5}}
            textInputStyle={{
              // Inserted text style
              padding: 12,
              borderWidth: 1,
              color: 'black',
              borderColor: '#2874A6',
              backgroundColor: '#fff',
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#fff',
              borderColor: '#2874A6',
              borderWidth: 1,
            }}
            itemTextStyle={{
              color: 'black',
            }}
            itemsContainerStyle={
              {
                // maxHeight: '60%',
              }
            }
            items={Category}
            placeholder="Select Category"
            underlineColorAndroid="transparent"
          />
        </View>
        <View style={{marginTop: 20}}>
          <SearchableDropdown
            selectedItems={selectedsubcatItems}
            onTextChange={text => console.log(text)}
            onItemSelect={item => onsubselected(item)}
            containerStyle={{padding: 5}}
            textInputStyle={{
              padding: 12,
              borderWidth: 1,
              color: 'black',
              borderColor: '#2874A6',
              backgroundColor: '#fff',
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#fff',
              borderColor: '#2874A6',
              borderWidth: 1,
            }}
            itemTextStyle={{
              color: 'black',
            }}
            items={subCategory}
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
            <Select.Item label="Pallet" value={'1'} />
            <Select.Item label="Individual item" value={'2'} />
          </Select>
        </View>
        {id == '1' ? (
          <View>
           
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row'}}>
              <View style={{width: '90%'}}>
                <InputText label="RFID tag" placeholder="Enter RFID tag"
                value={rfidtxt}

               />
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('BarcodeScanner', {title: 'rfid'})
                  }
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={30}
                    color="#1FAFDF"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row'}}>
              <View style={{width: '90%'}}>
                <InputText
                  label="LPN#(Pallet only)"
                  placeholder="Enter LPN#(Pallet only)"
                  value={lpntxt}
                />
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('BarcodeScanner', {title: 'lpn'})
                  }
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={30}
                    color="#1FAFDF"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row'}}>
              <View style={{width: '90%'}}>
                <InputText label="Model#" placeholder="Enter Model#"
                value={modeltxt} />
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('BarcodeScanner', {
                      title: 'model',
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={30}
                    color="#1FAFDF"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row'}}>
              <View style={{width: '90%'}}>
                <InputText label="QTY" placeholder="Enter QTY"
                value={qtytxt} />
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('BarcodeScanner', {title: 'qty'})
                  }
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={30}
                    color="#1FAFDF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : id == '2' ? (
          <View>
          
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row'}}>
              <View style={{width: '90%'}}>
                <InputText label="RFID tag" placeholder="Enter RFID tag"
                value={rfidtxt1}

               />
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('BarcodeScanner', {title: 'rfid1'})
                  }
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={30}
                    color="#1FAFDF"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop: 20, width: '100%', flexDirection: 'row'}}>
              <View style={{width: '90%'}}>
                <InputText label="Model#" placeholder="Enter Model#"
                value={model1txt} />
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('BarcodeScanner', {
                      title: 'model1',
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={30}
                    color="#1FAFDF"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row'}}>
              <View style={{width: '90%'}}>
                <InputText label="Serial #" placeholder="Serial #" value={serialtxt} />
              </View>
              <View
                style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('BarcodeScanner', {
                      title: 'serial',
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="qr-code-scanner"
                    size={30}
                    color="#1FAFDF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
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
