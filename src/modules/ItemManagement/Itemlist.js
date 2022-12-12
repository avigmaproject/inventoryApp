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
<View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:30,alignItems:'center'}}>
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
              fontSize: 18,
              fontWeight: '600',marginLeft:30,}}>{item.Pro_PkeyID}</Text>
              </TouchableOpacity>
        </View>
      )}
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
         <StatusBar barStyle="dark-content" />
          <Header
        header="Items"
        back={true}
        filtricon={true}
     
        onPressCancel={() => props.navigation.goBack()}
        // onPressSave={() => this.editProduct()}
      />


<View style={{paddingHorizontal:30}}>
<View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:30,alignItems:'center'}}>
<TouchableOpacity style={{flexDirection:'row',}} onPress={() =>  props.navigation.navigate('Additem')}>
        
          <Icon name="plus-circle" size={30} color="#21618C" style={{marginLeft:20}} />

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:30,}}>Add Item</Text>
              </TouchableOpacity>
        </View>
        <View>
        <FlatList 
         data={item} 
         renderItem={_renderItem} />
        </View>
<View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:30,alignItems:'center'}}>
<TouchableOpacity style={{flexDirection:'row'}} onPress={() =>  props.navigation.navigate('ItemDetail')} > 
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
              fontSize: 18,
              fontWeight: '600',marginLeft:30,}}>Item 1</Text>
              </TouchableOpacity>
        </View>
        <View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:30,alignItems:'center'}}>
<TouchableOpacity style={{flexDirection:'row'}}> 
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
              fontSize: 18,
              fontWeight: '600',marginLeft:30,}}>Item 2</Text>
</TouchableOpacity>

        </View>
        <View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:30,alignItems:'center'}}>
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
              fontSize: 18,
              fontWeight: '600',marginLeft:30,}}>Item 3</Text>
        </View>
        <View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:30,alignItems:'center'}}>
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
              fontSize: 18,
              fontWeight: '600',marginLeft:30,}}>Item 4</Text>
        </View>
        <View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:30,alignItems:'center'}}>
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
              fontSize: 18,
              fontWeight: '600',marginLeft:30,}}>Item 5</Text>
        </View>
        
</View>
      
      </SafeAreaView>
      );
    }