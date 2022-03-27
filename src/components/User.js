import React from "react";
import { View,Text,Image} from "react-native-animatable";
import { ListItem,Avatar } from 'react-native-elements';
import {TouchableOpacity} from 'react-native'

const User = ({user,selectUser,navigation})=>{
    const uploadImage = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
    return(
        <TouchableOpacity onPress={()=>{ selectUser(user),navigation.navigate('Message',{selectUserId:user.owner_uid,
         selectUserName:user.username
        })}}>
        <View style={{flexDirection:'row',borderBottomWidth:1}}>
            <Image style={{width:75,height:75,paddingTop:50,borderRadius:50}} source={{uri:user ? user.profile_pic : uploadImage }} />
            <Text>{user.username}</Text>
        </View>
        </TouchableOpacity>
    )
}
export default User;