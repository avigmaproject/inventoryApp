import { View, Text ,StatusBar,SafeAreaView,StyleSheet, Dimensions,TouchableOpacity,FlatList,Image} from "react-native"
import React from "react"
import { useEffect,useState } from "react";

export default function Filter(props) {
    const [status,setstatus]=useState('All')
    const setstatusFilter =status =>{
        if(status !== 'All')
        {
            setdatalist([...data.filter(e => e.status === status)])
        }
        else{
            setdatalist(data)
        }
        setstatus(status)
    }
    const [datalist,setdatalist]=useState(data)

const Listtab=[
    {
        status:'All'
    },
    {
        status:'Vendor'
    },
    {
        status:'Subcategory'
    },
]
const data=[
    {
        name:'abc',
        status:'All'
    },
    {
        name:'xyz',
        status:'Vendor'
    },
    {
        name:'pqr',
        status:'Subcategory'
    },
    {
        name:'xyz',
        status:'Vendor'
    },
    {
        name:'pqr',
        status:'Subcategory'
    },

]
const renderItem = ({item,index}) =>{
    return(
        <View key={index} style={styles.itemcontainer}>
            <View style={styles.itemtext}>
                <Text>{item.name}</Text>
            </View>
            <View style={styles.itemtext}>
                <Text>{item.status}</Text>

            </View>

        </View>
    )
}
  return (
    <SafeAreaView style={styles.container}>
           <StatusBar barStyle="dark-content" backgroundColor={"white"} />
    <View style={styles.ListTab}>
        {
            Listtab.map(e => (
                <TouchableOpacity 
                style={[styles.btntab,status === e.status && styles.btntabactive]}
                 onPress={()=> setstatusFilter(e.status)}>
                <Text style={[styles.txttab, status === e.status && styles.txttabactive]}>
                    {e.status}
                </Text>
              </TouchableOpacity>
            ))
        }
     
    </View>
    <FlatList
    data={datalist}
    keyExtractor={(e,i) => i.toString()}
    renderItem={renderItem}/>

    
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,
        justifyContent:'center'
    },
    ListTab:{
        flexDirection:'row',
        
        alignSelf:'center',
        marginBottom:20
    },
    btntab:{
        width:Dimensions.get('window').width/3.5,
        flexDirection:'row',
      
        padding:5,
        justifyContent:'center'
    },
    txttab:{
        fontSize:16
    },
    btntabactive:{
        backgroundColor:'blue'
    },
    txttabactive:{
        color:'#fff',

    },
    itemcontainer:{
        flexDirection:'row',
        paddingVertical:15
    },
    itemtext:{
        fontSize:20,
        color:'black'
    }
})