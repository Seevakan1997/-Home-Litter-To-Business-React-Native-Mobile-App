
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {

  apiKey: "AIzaSyD-cTtlyxbW57h0Ff01qKwAxOREB7WIc7k",
  authDomain: "home-litter-to-business-9ac5a.firebaseapp.com",
  projectId: "home-litter-to-business-9ac5a",
  storageBucket: "home-litter-to-business-9ac5a.appspot.com",
  messagingSenderId: "164299653801",
  appId: "1:164299653801:web:9d7e72cdb409b2cdf71fb8",
  measurementId: "G-BMZYWEF5YL"
}
const app= initializeApp(firebaseConfig);


const auth = getAuth(app)

const storage = getStorage(app);
 const db = getFirestore(app);

export {db,auth,storage}