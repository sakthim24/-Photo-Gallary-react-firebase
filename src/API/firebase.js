import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2jvsrjSR9BzOARLRSQ0NPox_R3iPBTII",
  authDomain: "photo-gallary-b0d97.firebaseapp.com",
  projectId: "photo-gallary-b0d97",
  storageBucket: "photo-gallary-b0d97.appspot.com",
  messagingSenderId: "874020015562",
  appId: "1:874020015562:web:8593827d601e0da0589333",
  measurementId: "G-YDVZ4HYGGY"
};
  
  firebase.initializeApp(firebaseConfig);
 export const firestore= firebase.firestore();
 export const storage=firebase.storage();