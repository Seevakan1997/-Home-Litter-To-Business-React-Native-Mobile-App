import React from 'react'
import { View, Text } from 'react-native'
import { auth } from '../../../firebase'

const ChatGetMessages = ({ chats }) => {
    return (
        <View>
            {chats && chats.from === auth.currentUser.uid ? (
                <View style={{ alignItems: 'flex-end', marginHorizontal: 20 }}>

                    <View style={{ marginTop: 10, backgroundColor: 'green', padding: 5, paddingHorizontal: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10 }}>
                        <Text style={{ color: 'white', }}>{chats.text}</Text>
                        {/* <Text style={{ color: 'white', fontSize: 8, letterSpacing: 1, marginTop: 5 }}>{Moment(chats.createAt.toDate()).fromNow()}</Text> */}
                    </View>
                </View>) : (

                <View style={{ alignItems: 'flex-start', marginHorizontal: 20 }}>

                    <View style={{ marginTop: 10, backgroundColor: 'green', padding: 5, paddingHorizontal: 10, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                        <Text style={{ color: 'white', }}>{chats.text}</Text>
                        {/* <Text style={{ color: 'white', fontSize: 8, letterSpacing: 1, marginTop: 5 }}>{Moment(chats.createAt.toDate()).fromNow()}</Text> */}
                    </View>
                </View>)}
        </View>

    )
}

export default ChatGetMessages