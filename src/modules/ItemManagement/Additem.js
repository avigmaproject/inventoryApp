import React, {useState, useEffect} from 'react';
import {
  getvendormaster,
  getsubcategorymaster,
  additemdata,
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
import {useFocusEffect} from '@react-navigation/native';
import Barcodescanner from '../Home/BarcodeScanner';
import {Select, Toast} from 'native-base';
import InputText from '../../components/InputText';
import Header from './Header';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
export default function Additem(props) {
  const [selectedvendorItems, setselectedvendorItems] = useState(null);
  const [selectedcatItems, setselectedcatItems] = useState({});
  const [selectedsubcatItems, setselectedsubcatItems] = useState({});
  const [selectedropdownItems, setselectedropdownItems] = useState({});

  const [open, setOpen] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocuscat, setIsFocuscat] = useState(false);
  const [isFocusubcat, setIsFocusubcat] = useState(false);
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
  const [itemdetail, setitemdetail] = useState(props.route.params.Detail);
  useEffect(() => {
    GetVendorMaster();
    getAsyncData();
  }, []);
  useEffect(() => {
    if(props.route.params && props.route.params.Detail)
    {
     setitemdetail(props.route.params.Detail)
    }
    
   //  setitemdetail(props.route.params.Detail)
   console.log("**** details....",itemdetail)
     },[itemdetail]);
 
    useFocusEffect(
      React.useCallback(() => {
        getAsyncData()
      }, [])
    )
    const onupdate = async () => {
      let data = {
        Type: 2,
        Pro_Vendor_Name: selectedvendorItems.value,
        Pro_Category: selectedcatItems.value,
         Pro_SubCategory:selectedsubcatItems.value,
       Pro_TypeOfItem:selectedropdownItems.value,
        Pro_RFIDTag: rfidtxt,
        Pro_LPN: lpntxt,
        Pro_Model: modeltxt,
        Pro_Serial: serialtxt,
        Pro_Qty:qtytxt
     
      }
      console.log("Itemupdate....",data, token)
      // return 0
      await additemdata(data, token)
        .then((res) => {
          alert("Item updated")
          props.navigation.navigate('Itemlist')
          console.log("res of update........", res[0])
          console.log("res of update data ........", res)
         
        
        })
        .catch((error) => {
          console.log("errror is.....", error)          
        })
    }
    const onAdditem = async () => {
      let data = {
        Type: 1,
       Pro_Vendor_Name: selectedvendorItems.value,
        Pro_Category: selectedcatItems.value,
         Pro_SubCategory:selectedsubcatItems.value,
       Pro_TypeOfItem:selectedropdownItems.value,
        Pro_RFIDTag: rfidtxt,
        Pro_LPN: lpntxt,
        Pro_Model: modeltxt,
        Pro_Serial: serialtxt,
        Pro_Qty:qtytxt
      }
      console.log("Add itemss....",data, token)
      // return 0
      await additemdata(data, token)
        .then((res) => {
          alert("Item Added")
          props.navigation.navigate('Itemlist')
          console.log("res of additem........", res[0])
          console.log("res of additem data ........", res)
          // AsyncStorage.clear();.
          removeFew()
        })
        .catch((error) => {
          console.log("errror is.....", error)          
        })
    }
    removeFew = async () => {
      const keys = ['rfid', 'lpn','model','serial','qty','model1','rfid1','vendor','category','subcategory','id']
      try {
        await AsyncStorage.multiRemove(keys)
      } catch(e) {
        // remove error
      }
    
      console.log('Done')
    }
    
  const getAsyncData = async () => {
    console.log('im called');
    const rfid = await AsyncStorage.getItem('rfid');
    const rfid1 = await AsyncStorage.getItem('rfid1');
    const lpn = await AsyncStorage.getItem('lpn');
    const model = await AsyncStorage.getItem('model');
    const serial = await AsyncStorage.getItem('serial');
    const qty = await AsyncStorage.getItem('qty');
    const model1 = await AsyncStorage.getItem('model1');
    const vendor1 = await AsyncStorage.getItem('vendor');
    const cat = await AsyncStorage.getItem('category');
    const subcat = await AsyncStorage.getItem('subcategory');
    const itemValue = await AsyncStorage.getItem('id');
    // const parsecat = cat != null ? JSON.parse(cat) : null;
    const parsecat = JSON.parse(cat);
    const parsesubcat = JSON.parse(subcat);
    const parsevendor = JSON.parse(vendor1);
    console.log('parse*****vendor is', parsevendor);
    
    setid(itemValue);
    setrfidtxt(rfid);
    setrfidtxt1(rfid1);
    setlpntxt(lpn);
    setqtytxt(qty);
    setmodel1txt(model1);
    setserialtxt(serial);
    setmodeltxt(model);
    setselectedvendorItems(parsevendor);
    setselectedcatItems(parsecat);
    setselectedsubcatItems(parsesubcat);
    console.log(selectedvendorItems);
  };

  const onvendorselected = item => {
    setselectedvendorItems(item);
    console.log('vendor item.....', item);
    const vanderitem = JSON.stringify(item);
    AsyncStorage.setItem('vendor', vanderitem);
  };
  const oncatselected = item => {
    setselectedcatItems(item);
    console.log("category item.....",item)
    console.log("onselected itemmm category",selectedcatItems)
    const catitem = JSON.stringify(item)
    AsyncStorage.setItem(`category`, catitem);
    GetSubCategory(item);
  };
  const onsubselected = item => {
    setselectedsubcatItems(item);
    console.log('subcategory item.....', item);
    const subcatitem = JSON.stringify(item);
    AsyncStorage.setItem('subcategory', subcatitem);
  };
  const GetVendorMaster = async () => {
    let data = {
      Type: 4,
    };
    // console.log("data and token", data, token)
    await getvendormaster(data, token)
      .then(res => {
        const fetchvendor = res[0];
        const collectvendor = fetchvendor?.map(item => {
          return {value: item.Ven_PkeyID, label: item.Ven_Name};
        });
        setvendor(collectvendor);
        const fetchcat = res[1];
        const collectcat = fetchcat?.map(item => {
          return {value: item.Cat_Pkey, label: item.Cat_Name};
        });
        setcategory(collectcat);
        console.log('response of collectcat is', collectvendor);
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

    // console.log("data and token", data, token)
    await getsubcategorymaster(data, token)
      .then(res => {
        const fetchsubcat = res[0];
        const collectsubcat = fetchsubcat?.map(item => {
          return {value: item.SubCat_Cat_Pkey, label: item.SubCat_Name};
        });
        setsubcategory(collectsubcat);
        // console.log('responsee of subcategory', res[0]);
      })
      .catch(error => {
        console.log('errorr of subcategory is', error);
      });
  };
  const onselectItem = async itemValue => {
    await AsyncStorage.setItem('id', itemValue);
    setid(itemValue);
  };
  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  const renderItemcat = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  const renderItemsubcat = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    // <ScrollView  style={{height:'100%'}}>
    <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
      <StatusBar barStyle="dark-content" />
      <Header
        header="Add Item"
        back={true}
        save={true}
        onPressCancel={() => props.navigation.goBack()}
        onPressSave={() => onupdate()}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={{paddingHorizontal: 20}}>
        <View style={{width: '100%', alignSelf: 'center',marginTop:20}}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={{
              backgroundColor: '#FFF',
              borderBottomEndRadius: 5,
              borderBottomStartRadius: 5,
              borderWidth: 0,
              marginTop: -2,
              width: '90%',
              marginLeft: 1,
            }}
            activeColor="#1FAFDF"
            data={vendor}
            autoScroll
            dropdownPosition="bottom"
            search
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder={'Select Vendor'}
            searchPlaceholder="Search..."
            value={selectedvendorItems}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => onvendorselected(item)}
            renderItem={renderItem}
          />
        </View>
        <View style={{width: '100%', alignSelf: 'center',marginTop:20}}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={{
              backgroundColor: '#FFF',
              borderBottomEndRadius: 5,
              borderBottomStartRadius: 5,
              borderWidth: 0,
              marginTop: -2,
              width: '90%',
              marginLeft: 1,
            }}
            activeColor="#1FAFDF"
            data={Category}
            autoScroll
            dropdownPosition="bottom"
            search
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder={'Select Category'}
            searchPlaceholder="Search..."
            value={selectedcatItems}
            onFocus={() => setIsFocuscat(true)}
            onBlur={() => setIsFocuscat(false)}
            onChange={item => oncatselected(item)}
            renderItem={renderItemcat}
          />
        </View>
        <View style={{width: '100%', alignSelf: 'center',marginTop:20}}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={{
              // backgroundColor: '',
              borderBottomEndRadius: 5,
              borderBottomStartRadius: 5,
              borderWidth: 0,
              marginTop: -2,
              width: '90%',
              marginLeft: 1,
            
            }}
            activeColor="#1FAFDF"
            data={subCategory}
            autoScroll
            dropdownPosition="bottom"
            search
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder={'Select  Sub Category'}
            searchPlaceholder="Search..."
            value={selectedsubcatItems}
            onFocus={() => setIsFocusubcat(true)}
            onBlur={() => setIsFocusubcat(false)}
            onChange={item => onsubselected(item)}
            renderItem={renderItemsubcat}
          />
        </View>

        {/* <View style={{ marginTop: 20 }}>
          <SearchableDropdown
            resetValue={true}
            selectedItems={selectedvendorItems}
            onTextChange={(text) => console.log(text)}
            onItemSelect={(item) => onvendorselected(item)}
            containerStyle={{ padding: 5 }}
            textInputStyle={{
              // Inserted text style
              padding: 12,
              borderWidth: 1,
              color: "black",
              borderColor: "#2874A6",
              backgroundColor: "#fff"
            }}
            itemStyle={{
              // Single dropdown item style
              padding: 10,
              marginTop: 2,
              backgroundColor: "#fff",
              borderColor: "#2874A6",
              borderWidth: 1
            }}
            itemTextStyle={{
              color: "black"
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
        </View> */}
        {/* <View style={{marginTop: 20}}>
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
        </View> */}

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
            onValueChange={itemValue => onselectItem(itemValue)}
            _selectedItem={{
              bg: 'gray',
            }}>
            <Select.Item label="Pallet" value={'1'} />
            <Select.Item label="Individual item" value={'2'} />
          </Select>
        </View>
        {id == '1' ? (
          <View>
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row',marginLeft:5}}>
              <View style={{width: '87%'}}>
                <InputText
                  label="RFID tag"
                  placeholder="Enter RFID tag"
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
                    props.navigation.navigate('BarcodeScanner', {
                      title: 'rfid',
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
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row',marginLeft:5}}>
              <View style={{width: '87%'}}>
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
                    props.navigation.navigate('BarcodeScanner', {
                      title: 'lpn',
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
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row',marginLeft:5}}>
              <View style={{width: '87%'}}>
                <InputText
                  label="Model#"
                  placeholder="Enter Model#"
                  value={modeltxt}
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
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row',marginLeft:5}}>
              <View style={{width: '87%'}}>
                <InputText label="QTY" placeholder="Enter QTY" value={qtytxt} />
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
                      title: 'qty',
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
        ) : id == '2' ? (
          <View>
             <View style={{marginTop: 20, width: '100%', flexDirection: 'row',marginLeft:5}}>
              <View style={{width: '87%'}}>
                <InputText
                  label="RFID tag"
                  placeholder="Enter RFID tag"
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
                    props.navigation.navigate('BarcodeScanner', {
                      title: 'rfid1',
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

            <View style={{marginTop: 20, width: '100%', flexDirection: 'row',marginLeft:5}}>
              <View style={{width: '87%'}}>
                <InputText
                  label="Model#"
                  placeholder="Enter Model#"
                  value={model1txt}
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
            <View style={{marginTop: 20, width: '100%', flexDirection: 'row',marginLeft:5}}>
              <View style={{width: '87%'}}>
                <InputText
                  label="Serial #"
                  placeholder="Serial #"
                  value={serialtxt}
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
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  dropdown: {
    height: 58,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderColor:'#21618C',
    backgroundColor: '#FFF',
    width: '100%',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    borderBottomRightRadius:5,
    borderBottomLeftRadius:5,
  },
  icon: {
    marginRight: 5,
    color: '#000',
  },
  label: {
    position: 'absolute',
    backgroundColor: '#000',
    left: 22,
    top: -8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    display: 'none',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderColor: '#21618C',
    color: 'black',
  },
  item: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    fontSize: 16,
    color: 'black',
  },
});
