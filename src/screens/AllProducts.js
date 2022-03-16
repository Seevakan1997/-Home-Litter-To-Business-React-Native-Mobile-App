import React,{useState,useEffect} from 'react';
import {View, Text,StyleSheet,ScrollView,TouchableOpacity,ImageBackground,Image,Button} from 'react-native';
import { colors } from '../global/Styles';
import { auth,db } from '../../firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { Icon,withBadge } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export default function AllProducts({navigation}){
    const [products,setProducts] = useState()
    const BedeIcon =(Icon)
    useEffect(() => {
        try {
            const ref = collection(db, 'products')
            onSnapshot(ref,(snapshots)=>{
                let productsARR = [];
                snapshots.docs.map((doc)=>{

                    productsARR.push({...doc.data(),id:doc.id})
                })
              setProducts(productsARR)
            
            })

             
        } catch (error) {

            let productsARR = [];
            setProducts(productsARR)

        }


    }, [])


    return(
        <View style ={{flex:1,marginTop:20}}>
            <View style={{backgroundColor:colors.button,marginVertical:10}}>
                <Text style={styles.headerText}>All Products</Text>
            </View>

            <ScrollView vertical={true} showsVerticalScrollIndicator={false}>

            {products && products.map((products) => (
            <TouchableOpacity key={products.id} onPress={()=>{navigation.navigate('ProductDetailsScreen',{
                         productsId:products.id,
                         productsImg:products.titleImage,
                         productsName:products.name,
                         productsWeight:products.weight,
                         productsDesc:products.description
                     })}}>
            <View key={products.id} style={styles.product}>
                <View style={styles.imageContainer}>
                    <Image style={styles.suggestImg} 
                        source={{uri:products.titleImage}}
                             />
                </View>   

                <View style={styles.details}>
                     <Text style={styles.title}>{products.name}</Text>
                     <Text style={styles.weight}>{products.weight}</Text>
                </View>
                <View style={styles.actions}>
                     <TouchableOpacity key={products.id} onPress={()=>{navigation.navigate('ProductDetailsScreen',{
                         productsId:products.id,
                         productsImg:products.titleImage,
                         productsName:products.name,
                         productsWeight:products.weight,
                         productsDesc:products.description
                     })
                           
                        }}>
                       <Ionicons name="list" size={30} color="#12AD2B" />
                    </TouchableOpacity>

                     <TouchableOpacity onPress={()=>{
                           
                        }}>
                       <Ionicons name="location" size={30} color="#12AD2B" />
                    </TouchableOpacity>

                      <TouchableOpacity onPress={()=>{
                            navigation.navigate('ChatScreen')
                        }}>
                        <BedeIcon
                            type='material-community'
                            name='chat'
                            size={35}
                            color='#12AD2B'
                            
                        />
                    </TouchableOpacity>
                </View>
                        
                 
                </View>
                </TouchableOpacity>
            ))}

            </ScrollView>
            
            
        </View>
    )
}

const styles= StyleSheet.create({
    headerText:{
        textAlign:'center',
        alignItems:'center',
        color:colors.headerText,
        fontSize:22,
        fontWeight:'bold',
        marginTop:10
    },
    suggestImg: {
        width:'100%',
        height:'100%',
    },
   
    product:{
        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},
        shadowRadius:8,
        elevation:5,
        borderRadius:10,
        backgroundColor:'white',
        height:300,
        margin:20
    },
    details:{
        alignItems:'center',
        height:'15%',
        
    },
    title:{
        fontSize:18,
        marginVertical:1
    },
    weight:{
        fontSize:14,
        color:'#888'
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        height:'25%',
        paddingHorizontal:20,

    },
    imageContainer:{
        width:'100%',
        height:'60%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        overflow:'hidden'
    },
})