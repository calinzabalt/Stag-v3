import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAnsJuP1MsAhU2gzdrHKlZSM0ZzzyZVhfE",
    authDomain: "stag-v3-d8b3e.firebaseapp.com",
    projectId: "stag-v3-d8b3e",
    storageBucket: "stag-v3-d8b3e.appspot.com",
    messagingSenderId: "1063286158883", 
    appId: "1:1063286158883:web:ba68904ca0a9946e76e396",
    measurementId: "G-26Z9ND8ZPG"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp 
const timestamp = firebase.firestore.Timestamp

export {projectFirestore, projectAuth, projectStorage, timestamp}

