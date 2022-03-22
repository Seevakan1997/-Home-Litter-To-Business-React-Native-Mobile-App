import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ListItem,Avatar } from 'react-native-elements';

export default function CustomChatItems() {
    return (
       <ListItem>
           <Avatar
               rounded
               source={{uri:"https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"}}
           />
            <ListItem.Content>
                <ListItem.Title>Chat1</ListItem.Title>
                <ListItem.Subtitle numberOfLines={1}>Hello</ListItem.Subtitle>
            </ListItem.Content>
       </ListItem>
    );
}

const styles = StyleSheet.create({
  
});