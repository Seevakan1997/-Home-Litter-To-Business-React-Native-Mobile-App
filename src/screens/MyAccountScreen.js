import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity,Image, Alert,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Avatar,Title,Caption,TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db,storage,auth } from '../../firebase';
import { doc,updateDoc,collection,onSnapshot, where, query} from 'firebase/firestore';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../global/Styles';
import { Ionicons } from '@expo/vector-icons';


const MyAccountScreen = ({navigation}) => {
  const uploadImage = "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";
  const BedeIcon =(Icon)
  
  // const [image, setImage] = useState(null);
  const [user, setuser] = useState();
  const [products,setProducts] = useState()
  
  const getUser = async () => {
    try {

      const ref = doc(db, "users", auth.currentUser.uid)
      onSnapshot(ref, (snapshot) => {
        // console.log(snapshot.data())

        setuser(snapshot.data())

      })
      // console.log(user)

    }
    catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])


 
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert('Sorry, we need permossion of your gallery to change profile picture!');
        }
      }
    })();
  }, []);
  
 //Profile image picker 
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      // console.log(result);
      let ImgUrl;
      if (result.uri) {
        const response1 = await fetch(result.uri);
        const blob1 = await response1.blob();
        const imgRef = ref(storage, `Profile_image/${new Date().getTime()}`);
        const snap = await uploadBytes(imgRef, blob1);
        const downloadUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        ImgUrl = downloadUrl;


      }



      if (ImgUrl) {

        await updateDoc(doc(db, 'users', auth.currentUser.uid), {
          profile_pic: ImgUrl
          

        })

        console.log("uploaded")
        Alert.alert('Profile Picture has changed');
      }

    }
    catch (error) {
      // console.log(error)
    }

  };

  useEffect(() => {
    try {
      // const ref1 = doc(db, "users", auth.currentUser.uid)
      // onSnapshot(ref1, (snapshot) => {

      //   setuser(snapshot.data('owner_uid'))
      //   console.log(snapshot.data('owner_uid'))

      // })

        const ref = collection(db, 'products')
        // console.log(ref1)
      const q = query(ref,where('uid','==',auth.currentUser.uid))
        onSnapshot(q,(snapshots)=>{
            let productsARR = [];
            snapshots.docs.map((doc)=>{

                productsARR.push({...doc.data()})
                // console.log(productsARR.push({...doc.data()}))

            })
            
          setProducts(productsARR)
        
        })

         
    } catch (error) {

        let productsARR = [];
        setProducts(productsARR)

    }


}, [])





  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginTop: 100 }}>
          <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center', height: 100, }} >

            {/* <Image source={{ uri: user ? user.profile_pic : uploadImage }} style={{ width: 100, height: '100%', resizeMode: 'contain', borderRadius: 20 }}/> */}

{user && <Image source={{ uri: user.profile_pic ?? uploadImage}} style={{ width: 100, height: '100%', resizeMode: 'contain', borderRadius: 20 }}/>}


          </TouchableOpacity>

          <View >
          {user && <Title style={[styles.title, {
              marginTop: 15,
              marginBottom: 5,
              alignItems: 'center',
            }]}>{user.username}</Title>}
           
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        
        
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20} />
         {user &&  <Text style={{ color: "#777777", marginLeft: 20, fontSize: 20 }}>{user.email}</Text> }
        </View>
      </View>
    
     

      <View style={styles.menuWrapper}>
       



       
    <TouchableRipple onPress={()=>navigation.push('EditProfileScreen')}>
       <View style={styles.menuItem}>
       <AntDesign name="edit" size={24} color="black" />
         <Text style={styles.menuItemText}>Edit info</Text>
       </View>
     </TouchableRipple> 
        
      </View>


      <View style ={{flex:1,marginTop:20}}>
            <View style={{backgroundColor:colors.button,flexDirection:'row'}}>
      <ScrollView nestedScrollEnabled={true} vertical={true} showsVerticalScrollIndicator={false}>
            
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}><Text style={[styles.title, {
              marginTop: 15,
              marginBottom: 5,
              alignItems: 'center',
              color:'white',
              fontSize:30,
            }]}>My Products</Text></View>
      {products && products.map((products) => (
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
    <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:75,paddingTop:10}}>
    <TouchableOpacity>
    <BedeIcon
                            type='material-community'
                            name='delete'
                            size={40}
                            color='red'
                            
                        />

    </TouchableOpacity>
    <TouchableOpacity>
    <Ionicons name="eyedrop-outline" size={35} color="#12AD2B" />

    </TouchableOpacity>
   </View>
   </View>
            
     
    </View>
    ))}
</ScrollView>
   </View>
</View>
    </SafeAreaView>
    
  );
   
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 20,
    lineHeight: 20,
    fontWeight: '500',
    marginTop: 5
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 5,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 26,
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

imageContainer:{
    width:'100%',
    height:'60%',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    overflow:'hidden'
},
});


export default MyAccountScreen;