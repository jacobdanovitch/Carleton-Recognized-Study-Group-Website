import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAjToOdR-5tNBTLEWsOj4ErmhsUyn3_-Mk",
    authDomain: "carletonrsg.firebaseapp.com",
    databaseURL: "https://carletonrsg.firebaseio.com",
    projectId: "carletonrsg",
    storageBucket: "carletonrsg.appspot.com",
    messagingSenderId: "715575793933"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();
const db = firebase.database();

export {
    db,
    auth,
};
