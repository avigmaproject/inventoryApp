import React  from 'react';
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
import Icon from 'react-native-vector-icons/Feather';
import HeaderBack from '../../components/HeaderBack';
export default function Itemlist(props){
 
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F3F2F4'}}>
 {/* <View
          style={{
            backgroundColor: '#fff',
            height: 60,
            justifyContent: 'center',
            //   alignItems: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{position: 'absolute', left: 20, top: 20}}>
            <AntDesign name="arrowleft" size={30} color="#0F0B56" />
          </TouchableOpacity>
          </View> */}
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:30}}>
          <Text style={{color: 'black',
              fontSize: 28,
              fontWeight: '600',}}>Items</Text>
              <TouchableOpacity style={{position: 'absolute', right: 20,}}> 
  <Icon name="filter" size={30} color="#1FAFDF" style={{marginLeft:20}} />
  </TouchableOpacity>
        </View>
<View style={{alignSelf:'flex-end',marginRight:30,marginTop:30}}>
  

</View>
<View style={{paddingHorizontal:30}}>
<View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:30,alignItems:'center'}}>
<TouchableOpacity style={{flexDirection:'row',}} onPress={() =>  props.navigation.navigate('Additem')}>
        
          <Icon name="plus-circle" size={30} color="#1FAFDF" style={{marginLeft:20}} />

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:30,}}>Add Item</Text>
              </TouchableOpacity>
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