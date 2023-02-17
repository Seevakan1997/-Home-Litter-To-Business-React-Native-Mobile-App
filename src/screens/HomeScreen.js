import React,{useState,useEffect} from "react";
import {View, Text, StyleSheet, TouchableOpacity,ScrollView,FlatList,Pressable,Image,Dimensions} from 'react-native';
import { Icon,withBadge } from 'react-native-elements';
import { colors,parameters } from "../global/Styles";
import { filterData,recyclableProducts,restaurantsData } from '../global/Data'
import ProductsCard from "../components/ProductsCard";
import { signOut } from "@firebase/auth";
import { updateDoc,doc,collection,onSnapshot, where, query } from "firebase/firestore";
import { db,auth } from "../../firebase";
// import { doc,updateDoc,} from 'firebase/firestore';


const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen({navigation}){
    const BedeIcon =withBadge()(Icon)
    const [delivery,setDelivery] = useState(true);
    const [indexCheck,setIndexCheck] = useState("0");
    const [organicProducts,setProducts] = useState();
    const [inorganicProducts,setInorgProducts] = useState();



    const SignOut = async () => {
        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            isOnline: false,
        });

        await signOut(auth);

    }

    useEffect(() => {
            const ref = collection(db, 'products')
           
          const q = query(ref,where('selectedOption','==','organic'))
            onSnapshot(q,(snapshots)=>{
                let productsARR = [];
                snapshots.docs.map((doc)=>{
    
                    productsARR.push({...doc.data()})
                    // console.log(productsARR.push({...doc.data()}))
    
                })
                
              setProducts(productsARR)
            
            });
            const q1 = query(ref,where('selectedOption','==','inorganic'))
            onSnapshot(q1,(snapshots)=>{
                let productsARR = [];
                snapshots.docs.map((doc)=>{
    
                    productsARR.push({...doc.data()})
                    // console.log(productsARR.push({...doc.data()}))
    
                })
                
              setInorgProducts(productsARR)
            
            });
            // return () => {
            //     unsubscribeOrganic();
            //     unsubscribeInorganic();
            //   };
            }, []);

    return (
        <View style={styles.container}>
           <View style={styles.header}>
        <View style={{alignItems:'center',justifyContent:'center',marginLeft:15}}>
           <TouchableOpacity onPress={SignOut}>
            <Icon
                type='material-community'
                name="logout"
                color='white'
                size={32}
            />
            </TouchableOpacity>
        </View>
        <View style={{alignItems:'center', justifyContent:'center'}}>
            <Text style={{color:colors.cardbackground, fontSize:25, fontWeight:'bold'}}>Home</Text>
        </View>
        
        <View style={{alignItems:'center', justifyContent:'center', marginRight:15}}>
            <TouchableOpacity onPress={()=>{
                   navigation.navigate('ChatScreen')
               }}>
            <BedeIcon
                type='material-community'
                name='heart'
                size={35}
                color='white'
                
            />
           </TouchableOpacity>
        </View>
            
     </View>
        <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={true}
        >
        <View>
           <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-evenly'}}>
               <TouchableOpacity onPress={()=>{
                   setDelivery(true)
               }}>
                   <View style={{...styles.deliveryButton,backgroundColor:delivery ?colors.button:colors.grey5 }}>
                        <Text style={styles.deliveryText}>Everything</Text>
                   </View>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>{
                   navigation.navigate('AllProducts')
               }}>
                   <View style={{...styles.deliveryButton,backgroundColor:delivery ?colors.grey5:colors.button }}>
                        <Text style={styles.deliveryText}>All Products</Text>
                   </View>
               </TouchableOpacity>
           </View>
        </View>
            <View style={styles.filterView}>
            <TouchableOpacity  onPress={()=>{navigation.navigate('SearchScreen')}}>
               <View style={styles.searchView}>
                   <View style={{flexDirection:'row', alignItems:'center', paddingLeft:10}}>
                    
                       <Icon
                           type='material'
                           name='search'
                           color={colors.grey1}
                           size={26}
                       />
                       <Text style={{color:colors.grey3}}>Search</Text>
                      
                       
                   </View>
               </View>
               </TouchableOpacity>
               <View>
               
                   
               </View>
            </View>
            <View style={styles.headerTextView}>
                <Text style={styles.headerText}>Categories</Text>
            </View>

            <View>
               <FlatList
                   horizontal={true}
                   showsHorizontalScrollIndicator={false}
                   data={filterData}
                   keyExtractor= {(item)=>item.id}
                   extraData={indexCheck}
                   renderItem={({item,index})=>(
                       <Pressable onPress={()=>{
                           setIndexCheck(item.id)
                       }}>
                           <View style={indexCheck === item.id ? {...styles.smallCardSelected} : {...styles.smallCard}}>
                                <Image
                                    style={{height:60, width:60,borderRadius:30}}
                                    source={item.image}
                                />
                                <View>
                                    <Text style={indexCheck === item.id ? {...styles.smallCardTextSelected} : {...styles.smallCardText}}>{item.name}</Text>
                                </View>
                           </View>
                       </Pressable>
                   )}
               />

            </View>
            <View style={styles.headerTextView}>
                <Text style={styles.headerText}>Exchanges for Organic Wastage</Text>
            </View>

         
            <View>
            <ScrollView horizontal={true}>
            {organicProducts && organicProducts.map((product, index) => (
                <View key={index} style={{marginTop: 10, marginBottom: 10}}>
                <ProductsCard 
                    screenWidth={SCREEN_WIDTH * 0.8}
                    images={product.titleImage}
                    productName={product.name}
                    weight ={product.weight + ' '+'of wastage.'}
                    
                />
                </View>
            ))}
            </ScrollView>    
            </View>
           
            <View style={{backgroundColor:colors.grey5,paddingVertical:10}}>
                <Text style={styles.headerText}>Exchanges for Recyclable Wastage</Text>
            </View>

            <View>
                <ScrollView horizontal={true}>
                {inorganicProducts && inorganicProducts.map((product, index) => (
                    <View key={index} style={{marginTop: 10, marginBottom: 10}}>
                    <ProductsCard 
                        screenWidth={SCREEN_WIDTH * 0.8}
                        images={product.titleImage}
                        productName={product.name}
                        weight ={product.weight + ' '+'of wastage.'}
                        
                    />
                    </View>
                ))}
                </ScrollView> 
            </View>
           </ScrollView>
        </View>
    )
};

const styles= StyleSheet.create({
    
    container:{
        flex:1,
       
    },
    header:{
        flexDirection:'row',
        backgroundColor:colors.button,
        height:parameters.headerHeight,
        marginTop:15,
        justifyContent:'space-between'
    },
    deliveryButton:{
        paddingHorizontal:20,
        borderRadius:15,
        paddingVertical:5
    },
    deliveryText:{
        marginLeft:5,
        fontSize:16
    },
    filterView:{flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:20,
        marginVertical:10
    },
    searchView:{flexDirection:'row',
    backgroundColor:colors.grey5,
    borderRadius:15,
    paddingVertical:5,
    justifyContent:'space-between',
    paddingHorizontal:120
},
headerText:{
    color:colors.grey2,
    fontSize:22,
    fontWeight:'bold',
    paddingLeft:10

},
headerTextView:{
    backgroundColor:colors.grey5,
    paddingVertical:3
},
smallCard:{
    borderRadius:30,
    backgroundColor:colors.grey5,
    justifyContent:'center',
    alignItems:'center',
    padding:5,
    width:80,
    margin:10,
    height:100
},
smallCardSelected:{
    borderRadius:30,
    backgroundColor:colors.button,
    justifyContent:'center',
    alignItems:'center',
    padding:5,
    width:80,
    margin:10,
    height:100
},
smallCardTextSelected:{
    fontWeight:'bold',
    color:colors.cardbackground,
    textAlign:'center'

},
smallCardText:{
    fontWeight:'bold',
    color:colors.grey2,
    textAlign:'center'
},
});
