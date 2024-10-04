import { getAuth, initializeAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCZj0nGQ73TyyW1yrogblLORBS6qH7rlFY",
  authDomain: "moviles-b661a.firebaseapp.com",
  projectId: "moviles-b661a",
  storageBucket: "moviles-b661a.appspot.com",
  messagingSenderId: "267224551329",
  appId: "1:267224551329:web:dbc2fa6c50b710f67405e0",
  databaseURL: "https://moviles-b661a-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(firebase);
export const auth = initializeAuth(firebase, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
// Initialize Realtime Database and get a reference to the service
export const dbRealTime = getDatabase(firebase);
