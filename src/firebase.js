import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxqvWYAAI0axQ51rVaTMqeyx3GvRADqns",
  authDomain: "shop-993f3.firebaseapp.com",
  projectId: "shop-993f3",
  storageBucket: "shop-993f3.appspot.com",
  messagingSenderId: "147845841359",
  appId: "1:147845841359:web:42bccebd6c6ad2c3c712ba",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;
