import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyD8fBz-IyKA25KwNinm20UWWwPOuwu68Qc",
    authDomain: "te-2023-2.firebaseapp.com",
    databaseURL: "https://te-2023-2-default-rtdb.firebaseio.com",
    projectId: "te-2023-2",
    storageBucket: "te-2023-2.appspot.com",
    messagingSenderId: "155653093962",
    appId: "1:155653093962:web:df271267d9f8af7dbc44b3",
    measurementId: "G-ZXT2DGVFXT"  
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.database("https://te-2023-2-default-rtdb.firebaseio.com");
const auth = firebase.auth();

export { firebase, auth, db };