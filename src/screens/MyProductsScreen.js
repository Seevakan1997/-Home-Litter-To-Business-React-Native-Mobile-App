import React,{useState,useEffect} from 'react'
import {View, Text,StyleSheet,Image,TouchableOpacity,TextInput,Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import { auth,db,storage } from '../../firebase';
import { Button } from 'react-native-elements';
import { getDownloadURL,ref,uploadBytes } from 'firebase/storage';
import { colors,parameters } from '../global/Styles';
import { addDoc,collection } from 'firebase/firestore';


const MyProductsScreen=()=>{
  const uploadImage = 'https://www.babypillowth.com/images/templates/upload.png'
  const [image, setImage] = useState(uploadImage);

    const pickImage = async () => {
 
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
        console.log(result.uri);
      }
    };
  
    const AddSubmit = async (name, description, weight) => {
      let ImgUrl;
        if (image) {
          const response1 = await fetch(image);
          const blob1 = await response1.blob();
          const imgRef = ref(storage, `images/products/${new Date().getTime()}`);
          const snap = await uploadBytes(imgRef, blob1);
          const downloadUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
          ImgUrl = downloadUrl;
      }
      
    
     
      
  
      await addDoc(collection(db,'products'), {
          name: name,
          description: description,
          weight:weight,
          createAt: new Date(),
          titleImage: ImgUrl,
          uid: auth.currentUser.uid,
          usermail: auth.currentUser.email
         
          
  
      }).then(() => {
          Alert.alert('Successfully Added');
          
      })
  
  }
  



    return(
      <View style={styles.container} >
       <View style={{alignItems:'center',marginBottom:20}}>
          <Text style={styles.text1}>Upload New Product</Text>
          </View>
      <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center', height: 100, }} >
                    <Image source={{ uri: image }} style={styles.image}></Image>
            </TouchableOpacity>
      <Formik  
          initialValues={{name:'', description:'', weight:''}}
          onSubmit={values=> {
                AddSubmit(values.name, values.description, values.weight);
            } }
        
            
            validateOnMount={true}
        >
        
        {({
            handleBlur,
            handleSubmit,
            handleChange,
            values,
            errors,
            selectedValue,
            onValueChange
        })=>(
          <>
        <View>
         
        <View >
          <TouchableOpacity  onPress={pickImage} style={{marginVertical:20}}>
            <Image source={{uri:image}} />
            
          </TouchableOpacity>
        </View>

        <View>
          <TextInput 
          style={styles.textInput1}
          placeholder='Product Name'
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
          >

          </TextInput>
          <TextInput 
          style={styles.textInput1}
          placeholder='Description'
          onChangeText={handleChange('description')}
          onBlur={handleBlur('description')}
          value={values.description}
          >

          </TextInput>
          <TextInput 
          style={styles.textInput1}
          placeholder='Weight Of Litter'
          onChangeText={handleChange('weight')}
          onBlur={handleBlur('weight')}
          value={values.weight}
          >

          </TextInput>
          
        </View>

        <View style={{marginHorizontal:20, marginTop:20}}>
                <Button
                    title='Submit'
                    buttonStyle={parameters.styledButton}
                    onPress={handleSubmit}
                    
                />
            </View>


          </View>
        
        </>
        )}
        </Formik>
        </View>
    )
}

const styles= StyleSheet.create({
  container:{
    marginTop:70,
    flex:1,
   
},
   
    text1:{
      alignItems:'center',
      color:colors.button,
      fontSize:30,
      fontWeight:'bold'
    },
    image:{
      height: '100%',
      width: '100%',
      
      borderRadius: 20
    },
    textInput1:{
        
      borderWidth:1,
      borderColor:'#86939e',
      marginHorizontal:20,
      borderRadius:10,
      marginBottom:20,
      paddingLeft:15,
      height:40,
    },
    image:{
      height: '100%',
       width: '100%', 
       resizeMode: 'contain', 
       borderRadius: 20 
    }
    
    
});

export default MyProductsScreen;