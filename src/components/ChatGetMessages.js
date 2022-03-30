import { View, Text, Image,ScrollView } from 'react-native'
import Moment from 'moment';
import React from 'react'
import {auth} from '../../firebase'

const ChatGetMessages = ({ chats }) => {

    return (
        <View  >
         
            {chats && chats.from === auth.currentUser.uid ? (
               
                <View style={{ alignItems: 'flex-end', marginHorizontal: 20 }}>

                    <View style={{ backgroundColor: '#12AD2B', marginBottom: 20, paddingVertical: 10, paddingHorizontal: 15, borderBottomLeftRadius: 10, borderTopLeftRadius: 5, borderBottomRightRadius: 5 }}>
                        <Text style={{  alignSelf: 'flex-start',color:'white' }}>{chats.text}</Text>
                        {chats.createdAt && <Text style={{  fontSize: 9, letterSpacing: 1, marginTop: 5, alignSelf: 'flex-end',color:'white' }}>{Moment(chats.createdAt.toDate()).format('LT')}</Text>}
                    </View>

                </View>) : (

                <View style={{ alignItems: 'flex-start', marginHorizontal: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        
                        <View style={{ marginBottom: 20, backgroundColor: 'blue', borderBottomLeftRadius: 10, borderTopRightRadius: 5, borderBottomRightRadius: 5, paddingVertical: 10, paddingHorizontal: 15 }}>
                            <Text style={{color:'white'}}>{chats.text}</Text>
                            {chats.createdAt && <Text style={{  fontSize: 8, letterSpacing: 1, marginTop: 5, alignSelf: 'flex-end',color:'white' }}>{Moment(chats.createdAt.toDate()).format('LT')}</Text>}
                        </View>
                    </View>

                </View>
              
                )}

                
        </View>

    )
}

export default ChatGetMessages