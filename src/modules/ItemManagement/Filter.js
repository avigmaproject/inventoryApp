import { View, Text ,StatusBar,SafeAreaView,StyleSheet, Dimensions,TouchableOpacity,FlatList,Image} from "react-native"
import React from "react"
import { useEffect,useState } from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dropdown } from 'react-native-element-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import InputText from "../../components/InputText"
import { getProduct } from "../../services/api.function"
import { useSelector } from "react-redux"
import { paddingBottom } from "styled-system";

export default function Filter(props) {
    const [item, setitem] = useState([])
    const [vendorname, setvendorname] = useState("")
    const [subcategory, setsubcategory] = useState("")
    const [category, setcategory] = useState("")
    const [filterdata,setfilterdata]=useState([])
    const token = useSelector((state) => state.authReducer.userToken)
    // useEffect(() => {
    //     GetProductList()
    //   }, [])
      const GetProductList = async () => {
        let data = {
          Type: 6,
          Pro_Vendor_Name:vendorname,
          Cat_Name:category,
          SubCat_Name:subcategory,
          PageNumber:1,
          NoofRows:100
        }
        console.log("vendorname",data.Pro_Vendor_Name)
        console.log("categoryname",data.Cat_Name)
        console.log("subcategory name",data.SubCat_Name)
        console.log("data and tokenhome apgeeee", data, token)
        await getProduct(data, token)
          .then((res) => {
            console.log("res of Product List........", res)
            setitem(res[0])
          })
          .catch((error) => {
            console.log("errror is.....", error)
          })
      }
    const data = [
        { label: 'Vendor Name', value: '1' },
        { label: 'Category Name', value: '2' },
        { label: 'Sub Category Name', value: '3' },
      ];
      const [value, setValue] = useState(null);
      console.log("valuee is",value)
    const [isFocus, setIsFocus] = useState(false);
    // const renderLabel = () => {
    //     if (value || isFocus) {
    //       return (
    //         // <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            
    //         // </Text>
    //       );
    //     }
    //     return null;
    //   };
      const onsearchview = async (itemValue) => {
    
       
        setIsFocus(false)

      }
      const _renderItem = ({ item }) => {
        return (
          <View
            style={{
              flexDirection: "row",
              height: 65,
              backgroundColor: "white",
              marginTop: 30,
              alignItems: "center",
              borderRadius:20
            }}
          >
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() =>  props.navigation.navigate('ItemDetail',{Detail:item})}
            >
              <Image
                style={{
                  marginLeft: 20,
                  height: 35,
                  width: 35,
                  borderRadius: 45,
                  borderColor: "#BDBDBD",
                  borderWidth: 1
                }}
                source={require("../../assets/Logo/items.png")}
              />
              {value==="1" ?
              <Text
              style={{
                color: "black",
                fontSize: 18,
                fontWeight: "600",
                marginLeft: 30
              }}
            >
              {item.Pro_PkeyID}
            </Text> : value==="2"?
            <Text
            style={{
              color: "black",
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 30
            }}
          >
            {item.Pro_PkeyID}
          </Text>:value==="3"?
          <Text
          style={{
            color: "black",
            fontSize: 18,
            fontWeight: "600",
            marginLeft: 30
          }}
        >
          {item.Pro_PkeyID}
        </Text>:""
              }
              
            </TouchableOpacity>
          </View>
        )
      }
      
  return (
    <SafeAreaView >
           <StatusBar barStyle="dark-content" backgroundColor={"white"} />
           <View
          style={{
            backgroundColor: "#fff",
            height: 60,
            justifyContent:'center',    
          }}
        >
            <View
            style={{
              justifyContent: "center",
             alignItems: 'center',
              flexDirection: "row",
             
            }}
          >
            <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{position: 'absolute', left: 20}}>
        <Ionicons name="arrow-back" size={30} color="#0F0B56" />
      </TouchableOpacity>
      <Text
            style={{
              color: 'black',
              fontSize: 20,
              fontWeight: '600',
            }}>Filter</Text>
            
          </View>

            </View>
            <View style={{paddingHorizontal:20}}>

            
            <View style={{marginTop:20}}>
           
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          containerStyle={{
            backgroundColor: "#FFF",
            borderBottomEndRadius: 5,
            borderBottomStartRadius: 5,
            borderColor:'#21618C',
            borderWidth: 0,
            marginTop: -2,
            width: "90%",

            marginLeft: 1
          }}
          activeColor="#1FAFDF"
          data={data}
         
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={(itemValue) => onsearchview(itemValue)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Entypo
              style={styles.icon}
              color={'#21618C'}
              name="chevron-with-circle-down"
              size={28}
            />
          )}
        />
      
            </View>

            {value==="1"  &&(<View style={{marginTop:10,flexDirection:'row',alignItems:'center'}}>
                <View style={{width:'80%'}}>
                <InputText
                  label="Search Vendor Name  Here"
                  placeholder="Enter Text You Want To Search"
                  value={vendorname}
                  onChangeText={vendorname => setvendorname(vendorname)}
                />
              
                </View>
                
                <View  style={{marginLeft:10,width:20}}>
                <TouchableOpacity
           
           onPress={() => GetProductList()}
          style={{
            backgroundColor:'#21618C',
            height: 35,
            width: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:15
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              lineHeight: 21,
              fontWeight: '500',
            }}>
            Search
          </Text>
        </TouchableOpacity>
                </View>
               
</View>)
            }
             {value==="2"  &&(<View style={{marginTop:10,flexDirection:'row',alignItems:'center'}}>
                <View style={{width:'80%'}}>
                <InputText
                  label="Search Category Here"
                  placeholder="Enter Text You Want To Search"
                   value={ category}
                   onChangeText={category => setcategory(category)}
                />
              
                </View>
                
                <View  style={{marginLeft:10,width:20}}>
                <TouchableOpacity
         onPress={() => GetProductList()}
          style={{
            backgroundColor:'#21618C',
            height: 35,
            width: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:15
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              lineHeight: 21,
              fontWeight: '500',
            }}>
            Search
          </Text>
        </TouchableOpacity>
                </View>
               
</View>)
            }
             {value==="3"  &&(<View style={{marginTop:10,flexDirection:'row',alignItems:'center'}}>
                <View style={{width:'80%'}}>
                <InputText
                  label="Search Sub Category"
                  placeholder="Enter Text You Want To Search"
                   value={subcategory}
                   onChangeText={subcategory => setsubcategory(subcategory)}
                />
              
                </View>
                
                <View  style={{marginLeft:10,width:20}}>
                <TouchableOpacity
       onPress={() => GetProductList()}
          style={{
            backgroundColor:'#21618C',
            height: 35,
            width: 60,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:15
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              lineHeight: 21,
              fontWeight: '500',
            }}>
            Search
          </Text>
        </TouchableOpacity>
                </View>
               
</View>)
            }
            <View style={{paddingBottom:20}}>
            <FlatList data={item} renderItem={_renderItem} />
            </View>
        
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 60,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      borderColor:'#21618C',
      backgroundColor:'white',
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 10,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 18,
      color:'black'
    },
    placeholderStyle: {
      fontSize: 18,
     
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });