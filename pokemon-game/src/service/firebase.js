import firebase from "firebase/app";
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBEFdaqFRIVLi0v7e6YfoinkXggkYBBRUg",
    authDomain: "pokemon-game-a99d6.firebaseapp.com",
    databaseURL: "https://pokemon-game-a99d6-default-rtdb.firebaseio.com",
    projectId: "pokemon-game-a99d6",
    storageBucket: "pokemon-game-a99d6.appspot.com",
    messagingSenderId: "547153808404",
    appId: "1:547153808404:web:8f7e7ae35b9d6abe3b2b01"
};

firebase.initializeApp(firebaseConfig);

// database.ref('pokemons').once('value', (snapshot) => {
//     console.log('#### snapshot:', snapshot.val());
// })


export const fire = firebase;

export const database = fire.database();

export default database;

