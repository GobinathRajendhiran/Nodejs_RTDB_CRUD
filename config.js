const { initializeApp } = require('firebase/app');
const { getDatabase, set, get, update, remove, ref, child, query , orderByChild, equalTo } = require('firebase/database')

const config = {
    apiKey: "AIzaSyDh99l2ncE5NTuGUckskfkK-9s-WpmGzq0",
    authDomain: "rv-robin.firebaseapp.com",
    databaseURL:
      "https://rv-robin-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "rv-robin",
    storageBucket: "rv-robin.appspot.com",
    messagingSenderId: "911030592361",
    appId: "1:911030592361:web:fc66e57966ae12792713f8",
    measurementId: "G-J3PK5ED135",
};

const firebase = initializeApp(config);
const RTDatabase = getDatabase(firebase);

module.exports = {RTDatabase, set, get, update, remove, ref, child, query, orderByChild, equalTo}