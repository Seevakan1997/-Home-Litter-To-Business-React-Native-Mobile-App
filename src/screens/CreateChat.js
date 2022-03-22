import { StyleSheet, Text, View } from 'react-native';
import React,{useState} from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db,auth } from '../../firebase';
import { Button } from 'react-native-elements';

export default function CreateChat({navigation}) {
    const [products,setProducts] = useState()


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
    
    const Chat = async ()=>{
        await db.collection("chats").add({
            userId:products.uid
        })
        .then(()=>{
            navigation.navigate('ChatScreen');
        })
        .catch((error)=>alert(error));
    }
 
    return (
      <View>
        <Button />
      </View>
    );
}

const styles = StyleSheet.create({
  
});