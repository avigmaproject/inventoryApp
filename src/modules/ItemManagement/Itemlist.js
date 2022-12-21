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
  FlatList
} from 'react-native';

import {FAB} from 'react-native-paper';
import Header from './Header';
import Icon from 'react-native-vector-icons/Feather';
import HeaderBack from '../../components/HeaderBack';
import {
  getproductlist
} from '../../services/api.function';
import {useSelector} from 'react-redux';
import { useFocusEffect } from "@react-navigation/native"

export default function Itemlist(props){
  useEffect(() => {
    GetProductList();
    
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      GetProductList()
    }, [])
  )

  const [isview, setisview] = useState(true);
  const [item, setitem] = useState([]);
  const token = useSelector(state => state.authReducer.userToken);
  // console.log('token is', token);
  const GetProductList = async () => {
    let data = {
      Type: 4,
    };
    // console.log('data and token', data, token);
    await getproductlist(data, token)
      .then(res => {
        if (res[0].length === 0) {
          setisview(false);
          } else {
            setisview(true);
        //  console.log("res of Product List........", res)
        setitem(res[0])
        }
        })
        .catch((error) => {
          console.log("errror is.....", error)
       
          
        })
    }
    const _renderItem = ({item, index}) => {
      return (
<View  style={{flexDirection:'row',height:65,backgroundColor:'white',marginTop:30,alignItems:'center',borderRadius:20}}>
<TouchableOpacity style={{flexDirection:'row'}} onPress={() =>  props.navigation.navigate('ItemDetail',{Detail:item})} > 
<Image
                  style={{
                    marginLeft:20,
                    height: 35,
                    width: 35,
                    borderRadius: 45,
                    borderColor: '#BDBDBD',
                    borderWidth: 1,
                  }}
                  source={require('../../assets/Logo/items.png')}
  />
          <Text style={{color: 'black',
              fontSize: 18,marginTop:5,
              fontWeight: '600',marginLeft:30,}}>{item.Pro_PkeyID}</Text>
              </TouchableOpacity>
        </View>
      )}
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F3F2F4" }}>
      <StatusBar barStyle="dark-content" />
      <Header
        header="Items"
        back={true}
        filtricon={true}
        onPressCancel={() => props.navigation.goBack()}
        onPressFilter={() => props.navigation.navigate("Filter")}
      />
 {!isview ? (
     <View
     style={{
       justifyContent: 'center',
       alignItems: 'center',
       flex: 1,
       
     }}>
      <Text style={{color:"black",fontSize:24,weight:"600"}}>No Items</Text>
      </View>
       ) : (
      <View style={{ paddingHorizontal: 30, flex: 1 }}>

        <View>
          <FlatList data={item} renderItem={_renderItem} />
        </View>
    
      </View>
       )}
           <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: 50,
            right: 30,
            zIndex: 1,
            height: 65
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              backgroundColor: "#21618C",
              borderRadius: 50
            }}
            onPress={() => props.navigation.navigate("Additem")}
             
            
          >
            <Icon name="plus-circle" size={65} color="white" />
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}