import React, {useState,useRef} from 'react';
import {View, Text, StyleSheet, Dimentions, Image} from 'react-native';
import {colors, parameters,title} from '../../global/Styles';
import { Icon, Button,SocialIcon } from 'react-native-elements';
import Header from '../../components/Header';
import * as Animatable from 'react-native-animatable';
import Swiper from 'react-native-swiper';


export default function SignInWelcomeScreen({navigation}){
    return(
        <View style={{flex:1}}>
            <View style={{flex:3,justifyContent:'flex-start',alignItems:'center',paddingTop:50}}>
                <Text style={{fontSize:26,color:colors.button,fontWeight:'bold'}}>HOME LITTER TO BUSINESS</Text>
                <Text style={{fontSize:26,color:colors.button,fontWeight:'bold'}}>LET'S START </Text>
            </View>
            <View style={{flex:4,justifyContent:'center'}}>
                <Swiper autoplay={true}>
                    <View style={styles.slide1}>
                        <Image source={{uri:'https://www.collinsdictionary.com/images/full/vegetable_82806697.jpg'}}
                            style={{height:'100%', width:'100%'}}
                        />
                    </View>
                    <View style={styles.slide2}>
                        <Image source={{uri:'https://www.dexigner.com/images/article/23987/Unilever_Lux_Rebranding_02.jpg'}}
                            style={{height:'100%', width:'100%'}}
                        />
                    </View>
                    <View style={styles.slide3}>
                        <Image source={{uri:'https://t4.ftcdn.net/jpg/02/71/66/79/360_F_271667967_51o36z5wqtOolcAP4uYClEaNsKPwcX3X.jpg'}}
                            style={{height:'100%', width:'100%'}}
                        />
                    </View>
                    <View style={styles.slide3}>
                        <Image source={{uri:'https://previews.123rf.com/images/navintar/navintar1610/navintar161000040/66833426-%E3%83%9C%E3%82%A6%E3%83%AB%E3%81%A8%E3%83%90%E3%83%83%E3%82%B0%E3%81%A8%E7%99%BD%E3%81%84%E8%83%8C%E6%99%AF%E3%81%A7%E6%9C%A8%E3%81%AE%E3%82%B9%E3%83%97%E3%83%BC%E3%83%B3%E3%81%A7%E7%99%BD%E7%B1%B3%E3%80%81%E3%82%B3%E3%83%94%E3%83%BC-%E3%82%B9%E3%83%9A%E3%83%BC%E3%82%B9%E5%B9%B3%E9%9D%A2%E5%9B%B3.jpg'}}
                            style={{height:'100%', width:'100%'}}
                        />
                    </View>
                </Swiper>
            </View>
            <View style={{flex:4, justifyContent:'flex-end',marginBottom:20}}>
                <View style={{marginHorizontal:20, marginTop:30}}>
                    <Button
                        title='SIGN IN'
                        buttonStyle={parameters.styledButton}
                        titleStyle={parameters.buttonTitle}
                        onPress={()=>{navigation.navigate('SignInScreen')}}
                    />
                </View>
                <View style={{marginHorizontal:20, marginTop:20}}>
                    <Button
                        title='Create an account'
                        buttonStyle={styles.createdButton}
                        titleStyle={styles.createButtonTitle}
                        onPress={()=>{navigation.navigate('SignUpScreen')}}
                    />
                </View>
            </View>

        </View>
    )
};

const styles=StyleSheet.create({
    slide1:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#9DD6EB'
    },
    slide2:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#97CAE5'
    },
    slide3:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#92BBD9'
    },
    createdButton:{
        backgroundColor:'white',
        alignContent:'center',
        justifyContent:'center',
        borderRadius:10,
        borderWidth:1,
        borderColor:colors.button,
        height:40,
        paddingHorizontal:20,
        height:50
        
    },
    createButtonTitle:{
        color:colors.grey1,
        fontSize:20,
        fontWeight:'bold',
        alignItems:'center',
        justifyContent:'center',
        marginTop:1
    }

});

