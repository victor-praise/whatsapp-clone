import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBpM3Hrv5O1RZDAt_GryaSXxxcffXw63Qs",
    authDomain: "whatsapp-clone-25dc6.firebaseapp.com",
    projectId: "whatsapp-clone-25dc6",
    storageBucket: "whatsapp-clone-25dc6.appspot.com",
    messagingSenderId: "378584183339",
    appId: "1:378584183339:web:0e0ae35754449176f6b06e",
    measurementId: "G-SH9XP4573F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;