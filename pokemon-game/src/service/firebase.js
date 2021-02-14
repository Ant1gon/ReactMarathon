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

class Firebase {
    constructor() {
        this.fire = firebase;
        this.database = this.fire.database();
    }

    getPokemonsOnce = async () => {
        return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
    }

    getPokemonSoket = (cb) => {
        this.database.ref('pokemons').on('value', (snapshot) => {
            cb(snapshot.val());
            //console.log('#### snapshot:', snapshot.val());
        })
    }

    offPokemonSoket = () => {
        this.database.ref('pokemons').off();
    }

    postPokemon = (key, pokemon) => {
        this.database.ref(`pokemons/${key}`).set(pokemon);
    }

    addPokemon = (data, cb) => {
        const newKey = this.database.ref().child('pokemons').push().key
        this.database.ref('pokemons/' + newKey).set(data).then(() => cb && cb());
    }
}

export default Firebase;

