import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBtt2x9_rwgGDLR8x9RJJXwrn768PcMoFw",
    authDomain: "mytodolist-d9401.firebaseapp.com",
    projectId: "mytodolist-d9401",
    storageBucket: "mytodolist-d9401.appspot.com",
    messagingSenderId: "761672386656",
    appId: "1:761672386656:web:7d22baca3001dd94139b05"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{
    db
}