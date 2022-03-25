import React from "react";
import { View,Text,Image} from "react-native-animatable";
import { ListItem,Avatar } from 'react-native-elements';

const User = ({user})=>{
    const uploadImage = "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
    return(

        <ListItem style={{marginBottom:10,borderBottom:5}}>
            
            <Avatar
               rounded
               source={{uri:user ? user.profile_pic : uploadImage }}
           />
             <ListItem.Content>
             <ListItem.Title>{user.username}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    )
}
export default User;