import React,{useState,useEffect} from "react";
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './authNavigators';
import { SignedInStack,SignOutStack  } from "./authNavigators";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "@firebase/auth";

export default function RootNavigator(){
    const [currentUser, setCurrentUser] = useState(false);

    const useHandler = () => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setCurrentUser(true);
            }
            else {
                setCurrentUser(false);
            }
        })
    }
    useEffect(() => {
        useHandler();
    })
    return(
        <NavigationContainer>
            <>
            {currentUser ? <SignedInStack /> : <SignOutStack />}
            </>
        </NavigationContainer>
    )
};