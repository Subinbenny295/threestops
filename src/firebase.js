import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBtB_h3ki5HaRg4kZ_80WeRVy5c8WxrmNU",
    authDomain: "stopsdemoapp.firebaseapp.com",
    databaseURL: "https://stopsdemoapp.firebaseio.com",
    projectId: "stopsdemoapp",
    storageBucket: "stopsdemoapp.appspot.com",
    messagingSenderId: "538045183655",
    appId: "1:538045183655:web:c073dd0fb129a6bed74d82",
    measurementId: "G-EFPVHRVM8M"
});

const db = firebase.firestore();


export default db;