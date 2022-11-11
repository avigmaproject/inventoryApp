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
import AntDesign from 'react-native-vector-icons/AntDesign';
import HeaderBack from '../../components/HeaderBack';
export default function ItemDetail(props){
 
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
            onPress={() =>  props.navigation.goBack()}
            style={{position: 'absolute', left: 20, top: 20}}>
            <AntDesign name="arrowleft" size={30} color="#0F0B56" />
          </TouchableOpacity>
          </View>
   <ScrollView style={{paddingHorizontal:30,}}>
 
        <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
          <Text style={{color: 'black',
              fontSize: 28,
              fontWeight: '600',}}>Items Details</Text>
        </View>
<View style={{alignSelf:'flex-end',marginRight:30,marginTop:30}}>
  <TouchableOpacity style={{height:30,width:80,justifyContent:'center',alignItems:'center',backgroundColor:'#D0D3D4'}}>
      <Text style={{color:'black'}} >save</Text>
  </TouchableOpacity>

</View>   
<View style={{paddingBottom:20}}>
<View  style={{flexDirection:'row',marginTop:30}}>
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}>select Vendor</Text>   
        </View>
        <View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:10,alignItems:'center'}}>

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}></Text>
            
        </View>

        <View  style={{flexDirection:'row',marginTop:30}}>
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}>subcategory</Text>   
        </View>
        <View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:10,alignItems:'center'}}>

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}></Text>
            
        </View>
        <View  style={{flexDirection:'row',marginTop:30}}>
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}>Types of iten</Text>   
        </View>
        <View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:10,alignItems:'center'}}>

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}>Pallet</Text>
            
        </View>
        <View  style={{flexDirection:'row',marginTop:30}}>
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}>RFID tag</Text>   
        </View>
        <View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:10,alignItems:'center'}}>

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}></Text>
            
        </View>
        <View  style={{flexDirection:'row',marginTop:30}}>
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}>LPN#(Pallet only)</Text>   
        </View>
        <View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:10,alignItems:'center'}}>

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}></Text>
            
        </View>
        <View  style={{flexDirection:'row',marginTop:30}}>
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}>Model#</Text>   
        </View>
        <View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:10,alignItems:'center'}}>

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}></Text>
            
        </View>
        <View  style={{flexDirection:'row',marginTop:30}}>
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}>QTY</Text>   
        </View>
        <View  style={{flexDirection:'row',height:50,backgroundColor:'white',marginTop:10,alignItems:'center'}}>

  
          <Text style={{color: 'black',
              fontSize: 18,
              fontWeight: '600',marginLeft:10,}}></Text>
            
        </View>
  
  
  
        </View>
       
        </ScrollView>     
      </SafeAreaView>
      );
    }