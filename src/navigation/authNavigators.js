import React from "react";
import {createNativeStackNavigator,TransitionPresets} from '@react-navigation/native-stack';
import SignInWelcomeScreen from '../screens/authScreens/SignInWelcomeScreen';
import SignInScreen from "../screens/authScreens/SignInScreen";
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from "../screens/authScreens/SignUpScreen";
import RootClientTabs from "./ClientTabs";
import AllProducts from "../screens/AllProducts";
import ChatScreen from "../screens/ChatScreen";

const Auth = createNativeStackNavigator();

export default function AuthStack(){

    return(
        <Auth.Navigator>
            <Auth.Screen
                name="SignInWelcomeScreen" 
                component={SignInWelcomeScreen}
                options={{
                    headerShown:false,
                    
                }}
            />
            <Auth.Screen
                name="SignInScreen" 
                component={SignInScreen}
                options={{
                    headerShown:false,
                   
                }}
            />
            <Auth.Screen
                name="SignUpScreen" 
                component={SignUpScreen}
                options={{
                    headerShown:false,
                   
                }}
            />
            <Auth.Screen
                name="AllProducts" 
                component={AllProducts}
                options={{
                    headerShown:false,
                   
                }}
            />
             <Auth.Screen
                name="ChatScreen" 
                component={ChatScreen}
                options={{
                    headerShown:false,
                   
                }}
            />
            <Auth.Screen
                name="RootClientTabs" 
                component={RootClientTabs}
                options={{
                    headerShown:false,
                   
                }}
            />
        </Auth.Navigator>
    )

};