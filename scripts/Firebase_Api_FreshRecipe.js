//---------------------------------------------------------------------
// Your web app's Firebase configuration (9 lines of code)
// Replace the configuration with YOUR project's API information
// copied from the firebase console (settings) of your project.
//---------------------------------------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyB2Pfi0zlL4fcDOS-2hOfHvIvkEpWGMFFI",
    authDomain: "fresh-recipe-1c7f8.firebaseapp.com",
    databaseURL: "https://fresh-recipe-1c7f8.firebaseio.com",
    projectId: "fresh-recipe-1c7f8",
    storageBucket: "fresh-recipe-1c7f8.appspot.com",
    messagingSenderId: "1061824846970",
    appId: "1:1061824846970:web:cff4e14141d2264203afc3"
};
//------------------------------------------------
// Initialize Firebase and Firestore reference
// Do not delete!
//------------------------------------------------
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();