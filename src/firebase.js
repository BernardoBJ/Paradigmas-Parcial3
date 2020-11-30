import firebase from 'firebase'
 import 'firebase/firestore'
 
  var firebaseConfig = {
    apiKey: "AIzaSyCjTwHMjDg9ebSkFxwH5x1nAEl7mWs_HYY",
    authDomain: "react-firebase-876a5.firebaseapp.com",
    databaseURL: "https://react-firebase-876a5.firebaseio.com",
    projectId: "react-firebase-876a5",
    storageBucket: "react-firebase-876a5.appspot.com",
    messagingSenderId: "129615400846",
    appId: "1:129615400846:web:c0d0ee178eeb2f5aac9edf",
    measurementId: "G-638Q4GQZFL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();