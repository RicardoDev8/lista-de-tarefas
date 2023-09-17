import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCuW0mSjCJn0yZS_q_XcAElv30nuvNppDc",
    authDomain: "treinobd-bcbde.firebaseapp.com",
    projectId: "treinobd-bcbde",
    storageBucket: "treinobd-bcbde.appspot.com",
    messagingSenderId: "587973676901",
    appId: "1:587973676901:web:71f1cb923ad7ba3b349b8c",
    measurementId: "G-BWLYCY5WLF"
  };
  

const firebaseApp = initializeApp(firebaseConfig);

const bancoDeDados = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp);

export {bancoDeDados, auth};
