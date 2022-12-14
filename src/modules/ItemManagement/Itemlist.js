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
export default function Itemlist(props){
  useEffect(() => {
    GetProductList();
    
  }, []);
  const [item, setitem] = useState([]);
  const token = useSelector(state => state.authReducer.userToken);
  console.log('token is', token);
  const GetProductList = async () => {
    let data = {
      Type: 4,
    };
    console.log('data and token', data, token);
    await getproductlist(data, token)
      .then(res => {
         console.log("res of Product List........", res)
        setitem(res[0])
        })
        .catch((error) => {
          console.log("errror is.....", error)
       
          
        })
    }
    const _renderItem = ({item, index}) => {
      return (
<View  style={{flexDirection:'row',height:65,backgroundColor:'white',marginTop:30,alignItems:'center',borderRadius:20}}>
<TouchableOpacity style={{flexDirection:'row'}} onPress={() =>  props.navigation.navigate('Additem',{Detail:item})} > 
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
      <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
         <StatusBar barStyle="dark-content" backgroundColor={"white"} />
          <Header
        header="Items"
        back={true}
        filtricon={true}
        onPressFilter={() =>  props.navigation.navigate('Filter')}
     
        onPressCancel={() => props.navigation.goBack()}
        // onPressSave={() => this.editProduct()}
      />


 <View style={{paddingHorizontal:30}}>

{/* <View  style={{flexDirection:'row',  height: 70,
              borderRadius: 20,backgroundColor:'white',marginTop:30,alignItems:'center'}}>
<TouchableOpacity style={{flexDirection:'row',}} onPress={() =>  props.navigation.navigate('Additem')}>
        
          <Icon name="plus-circle" size={30} color="#21618C" style={{marginLeft:20}} />

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:30,}}>Add Item</Text>
              </TouchableOpacity>
        </View> */}
        <View style={{paddingBottom:50}}>
        <FlatList 
         data={item} 
         renderItem={_renderItem} />
        </View>
        <View style={{justifyContent:'center',alignItems:'center',position: 'absolute',bottom: 130, right: 50, zIndex: 200,height:65 }}>
        <TouchableOpacity style={{ flexDirection:'row',backgroundColor:'#21618C',borderRadius:50}} onPress={() =>  props.navigation.navigate('Additem')}>
        
        <Icon name="plus-circle" size={65} color="white" />


        {/* <Text style={{color: 'black',marginLeft:10,marginTop:5,
            fontSize: 20,
            fontWeight: '600'}}>Add Item</Text> */}
            </TouchableOpacity>
</View>
        {/* <View>
              <FAB
                style={{
                  position: 'absolute',
                  margin: 16,
                  bottom: 10, right: 10, zIndex: 200 ,
                   backgroundColor: 'white',
                  // width: 50,
                  // height: 50,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                icon="plus"
                label="Add Items"
                color="#21618C"
                onPress={() =>
                props.navigation.navigate('Additem')
                }
              />
            </View>
         */}
</View>
      
      </SafeAreaView>
      );
    }