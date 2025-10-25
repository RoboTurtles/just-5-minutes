import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB16xJl6gKNFuhbSVCgdcjQdzSNTRQZtys",
    authDomain: "just-5-minutes-41bc8.firebaseapp.com",
    projectId: "just-5-minutes-41bc8",
    storageBucket: "just-5-minutes-41bc8.firebasestorage.app",
    messagingSenderId: "961449515029",
    appId: "1:961449515029:web:55901b44437cf91947561c",
    measurementId: "G-RYV233W2M4"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getFirestore(app);

export { auth, db, provider };
