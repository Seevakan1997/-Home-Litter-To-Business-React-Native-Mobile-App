import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { colors } from '../global/Styles';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MyProductsScreen from '../screens/MyProductsScreen';
import MyAccountScreen from '../screens/MyAccountScreen';



const ClientTabs = createBottomTabNavigator();


export default function RootClientTabs(){

    return(
        <ClientTabs.Navigator
                    tabBarOptions = {{
                        activeTintColor :colors.button
                    }}
                >
            <ClientTabs.Screen 
                name ="HomeScreen"
                component ={HomeScreen}
                options ={
                    {
                        headerShown:false,
                        tabBarLabel : "Home",
                        tabBarIcon: ({color,size})=>(
                            <Icon 
                                name ='home'
                                type = 'material'
                                color ={color}
                                size ={size}
                            />
                        )
                    }
                }

            />


            <ClientTabs.Screen 
                name ="SearchScreen"
                component ={SearchScreen}
                options ={
                    {
                        headerShown:false,
                        tabBarLabel : "Search",
                        tabBarIcon: ({color,size})=>(
                            <Icon 
                                name ='search'
                                type = 'material'
                                color ={color}
                                size ={size}
                            />
                        )
                    }
                }

            />



        <ClientTabs.Screen 
                name ="MyProductsScreen"
                component ={MyProductsScreen}
                options ={
                    {
                        headerShown:false,
                        tabBarLabel : "My Products",
                        tabBarIcon: ({color,size})=>(
                            <Icon 
                                name ='view-list'
                                type = 'material'
                                color ={color}
                                size ={size}
                            />
                        )
                    }
                }

            />



        <ClientTabs.Screen 
                name ="MyAccount"
                component ={MyAccountScreen}
                options ={
                    {
                        headerShown:false,
                        tabBarLabel : "My Account",
                        tabBarIcon: ({color,size})=>(
                            <Icon 
                                name ='person'
                                type = 'material'
                                color ={color}
                                size ={size}
                            />
                        )
                    }
                }

            />


   


        </ClientTabs.Navigator>
    )
}